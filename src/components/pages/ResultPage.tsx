import { memo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS, PRONOUNS } from '@/lib/characters'
import Button from '@/components/atoms/Button'
import Confetti from '@/components/organisms/Confetti'

const ResultPage = memo(function ResultPage() {
  const winner = useGameStore((state) => state.winner)
  const opponentCharacter = useGameStore((state) => state.opponentCharacter)
  const childPronoun = useGameStore((state) => state.childPronoun)
  const blackCount = useGameStore((state) => state.blackCount)
  const whiteCount = useGameStore((state) => state.whiteCount)
  const childColor = useGameStore((state) => state.childColor)
  const resetGame = useGameStore((state) => state.resetGame)
  const goToCharacterSelect = useGameStore((state) => state.goToCharacterSelect)

  if (!opponentCharacter || !childPronoun) return null

  const opponent = CHARACTERS[opponentCharacter]
  const child = PRONOUNS[childPronoun]
  const childCount = childColor === 'black' ? blackCount : whiteCount
  const opponentCount = childColor === 'black' ? whiteCount : blackCount

  const getResultMessage = () => {
    if (winner === 'child') {
      return { emoji: '🎉', text: 'やったね！', subText: 'かったよ！' }
    }
    if (winner === 'opponent') {
      return { emoji: '😢', text: 'ざんねん...', subText: 'またやろうね！' }
    }
    return { emoji: '🤝', text: 'ひきわけ！', subText: 'いいしょうぶだったね！' }
  }

  const result = getResultMessage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-kids-bg-soft">
      {winner === 'child' && <Confetti />}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="text-8xl mb-4"
        >
          {result.emoji}
        </motion.div>

        <h1 className="text-kids-2xl font-bold text-gray-800 mb-2">
          {result.text}
        </h1>
        <p className="text-kids-lg text-gray-600 mb-8">
          {result.subText}
        </p>

        {/* Score display */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-1">{child.icon}</div>
            <div className="text-kids-base text-gray-600">{child.label}</div>
            <div className="text-kids-xl font-bold text-gray-800">
              {childCount}こ
            </div>
          </div>
          <div className="text-kids-xl font-bold text-gray-400 self-center">
            VS
          </div>
          <div className="text-center">
            <div className="text-4xl mb-1">{opponent.icon}</div>
            <div className="text-kids-base text-gray-600">{opponent.name}</div>
            <div className="text-kids-xl font-bold text-gray-800">
              {opponentCount}こ
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button onClick={resetGame} size="lg">
            もういっかい！ 🔄
          </Button>
          <Button
            onClick={goToCharacterSelect}
            variant="secondary"
            size="lg"
          >
            あいてを かえる
          </Button>
        </div>
      </motion.div>
    </div>
  )
})

export default ResultPage
