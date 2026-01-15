import { memo } from 'react'
import type { CellState } from '@/lib/othello/types'

interface PlayerInfoProps {
  icon: string
  name: string
  stoneColor: CellState
  count: number
  isCurrentTurn: boolean
  isFlipped?: boolean
}

const PlayerInfo = memo(function PlayerInfo({
  icon,
  name,
  stoneColor,
  count,
  isCurrentTurn,
  isFlipped = false,
}: PlayerInfoProps) {
  const stoneClasses = stoneColor === 'black'
    ? 'bg-gray-800'
    : 'bg-white border-2 border-gray-300'

  return (
    <div
      className={`
        flex items-center gap-3 p-3 rounded-kids
        ${isCurrentTurn ? 'bg-kids-primary-100' : 'bg-white/50'}
        ${isFlipped ? 'rotate-180' : ''}
      `}
    >
      <span className="text-4xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-kids-base font-bold text-gray-800">{name}</span>
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full ${stoneClasses}`} />
          <span className="text-kids-lg font-bold text-gray-700">{count}こ</span>
        </div>
      </div>
    </div>
  )
})

export default PlayerInfo
