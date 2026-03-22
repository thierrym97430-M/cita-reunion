export default function CtaMid() {
  return (
    <div className="bg-red py-[72px] px-10 max-sm:px-5">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-10 flex-wrap">
        <div>
          <div className="font-heading text-[clamp(24px,3vw,40px)] font-extrabold text-white leading-[1.1]">
            Prêt à sécuriser
            <br />
            votre bien à La Réunion ?
          </div>
          <p className="text-[15px] text-white/60 mt-2">
            Devis gratuit, sans engagement. Réponse sous 24h.
          </p>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <a
            href="#contact"
            className="cta-pulse inline-flex items-center gap-2 bg-white text-red no-underline px-7 py-[15px] rounded-xl font-heading text-[15px] font-extrabold transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,.25)]"
          >
            Obtenir un devis →
          </a>
          <a
            href="tel:0262948021"
            className="inline-flex items-center gap-[7px] bg-white/15 text-white no-underline px-[22px] py-3.5 rounded-xl font-heading text-[15px] font-semibold border border-white/30 transition-colors hover:bg-white/[.22]"
          >
            📞 02 62 94 80 21
          </a>
        </div>
      </div>
    </div>
  );
}
