import { memo } from 'react'
import { motion } from 'framer-motion'
import type { Character } from '@/lib/characters'

interface CharacterCardProps {
  character: Character
  isSelected: boolean
  onClick: () => void
}

const CharacterCard = memo(function CharacterCard({
  character,
  isSelected,
  onClick,
}: CharacterCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative flex flex-col items-center justify-center
        w-28 h-32 p-3
        rounded-fantasy
        transition-all duration-300
        overflow-hidden
        ${isSelected
          ? `bg-gradient-to-br ${character.bgGradient} shadow-fantasy-lg ring-4 ring-light-magic-glow`
          : 'bg-fantasy-cream/90 shadow-fantasy hover:shadow-fantasy-lg border-2 border-forest-glow/30'
        }
      `}
      style={{
        boxShadow: isSelected ? `0 0 30px 10px ${character.glowColor}` : undefined,
      }}
    >
      {/* 選択時のキラキラエフェクト */}
      {isSelected && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-2 right-2 w-3 h-3 rounded-full bg-light-magic-glow"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-4 left-3 w-2 h-2 rounded-full bg-light-magic-glow"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}

      {/* アイコン */}
      <motion.span
        className="text-5xl mb-2 relative z-10"
        animate={isSelected ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {character.icon}
      </motion.span>

      {/* 名前 */}
      <span
        className={`
          text-kids-sm font-bold whitespace-nowrap relative z-10
          ${isSelected ? 'text-white drop-shadow-md' : 'text-forest-deep'}
        `}
      >
        {character.name}
      </span>

      {/* 動物名（選択時のみ） */}
      {isSelected && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-white/80 mt-0.5 relative z-10"
        >
          {character.animal}
        </motion.span>
      )}
    </motion.button>
  )
})

export default CharacterCard
