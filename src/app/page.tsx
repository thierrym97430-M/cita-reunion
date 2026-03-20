'use client'

import dynamic from 'next/dynamic'
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
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

export default function Home() {
  return (
    <>
      <Nav />
      <Hero particleNetwork={<ParticleNetwork />} heroDevices={<HeroDevices />} />
      <StatsStrip />
      <Services />
      <Proof />
      <Process />
      <CtaMid />
      <Faq />
      <Contact />
      <Footer />
    </>
  )
}
