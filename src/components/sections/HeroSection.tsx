import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textY2 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.05em", "0.05em"]);

  return (
    <section ref={ref} className="relative h-[120vh] flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-6 mt-[-10vh] w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="w-full flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-6 mb-12 mix-blend-difference">
            <span className="h-[2px] w-16 md:w-32 bg-brand-accent shadow-[0_0_10px_rgba(0,210,255,0.8)]"></span>
            <span className="uppercase tracking-[0.5em] text-white text-xs md:text-sm font-mono font-bold">
              Reality Distorted
            </span>
            <span className="h-[2px] w-16 md:w-32 bg-brand-accent shadow-[0_0_10px_rgba(0,210,255,0.8)]"></span>
          </div>
          
          <div className="relative w-full flex justify-center perspective-[1000px]">
            {/* Massive Foreground Text */}
            <motion.h1 
              style={{ y: textY1, letterSpacing }}
              className="font-heading text-[clamp(4rem,15vw,16rem)] font-bold leading-[0.8] tracking-tighter text-white mix-blend-exclusion z-20 relative pointer-events-none select-none text-glow w-full"
            >
              AEROMAX
            </motion.h1>

            {/* Ghost Background Text moving in opposite direction */}
            <motion.h1 
              style={{ y: textY2 }}
              className="absolute top-10 font-heading text-[clamp(4rem,15vw,16rem)] font-bold leading-[0.8] tracking-tighter text-edge-outline opacity-30 z-0 pointer-events-none select-none w-full"
            >
              AEROMAX
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col items-center z-30"
        >
          <p className="max-w-2xl text-white/80 text-xl md:text-3xl font-serif italic font-light mb-12 mix-blend-difference text-center">
            Absolute clarity engineered from a single point of truth. Enter the void.
          </p>

          <a href="#featured" className="group relative px-12 py-6 overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 rounded-full magnetic-area">
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 font-mono text-sm uppercase tracking-[0.2em] font-bold text-white group-hover:text-black transition-colors duration-300 delay-100 flex items-center gap-4">
              Explore Collection
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Cinematic scroll prompt */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20 mix-blend-difference"
      >
        <div className="relative w-px h-24 bg-white/10 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/3 bg-white"
            animate={{ y: ['-100%', '300%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/50">Initiate Scroll</span>
      </motion.div>
    </section>
  );
}
