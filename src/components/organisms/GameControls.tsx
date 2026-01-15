import { memo } from 'react'
import { useGameStore } from '@/stores/gameStore'
import HintButton from '@/components/molecules/HintButton'
import Button from '@/components/atoms/Button'

const GameControls = memo(function GameControls() {
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const childColor = useGameStore((state) => state.childColor)
  const showHintPrompt = useGameStore((state) => state.showHintPrompt)
  const goToCharacterSelect = useGameStore((state) => state.goToCharacterSelect)

  const isChildTurn = currentPlayer === childColor

  return (
    <div className="flex gap-4 justify-center">
      <HintButton onClick={showHintPrompt} disabled={!isChildTurn} />
      <Button
        variant="secondary"
        onClick={goToCharacterSelect}
      >
        やめる 🚪
      </Button>
    </div>
  )
})

export default GameControls
