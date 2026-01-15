import { memo } from 'react'
import { motion } from 'framer-motion'
import CharacterCard from '@/components/molecules/CharacterCard'
import { CHARACTER_LIST, type CharacterType } from '@/lib/characters'

interface CharacterSelectorProps {
  selectedCharacter: CharacterType | null
  onSelect: (character: CharacterType) => void
}

const CharacterSelector = memo(function CharacterSelector({
  selectedCharacter,
  onSelect,
}: CharacterSelectorProps) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-4 justify-items-center"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {CHARACTER_LIST.map((char) => (
        <motion.div
          key={char.id}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <CharacterCard
            character={char}
            isSelected={selectedCharacter === char.id}
            onClick={() => onSelect(char.id as CharacterType)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
})

export default CharacterSelector
