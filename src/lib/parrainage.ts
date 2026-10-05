import { z } from "zod";
import type { Agence } from "./agences";

/* ────────────────────────────────────────────────────────────
   CONFIGURATION DE L'OFFRE DE PARRAINAGE
   ↓ Tout le contenu commercial se modifie ICI, sans toucher aux
     composants. Change une valeur → toutes les pages se mettent à jour.

   L'offre est aujourd'hui la même pour les cinq agences. Le jour où une
   agence voudra la sienne, il suffira de déplacer OFFRE dans `agences.ts`
   et de le passer en paramètre comme le reste.
   ──────────────────────────────────────────────────────────── */

export const OFFRE = {
  /* Accroche principale (hero + bande d'accroche landing) */
  accroche: "2 mois offerts pour vous, 1 mois offert pour votre filleul(e)",

  /* Récompense du parrain */
  parrain: {
    valeur: "2 mois",
    unite: "offerts",
    detail:
      "Vos 2 mois offerts sont déduits automatiquement de votre facture.",
    bonus: [
      "Cumulable — parrainez autant de proches que vous le souhaitez",
      "Aucune démarche : la remise est appliquée par nos services",
    ],
  },

  /* Récompense du filleul */
  filleul: {
    valeur: "1 mois",
    unite: "offert",
    detail:
      "Votre filleul(e) démarre avec 1 mois offert.",
    bonus: [
      "Devis gratuit et sans engagement de sa part",
    ],
  },

  /* Mise en avant secondaire */
} as const;

export const ETAPES = [
  {
    num: "01",
    titre: "Vous remplissez le formulaire",
    texte:
      "Vos coordonnées et celles de votre filleul(e). 2 minutes, rien de plus. Vous recevez une confirmation immédiate.",
    icone: "📝",
  },
  {
    num: "02",
    titre: "Nous contactons votre filleul(e)",
    texte:
      "Un conseiller CITA l'appelle sous 48h pour un rendez-vous, un devis gratuit et l'installation de son système.",
    icone: "📞",
  },
  {
    num: "03",
    titre: "Vous êtes récompensés tous les deux",
    texte:
      "Une fois l'installation réalisée, vos 2 mois offerts sont appliqués — et le mois offert de votre filleul(e) aussi.",
    icone: "🎁",
  },
] as const;

/* ────────────────────────────────────────────────────────────
   CONTENU DÉPENDANT DE L'AGENCE
   Ces textes nomment l'agence, ses bureaux ou son territoire : ce sont
   des fonctions du contexte, pas des constantes.
   ──────────────────────────────────────────────────────────── */

/** "Notre agence de Cayenne intervient…" / "Nos 2 agences — … — interviennent…" */
function phraseCouverture(a: Agence): string {
  const villes = a.bureaux.map((b) => b.ville);
  if (villes.length === 1) {
    return `Notre agence de ${villes[0]} intervient partout ${a.localisation}.`;
  }
  const liste =
    villes.slice(0, -1).join(", ") + " et " + villes[villes.length - 1];
  return `Nos ${villes.length} agences — ${liste} — interviennent partout ${a.localisation}.`;
}

export function avantages(a: Agence) {
  return [
    {
      icone: "♾️",
      titre: "Parrainages illimités",
      texte:
        "Aucun plafond : chaque filleul(e) installé(e) vous rapporte 2 mois de plus.",
    },
    {
      icone: "⚡",
      titre: "Rappel sous 48h",
      texte:
        "Votre filleul(e) est contacté(e) rapidement par un conseiller de son secteur.",
    },
    {
      icone: "🏝️",
      titre: "Territoire entièrement couvert",
      texte: phraseCouverture(a),
    },
    {
      icone: "🛡️",
      titre: "Zéro risque",
      texte:
        "Aucun engagement pour votre filleul(e) : le devis reste gratuit et sans suite obligatoire.",
    },
  ] as const;
}

export function faqParrainage(a: Agence) {
  return [
    {
      q: "Qui peut parrainer ?",
      a: `Tout client ${a.nomComplet} titulaire d'un contrat de télésurveillance en cours de validité peut parrainer ses proches : famille, amis, voisins, collègues, ou même un professionnel de son entourage.`,
    },
    {
      q: "Combien de personnes puis-je parrainer ?",
      a: "Autant que vous le souhaitez. Le programme est cumulable : chaque filleul(e) dont l'installation est réalisée vous fait gagner 2 mois offerts supplémentaires.",
    },
    {
      q: "Quand est-ce que je reçois ma récompense ?",
      a: "Vos 2 mois offerts sont appliqués sur votre contrat dès que l'installation de votre filleul(e) est réalisée et son contrat signé. Vous n'avez aucune démarche à faire, la remise apparaît directement sur votre facturation.",
    },
    {
      q: "Pourquoi me demande-t-on le nom de mon commercial ?",
      a: "Pour que votre filleul(e) soit confié(e) au conseiller qui vous connaît déjà : il reprend le dossier directement, sans que vous ayez à tout réexpliquer. Si vous ne vous en souvenez pas, laissez le champ vide — nous attribuerons le dossier au conseiller de son secteur.",
    },
    {
      q: "Mon filleul(e) est-il obligé de signer ?",
      a: "Non, absolument pas. Nous le contactons pour un rendez-vous et un devis gratuit, sans aucun engagement. Les récompenses ne s'appliquent que si l'installation est effectivement réalisée.",
    },
    {
      q: "Mon filleul(e) peut-il être un professionnel ?",
      a: `Oui. Commerce, bureau, cabinet médical, entrepôt, collectivité : le parrainage fonctionne aussi bien pour les particuliers que pour les professionnels, partout ${a.localisation}.`,
    },
    {
      q: "Mon filleul(e) reçoit-il la même chose que moi ?",
      a: "Le parrain reçoit 2 mois offerts, le filleul(e) reçoit 1 mois offert. Chacun est récompensé, selon des modalités adaptées à son contrat.",
    },
    {
      q: "Que deviennent les coordonnées transmises ?",
      a: "Elles servent uniquement à contacter votre filleul(e) dans le cadre de ce parrainage. Aucune donnée n'est cédée à un tiers, et votre filleul(e) peut demander leur suppression à tout moment. Voir notre politique de confidentialité.",
    },
  ] as const;
}

export function conditions(a: Agence) {
  return [
    `Offre réservée aux clients ${a.nomComplet} titulaires d'un contrat de télésurveillance actif au moment du parrainage.`,
    "Le filleul(e) ne doit pas être déjà client CITA ni avoir fait l'objet d'un devis CITA au cours des 6 derniers mois.",
    "Les récompenses (2 mois offerts pour le parrain, 1 mois offert pour le filleul) sont acquises uniquement après installation effective et signature du contrat par le filleul(e).",
    "Les mois offerts sont appliqués sous forme d'avoir sur les échéances d'abonnement à venir. Ils ne sont ni cessibles ni convertibles en espèces.",
    "Le parrain déclare avoir informé son filleul(e) et obtenu son accord préalable avant la transmission de ses coordonnées.",
    `${a.nomComplet} se réserve le droit de modifier ou de mettre fin au programme à tout moment, sans effet rétroactif sur les parrainages déjà validés.`,
  ] as const;
}

/* ────────────────────────────────────────────────────────────
   VALIDATION DU FORMULAIRE
   ──────────────────────────────────────────────────────────── */

/*
 * Accepte les espaces / points / tirets : 0596 50 32 32, 06.92.12.34.56…
 * Les indicatifs internationaux des DOM sont admis au même titre que +33 :
 * un client martiniquais saisit volontiers +596, et le refuser bloquerait un
 * formulaire par ailleurs valide.
 */
const telephoneFr = z
  .string()
  .trim()
  .regex(
    /^(?:0|\+(?:33|262|269|590|594|596)[\s.-]?)[1-9](?:[\s.-]?\d{2}){4}$/,
    "Numéro de téléphone invalide"
  );

export const parrainageSchema = z.object({
  /* L'agence — porté par l'URL, jamais choisi par l'utilisateur.
     C'est lui qui détermine le LeadFlow de destination. */
  agence: z.string().trim().min(1),

  /* Le parrain */
  parrainPrenom: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères"),
  parrainNom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  parrainEmail: z.string().trim().email("Adresse email invalide"),
  parrainTelephone: telephoneFr,

  /* Le commercial du parrain. Facultatif : tous les clients ne s'en
     souviennent pas, et un champ obligatoire ferait abandonner le formulaire.
     `commercialId` vient de la liste déroulante alimentée par l'agence ;
     `commercialAutre` est la saisie libre de secours. */
  commercialId: z.string().trim().optional(),
  commercialAutre: z.string().trim().max(120).optional(),

  /* Le filleul */
  filleulPrenom: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères"),
  filleulNom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  filleulEmail: z.string().trim().email("Adresse email invalide"),
  filleulTelephone: telephoneFr,
  filleulVille: z.string().trim().min(2, "Veuillez renseigner la ville"),
  /* Obligatoire : LeadFlow refuse un lead sans code postal, et c'est lui qui
     déclenche l'affectation par zone côté Réunion. */
  filleulCodePostal: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Code postal à 5 chiffres"),
  filleulProfil: z.enum(["Particulier", "Professionnel"], {
    message: "Veuillez sélectionner un profil",
  }),

  message: z.string().trim().max(2000).optional(),

  consentement: z.boolean().refine((v) => v === true, {
    message: "Vous devez confirmer l'accord de votre filleul(e)",
  }),
});

export type ParrainageFormData = z.infer<typeof parrainageSchema>;
