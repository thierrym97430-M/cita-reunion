"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OFFRE } from "@/lib/parrainage";
import type { Agence } from "@/lib/agences";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ParrainageHero({ agence }: { agence: Agence }) {
  const reduce = useReducedMotion();

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden bg-ink pt-[150px] pb-[110px] px-10 max-sm:px-5 max-sm:pt-[130px] max-sm:pb-20">
      {/* Blobs animés */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-[460px] h-[460px] rounded-full bg-navy-m opacity-40 blur-[80px] pointer-events-none"
        style={reduce ? undefined : { animation: "blob1 6s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-navy-l opacity-[0.35] blur-[80px] pointer-events-none"
        style={reduce ? undefined : { animation: "blob2 7s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/3 w-[380px] h-[380px] rounded-full bg-red opacity-25 blur-[80px] pointer-events-none"
        style={reduce ? undefined : { animation: "blob3 8s ease-in-out infinite" }}
      />

      {/* Grille de fond */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* Eyebrow */}
        <motion.div
          {...line(0)}
          className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/10 backdrop-blur-md rounded-full pl-3.5 pr-1.5 py-1.5 mb-8"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"
            style={reduce ? undefined : { animation: "pulse-green 1.8s ease-in-out infinite" }}
          />
          <span className="text-[12px] font-medium text-white/70">
            Programme de parrainage client
          </span>
          <span className="bg-red text-white text-[10px] font-bold tracking-[1px] px-2.5 py-1 rounded-full font-heading uppercase">
            {agence.nom} · {agence.code}
          </span>
        </motion.div>

        <div className="grid grid-cols-[1.3fr_1fr] gap-14 items-center max-md:grid-cols-1 max-md:gap-12">
          {/* Colonne titre */}
          <div>
            <h1 className="font-heading font-extrabold leading-[1.02] tracking-[-1.6px] text-[clamp(34px,4.1vw,54px)] whitespace-nowrap max-sm:whitespace-normal">
              <motion.span {...line(0.1)} className="block text-white">
                Parrainez vos proches.
              </motion.span>
              <motion.span
                {...line(0.22)}
                className="block text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.22)" }}
              >
                Ils sont protégés.
              </motion.span>
              <motion.span {...line(0.34)} className="block text-red">
                Vous êtes récompensé.
              </motion.span>
            </h1>

            <motion.p
              {...line(0.46)}
              className="text-[16px] text-white/55 leading-[1.8] max-w-[520px] mt-7"
            >
              Vous êtes client {agence.nomComplet} ? Recommandez-nous à un proche et{" "}
              <strong className="text-white font-medium">
                gagnez 2 mois offerts
              </strong>
              . Votre filleul(e) reçoit 1 mois offert.
            </motion.p>

            <motion.div {...line(0.56)} className="flex flex-wrap gap-3 mt-9">
              <a
                href="#formulaire-parrainage"
                className="hero-btn-primary bg-red text-white font-heading font-extrabold text-[15px] px-7 py-[15px] rounded-xl no-underline inline-flex items-center gap-2 transition-all hover:bg-red-h hover:-translate-y-0.5"
              >
                Parrainer un proche →
              </a>
              <a
                href="#comment-ca-marche"
                className="border border-white/20 text-white font-heading font-bold text-[15px] px-7 py-[15px] rounded-xl no-underline inline-flex items-center gap-2 transition-all hover:bg-white/[0.07] hover:border-white/35"
              >
                Comment ça marche ?
              </a>
            </motion.div>

            <motion.div {...line(0.66)} className="flex flex-wrap gap-2 mt-8">
              {[
                "Parrainages illimités",
                "Rappel sous 48h",
                "Sans engagement",
              ].map((t) => (
                <span
                  key={t}
                  className="text-[12px] text-white/60 bg-white/[0.05] border border-white/10 rounded-full px-3.5 py-1.5"
                >
                  ✓ {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Colonne offre — ticket */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.92, rotateY: -12 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            style={{ perspective: 1000 }}
          >
            <div className="relative bg-white/[0.055] border border-white/[0.12] backdrop-blur-xl rounded-[22px] p-8 max-sm:p-6 shadow-[0_24px_70px_rgba(0,0,0,.45)]">
              <div className="absolute top-0 left-8 right-8 h-[3px] bg-red rounded-b-sm" />

              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/40 mb-5">
                Votre récompense
              </div>

              {/* Parrain */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-[56px] max-sm:text-[46px] font-extrabold text-white leading-none tracking-[-2px]">
                  {OFFRE.parrain.valeur}
                </span>
                <span className="font-heading text-[15px] font-bold text-red">
                  offerts
                </span>
              </div>
              <div className="text-[13px] text-white/50 leading-[1.7] mt-2">
                pour vous —{" "}
                <strong className="text-white/85 font-medium">le parrain</strong>.
              </div>

              {/* Séparateur perforé façon ticket */}
              <div className="relative my-6 flex items-center">
                <span className="absolute -left-[42px] w-5 h-5 rounded-full bg-ink max-sm:-left-[34px]" />
                <span className="flex-1 border-t border-dashed border-white/15" />
                <span className="absolute -right-[42px] w-5 h-5 rounded-full bg-ink max-sm:-right-[34px]" />
              </div>

              {/* Filleul */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-[56px] max-sm:text-[46px] font-extrabold text-white leading-none tracking-[-2px]">
                  {OFFRE.filleul.valeur}
                </span>
                <span className="font-heading text-[15px] font-bold text-red">
                  offert
                </span>
              </div>
              <div className="text-[13px] text-white/50 leading-[1.7] mt-2">
                pour votre filleul(e).
              </div>

              <div className="mt-7 pt-5 border-t border-white/[0.08] flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full bg-red shrink-0"
                  style={reduce ? undefined : { animation: "pulse-red 1.5s ease-in-out infinite" }}
                />
                <span className="text-[11px] text-white/45">
                  Cumulable · Aucune démarche · Appliqué sur votre facture
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
