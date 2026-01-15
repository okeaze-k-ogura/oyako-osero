import { memo } from 'react'
import { motion } from 'framer-motion'

interface HintButtonProps {
  onClick: () => void
  disabled?: boolean
}

const HintButton = memo(function HintButton({
  onClick,
  disabled = false,
}: HintButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={`
        flex items-center gap-2
        min-w-touch min-h-touch
        px-5 py-3
        bg-kids-secondary-400 text-white
        rounded-kids shadow-kids
        font-bold text-kids-base
        transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-kids-secondary-300
      `}
    >
      <motion.span
        animate={disabled ? {} : { scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-2xl"
      >
        💡
      </motion.span>
      <span>ヒント</span>
    </motion.button>
  )
})

export default HintButton
