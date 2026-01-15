import type { Variants } from 'framer-motion'

export const flipVariants: Variants = {
  initial: { rotateY: 0 },
  flipping: {
    rotateY: 180,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

export const placeVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  placed: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
    },
  },
}

export const glowVariants: Variants = {
  idle: {},
  glow: {
    boxShadow: [
      '0 0 8px 4px rgba(255, 255, 255, 0.4)',
      '0 0 20px 8px rgba(255, 255, 255, 0.8)',
      '0 0 8px 4px rgba(255, 255, 255, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const sparkleVariants: Variants = {
  idle: { opacity: 0.4, scale: 1 },
  sparkle: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.3, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const hintSparkleVariants: Variants = {
  idle: { opacity: 0, scale: 0 },
  sparkle: {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.5,
      repeat: 6, // 3 seconds total
      ease: 'easeInOut',
    },
  },
}

export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const scaleInVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 20 },
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
}

export const slideUpVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
}

export const buttonTapVariants = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}
