import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 px-10 max-sm:px-5">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-8 flex-wrap">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo-cita-transparent.png"
            alt="CITA La Réunion"
            width={160}
            height={60}
            className="h-14 w-auto"
          />
          <div>
            <div className="font-heading text-[15px] font-bold text-white">
              La Réunion · 974
            </div>
            <div className="text-[12px] text-white/45 mt-1">
              Groupe CITA — 2 agences : Saint-Denis & Le Tampon
            </div>
          </div>
        </div>
        <div className="text-[12px] text-white/50 leading-[1.8]">
          Saint-Denis : 02 62 94 80 21 · Le Tampon : 02 62 02 03 03
          <br />
          <a
            href="https://www.citagroupe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 no-underline hover:text-white transition-colors"
          >
            citagroupe.com
          </a>
        </div>
        <ul className="flex gap-5 list-none">
          {["Mentions légales", "CGV", "Confidentialité"].map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-[12px] text-white/45 no-underline transition-colors hover:text-white/80"
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
