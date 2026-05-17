import { motion } from 'motion/react';
import { useState } from 'react';

const compareData = [
  { id: 'prime', name: 'AeroMax Prime', power: 'Spatial Audio', range: '20Hz - 40kHz', battery: '48H', price: '$899', desc: 'The original breakthrough. Uncompromised spatial tracking and true reality distortion.' },
  { id: 'elite', name: 'AeroMax Elite', power: 'Studio Reference', range: '10Hz - 50kHz', battery: '72H', price: '$1249', desc: 'Precision engineered for raw power. Larger titanium drivers and 72-hour sustained output.' },
  { id: 'omni', name: 'Omni Core', power: 'Room Acoustics', range: '5Hz - 60kHz', battery: 'Mains', price: '$1899', desc: 'The stationary titan. Analyzes the acoustic geometry of any space in real-time.' }
];

export function ImmersiveComparison() {
  const [hovered, setHovered] = useState<string>('elite');

  return (
    <section className="py-40 px-6 md:px-12 bg-brand-black relative flex flex-col items-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-radial from-brand-accent/5 to-transparent blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[80vw] mb-20 relative z-10 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h2 className="font-heading text-[clamp(3.5rem,8vw,7rem)] font-bold tracking-tighter mix-blend-exclusion text-white mb-4 leading-[0.9]">
            CHOOSE YOUR <br/>
            <span className="font-serif italic font-light text-white/50">Vector.</span>
          </h2>
        </div>
        <p className="text-white/40 uppercase tracking-[0.4em] font-mono text-[10px] max-w-[200px] text-left md:text-right mt-6 md:mt-0">
          Acoustic architecture tailored to specific sensory requirements.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[80vw] relative z-10 h-[800px] lg:h-[600px]">
        {compareData.map((item) => {
          const isHovered = hovered === item.id;
          return (
            <motion.div
              key={item.id}
              onHoverStart={() => setHovered(item.id)}
              onClick={() => setHovered(item.id)}
              className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] border relative cursor-pointer flex flex-col group
                ${isHovered ? 'lg:flex-[2] bg-white/10 border-white/20' : 'lg:flex-[0.5] bg-white/[0.02] border-white/5'}
              `}
            >
              {/* Background Glow */}
              <motion.div 
                animate={{ opacity: isHovered ? 0.2 : 0 }}
                className="absolute -inset-20 bg-brand-accent blur-[100px] z-0 pointer-events-none"
              />

              <div className="p-8 md:p-12 h-full flex flex-col relative z-10 justify-between">
                <div>
                  <div className={`flex items-center gap-4 mb-6 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`}>
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-white font-mono text-[10px] uppercase tracking-[0.3em]">{item.id}</span>
                  </div>
                  
                  <h3 className={`font-heading font-bold transition-all duration-500 ${isHovered ? 'text-5xl md:text-6xl mb-6' : 'text-3xl rotate-0 lg:-rotate-90 lg:origin-top-left lg:translate-x-6 lg:translate-y-24 mb-0'}`}>
                    {item.name}
                  </h3>
                  
                  <motion.p 
                    animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
                    className="text-white/60 text-base md:text-lg font-serif font-light leading-relaxed max-w-sm overflow-hidden"
                  >
                    {item.desc}
                  </motion.p>
                </div>

                <motion.div 
                  className="space-y-6 overflow-hidden"
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: isHovered ? 0.2 : 0 }}
                >
                  <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-12">
                    <div>
                      <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-2">Engine</p>
                      <p className="font-heading text-xl">{item.power}</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-2">Freq.</p>
                      <p className="font-mono text-sm">{item.range}</p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-8 pb-4">
                    <div>
                      <p className="font-mono text-3xl font-bold">{item.price}</p>
                    </div>
                     <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-accent transition-colors">
                       Select Object
                     </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
