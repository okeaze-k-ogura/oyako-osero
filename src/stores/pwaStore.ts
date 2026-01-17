import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BeforeInstallPromptEvent } from '@/types/pwa'
import { isStandalone } from '@/lib/platform'

const DISMISS_COOLDOWN_DAYS = 7

interface PWAState {
  // Deferred install prompt (not persisted)
  deferredPrompt: BeforeInstallPromptEvent | null

  // Last time user dismissed the prompt (persisted)
  lastDismissedAt: number | null

  // Whether the app has been installed (persisted)
  isInstalled: boolean

  // Modal visibility
  showInstallPrompt: boolean

  // Actions
  setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void
  dismissPrompt: () => void
  markAsInstalled: () => void
  openInstallPrompt: () => void
  closeInstallPrompt: () => void

  // Computed
  shouldShowPrompt: (gameCompletedCount: number) => boolean
}

export const usePWAStore = create<PWAState>()(
  persist(
    (set, get) => ({
      deferredPrompt: null,
      lastDismissedAt: null,
      isInstalled: false,
      showInstallPrompt: false,

      setDeferredPrompt: (prompt) => {
        set({ deferredPrompt: prompt })
      },

      dismissPrompt: () => {
        set({
          lastDismissedAt: Date.now(),
          showInstallPrompt: false,
        })
      },

      markAsInstalled: () => {
        set({
          isInstalled: true,
          deferredPrompt: null,
          showInstallPrompt: false,
        })
      },

      openInstallPrompt: () => {
        set({ showInstallPrompt: true })
      },

      closeInstallPrompt: () => {
        set({ showInstallPrompt: false })
      },

      shouldShowPrompt: (gameCompletedCount: number) => {
        const { lastDismissedAt, isInstalled } = get()

        // Don't show if already installed
        if (isInstalled) {
          return false
        }

        // Don't show if running in standalone mode
        if (isStandalone()) {
          return false
        }

        // Only show after 2+ games completed
        if (gameCompletedCount < 2) {
          return false
        }

        // Check cooldown period
        if (lastDismissedAt !== null) {
          const daysSinceDismiss =
            (Date.now() - lastDismissedAt) / (1000 * 60 * 60 * 24)
          if (daysSinceDismiss < DISMISS_COOLDOWN_DAYS) {
            return false
          }
        }

        return true
      },
    }),
    {
      name: 'pwa-storage',
      partialize: (state) => ({
        lastDismissedAt: state.lastDismissedAt,
        isInstalled: state.isInstalled,
      }),
    }
  )
)
