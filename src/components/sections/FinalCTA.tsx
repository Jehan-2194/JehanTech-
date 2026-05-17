import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function FinalCTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Dramatic cinematic scaling and fading
  const scaleHole = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.5, 3]);
  const opacityVoid = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 0.5, 1]);
  const yText = useTransform(scrollYProgress, [0.5, 1], [100, 0]);
  const opacityText = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="h-[250vh] relative bg-brand-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Base */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {/* Grids and Tech Lines fading out */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
              backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', 
              backgroundSize: '40px 40px'
            }}
            className="w-full h-full opacity-10" 
          />
        </div>

        {/* The Expanding Void (Black Hole) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ scale: scaleHole }}
            className="w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] bg-black rounded-full shadow-[0_0_150px_rgba(0,210,255,0.4)] flex items-center justify-center relative border border-brand-accent/20"
          >
            {/* Event horizon glow */}
            <div className="absolute inset-0 rounded-full border-[2px] border-brand-accent/40 blur-[10px]" />
          </motion.div>
        </div>

        {/* The Final Message rising from the void */}
        <motion.div 
          style={{ opacity: opacityText, y: yText }}
          className="relative z-20 text-center flex flex-col items-center w-full max-w-5xl px-6"
        >
          <span className="font-mono text-brand-accent uppercase tracking-[0.6em] text-[10px] md:text-xs mb-8 block font-bold">
            System Initialization Complete
          </span>
          <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.85] mb-12 tracking-tighter text-white">
            CROSS THE <br/>
            <span className="italic font-serif font-light text-white/50">Threshold.</span>
          </h2>
          
          <button className="relative group overflow-hidden px-12 md:px-16 py-6 border border-white/20 bg-white/5 backdrop-blur-md rounded-full transition-all duration-700 hover:scale-105 hover:border-white">
            <span className="relative z-10 font-mono font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs text-white group-hover:text-black transition-colors duration-500 delay-100 mix-blend-difference">
              Enter The Store
            </span>
            <div className="absolute inset-0 bg-white translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </button>
        </motion.div>

        {/* Footer info appearing at very end */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-8 md:px-12 flex justify-between text-[8px] md:text-[10px] uppercase font-mono text-white/30 tracking-[0.4em] z-20"
        >
          <span>© 2026 AEROMAX AUDIO</span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
            All systems nominal
          </span>
        </motion.div>
      </div>
    </section>
  );
}
