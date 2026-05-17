import { motion, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, Menu } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(3, 3, 3, 0)', 'rgba(3, 3, 3, 0.8)']
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)']);

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center"
        style={{ backgroundColor, backdropFilter: backdropBlur, WebkitBackdropFilter: backdropBlur }}
      >
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5 text-brand-light cursor-pointer magnetic" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-heading text-xl tracking-widest font-bold text-white uppercase">
            Jehan<span className="text-brand-accent">Tech</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide text-brand-light/70 uppercase">
            <a href="#" className="hover:text-white transition-colors magnetic">Shop</a>
            <a href="#" className="hover:text-white transition-colors magnetic">Vision</a>
            <a href="#" className="hover:text-white transition-colors magnetic">Support</a>
          </div>
          <button 
            className="relative magnetic group cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 text-brand-light group-hover:text-brand-accent transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-brand-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setCartOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-brand-gray h-full relative z-10 p-8 flex flex-col border-l border-white/10"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-heading text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white text-sm uppercase tracking-wider">Close</button>
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-20 h-20 bg-brand-black rounded-lg"></div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg">Jehan Pods Pro</h3>
                    <p className="text-brand-accent font-mono text-sm line-clamp-1">$299.00</p>
                  </div>
                  <div className="text-white/50 font-mono text-sm">x1</div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 mt-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/60 uppercase tracking-widest text-sm">Total</span>
                <span className="font-heading text-2xl font-bold">$598.00</span>
              </div>
              <button className="w-full py-4 bg-white text-brand-black font-heading font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors flex justify-between items-center px-6 group rounded-lg">
                <span>Checkout</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
