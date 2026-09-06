import { Suspense, lazy, memo } from 'react'
import { useIsMobile } from '../../hooks/useMediaQuery'
import HeroCharacterFallback from './HeroCharacterFallback'
import { CharacterErrorBoundary } from './CharacterErrorBoundary'

const HeroCharacter = lazy(() => import('./HeroCharacter'))

function HeroCanvas() {
  const isMobile = useIsMobile()

  if (isMobile) return <HeroCharacterFallback />

  return (
    <CharacterErrorBoundary>
      <Suspense fallback={<HeroCharacterFallback />}>
        <HeroCharacter />
      </Suspense>
    </CharacterErrorBoundary>
  )
}

export default memo(HeroCanvas)
