"use client";

export default function SloganBanner() {
  const slogan = "NOTRE PROXIMITÉ, VOTRE SÉCURITÉ";
  const separator = "◆";
  // 8 repetitions for seamless infinite loop
  const items = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="whitespace-nowrap">{slogan}</span>
      <span className="text-white/30 text-[10px]">{separator}</span>
    </span>
  ));

  return (
    <div className="bg-red relative overflow-hidden" aria-label={slogan}>
      {/* Gradient masks on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-red to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-red to-transparent" />

      <div className="slogan-track flex items-center gap-8 py-3 font-heading text-[13px] font-extrabold tracking-[2px] text-white uppercase">
        {items}
        {/* Duplicate for seamless loop */}
        {items}
      </div>
    </div>
  );
}
