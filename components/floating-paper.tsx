"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export function FloatingPaper({ count = 5 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [mounted, setMounted] = useState(false)
  const [positions, setPositions] = useState<Array<{ x: number[]; y: number[] }>>([])

  useEffect(() => {
    setMounted(true)

    // Update dimensions only on client side
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Generate random positions only on client
    const newPositions = Array.from({ length: count }).map(() => ({
      x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth, Math.random() * window.innerWidth],
      y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight, Math.random() * window.innerHeight],
    }))
    setPositions(newPositions)

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [count])

  if (!mounted) {
    return <div className="relative w-full h-full" />
  }

  return (
    <div className="relative w-full h-full">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: pos.x[0],
            y: pos.y[0],
          }}
          animate={{
            x: pos.x,
            y: pos.y,
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + (i * 3),
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-lime-400/50" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
