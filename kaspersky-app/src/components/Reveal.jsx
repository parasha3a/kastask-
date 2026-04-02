import { motion, useReducedMotion } from 'framer-motion'

const MotionDiv = motion.div

export function Reveal({ children, className, delay = 0, y = 28 }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </MotionDiv>
  )
}
