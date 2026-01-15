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
      whileTap={isClickable ? { scale: 0.92 } : undefined}
      className={`
        relative
        bg-board-moss
        border border-board-moss-dark/50
        rounded-sm
        overflow-hidden
        ${isClickable ? 'cursor-pointer' : 'cursor-default'}
      `}
      style={{
        aspectRatio: '1 / 1',
        background: 'radial-gradient(circle at 50% 50%, #40916C 0%, #2D6A4F 70%, #1B4332 100%)',
      }}
      disabled={!isClickable}
    >
      {/* 苔のテクスチャ模様 */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(149, 213, 178, 0.5) 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(149, 213, 178, 0.4) 0%, transparent 20%),
            radial-gradient(circle at 50% 50%, rgba(64, 145, 108, 0.3) 0%, transparent 30%)
          `,
        }}
      />

      {/* クリック可能な場所のハイライト */}
      {isClickable && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, rgba(253, 224, 71, 0.3) 0%, transparent 70%)',
          }}
        />
      )}

      {children}
    </motion.button>
  )
})

export default Cell
