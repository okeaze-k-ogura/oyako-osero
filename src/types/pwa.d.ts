/**
 * PWA BeforeInstallPromptEvent type definition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 */

interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of string items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user.
   */
  readonly platforms: string[]

  /**
   * Returns a Promise that resolves to a string containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * Returns a Promise that resolves when the user responds to the prompt.
   */
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
    appinstalled: Event
  }
}

export type { BeforeInstallPromptEvent }
