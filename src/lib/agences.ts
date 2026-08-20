/* ────────────────────────────────────────────────────────────
   LES AGENCES CITA
   ↓ Source unique de vérité pour les pages de parrainage.
     Une entrée = une page (/martinique/parrainage, /reunion/parrainage…)
     = un lien à diffuser à l'agence = un LeadFlow de destination.

   Coordonnées relevées sur citagroupe.com le 2026-08-20.
   ──────────────────────────────────────────────────────────── */

/** Un bureau physique. La Réunion en a deux, les autres un seul. */
export type Bureau = {
  /** "Agence Nord", "Agence Sud"… affiché en petit au-dessus de la ville */
  libelle: string;
  ville: string;
  /** Rue / lieu-dit, sans le code postal */
  rue: string;
  codePostalVille: string;
  telephone: string;
  /** Même numéro sans espaces, pour href="tel:" */
  telHref: string;
  /** Facultatif — seule La Réunion a des horaires confirmés */
  horaires?: string;
};

/**
 * Quelle application reçoit les leads de cette agence.
 *  - "leadflow" → projet `leadflow-cita` (La Réunion, mono-agence,
 *    authentifié par une clé globale, affectation par zone/code postal)
 *  - "light"    → projet `leadflow-light` (les autres DOM, multi-agences,
 *    authentifié par la clé propre à l'agence, tour de rôle)
 */
export type Backend = "leadflow" | "light";

export type Agence = {
  /** Segment d'URL : /martinique/parrainage */
  slug: string;
  /** "Martinique" — utilisé dans les phrases */
  nom: string;
  /** "CITA Martinique" */
  nomComplet: string;
  /**
   * Le nom précédé de sa préposition, pour s'insérer dans une phrase :
   * "intervient partout {localisation}". Le français ne permet pas de la
   * déduire du nom ("à La Réunion" mais "en Martinique").
   */
  localisation: string;
  /** "972" — affiché dans le badge du hero */
  code: string;
  /** Numéro principal, celui du hero / de la nav */
  telephone: string;
  telHref: string;
  bureaux: Bureau[];
  backend: Backend;
  /**
   * Valeur écrite dans `Lead.source`. Les deux applications n'ont pas le
   * même référentiel : "referral" côté LeadFlow, "parrainage" côté Light.
   */
  sourceKey: string;
  /** Nom de la variable d'environnement portant la clé webhook de l'agence. */
  cleEnv: string;
  /** Exemples affichés en placeholder dans le formulaire. */
  exemples: { ville: string; codePostal: string };
};

export const AGENCES: readonly Agence[] = [
  {
    slug: "reunion",
    nom: "La Réunion",
    nomComplet: "CITA La Réunion",
    localisation: "à La Réunion",
    code: "974",
    telephone: "02 62 94 80 21",
    telHref: "0262948021",
    bureaux: [
      {
        libelle: "Agence Nord",
        ville: "Saint-Denis",
        rue: "10 Rue Jules Hermann",
        codePostalVille: "ZI du Chaudron, 97490",
        telephone: "02 62 94 80 21",
        telHref: "0262948021",
        horaires: "Lun–Ven · 8h00–17h30",
      },
      {
        libelle: "Agence Sud",
        ville: "Le Tampon",
        rue: "64E Chemin 9",
        codePostalVille: "97430 Le Tampon",
        telephone: "02 62 02 03 03",
        telHref: "0262020303",
        horaires: "Lun–Ven · 8h00–17h30",
      },
    ],
    backend: "leadflow",
    sourceKey: "referral",
    cleEnv: "LEADFLOW_KEY_REUNION",
    exemples: { ville: "Saint-Pierre", codePostal: "97410" },
  },
  {
    slug: "martinique",
    nom: "Martinique",
    nomComplet: "CITA Martinique",
    localisation: "en Martinique",
    code: "972",
    telephone: "05 96 50 32 32",
    telHref: "0596503232",
    bureaux: [
      {
        libelle: "Agence Martinique",
        ville: "Le Lamentin",
        rue: "Centre des affaires — Californie 2",
        codePostalVille: "97232 Le Lamentin",
        telephone: "05 96 50 32 32",
        telHref: "0596503232",
      },
    ],
    backend: "light",
    sourceKey: "parrainage",
    cleEnv: "LEADFLOW_LIGHT_KEY_MARTINIQUE",
    exemples: { ville: "Fort-de-France", codePostal: "97200" },
  },
  {
    slug: "guadeloupe",
    nom: "Guadeloupe",
    nomComplet: "CITA Guadeloupe & Îles du Nord",
    localisation: "en Guadeloupe et dans les Îles du Nord",
    code: "971",
    telephone: "05 90 21 28 68",
    telHref: "0590212868",
    bureaux: [
      {
        libelle: "Agence Guadeloupe & Îles du Nord",
        ville: "Les Abymes",
        rue: "48, Morne Vergain",
        codePostalVille: "97139 Les Abymes",
        telephone: "05 90 21 28 68",
        telHref: "0590212868",
      },
    ],
    backend: "light",
    sourceKey: "parrainage",
    cleEnv: "LEADFLOW_LIGHT_KEY_GUADELOUPE",
    exemples: { ville: "Pointe-à-Pitre", codePostal: "97110" },
  },
  {
    slug: "guyane",
    nom: "Guyane",
    nomComplet: "CITA Guyane",
    localisation: "en Guyane",
    code: "973",
    telephone: "05 94 29 07 07",
    telHref: "0594290707",
    bureaux: [
      {
        libelle: "Agence Guyane",
        ville: "Cayenne",
        rue: "12, Lotissement Calimbé 2",
        codePostalVille: "97300 Cayenne",
        telephone: "05 94 29 07 07",
        telHref: "0594290707",
      },
    ],
    backend: "light",
    sourceKey: "parrainage",
    cleEnv: "LEADFLOW_LIGHT_KEY_GUYANE",
    exemples: { ville: "Kourou", codePostal: "97310" },
  },
  {
    slug: "mayotte",
    nom: "Mayotte",
    nomComplet: "CITA Mayotte",
    localisation: "à Mayotte",
    code: "976",
    telephone: "02 69 60 56 05",
    telHref: "0269605605",
    bureaux: [
      {
        libelle: "Agence Mayotte",
        ville: "Mamoudzou",
        rue: "1 impasse du Poivrier",
        codePostalVille: "ZI Nel, 97600 Mamoudzou",
        telephone: "02 69 60 56 05",
        telHref: "0269605605",
      },
    ],
    backend: "light",
    sourceKey: "parrainage",
    cleEnv: "LEADFLOW_LIGHT_KEY_MAYOTTE",
    exemples: { ville: "Koungou", codePostal: "97600" },
  },
] as const;

/** Agence servie par /parrainage sans slug — historique du site. */
export const AGENCE_PAR_DEFAUT = "reunion";

/** Retrouve une agence par son slug. `undefined` si le slug est inconnu. */
export function getAgence(slug: string | undefined): Agence | undefined {
  if (!slug) return undefined;
  return AGENCES.find((a) => a.slug === slug);
}

/** Slugs de toutes les agences — alimente generateStaticParams(). */
export function tousLesSlugs(): string[] {
  return AGENCES.map((a) => a.slug);
}

/**
 * URL de base de l'application qui reçoit les leads de cette agence.
 * Serveur uniquement : ces variables ne sont pas préfixées NEXT_PUBLIC_.
 */
export function baseUrlBackend(agence: Agence): string | undefined {
  const url =
    agence.backend === "leadflow"
      ? process.env.LEADFLOW_URL
      : process.env.LEADFLOW_LIGHT_URL;
  return url?.replace(/\/+$/, "");
}

/**
 * Clé webhook de l'agence. Serveur uniquement — elle ne doit jamais partir
 * dans le navigateur : côté LeadFlow Light c'est elle qui identifie l'agence,
 * et elle autorise la création de leads.
 */
export function cleWebhook(agence: Agence): string | undefined {
  return process.env[agence.cleEnv];
}
