import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { AuroraBackground } from './components/AuroraBackground';
import { EntryPass } from './components/EntryPass';

// Lazy load heavy components
const Gallery = lazy(() => import('./components/Gallery').then(module => ({ default: module.Gallery })));
const VideoSection = lazy(() => import('./components/VideoSection').then(module => ({ default: module.VideoSection })));
const LoveLetter = lazy(() => import('./components/LoveLetter').then(module => ({ default: module.LoveLetter })));
const Timeline = lazy(() => import('./components/Timeline').then(module => ({ default: module.Timeline })));

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
        <AuroraBackground className="h-screen w-full overflow-hidden">
          <FloatingHearts />
          <Hero />
        </AuroraBackground>

        <main className="relative z-10 w-full bg-white">
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><Heart className="animate-pulse text-rose-500 w-12 h-12" /></div>}>
            <Gallery />
            <Timeline />
            <VideoSection />
            <LoveLetter />
          </Suspense>
        </main>

        <footer className="py-8 text-center text-3xl opacity-90 bg-white relative z-10 flex items-center justify-center gap-2 text-rose-500" style={{ fontFamily: "'Great Vibes', cursive" }}>
          Happy Valentine's Day my love <Heart className="w-6 h-6 fill-current inline" />
        </footer>
      </div>
    </div>
  );
}

export default App;
