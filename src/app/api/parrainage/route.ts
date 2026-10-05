import { NextResponse } from "next/server";
import { OFFRE, parrainageSchema, type ParrainageFormData } from "@/lib/parrainage";
import {
  baseUrlBackend,
  cleWebhook,
  getAgence,
  type Agence,
} from "@/lib/agences";
import { getCommerciaux } from "@/lib/commerciaux";

/**
 * POST /api/parrainage — réception d'un parrainage et transmission au
 * LeadFlow de l'agence.
 *
 * C'est ici que se joue le routage : l'agence vient de l'URL de la page
 * (champ `agence`), et détermine à la fois l'application de destination et la
 * clé qui l'authentifie. Un parrainage saisi sur /martinique/parrainage ne
 * peut pas atterrir ailleurs qu'en Martinique.
 *
 * Le FILLEUL devient le lead. Le parrain n'a pas de place dans le modèle de
 * données des deux applications : ses coordonnées sont donc écrites dans le
 * message du lead, là où le conseiller les lira au moment de l'appel.
 */

/**
 * Marge laissée au LeadFlow de destination pour créer le lead.
 *
 * Généreuse à dessein : la création n'est pas une simple insertion (recherche
 * de doublon, verrou d'agence, affectation, notification), et abandonner trop
 * tôt est le pire des cas — le lead est créé quand même, le parrain voit une
 * erreur, il recommence, et sa deuxième tentative est rejetée en doublon. Le
 * parrainage est alors perdu pour tout le monde.
 */
const TIMEOUT_MS = 25000;

/** Le temps d'exécution alloué à la route doit couvrir l'attente ci-dessus. */
export const maxDuration = 30;

/** Compose le message du lead : tout ce que le modèle ne sait pas stocker. */
function composerMessage(d: ParrainageFormData, commercial: string | null): string {
  const lignes = [
    `PARRAINAGE — filleul(e) recommandé(e) par un client.`,
    ``,
    `Parrain : ${d.parrainPrenom} ${d.parrainNom}`,
    `Téléphone parrain : ${d.parrainTelephone}`,
    `Email parrain : ${d.parrainEmail}`,
  ];

  if (commercial) {
    lignes.push(`Conseiller désigné par le parrain : ${commercial}`);
  } else {
    lignes.push(`Conseiller désigné par le parrain : non précisé`);
  }

  lignes.push(
    ``,
    `Récompenses à appliquer une fois l'installation réalisée :`,
    `· parrain — 2 mois offerts`,
    `· filleul(e) — 1 mois offert`
  );

  if (d.message) {
    lignes.push(``, `Message du parrain :`, d.message);
  }

  return lignes.join("\n");
}

/**
 * Retrouve le commercial choisi, en le confrontant à la liste réelle de
 * l'agence. On ne fait jamais confiance à l'identifiant reçu du navigateur :
 * sans cette vérification, un identifiant fabriqué permettrait d'affecter un
 * lead à n'importe quel utilisateur — voire d'une autre agence.
 */
async function resoudreCommercial(
  agence: Agence,
  d: ParrainageFormData
): Promise<{ id: string | null; nom: string | null }> {
  if (d.commercialId) {
    const commerciaux = await getCommerciaux(agence);
    const trouve = commerciaux.find((c) => c.id === d.commercialId);
    if (trouve) return { id: trouve.id, nom: trouve.nom };
    // Identifiant inconnu : on l'ignore et on retombe sur l'affectation
    // normale de l'application (zone ou tour de rôle).
    console.warn(`[parrainage] ${agence.slug} : commercialId inconnu, ignoré`);
    return { id: null, nom: null };
  }

  // Saisie libre : on la reporte dans le message, sans affecter personne —
  // un nom tapé à la main ne désigne personne de façon fiable.
  return { id: null, nom: d.commercialAutre?.trim() || null };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const parsed = parrainageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const agence = getAgence(d.agence);
  if (!agence) {
    return NextResponse.json({ error: "Agence inconnue" }, { status: 400 });
  }

  const base = baseUrlBackend(agence);
  const cle = cleWebhook(agence);
  if (!base || !cle) {
    console.error(
      `[parrainage] ${agence.slug} : configuration incomplète (${
        !base ? "URL du backend" : agence.cleEnv
      } absent)`
    );
    return NextResponse.json({ error: "Service indisponible" }, { status: 503 });
  }

  const commercial = await resoudreCommercial(agence, d);

  const payload = {
    /* Le lead, c'est le filleul. */
    firstName: d.filleulPrenom,
    lastName: d.filleulNom,
    phone: d.filleulTelephone,
    email: d.filleulEmail,
    postalCode: d.filleulCodePostal,
    city: d.filleulVille,
    category:
      d.filleulProfil === "Professionnel" ? "professionnel" : "particulier",
    /* Les deux applications n'ont pas le même référentiel de sources. */
    source: agence.sourceKey,
    product: "Parrainage",
    priority: "high",
    message: composerMessage(d, commercial.nom),
    /* Affectation directe au conseiller du parrain (null = l'application
       applique son affectation habituelle : zone ou tour de rôle). */
    assignedToId: commercial.id,
    /* Le parrainage lui-même : c'est de ce bloc que les deux LeadFlow tirent
       la fiche parrain et le suivi des récompenses. */
    parrainage: {
      agence: agence.slug,
      parrain: {
        prenom: d.parrainPrenom,
        nom: d.parrainNom,
        email: d.parrainEmail,
        telephone: d.parrainTelephone,
      },
      commercialId: commercial.id,
      commercialNom: commercial.nom,
      /* L'offre au moment du parrainage. Transmise plutôt que recopiée dans
         les deux applications : elle est définie une seule fois, ici, et un
         parrainage garde ce qui lui a été promis même si elle change. */
      recompenses: {
        parrain: `${OFFRE.parrain.valeur} ${OFFRE.parrain.unite}`,
        filleul: `${OFFRE.filleul.valeur} ${OFFRE.filleul.unite}`,
      },
      consentement: d.consentement,
      horodatage: new Date().toISOString(),
    },
  };

  let res: Response;
  try {
    res = await fetch(`${base}/api/webhooks/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cle}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (e) {
    console.error(
      `[parrainage] ${agence.slug} : ${e instanceof Error ? e.message : String(e)}`
    );
    return NextResponse.json({ error: "Service indisponible" }, { status: 503 });
  }

  /* Doublon : le filleul est déjà connu de l'agence. Ce n'est pas une panne,
     et le formulaire l'annonce comme tel. */
  if (res.status === 409) {
    return NextResponse.json({ error: "Doublon", duplicate: true }, { status: 409 });
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(
      `[parrainage] ${agence.slug} : HTTP ${res.status} — ${detail.slice(0, 400)}`
    );
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
