import { permanentRedirect } from "next/navigation";
import { AGENCE_PAR_DEFAUT } from "@/lib/agences";

/**
 * L'ancienne adresse du parrainage, avant que la page ne se décline par
 * agence. Des liens circulent déjà (nav, pied de page, partages WhatsApp des
 * premiers parrains) : elle doit continuer de fonctionner, et pointer sur La
 * Réunion, la seule agence qu'elle ait jamais servie.
 */
export default function ParrainagePage() {
  permanentRedirect(`/${AGENCE_PAR_DEFAUT}/parrainage`);
}
