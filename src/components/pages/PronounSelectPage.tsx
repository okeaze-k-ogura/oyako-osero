import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import PronounSelector from '@/components/organisms/PronounSelector'
import Button from '@/components/atoms/Button'
import type { PronounType } from '@/lib/characters'

const PronounSelectPage = memo(function PronounSelectPage() {
  const [selected, setSelected] = useState<PronounType | null>(null)
  const setChildPronoun = useGameStore((state) => state.setChildPronoun)
  const startGame = useGameStore((state) => state.startGame)

  const handleStart = () => {
    if (selected) {
      setChildPronoun(selected)
      startGame()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-kids-bg-soft">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-kids-2xl font-bold text-center text-gray-800 mb-8">
          きみは どっち？
        </h1>

        <div className="mb-8">
          <PronounSelector
            selectedPronoun={selected}
            onSelect={setSelected}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleStart}
            disabled={!selected}
            size="lg"
          >
            はじめる！ 🎮
          </Button>
        </div>
      </motion.div>
    </div>
  )
})

export default PronounSelectPage
