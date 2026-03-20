'use client'

import { useEffect } from 'react'
import { gsap } from '@/lib/gsap-config'

export function useHeroAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 768

    // ─────────────────────────────────────────────────────────
    // ÉTAT INITIAL — tout masqué avant la séquence
    // ─────────────────────────────────────────────────────────

    // Texte hero
    gsap.set('.hero-badge',        { opacity: 0, y: -24, scale: 0.8 })
    gsap.set('.hero-line-1',       { opacity: 0, y: 80,  clipPath: 'inset(0 0 100% 0)' })
    gsap.set('.hero-line-2',       { opacity: 0, y: 80,  clipPath: 'inset(0 0 100% 0)' })
    gsap.set('.hero-line-3',       { opacity: 0, scale: 1.4, y: 20 })
    gsap.set('.hero-description',  { opacity: 0, y: 32 })
    gsap.set('.hero-btn-primary',  { opacity: 0, y: 24, scale: 0.88 })
    gsap.set('.hero-btn-secondary',{ opacity: 0, y: 24, scale: 0.88 })
    gsap.set('.hero-trust-badge',  { opacity: 0, y: 18, scale: 0.9 })

    // Produits — hors champ selon leur côté
    if (!isMobile) {
      gsap.set('.product-left-1',  { opacity: 0, x: -160, y: -50, scale: 0.4, rotation: -12 })
      gsap.set('.product-left-2',  { opacity: 0, x: -180, y:   0, scale: 0.4, rotation:  -8 })
      gsap.set('.product-left-3',  { opacity: 0, x: -140, y:  50, scale: 0.4, rotation: -10 })
      gsap.set('.product-right-1', { opacity: 0, x:  160, y: -50, scale: 0.4, rotation:  12 })
      gsap.set('.product-right-2', { opacity: 0, x:  180, y:   0, scale: 0.4, rotation:   8 })
      gsap.set('.product-right-3', { opacity: 0, x:  140, y:  50, scale: 0.4, rotation:  10 })
    }

    // ─────────────────────────────────────────────────────────
    // SÉQUENCE PRINCIPALE — démarre après la fin de l'intro
    // (délai calé sur la durée de CinematicIntro ~2.2s)
    // ─────────────────────────────────────────────────────────

    const INTRO_DURATION = 2.3  // secondes — sync avec CinematicIntro

    const tl = gsap.timeline({ delay: INTRO_DURATION })

    // ── Badge "Télésurveillance active" ──
    tl.to('.hero-badge', {
      opacity: 1, y: 0, scale: 1,
      duration: 0.65,
      ease: 'back.out(2.5)',
    }, 0.0)

    // ── Ligne 1 — "Votre sécurité." ──
    tl.to('.hero-line-1', {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.75,
      ease: 'power4.out',
    }, 0.2)

    // ── Ligne 2 — "Notre priorité." (grisée/fantôme) ──
    tl.to('.hero-line-2', {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.75,
      ease: 'power4.out',
    }, 0.38)

    // ── Ligne 3 — "Depuis 1988." — impact visuel ──
    tl.to('.hero-line-3', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
    }, 0.55)

    // Flash lumineux au moment de l'impact de "Depuis 1988."
    tl.to('.hero-flash', {
      opacity: 0.25,
      duration: 0.08,
      ease: 'none',
      yoyo: true,
      repeat: 1,
    }, 0.55)

    // ── Produits — volent depuis les côtés ──
    if (!isMobile) {
      tl.to('.product-left-1', {
        opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
        duration: 1.1, ease: 'back.out(1.5)',
      }, 0.25)
      tl.to('.product-left-2', {
        opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
        duration: 1.1, ease: 'back.out(1.5)',
      }, 0.42)
      tl.to('.product-left-3', {
        opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
        duration: 1.1, ease: 'back.out(1.5)',
      }, 0.55)
      tl.to('.product-right-1', {
        opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
        duration: 1.1, ease: 'back.out(1.5)',
      }, 0.3)
      tl.to('.product-right-2', {
        opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
        duration: 1.2, ease: 'back.out(1.5)',
      }, 0.48)
      tl.to('.product-right-3', {
        opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
        duration: 1.1, ease: 'back.out(1.5)',
      }, 0.62)
    }

    // ── Description ──
    tl.to('.hero-description', {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, 0.78)

    // ── Boutons CTA ──
    tl.to(['.hero-btn-primary', '.hero-btn-secondary'], {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      ease: 'back.out(2)',
      stagger: 0.1,
    }, 0.92)

    // ── Badges de confiance — stagger fin ──
    tl.to('.hero-trust-badge', {
      opacity: 1, y: 0, scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
    }, 1.05)

    // ─────────────────────────────────────────────────────────
    // LÉVITATION CONTINUE (démarre après l'entrée)
    // ─────────────────────────────────────────────────────────

    if (!isMobile) {
      const floats = [
        { sel: '.product-left-1',  y: 16, dur: 3.2, delay: 0.0, rot:  3 },
        { sel: '.product-left-2',  y: 12, dur: 2.7, delay: 0.7, rot: -2 },
        { sel: '.product-left-3',  y: 18, dur: 3.6, delay: 0.4, rot:  2 },
        { sel: '.product-right-1', y: 14, dur: 3.0, delay: 0.5, rot: -3 },
        { sel: '.product-right-2', y: 20, dur: 3.8, delay: 0.2, rot:  2 },
        { sel: '.product-right-3', y: 13, dur: 2.9, delay: 0.9, rot: -2 },
      ]

      const FLOAT_START = INTRO_DURATION + 1.8

      floats.forEach(({ sel, y, dur, delay, rot }) => {
        gsap.to(sel, {
          y: `-=${y}`,
          duration: dur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: FLOAT_START + delay,
        })
        gsap.to(sel, {
          rotation: rot,
          duration: dur * 1.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: FLOAT_START + delay,
        })
      })
    }

    // ─────────────────────────────────────────────────────────
    // PARALLAX SOURIS MULTICOUCHE
    // ─────────────────────────────────────────────────────────

    if (!isMobile) {
      const layers = [
        { sel: '.product-left-1',    fx:  20, fy:  14 },
        { sel: '.product-left-2',    fx:  24, fy:  18 },
        { sel: '.product-left-3',    fx:  18, fy:  22 },
        { sel: '.product-right-1',   fx: -22, fy:  16 },
        { sel: '.product-right-2',   fx: -26, fy:  12 },
        { sel: '.product-right-3',   fx: -20, fy:  20 },
        { sel: '.hero-line-1',       fx:   7, fy:   5 },
        { sel: '.hero-line-2',       fx:   6, fy:   4 },
        { sel: '.hero-line-3',       fx:   8, fy:   6 },
        { sel: '.hero-description',  fx:   5, fy:   3 },
        { sel: '.hero-badge',        fx:   4, fy:  -3 },
        { sel: '.hero-btn-primary',  fx:   6, fy:   4 },
        { sel: '.hero-btn-secondary',fx:   5, fy:   4 },
      ]

      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2

      const onMouseMove = (e: MouseEvent) => {
        const dx = (e.clientX - cx) / cx
        const dy = (e.clientY - cy) / cy
        layers.forEach(({ sel, fx, fy }) => {
          gsap.to(sel, {
            x: dx * fx,
            y: dy * fy,
            duration: 1.4,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        })
      }
      window.addEventListener('mousemove', onMouseMove)

      // ── Effet magnétique sur les boutons CTA ──
      const btns = document.querySelectorAll<HTMLElement>(
        '.hero-btn-primary, .hero-btn-secondary'
      )
      btns.forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const r  = btn.getBoundingClientRect()
          const bx = e.clientX - r.left  - r.width  / 2
          const by = e.clientY - r.top   - r.height / 2
          gsap.to(btn, { x: bx * 0.3, y: by * 0.3, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
        })
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
        })
      })

      // ── Hover scale + glow sur les produits ──
      const prods = document.querySelectorAll<HTMLElement>(
        '.product-left-1,.product-left-2,.product-left-3,' +
        '.product-right-1,.product-right-2,.product-right-3'
      )
      prods.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1,   duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
        })
      })

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        tl.kill()
        gsap.killTweensOf([
          '.product-left-1','.product-left-2','.product-left-3',
          '.product-right-1','.product-right-2','.product-right-3',
          '.hero-badge','.hero-line-1','.hero-line-2','.hero-line-3',
          '.hero-description','.hero-btn-primary','.hero-btn-secondary','.hero-trust-badge',
        ])
      }
    }

    return () => { tl.kill() }
  }, [])
}
