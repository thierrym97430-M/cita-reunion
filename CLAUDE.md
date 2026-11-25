<!-- deploiement-coolify -->
## Déploiement : plus de Vercel

Depuis le 25/11/2026, ce site tourne sur le VPS M PROD via Coolify (projet
« Sites web »). Les mentions de Vercel ailleurs (README, CLAUDE.md du dossier
parent) ne valent plus pour le déploiement ni pour les variables d'environnement.

- Production : https://cita-reunion.mprod-studio.com
- **Déployer = `git push` sur `main`.** Coolify reconstruit et met en ligne tout
  seul (2 à 6 min). Il n'y a aucune commande de déploiement à lancer.
- **N'utilise jamais la CLI `vercel`** (`vercel`, `vercel --prod`, `vercel env`).
- Variables d'environnement : coffre Infisical <https://secrets.mprod-studio.com>
  (projet « CITA Réunion », env `prod`), importées dans Coolify. Jamais de secret
  en clair dans le dépôt : c'est Thierry qui les saisit lui-même.
  `NEXT_PUBLIC_SITE_URL` est lue au build : la changer impose un Redeploy.
- Appelants à tenir à jour si l'adresse change : LeadFlow CITA
  (`SITE_VITRINE_URL` dans Coolify, lien `LIEN_PARRAINAGE` dans
  `src/lib/invoice-email.ts` du dépôt leadflow-cita).
- Tableau de bord : <https://coolify.mprod-studio.com> (bouton « Redeploy » pour
  forcer une reconstruction).

<!-- MEMORY:START -->
# cita-reunion

_Last updated: 2026-03-22 | 0 active memories, 0 total_

_For deeper context, use memory_search, memory_related, or memory_ask tools._
<!-- MEMORY:END -->
