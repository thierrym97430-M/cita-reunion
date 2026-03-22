"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

const stepVariants = {
  hidden: { opacity: 0, rotateX: 25, translateY: 60 },
  visible: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

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

        <div
          ref={timelineRef}
          className="grid grid-cols-4 gap-0 mt-14 relative max-md:grid-cols-2 max-md:gap-8"
          style={{ perspective: 1000 }}
        >
          {/* Static background line */}
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-g200 max-md:hidden" />
          {/* Animated progress line */}
          {!shouldReduceMotion && (
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-red to-red/30 max-md:hidden z-[1]"
            />
          )}

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              custom={i}
              initial={shouldReduceMotion ? undefined : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-60px" }}
              variants={shouldReduceMotion ? undefined : stepVariants}
            >
              <div className="relative z-[1] px-[18px] text-center group">
                <div className="w-14 h-14 rounded-full bg-w border-[1.5px] border-g200 flex items-center justify-center mx-auto mb-[22px] font-heading text-lg font-extrabold text-g200 transition-all group-hover:border-red group-hover:text-red group-hover:bg-red-g relative z-[2]">
                  {s.num}
                </div>
                <div className="font-heading text-[15px] font-extrabold text-ink mb-2">
                  {s.title}
                </div>
                <p className="text-[13px] text-g400 leading-[1.65]">
                  {s.desc}
                </p>
              </div>
            </motion.div>
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
