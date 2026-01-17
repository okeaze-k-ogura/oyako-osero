import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BoardState, CellState, FlippingStone, Position } from '@/lib/othello/types'
import type { CharacterType, PronounType } from '@/lib/characters'
import { createInitialBoard, countStones, getOpponentColor } from '@/lib/othello/board'
import { getValidMoves, mustPass, isGameOver, getWinner } from '@/lib/othello/moves'
import { applyMove, getFlippingStones } from '@/lib/othello/flip'
import { getBestMove } from '@/lib/othello/hint'

export type GamePhase = 'character-select' | 'pronoun-select' | 'playing' | 'finished'
export type HintMode = 'idle' | 'asking' | 'showing'

interface GameState {
  // Game phase
  phase: GamePhase

  // Board state
  board: BoardState
  currentPlayer: CellState

  // Player settings
  childColor: CellState
  opponentColor: CellState
  opponentCharacter: CharacterType | null
  childPronoun: PronounType | null

  // Game result
  winner: 'child' | 'opponent' | 'draw' | null

  // Stone counts
  blackCount: number
  whiteCount: number

  // Hint
  hintMode: HintMode
  hintPosition: Position | null

  // Animation
  flippingStones: FlippingStone[]
  lastPlacedPosition: Position | null
  isAnimating: boolean
  pendingTurnSwitch: {
    nextPlayer: CellState
    validMoves: Position[]
    winner: 'child' | 'opponent' | 'draw' | null
    phase: GamePhase
  } | null

  // Valid moves for current player
  validMoves: Position[]

  // Game statistics (persisted)
  gameCompletedCount: number

  // Actions
  setOpponentCharacter: (character: CharacterType) => void
  setChildPronoun: (pronoun: PronounType) => void
  startGame: () => void
  placeStone: (row: number, col: number) => void
  clearFlippingStones: () => void
  completeTurnSwitch: () => void
  showHintPrompt: () => void
  confirmHint: () => void
  hideHint: () => void
  resetGame: () => void
  goToCharacterSelect: () => void
  incrementGameCompletedCount: () => void
}

// ヒント自動非表示タイマーのID
let hintTimeoutId: ReturnType<typeof setTimeout> | null = null

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      phase: 'character-select',
      board: createInitialBoard(),
      currentPlayer: 'black',
      childColor: 'black',
      opponentColor: 'white',
      opponentCharacter: null,
      childPronoun: null,
      winner: null,
      blackCount: 2,
      whiteCount: 2,
      hintMode: 'idle',
      hintPosition: null,
      flippingStones: [],
      lastPlacedPosition: null,
      isAnimating: false,
      pendingTurnSwitch: null,
      validMoves: [],
      gameCompletedCount: 0,

      setOpponentCharacter: (character) => {
        set({ opponentCharacter: character, phase: 'pronoun-select' })
      },

      setChildPronoun: (pronoun) => {
        set({ childPronoun: pronoun })
      },

      startGame: () => {
        const board = createInitialBoard()
        const validMoves = getValidMoves(board, 'black')

        set({
          phase: 'playing',
          board,
          currentPlayer: 'black',
          childColor: 'black',
          opponentColor: 'white',
          winner: null,
          blackCount: 2,
          whiteCount: 2,
          hintMode: 'idle',
          hintPosition: null,
          flippingStones: [],
          lastPlacedPosition: null,
          isAnimating: false,
          pendingTurnSwitch: null,
          validMoves,
        })
      },

      placeStone: (row, col) => {
        const { board, currentPlayer, childColor, isAnimating } = get()

        if (!currentPlayer) return
        // アニメーション中は操作を無効化
        if (isAnimating) return

        // Get flipping stones for animation
        const flippingStones = getFlippingStones(board, row, col, currentPlayer)

        // Apply move
        const newBoard = applyMove(board, row, col, currentPlayer)
        const counts = countStones(newBoard)

        // Determine next player
        const opponent = getOpponentColor(currentPlayer)
        let nextPlayer: CellState = opponent

        // Check for pass
        if (mustPass(newBoard, opponent)) {
          if (mustPass(newBoard, currentPlayer)) {
            // Both players must pass - game over
            nextPlayer = null
          } else {
            // Opponent must pass, current player continues
            nextPlayer = currentPlayer
          }
        }

        // Check game over
        const gameOver = isGameOver(newBoard)
        let winner: 'child' | 'opponent' | 'draw' | null = null
        let phase: GamePhase = 'playing'

        if (gameOver) {
          const colorWinner = getWinner(newBoard)
          if (colorWinner === 'draw') {
            winner = 'draw'
          } else if (colorWinner === childColor) {
            winner = 'child'
          } else {
            winner = 'opponent'
          }
          phase = 'finished'
        }

        // Get valid moves for next player (保留)
        const nextValidMoves = nextPlayer ? getValidMoves(newBoard, nextPlayer) : []

        set({
          board: newBoard,
          // currentPlayer は変更しない（アニメーション完了後に切り替え）
          blackCount: counts.black,
          whiteCount: counts.white,
          flippingStones,
          lastPlacedPosition: { row, col },
          // validMoves を空にして光るドットを一時的に非表示
          validMoves: [],
          isAnimating: true,
          // ターン切り替えを保留
          pendingTurnSwitch: {
            nextPlayer,
            validMoves: nextValidMoves,
            winner,
            phase,
          },
        })
      },

      clearFlippingStones: () => {
        set({ flippingStones: [], lastPlacedPosition: null })
      },

      completeTurnSwitch: () => {
        const { pendingTurnSwitch } = get()
        if (!pendingTurnSwitch) return

        set({
          currentPlayer: pendingTurnSwitch.nextPlayer,
          validMoves: pendingTurnSwitch.validMoves,
          winner: pendingTurnSwitch.winner,
          phase: pendingTurnSwitch.phase,
          isAnimating: false,
          pendingTurnSwitch: null,
          flippingStones: [],
          lastPlacedPosition: null,
        })
      },

      showHintPrompt: () => {
        set({ hintMode: 'asking' })
      },

      confirmHint: () => {
        // 既存のタイマーをクリア
        if (hintTimeoutId) {
          clearTimeout(hintTimeoutId)
          hintTimeoutId = null
        }

        const { board, childColor } = get()
        const bestMove = getBestMove(board, childColor)

        set({
          hintMode: 'showing',
          hintPosition: bestMove,
        })

        // Auto-hide after 3 seconds
        hintTimeoutId = setTimeout(() => {
          const currentState = get()
          if (currentState.hintMode === 'showing') {
            set({ hintMode: 'idle', hintPosition: null })
          }
          hintTimeoutId = null
        }, 3000)
      },

      hideHint: () => {
        if (hintTimeoutId) {
          clearTimeout(hintTimeoutId)
          hintTimeoutId = null
        }
        set({ hintMode: 'idle', hintPosition: null })
      },

      resetGame: () => {
        const { opponentCharacter, childPronoun } = get()
        const board = createInitialBoard()
        const validMoves = getValidMoves(board, 'black')

        set({
          phase: 'playing',
          board,
          currentPlayer: 'black',
          winner: null,
          blackCount: 2,
          whiteCount: 2,
          hintMode: 'idle',
          hintPosition: null,
          flippingStones: [],
          lastPlacedPosition: null,
          isAnimating: false,
          pendingTurnSwitch: null,
          validMoves,
          opponentCharacter,
          childPronoun,
        })
      },

      goToCharacterSelect: () => {
        set({
          phase: 'character-select',
          opponentCharacter: null,
          childPronoun: null,
          board: createInitialBoard(),
          currentPlayer: 'black',
          winner: null,
          blackCount: 2,
          whiteCount: 2,
          hintMode: 'idle',
          hintPosition: null,
          flippingStones: [],
          lastPlacedPosition: null,
          isAnimating: false,
          pendingTurnSwitch: null,
          validMoves: [],
        })
      },

      incrementGameCompletedCount: () => {
        set((state) => ({ gameCompletedCount: state.gameCompletedCount + 1 }))
      },
    }),
    {
      name: 'oyako-osero-game',
      partialize: (state) => ({ gameCompletedCount: state.gameCompletedCount }),
    }
  )
)
