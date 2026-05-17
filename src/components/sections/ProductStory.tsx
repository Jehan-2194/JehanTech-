import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ProductStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const blurImg = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(0px)", "blur(10px)", "blur(20px)"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const features = [
    { title: "Zero Distortion.", desc: "The chassis is milled from a single block of aerospace-grade titanium, ensuring zero resonance. Absolute acoustic purity." },
    { title: "Neural Processing.", desc: "48,000 algorithmic corrections per second. The environment is perfectly mapped, isolated, and silenced before it reaches you." },
    { title: "Infinite Power.", desc: "Quantum battery integration provides 72 hours of uninterrupted high-fidelity playback. It never stops." }
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-brand-black z-20">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* Pinned Cinematic Background */}
        <motion.div 
          style={{ scale: scaleImg, filter: blurImg, y: yImage }}
          className="absolute inset-0 z-0 origin-center"
        >
          <img 
            src="https://images.unsplash.com/photo-1590845947376-2638caa89309?q=80&w=2670&auto=format&fit=crop" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-40"
            alt="Cinematic Engineering"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
        </motion.div>

        {/* Scrolling Content Container */}
        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-24">
          
          <div className="absolute top-0 bottom-0 left-6 md:left-24 w-full h-[300vh] flex flex-col justify-around py-[50vh]">
            
            {/* Title Block */}
            <div className="mb-[50vh] max-w-2xl">
              <p className="text-brand-accent font-mono uppercase tracking-[0.4em] mb-6 text-sm font-bold">
                The Architecture
              </p>
              <h2 className="font-heading text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter text-white">
                PRECISION <br/>
                <span className="italic font-serif font-light text-white/50">& Anatomy.</span>
              </h2>
            </div>

            {/* Feature Blocks */}
            {features.map((feature, i) => (
              <FeatureBlock key={i} feature={feature} index={i} containerProgress={scrollYProgress} />
            ))}

            {/* CTA Block */}
            <div className="mt-[30vh] md:max-w-xl bg-glass-dark p-12 rounded-[2rem] border border-white/10 backdrop-blur-3xl shadow-2xl relative">
              <h3 className="font-heading text-4xl font-bold text-white mb-6">Own the void.</h3>
              <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-6">
                <span className="font-mono text-sm text-white/50 uppercase tracking-widest">Pre-order AEROMAX</span>
                <span className="font-heading text-3xl font-bold text-brand-accent">$899</span>
              </div>
              <button className="w-full py-6 bg-white text-black font-heading font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-colors">
                Configure Vector
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ feature, index, containerProgress }: { feature: any, index: number, containerProgress: any }) {
  const start = 0.2 + (index * 0.2);
  const peak = start + 0.1;
  const end = peak + 0.15;

  const yOffset = useTransform(containerProgress, [start, peak, end], [100, 0, -100]);
  const opacity = useTransform(containerProgress, [start, peak, end], [0, 1, 0]);
  const scale = useTransform(containerProgress, [start, peak, end], [0.9, 1, 0.9]);

  return (
    <motion.div 
      style={{ y: yOffset, opacity, scale }}
      className="max-w-2xl py-[20vh] origin-left"
    >
      <div className="flex items-center gap-6 mb-8">
        <span className="font-mono text-brand-accent border border-brand-accent/30 rounded-full px-4 py-1 text-sm">
          0{index + 1}
        </span>
        <h3 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">{feature.title}</h3>
      </div>
      <p className="text-white/60 text-[clamp(1rem,2vw,1.5rem)] font-light font-serif leading-relaxed border-l-2 border-white/10 pl-6 relative before:absolute before:left-[-2px] before:top-0 before:w-[2px] before:h-1/2 before:bg-brand-accent">
        {feature.desc}
      </p>
    </motion.div>
  );
}
