import { useState, useRef, useEffect, useCallback } from 'react';
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
import { Portal } from './components/Portal';
import { TimeWarp } from './components/TimeWarp';
import { PresentChapter } from './components/present/PresentChapter';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [chapter, setChapter] = useState('past'); // 'past' | 'present'
  const [traveling, setTraveling] = useState(false);
  const scrollRef = useRef(null);

  // Reset scroll to the top whenever we switch chapters.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [chapter]);

  const startTravel = useCallback(() => setTraveling(true), []);

  // Fired at the bright peak of the warp — swap chapters while hidden.
  const handleReveal = useCallback(() => setChapter('present'), []);
  const handleWarpComplete = useCallback(() => setTraveling(false), []);

  const returnToStart = useCallback(() => setChapter('past'), []);

  return (
    <div className="min-h-screen w-full relative bg-pink-50/30 overflow-x-hidden">

      {/* Entry Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <EntryPass onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* Time-travel transition overlay */}
      <AnimatePresence>
        {traveling && (
          <TimeWarp onReveal={handleReveal} onComplete={handleWarpComplete} />
        )}
      </AnimatePresence>

      {/* Main Site - Always Rendered but hidden initially */}
      <div
        ref={scrollRef}
        className={`fixed inset-0 transition-opacity duration-1000 ease-in-out overflow-y-auto scroll-smooth ${hasEntered ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}
      >
        {/* Music persists across chapters, switching to the chapter-two song in the present */}
        <MusicPlayer autoPlay={hasEntered} src={chapter === 'present' ? '/chapter2.mp3' : '/music.mp3'} />

        {chapter === 'past' ? (
          <motion.div key="past" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
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

            {/* Portal to the present-day chapter */}
            <Portal onTravel={startTravel} />
          </motion.div>
        ) : (
          <motion.div key="present" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <PresentChapter onReturn={returnToStart} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
