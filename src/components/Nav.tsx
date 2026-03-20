"use client";

import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-[300] flex justify-center max-md:top-2.5 max-md:left-2.5 max-md:right-2.5">
      <div className="bg-white/92 backdrop-blur-[20px] border border-white/70 rounded-full px-5 py-2 pr-2 flex items-center gap-1 shadow-[0_4px_28px_rgba(13,24,41,.12)]">
        <a className="flex items-center gap-2 no-underline mr-2" href="#">
          <Image
            src="/images/logo-cita-transparent.png"
            alt="CITA La Réunion"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <div className="font-heading font-bold text-[13px] text-navy">
            La Réunion{" "}
            <span className="text-g400 font-normal">· 974</span>
          </div>
        </a>
        <div className="w-px h-[18px] bg-g200 mx-1.5" />
        <ul className="flex items-center gap-0.5 list-none">
          <li className="max-sm:hidden">
            <a
              href="#services"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              Solutions
            </a>
          </li>
          <li className="max-sm:hidden">
            <a
              href="#proof"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              À propos
            </a>
          </li>
          <li className="max-sm:hidden">
            <a
              href="#faq"
              className="text-[13px] font-medium text-g700 no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 hover:text-ink"
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-[13px] font-semibold text-navy no-underline px-3 py-1.5 rounded-full transition-colors hover:bg-g50 whitespace-nowrap"
            >
              📞 02 62 94 80 21
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-[13px] font-bold text-white no-underline px-[18px] py-2 rounded-full bg-red hover:bg-red-h hover:shadow-[0_4px_16px_rgba(200,16,46,.3)] transition-all whitespace-nowrap"
            >
              Devis gratuit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
