import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import CharacterSelector from '@/components/organisms/CharacterSelector'
import Button from '@/components/atoms/Button'
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-kids-bg-soft">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-kids-2xl font-bold text-center text-gray-800 mb-8">
          あいては だれ？
        </h1>

        <div className="mb-8">
          <CharacterSelector
            selectedCharacter={selected}
            onSelect={setSelected}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!selected}
            size="lg"
          >
            つぎへ →
          </Button>
        </div>
      </motion.div>
    </div>
  )
})

export default CharacterSelectPage
