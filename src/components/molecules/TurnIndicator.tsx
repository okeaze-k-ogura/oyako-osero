import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS, PRONOUNS } from '@/lib/characters'

const TurnIndicator = memo(function TurnIndicator() {
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const childColor = useGameStore((state) => state.childColor)
  const childPronoun = useGameStore((state) => state.childPronoun)
  const opponentCharacter = useGameStore((state) => state.opponentCharacter)

  const isChildTurn = currentPlayer === childColor

  const getMessage = () => {
    if (isChildTurn && childPronoun) {
      return PRONOUNS[childPronoun].turnMessage
    }
    if (!isChildTurn && opponentCharacter) {
      return `${CHARACTERS[opponentCharacter].name}の ばん`
    }
    return ''
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isChildTurn ? 'child' : 'opponent'}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`
          text-center py-2 px-4 rounded-kids
          ${isChildTurn ? 'bg-kids-primary-200' : 'bg-gray-100'}
        `}
      >
        <span className="text-kids-lg font-bold text-gray-800">
          {isChildTurn && '⭐ '}
          {getMessage()}
        </span>
      </motion.div>
    </AnimatePresence>
  )
})

export default TurnIndicator
