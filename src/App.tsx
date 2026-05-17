import { StrictMode, useState } from 'react';
import { SmoothScroll } from '@/src/components/layout/SmoothScroll';
import { Navbar } from '@/src/components/layout/Navbar';
import { CustomCursor } from '@/src/components/layout/CustomCursor';
import { GlobalCanvas } from '@/src/components/canvas/GlobalCanvas';
import { Preloader } from '@/src/components/layout/Preloader';

import { HeroSection } from '@/src/components/sections/HeroSection';
import { FeaturedProducts } from '@/src/components/sections/FeaturedProducts';
import { CategoryOrbit } from '@/src/components/sections/CategoryOrbit';
import { ProductStory } from '@/src/components/sections/ProductStory';
import { ImmersiveComparison } from '@/src/components/sections/ImmersiveComparison';
import { BrandTrust } from '@/src/components/sections/BrandTrust';
import { LifestyleSection } from '@/src/components/sections/LifestyleSection';
import { FinalCTA } from '@/src/components/sections/FinalCTA';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setIsLoaded(true)} />
      
      {/* Delay rendering of heavy 3D and visuals until preloader almost done, or just keep them hidden */}
      <div className={`text-brand-light bg-transparent selection:bg-brand-accent selection:text-brand-black transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        {isLoaded && <CustomCursor />}
        <GlobalCanvas active={isLoaded} />
        {isLoaded && <Navbar />}

        <main>
          {isLoaded && (
            <>
              <HeroSection />
              <FeaturedProducts />
              <CategoryOrbit />
              <ProductStory />
              <ImmersiveComparison />
              <BrandTrust />
              <LifestyleSection />
              <FinalCTA />
            </>
          )}
        </main>
      </div>
    </SmoothScroll>
  );
}
