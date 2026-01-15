import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import PronounSelector from '@/components/organisms/PronounSelector'
import { FantasyBackground } from '@/components/atoms/FantasyBackground'
import { CHARACTERS } from '@/lib/characters'
import type { PronounType } from '@/lib/characters'

const PronounSelectPage = memo(function PronounSelectPage() {
  const [selected, setSelected] = useState<PronounType | null>(null)
  const setChildPronoun = useGameStore((state) => state.setChildPronoun)
  const startGame = useGameStore((state) => state.startGame)
  const opponentCharacter = useGameStore((state) => state.opponentCharacter)

  const character = opponentCharacter ? CHARACTERS[opponentCharacter] : null

  const handleStart = () => {
    if (selected) {
      setChildPronoun(selected)
      startGame()
    }
  }

  return (
    <>
      <FantasyBackground variant="default" />

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          {/* タイトル */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="text-4xl block mb-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <h1 className="text-kids-2xl font-bold text-forest-deep mb-2">
              きみは だれ？
            </h1>
            <p className="text-kids-base text-forest-moss">
              じぶんを えらんでね
            </p>
          </motion.div>

          {/* 代名詞選択 */}
          <motion.div
            className="card-fantasy mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PronounSelector
              selectedPronoun={selected}
              onSelect={setSelected}
            />
          </motion.div>

          {/* 選んだキャラクターの応援メッセージ */}
          {character && selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.span
                className="text-4xl"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {character.icon}
              </motion.span>
              <div className="bg-fantasy-cream/90 px-4 py-2 rounded-xl border-2 border-forest-glow/30 shadow-kids">
                <p className="text-kids-base text-forest-deep font-medium">
                  いっしょに あそぼう！
                </p>
              </div>
            </motion.div>
          )}

          {/* 開始ボタン */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handleStart}
              disabled={!selected}
              whileHover={selected ? { scale: 1.05 } : {}}
              whileTap={selected ? { scale: 0.95 } : {}}
              className={`
                btn-fantasy text-kids-xl
                ${!selected ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span className="flex items-center gap-3">
                <motion.span
                  animate={selected ? { rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  🎮
                </motion.span>
                ぼうけん スタート！
              </span>
            </motion.button>
          </motion.div>

          {/* 下部装飾 */}
          <motion.div
            className="flex justify-center items-center gap-4 mt-8 text-2xl opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.7 }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              🌟
            </motion.span>
            <span className="text-sky-star">～～～</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              ⭐
            </motion.span>
            <span className="text-sky-star">～～～</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              🌟
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
})

export default PronounSelectPage
