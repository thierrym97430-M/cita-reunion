"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AGENCE_PAR_DEFAUT } from "@/lib/agences";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ParrainageBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-w px-10 py-[70px] max-sm:px-5 max-sm:py-12" id="parrainage">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden bg-ink rounded-[22px] px-10 py-9 max-sm:px-6 max-sm:py-7"
        >
          {/* Blobs décoratifs */}
          <div
            aria-hidden
            className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-navy-m opacity-50 blur-[70px] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -right-16 -bottom-24 w-72 h-72 rounded-full bg-red opacity-25 blur-[70px] pointer-events-none"
          />
          {/* Grille */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative flex items-center justify-between gap-10 flex-wrap">
            <div className="max-w-[540px]">
              <div className="inline-flex items-center gap-2 bg-red text-white text-[10px] font-heading font-bold tracking-[1px] px-3 py-1 rounded-full mb-4">
                🎁 DÉJÀ CLIENT CITA ?
              </div>
              <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-extrabold text-white leading-[1.12] tracking-[-0.6px]">
                Parrainez vos proches,
                <br />
                <span className="text-red">gagnez 2 mois</span> d&apos;abonnement.
              </h2>
              <p className="text-[14px] text-white/55 leading-[1.75] mt-3">
                Votre filleul(e) reçoit 1 mois offert et son installation offerte.
                Sans limite de parrainages.
              </p>
            </div>

            <div className="flex items-center gap-6 max-sm:gap-4">
              {/* Mini ticket */}
              <div className="text-right max-sm:hidden">
                <div className="font-heading text-[44px] font-extrabold text-white leading-none tracking-[-1.5px]">
                  2 mois
                </div>
                <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-white/40 mt-1.5">
                  offerts pour vous
                </div>
              </div>
              <span aria-hidden className="w-px h-16 bg-white/10 max-sm:hidden" />
              <Link
                href={`/${AGENCE_PAR_DEFAUT}/parrainage`}
                className="bg-red text-white font-heading font-extrabold text-[15px] px-7 py-[15px] rounded-xl no-underline whitespace-nowrap transition-all hover:bg-red-h hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(200,16,46,.4)]"
              >
                Découvrir le parrainage →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
