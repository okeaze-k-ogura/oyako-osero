import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS } from '@/lib/characters'
import Button from '@/components/atoms/Button'

const HintOverlay = memo(function HintOverlay() {
  const hintMode = useGameStore((state) => state.hintMode)
  const opponentCharacter = useGameStore((state) => state.opponentCharacter)
  const confirmHint = useGameStore((state) => state.confirmHint)
  const hideHint = useGameStore((state) => state.hideHint)

  if (!opponentCharacter) return null

  const character = CHARACTERS[opponentCharacter]

  return (
    <AnimatePresence>
      {hintMode === 'asking' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={hideHint}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white rounded-kids-lg p-8 text-center shadow-2xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {character.icon}
            </motion.div>
            <h2 className="text-kids-xl font-bold text-gray-800 mb-2">
              {character.name}、
            </h2>
            <p className="text-kids-lg text-gray-700 mb-6">
              めを つぶって！
            </p>
            <Button onClick={confirmHint} size="lg">
              つぶった！ 👁️
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default HintOverlay
