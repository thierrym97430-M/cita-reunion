import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité et traitement des données personnelles — CITA La Réunion (SCITA).',
  robots: { index: false, follow: false },
}

export default function Confidentialite() {
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
          Politique de confidentialit&eacute;
        </h1>
        <p className="text-gray-500 text-sm mb-12 pb-8 border-b border-white/10">
          Derni&egrave;re mise &agrave; jour : mars 2026 — Conforme au RGPD et &agrave; la loi
          Informatique et Libert&eacute;s.
        </p>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">1</span>
            Responsable du traitement
          </h2>
          <div className="bg-white/[.03] border border-white/[.08] rounded-xl p-6 text-sm text-gray-300 space-y-2">
            <p><span className="text-white font-semibold">Soci&eacute;t&eacute; :</span> SCITA</p>
            <p><span className="text-white font-semibold">Adresse :</span> 10 Rue Jules Hermann, ZI du Chaudron, 97490 Saint-Denis, La R&eacute;union</p>
            <p><span className="text-white font-semibold">Contact DPO :</span>{' '}<a href="mailto:reunion@citagroupe.com" className="text-blue-400 hover:underline">reunion@citagroupe.com</a></p>
            <p><span className="text-white font-semibold">T&eacute;l&eacute;phone :</span>{' '}<a href="tel:0262948021" className="text-blue-400 hover:underline">02 62 94 80 21</a></p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">2</span>
            Donn&eacute;es collect&eacute;es
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Dans le cadre de votre demande de devis, nous collectons les donn&eacute;es suivantes :
          </p>
          <div className="bg-white/[.03] border border-white/[.08] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[.08]">
                  <th className="text-left px-5 py-3 text-white font-semibold">Donn&eacute;e</th>
                  <th className="text-left px-5 py-3 text-white font-semibold">Obligatoire</th>
                  <th className="text-left px-5 py-3 text-white font-semibold">Finalit&eacute;</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['Prénom & Nom',       'Oui', 'Identification'],
                  ['Téléphone',          'Oui', 'Rappel commercial'],
                  ['Email',              'Oui', 'Confirmation de demande'],
                  ['Adresse complète',   'Oui', 'Planification de visite'],
                  ['Code postal',        'Oui', 'Attribution à l\'agence la plus proche'],
                  ['Ville',              'Oui', 'Attribution agence'],
                  ['Type de projet',     'Oui', 'Qualification du besoin'],
                  ['Description besoin', 'Non', 'Préparation du devis'],
                ].map(([donnee, requis, finalite], i) => (
                  <tr key={i} className="border-b border-white/[.05] last:border-0">
                    <td className="px-5 py-3">{donnee}</td>
                    <td className="px-5 py-3">
                      <span className={requis === 'Oui' ? 'text-orange-400 font-semibold' : 'text-gray-500'}>
                        {requis}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{finalite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">3</span>
            Finalit&eacute; du traitement
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Les donn&eacute;es collect&eacute;es ont pour unique finalit&eacute; de traiter votre demande
            de devis, de vous recontacter dans les meilleurs d&eacute;lais et d&apos;organiser
            une visite technique gratuite. Elles ne sont utilis&eacute;es &agrave; aucune autre fin
            commerciale, publicitaire ou de profilage.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">4</span>
            Base l&eacute;gale du traitement
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Le traitement est fond&eacute; sur votre <strong className="text-white">consentement
            explicite</strong> (Article 6.1.a du RGPD), exprim&eacute; lors de la soumission
            du formulaire de contact. Vous pouvez retirer ce consentement &agrave; tout moment.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">5</span>
            Dur&eacute;e de conservation
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Vos donn&eacute;es sont conserv&eacute;es pendant la dur&eacute;e n&eacute;cessaire au traitement
            de votre demande et, en cas de relation commerciale, pendant toute la
            dur&eacute;e de cette relation augment&eacute;e d&apos;un d&eacute;lai de 3 ans suivant le dernier
            contact, conform&eacute;ment aux recommandations de la CNIL.
            En l&apos;absence de relation commerciale, les donn&eacute;es sont supprim&eacute;es sous 1 an.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">6</span>
            Destinataires des donn&eacute;es
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Vos donn&eacute;es sont transmises exclusivement aux &eacute;quipes commerciales et
            techniques de SCITA (CITA La R&eacute;union). Elles ne sont en aucun cas
            vendues, lou&eacute;es ou c&eacute;d&eacute;es &agrave; des tiers &agrave; des fins commerciales.
            Les donn&eacute;es transitent de mani&egrave;re s&eacute;curis&eacute;e via notre infrastructure
            d&apos;automatisation interne (n8n, h&eacute;berg&eacute; sur nos serveurs).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">7</span>
            Vos droits (RGPD)
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Conform&eacute;ment au RGPD, vous disposez des droits suivants sur vos donn&eacute;es :
          </p>
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {[
              ['🔍', 'Droit d\'accès',        'Obtenir une copie de vos données'],
              ['✏️', 'Droit de rectification', 'Corriger vos données inexactes'],
              ['🗑️', 'Droit à l\'effacement',  '"Droit à l\'oubli"'],
              ['⏸️', 'Droit à la limitation',  'Suspendre le traitement'],
              ['🚫', 'Droit d\'opposition',    'S\'opposer au traitement'],
              ['📦', 'Droit à la portabilité', 'Récupérer vos données'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-white/[.03] border border-white/[.08] rounded-xl p-4 text-sm">
                <div className="text-xl mb-2">{icon}</div>
                <div className="text-white font-semibold mb-1">{title}</div>
                <div className="text-gray-400 text-xs">{desc}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mt-4">
            Pour exercer ces droits, envoyez votre demande &agrave;{' '}
            <a href="mailto:reunion@citagroupe.com" className="text-blue-400 hover:underline">reunion@citagroupe.com</a>
            {' '}en pr&eacute;cisant votre identit&eacute;. Vous pouvez &eacute;galement adresser une r&eacute;clamation
            &agrave; la{' '}
            <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CNIL</a>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">8</span>
            S&eacute;curit&eacute; des donn&eacute;es
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Nous mettons en &oelig;uvre les mesures techniques et organisationnelles
            appropri&eacute;es pour prot&eacute;ger vos donn&eacute;es contre toute perte, acc&egrave;s non
            autoris&eacute; ou divulgation : chiffrement HTTPS, h&eacute;bergement sur
            l&apos;infrastructure s&eacute;curis&eacute;e de Vercel Inc., acc&egrave;s restreint aux donn&eacute;es.
          </p>
        </section>

        <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10 text-sm">
          <Link href="/mentions-legales" className="text-blue-400 hover:text-blue-300 transition-colors">
            Mentions l&eacute;gales &rarr;
          </Link>
          <Link href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">
            Exercer mes droits &rarr;
          </Link>
        </div>

      </div>
    </main>
  )
}
