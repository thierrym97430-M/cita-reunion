"use client";

import Image from "next/image";
import { Reveal } from "@/lib/motion";

const services = [
  {
    name: "Système d'alarme intrusion",
    desc: "Jusqu'à 15 secteurs programmables. Centrale dernière génération. Communication immédiate vers notre centre. Conforme APSAD R82.",
    image: "/images/alarme-vesta.png",
    imageAlt: "Gamme de centrales d'alarme Vesta",
  },
  {
    name: "Vidéoprotection HD",
    desc: "Caméras HD fixes, motorisées et dôme 360°. Accès temps réel sur smartphone. Sauvegarde 30 jours. Multi-sites centralisé.",
    image: "/images/video-dahua.png",
    imageAlt: "Gamme de caméras et enregistreurs Dahua",
  },
  {
    name: "Télésurveillance 24h/24",
    desc: "Centre de supervision permanent. Levée de doute immédiate. Photos automatiques en cas d'intrusion.",
    image: "/images/telesurveillance.webp",
    imageAlt: "Centre de télésurveillance — opérateur devant les écrans de surveillance",
  },
  {
    name: "Contrôle d'accès",
    desc: "Badge, biométrie, clavier code. Filtrez les accès à vos locaux professionnels avec supervision centralisée.",
    image: "/images/acces-biometrique.jpeg",
    imageAlt: "Lecteur biométrique de contrôle d'accès avec badge",
  },
  {
    name: "Gardiennage & Patrouille",
    desc: "Agents mobilisables jour et nuit. Interventions physiques et levées de doute sur l'ensemble de l'île.",
    image: "/images/patrouille-cita.jpeg",
    imageAlt: "Agent CITA Security en patrouille dans un couloir",
  },
  {
    name: "Portiques antivol",
    desc: "Protégez vos marchandises contre la démarque inconnue. Portiques EAS Sensormatic — technologie acousto-magnétique (AM) et radiofréquence (RF).",
    image: "/images/sensormatic-synergy.png",
    imageAlt: "Portique antivol Sensormatic Synergy 2.5 Acrylic",
  },
];

export default function Services() {
  return (
    <section className="py-[100px] px-10 bg-g50 max-sm:px-5" id="services">
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-11 gap-8 max-md:flex-col max-md:items-start">
          <div>
            <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2">
              <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
              Nos solutions
            </div>
            <h2 className="font-heading text-[clamp(30px,4vw,50px)] font-extrabold tracking-[-1px] text-ink leading-[1.05] mb-3.5">
              Protection complète,
              <br />
              sur-mesure.
            </h2>
          </div>
          <p className="text-[15px] text-g400 leading-[1.75] max-w-[340px]">
            De la maison individuelle aux locaux industriels — adaptés à votre
            niveau de risque et votre budget.
          </p>
        </div>

        {/* Bento Grid — uniform 3 columns */}
        <div className="grid grid-cols-12 gap-3.5">
          {services.map((s, i) => (
            <Reveal
              key={s.name}
              delay={i * 0.08}
              className="col-span-4 max-md:col-span-6 max-sm:col-span-12"
            >
              <div className="bg-w border-[1.5px] border-g100 rounded-[20px] relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,24,41,.08)] hover:border-g200 group h-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-g100 before:transition-colors hover:before:bg-red flex flex-col">
                {/* Photo plein cadre */}
                <div className="relative w-full h-[180px] bg-g50 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    quality={85}
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="font-heading text-[17px] font-extrabold text-ink mb-2">
                    {s.name}
                  </div>
                  <div className="text-[13px] text-g700 leading-[1.7] mb-4 flex-1">
                    {s.desc}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-red no-underline"
                  >
                    Demander un devis →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}

          {/* CTA Card — span 8, centered */}
          <Reveal
            delay={0.16}
            className="col-span-8 col-start-3 max-md:col-span-12 max-md:col-start-1"
          >
            <div className="bg-navy border-[1.5px] border-navy rounded-[20px] p-7 px-6 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,24,41,.08)] h-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-red flex items-center gap-8 max-sm:flex-col max-sm:items-start">
              <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center text-xl shrink-0 bg-[rgba(200,16,46,.18)]">
                💬
              </div>
              <div className="flex-1">
                <div className="font-heading text-xl font-extrabold text-white mb-2">
                  Un projet ? Parlons-en.
                </div>
                <div className="text-[13px] text-white/50 leading-[1.7]">
                  Devis gratuit, sans engagement. Réponse sous 24h. Notre équipe
                  locale vous conseille.
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-[7px] bg-red text-white no-underline px-5 py-[11px] rounded-[9px] font-heading text-[13px] font-bold transition-colors hover:bg-red-h shrink-0"
              >
                Devis gratuit →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
