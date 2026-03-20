"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/schema";
import { Reveal } from "@/lib/motion";

const projectTypes = [
  "Vidéosurveillance",
  "Alarme",
  "Portique antivol",
  "Téléassistance",
] as const;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-[100px] px-10 bg-w max-sm:px-5" id="contact">
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[500px] mx-auto mb-14">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2 justify-center">
            <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
            Contact
          </div>
          <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.8px] text-ink leading-[1.08] text-center">
            Parlons de votre
            <br />
            projet sécurité.
          </h2>
          <p className="text-[15px] text-g400 leading-[1.75] text-center mt-2.5">
            Deux agences, une île — plus près de vous, partout à La Réunion.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_1.1fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-10">
          {/* Left — 2 agency cards */}
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4 max-sm:grid-cols-1">
              {/* Agence Nord */}
              <Reveal>
                <div className="p-5 bg-g50 border border-g100 rounded-xl transition-colors hover:border-g200 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm bg-red-g">
                      📍
                    </div>
                    <div className="font-heading text-sm font-extrabold text-ink">
                      Agence Nord
                    </div>
                  </div>
                  <div className="font-heading text-[13px] font-bold text-ink mb-1">
                    Saint-Denis
                  </div>
                  <div className="text-[11px] text-g400 leading-[1.6] mb-3">
                    10 Rue Jules Hermann
                    <br />
                    ZI du Chaudron, 97490
                  </div>
                  <a
                    href="tel:0262948021"
                    className="font-heading text-[13px] font-bold text-navy no-underline"
                  >
                    📞 02 62 94 80 21
                  </a>
                  <div className="text-[10px] text-g400 mt-1">
                    Lun–Ven · 8h00–17h30
                  </div>
                </div>
              </Reveal>

              {/* Agence Sud */}
              <Reveal delay={0.08}>
                <div className="p-5 bg-g50 border border-g100 rounded-xl transition-colors hover:border-g200 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm bg-[rgba(59,91,219,.08)]">
                      📍
                    </div>
                    <div className="font-heading text-sm font-extrabold text-ink">
                      Agence Sud
                    </div>
                  </div>
                  <div className="font-heading text-[13px] font-bold text-ink mb-1">
                    Le Tampon
                  </div>
                  <div className="text-[11px] text-g400 leading-[1.6] mb-3">
                    64E Chemin 9
                    <br />
                    97430 Le Tampon
                  </div>
                  <a
                    href="tel:0262020303"
                    className="font-heading text-[13px] font-bold text-navy no-underline"
                  >
                    📞 02 62 02 03 03
                  </a>
                  <div className="text-[10px] text-g400 mt-1">
                    Lun–Ven · 8h00–17h30
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Urgency bar */}
            <Reveal delay={0.16}>
              <div className="flex items-center gap-3.5 px-5 py-4 bg-navy rounded-xl mb-6">
                <div
                  className="w-2 h-2 rounded-full bg-red shrink-0"
                  style={{ animation: "pulse-red 1.5s ease-in-out infinite" }}
                />
                <div>
                  <div className="text-[10px] font-bold text-white/40 tracking-[1px] uppercase">
                    Urgence sécurité — 24h/24
                  </div>
                  <div className="font-heading text-xl font-extrabold text-white">
                    02 62 94 80 21
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sectors */}
            <div className="mt-5">
              <div className="text-[10px] font-bold text-g400 tracking-[1.5px] uppercase mb-2.5">
                Nous protégeons
              </div>
              <div className="flex flex-wrap gap-[7px]">
                {[
                  "🏠 Particuliers",
                  "🏪 Commerces",
                  "🏥 Médical",
                  "🏛️ Collectivités",
                  "🏭 Industrie",
                  "🏦 Bancaire",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1.5 bg-g50 border border-g100 rounded-full text-g700 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <Reveal>
            <div className="bg-w border-[1.5px] border-g100 rounded-[22px] overflow-hidden shadow-[0_4px_40px_rgba(13,24,41,.07)]">
              <div className="bg-ink px-7 py-[22px] flex items-center justify-between">
                <div className="font-heading text-[17px] font-extrabold text-white">
                  Demande de devis
                </div>
                <div className="bg-[rgba(200,16,46,.2)] border border-[rgba(200,16,46,.35)] text-[#ff8fa3] text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider">
                  GRATUIT · SOUS 24H
                </div>
              </div>
              <form
                className="p-7 px-7"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                  <div className="mb-3.5">
                    <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400"
                      placeholder="Jean"
                      {...register("prenom")}
                    />
                    {errors.prenom && (
                      <p className="text-red text-[11px] mt-1">
                        {errors.prenom.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3.5">
                    <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400"
                      placeholder="Dupont"
                      {...register("nom")}
                    />
                    {errors.nom && (
                      <p className="text-red text-[11px] mt-1">
                        {errors.nom.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3.5">
                  <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400"
                    placeholder="02 62 XX XX XX"
                    {...register("telephone")}
                  />
                  {errors.telephone && (
                    <p className="text-red text-[11px] mt-1">
                      {errors.telephone.message}
                    </p>
                  )}
                </div>
                <div className="mb-3.5">
                  <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400"
                    placeholder="jean.dupont@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red text-[11px] mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-3.5">
                  <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                    Adresse
                  </label>
                  <input
                    type="text"
                    className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400"
                    placeholder="10 Rue des Palmiers, 97400 Saint-Denis"
                    {...register("adresse")}
                  />
                  {errors.adresse && (
                    <p className="text-red text-[11px] mt-1">
                      {errors.adresse.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-3 max-sm:grid-cols-1">
                  <div className="mb-3.5">
                    <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                      Code postal
                    </label>
                    <input
                      type="text"
                      className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400"
                      placeholder="97400"
                      {...register("codePostal")}
                    />
                    {errors.codePostal && (
                      <p className="text-red text-[11px] mt-1">
                        {errors.codePostal.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3.5">
                    <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                      Ville
                    </label>
                    <input
                      type="text"
                      className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400"
                      placeholder="Saint-Denis"
                      {...register("ville")}
                    />
                    {errors.ville && (
                      <p className="text-red text-[11px] mt-1">
                        {errors.ville.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3.5">
                  <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                    Type de projet
                  </label>
                  <select
                    className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w appearance-none"
                    {...register("typeProjet")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sélectionner votre profil...
                    </option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.typeProjet && (
                    <p className="text-red text-[11px] mt-1">
                      {errors.typeProjet.message}
                    </p>
                  )}
                </div>
                <div className="mb-3.5">
                  <label className="block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5">
                    Votre besoin (optionnel)
                  </label>
                  <textarea
                    className="w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400 resize-y min-h-[88px]"
                    placeholder="Décrivez brièvement votre projet..."
                    {...register("besoin")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-red text-white border-none cursor-pointer py-3.5 rounded-[10px] font-heading text-[15px] font-extrabold flex items-center justify-center gap-2 transition-all hover:bg-red-h hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(200,16,46,.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="opacity-75"
                        />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    "Je veux être rappelé sous 24h →"
                  )}
                </button>

                {status === "success" && (
                  <p className="text-center text-green-600 text-[13px] font-medium mt-3">
                    ✓ Demande envoyée ! Nous vous rappelons sous 24h.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-red text-[13px] font-medium mt-3">
                    Une erreur est survenue. Veuillez réessayer ou nous appeler
                    directement.
                  </p>
                )}

                <p className="text-center text-[11px] text-g400 mt-2.5">
                  🔒 Données protégées · Zéro spam · Réponse garantie
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
