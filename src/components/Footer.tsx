import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink py-9 px-10 max-sm:px-5">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-[9px]">
          <Image
            src="/images/logo-cita-transparent.png"
            alt="CITA La Réunion"
            width={90}
            height={24}
            className="h-6 w-auto"
          />
          <div>
            <div className="font-heading text-[13px] font-bold text-white">
              La Réunion · 974
            </div>
            <div className="text-[10px] text-white/25 mt-px">
              Groupe CITA — 2 agences : Saint-Denis & Le Tampon
            </div>
          </div>
        </div>
        <div className="text-[11px] text-white/[.22] leading-[1.7]">
          Saint-Denis : 02 62 94 80 21 · Le Tampon : 02 62 02 03 03
          <br />
          <a
            href="https://www.citagroupe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/[.38] no-underline"
          >
            citagroupe.com
          </a>
        </div>
        <ul className="flex gap-5 list-none">
          {["Mentions légales", "CGV", "Confidentialité"].map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-[11px] text-white/[.28] no-underline transition-colors hover:text-white/60"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
