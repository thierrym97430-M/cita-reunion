'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'

/* ── Données de chaque produit ──────────────────────────────────────── */
interface DeviceConfig {
  id: string
  src: string
  alt: string
  width: number
  style: React.CSSProperties
  floatY: number
  floatDuration: number
  floatDelay: number
  rotFrom: number
  rotTo: number
  entryX: number
  entryY: number
  entryDelay: number
  glowColor: string
  productClass: string
}

const DEVICES: DeviceConfig[] = [
  {
    id: 'tioc',
    src: '/images3D/VIDEO_TIOC180.png',
    alt: 'Caméra panoramique TIOC 180°',
    width: 220,
    style: { right: '6%', top: '50%', transform: 'translateY(-50%)' },
    floatY: 18, floatDuration: 3.6, floatDelay: 0.0,
    rotFrom: -2, rotTo: 2,
    entryX: 120, entryY: 0, entryDelay: 0.1,
    glowColor: 'rgba(19,85,168,0.55)',
    productClass: 'product-right-1',
  },
  {
    id: 'spro',
    src: '/images3D/VIDEO_spro.png',
    alt: 'Caméra Speed Pro dôme',
    width: 160,
    style: { right: '2%', top: '6%' },
    floatY: 14, floatDuration: 3.0, floatDelay: 0.5,
    rotFrom: -3, rotTo: 3,
    entryX: 80, entryY: -60, entryDelay: 0.22,
    glowColor: 'rgba(19,85,168,0.45)',
    productClass: 'product-right-2',
  },
  {
    id: '4m',
    src: '/images3D/VIDEO_4M.png',
    alt: 'Caméra 4MP compacte',
    width: 130,
    style: { right: '3%', bottom: '8%' },
    floatY: 12, floatDuration: 2.8, floatDelay: 1.2,
    rotFrom: 2, rotTo: -2,
    entryX: 60, entryY: 60, entryDelay: 0.38,
    glowColor: 'rgba(19,85,168,0.4)',
    productClass: 'product-right-3',
  },
  {
    id: 'v421',
    src: '/images3D/VESTA-421.png',
    alt: 'Centrale alarme VESTA 421',
    width: 150,
    style: { left: '2%', top: '5%' },
    floatY: 16, floatDuration: 3.2, floatDelay: 0.7,
    rotFrom: 3, rotTo: -3,
    entryX: -80, entryY: -60, entryDelay: 0.16,
    glowColor: 'rgba(245,130,31,0.45)',
    productClass: 'product-left-1',
  },
  {
    id: 'v423',
    src: '/images3D/VESTA-423.png',
    alt: 'Détecteur alarme VESTA 423',
    width: 120,
    style: { left: '3%', bottom: '8%' },
    floatY: 13, floatDuration: 2.6, floatDelay: 1.0,
    rotFrom: -3, rotTo: 3,
    entryX: -60, entryY: 60, entryDelay: 0.30,
    glowColor: 'rgba(245,130,31,0.4)',
    productClass: 'product-left-3',
  },
  {
    id: 'v013',
    src: '/images3D/VESTA-013.png',
    alt: 'Détecteur VESTA 013',
    width: 100,
    style: { left: '5%', top: '50%', transform: 'translateY(-50%)' },
    floatY: 10, floatDuration: 2.4, floatDelay: 0.9,
    rotFrom: 2, rotTo: -2,
    entryX: -50, entryY: 0, entryDelay: 0.44,
    glowColor: 'rgba(245,130,31,0.35)',
    productClass: 'product-left-2',
  },
]

/* ── Composant ──────────────────────────────────────────────────────── */
export default function HeroDevices() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. État initial — invisible, décalé vers l'extérieur
    DEVICES.forEach(d => {
      gsap.set(`.device-${d.id}`, {
        opacity: 0,
        x: d.entryX,
        y: d.entryY,
        scale: 0.55,
      })
    })

    // 2. Entrée orchestrée — spring avec rebond
    const tl = gsap.timeline({ delay: 0.4 })
    DEVICES.forEach(d => {
      tl.to(`.device-${d.id}`, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.15,
        ease: 'back.out(1.6)',
      }, d.entryDelay)
    })

    // 3. Lévitation + parallax souris gérés par useHeroAnimation

    // 4. Réaction subtile au mouvement de la souris (parallax léger)
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy

      DEVICES.forEach((d, i) => {
        const factor = (i % 2 === 0 ? 1 : -1) * (8 + i * 2)
        gsap.to(`.device-${d.id}`, {
          x: dx * factor,
          y: dy * factor,
          duration: 1.2,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      DEVICES.forEach(d => {
        gsap.killTweensOf(`.device-${d.id}`)
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {DEVICES.map(d => (
        <div
          key={d.id}
          className={`device-${d.id} ${d.productClass} absolute hidden lg:block`}
          style={{
            ...d.style,
            filter: `drop-shadow(0 16px 40px ${d.glowColor})
                     drop-shadow(0 0 12px rgba(19,85,168,0.2))`,
            transition: 'filter 0.4s ease',
          }}
        >
          <Image
            src={d.src}
            alt={d.alt}
            width={d.width}
            height={d.width}
            style={{
              width: d.width,
              height: 'auto',
              objectFit: 'contain',
            }}
            priority
          />
        </div>
      ))}
    </div>
  )
}
