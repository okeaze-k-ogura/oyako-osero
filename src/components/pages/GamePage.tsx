import { memo } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { CHARACTERS, PRONOUNS } from '@/lib/characters'
import Board from '@/components/organisms/Board'
import HintOverlay from '@/components/organisms/HintOverlay'
import PlayerInfo from '@/components/molecules/PlayerInfo'
import GameControls from '@/components/organisms/GameControls'
import { FantasyBackground } from '@/components/atoms/FantasyBackground'

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
    <>
      <FantasyBackground variant="default" showLeaves={false} />

      <div className="h-[100dvh] flex flex-col overflow-hidden relative">
        {/* 対戦相手エリア（上 - 180度回転） */}
        <div className="flex-shrink-0 px-3 py-2 pb-3 rotate-180 bg-gradient-to-b from-forest-mist/80 to-transparent">
          {/* ターン表示 */}
          <motion.div
            className={`text-center mb-1 ${!isChildTurn ? 'visible' : 'invisible'}`}
            animate={!isChildTurn ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="inline-flex items-center gap-2 bg-shadow-magic-aura/80 px-4 py-1 rounded-full text-base font-bold text-shadow-magic-core shadow-glow-purple">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              {opponent.name}の ばん
            </span>
          </motion.div>

          {/* プレイヤー情報 */}
          <div className="flex items-center justify-center">
            <PlayerInfo
              icon={opponent.icon}
              name={opponent.name}
              stoneColor={opponentColor}
              count={opponentCount}
              isCurrentTurn={!isChildTurn}
            />
          </div>
        </div>

        {/* ボードエリア（中央） */}
        <div className="flex-1 flex items-center justify-center p-4 min-h-0 overflow-hidden">
          <div className="aspect-square max-w-full max-h-full w-auto h-full">
            <Board />
          </div>
        </div>

        {/* 子どもエリア（下） */}
        <div className="flex-shrink-0 px-3 py-2 pb-4 bg-gradient-to-t from-forest-mist/80 to-transparent">
          {/* ターン表示 */}
          <motion.div
            className={`text-center mb-2 ${isChildTurn ? 'visible' : 'invisible'}`}
            animate={isChildTurn ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="inline-flex items-center gap-2 bg-light-magic-aura/80 px-5 py-1.5 rounded-full text-kids-base font-bold text-forest-deep shadow-glow-gold">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              {child.turnMessage}
            </span>
          </motion.div>

          {/* プレイヤー情報とコントロール */}
          <div className="flex items-center justify-center gap-4">
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

        {/* ヒントオーバーレイ */}
        <HintOverlay />
      </div>
    </>
  )
})

export default GamePage
