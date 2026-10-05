import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ParrainageHero from "@/components/parrainage/ParrainageHero";
import RewardDuo from "@/components/parrainage/RewardDuo";
import HowItWorks from "@/components/parrainage/HowItWorks";
import ParrainageForm from "@/components/parrainage/ParrainageForm";
import ParrainageFaq from "@/components/parrainage/ParrainageFaq";
import { faqParrainage } from "@/lib/parrainage";
import { getAgence, tousLesSlugs } from "@/lib/agences";
import { getCommerciaux } from "@/lib/commerciaux";

/** Les cinq pages sont connues à la compilation. */
export function generateStaticParams() {
  return tousLesSlugs().map((agence) => ({ agence }));
}

/** Un slug hors liste est une 404, pas une page vide. */
export const dynamicParams = false;

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cita-reunion.vercel.app"
).replace(/\/+$/, "");

type Props = { params: Promise<{ agence: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agence: slug } = await params;
  const agence = getAgence(slug);
  if (!agence) return {};

  const url = `${SITE_URL}/${agence.slug}/parrainage`;
  const titre = `Parrainage ${agence.nomComplet} — 2 mois offerts`;
  const description = `Parrainez vos proches chez ${agence.nomComplet} : 2 mois offerts pour le parrain, 1 mois offert pour votre filleul(e). Parrainages illimités. ☎ ${agence.telephone}`;

  return {
    title: `Parrainage ${agence.nom} — 2 mois offerts`,
    description,
    keywords: [
      `parrainage alarme ${agence.nom}`,
      `parrainage télésurveillance ${agence.code}`,
      `offre parrainage CITA ${agence.nom}`,
      `parrainer un proche sécurité ${agence.nom}`,
    ],
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: agence.nomComplet,
      title: titre,
      description: `Recommandez CITA à un proche : vous gagnez 2 mois offerts, il reçoit 1 mois offert.`,
    },
    alternates: { canonical: url },
  };
}

export default async function ParrainageAgencePage({ params }: Props) {
  const { agence: slug } = await params;
  const agence = getAgence(slug);
  if (!agence) notFound();

  /* Les commerciaux sont lus dans LeadFlow au rendu, côté serveur : la clé
     de l'agence ne quitte jamais le serveur. Liste vide si l'application est
     injoignable — le formulaire bascule alors en saisie libre. */
  const commerciaux = await getCommerciaux(agence);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqParrainage(agence).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Nav agence={agence} />
      <main>
        <ParrainageHero agence={agence} />
        <RewardDuo agence={agence} />
        <HowItWorks agence={agence} />
        <ParrainageForm agence={agence} commerciaux={commerciaux} />
        <ParrainageFaq agence={agence} />

        {/* Dernier appel */}
        <section className="bg-red px-10 py-14 max-sm:px-5">
          <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-8 flex-wrap">
            <div>
              <h2 className="font-heading text-[clamp(22px,3vw,34px)] font-extrabold text-white leading-tight tracking-[-0.5px]">
                Un proche à protéger ?
              </h2>
              <p className="text-[14px] text-white/75 mt-2 max-w-[440px] leading-[1.7]">
                Parrainez-le en 2 minutes — vous gagnez 2 mois offerts, il gagne 1 mois
                offert.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#formulaire-parrainage"
                className="cta-pulse bg-w text-red font-heading font-extrabold text-[15px] px-7 py-[15px] rounded-xl no-underline transition-transform hover:-translate-y-0.5"
              >
                Parrainer maintenant →
              </a>
              <a
                href={`tel:${agence.telHref}`}
                className="border border-white/40 text-white font-heading font-bold text-[15px] px-7 py-[15px] rounded-xl no-underline transition-colors hover:bg-white/10"
              >
                📞 {agence.telephone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer agence={agence} />
    </>
  );
}
