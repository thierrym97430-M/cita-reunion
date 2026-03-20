import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "CITA La Reunion — Alarme, Videosurveillance & Telesurveillance 24h/24",
  description:
    "Agence CITA La Reunion : installation d'alarme, videoprotection et telesurveillance 24h/24 pour particuliers et professionnels. Devis gratuit. 02 62 94 80 21",
  keywords: [
    "alarme reunion",
    "videosurveillance reunion",
    "telesurveillance 974",
    "securite reunion",
    "CITA reunion",
  ],
  openGraph: {
    title: "CITA La Reunion — Securite & Protection",
    description:
      "Alarme, videoprotection, telesurveillance 24h/24 a La Reunion.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${bricolage.variable} ${dmSans.variable} font-body antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
