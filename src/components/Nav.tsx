"use client";

import Image from "next/image";
import Link from "next/link";
import { AGENCE_PAR_DEFAUT, type Agence } from "@/lib/agences";

/**
 * Deux variantes :
 *  - sans `agence` : la nav historique du site La Réunion, avec ses ancres
 *    vers les sections de la landing (/#services, /#faq…).
 *  - avec `agence` : la nav des pages de parrainage. Les autres agences n'ont
 *    pas de landing, ces ancres n'y mèneraient nulle part — on garde donc
 *    l'essentiel : identité, téléphone de l'agence, et le bouton parrainer.
 */
export default function Nav({ agence }: { agence?: Agence }) {
  if (agence) return <NavAgence agence={agence} />;

  return (
    <nav className="fixed top-4 left-0 right-0 z-[300] flex justify-center max-md:top-2.5 max-md:left-2.5 max-md:right-2.5">
      <div className="bg-white/92 backdrop-blur-[20px] border border-white/70 rounded-full px-5 py-2 pr-2 flex items-center gap-1 shadow-[0_4px_28px_rgba(13,24,41,.12)]">
        <a className="flex items-center gap-2 no-underline mr-2" href="/">
          <Image
            src="/images/logo-cita-transparent.png"
            alt="CITA La Réunion"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <div className="font-heading font-bold text-[13px] text-navy whitespace-nowrap max-sm:hidden">
            La Réunion{" "}
            <span className="text-g400 font-normal">· 974</span>
          </div>
        </a>
        <div className="w-px h-[18px] bg-g200 mx-1.5 max-sm:hidden" />
        <ul className="flex items-center gap-0.5 list-none">
          <li className="max-sm:hidden">
            <a
              href="/#services"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              Solutions
            </a>
          </li>
          <li className="max-md:hidden">
            <a
              href="/#proof"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              À propos
            </a>
          </li>
          <li className="max-sm:hidden">
            <Link
              href={`/${AGENCE_PAR_DEFAUT}/parrainage`}
              className="text-[13px] font-semibold text-red no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-red-g whitespace-nowrap"
            >
              🎁 Parrainage
            </Link>
          </li>
          <li className="max-md:hidden">
            <a
              href="/#faq"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              className="text-[13px] font-semibold text-navy no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 whitespace-nowrap"
            >
              📞 02 62 94 80 21
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              className="text-[13px] font-bold text-white no-underline px-[18px] py-2 rounded-full bg-red hover:bg-red-h hover:shadow-[0_4px_16px_rgba(200,16,46,.3)] transition-all whitespace-nowrap"
            >
              Devis gratuit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function NavAgence({ agence }: { agence: Agence }) {
  /* Seule La Réunion a une landing sur ce site ; ailleurs, le logo renvoie
     au site du groupe plutôt que vers une page qui parle d'un autre DOM. */
  const accueil =
    agence.slug === AGENCE_PAR_DEFAUT ? "/" : "https://www.citagroupe.com";

  return (
    <nav className="fixed top-4 left-0 right-0 z-[300] flex justify-center max-md:top-2.5 max-md:left-2.5 max-md:right-2.5">
      <div className="bg-white/92 backdrop-blur-[20px] border border-white/70 rounded-full px-5 py-2 pr-2 flex items-center gap-1 shadow-[0_4px_28px_rgba(13,24,41,.12)]">
        <a className="flex items-center gap-2 no-underline mr-2" href={accueil}>
          <Image
            src="/images/logo-cita-transparent.png"
            alt={agence.nomComplet}
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <div className="font-heading font-bold text-[13px] text-navy whitespace-nowrap max-sm:hidden">
            {agence.nom} <span className="text-g400 font-normal">· {agence.code}</span>
          </div>
        </a>
        <div className="w-px h-[18px] bg-g200 mx-1.5 max-sm:hidden" />
        <ul className="flex items-center gap-0.5 list-none">
          <li className="max-md:hidden">
            <a
              href="#offre"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              L&apos;offre
            </a>
          </li>
          <li className="max-md:hidden">
            <a
              href="#comment-ca-marche"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              Comment ça marche
            </a>
          </li>
          <li className="max-sm:hidden">
            <a
              href="#faq-parrainage"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href={`tel:${agence.telHref}`}
              className="text-[13px] font-semibold text-navy no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 whitespace-nowrap"
            >
              📞 {agence.telephone}
            </a>
          </li>
          <li>
            <a
              href="#formulaire-parrainage"
              className="text-[13px] font-bold text-white no-underline px-[18px] py-2 rounded-full bg-red hover:bg-red-h hover:shadow-[0_4px_16px_rgba(200,16,46,.3)] transition-all whitespace-nowrap"
            >
              Parrainer
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
