"use client";

import { Reveal } from "@/lib/motion";

const stats = [
  { num: "35", accent: true, suffix: "+", label: "Années d'expérience" },
  { num: "24/7", accent: false, suffix: "", label: "Télésurveillance permanente" },
  { num: "5", accent: true, suffix: "", label: "Agences outre-mer" },
  { num: "2", accent: true, suffix: "", label: "Agences de proximité" },
];

export default function StatsStrip() {
  return (
    <div className="bg-navy">
      <div className="max-w-[1180px] mx-auto grid grid-cols-4 border-l border-r border-white/[.07] max-md:grid-cols-2">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="px-7 py-9 border-r border-white/[.07] last:border-0 transition-colors hover:bg-white/[.04] max-md:border-b max-md:border-white/[.07]">
              <div className="font-heading text-[44px] font-extrabold text-white leading-none tracking-[-1.5px]">
                {s.accent ? (
                  <>
                    <span className="text-red">{s.num}</span>
                    {s.suffix}
                  </>
                ) : (
                  s.num + s.suffix
                )}
              </div>
              <div className="text-xs text-white/35 mt-2">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
