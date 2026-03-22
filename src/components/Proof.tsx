"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/lib/motion";
import PhotoCarousel from "./PhotoCarousel";

const statBlocks = [
  {
    big: (
      <>
        <span className="text-red">35</span>+
      </>
    ),
    title: "Années d'expertise terrain",
    sub: "Présents dans les DOM depuis 1988. Une équipe qui connaît les spécificités de l'île.",
  },
  {
    big: "24/7",
    title: "Centre de télésurveillance",
    sub: "Opérateurs disponibles 365j/an. Levée de doute en quelques secondes.",
  },
  {
    big: null,
    bigCustom: (
      <div className="font-heading text-[26px] font-extrabold text-white leading-[1.2] min-w-[95px] shrink-0">
        APSAD
        <br />
        <span className="text-red text-lg">R82</span>
      </div>
    ),
    title: "Certifications reconnues",
    sub: "Installations conformes. Certificat remis à l'issue des travaux. Accepté par toutes les assurances.",
  },
];

const testimonials = [
  {
    featured: true,
    text: "\"Installation rapide et très professionnelle. Le technicien a pris le temps d'expliquer chaque composant. Je pars en déplacement serein. Je recommande vivement CITA Réunion.\"",
    initials: "JF",
    name: "Jean-François M.",
    role: "Particulier · Saint-Denis",
  },
  {
    featured: false,
    text: "\"CITA gère la sécurité de notre pharmacie depuis 3 ans. Lors d'un déclenchement nocturne, l'intervention a été déclenchée en moins de 10 minutes. Très réactif.\"",
    initials: "ML",
    name: "Marie-Laure P.",
    role: "Pharmacie · Saint-Pierre",
  },
  {
    featured: false,
    text: "\"Nos 4 commerces sont équipés en vidéoprotection CITA. Suivi commercial sérieux, installation soignée, SAV au top. Rapport qualité-prix excellent.\"",
    initials: "RC",
    name: "Régis C.",
    role: "Commerces · Le Port",
  },
];

export default function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="py-[100px] px-10 bg-navy relative overflow-hidden max-sm:px-5 section-vignette"
      id="proof"
    >
      {/* Background blob with parallax */}
      <motion.div
        className="absolute -top-[250px] -right-[250px] w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,91,219,.12), transparent 70%)",
          y: shouldReduceMotion ? 0 : bgY,
        }}
      />
      <div className="max-w-[1180px] mx-auto relative z-[2]">
        <div className="grid grid-cols-2 gap-20 items-start max-md:grid-cols-1 max-md:gap-10">
          {/* Left — with parallax */}
          <motion.div style={{ y: shouldReduceMotion ? 0 : leftY }}>
            <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#e87088] mb-3.5 flex items-center gap-2">
              <span className="w-[18px] h-0.5 bg-[#e87088] rounded-sm block" />
              Pourquoi CITA
            </div>
            <h2 className="font-heading text-[clamp(30px,4vw,50px)] font-extrabold tracking-[-1px] text-white leading-[1.05] mb-3.5">
              Ancré à La Réunion.
              <br />
              La force d&apos;un groupe.
            </h2>
            <p className="text-[15px] text-white/40 leading-[1.75] mb-10 max-w-[440px]">
              CITA La Réunion est l&apos;agence locale du Groupe CITA, leader de
              la sécurité privée dans les DOM depuis 1988. Avec deux agences —
              l&apos;une à Saint-Denis au Chaudron, l&apos;autre au Tampon — nous
              sommes au plus près de chaque client, du Nord au Sud de l&apos;île.
            </p>
            <div className="flex flex-col gap-4">
              {statBlocks.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="flex items-center gap-5 px-[22px] py-5 bg-white/[.05] border border-white/[.08] rounded-[14px] transition-colors hover:bg-white/[.08]">
                    {s.bigCustom ? (
                      s.bigCustom
                    ) : (
                      <div className="font-heading text-[42px] font-extrabold text-white leading-none tracking-[-1px] shrink-0 min-w-[95px]">
                        {s.big}
                      </div>
                    )}
                    <div>
                      <div className="font-heading text-sm font-bold text-white mb-1">
                        {s.title}
                      </div>
                      <div className="text-xs text-white/[.38] leading-[1.6]">
                        {s.sub}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </motion.div>

          {/* Right — photos + testimonials with parallax */}
          <motion.div
            className="flex flex-col gap-3"
            style={{ y: shouldReduceMotion ? 0 : rightY }}
          >
            {/* Photos terrain — carrousel */}
            <PhotoCarousel />
            <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-white/[.28] mb-3.5">
              Avis clients vérifiés
            </div>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div
                  className={`bg-white/[.05] border border-white/[.08] rounded-2xl p-6 transition-colors hover:bg-white/[.08] hover:border-white/[.14] ${t.featured ? "bg-white/[.08] border-white/[.14]" : ""}`}
                >
                  <div className="mb-3 text-[13px]">⭐⭐⭐⭐⭐</div>
                  <p className="text-[13px] text-white/55 leading-[1.75] mb-4 italic">
                    {t.text}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-[34px] h-[34px] rounded-full bg-navy-l border border-white/10 flex items-center justify-center font-heading text-xs font-bold text-white/70">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-heading text-[13px] font-bold text-white">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-white/30 mt-px">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
