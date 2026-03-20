"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

const CinematicIntro = dynamic(
  () => import("@/components/hero/CinematicIntro"),
  { ssr: false }
);

interface HeroProps {
  particleNetwork?: React.ReactNode;
  heroDevices?: React.ReactNode;
}

export default function Hero({ particleNetwork, heroDevices }: HeroProps) {
  const [introComplete, setIntroComplete] = useState(false);

  useHeroAnimation();

  return (
    <>
      {/* Intro cinématique — se joue une fois au chargement */}
      <CinematicIntro onComplete={() => setIntroComplete(true)} />

      <section
        className="hero-section relative min-h-screen bg-ink overflow-hidden flex flex-col justify-center px-10 pt-[120px] pb-20 max-sm:px-5"
        id="accueil"
      >
        {/* Flash d'impact pour "Depuis 1988." */}
        <div
          className="hero-flash pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.3), transparent 60%)",
            opacity: 0,
            zIndex: 1,
          }}
        />

        {/* Couche 0 — Réseau de particules (fond fixe) */}
        {particleNetwork}

        {/* Couche 1 — Produits animés aux 4 coins */}
        {heroDevices}

        {/* Background blobs */}
        <div className="absolute inset-0">
          <div
            className="absolute rounded-full blur-[80px] opacity-40 w-[700px] h-[700px] -top-[150px] -left-[200px]"
            style={{
              background:
                "radial-gradient(circle, #1C2B4A 0%, transparent 70%)",
              animation: "blob1 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full blur-[80px] opacity-40 w-[500px] h-[500px] -bottom-[100px] -right-[100px]"
            style={{
              background:
                "radial-gradient(circle, #243460 0%, transparent 70%)",
              animation: "blob2 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full blur-[80px] opacity-40 w-[350px] h-[350px] top-[40%] right-[25%]"
            style={{
              background:
                "radial-gradient(circle, rgba(200,16,46,.25) 0%, transparent 70%)",
              animation: "blob3 15s ease-in-out infinite",
            }}
          />
        </div>

        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-[2] max-w-[1180px] mx-auto w-full">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo-cita-transparent.png"
              alt="CITA — Sécurité & Protection"
              width={180}
              height={120}
              className="h-[100px] w-auto"
              priority
            />
          </div>

          {/* Eyebrow */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 pl-2 bg-white/[.07] border border-white/[.12] rounded-full mb-8">
            <div
              className="w-[7px] h-[7px] rounded-full bg-green-500"
              style={{ animation: "pulse-green 2s ease-in-out infinite" }}
            />
            <span className="text-xs text-white/55 font-medium">
              Télésurveillance active 24h/24
            </span>
            <div className="bg-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
              RÉUNION · 974
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-heading font-extrabold text-[clamp(52px,7.5vw,96px)] leading-[.95] tracking-[-2px] text-white mb-9">
            <span className="hero-line-1 block">Votre sécurité.</span>
            <span
              className="hero-line-2 block"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,.2)",
              }}
            >
              Notre priorité.
            </span>
            <span className="hero-line-3 block text-red">Depuis 1988.</span>
          </h1>

          {/* Split */}
          <div className="grid grid-cols-2 gap-12 items-end max-md:grid-cols-1 max-md:gap-10">
            <p className="hero-description text-[17px] text-white/45 leading-[1.8] font-light max-w-[440px]">
              Alarme, vidéosurveillance et télésurveillance 24h/24 pour les
              particuliers et professionnels de toute l&apos;île de La Réunion.
              Groupe CITA — leader de la sécurité dans les DOM.
            </p>
            <div className="flex flex-col gap-4 items-end max-md:items-start">
              <div className="flex gap-2.5 flex-wrap justify-end max-md:justify-start">
                <a
                  href="#contact"
                  className="hero-btn-primary inline-flex items-center gap-2 bg-red text-white no-underline px-[30px] py-[15px] rounded-xl font-heading text-[15px] font-bold transition-colors hover:bg-red-h"
                >
                  Devis gratuit →
                </a>
                <a
                  href="tel:0262948021"
                  className="hero-btn-secondary inline-flex items-center gap-[7px] bg-white/[.07] text-white/70 no-underline px-6 py-3.5 rounded-xl font-heading text-[15px] font-medium border border-white/[.12] transition-colors hover:bg-white/[.12] hover:text-white hover:border-white/[.22]"
                >
                  📞 02 62 94 80 21
                </a>
              </div>
              <div className="flex gap-1.5 flex-wrap justify-end max-md:justify-start">
                {[
                  "✓ Certifié APSAD",
                  "✓ Intervention 24/7",
                  "✓ Depuis 1988",
                  "✓ Île entière couverte",
                ].map((t) => (
                  <div
                    key={t}
                    className="hero-trust-badge px-3 py-1.5 bg-white/[.06] border border-white/10 rounded-full text-[11px] text-white/40 font-medium"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
