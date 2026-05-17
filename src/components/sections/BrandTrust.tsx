import { motion } from 'motion/react';
import { ShieldCheck, Zap, Truck, RotateCcw } from 'lucide-react';

export function BrandTrust() {
  const trusts = [
    { icon: <ShieldCheck className="w-8 h-8 text-brand-light" />, title: "3-Year Shield", desc: "Comprehensive global warranty on all mechanical parts." },
    { icon: <Zap className="w-8 h-8 text-brand-light" />, title: "Quantum Ship", desc: "Next-day priority delivery in major global sectors." },
    { icon: <RotateCcw className="w-8 h-8 text-brand-light" />, title: "30-Day Return", desc: "Hassle-free returns if the reality distorts." },
  ];

  return (
    <section className="py-24 border-y border-white/10 relative overflow-hidden bg-brand-black">
      {/* Subtle moving light effect */}
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"
      />

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {trusts.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center md:items-start group cursor-default"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-white/5 group-hover:border-brand-accent transition-colors">
              {t.icon}
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">{t.title}</h3>
            <p className="text-white/50 text-sm mx-auto md:mx-0 max-w-xs">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
