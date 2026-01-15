import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

interface MagicSparklesProps {
  count?: number
  color?: 'gold' | 'purple' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export const MagicSparkles = ({
  count = 6,
  color = 'gold',
  size = 'md',
}: MagicSparklesProps) => {
  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 1,
      })),
    [count]
  )

  const colorMap = {
    gold: '#FFE66D',
    purple: '#5C6BC0',
    white: '#FFFFFF',
  }

  const sizeMap = {
    sm: 4,
    md: 6,
    lg: 8,
  }

  const baseSize = sizeMap[size]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: baseSize * sparkle.size,
            height: baseSize * sparkle.size,
            backgroundColor: colorMap[color],
            boxShadow: `0 0 ${baseSize}px ${baseSize / 2}px ${colorMap[color]}80`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 1.5,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

interface MagicBurstProps {
  active: boolean
  color?: 'gold' | 'purple'
  onComplete?: () => void
}

export const MagicBurst = ({
  active,
  color = 'gold',
  onComplete,
}: MagicBurstProps) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i / 12) * 360,
        distance: 40 + Math.random() * 30,
      })),
    []
  )

  const colorMap = {
    gold: '#FFE66D',
    purple: '#5C6BC0',
  }

  if (!active) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colorMap[color],
            boxShadow: `0 0 8px 4px ${colorMap[color]}80`,
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0.5],
            x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
            y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          onAnimationComplete={index === 0 ? onComplete : undefined}
        />
      ))}
    </div>
  )
}

export default MagicSparkles
