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
  title: {
    default: 'CITA La Réunion | Alarme, Vidéosurveillance & Télésurveillance 974',
    template: '%s | CITA La Réunion',
  },
  description:
    'CITA La Réunion — Expert en alarme, vidéosurveillance et télésurveillance 24h/24 ' +
    'pour particuliers et professionnels de toute l\'île. 2 agences : Saint-Denis & Le Tampon. ' +
    'Certifié APSAD R82. Devis gratuit. ☎ 02 62 94 80 21',
  keywords: [
    'alarme La Réunion',
    'vidéosurveillance Réunion',
    'télésurveillance 974',
    'sécurité La Réunion',
    'installateur alarme Saint-Denis Réunion',
    'caméra surveillance Réunion',
    'CITA Réunion',
    'APSAD R82 Réunion',
    'gardiennage Réunion',
    'contrôle accès Réunion',
    'portique antivol Réunion',
    'alarme Le Tampon',
  ],
  authors: [{ name: 'SCITA — CITA La Réunion' }],
  creator: 'SCITA',
  publisher: 'Groupe CITA',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://cita-reunion.vercel.app',
    siteName: 'CITA La Réunion',
    title: 'CITA La Réunion | Alarme, Vidéosurveillance & Télésurveillance 974',
    description:
      'Expert en sécurité à La Réunion depuis 1988. Alarme, vidéosurveillance, ' +
      'télésurveillance 24h/24. 2 agences : Saint-Denis & Le Tampon. ' +
      'Certifié APSAD. Devis gratuit.',
    images: [
      {
        url: '/images/og-cita-reunion.jpg',
        width: 1200,
        height: 630,
        alt: 'CITA La Réunion — Alarme, Vidéosurveillance & Télésurveillance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CITA La Réunion | Alarme & Vidéosurveillance 974',
    description:
      'Expert sécurité à La Réunion depuis 1988. Devis gratuit. ☎ 02 62 94 80 21',
    images: ['/images/og-cita-reunion.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://cita-reunion.vercel.app',
  },
};

// JSON-LD structured data (static, no user input — safe for dangerouslySetInnerHTML)
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://cita-reunion.vercel.app/#business',
      name: 'CITA La Réunion',
      alternateName: 'SCITA',
      description:
        'Expert en alarme, vidéosurveillance et télésurveillance 24h/24 à La Réunion depuis 1988.',
      url: 'https://cita-reunion.vercel.app',
      logo: 'https://cita-reunion.vercel.app/images/logo-cita-transparent.png',
      image: 'https://cita-reunion.vercel.app/images/og-cita-reunion.jpg',
      telephone: '+262262948021',
      email: 'reunion@citagroupe.com',
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Cash, Check, Credit Card',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '10 Rue Jules Hermann, ZI du Chaudron',
        addressLocality: 'Saint-Denis',
        postalCode: '97490',
        addressRegion: 'La Réunion',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -20.882,
        longitude: 55.4504,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:30',
        },
      ],
      hasMap: 'https://maps.google.com/?q=CITA+La+Réunion+Saint-Denis',
      sameAs: [
        'https://www.facebook.com/Citaoutremer/',
        'https://www.linkedin.com/company/cita-outremer/',
        'https://www.instagram.com/cita.outremer/',
        'https://www.citagroupe.com',
      ],
    },
    {
      '@type': 'LocalBusiness',
      name: 'CITA La Réunion — Agence Sud',
      parentOrganization: { '@id': 'https://cita-reunion.vercel.app/#business' },
      telephone: '+262262020303',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '64E Chemin 9',
        addressLocality: 'Le Tampon',
        postalCode: '97430',
        addressRegion: 'La Réunion',
        addressCountry: 'FR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:30',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://cita-reunion.vercel.app/#website',
      url: 'https://cita-reunion.vercel.app',
      name: 'CITA La Réunion',
      publisher: { '@id': 'https://cita-reunion.vercel.app/#business' },
      inLanguage: 'fr-FR',
    },
  ],
});

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
