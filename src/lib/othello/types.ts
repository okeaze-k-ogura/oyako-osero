export type CellState = 'black' | 'white' | null

export type BoardState = CellState[][]

export interface Position {
  row: number
  col: number
}

export interface Direction {
  dr: number
  dc: number
}

export interface FlippingStone {
  position: Position
  fromColor: CellState
  toColor: CellState
  delay: number
}

export type PlayerColor = 'black' | 'white'

export const BOARD_SIZE = 8

export const DIRECTIONS: Direction[] = [
  { dr: -1, dc: -1 }, // upper-left
  { dr: -1, dc: 0 },  // up
  { dr: -1, dc: 1 },  // upper-right
  { dr: 0, dc: -1 },  // left
  { dr: 0, dc: 1 },   // right
  { dr: 1, dc: -1 },  // lower-left
  { dr: 1, dc: 0 },   // down
  { dr: 1, dc: 1 },   // lower-right
]

export const CORNERS: Position[] = [
  { row: 0, col: 0 },
  { row: 0, col: 7 },
  { row: 7, col: 0 },
  { row: 7, col: 7 },
]

// Dangerous squares adjacent to corners (C-squares and X-squares)
export const DANGER_SQUARES: Position[] = [
  // Top-left corner adjacent
  { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 },
  // Top-right corner adjacent
  { row: 0, col: 6 }, { row: 1, col: 7 }, { row: 1, col: 6 },
  // Bottom-left corner adjacent
  { row: 6, col: 0 }, { row: 7, col: 1 }, { row: 6, col: 1 },
  // Bottom-right corner adjacent
  { row: 6, col: 7 }, { row: 7, col: 6 }, { row: 6, col: 6 },
]
