import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

const categories = [
  { name: "Acoustics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000" },
  { name: "Wearables", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2000" },
  { name: "Home Tech", img: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=2000" },
  { name: "Gaming", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2000" },
  { name: "Studio", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000" }
];

export function CategoryOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  return (
    <section ref={containerRef} className="py-40 h-[100vh] min-h-[800px] relative flex md:flex-row flex-col items-center overflow-hidden bg-brand-black border-y border-white/5">
      
      {/* Background active image cinematic reveal */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          key={active}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          animate={{ opacity: 0.3, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={categories[active].img}
          className="w-full h-full object-cover mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/50 to-transparent" />
      </div>

      <div className="w-full md:w-1/2 p-12 md:p-24 relative z-10 flex flex-col justify-center h-full">
        <span className="font-mono text-brand-accent uppercase tracking-[0.4em] text-xs mb-8">Ecosystem Hub</span>
        <h2 className="font-heading text-[clamp(3rem,6vw,5rem)] font-bold mb-12 leading-none">
          Discover <br/>Dimensions.
        </h2>
        <div className="w-24 h-px bg-white/20 mb-12" />
        <p className="text-white/50 text-lg max-w-sm font-light leading-relaxed">
          Explore our strictly curated ecosystem. From personal audio enhancement to studio-scale environmental control systems.
        </p>
      </div>

      <div className="w-full md:w-1/2 h-full relative flex items-center justify-center perspective-[1200px] z-10">
        <div className="absolute right-0 w-full h-[80%] flex flex-col justify-center gap-6 pr-12 md:pr-32">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="relative cursor-pointer group origin-right"
              onClick={() => setActive(i)}
              animate={{ 
                x: active === i ? -40 : 0,
                opacity: active === i ? 1 : 0.4,
                scale: active === i ? 1.1 : 1
              }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <div className="flex items-center justify-end gap-4 md:gap-6">
                <h3 className={`font-heading text-[clamp(2rem,5vw,4rem)] font-bold uppercase tracking-tighter transition-all duration-500 group-hover:text-white ${active === i ? 'text-white text-glow' : 'text-transparent text-edge-outline'}`}>
                  {cat.name}
                </h3>
                <span className={`font-mono text-[10px] md:text-xs border rounded-full px-2 py-1 md:px-3 md:py-1 transition-all duration-300 ${active === i ? 'border-brand-accent text-brand-accent' : 'border-white/20 text-white/50'}`}>
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
