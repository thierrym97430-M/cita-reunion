"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ETAPES } from "@/lib/parrainage";
import type { Agence } from "@/lib/agences";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks({ agence }: { agence: Agence }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="bg-w py-[100px] px-10 max-sm:px-5 max-sm:py-[70px]"
      id="comment-ca-marche"
    >
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[560px] mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2 justify-center">
            <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
            Comment ça marche
          </div>
          <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.8px] text-ink leading-[1.08]">
            3 étapes, 2 minutes.
          </h2>
          <p className="text-[15px] text-g400 leading-[1.75] mt-3">
            Vous n&apos;avez rien d&apos;autre à faire : nous nous occupons de tout,
            de l&apos;appel jusqu&apos;à l&apos;installation.
          </p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative" style={{ perspective: 1200 }}>
          {/* Ligne de connexion */}
          <div
            aria-hidden
            className="absolute top-7 left-[16.66%] right-[16.66%] h-[2px] bg-g100 max-md:hidden"
          >
            <motion.div
              className="h-full w-full bg-red origin-left"
              style={reduce ? { transform: "scaleX(1)" } : { scaleX }}
            />
          </div>

          <div className="relative grid grid-cols-3 gap-8 max-md:grid-cols-1 max-md:gap-10">
            {ETAPES.map((e, i) => (
              <motion.div
                key={e.num}
                initial={reduce ? undefined : { opacity: 0, y: 50, rotateX: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: i * 0.14, ease: EASE }}
                className="group text-center max-md:text-left max-md:flex max-md:gap-5"
              >
                {/* Cercle numéroté */}
                <div className="relative mx-auto max-md:mx-0 w-14 h-14 shrink-0 rounded-full bg-w border-2 border-g200 flex items-center justify-center font-heading text-[15px] font-extrabold text-g400 transition-all duration-300 group-hover:border-red group-hover:text-red group-hover:bg-red-g group-hover:scale-110">
                  {e.num}
                </div>

                <div className="max-md:pt-2">
                  <div className="text-2xl mt-6 mb-3 max-md:mt-0 max-md:mb-2">{e.icone}</div>
                  <h3 className="font-heading text-[17px] font-extrabold text-ink leading-snug mb-2.5">
                    {e.titre}
                  </h3>
                  <p className="text-[13.5px] text-g400 leading-[1.75] max-w-[300px] mx-auto max-md:mx-0">
                    {e.texte}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rappel de délai */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-14 flex items-center justify-center gap-3 flex-wrap text-center"
        >
          <span className="text-[13px] text-g400">
            Une question sur le programme ?
          </span>
          <a
            href={`tel:${agence.telHref}`}
            className="font-heading text-[14px] font-bold text-navy no-underline border border-g200 rounded-full px-4 py-2 transition-colors hover:border-navy hover:bg-g50"
          >
            📞 {agence.telephone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
