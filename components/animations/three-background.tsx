"use client"

import { useEffect, useRef } from "react"
import type { PerspectiveCamera, Points, Scene, WebGLRenderer } from "three"

const PARTICLE_COUNT = 1200

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") {
      return
    }

    const mountNode = mountRef.current

    let renderer: WebGLRenderer | null = null
    let scene: Scene | null = null
    let camera: PerspectiveCamera | null = null
    let points: Points | null = null
    let animationFrameId = 0
    let isDisposed = false

    const init = async () => {
      const THREE = await import("three")
      if (!mountNode || isDisposed) {
        return
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      mountNode.appendChild(renderer.domElement)

      const positions = new Float32Array(PARTICLE_COUNT * 3)
      const colors = new Float32Array(PARTICLE_COUNT * 3)

      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const i3 = index * 3
        positions[i3] = (Math.random() - 0.5) * 16
        positions[i3 + 1] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 10

        colors[i3] = 0.2 + Math.random() * 0.3
        colors[i3 + 1] = 0.4 + Math.random() * 0.4
        colors[i3 + 2] = 0.7 + Math.random() * 0.3
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      })

      points = new THREE.Points(geometry, material)
      scene.add(points)

      let mouseX = 0
      let mouseY = 0

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      }

      const handleResize = () => {
        if (!renderer || !camera) {
          return
        }

        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      const animate = () => {
        if (!renderer || !scene || !camera || !points || isDisposed) {
          return
        }

        const elapsedTime = performance.now() * 0.0001
        points.rotation.y = elapsedTime
        points.rotation.x = elapsedTime * 0.7

        if (!prefersReducedMotion) {
          camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.03
          camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.03
          camera.lookAt(0, 0, 0)
        }

        renderer.render(scene, camera)
        animationFrameId = window.requestAnimationFrame(animate)
      }

      window.addEventListener("mousemove", handleMouseMove, { passive: true })
      window.addEventListener("resize", handleResize)
      animate()

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", handleResize)
      }
    }

    let removeListeners: (() => void) | undefined

    init().then((cleanup) => {
      removeListeners = cleanup
    })

    return () => {
      isDisposed = true
      window.cancelAnimationFrame(animationFrameId)
      removeListeners?.()

      if (points) {
        points.geometry.dispose()
        const material = points.material
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose())
        } else {
          material.dispose()
        }
      }

      if (renderer) {
        renderer.dispose()
        if (mountNode.contains(renderer.domElement)) {
          mountNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 -z-10 opacity-70" aria-hidden="true" />
}
