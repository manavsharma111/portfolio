import { AnimatePresence, motion } from 'framer-motion'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'

export default function KeyboardShortcutToast() {
  const { toast } = useKeyboardShortcuts()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.label}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] pointer-events-none"
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/10 shadow-2xl backdrop-blur-xl">
            <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Navigating to</span>
            <span className="text-white text-sm font-semibold">{toast.label.replace('Go to ', '')}</span>
            <div className="flex items-center gap-1 ml-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 border border-white/20 rounded text-white/60">G</kbd>
              <span className="text-white/30 text-xs">+</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 border border-white/20 rounded text-white/60">
                {toast.label.split(' ').pop()[0].toUpperCase()}
              </kbd>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
