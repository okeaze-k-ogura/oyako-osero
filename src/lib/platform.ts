/**
 * Platform detection utilities for PWA install prompt
 */

export type Platform = 'ios' | 'android' | 'other'

/**
 * Detect the current platform
 */
export function detectPlatform(): Platform {
  const userAgent = navigator.userAgent.toLowerCase()

  // iOS detection (iPhone, iPad, iPod)
  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    // iPad on iOS 13+ reports as Mac
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  if (isIOS) {
    return 'ios'
  }

  // Android detection
  if (/android/.test(userAgent)) {
    return 'android'
  }

  return 'other'
}

/**
 * Check if the app is running in standalone mode (installed as PWA)
 */
export function isStandalone(): boolean {
  // Standard way to check standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }

  // iOS Safari specific check
  if ('standalone' in navigator && (navigator as { standalone?: boolean }).standalone === true) {
    return true
  }

  return false
}

/**
 * Check if the browser is Safari on iOS
 */
export function isSafari(): boolean {
  const userAgent = navigator.userAgent.toLowerCase()

  // Check if it's iOS
  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  if (!isIOS) {
    return false
  }

  // Safari on iOS doesn't have 'CriOS' (Chrome) or 'FxiOS' (Firefox) in UA
  const isChrome = /crios/.test(userAgent)
  const isFirefox = /fxios/.test(userAgent)

  return !isChrome && !isFirefox
}
