import { memo, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePWAStore } from '@/stores/pwaStore'
import { detectPlatform } from '@/lib/platform'

const TwinklingStars = ({ count = 20 }: { count?: number }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    [count]
  )

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-sky-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

const IOSInstallGuide = memo(function IOSInstallGuide({
  onClose,
}: {
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative bg-fantasy-cream/95 rounded-fantasy p-8 text-center shadow-fantasy-lg max-w-sm w-full border-4 border-board-wood"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 巻物風の装飾 - 上 */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, #A67C52, #5D3A1A)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* スマホアイコン */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-7xl mb-4 relative"
      >
        📱
        {/* キラキラエフェクト */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-sky-star"
            style={{
              top: `${20 + Math.sin((i * 90 * Math.PI) / 180) * 30}%`,
              left: `${50 + Math.cos((i * 90 * Math.PI) / 180) * 40}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      <h2 className="text-kids-xl font-bold text-forest-deep mb-2">
        ホームに ついかしよう！
      </h2>
      <p className="text-kids-lg text-forest-moss mb-6">
        いつでも すぐに あそべるよ！
      </p>

      {/* 手順ガイド */}
      <div className="bg-white/50 rounded-xl p-4 mb-6 text-left">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-kids-base font-bold text-forest-deep">①</span>
          <p className="text-kids-base text-forest-moss">
            下の{' '}
            <span className="inline-block bg-gray-200 px-2 py-0.5 rounded text-xl">
              ↑
            </span>{' '}
            をタップ
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-kids-base font-bold text-forest-deep">②</span>
          <p className="text-kids-base text-forest-moss">
            「ホーム画面に追加」をタップ
          </p>
        </div>
      </div>

      {/* ボタン */}
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-fantasy text-kids-lg"
      >
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ✨
          </motion.span>
          わかった！
        </span>
      </motion.button>

      {/* 巻物風の装飾 - 下 */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full"
        style={{
          background: 'linear-gradient(to top, #A67C52, #5D3A1A)',
          boxShadow: '0 -2px 4px rgba(0,0,0,0.3)',
        }}
      />
    </motion.div>
  )
})

const AndroidInstallPrompt = memo(function AndroidInstallPrompt({
  onInstall,
  onDismiss,
}: {
  onInstall: () => void
  onDismiss: () => void
}) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.5, opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative bg-fantasy-cream/95 rounded-fantasy p-8 text-center shadow-fantasy-lg max-w-sm w-full border-4 border-board-wood"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 巻物風の装飾 - 上 */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, #A67C52, #5D3A1A)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* スマホアイコン */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-7xl mb-4 relative"
      >
        📱
        {/* キラキラエフェクト */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-sky-star"
            style={{
              top: `${20 + Math.sin((i * 90 * Math.PI) / 180) * 30}%`,
              left: `${50 + Math.cos((i * 90 * Math.PI) / 180) * 40}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      <h2 className="text-kids-xl font-bold text-forest-deep mb-2">
        アプリに しよう！
      </h2>
      <p className="text-kids-lg text-forest-moss mb-6">
        ホームがめんから
        <br />
        すぐ あそべるよ！
      </p>

      {/* ボタン */}
      <motion.button
        onClick={onInstall}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-fantasy text-kids-lg mb-4"
      >
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ✨
          </motion.span>
          ついかする！
        </span>
      </motion.button>

      <button
        onClick={onDismiss}
        className="text-kids-base text-forest-moss/70 hover:text-forest-moss transition-colors"
      >
        あとで
      </button>

      {/* 巻物風の装飾 - 下 */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full"
        style={{
          background: 'linear-gradient(to top, #A67C52, #5D3A1A)',
          boxShadow: '0 -2px 4px rgba(0,0,0,0.3)',
        }}
      />
    </motion.div>
  )
})

const InstallPrompt = memo(function InstallPrompt() {
  const showInstallPrompt = usePWAStore((state) => state.showInstallPrompt)
  const deferredPrompt = usePWAStore((state) => state.deferredPrompt)
  const closeInstallPrompt = usePWAStore((state) => state.closeInstallPrompt)
  const dismissPrompt = usePWAStore((state) => state.dismissPrompt)
  const setDeferredPrompt = usePWAStore((state) => state.setDeferredPrompt)

  const platform = detectPlatform()

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        // Successfully installed
        setDeferredPrompt(null)
      }
    } catch {
      // User cancelled or error
    }

    closeInstallPrompt()
  }

  const handleClose = () => {
    // iOS: just close without setting cooldown
    closeInstallPrompt()
  }

  const handleDismiss = () => {
    // Android: close with cooldown
    dismissPrompt()
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-hidden"
          onClick={handleDismiss}
        >
          {/* 夜空の背景 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-sky-night via-shadow-magic-core to-forest-deep"
          />

          {/* 星のアニメーション */}
          <TwinklingStars count={30} />

          {/* オーロラ風エフェクト */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(ellipse at 30% 20%, rgba(196, 181, 253, 0.4) 0%, transparent 50%)',
                'radial-gradient(ellipse at 70% 30%, rgba(196, 181, 253, 0.4) 0%, transparent 50%)',
                'radial-gradient(ellipse at 30% 20%, rgba(196, 181, 253, 0.4) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* プラットフォーム別UI */}
          {platform === 'ios' ? (
            <IOSInstallGuide onClose={handleClose} />
          ) : (
            <AndroidInstallPrompt
              onInstall={handleInstall}
              onDismiss={handleDismiss}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default InstallPrompt
