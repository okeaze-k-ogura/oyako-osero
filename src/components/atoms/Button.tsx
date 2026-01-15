import { memo } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const Button = memo(function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = `
    font-bold rounded-kids shadow-kids
    transition-colors
    focus:outline-none focus:ring-4 focus:ring-kids-secondary-300 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variantClasses = {
    primary: 'bg-kids-primary-400 text-gray-800 hover:bg-kids-primary-300 active:bg-kids-primary-500',
    secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-kids-secondary-300',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  }

  const sizeClasses = {
    sm: 'min-w-[44px] min-h-[44px] px-4 py-2 text-kids-sm',
    md: 'min-w-touch min-h-touch px-6 py-3 text-kids-base',
    lg: 'min-w-touch-lg min-h-touch px-8 py-4 text-kids-lg',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
})

export default Button
