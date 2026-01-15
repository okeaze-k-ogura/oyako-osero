import type { BoardState, CellState } from './types'
import { BOARD_SIZE } from './types'

export function createInitialBoard(): BoardState {
  const board: BoardState = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null))

  // Initial 4 stones in the center
  const mid = BOARD_SIZE / 2
  board[mid - 1][mid - 1] = 'white'
  board[mid - 1][mid] = 'black'
  board[mid][mid - 1] = 'black'
  board[mid][mid] = 'white'

  return board
}

export function cloneBoard(board: BoardState): BoardState {
  return board.map((row) => [...row])
}

export function countStones(board: BoardState): { black: number; white: number } {
  let black = 0
  let white = 0

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = board[row][col]
      if (cell === 'black') black++
      else if (cell === 'white') white++
    }
  }

  return { black, white }
}

export function getOpponentColor(color: CellState): CellState {
  if (color === 'black') return 'white'
  if (color === 'white') return 'black'
  return null
}
