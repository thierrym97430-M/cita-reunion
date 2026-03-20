"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Combien coûte une installation de sécurité ?",
    a: "Le coût dépend de vos besoins spécifiques. CITA réalise une étude gratuite et personnalisée avant tout devis. Nous proposons des solutions adaptées à tous les budgets — des particuliers jusqu'aux professionnels, industriels et collectivités.",
  },
  {
    q: "Quelle est la zone d'intervention de CITA à La Réunion ?",
    a: "CITA couvre l'intégralité du département 974. Avec deux agences — l'une à Saint-Denis (Nord) et l'autre au Tampon (Sud) — nos techniciens interviennent rapidement sur toute l'île pour l'installation, la maintenance et les dépannages.",
  },
  {
    q: "Qu'est-ce que la certification APSAD R82 et pourquoi est-elle importante ?",
    a: "La norme APSAD R82 est la certification de référence en France pour les systèmes de vidéoprotection professionnels. Elle garantit que l'installation respecte des critères stricts : qualité des équipements, pertinence du positionnement des caméras, enregistrement conforme et protection des données. Une installation certifiée R82 est reconnue par votre assureur et conforme aux exigences légales, notamment pour les établissements recevant du public (ERP). CITA La Réunion remet un certificat de conformité R82 à l'issue de chaque installation vidéo professionnelle.",
    hasCert: true,
  },
  {
    q: "Comment fonctionne la télésurveillance 24h/24 ?",
    a: "En cas de déclenchement, votre système envoie une alerte instantanée à notre centre de télésurveillance — situé ici, à La Réunion. Ce sont des opérateurs réunionnais, qui connaissent le territoire, qui analysent chaque événement en temps réel. Selon vos consignes, ils contactent les secours, nos agents d'intervention ou vous alertent directement. Pas de centre délocalisé : votre sécurité est gérée au plus près, par des gens qui connaissent l'île.",
  },
  {
    q: "Puis-je accéder à mes caméras depuis mon smartphone ?",
    a: "Absolument. Nos systèmes permettent un accès en temps réel depuis votre smartphone ou tablette, avec une sauvegarde allant jusqu'à 30 jours selon votre configuration.",
  },
  {
    q: "Combien de temps dure une installation ?",
    a: null,
    richContent: true,
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="py-[100px] px-10 bg-g50 max-sm:px-5" id="faq">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-[1fr_1.6fr] gap-[72px] items-start max-md:grid-cols-1 max-md:gap-10">
          {/* Left sticky */}
          <div className="sticky top-24 max-md:static">
            <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2">
              <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
              FAQ
            </div>
            <h2 className="font-heading text-[clamp(30px,4vw,50px)] font-extrabold tracking-[-1px] text-ink leading-[1.05] mb-3.5">
              Questions
              <br />
              fréquentes.
            </h2>
            <p className="text-[15px] text-g400 leading-[1.75] mt-2.5">
              Tout ce que vous devez savoir avant de nous contacter.
            </p>
            <div className="mt-8 bg-navy rounded-2xl p-6 flex flex-col gap-3">
              <div className="font-heading text-[15px] font-extrabold text-white">
                Une autre question ?
              </div>
              <div className="text-xs text-white/40 leading-[1.6]">
                Notre équipe réunionnaise vous répond sous 24h. Devis gratuit,
                sans engagement.
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-[7px] bg-red text-white no-underline px-5 py-[11px] rounded-[9px] font-heading text-[13px] font-bold transition-colors hover:bg-red-h w-fit"
              >
                Nous contacter →
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col gap-2">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`bg-w border-[1.5px] rounded-[14px] overflow-hidden transition-colors ${isOpen ? "border-g200" : "border-g100"}`}
                >
                  <button
                    className="flex items-start justify-between px-[22px] py-5 gap-3 w-full text-left cursor-pointer bg-transparent border-0"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-label={f.q}
                  >
                    <span className="font-heading text-sm font-bold text-ink leading-[1.4]">
                      {f.q}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${isOpen ? "bg-navy border-navy rotate-45" : "border-g200 bg-transparent"}`}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M5 2v6M2 5h6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          stroke={isOpen ? "#fff" : "#8B96AD"}
                        />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" as const }}
                        className="overflow-hidden"
                      >
                        <div className="mx-[22px] mb-[18px] pt-3.5 border-t border-g100 text-[13px] text-g700 leading-[1.75]">
                          {f.richContent ? (
                            <div>
                              <p className="mb-3">
                                Cela dépend du type de système :
                              </p>
                              <ul className="list-none space-y-2">
                                <li>
                                  <strong>Alarme radio (particuliers, petits locaux)</strong>{" "}
                                  : environ une demi-journée. Idéal pour les
                                  maisons individuelles et appartements.
                                </li>
                                <li>
                                  <strong>
                                    Alarme filaire (commerces, surfaces professionnelles)
                                  </strong>{" "}
                                  : 2 à 3 jours selon la superficie et la
                                  complexité du site. Utilisé pour les commerces,
                                  entrepôts et bâtiments professionnels.
                                </li>
                                <li>
                                  <strong>
                                    Vidéoprotection (villa standard, 4 caméras)
                                  </strong>{" "}
                                  : environ 1 journée pour un système de 4
                                  entrées dans une configuration résidentielle
                                  standard.
                                </li>
                              </ul>
                              <p className="mt-3 text-g400 text-[12px]">
                                Pour les projets plus importants (multi-sites,
                                ERP, industrie), un audit préalable permet de
                                définir précisément le planning d&apos;installation.
                              </p>
                            </div>
                          ) : (
                            <>
                              {f.a}
                              {f.hasCert && (
                                <div className="mt-4">
                                  <button
                                    onClick={() => setLightboxOpen(true)}
                                    className="inline-flex items-center gap-2 text-red font-heading text-xs font-bold no-underline bg-transparent border-0 cursor-pointer p-0"
                                  >
                                    📄 Voir notre certification R82 →
                                  </button>
                                  <div className="mt-3 rounded-xl overflow-hidden border border-g100 w-fit cursor-pointer" onClick={() => setLightboxOpen(true)}>
                                    <Image
                                      src="/images/certification-r82.png"
                                      alt="Certification APSAD R82 CITA La Réunion"
                                      width={200}
                                      height={280}
                                      quality={85}
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/80 flex items-center justify-center p-8 cursor-pointer"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[700px] max-h-[90vh] rounded-2xl overflow-hidden bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-lg border-0 cursor-pointer z-10 hover:bg-black/70"
                aria-label="Fermer"
              >
                ×
              </button>
              <Image
                src="/images/certification-r82.png"
                alt="Certification APSAD R82 CITA La Réunion"
                width={700}
                height={990}
                quality={90}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
