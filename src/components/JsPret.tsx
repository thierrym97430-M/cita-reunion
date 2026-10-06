'use client'
import { useEffect } from 'react'

/**
 * Signale que React a bien pris la main : la classe `js-pret` sur <html>
 * coupe le repli CSS de globals.css, et les animations reprennent la main.
 *
 * Sans elle — JavaScript bloqué, navigateur trop ancien, aperçu de messagerie,
 * script qui plante — le contenu caché pour ses animations d'apparition
 * restait invisible : la page de parrainage s'affichait vide (constaté le
 * 06/10/2026 sur le poste d'un collègue, reproduit sans JavaScript).
 */
export default function JsPret() {
  useEffect(() => {
    document.documentElement.classList.add('js-pret')
  }, [])
  return null
}
