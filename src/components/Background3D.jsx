import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Background3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 60

    const COUNT = 2000
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const palette = [new THREE.Color(0x6c63ff), new THREE.Color(0x00d4ff), new THREE.Color(0xff6584)]

    for (let i = 0; i < COUNT; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 200
      positions[i*3+1] = (Math.random() - 0.5) * 200
      positions[i*3+2] = (Math.random() - 0.5) * 200
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({ size: 0.4, vertexColors: true, transparent: true, opacity: 0.7 })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const lineMat = new THREE.LineBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.06 })
    for (let i = 0; i < 60; i++) {
      const lg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3((Math.random()-0.5)*200, (Math.random()-0.5)*200, (Math.random()-0.5)*200),
        new THREE.Vector3((Math.random()-0.5)*200, (Math.random()-0.5)*200, (Math.random()-0.5)*200),
      ])
      scene.add(new THREE.Line(lg, lineMat))
    }

    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    document.addEventListener('mousemove', onMouse)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = Date.now() * 0.0002
      points.rotation.y = t * 0.4 + mouseX
      points.rotation.x = t * 0.15 + mouseY
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none'
      }}
    />
  )
}
