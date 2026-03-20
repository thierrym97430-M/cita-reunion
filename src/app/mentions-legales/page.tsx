import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site CITA La Réunion — SCITA.',
  robots: { index: false, follow: false },
}

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#0B1523] text-white">

      <div className="border-b border-white/10 py-5 sticky top-0 bg-[#0B1523]/95 backdrop-blur z-50">
        <div className="max-w-3xl mx-auto px-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            &larr; Retour &agrave; l&apos;accueil
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">

        <h1 className="text-4xl font-black mb-3 tracking-tight">
          Mentions l&eacute;gales
        </h1>
        <p className="text-gray-500 text-sm mb-12 pb-8 border-b border-white/10">
          R&eacute;glement&eacute;es par la Loi n&deg; 2004-575 du 21 juin 2004
          pour la confiance dans l&apos;&eacute;conomie num&eacute;rique.
        </p>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">1</span>
            &Eacute;diteur du site
          </h2>
          <div className="bg-white/[.03] border border-white/[.08] rounded-xl p-6 text-sm text-gray-300 space-y-2 leading-relaxed">
            <p><span className="text-white font-semibold">Raison sociale :</span> SCITA (Soci&eacute;t&eacute; Commerciale de Installation Technique d&apos;Alarme)</p>
            <p><span className="text-white font-semibold">Forme juridique :</span> SARL</p>
            <p><span className="text-white font-semibold">Si&egrave;ge social :</span> Centre des affaires — Californie 2, 97232 Le Lamentin, Martinique</p>
            <p><span className="text-white font-semibold">Agence La R&eacute;union :</span> 10 Rue Jules Hermann, ZI du Chaudron, 97490 Saint-Denis</p>
            <p><span className="text-white font-semibold">T&eacute;l&eacute;phone :</span>{' '}<a href="tel:0262948021" className="text-blue-400 hover:underline">02 62 94 80 21</a></p>
            <p><span className="text-white font-semibold">Email :</span>{' '}<a href="mailto:reunion@citagroupe.com" className="text-blue-400 hover:underline">reunion@citagroupe.com</a></p>
            <p><span className="text-white font-semibold">RCS :</span> POINTE &Agrave; PITRE TMC 413 143 215</p>
            <p><span className="text-white font-semibold">SIRET :</span> 413 143 215 00015</p>
            <p><span className="text-white font-semibold">Capital social :</span> 160 000,00 &euro;</p>
            <p><span className="text-white font-semibold">Directeur de la publication :</span> Gr&eacute;gory de LA HOUSSAYE</p>
            <p><span className="text-white font-semibold">N&deg; d&apos;agr&eacute;ment :</span> 98-996 AD1/1</p>
          </div>
          <p className="mt-4 text-xs text-gray-600 italic leading-relaxed">
            Article L612-14 du code de la s&eacute;curit&eacute; int&eacute;rieure : L&apos;autorisation administrative
            pr&eacute;alable ne conf&egrave;re aucun caract&egrave;re officiel &agrave; l&apos;entreprise ou aux personnes
            qui en b&eacute;n&eacute;ficient. Elle n&apos;engage en aucune mani&egrave;re la responsabilit&eacute; des
            pouvoirs publics.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">2</span>
            H&eacute;bergement
          </h2>
          <div className="bg-white/[.03] border border-white/[.08] rounded-xl p-6 text-sm text-gray-300 space-y-2">
            <p><span className="text-white font-semibold">H&eacute;bergeur :</span> Vercel Inc.</p>
            <p><span className="text-white font-semibold">Adresse :</span> 440 N Barranca Ave #4133, Covina, CA 91723, &Eacute;tats-Unis</p>
            <p><span className="text-white font-semibold">Site web :</span>{' '}<a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">vercel.com</a></p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">3</span>
            Propri&eacute;t&eacute; intellectuelle
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes, ic&ocirc;nes)
            est la propri&eacute;t&eacute; exclusive de SCITA ou de ses partenaires et fournisseurs.
            Toute reproduction, repr&eacute;sentation, modification ou diffusion, en tout ou partie,
            sur quelque support que ce soit, sans autorisation &eacute;crite pr&eacute;alable de SCITA
            est interdite et constitue une contrefa&ccedil;on sanctionn&eacute;e par les articles
            L.335-2 et suivants du Code de la Propri&eacute;t&eacute; Intellectuelle.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">4</span>
            Donn&eacute;es personnelles
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Conform&eacute;ment &agrave; la Loi n&deg; 78-17 du 6 janvier 1978 relative &agrave; l&apos;Informatique,
            aux Fichiers et aux Libert&eacute;s, ainsi qu&apos;au R&egrave;glement G&eacute;n&eacute;ral sur la Protection
            des Donn&eacute;es (RGPD), vous disposez des droits d&apos;opposition, d&apos;acc&egrave;s,
            de rectification et d&apos;effacement des donn&eacute;es vous concernant.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Pour exercer ces droits, contactez-nous &agrave;{' '}
            <a href="mailto:reunion@citagroupe.com" className="text-blue-400 hover:underline">reunion@citagroupe.com</a>.
            Les informations collect&eacute;es via notre formulaire de contact sont
            exclusivement destin&eacute;es &agrave; SCITA et ne sont transmises &agrave; aucun tiers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">5</span>
            Cookies
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Ce site n&apos;utilise pas de cookies de tra&ccedil;age publicitaire ou de profilage.
            Des cookies techniques strictement n&eacute;cessaires au bon fonctionnement
            du site peuvent &ecirc;tre d&eacute;pos&eacute;s. Conform&eacute;ment &agrave; la r&eacute;glementation CNIL,
            vous pouvez vous y opposer en configurant votre navigateur.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">6</span>
            Limitation de responsabilit&eacute;
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            SCITA s&apos;efforce d&apos;assurer l&apos;exactitude et la mise &agrave; jour des informations
            diffus&eacute;es sur ce site. Toutefois, SCITA ne peut garantir l&apos;exactitude,
            la pr&eacute;cision ou l&apos;exhaustivit&eacute; des informations mises &agrave; disposition.
            En cons&eacute;quence, SCITA d&eacute;cline toute responsabilit&eacute; pour toute impr&eacute;cision,
            inexactitude ou omission portant sur des informations disponibles sur ce site.
          </p>
        </section>

        <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10 text-sm">
          <Link href="/confidentialite" className="text-blue-400 hover:text-blue-300 transition-colors">
            Politique de confidentialit&eacute; &rarr;
          </Link>
          <Link href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">
            Nous contacter &rarr;
          </Link>
          <a
            href="https://www.citagroupe.com/docs/CGV_SCITA_revue_du_28_novembre_2023.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            CGV (PDF) &rarr;
          </a>
        </div>

      </div>
    </main>
  )
}
