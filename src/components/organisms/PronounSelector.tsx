import { memo } from 'react'
import { motion } from 'framer-motion'
import { PRONOUNS, type PronounType } from '@/lib/characters'

interface PronounSelectorProps {
  selectedPronoun: PronounType | null
  onSelect: (pronoun: PronounType) => void
}

const PronounSelector = memo(function PronounSelector({
  selectedPronoun,
  onSelect,
}: PronounSelectorProps) {
  const pronounList = Object.values(PRONOUNS)

  return (
    <div className="flex gap-6 justify-center">
      {pronounList.map((pronoun) => (
        <motion.button
          key={pronoun.id}
          onClick={() => onSelect(pronoun.id as PronounType)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            flex flex-col items-center justify-center
            w-32 h-36 p-4
            rounded-kids-lg
            transition-all
            ${selectedPronoun === pronoun.id
              ? 'bg-kids-primary-200 ring-4 ring-kids-primary-400 shadow-kids-lg'
              : 'bg-white shadow-kids hover:shadow-kids-lg'
            }
          `}
        >
          <span className="text-6xl mb-2">{pronoun.icon}</span>
          <span className="text-kids-lg font-bold text-gray-700">
            {pronoun.label}
          </span>
        </motion.button>
      ))}
    </div>
  )
})

export default PronounSelector
