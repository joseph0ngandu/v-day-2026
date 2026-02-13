import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { VideoSection } from './components/VideoSection';
import { LoveLetter } from './components/LoveLetter';
import { Timeline } from './components/Timeline';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { AuroraBackground } from './components/AuroraBackground';
import { EntryPass } from './components/EntryPass';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="min-h-screen w-full relative bg-pink-50/30 overflow-x-hidden">

      {/* Entry Overlay - Z-Index 50 */}
      <AnimatePresence>
        {!hasEntered && (
          <EntryPass onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* Main Site - Always Rendered but hidden initially */}
      <div
        className={`fixed inset-0 transition-opacity duration-1000 ease-in-out overflow-y-auto ${hasEntered ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}
      >
        <MusicPlayer autoPlay={hasEntered} />
        <Navigation />

        {/* Hero Section with Aurora Background */}
        <AuroraBackground id="hero" className="h-screen w-full overflow-hidden">
          <FloatingHearts />
          <Hero />
        </AuroraBackground>

        <main className="relative z-10 w-full bg-white">
          <Gallery />
          <Timeline />
          <VideoSection />
          <LoveLetter />
        </main>

        <footer className="py-8 text-center text-3xl opacity-90 bg-white relative z-10 flex items-center justify-center gap-2 text-rose-500" style={{ fontFamily: "'Great Vibes', cursive" }}>
          Happy Valentine's Day my love <Heart className="w-6 h-6 fill-current inline" />
        </footer>
      </div>
    </div>
  );
}

export default App;
