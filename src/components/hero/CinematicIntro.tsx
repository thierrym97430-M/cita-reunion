'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'

interface Props {
  onComplete: () => void
}

export default function CinematicIntro({ onComplete }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLDivElement>(null)
  const glowRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current!
    const logo    = logoRef.current!
    const glow    = glowRef.current!

    // ── État initial ──────────────────────────────────────
    gsap.set(overlay, { opacity: 1 })
    gsap.set(logo,    {
      scale: 5,
      opacity: 0,
      filter: 'blur(20px)',
      xPercent: -50,
      yPercent: -50,
    })
    gsap.set(glow, { opacity: 0, scale: 0.5 })

    // ── Timeline cinématique ──────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            overlay.style.display = 'none'
            onComplete()
          },
        })
      },
    })

    // 1. Pause noir — suspense
    tl.to({}, { duration: 0.35 })

    // 2. Glow apparaît en premier
    tl.to(glow, {
      opacity: 0.6,
      scale: 1.2,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.35)

    // 3. Logo géant apparaît avec dé-flou
    tl.to(logo, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: 'power3.out',
    }, 0.5)

    // 4. Dézoom du logo vers sa position finale
    tl.to(logo, {
      scale: 1,
      duration: 1.3,
      ease: 'expo.inOut',
    }, 0.9)

    // 5. Glow se réduit pendant le dézoom
    tl.to(glow, {
      opacity: 0,
      scale: 0.3,
      duration: 0.8,
      ease: 'power3.in',
    }, 1.2)

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050d1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Halo lumineux derrière le logo */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(19,85,168,0.5) 0%, rgba(245,130,31,0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo centré, position absolute pour le dézoom */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      >
        <Image
          src="/images/logo-cita-transparent.png"
          alt="CITA La Réunion"
          width={280}
          height={120}
          style={{ width: 280, height: 'auto', objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  )
}
