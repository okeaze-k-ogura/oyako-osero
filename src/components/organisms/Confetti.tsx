import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#FBBF24', '#38BDF8', '#FB7185', '#34D399', '#A78BFA']

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  color: string
  rotation: number
}

const Confetti = memo(function Confetti() {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() > 0.5 ? 360 : -360,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: '110vh',
            rotate: piece.rotation,
            opacity: 0,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.delay,
            ease: 'linear',
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  )
})

export default Confetti
