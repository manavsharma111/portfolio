import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const SHORTCUTS = {
  'g+h': { label: 'Go to Home', path: '/' },
  'g+s': { label: 'Go to Skills', path: '/skills' },
  'g+p': { label: 'Go to Projects', path: '/projects' },
  'g+c': { label: 'Go to Contact', path: '/#contact' },
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null) // { label, path }
  const [firstKey, setFirstKey] = useState(null)
  const [firstKeyTimer, setFirstKeyTimer] = useState(null)

  const showToast = useCallback((shortcut) => {
    setToast(shortcut)
    setTimeout(() => setToast(null), 2000)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input/textarea
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return

      const key = e.key.toLowerCase()

      if (firstKey === 'g') {
        // Second key
        clearTimeout(firstKeyTimer)
        setFirstKey(null)
        setFirstKeyTimer(null)

        const combo = `g+${key}`
        if (SHORTCUTS[combo]) {
          showToast(SHORTCUTS[combo])
          const { path } = SHORTCUTS[combo]
          if (path.includes('#')) {
            const id = path.split('#')[1]
            navigate('/', { state: { scrollTo: id } })
          } else {
            navigate(path)
          }
        }
      } else if (key === 'g') {
        setFirstKey('g')
        const timer = setTimeout(() => {
          setFirstKey(null)
          setFirstKeyTimer(null)
        }, 1500)
        setFirstKeyTimer(timer)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(firstKeyTimer)
    }
  }, [firstKey, firstKeyTimer, navigate, showToast])

  return { toast }
}
