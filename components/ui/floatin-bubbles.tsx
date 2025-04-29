'use client';

import { motion } from 'framer-motion';
import React from 'react';

const bubbles = [
  { size: 150, x: '-20%', y: '20%', delay: 0 },
  { size: 100, x: '70%', y: '60%', delay: 0.3 },
  { size: 120, x: '30%', y: '40%', delay: 0.6 },
  { size: 80,  x: '50%', y: '80%', delay: 0.9 },
];

export default function FloatingBubbles() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-fuchsia-400/40 blur-3xl dark:bg-fuchsia-600/30"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
}
