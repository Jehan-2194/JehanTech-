import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function LifestyleSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Layered parallax transformations
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(0px)", "blur(10px)"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="bg-brand-black relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Base */}
        <motion.div 
          style={{ scale: scaleImage }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1546513364-50eef3fa4eb4?q=80&w=2070&auto=format&fit=crop" 
            alt="Environmental Setup"
            className="w-full h-full object-cover filter grayscale opacity-40 mix-blend-screen"
          />
          {/* Intense central vignette strictly for text legibility */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.4)_40%,transparent_100%)] z-10" />
        </motion.div>

        {/* Dynamic Foreground Layers */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none perspective-[1000px]">
          {/* Layer 1 - Deep Background Floating Box */}
          <motion.div style={{ y: y1 }} className="absolute top-[20%] right-[10%] w-[30vw] h-[40vh] border justify-center border-white/5 bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden p-6 hidden md:block">
            <span className="font-mono text-[10px] text-white/30 uppercase">Node 01 // Cityscape</span>
            <div className="mt-4 w-full h-[1px] bg-brand-accent/20" />
            <img src="https://images.unsplash.com/photo-1508759556393-27cc67389a19?auto=format&w=800" className="mt-4 w-full h-[80%] object-cover opacity-50 grayscale" />
          </motion.div>

          {/* Layer 2 - Midground Right */}
          <motion.div style={{ y: y2 }} className="absolute bottom-[10%] left-[5%] w-[40vw] md:w-[20vw] h-[35vh] border border-brand-accent/20 bg-brand-black/40 backdrop-blur-xl rounded-2xl overflow-hidden p-6 shadow-2xl">
            <span className="font-mono text-[10px] text-brand-accent uppercase flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Active Isolation
            </span>
            <div className="mt-4 w-full h-[1px] bg-white/10" />
            <div className="mt-4 space-y-2">
              {[60, 80, 40, 90, 50, 70, 30].map((val, i) => (
                <div key={i} className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent" style={{ width: `${val}%` }} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] font-mono text-white/50 lowercase">Filtering 48k frequencies...</p>
          </motion.div>

          {/* Layer 3 - Foreground Left */}
          <motion.div style={{ y: y3 }} className="absolute top-[30%] left-[60%] md:left-[70%] w-[80vw] md:w-[25vw] h-auto border border-white/10 bg-white/5 backdrop-blur-2xl rounded-2xl p-8 z-20">
            <h4 className="font-heading text-xl md:text-2xl font-bold mb-4 text-white">Acoustic Shielding</h4>
            <p className="font-serif text-sm text-white/60 font-light leading-relaxed mb-6">
               Algorithmically neutralizing environmental chaos. The world outside continues, but your reality remains pristine.
            </p>
            <div className="w-12 h-12 rounded-full border border-brand-accent/30 bg-brand-accent/10 flex items-center justify-center">
              <span className="font-mono text-brand-accent text-xs font-bold">ON</span>
            </div>
          </motion.div>
        </div>

        {/* Central Core Text */}
        <motion.div 
          style={{ opacity: opacityText, filter: blurValue }}
          className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center mt-[-5vh]"
        >
          <div className="mb-8 overflow-hidden rounded-full border border-brand-accent/30 bg-black/60 px-6 py-2 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <span className="text-brand-accent uppercase tracking-[0.4em] text-[10px] md:text-xs font-mono font-bold">
              Environmental Integration
            </span>
          </div>
          <h2 className="font-heading text-[clamp(4rem,10vw,8rem)] leading-[0.85] font-bold mb-8 tracking-tighter text-white drop-shadow-2xl">
            SILENCING <br/>
            <span className="font-serif italic font-light text-brand-accent drop-shadow-[0_0_20px_rgba(0,210,255,0.3)]">The Chaos.</span>
          </h2>
          <p className="text-white/90 text-[clamp(1.1rem,2vw,1.5rem)] font-light leading-relaxed max-w-2xl mx-auto drop-shadow-xl">
            Whether navigating urban density or isolating in a creative studio, the ecosystem adapts instantaneously. 
            Real-time acoustic rendering makes the world completely <span className="text-white font-medium">yours</span>.
          </p>
        </motion.div>

      </div>
      
      {/* Gradients to blend into next section */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-brand-black to-transparent z-20" />
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-brand-black to-transparent z-20" />
    </section>
  );
}
