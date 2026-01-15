import { memo } from 'react'
import { motion } from 'framer-motion'

interface CellProps {
  children?: React.ReactNode
  onClick?: () => void
  isClickable?: boolean
}

const Cell = memo(function Cell({
  children,
  onClick,
  isClickable = false,
}: CellProps) {
  return (
    <motion.button
      onClick={isClickable ? onClick : undefined}
      whileTap={isClickable ? { scale: 0.95 } : undefined}
      className={`
        relative
        bg-board-green
        border border-board-green-dark
        ${isClickable ? 'cursor-pointer active:bg-board-green-light' : 'cursor-default'}
      `}
      style={{
        aspectRatio: '1 / 1',
      }}
      disabled={!isClickable}
    >
      {children}
    </motion.button>
  )
})

export default Cell
