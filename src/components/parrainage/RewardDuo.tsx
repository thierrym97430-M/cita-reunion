"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OFFRE, avantages } from "@/lib/parrainage";
import type { Agence } from "@/lib/agences";

const EASE = [0.22, 1, 0.36, 1] as const;

function Card({
  role,
  badge,
  valeur,
  unite,
  detail,
  bonus,
  accent,
  delay,
}: {
  role: string;
  badge: string;
  valeur: string;
  unite: string;
  detail: string;
  bonus: readonly string[];
  accent: "navy" | "red";
  delay: number;
}) {
  const reduce = useReducedMotion();
  const isRed = accent === "red";

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 40, rotateX: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className="group relative bg-w border-[1.5px] border-g100 rounded-[22px] p-8 max-sm:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-g200 hover:shadow-[0_18px_50px_rgba(13,24,41,.09)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* barre top */}
      <span
        className={`absolute top-0 left-0 right-0 h-[3px] bg-g100 transition-colors duration-300 ${
          isRed ? "group-hover:bg-red" : "group-hover:bg-navy"
        }`}
      />

      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-g400">
          {role}
        </div>
        <span
          className={`text-[10px] font-heading font-bold tracking-[0.5px] px-2.5 py-1 rounded-full ${
            isRed ? "bg-red-g text-red" : "bg-navy/[0.07] text-navy"
          }`}
        >
          {badge}
        </span>
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className="font-heading text-[54px] max-sm:text-[42px] font-extrabold text-ink leading-none tracking-[-2px]">
          {valeur}
        </span>
        <span
          className={`font-heading text-[15px] font-bold ${
            isRed ? "text-red" : "text-navy"
          }`}
        >
          {unite}
        </span>
      </div>

      <p className="text-[14px] text-g700 leading-[1.75] mt-3.5">{detail}</p>

      <ul className="list-none mt-6 pt-5 border-t border-g100 flex flex-col gap-2.5">
        {bonus.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[13px] text-g700 leading-[1.6]">
            <span
              className={`mt-0.5 w-[18px] h-[18px] shrink-0 rounded-md flex items-center justify-center text-[10px] font-bold ${
                isRed ? "bg-red-g text-red" : "bg-navy/[0.07] text-navy"
              }`}
            >
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function RewardDuo({ agence }: { agence: Agence }) {
  const reduce = useReducedMotion();
  const atouts = avantages(agence);

  return (
    <section className="bg-g50 py-[100px] px-10 max-sm:px-5 max-sm:py-[70px]" id="offre">
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[560px] mx-auto mb-14">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2 justify-center">
            <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
            L&apos;offre
          </div>
          <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.8px] text-ink leading-[1.08]">
            Tout le monde y gagne.
          </h2>
          <p className="text-[15px] text-g400 leading-[1.75] mt-3">
            Une seule recommandation, deux récompenses. Vos proches sont protégés,
            vous êtes remercié.
          </p>
        </div>

        {/* Duo de cartes */}
        <div className="relative grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-5" style={{ perspective: 1200 }}>
          <Card
            role="Vous, le parrain"
            badge="CLIENT CITA"
            valeur={OFFRE.parrain.valeur}
            unite={OFFRE.parrain.unite}
            detail={OFFRE.parrain.detail}
            bonus={OFFRE.parrain.bonus}
            accent="navy"
            delay={0}
          />

          {/* Connecteur central */}
          <motion.div
            aria-hidden
            initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-red text-white font-heading font-extrabold text-lg flex items-center justify-center shadow-[0_8px_24px_rgba(200,16,46,.35)] ring-8 ring-g50 max-md:hidden"
          >
            +
          </motion.div>

          <Card
            role="Votre filleul(e)"
            badge="NOUVEAU CLIENT"
            valeur={OFFRE.filleul.valeur}
            unite={OFFRE.filleul.unite}
            detail={OFFRE.filleul.detail}
            bonus={OFFRE.filleul.bonus}
            accent="red"
            delay={0.12}
          />
        </div>

        {/* Bandeau highlight */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative overflow-hidden mt-6 bg-navy rounded-[20px] px-8 py-7 max-sm:px-6 flex items-center justify-between gap-6 flex-wrap"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-red opacity-20 blur-[70px] pointer-events-none"
          />
          <div className="relative">
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/40 mb-2">
              {OFFRE.highlight.label}
            </div>
            <div className="font-heading text-[clamp(22px,2.6vw,30px)] font-extrabold text-white leading-tight">
              {OFFRE.highlight.valeur}
            </div>
            <div className="text-[13px] text-white/50 mt-1.5 max-w-[440px] leading-[1.7]">
              {OFFRE.highlight.detail}
            </div>
          </div>
          <a
            href="#formulaire-parrainage"
            className="relative bg-red text-white font-heading font-extrabold text-[14px] px-6 py-3.5 rounded-xl no-underline whitespace-nowrap transition-all hover:bg-red-h hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(200,16,46,.35)]"
          >
            Je parraine maintenant →
          </a>
        </motion.div>

        {/* Avantages */}
        <div className="grid grid-cols-4 gap-3.5 mt-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {atouts.map((a, i) => (
            <motion.div
              key={a.titre}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="bg-w border border-g100 rounded-[18px] p-5 transition-colors hover:border-g200"
            >
              <div className="w-9 h-9 rounded-xl bg-red-g flex items-center justify-center text-base mb-3.5">
                {a.icone}
              </div>
              <div className="font-heading text-[14px] font-extrabold text-ink mb-1.5">
                {a.titre}
              </div>
              <div className="text-[12.5px] text-g400 leading-[1.65]">{a.texte}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
