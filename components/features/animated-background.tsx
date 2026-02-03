"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const darkBlue = "#002d63"
    const cyan = "#02e0ff"

    // const blobs = [
    //   { x: 0.3, y: 0.3, radius: 0.4, speedX: 0.0003, speedY: 0.0004, phase: 0 },
    //   { x: 0.7, y: 0.6, radius: 0.35, speedX: -0.0004, speedY: 0.0003, phase: Math.PI / 2 },
    //   { x: 0.5, y: 0.8, radius: 0.45, speedX: 0.0002, speedY: -0.0003, phase: Math.PI },
    // ]
    const blobs = [
      { x: 0.15, y: 0.15, radius: 0.4, speedX: 0.0003, speedY: 0.0004, phase: 0 },
      { x: 0.5, y: 0.9, radius: 0.35, speedX: -0.0004, speedY: 0.0003, phase: Math.PI / 2 },
      { x: 0.9, y: 0.5, radius: 0.45, speedX: 0.0002, speedY: -0.0003, phase: Math.PI },
    ]

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const animate = () => {
      const width = canvas.getBoundingClientRect().width
      const height = canvas.getBoundingClientRect().height

      time += 1

      ctx.fillStyle = "#000a18"
      ctx.fillRect(0, 0, width, height)

      blobs.forEach((blob, i) => {
        blob.x += Math.sin(time * blob.speedX * 10 + blob.phase) * 0.002
        blob.y += Math.cos(time * blob.speedY * 10 + blob.phase) * 0.002

        blob.x = blob.x < -0.2 ? 1.2 : blob.x > 1.2 ? -0.2 : blob.x
        blob.y = blob.y < -0.2 ? 1.2 : blob.y > 1.2 ? -0.2 : blob.y

        const pulseRadius = blob.radius * (1 + Math.sin(time * 0.01 + i) * 0.15)

        const gradient = ctx.createRadialGradient(
          blob.x * width,
          blob.y * height,
          0,
          blob.x * width,
          blob.y * height,
          pulseRadius * Math.max(width, height)
        )

        if (i % 2 === 0) {
          gradient.addColorStop(0, cyan)
          gradient.addColorStop(0.4, darkBlue)
          gradient.addColorStop(1, "transparent")
        } else {
          gradient.addColorStop(0, darkBlue)
          gradient.addColorStop(0.3, cyan)
          gradient.addColorStop(0.6, darkBlue)
          gradient.addColorStop(1, "transparent")
        }

        ctx.globalCompositeOperation = "lighter"
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })

      ctx.globalCompositeOperation = "source-over"

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#000a18]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(80px)",
          WebkitBackdropFilter: "blur(80px)",
        }}
      />

      <div
        className="absolute inset-0 bg-[#000a18]"
        style={{ opacity: 0.5 }}
      />
    </div>
  )
}
