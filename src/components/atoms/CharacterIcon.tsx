import { memo } from 'react'
import { motion } from 'framer-motion'

interface CharacterIconProps {
  icon: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isSelected?: boolean
  onClick?: () => void
}

const CharacterIcon = memo(function CharacterIcon({
  icon,
  name,
  size = 'md',
  isSelected = false,
  onClick,
}: CharacterIconProps) {
  const sizeClasses = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-6xl',
    xl: 'text-7xl',
  }

  const containerSizes = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    xl: 'w-28 h-28',
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${containerSizes[size]}
        flex flex-col items-center justify-center
        rounded-kids p-2
        transition-all
        ${isSelected
          ? 'bg-kids-primary-200 ring-4 ring-kids-primary-400'
          : 'bg-white hover:bg-gray-50'
        }
        shadow-kids
      `}
    >
      <span className={sizeClasses[size]} role="img" aria-label={name}>
        {icon}
      </span>
      <span className="text-kids-sm font-medium text-gray-700 mt-1">
        {name}
      </span>
    </motion.button>
  )
})

export default CharacterIcon
