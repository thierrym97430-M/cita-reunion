"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { faqParrainage, conditions } from "@/lib/parrainage";
import type { Agence } from "@/lib/agences";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ParrainageFaq({ agence }: { agence: Agence }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const [showConditions, setShowConditions] = useState(false);

  const questions = faqParrainage(agence);
  const modalites = conditions(agence);
  /* Le premier bureau porte les horaires du service client. */
  const horaires = agence.bureaux[0]?.horaires;

  return (
    <section className="bg-w py-[100px] px-10 max-sm:px-5 max-sm:py-[70px]" id="faq-parrainage">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-10">
          {/* Colonne gauche sticky */}
          <div className="sticky top-24 max-md:static">
            <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2">
              <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
              Questions fréquentes
            </div>
            <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.8px] text-ink leading-[1.08]">
              Tout ce qu&apos;il faut savoir.
            </h2>
            <p className="text-[15px] text-g400 leading-[1.75] mt-3">
              Une question qui n&apos;est pas ici ? Appelez-nous, on vous répond
              directement.
            </p>

            <div className="mt-8 bg-navy rounded-[20px] p-6 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-red opacity-25 blur-[60px]"
              />
              <div className="relative">
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/40 mb-2">
                  Service client
                </div>
                <a
                  href={`tel:${agence.telHref}`}
                  className="font-heading text-[22px] font-extrabold text-white no-underline block"
                >
                  {agence.telephone}
                </a>
                {horaires && (
                  <div className="text-[12px] text-white/45 mt-1.5">{horaires}</div>
                )}
                <a
                  href="#formulaire-parrainage"
                  className="mt-5 inline-block bg-red text-white font-heading text-[13px] font-extrabold px-5 py-2.5 rounded-full no-underline transition-colors hover:bg-red-h"
                >
                  Parrainer un proche →
                </a>
              </div>
            </div>
          </div>

          {/* Accordéon */}
          <div>
            {questions.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={reduce ? undefined : { opacity: 0, y: 20 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="border-b border-g100"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-5 text-left bg-transparent border-none cursor-pointer py-5 group"
                  >
                    <span
                      className={`font-heading text-[15.5px] font-bold leading-snug transition-colors ${
                        isOpen ? "text-red" : "text-ink group-hover:text-navy"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[16px] font-heading transition-all duration-300 ${
                        isOpen
                          ? "bg-red text-white rotate-45"
                          : "bg-g50 text-g400 group-hover:bg-g100"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-400 ease-out"
                    style={{ maxHeight: isOpen ? 220 : 0 }}
                  >
                    <p className="text-[14px] text-g700 leading-[1.8] pb-5 pr-10 max-sm:pr-0">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Conditions */}
            <div className="mt-8 bg-g50 border border-g100 rounded-[18px] overflow-hidden">
              <button
                type="button"
                onClick={() => setShowConditions((v) => !v)}
                aria-expanded={showConditions}
                className="w-full flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer px-6 py-4 text-left"
              >
                <span className="font-heading text-[13px] font-bold text-ink">
                  📄 Conditions du programme de parrainage
                </span>
                <span
                  className={`text-[11px] font-bold text-g400 transition-transform duration-300 ${
                    showConditions ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-500 ease-out"
                style={{ maxHeight: showConditions ? 600 : 0 }}
              >
                <ol className="px-6 pb-6 list-none flex flex-col gap-3">
                  {modalites.map((c, i) => (
                    <li
                      key={c}
                      className="flex gap-3 text-[12px] text-g400 leading-[1.7]"
                    >
                      <span className="font-heading font-bold text-g200 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c}
                    </li>
                  ))}
                </ol>
                <div className="px-6 pb-5 text-[11px] text-g400">
                  Consultez également nos{" "}
                  <Link
                    href="/mentions-legales"
                    className="text-navy underline underline-offset-2"
                  >
                    mentions légales
                  </Link>{" "}
                  et notre{" "}
                  <Link
                    href="/confidentialite"
                    className="text-navy underline underline-offset-2"
                  >
                    politique de confidentialité
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
