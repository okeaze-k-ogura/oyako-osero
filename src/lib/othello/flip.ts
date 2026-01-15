import type { BoardState, CellState, FlippingStone, Position } from './types'
import { BOARD_SIZE, DIRECTIONS } from './types'
import { cloneBoard, getOpponentColor } from './board'

function isInBounds(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
}

function getStonesToFlipInDirection(
  board: BoardState,
  row: number,
  col: number,
  player: CellState,
  dr: number,
  dc: number
): Position[] {
  if (!player) return []

  const opponent = getOpponentColor(player)
  const stones: Position[] = []
  let r = row + dr
  let c = col + dc

  while (isInBounds(r, c)) {
    const cell = board[r][c]

    if (cell === opponent) {
      stones.push({ row: r, col: c })
    } else if (cell === player) {
      return stones
    } else {
      return []
    }

    r += dr
    c += dc
  }

  return []
}

export function getFlippingStones(
  board: BoardState,
  row: number,
  col: number,
  player: CellState
): FlippingStone[] {
  if (!player) return []

  const allStones: Position[] = []

  for (const { dr, dc } of DIRECTIONS) {
    const stones = getStonesToFlipInDirection(board, row, col, player, dr, dc)
    allStones.push(...stones)
  }

  // Sort by distance from placed stone and assign delay
  const origin = { row, col }
  const sortedStones = allStones.sort((a, b) => {
    const distA = Math.abs(a.row - origin.row) + Math.abs(a.col - origin.col)
    const distB = Math.abs(b.row - origin.row) + Math.abs(b.col - origin.col)
    return distA - distB
  })

  // Calculate unique distances for delay assignment
  const flippingStones: FlippingStone[] = []
  let currentDelay = 0
  let lastDist = -1

  for (const pos of sortedStones) {
    const dist = Math.abs(pos.row - origin.row) + Math.abs(pos.col - origin.col)
    if (dist !== lastDist) {
      currentDelay = dist - 1
      lastDist = dist
    }

    flippingStones.push({
      position: pos,
      fromColor: getOpponentColor(player),
      toColor: player,
      delay: currentDelay,
    })
  }

  return flippingStones
}

export function applyMove(
  board: BoardState,
  row: number,
  col: number,
  player: CellState
): BoardState {
  if (!player) return board

  const newBoard = cloneBoard(board)
  newBoard[row][col] = player

  const flippingStones = getFlippingStones(board, row, col, player)
  for (const stone of flippingStones) {
    newBoard[stone.position.row][stone.position.col] = player
  }

  return newBoard
}
