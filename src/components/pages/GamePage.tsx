import { memo } from 'react'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS, PRONOUNS } from '@/lib/characters'
import Board from '@/components/organisms/Board'
import HintOverlay from '@/components/organisms/HintOverlay'
import PlayerInfo from '@/components/molecules/PlayerInfo'
import GameControls from '@/components/organisms/GameControls'

const GamePage = memo(function GamePage() {
  const opponentCharacter = useGameStore((state) => state.opponentCharacter)
  const childPronoun = useGameStore((state) => state.childPronoun)
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const childColor = useGameStore((state) => state.childColor)
  const opponentColor = useGameStore((state) => state.opponentColor)
  const blackCount = useGameStore((state) => state.blackCount)
  const whiteCount = useGameStore((state) => state.whiteCount)

  if (!opponentCharacter || !childPronoun) return null

  const opponent = CHARACTERS[opponentCharacter]
  const child = PRONOUNS[childPronoun]
  const isChildTurn = currentPlayer === childColor

  const childCount = childColor === 'black' ? blackCount : whiteCount
  const opponentCount = opponentColor === 'black' ? blackCount : whiteCount

  return (
    <div className="h-[100dvh] flex flex-col bg-kids-bg-cream overflow-hidden">
      {/* Opponent area (top - rotated for face-to-face) */}
      <div className="flex-shrink-0 px-3 py-2 pb-4 rotate-180 bg-kids-bg-soft border-b-2 border-gray-200">
        {/* Turn indicator - 常にスペース確保 */}
        <div className={`text-center mb-1 ${!isChildTurn ? 'visible' : 'invisible'}`}>
          <span className="inline-block bg-kids-accent-200 px-4 py-0.5 rounded-full text-base font-bold">
            ⭐ {opponent.name}の ばん
          </span>
        </div>
        {/* Player info */}
        <div className="flex items-center justify-center gap-6">
          <PlayerInfo
            icon={opponent.icon}
            name={opponent.name}
            stoneColor={opponentColor}
            count={opponentCount}
            isCurrentTurn={!isChildTurn}
          />
        </div>
      </div>

      {/* Board area (center) - 残りスペースを使用 */}
      <div className="flex-1 flex items-center justify-center p-3 min-h-0 overflow-hidden bg-board-green">
        <div className="aspect-square max-w-full max-h-full w-auto h-full">
          <Board />
        </div>
      </div>

      {/* Child area (bottom) */}
      <div className="flex-shrink-0 px-3 py-2 pb-4 bg-kids-bg-soft border-t-2 border-gray-200">
        {/* Turn indicator - 常にスペース確保 */}
        <div className={`text-center mb-1 ${isChildTurn ? 'visible' : 'invisible'}`}>
          <span className="inline-block bg-kids-primary-300 px-4 py-0.5 rounded-full text-base font-bold">
            ⭐ {child.turnMessage}
          </span>
        </div>

        {/* Player info and controls */}
        <div className="flex items-center justify-center gap-6">
          <PlayerInfo
            icon={child.icon}
            name={child.label}
            stoneColor={childColor}
            count={childCount}
            isCurrentTurn={isChildTurn}
          />
          <GameControls />
        </div>
      </div>

      {/* Hint overlay */}
      <HintOverlay />
    </div>
  )
})

export default GamePage
