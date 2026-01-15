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

  // 置ける場所のプレビュー表示
  if (isPlaceable) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3, type: 'spring' }}
        className="absolute inset-[10%] flex items-center justify-center"
      >
        {/* 半透明の魔法石プレビュー */}
        <div
          className="w-full h-full rounded-full opacity-40"
          style={{
            background: color === 'white'
              ? 'radial-gradient(circle at 30% 30%, #FFFCF2, #FFE66D)'
              : 'radial-gradient(circle at 30% 30%, #5C6BC0, #2C3E50)',
          }}
        />
        {/* キラキラドット */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-3 h-3 rounded-full bg-sky-star"
          style={{
            boxShadow: '0 0 12px 4px rgba(253, 224, 71, 0.8)',
          }}
        />
        {/* ヒント表示時は追加のエフェクト */}
        {isHint && (
          <>
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute w-full h-full rounded-full border-4 border-sky-star"
            />
            <motion.div
              animate={{
                scale: [1.2, 2.2, 1.2],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.3,
              }}
              className="absolute w-full h-full rounded-full border-2 border-light-magic-glow"
            />
          </>
        )}
      </motion.div>
    )
  }

  // 光の魔法石（白）のスタイル
  const lightStoneStyle = {
    background: 'radial-gradient(circle at 30% 30%, #FFFCF2 0%, #FFE66D 70%, #F59E0B 100%)',
    boxShadow: isGlowing
      ? '0 0 20px 10px rgba(255, 230, 109, 0.7), 0 4px 12px rgba(255, 230, 109, 0.5), inset 0 -4px 8px rgba(0, 0, 0, 0.1)'
      : '0 4px 12px rgba(255, 230, 109, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.1)',
  }

  // 影の魔法石（黒）のスタイル
  const darkStoneStyle = {
    background: 'radial-gradient(circle at 30% 30%, #7C8CDB 0%, #5C6BC0 40%, #2C3E50 100%)',
    boxShadow: isGlowing
      ? '0 0 20px 10px rgba(92, 107, 192, 0.7), 0 4px 12px rgba(92, 107, 192, 0.5), inset 0 -4px 8px rgba(0, 0, 0, 0.2)'
      : '0 4px 12px rgba(92, 107, 192, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.2)',
  }

  const stoneStyle = color === 'white' ? lightStoneStyle : darkStoneStyle

  return (
    <div className="absolute inset-[8%] flex items-center justify-center">
      <motion.div
        initial={isNew ? { scale: 0, rotate: -180, opacity: 0 } : false}
        animate={
          isFlipping
            ? {
                scaleX: [1, 0, 0, 1],
                rotateY: [0, 90, 90, 0],
              }
            : isNew
              ? { scale: 1, rotate: 0, opacity: 1 }
              : {}
        }
        transition={
          isFlipping
            ? { duration: 0.4, ease: 'easeInOut', times: [0, 0.4, 0.6, 1] }
            : { type: 'spring', stiffness: 400, damping: 15 }
        }
        className="w-full h-full rounded-full relative"
        style={{
          ...stoneStyle,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 光沢オーバーレイ */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 30%, transparent 50%)',
          }}
        />

        {/* グローイング時のパルスエフェクト */}
        {isGlowing && (
          <motion.div
            className="absolute -inset-1 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: color === 'white'
                ? 'radial-gradient(circle, rgba(255, 230, 109, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(92, 107, 192, 0.4) 0%, transparent 70%)',
            }}
          />
        )}
      </motion.div>

      {/* ヒント表示 */}
      {isHint && (
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.9, 0.3, 0.9],
          }}
          transition={{
            duration: 0.6,
            repeat: 8,
            ease: 'easeInOut',
          }}
          className="absolute w-5 h-5 bg-sky-star rounded-full z-20"
          style={{
            boxShadow: '0 0 16px 6px rgba(253, 224, 71, 0.9)',
          }}
        />
      )}
    </div>
  )
})

export default Stone
