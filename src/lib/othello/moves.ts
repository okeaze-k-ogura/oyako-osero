import type { BoardState, CellState, Position } from './types'
import { BOARD_SIZE, DIRECTIONS } from './types'
import { getOpponentColor } from './board'

function isInBounds(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
}

function canFlipInDirection(
  board: BoardState,
  row: number,
  col: number,
  player: CellState,
  dr: number,
  dc: number
): boolean {
  if (!player) return false

  const opponent = getOpponentColor(player)
  let r = row + dr
  let c = col + dc
  let foundOpponent = false

  while (isInBounds(r, c)) {
    const cell = board[r][c]

    if (cell === opponent) {
      foundOpponent = true
    } else if (cell === player) {
      return foundOpponent
    } else {
      // empty cell
      return false
    }

    r += dr
    c += dc
  }

  return false
}

export function isValidMove(
  board: BoardState,
  row: number,
  col: number,
  player: CellState
): boolean {
  if (!player) return false
  if (!isInBounds(row, col)) return false
  if (board[row][col] !== null) return false

  for (const { dr, dc } of DIRECTIONS) {
    if (canFlipInDirection(board, row, col, player, dr, dc)) {
      return true
    }
  }

  return false
}

export function getValidMoves(board: BoardState, player: CellState): Position[] {
  const moves: Position[] = []

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, player)) {
        moves.push({ row, col })
      }
    }
  }

  return moves
}

export function mustPass(board: BoardState, player: CellState): boolean {
  return getValidMoves(board, player).length === 0
}

export function isGameOver(board: BoardState): boolean {
  const blackCanMove = !mustPass(board, 'black')
  const whiteCanMove = !mustPass(board, 'white')

  return !blackCanMove && !whiteCanMove
}

export function getWinner(board: BoardState): 'black' | 'white' | 'draw' {
  let black = 0
  let white = 0

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = board[row][col]
      if (cell === 'black') black++
      else if (cell === 'white') white++
    }
  }

  if (black > white) return 'black'
  if (white > black) return 'white'
  return 'draw'
}
