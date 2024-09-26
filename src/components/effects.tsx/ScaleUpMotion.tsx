import { delay, motion } from 'framer-motion';

export default function ScaleUpMotion({ children }: any) {
  const scaleUpVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.3, delay: 1.5 } },
  };

  // Usage
  return (
    <motion.div initial="hidden" animate="visible" variants={scaleUpVariants}>
      {children}
    </motion.div>
  );
}
