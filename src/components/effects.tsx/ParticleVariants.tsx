import React from 'react';
import { motion } from 'framer-motion';

const particleVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  pop: {
    opacity: [1, 1, 0], // Fade out
    scale: [1, 1.5, 0], // Expand and shrink
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export default function PartyPopperEffect() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          variants={particleVariants}
          initial="initial"
          animate="pop"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            backgroundColor: 'hsl(' + Math.random() * 360 + ', 100%, 50%)',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
}
