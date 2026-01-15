import { memo } from 'react'
import { motion } from 'framer-motion'
import { PRONOUNS, type PronounType } from '@/lib/characters'

interface PronounSelectorProps {
  selectedPronoun: PronounType | null
  onSelect: (pronoun: PronounType) => void
}

const PronounSelector = memo(function PronounSelector({
  selectedPronoun,
  onSelect,
}: PronounSelectorProps) {
  const pronounList = Object.values(PRONOUNS)

  return (
    <motion.div
      className="flex gap-6 justify-center"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {pronounList.map((pronoun) => {
        const isSelected = selectedPronoun === pronoun.id

        return (
          <motion.button
            key={pronoun.id}
            onClick={() => onSelect(pronoun.id as PronounType)}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative flex flex-col items-center justify-center
              w-36 h-44 p-4
              rounded-fantasy
              transition-all duration-300
              overflow-hidden
              ${isSelected
                ? `bg-gradient-to-br ${pronoun.color} shadow-fantasy-lg ring-4 ring-light-magic-glow`
                : 'bg-fantasy-cream/90 shadow-fantasy hover:shadow-fantasy-lg border-2 border-forest-glow/30'
              }
            `}
          >
            {/* 選択時のキラキラエフェクト */}
            {isSelected && (
              <>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-light-magic-glow"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: `${10 + (i % 2) * 75}%`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </>
            )}

            {/* アイコン */}
            <motion.span
              className="text-6xl mb-3 relative z-10"
              animate={isSelected ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {pronoun.icon}
            </motion.span>

            {/* ラベル */}
            <span
              className={`
                text-kids-xl font-bold relative z-10
                ${isSelected ? 'text-white drop-shadow-md' : 'text-forest-deep'}
              `}
            >
              {pronoun.label}
            </span>

            {/* 説明（選択時のみ） */}
            {isSelected && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-white/80 mt-1 relative z-10"
              >
                {pronoun.description}
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
})

export default PronounSelector
