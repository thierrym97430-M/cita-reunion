"use client";

import { Reveal } from "@/lib/motion";
import PhotoCarousel from "./PhotoCarousel";

const steps = [
  {
    num: "01",
    title: "Analyse de site",
    desc: "Étude personnalisée de votre niveau de risque et des spécificités de votre bien.",
  },
  {
    num: "02",
    title: "Solution sur-mesure",
    desc: "Proposition adaptée à votre situation et votre budget — sans engagement.",
  },
  {
    num: "03",
    title: "Installation certifiée",
    desc: "Pose par nos techniciens certifiés, conforme à la norme APSAD R82.",
  },
  {
    num: "04",
    title: "Suivi & Maintenance",
    desc: "Service clients disponible 24h/24 pour faire évoluer votre dispositif.",
  },
];

export default function Process() {
  return (
    <section className="py-[100px] px-10 bg-w max-sm:px-5" id="process">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-[520px] mx-auto">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2 justify-center">
            <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
            Notre méthode
          </div>
          <h2 className="font-heading text-[clamp(30px,4vw,50px)] font-extrabold tracking-[-1px] text-ink leading-[1.05] text-center">
            De l&apos;analyse
            <br />
            à la protection.
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-0 mt-14 relative max-md:grid-cols-2 max-md:gap-8 before:content-[''] before:absolute before:top-7 before:left-[12.5%] before:right-[12.5%] before:h-px before:bg-g200 max-md:before:hidden">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <div className="relative z-[1] px-[18px] text-center group">
                <div className="w-14 h-14 rounded-full bg-w border-[1.5px] border-g200 flex items-center justify-center mx-auto mb-[22px] font-heading text-lg font-extrabold text-g200 transition-all group-hover:border-red group-hover:text-red group-hover:bg-red-g">
                  {s.num}
                </div>
                <div className="font-heading text-[15px] font-extrabold text-ink mb-2">
                  {s.title}
                </div>
                <p className="text-[13px] text-g400 leading-[1.65]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Photo bandeau — carrousel interventions */}
        <div className="mt-16">
          <PhotoCarousel height="h-[200px]" />
        </div>
      </div>
    </section>
  );
}
