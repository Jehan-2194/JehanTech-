import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(Math.floor(currentProgress));

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 1000); // Wait for exit animation
        }, 800);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-brand-black flex flex-col justify-between p-8 md:p-16 overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex justify-between text-brand-light/50 font-mono text-xs uppercase tracking-[0.3em]">
            <span>System Initialization</span>
            <span>v0.9.4</span>
          </div>

          {/* Center Brand Reveal */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="relative overflow-hidden">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-heading text-5xl md:text-8xl font-bold tracking-tighter text-white"
              >
                JEHAN<span className="text-brand-accent">TECH</span>
              </motion.h1>
              <motion.div
                initial={{ left: 0 }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-0 bottom-0 left-0 w-full bg-brand-accent mix-blend-difference"
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-brand-light/40 uppercase tracking-[0.5em] text-sm text-center"
            >
              Constructing Reality
            </motion.p>
          </div>

          {/* Bottom Progress */}
          <div className="flex items-end justify-between">
            <div className="font-mono text-brand-accent text-6xl md:text-8xl font-light tracking-tighter w-48">
              {progress}<span className="text-2xl text-white/30">%</span>
            </div>
            <div className="w-1/3 max-w-sm h-px bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-brand-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
          
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-accent rounded-full blur-[150px] opacity-10 mix-blend-screen pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
