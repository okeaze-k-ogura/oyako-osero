import { useGameStore } from '@/stores/gameStore'
import { usePWAInstall } from '@/hooks/usePWAInstall'
import CharacterSelectPage from '@/components/pages/CharacterSelectPage'
import PronounSelectPage from '@/components/pages/PronounSelectPage'
import GamePage from '@/components/pages/GamePage'
import ResultPage from '@/components/pages/ResultPage'

function App() {
  const phase = useGameStore((state) => state.phase)

  // Initialize PWA install prompt handling
  usePWAInstall()

  return (
    <div className="min-h-screen bg-kids-bg-cream">
      {phase === 'character-select' && <CharacterSelectPage />}
      {phase === 'pronoun-select' && <PronounSelectPage />}
      {phase === 'playing' && <GamePage />}
      {phase === 'finished' && <ResultPage />}
    </div>
  )
}

export default App
