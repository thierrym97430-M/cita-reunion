import { baseUrlBackend, cleWebhook, type Agence } from "./agences";

/**
 * Un commercial proposé au parrain dans la liste déroulante.
 * Volontairement réduit à l'identité : ni email, ni téléphone, ni rôle ne
 * doivent transiter par une page publique.
 */
export type Commercial = {
  id: string;
  nom: string;
};

/** Combien de temps la liste est mise en cache avant d'être rafraîchie. */
const CACHE_SECONDES = 600;

/** Au-delà, on rend la page sans liste plutôt que de la faire attendre. */
const TIMEOUT_MS = 4000;

type ReponseApi = {
  commerciaux?: { id?: unknown; firstName?: unknown; lastName?: unknown }[];
};

/**
 * Liste les commerciaux de l'agence, depuis SON application LeadFlow.
 *
 * Appelée côté serveur uniquement : la clé webhook identifie l'agence et
 * autorise la création de leads, elle ne doit jamais atteindre le navigateur.
 *
 * Ne lève jamais. Une liste vide est un cas de fonctionnement normal — le
 * formulaire bascule alors sur une saisie libre — et non une erreur : une
 * indisponibilité de LeadFlow ne doit pas empêcher un parrainage.
 */
export async function getCommerciaux(agence: Agence): Promise<Commercial[]> {
  const base = baseUrlBackend(agence);
  const cle = cleWebhook(agence);

  if (!base || !cle) {
    console.warn(
      `[commerciaux] ${agence.slug} : ${!base ? "URL" : "clé"} manquante en configuration`
    );
    return [];
  }

  try {
    const res = await fetch(`${base}/api/public/commerciaux`, {
      headers: { Authorization: `Bearer ${cle}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: CACHE_SECONDES, tags: [`commerciaux:${agence.slug}`] },
    });

    if (!res.ok) {
      console.warn(`[commerciaux] ${agence.slug} : HTTP ${res.status}`);
      return [];
    }

    const data = (await res.json()) as ReponseApi;
    if (!Array.isArray(data.commerciaux)) return [];

    return data.commerciaux
      .map((c) => ({
        id: String(c.id ?? ""),
        nom: `${String(c.firstName ?? "").trim()} ${String(c.lastName ?? "").trim()}`.trim(),
      }))
      .filter((c) => c.id && c.nom)
      .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  } catch (e) {
    console.warn(
      `[commerciaux] ${agence.slug} : ${e instanceof Error ? e.message : String(e)}`
    );
    return [];
  }
}
