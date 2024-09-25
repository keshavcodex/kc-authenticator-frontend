import { motion } from 'framer-motion';

export default function HoverMotion({ children }: any) {
  const hoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  // Usage
  return (
    <motion.div initial="initial" whileHover="hover" variants={hoverVariants}>
      {children}
    </motion.div>
  );
}
