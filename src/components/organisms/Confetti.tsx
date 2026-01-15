import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#FFE66D', '#5C6BC0', '#EC4899', '#22C55E', '#F97316', '#C4B5FD']

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  color: string
  rotation: number
  size: number
  shape: 'square' | 'circle' | 'star'
}

interface Star {
  id: number
  x: number
  y: number
  delay: number
  size: number
}

const StarShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
)

const ExplodingStars = () => {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 30 + (Math.random() - 0.5) * 10,
        delay: Math.random() * 0.3,
        size: 16 + Math.random() * 24,
      })),
    []
  )

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => {
        const angle = (star.id / 20) * 360
        const distance = 150 + Math.random() * 100

        return (
          <motion.div
            key={star.id}
            className="absolute text-sky-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            initial={{ scale: 0, x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0.5],
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
              rotate: 360,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: star.delay,
              ease: 'easeOut',
            }}
          >
            <StarShape className="w-full h-full" />
          </motion.div>
        )
      })}
    </div>
  )
}

const Rainbow = () => (
  <motion.div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-48 pointer-events-none"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 0.7 }}
    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
    style={{
      background: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(239, 68, 68, 0.6) 15%,
          rgba(249, 115, 22, 0.6) 28%,
          rgba(234, 179, 8, 0.6) 42%,
          rgba(34, 197, 94, 0.6) 57%,
          rgba(59, 130, 246, 0.6) 71%,
          rgba(139, 92, 246, 0.6) 85%,
          transparent 100%
        )
      `,
      borderRadius: '0 0 50% 50%',
    }}
  />
)

const Confetti = memo(function Confetti() {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() > 0.5 ? 720 : -720,
      size: 8 + Math.random() * 8,
      shape: ['square', 'circle', 'star'][Math.floor(Math.random() * 3)] as 'square' | 'circle' | 'star',
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* 虹のアーチ */}
      <Rainbow />

      {/* 爆発する星 */}
      <ExplodingStars />

      {/* 紙吹雪 */}
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: -20,
            rotate: 0,
            opacity: 1,
            scale: 0,
          }}
          animate={{
            y: '110vh',
            rotate: piece.rotation,
            opacity: [1, 1, 0],
            scale: [0, 1, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: piece.delay,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            width: piece.size,
            height: piece.size,
          }}
        >
          {piece.shape === 'star' ? (
            <StarShape className="w-full h-full" style={{ color: piece.color }} />
          ) : (
            <div
              className={piece.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: piece.color,
                boxShadow: `0 0 ${piece.size / 2}px ${piece.color}80`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
})

export default Confetti
