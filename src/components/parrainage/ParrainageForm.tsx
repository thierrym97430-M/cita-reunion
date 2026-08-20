"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type UseFormRegister, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  parrainageSchema,
  type ParrainageFormData,
} from "@/lib/parrainage";
import type { Agence } from "@/lib/agences";
import type { Commercial } from "@/lib/commerciaux";

const EASE = [0.22, 1, 0.36, 1] as const;

const INPUT_CLASS =
  "w-full bg-g50 border-[1.5px] border-g100 rounded-[9px] px-3.5 py-[11px] font-body text-[13px] text-ink outline-none transition-all focus:border-navy focus:bg-w placeholder:text-g400";

const LABEL_CLASS =
  "block text-[10px] font-bold text-g400 tracking-[1px] uppercase mb-1.5";

/** États du formulaire. `duplicate` mérite son propre message : ce n'est pas
 *  une panne, c'est une information utile au parrain. */
type Status = "idle" | "loading" | "success" | "duplicate" | "error";

function Field({
  name,
  label,
  placeholder,
  type = "text",
  inputMode,
  register,
  error,
  className = "",
}: {
  name: keyof ParrainageFormData;
  label: string;
  placeholder: string;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  register: UseFormRegister<ParrainageFormData>;
  error?: FieldError;
  className?: string;
}) {
  return (
    <div className={`mb-3.5 ${className}`}>
      <label className={LABEL_CLASS} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        inputMode={inputMode}
        autoComplete="off"
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={`${INPUT_CLASS} ${error ? "border-red/50" : ""}`}
        {...register(name)}
      />
      {error && <p className="text-red text-[11px] mt-1">{error.message}</p>}
    </div>
  );
}

export default function ParrainageForm({
  agence,
  commerciaux,
}: {
  agence: Agence;
  /** Commerciaux de CETTE agence, lus dans son LeadFlow au rendu de la page.
   *  Vide si l'application est injoignable — on bascule en saisie libre. */
  commerciaux: Commercial[];
}) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [filleulPrenom, setFilleulPrenom] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  /* L'URL réelle de la page, pour le message de partage. Calculée après le
     montage : elle diffère entre l'aperçu Vercel et le domaine définitif. */
  useEffect(() => {
    setPageUrl(window.location.origin + window.location.pathname);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParrainageFormData>({
    resolver: zodResolver(parrainageSchema),
    defaultValues: { agence: agence.slug, consentement: false },
  });

  const onSubmit = async (data: ParrainageFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/parrainage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, agence: agence.slug }),
      });

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!res.ok) throw new Error();

      setFilleulPrenom(data.filleulPrenom);
      setStatus("success");
      reset({ agence: agence.slug, consentement: false });
      cardRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    } catch {
      setStatus("error");
    }
  };

  /* Message pré-rempli pour prévenir le filleul */
  const shareText = encodeURIComponent(
    `Salut ${filleulPrenom} ! Je viens de te parrainer chez ${agence.nomComplet} (alarme & vidéosurveillance). ` +
      `Tu reçois 1 mois d'abonnement offert + l'installation offerte. Un conseiller va t'appeler sous 48h. ` +
      (pageUrl ? `Plus d'infos : ${pageUrl}` : "")
  );

  return (
    <section
      className="bg-g50 py-[100px] px-10 max-sm:px-5 max-sm:py-[70px]"
      id="formulaire-parrainage"
    >
      <div className="max-w-[880px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[540px] mx-auto mb-12">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-3.5 flex items-center gap-2 justify-center">
            <span className="w-[18px] h-0.5 bg-red rounded-sm block" />
            Formulaire
          </div>
          <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.8px] text-ink leading-[1.08]">
            Parrainez en 2 minutes.
          </h2>
          <p className="text-[15px] text-g400 leading-[1.75] mt-3">
            Vos coordonnées, celles de votre filleul(e) — et c&apos;est tout.
          </p>
        </div>

        <motion.div
          ref={cardRef}
          initial={reduce ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="bg-w border-[1.5px] border-g100 rounded-[22px] overflow-hidden shadow-[0_10px_60px_rgba(13,24,41,.08)] scroll-mt-28"
        >
          {/* Bandeau */}
          <div className="bg-ink px-8 py-[22px] max-sm:px-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="font-heading text-[17px] font-extrabold text-white">
              Formulaire de parrainage · {agence.nom}
            </div>
            <div className="bg-[rgba(200,16,46,.2)] border border-[rgba(200,16,46,.35)] text-[#ff8fa3] text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider">
              VOUS : 2 MOIS · FILLEUL(E) : 1 MOIS
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              /* ─────────── ÉTAT SUCCÈS ─────────── */
              <motion.div
                key="success"
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="p-8 max-sm:p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-500/30 flex items-center justify-center text-2xl mx-auto mb-5">
                  ✓
                </div>
                <h3 className="font-heading text-[22px] font-extrabold text-ink mb-2.5">
                  Parrainage enregistré !
                </h3>
                <p className="text-[14px] text-g700 leading-[1.8] max-w-[460px] mx-auto">
                  Merci. Un conseiller {agence.nomComplet} contacte{" "}
                  <strong className="text-ink">
                    {filleulPrenom || "votre filleul(e)"}
                  </strong>{" "}
                  sous 48h. Vos 2 mois offerts seront appliqués dès l&apos;installation
                  réalisée.
                </p>

                <div className="mt-7 pt-6 border-t border-g100">
                  <div className="text-[10px] font-bold text-g400 tracking-[1.5px] uppercase mb-3.5">
                    Prévenez-le(la) tout de suite
                  </div>
                  <div className="flex items-center justify-center gap-2.5 flex-wrap">
                    <a
                      href={`https://wa.me/?text=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-[13px] font-bold text-white bg-[#25D366] no-underline px-5 py-2.5 rounded-full transition-transform hover:-translate-y-0.5"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`sms:?&body=${shareText}`}
                      className="font-heading text-[13px] font-bold text-navy no-underline border border-g200 px-5 py-2.5 rounded-full transition-colors hover:border-navy hover:bg-g50"
                    >
                      SMS
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="font-heading text-[13px] font-bold text-red bg-red-g border-none cursor-pointer px-5 py-2.5 rounded-full transition-colors hover:bg-red hover:text-white"
                    >
                      Parrainer quelqu&apos;un d&apos;autre
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ─────────── FORMULAIRE ─────────── */
              <motion.form
                key="form"
                initial={reduce ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="p-8 max-sm:p-6"
              >
                <input type="hidden" {...register("agence")} />

                <div className="relative grid grid-cols-2 gap-x-10 gap-y-0 max-md:grid-cols-1 max-md:gap-x-0">
                  {/* Séparateur vertical */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-2 bottom-2 w-px bg-g100 -translate-x-1/2 max-md:hidden"
                  >
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red text-white text-[13px] font-heading font-extrabold flex items-center justify-center ring-[6px] ring-white">
                      →
                    </span>
                  </div>

                  {/* ── Colonne parrain ── */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-5">
                      <span className="w-7 h-7 rounded-lg bg-navy/[0.07] flex items-center justify-center text-[13px]">
                        👤
                      </span>
                      <div>
                        <div className="font-heading text-[14px] font-extrabold text-ink leading-tight">
                          Vous, le parrain
                        </div>
                        <div className="text-[11px] text-g400">
                          Client {agence.nomComplet}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                      <Field
                        name="parrainPrenom"
                        label="Prénom"
                        placeholder="Jean"
                        register={register}
                        error={errors.parrainPrenom}
                      />
                      <Field
                        name="parrainNom"
                        label="Nom"
                        placeholder="Dupont"
                        register={register}
                        error={errors.parrainNom}
                      />
                    </div>
                    <Field
                      name="parrainEmail"
                      label="Email"
                      type="email"
                      inputMode="email"
                      placeholder="jean.dupont@email.com"
                      register={register}
                      error={errors.parrainEmail}
                    />
                    <Field
                      name="parrainTelephone"
                      label="Téléphone"
                      type="tel"
                      inputMode="tel"
                      placeholder={`0${agence.telHref.slice(1, 3)} 12 34 56 78`}
                      register={register}
                      error={errors.parrainTelephone}
                    />

                    {/* Le commercial du parrain — détermine qui reprendra le
                        dossier du filleul. Liste alimentée par LeadFlow. */}
                    {commerciaux.length > 0 ? (
                      <div className="mb-3.5">
                        <label className={LABEL_CLASS} htmlFor="commercialId">
                          Votre conseiller CITA (optionnel)
                        </label>
                        <select
                          id="commercialId"
                          defaultValue=""
                          className={`${INPUT_CLASS} appearance-none cursor-pointer`}
                          {...register("commercialId")}
                        >
                          <option value="">Je ne m&apos;en souviens pas</option>
                          {commerciaux.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.nom}
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-g400 mt-1.5 leading-[1.6]">
                          Votre filleul(e) lui sera confié(e) directement.
                        </p>
                      </div>
                    ) : (
                      <Field
                        name="commercialAutre"
                        label="Votre conseiller CITA (optionnel)"
                        placeholder="Nom de votre conseiller"
                        register={register}
                        error={errors.commercialAutre}
                      />
                    )}

                    {/* Rappel récompense parrain */}
                    <div className="flex gap-3 bg-g50 border border-g100 rounded-xl p-4 mt-1">
                      <span className="text-base leading-none">🎁</span>
                      <p className="text-[12px] text-g400 leading-[1.65]">
                        Vos{" "}
                        <strong className="text-ink font-semibold">
                          2 mois d&apos;abonnement offerts
                        </strong>{" "}
                        seront appliqués sur votre contrat dès l&apos;installation de
                        votre filleul(e).
                      </p>
                    </div>
                  </div>

                  {/* ── Colonne filleul ── */}
                  <div className="max-md:mt-8 max-md:pt-8 max-md:border-t max-md:border-g100">
                    <div className="flex items-center gap-2.5 mb-5">
                      <span className="w-7 h-7 rounded-lg bg-red-g flex items-center justify-center text-[13px]">
                        🎁
                      </span>
                      <div>
                        <div className="font-heading text-[14px] font-extrabold text-ink leading-tight">
                          Votre filleul(e)
                        </div>
                        <div className="text-[11px] text-g400">
                          La personne que vous recommandez
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                      <Field
                        name="filleulPrenom"
                        label="Prénom"
                        placeholder="Marie"
                        register={register}
                        error={errors.filleulPrenom}
                      />
                      <Field
                        name="filleulNom"
                        label="Nom"
                        placeholder="Bernard"
                        register={register}
                        error={errors.filleulNom}
                      />
                    </div>
                    <Field
                      name="filleulEmail"
                      label="Email"
                      type="email"
                      inputMode="email"
                      placeholder="marie.bernard@email.com"
                      register={register}
                      error={errors.filleulEmail}
                    />
                    <Field
                      name="filleulTelephone"
                      label="Téléphone"
                      type="tel"
                      inputMode="tel"
                      placeholder={`0${agence.telHref.slice(1, 3)} 98 76 54 32`}
                      register={register}
                      error={errors.filleulTelephone}
                    />
                    <div className="grid grid-cols-[1fr_0.7fr] gap-3 max-sm:grid-cols-1">
                      <Field
                        name="filleulVille"
                        label="Ville"
                        placeholder={agence.exemples.ville}
                        register={register}
                        error={errors.filleulVille}
                      />
                      <Field
                        name="filleulCodePostal"
                        label="Code postal"
                        inputMode="numeric"
                        placeholder={agence.exemples.codePostal}
                        register={register}
                        error={errors.filleulCodePostal}
                      />
                    </div>
                    <div className="mb-3.5">
                      <label className={LABEL_CLASS} htmlFor="filleulProfil">
                        Profil
                      </label>
                      <select
                        id="filleulProfil"
                        defaultValue=""
                        className={`${INPUT_CLASS} appearance-none cursor-pointer`}
                        {...register("filleulProfil")}
                      >
                        <option value="" disabled>
                          Sélectionner...
                        </option>
                        <option value="Particulier">Particulier</option>
                        <option value="Professionnel">Professionnel</option>
                      </select>
                      {errors.filleulProfil && (
                        <p className="text-red text-[11px] mt-1">
                          {errors.filleulProfil.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-2">
                  <label className={LABEL_CLASS} htmlFor="message">
                    Un mot pour nous (optionnel)
                  </label>
                  <textarea
                    id="message"
                    placeholder="Ex : Marie cherche une alarme pour sa maison, disponible en fin de journée."
                    className={`${INPUT_CLASS} resize-y min-h-[80px]`}
                    {...register("message")}
                  />
                </div>

                {/* Consentement */}
                <div className="mt-5 bg-g50 border border-g100 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 shrink-0 accent-[#C8102E] cursor-pointer"
                      {...register("consentement")}
                    />
                    <span className="text-[12.5px] text-g700 leading-[1.65]">
                      J&apos;atteste avoir informé mon filleul(e) et obtenu son accord
                      pour transmettre ses coordonnées à {agence.nomComplet} dans le
                      cadre de ce parrainage.
                    </span>
                  </label>
                  {errors.consentement && (
                    <p className="text-red text-[11px] mt-2 ml-7">
                      {errors.consentement.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-5 bg-red text-white border-none cursor-pointer py-4 rounded-[10px] font-heading text-[15px] font-extrabold flex items-center justify-center gap-2 transition-all hover:bg-red-h hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(200,16,46,.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
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
                    "Valider mon parrainage →"
                  )}
                </button>

                {status === "duplicate" && (
                  <p className="text-center text-[13px] text-g700 bg-g50 border border-g100 rounded-xl px-4 py-3 mt-3 leading-[1.6]">
                    Cette personne figure déjà dans nos fichiers. Appelez-nous au{" "}
                    <a
                      href={`tel:${agence.telHref}`}
                      className="font-semibold text-navy no-underline"
                    >
                      {agence.telephone}
                    </a>{" "}
                    pour que nous vérifiions ensemble.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-center text-red text-[13px] font-medium mt-3">
                    Une erreur est survenue. Réessayez ou appelez-nous au{" "}
                    {agence.telephone}.
                  </p>
                )}

                <p className="text-center text-[11px] text-g400 mt-3">
                  🔒 Données protégées · Zéro spam · Aucun engagement pour votre filleul(e)
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
