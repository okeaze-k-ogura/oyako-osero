import { memo } from 'react'
import { motion } from 'framer-motion'
import type { CellState } from '@/lib/othello/types'

interface StoneProps {
  color: CellState
  isGlowing?: boolean
  isPlaceable?: boolean
  isHint?: boolean
  isFlipping?: boolean
  isNew?: boolean
}

const Stone = memo(function Stone({
  color,
  isGlowing = false,
  isPlaceable = false,
  isHint = false,
  isFlipping = false,
  isNew = false,
}: StoneProps) {
  if (!color && !isPlaceable) return null

  if (isPlaceable) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="absolute inset-[8%] flex items-center justify-center"
      >
        {/* Semi-transparent stone preview */}
        <div
          className={`w-full h-full rounded-full opacity-30 ${
            color === 'black' ? 'bg-gray-800' : 'bg-white'
          }`}
        />
        {/* Sparkle dot */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-3 h-3 bg-yellow-400 rounded-full"
          style={{
            boxShadow: '0 0 10px 3px rgba(250, 204, 21, 0.9)',
          }}
        />
      </motion.div>
    )
  }

  const stoneColor = color === 'black'
    ? 'bg-gray-900'
    : 'bg-white border-2 border-gray-200'

  return (
    <div className="absolute inset-[8%] flex items-center justify-center">
      <motion.div
        initial={isNew ? { scale: 0 } : false}
        animate={
          isFlipping
            ? { scaleX: [1, 0, 1] }
            : isNew
            ? { scale: 1 }
            : {}
        }
        transition={
          isFlipping
            ? { duration: 0.3, ease: 'easeInOut', times: [0, 0.5, 1] }
            : { type: 'spring', stiffness: 400, damping: 20 }
        }
        className={`w-full h-full rounded-full ${stoneColor}`}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isGlowing
            ? color === 'black'
              ? '0 0 12px 4px rgba(59, 130, 246, 0.7)'
              : '0 0 10px 3px rgba(59, 130, 246, 0.5)'
            : '0 2px 4px rgba(0,0,0,0.3)'
        }}
      />
      {isHint && (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 0.5,
            repeat: 6,
            ease: 'easeInOut',
          }}
          className="absolute w-4 h-4 bg-yellow-400 rounded-full z-20"
          style={{
            boxShadow: '0 0 12px 4px rgba(250, 204, 21, 0.9)',
          }}
        />
      )}
    </div>
  )
})

export default Stone
