import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const products = [
  { id: '01', name: 'AeroMax Prime', desc: 'Spatial Engine', price: '$899', specs: ['Beryllium Drivers', '48H Battery', 'Active Silence'], img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2576&auto=format&fit=crop' },
  { id: '02', name: 'Nano Pods Vol.2', desc: 'Adaptive Fit', price: '$299', specs: ['Custom Acoustics', '24H Battery', 'Zero Gravity Fit'], img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1964&auto=format&fit=crop' },
  { id: '03', name: 'Omni Core', desc: 'Room Audio', price: '$1249', specs: ['360° Soundstage', 'AI Calibration', 'Titanium Shell'], img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2606&auto=format&fit=crop' },
  { id: '04', name: 'Studio Link', desc: 'Pro Interface', price: '$499', specs: ['Zero Latency', 'Analog Warmth', 'Tactile Dials'], img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop' }
];

export function FeaturedProducts() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="featured" ref={targetRef} className="relative h-[400vh] bg-brand-black z-10">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background ambient text */}
        <div className="absolute top-10 w-full text-center pointer-events-none select-none z-0">
          <h2 className="font-heading text-[15vw] font-bold text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
            THE EXHIBITION
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 md:gap-32 px-12 md:px-32 relative z-10 text-white">
          {/* Intro Slide */}
          <div className="w-[80vw] md:w-[40vw] h-[70vh] flex flex-col justify-center shrink-0">
            <span className="text-brand-accent font-mono uppercase tracking-[0.4em] text-xs mb-8 block">Gallery.001</span>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] tracking-tighter mb-8">
              SCULPTED <br/>
              <span className="font-serif italic font-light text-white/50">For Reality.</span>
            </h2>
            <p className="text-white/60 text-[clamp(1rem,2vw,1.25rem)] font-light font-serif leading-relaxed">
              We do not build electronics. We engineer instruments. Every curve, every material, mathematically perfected to manipulate the physics of sound.
            </p>
            <div className="mt-12 flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-brand-accent">
              <span>Scroll to navigate</span>
              <div className="w-12 h-px bg-brand-accent"></div>
            </div>
          </div>

          {/* Product Slides */}
          {products.map((product, i) => (
            <ProductSlide key={product.id} product={product} index={i} />
          ))}
          
          {/* Outro Slide */}
          <div className="w-[80vw] md:w-[30vw] h-[70vh] flex flex-col items-center justify-center shrink-0">
             <a href="#" className="w-40 h-40 rounded-full border border-white/20 flex flex-col items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-500 magnetic-area group">
                <span className="font-heading text-xl uppercase tracking-widest font-bold">View All</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
             </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductSlide({ product, index }: { product: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-[85vw] md:w-[60vw] h-[75vh] shrink-0 relative flex flex-col md:flex-row gap-8 items-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Block */}
      <div className="w-full md:w-2/3 h-[50vh] md:h-full relative overflow-hidden rounded-3xl bg-brand-gray border border-white/5">
        <motion.div 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img 
            src={product.img} 
            alt={product.name}
            className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-1000"
          />
        </motion.div>
        
        {/* Number overlay */}
        <div className="absolute top-8 left-8 mix-blend-difference pointer-events-none">
          <span className="text-white font-heading text-8xl font-bold tracking-tighter opacity-80">
            {product.id}
          </span>
        </div>
      </div>

      {/* Info Block (moves parallel or overlaps) */}
      <motion.div 
        animate={{ x: isHovered ? 20 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/3 flex flex-col justify-center h-full relative"
      >
        <span className="font-mono text-brand-accent uppercase tracking-[0.3em] text-[10px] mb-4 block">
          {product.desc}
        </span>
        <h3 className="font-heading text-[clamp(2rem,5vw,4rem)] font-bold tracking-tighter mb-4 leading-none">
          {product.name}
        </h3>
        
        <div className="w-full h-px bg-white/10 my-6 md:my-8 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-brand-accent"
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          />
        </div>

        <div className="space-y-4 mb-12">
          {product.specs.map((spec: string, i: number) => (
             <div key={i} className="flex items-center gap-4 text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="font-mono text-sm uppercase tracking-widest">{spec}</span>
             </div>
          ))}
        </div>

        <div className="flex items-end justify-between mt-auto md:mt-0">
          <span className="font-heading text-4xl">{product.price}</span>
          <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-black transition-all">
            +
          </button>
        </div>
      </motion.div>
    </div>
  );
}
