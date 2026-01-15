import { memo, useCallback, useEffect, useState } from 'react'
import { useGameStore } from '@/stores/gameStore'
import Cell from '@/components/atoms/Cell'
import Stone from '@/components/atoms/Stone'
import { BOARD_SIZE } from '@/lib/othello/types'

const Board = memo(function Board() {
  const board = useGameStore((state) => state.board)
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const validMoves = useGameStore((state) => state.validMoves)
  const flippingStones = useGameStore((state) => state.flippingStones)
  const lastPlacedPosition = useGameStore((state) => state.lastPlacedPosition)
  const hintPosition = useGameStore((state) => state.hintPosition)
  const hintMode = useGameStore((state) => state.hintMode)
  const placeStone = useGameStore((state) => state.placeStone)
  const completeTurnSwitch = useGameStore((state) => state.completeTurnSwitch)
  const isAnimating = useGameStore((state) => state.isAnimating)

  const [flippingSet, setFlippingSet] = useState<Set<string>>(new Set())
  const [newStoneKey, setNewStoneKey] = useState<string | null>(null)

  const posKey = (row: number, col: number) => `${row}-${col}`

  const isValidMove = useCallback(
    (row: number, col: number) => {
      return validMoves.some((m) => m.row === row && m.col === col)
    },
    [validMoves]
  )

  const isFlipping = useCallback(
    (row: number, col: number) => {
      return flippingSet.has(posKey(row, col))
    },
    [flippingSet]
  )

  const isHintCell = useCallback(
    (row: number, col: number) => {
      return hintMode === 'showing' && hintPosition?.row === row && hintPosition?.col === col
    },
    [hintMode, hintPosition]
  )

  // Handle flipping animation
  useEffect(() => {
    if (flippingStones.length === 0) {
      setFlippingSet(new Set())
      return
    }

    // Set new stone key
    if (lastPlacedPosition) {
      setNewStoneKey(posKey(lastPlacedPosition.row, lastPlacedPosition.col))
    }

    // Trigger flip animations with delays
    const timeouts: ReturnType<typeof setTimeout>[] = []

    flippingStones.forEach((stone) => {
      const timeout = setTimeout(() => {
        setFlippingSet((prev) => {
          const next = new Set(prev)
          next.add(posKey(stone.position.row, stone.position.col))
          return next
        })
      }, stone.delay * 100)
      timeouts.push(timeout)
    })

    // Clear flipping state after all animations complete, then switch turn
    const maxDelay = Math.max(...flippingStones.map((s) => s.delay))
    const switchTimeoutId = setTimeout(() => {
      setFlippingSet(new Set())
      setNewStoneKey(null)
      completeTurnSwitch()
    }, (maxDelay + 1) * 100 + 300)
    timeouts.push(switchTimeoutId)

    return () => {
      timeouts.forEach((t) => window.clearTimeout(t))
    }
  }, [flippingStones, lastPlacedPosition, completeTurnSwitch])

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      // アニメーション中は何もしない
      if (isAnimating) return
      if (isValidMove(row, col)) {
        placeStone(row, col)
      }
    },
    [isValidMove, placeStone, isAnimating]
  )

  return (
    <div className="w-full h-full bg-board-green-dark rounded-lg shadow-lg overflow-hidden">
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
        }}
      >
        {Array.from({ length: BOARD_SIZE }).map((_, row) =>
          Array.from({ length: BOARD_SIZE }).map((_, col) => {
            const cell = board[row][col]
            const canPlace = isValidMove(row, col)
            const isNewStone = newStoneKey === posKey(row, col)
            const isCurrentGlowing = cell === currentPlayer

            return (
              <Cell
                key={posKey(row, col)}
                isClickable={canPlace}
                onClick={() => handleCellClick(row, col)}
              >
                {cell ? (
                  <Stone
                    color={cell}
                    isGlowing={isCurrentGlowing}
                    isFlipping={isFlipping(row, col)}
                    isNew={isNewStone}
                  />
                ) : canPlace ? (
                  <Stone color={currentPlayer!} isPlaceable isHint={isHintCell(row, col)} />
                ) : null}
              </Cell>
            )
          })
        )}
      </div>
    </div>
  )
})

export default Board
