import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { cleWebhook, getAgence } from "@/lib/agences";

/**
 * POST /api/revalidation/commerciaux — vide la liste « Votre conseiller CITA ».
 *
 * Appelée par LeadFlow quand un commercial est créé, modifié ou désactivé :
 * sans elle, la page garde l'ancienne liste jusqu'à 10 minutes (voir
 * CACHE_SECONDES dans src/lib/commerciaux.ts), et un commercial parti de la
 * société reste proposé aux parrains.
 *
 * Authentifiée par une signature HMAC-SHA256 de `<horodatage>.<corps>`, avec
 * la clé webhook de l'agence — la même qui protège déjà la liste côté LeadFlow,
 * pour ne pas multiplier les secrets. L'horodatage borne le rejeu à 5 minutes.
 * Un rejeu dans la fenêtre ne fait que rafraîchir la liste une fois de plus.
 */

const FENETRE_SECONDES = 300;

const corpsSchema = z.object({ agence: z.string().regex(/^[a-z]{2,20}$/) }).strict();

function signatureValide(cle: string, horodatage: string, corps: string, recue: string): boolean {
  const attendue = createHmac("sha256", cle).update(`${horodatage}.${corps}`).digest("hex");
  const a = Buffer.from(attendue, "utf8");
  const b = Buffer.from(recue, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const refus = () => Response.json({ error: "Non autorisé" }, { status: 401 });

  const horodatage = req.headers.get("x-cita-timestamp") ?? "";
  const signature = req.headers.get("x-cita-signature") ?? "";
  const ts = Number(horodatage);
  if (!/^\d{9,11}$/.test(horodatage) || Math.abs(Date.now() / 1000 - ts) > FENETRE_SECONDES) {
    return refus();
  }

  const corps = await req.text();
  if (corps.length > 200) return refus();

  let lu;
  try {
    lu = corpsSchema.safeParse(JSON.parse(corps));
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }
  if (!lu.success) return Response.json({ error: "Requête invalide" }, { status: 400 });

  const agence = getAgence(lu.data.agence);
  const cle = agence ? cleWebhook(agence) : undefined;
  if (!agence || !cle || !signatureValide(cle, horodatage, corps, signature)) {
    return refus();
  }

  // Expiration immédiate : le parrain suivant ne doit pas revoir l'ancienne
  // liste, même une fois (la valeur « max » la servirait encore).
  revalidateTag(`commerciaux:${agence.slug}`, { expire: 0 });
  revalidatePath(`/${agence.slug}/parrainage`);
  if (agence.slug === "reunion") revalidatePath("/parrainage");

  return Response.json({ ok: true });
}
