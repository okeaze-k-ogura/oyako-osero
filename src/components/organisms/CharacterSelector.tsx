import { memo } from 'react'
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
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      {CHARACTER_LIST.map((char) => (
        <CharacterCard
          key={char.id}
          icon={char.icon}
          name={char.name}
          isSelected={selectedCharacter === char.id}
          onClick={() => onSelect(char.id as CharacterType)}
        />
      ))}
    </div>
  )
})

export default CharacterSelector
