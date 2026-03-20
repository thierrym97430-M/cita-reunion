'use client'

import Image from 'next/image'

/* ── Données de chaque produit ──────────────────────────────────────── */
interface DeviceConfig {
  id: string
  src: string
  alt: string
  width: number
  style: React.CSSProperties
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
    glowColor: 'rgba(19,85,168,0.55)',
    productClass: 'product-right-1',
  },
  {
    id: 'spro',
    src: '/images3D/VIDEO_spro.png',
    alt: 'Caméra Speed Pro dôme',
    width: 160,
    style: { right: '2%', top: '6%' },
    glowColor: 'rgba(19,85,168,0.45)',
    productClass: 'product-right-2',
  },
  {
    id: '4m',
    src: '/images3D/VIDEO_4M.png',
    alt: 'Caméra 4MP compacte',
    width: 130,
    style: { right: '3%', bottom: '8%' },
    glowColor: 'rgba(19,85,168,0.4)',
    productClass: 'product-right-3',
  },
  {
    id: 'v421',
    src: '/images3D/VESTA-421.png',
    alt: 'Centrale alarme VESTA 421',
    width: 150,
    style: { left: '2%', top: '5%' },
    glowColor: 'rgba(245,130,31,0.45)',
    productClass: 'product-left-1',
  },
  {
    id: 'v423',
    src: '/images3D/VESTA-423.png',
    alt: 'Détecteur alarme VESTA 423',
    width: 120,
    style: { left: '3%', bottom: '8%' },
    glowColor: 'rgba(245,130,31,0.4)',
    productClass: 'product-left-3',
  },
  {
    id: 'v013',
    src: '/images3D/VESTA-013.png',
    alt: 'Détecteur VESTA 013',
    width: 100,
    style: { left: '5%', top: '50%', transform: 'translateY(-50%)' },
    glowColor: 'rgba(245,130,31,0.35)',
    productClass: 'product-left-2',
  },
]

/* ── Composant (rendu pur — animations gérées par useHeroAnimation) ── */
export default function HeroDevices() {
  return (
    <div
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
