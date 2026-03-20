'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleNetwork() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return  // désactivé mobile

    const mount = mountRef.current!
    const W = window.innerWidth, H = window.innerHeight, N = 140

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.z = 400

    // Suivi souris
    const mouse = new THREE.Vector2(9999, 9999)
    const onMM = (e: MouseEvent) => {
      mouse.x =  (e.clientX / W) * 2 - 1
      mouse.y = -(e.clientY / H) * 2 + 1
    }
    window.addEventListener('mousemove', onMM)

    // Particules
    const pos: number[] = [], vel: THREE.Vector3[] = []
    for (let i = 0; i < N; i++) {
      pos.push(
        (Math.random() - 0.5) * W,
        (Math.random() - 0.5) * H,
        (Math.random() - 0.5) * 200
      )
      vel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        0
      ))
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3))
    const pMat = new THREE.PointsMaterial({
      color: '#1355A8', size: 2.5, transparent: true,
      opacity: 0.45, sizeAttenuation: false,
    })
    scene.add(new THREE.Points(pGeo, pMat))

    // Lignes de connexion
    const lArr = new Float32Array(N * N * 6)
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lArr, 3))
    const lMat = new THREE.LineBasicMaterial({
      color: '#F5821F', transparent: true, opacity: 0.1,
    })
    scene.add(new THREE.LineSegments(lGeo, lMat))

    let animId: number
    const pAttr = pGeo.attributes.position as THREE.BufferAttribute

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const mx = mouse.x * (W / 2), my = mouse.y * (H / 2)
      let li = 0

      for (let i = 0; i < N; i++) {
        let nx = pAttr.getX(i) + vel[i].x
        let ny = pAttr.getY(i) + vel[i].y
        const pz = pAttr.getZ(i)

        if (Math.abs(nx) > W / 2) vel[i].x *= -1
        if (Math.abs(ny) > H / 2) vel[i].y *= -1

        // Répulsion souris
        const dx = nx - mx, dy = ny - my
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 100) {
          const f = (100 - d) / 100
          nx += (dx / d) * f * 2.5
          ny += (dy / d) * f * 2.5
        }

        pAttr.setXYZ(i, nx, ny, pz)

        // Connexions
        for (let j = i + 1; j < N; j++) {
          const qx = pAttr.getX(j), qy = pAttr.getY(j), qz = pAttr.getZ(j)
          if (Math.sqrt((nx-qx)**2 + (ny-qy)**2) < 115) {
            lArr[li++] = nx; lArr[li++] = ny; lArr[li++] = pz
            lArr[li++] = qx; lArr[li++] = qy; lArr[li++] = qz
          }
        }
      }

      pAttr.needsUpdate = true
      lGeo.attributes.position.needsUpdate = true
      lGeo.setDrawRange(0, li / 3)
      renderer.render(scene, camera)
    }
    animate()

    const onR = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onR)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMM)
      window.removeEventListener('resize', onR)
      pGeo.dispose(); pMat.dispose(); lGeo.dispose(); lMat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
