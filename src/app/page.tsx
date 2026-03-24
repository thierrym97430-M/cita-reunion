'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import SloganBanner from "@/components/SloganBanner"
import StatsStrip from "@/components/StatsStrip"
import Services from "@/components/Services"
import Proof from "@/components/Proof"
import Process from "@/components/Process"
import CtaMid from "@/components/CtaMid"
import Faq from "@/components/Faq"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

const ParticleNetwork = dynamic(
  () => import('@/components/three/ParticleNetwork'),
  { ssr: false }
)

const HeroDevices = dynamic(
  () => import('@/components/hero/HeroDevices'),
  { ssr: false }
)

const sectionVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, margin: "-80px" }, variants: sectionVariants }

  return (
    <>
      <Nav />
      <Hero particleNetwork={<ParticleNetwork />} heroDevices={<HeroDevices />} />
      <SloganBanner />
      <StatsStrip />
      <Services />
      <motion.div {...motionProps}><Proof /></motion.div>
      <motion.div {...motionProps}><Process /></motion.div>
      <motion.div {...motionProps}><CtaMid /></motion.div>
      <motion.div {...motionProps}><Faq /></motion.div>
      <motion.div {...motionProps}><Contact /></motion.div>
      <Footer />
    </>
  )
}
