import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

interface Leaf {
  id: number
  x: number
  delay: number
  duration: number
  rotation: number
}

interface Firefly {
  id: number
  x: number
  y: number
  delay: number
  duration: number
}

const TwinklingStars = ({ count = 12 }: { count?: number }) => {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 40,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 3,
      })),
    [count]
  )

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-sky-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

const FloatingLeaves = ({ count = 5 }: { count?: number }) => {
  const leaves = useMemo<Leaf[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 8,
        rotation: Math.random() * 360,
      })),
    [count]
  )

  return (
    <>
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-forest-leaf text-2xl pointer-events-none select-none"
          style={{
            left: `${leaf.x}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(leaf.rotation) * 40, 0],
            rotate: [0, leaf.rotation, leaf.rotation * 2],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🍃
        </motion.div>
      ))}
    </>
  )
}

const Fireflies = ({ count = 6 }: { count?: number }) => {
  const fireflies = useMemo<Firefly[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 30 + Math.random() * 50,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 6,
      })),
    [count]
  )

  return (
    <>
      {fireflies.map((ff) => (
        <motion.div
          key={ff.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: `${ff.x}%`,
            top: `${ff.y}%`,
            backgroundColor: '#FDE047',
            boxShadow: '0 0 8px 4px rgba(253, 224, 71, 0.5)',
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -25, 15, -35, 0],
            opacity: [0.3, 1, 0.5, 1, 0.3],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: ff.duration,
            delay: ff.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

interface FantasyBackgroundProps {
  variant?: 'default' | 'night' | 'celebration'
  showStars?: boolean
  showLeaves?: boolean
  showFireflies?: boolean
}

export const FantasyBackground = ({
  variant = 'default',
  showStars = true,
  showLeaves = true,
  showFireflies = true,
}: FantasyBackgroundProps) => {
  const bgGradient = {
    default: 'bg-gradient-to-b from-sky-twilight via-fantasy-soft to-forest-mist',
    night: 'bg-gradient-to-b from-sky-night via-shadow-magic-core to-forest-deep',
    celebration: 'bg-gradient-to-b from-sky-aurora via-fantasy-soft to-forest-glow',
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* メイングラデーション */}
      <div className={`absolute inset-0 ${bgGradient[variant]}`} />

      {/* 紙テクスチャ */}
      <div className="absolute inset-0 paper-texture pointer-events-none" />

      {/* 光のグラデーションオーバーレイ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            variant === 'default'
              ? `
                radial-gradient(circle at 20% 30%, rgba(255, 230, 109, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(224, 231, 255, 0.2) 0%, transparent 35%),
                radial-gradient(circle at 50% 80%, rgba(149, 213, 178, 0.15) 0%, transparent 40%)
              `
              : variant === 'night'
                ? `
                radial-gradient(circle at 30% 20%, rgba(92, 107, 192, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 70% 30%, rgba(196, 181, 253, 0.15) 0%, transparent 35%)
              `
                : `
                radial-gradient(circle at 50% 50%, rgba(253, 224, 71, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(92, 107, 192, 0.1) 0%, transparent 40%)
              `,
        }}
      />

      {/* 装飾要素 */}
      {showStars && <TwinklingStars count={variant === 'night' ? 20 : 10} />}
      {showLeaves && variant !== 'night' && <FloatingLeaves count={4} />}
      {showFireflies && <Fireflies count={variant === 'night' ? 10 : 5} />}

      {/* 下部の森シルエット */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: `
            linear-gradient(to top,
              ${variant === 'night' ? 'rgba(27, 67, 50, 0.8)' : 'rgba(45, 106, 79, 0.3)'} 0%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  )
}

export default FantasyBackground
