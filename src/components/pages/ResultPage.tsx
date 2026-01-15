import { memo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS, PRONOUNS } from '@/lib/characters'
import { FantasyBackground } from '@/components/atoms/FantasyBackground'
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
      return {
        emoji: '🏆',
        text: 'やったね！',
        subText: 'きみの かち！',
        bgVariant: 'celebration' as const,
      }
    }
    if (winner === 'opponent') {
      return {
        emoji: '💪',
        text: 'つぎは がんばろう！',
        subText: `${opponent.name}の かち`,
        bgVariant: 'default' as const,
      }
    }
    return {
      emoji: '🤝',
      text: 'ひきわけ！',
      subText: 'いいしょうぶだったね！',
      bgVariant: 'default' as const,
    }
  }

  const result = getResultMessage()
  const isWin = winner === 'child'

  // 魔法石のスタイル
  const lightStoneStyle = {
    background: 'radial-gradient(circle at 30% 30%, #FFFCF2 0%, #FFE66D 100%)',
    boxShadow: '0 2px 8px rgba(255, 230, 109, 0.5)',
  }
  const darkStoneStyle = {
    background: 'radial-gradient(circle at 30% 30%, #5C6BC0 0%, #2C3E50 100%)',
    boxShadow: '0 2px 8px rgba(92, 107, 192, 0.5)',
  }

  return (
    <>
      <FantasyBackground variant={result.bgVariant} />

      {isWin && <Confetti />}

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-full max-w-md text-center"
        >
          {/* 結果アイコン */}
          <motion.div
            animate={isWin
              ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
              : { scale: [1, 1.1, 1] }
            }
            transition={{
              duration: isWin ? 0.8 : 2,
              repeat: isWin ? 3 : Infinity,
              ease: 'easeInOut',
            }}
            className="text-8xl mb-4"
          >
            {result.emoji}
          </motion.div>

          {/* 結果メッセージ */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-kids-2xl font-bold text-forest-deep mb-2"
          >
            {result.text}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-kids-lg text-forest-moss mb-8"
          >
            {result.subText}
          </motion.p>

          {/* スコア表示 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="card-fantasy mb-8"
          >
            <div className="flex justify-center items-center gap-6">
              {/* 子どものスコア */}
              <motion.div
                className={`text-center p-4 rounded-xl ${
                  winner === 'child' ? 'bg-light-magic-aura/50 ring-2 ring-light-magic-glow' : ''
                }`}
                animate={winner === 'child' ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="text-5xl mb-2"
                  animate={winner === 'child' ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {child.icon}
                </motion.div>
                <div className="text-kids-base text-forest-moss mb-1">{child.label}</div>
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={childColor === 'white' ? lightStoneStyle : darkStoneStyle}
                  />
                  <span className="text-kids-xl font-bold text-forest-deep">
                    {childCount}こ
                  </span>
                </div>
              </motion.div>

              {/* VS */}
              <div className="text-kids-lg font-bold text-forest-glow px-2">
                VS
              </div>

              {/* 相手のスコア */}
              <motion.div
                className={`text-center p-4 rounded-xl ${
                  winner === 'opponent' ? 'bg-shadow-magic-aura/30 ring-2 ring-shadow-magic-glow' : ''
                }`}
                animate={winner === 'opponent' ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="text-5xl mb-2"
                  animate={winner === 'opponent' ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {opponent.icon}
                </motion.div>
                <div className="text-kids-base text-forest-moss mb-1">{opponent.name}</div>
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={childColor === 'black' ? lightStoneStyle : darkStoneStyle}
                  />
                  <span className="text-kids-xl font-bold text-forest-deep">
                    {opponentCount}こ
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* アクションボタン */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3"
          >
            <motion.button
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-fantasy text-kids-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  🔄
                </motion.span>
                もういっかい！
              </span>
            </motion.button>

            <motion.button
              onClick={goToCharacterSelect}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-fantasy-secondary"
            >
              あいてを かえる
            </motion.button>
          </motion.div>

          {/* 下部装飾 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center items-center gap-3 mt-8 text-2xl"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              🌟
            </motion.span>
            <span className="text-sky-star">～～～～～～</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              🌟
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
})

export default ResultPage
