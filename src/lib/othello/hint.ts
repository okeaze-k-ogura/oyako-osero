import type { BoardState, CellState, Position } from './types'
import { CORNERS, DANGER_SQUARES } from './types'
import { getValidMoves } from './moves'
import { getFlippingStones } from './flip'

interface MoveEvaluation {
  position: Position
  score: number
}

function isCorner(pos: Position): boolean {
  return CORNERS.some((c) => c.row === pos.row && c.col === pos.col)
}

function isDangerSquare(pos: Position): boolean {
  return DANGER_SQUARES.some((d) => d.row === pos.row && d.col === pos.col)
}

function isCornerTaken(board: BoardState, corner: Position): boolean {
  return board[corner.row][corner.col] !== null
}

function getAdjacentCorner(pos: Position): Position | null {
  // Check if position is a danger square and find its adjacent corner
  if (pos.row <= 1 && pos.col <= 1) return { row: 0, col: 0 }
  if (pos.row <= 1 && pos.col >= 6) return { row: 0, col: 7 }
  if (pos.row >= 6 && pos.col <= 1) return { row: 7, col: 0 }
  if (pos.row >= 6 && pos.col >= 6) return { row: 7, col: 7 }
  return null
}

function evaluateMove(
  board: BoardState,
  move: Position,
  player: CellState
): MoveEvaluation {
  if (!player) return { position: move, score: 0 }

  let score = 0

  // Priority 1: Corner is the best (+100)
  if (isCorner(move)) {
    score += 100
    return { position: move, score }
  }

  // Priority 2: Avoid danger squares if corner is not taken (-50)
  if (isDangerSquare(move)) {
    const adjacentCorner = getAdjacentCorner(move)
    if (adjacentCorner && !isCornerTaken(board, adjacentCorner)) {
      score -= 50
    }
  }

  // Priority 3: Count flipping stones
  const flippingStones = getFlippingStones(board, move.row, move.col, player)
  score += flippingStones.length

  return { position: move, score }
}

export function getBestMove(board: BoardState, player: CellState): Position | null {
  const validMoves = getValidMoves(board, player)

  if (validMoves.length === 0) return null

  const evaluations = validMoves.map((move) => evaluateMove(board, move, player))

  // Sort by score descending
  evaluations.sort((a, b) => b.score - a.score)

  return evaluations[0].position
}
