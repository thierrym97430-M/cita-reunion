'use client'

import { useEffect } from 'react'
import { gsap } from '@/lib/gsap-config'

/* ── Parallax layers ──────────────────────────────────────────────────
   Chaque couche se décale différemment au mouvement de la souris.
   depth : intensité du décalage (plus haut = plus de mouvement).       */
const PARALLAX_LAYERS = [
  { selector: '.hero-badge',         depth: 4 },
  { selector: '.hero-line-1',        depth: 6 },
  { selector: '.hero-line-2',        depth: 8 },
  { selector: '.hero-line-3',        depth: 10 },
  { selector: '.hero-description',   depth: 3 },
  { selector: '.hero-btn-primary',   depth: 5 },
  { selector: '.hero-btn-secondary', depth: 5 },
  { selector: '.hero-trust-badge',   depth: 2 },
]

/* ── Effet magnétique sur les boutons CTA ─────────────────────────── */
function setupMagnetic(selector: string) {
  const els = document.querySelectorAll<HTMLElement>(selector)
  const handlers: Array<{ el: HTMLElement; enter: () => void; move: (e: MouseEvent) => void; leave: () => void }> = []

  els.forEach(el => {
    let bounds: DOMRect

    const enter = () => { bounds = el.getBoundingClientRect() }

    const move = (e: MouseEvent) => {
      if (!bounds) return
      const x = e.clientX - bounds.left - bounds.width / 2
      const y = e.clientY - bounds.top - bounds.height / 2
      gsap.to(el, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const leave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mouseenter', enter)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    handlers.push({ el, enter, move, leave })
  })

  return () => {
    handlers.forEach(({ el, enter, move, leave }) => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    })
  }
}

/* ── Hook principal ───────────────────────────────────────────────── */
export function useHeroAnimation() {
  useEffect(() => {
    // Skip on mobile (no hover / small viewport)
    if (window.innerWidth < 768) return

    // 1. Parallax souris sur toutes les couches texte du hero
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx   // -1 → 1
      const dy = (e.clientY - cy) / cy

      PARALLAX_LAYERS.forEach(({ selector, depth }) => {
        gsap.to(selector, {
          x: dx * depth,
          y: dy * depth,
          duration: 1,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    // 2. Effet magnétique sur les 2 boutons CTA
    const cleanupPrimary = setupMagnetic('.hero-btn-primary')
    const cleanupSecondary = setupMagnetic('.hero-btn-secondary')

    // 3. Lévitation continue en boucle sur les 6 images produits
    const floatConfigs = [
      { sel: '.product-left-1',  y: 16, dur: 3.2, delay: 0.0, rot:  3 },
      { sel: '.product-left-2',  y: 12, dur: 2.7, delay: 0.7, rot: -2 },
      { sel: '.product-left-3',  y: 18, dur: 3.6, delay: 0.4, rot:  2 },
      { sel: '.product-right-1', y: 14, dur: 3.0, delay: 0.5, rot: -3 },
      { sel: '.product-right-2', y: 20, dur: 3.8, delay: 0.2, rot:  2 },
      { sel: '.product-right-3', y: 13, dur: 2.9, delay: 0.9, rot: -2 },
    ]

    floatConfigs.forEach(({ sel, y, dur, delay, rot }) => {
      gsap.to(sel, {
        y: `-=${y}`,
        duration: dur,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: delay,
      })
      gsap.to(sel, {
        rotation: rot,
        duration: dur * 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: delay,
      })
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cleanupPrimary()
      cleanupSecondary()
      PARALLAX_LAYERS.forEach(({ selector }) => {
        gsap.killTweensOf(selector)
      })
      gsap.killTweensOf('.product-left-1, .product-left-2, .product-left-3, .product-right-1, .product-right-2, .product-right-3')
    }
  }, [])
}
