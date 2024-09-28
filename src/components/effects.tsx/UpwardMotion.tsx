import { motion } from 'framer-motion';

export default function UpwardMotion({ children }: any) {
  const variants = {
    hidden: {
      opacity: 0,
      y: 120,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 4,
        duration: 1,
        delay: 0.2
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={'visible'}
      variants={variants}
      style={{
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
      }}
    >
      {children}
    </motion.div>
  );
}
