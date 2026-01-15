import { memo } from 'react'
import { motion } from 'framer-motion'
import type { CellState } from '@/lib/othello/types'

interface PlayerInfoProps {
  icon: string
  name: string
  stoneColor: CellState
  count: number
  isCurrentTurn: boolean
  isFlipped?: boolean
}

const PlayerInfo = memo(function PlayerInfo({
  icon,
  name,
  stoneColor,
  count,
  isCurrentTurn,
}: PlayerInfoProps) {
  // 魔法石のスタイル
  const stoneStyle = stoneColor === 'white'
    ? {
        background: 'radial-gradient(circle at 30% 30%, #FFFCF2 0%, #FFE66D 100%)',
        boxShadow: '0 2px 6px rgba(255, 230, 109, 0.5)',
      }
    : {
        background: 'radial-gradient(circle at 30% 30%, #5C6BC0 0%, #2C3E50 100%)',
        boxShadow: '0 2px 6px rgba(92, 107, 192, 0.5)',
      }

  return (
    <motion.div
      animate={isCurrentTurn ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className={`
        flex items-center gap-3 px-4 py-2 rounded-xl
        transition-all duration-300
        ${isCurrentTurn
          ? 'bg-light-magic-aura/60 shadow-glow-gold border-2 border-light-magic-glow'
          : 'bg-fantasy-cream/70 border-2 border-transparent'
        }
      `}
    >
      {/* キャラクターアイコン */}
      <motion.span
        className="text-4xl"
        animate={isCurrentTurn ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {icon}
      </motion.span>

      <div className="flex flex-col">
        {/* 名前 */}
        <span className={`
          text-kids-base font-bold
          ${isCurrentTurn ? 'text-forest-deep' : 'text-forest-moss'}
        `}>
          {name}
        </span>

        {/* 石の数 */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-5 h-5 rounded-full"
            style={stoneStyle}
            animate={isCurrentTurn ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className={`
            text-kids-lg font-bold
            ${isCurrentTurn ? 'text-forest-deep' : 'text-forest-moss'}
          `}>
            {count}こ
          </span>
        </div>
      </div>
    </motion.div>
  )
})

export default PlayerInfo
