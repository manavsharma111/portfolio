import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const m = window.matchMedia(query)
    setMatches(m.matches)
    const handler = () => setMatches(m.matches)
    m.addEventListener('change', handler)
    return () => m.removeEventListener('change', handler)
  }, [query])
  return matches
}
