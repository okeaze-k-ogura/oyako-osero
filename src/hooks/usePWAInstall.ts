import { useEffect } from 'react'
import { usePWAStore } from '@/stores/pwaStore'
import type { BeforeInstallPromptEvent } from '@/types/pwa'

/**
 * Hook to handle PWA install prompt events.
 * Should be called once at the app root level.
 */
export function usePWAInstall() {
  const setDeferredPrompt = usePWAStore((state) => state.setDeferredPrompt)
  const markAsInstalled = usePWAStore((state) => state.markAsInstalled)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the default browser install prompt
      e.preventDefault()
      // Store the event for later use
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      // User installed the app
      markAsInstalled()
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [setDeferredPrompt, markAsInstalled])
}
