import Image from "next/image";
import Link from "next/link";
import { AGENCE_PAR_DEFAUT, type Agence } from "@/lib/agences";

/**
 * Sans `agence` : le pied de page historique du site La Réunion.
 * Avec `agence` : le même, dont l'identité et les téléphones proviennent de
 * l'agence de la page — c'est ce qu'utilisent les pages de parrainage.
 */
export default function Footer({ agence }: { agence?: Agence }) {
  const nom = agence ? `${agence.nom} · ${agence.code}` : "La Réunion · 974";
  const bureaux = agence?.bureaux;
  const lienParrainage = `/${agence?.slug ?? AGENCE_PAR_DEFAUT}/parrainage`;

  const sousTitre = bureaux
    ? bureaux.length > 1
      ? `Groupe CITA — ${bureaux.length} agences : ${bureaux
          .map((b) => b.ville)
          .join(" & ")}`
      : `Groupe CITA — ${bureaux[0].ville}`
    : "Groupe CITA — 2 agences : Saint-Denis & Le Tampon";

  const telephones = bureaux
    ? bureaux.map((b) => `${b.ville} : ${b.telephone}`).join(" · ")
    : "Saint-Denis : 02 62 94 80 21 · Le Tampon : 02 62 02 03 03";

  return (
    <footer className="bg-ink py-12 px-10 max-sm:px-5">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-8 flex-wrap">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo-cita-transparent.png"
            alt={agence?.nomComplet ?? "CITA La Réunion"}
            width={160}
            height={60}
            className="h-14 w-auto"
          />
          <div>
            <div className="font-heading text-[15px] font-bold text-white">{nom}</div>
            <div className="text-[12px] text-white/45 mt-1">{sousTitre}</div>
          </div>
        </div>
        <div className="text-[12px] text-white/50 leading-[1.8]">
          {telephones}
          <br />
          <a
            href="https://www.citagroupe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 no-underline hover:text-white transition-colors"
          >
            citagroupe.com
          </a>
        </div>
        <ul className="flex gap-5 list-none">
          <li>
            <Link
              href={lienParrainage}
              className="text-[12px] text-white/45 no-underline transition-colors hover:text-white/80"
            >
              Parrainage
            </Link>
          </li>
          <li>
            <Link
              href="/mentions-legales"
              className="text-[12px] text-white/45 no-underline transition-colors hover:text-white/80"
            >
              Mentions légales
            </Link>
          </li>
          <li>
            <a
              href="https://www.citagroupe.com/docs/CGV_SCITA_revue_du_28_novembre_2023.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/45 no-underline transition-colors hover:text-white/80"
            >
              CGV
            </a>
          </li>
          <li>
            <Link
              href="/confidentialite"
              className="text-[12px] text-white/45 no-underline transition-colors hover:text-white/80"
            >
              Confidentialité
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
