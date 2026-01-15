import { memo } from 'react'
import { motion } from 'framer-motion'

interface CharacterCardProps {
  icon: string
  name: string
  isSelected: boolean
  onClick: () => void
}

const CharacterCard = memo(function CharacterCard({
  icon,
  name,
  isSelected,
  onClick,
}: CharacterCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex flex-col items-center justify-center
        w-28 h-28 p-3
        rounded-kids-lg
        transition-all
        ${isSelected
          ? 'bg-kids-primary-200 ring-4 ring-kids-primary-400 shadow-kids-lg'
          : 'bg-white shadow-kids hover:shadow-kids-lg'
        }
      `}
    >
      <span className="text-5xl mb-2">{icon}</span>
      <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{name}</span>
    </motion.button>
  )
})

export default CharacterCard
