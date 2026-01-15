import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import CharacterSelector from '@/components/organisms/CharacterSelector'
import { FantasyBackground } from '@/components/atoms/FantasyBackground'
import type { CharacterType } from '@/lib/characters'

const CharacterSelectPage = memo(function CharacterSelectPage() {
  const [selected, setSelected] = useState<CharacterType | null>(null)
  const setOpponentCharacter = useGameStore((state) => state.setOpponentCharacter)

  const handleNext = () => {
    if (selected) {
      setOpponentCharacter(selected)
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
          className="w-full max-w-md"
        >
          {/* タイトル装飾 */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="text-3xl block mb-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🌟
            </motion.span>
            <h1 className="text-kids-2xl font-bold text-forest-deep mb-2">
              もりの なかまたち
            </h1>
            <p className="text-kids-lg text-forest-moss">
              あいては だれ？
            </p>
          </motion.div>

          {/* キャラクター選択 */}
          <motion.div
            className="card-fantasy mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CharacterSelector
              selectedCharacter={selected}
              onSelect={setSelected}
            />
          </motion.div>

          {/* 次へボタン */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handleNext}
              disabled={!selected}
              whileHover={selected ? { scale: 1.05 } : {}}
              whileTap={selected ? { scale: 0.95 } : {}}
              className={`
                btn-fantasy
                ${!selected ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span className="flex items-center gap-2">
                つぎへ すすむ
                <motion.span
                  animate={selected ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
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
            <span>🌿</span>
            <span className="text-forest-glow">～～～～</span>
            <span>🍄</span>
            <span className="text-forest-glow">～～～～</span>
            <span>🌸</span>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
})

export default CharacterSelectPage
