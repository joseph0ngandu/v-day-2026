import { motion } from "framer-motion";
import { Heart, Undo2 } from "lucide-react";
import { DawnBackground } from "./DawnBackground";
import { PresentHero } from "./PresentHero";
import { PresentGallery } from "./PresentGallery";
import { PresentTimeline } from "./PresentTimeline";
import { PresentLetters } from "./PresentLetters";

// The full present-day chapter, revealed after the time-warp.
export function PresentChapter({ onReturn }) {
    return (
        <div className="w-full bg-[#fff7ed] min-h-screen">
            {/* Warm nav */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="fixed top-0 left-0 w-full z-50 p-6"
            >
                <nav className="flex justify-between items-center max-w-7xl mx-auto">
                    <h1
                        className="text-4xl text-white drop-shadow-[0_2px_8px_rgba(180,83,9,0.4)]"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        J & T
                    </h1>
                    <motion.button
                        type="button"
                        onClick={onReturn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                        <Undo2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Back to the beginning</span>
                    </motion.button>
                </nav>
            </motion.header>

            <DawnBackground className="h-screen">
                <PresentHero />
            </DawnBackground>

            <main className="relative z-10">
                <PresentGallery />
                <PresentTimeline />
                <PresentLetters />
            </main>

            <footer
                className="py-10 text-center text-3xl bg-[#fff7ed] relative z-10 flex flex-col items-center justify-center gap-3 text-amber-600"
                style={{ fontFamily: "'Great Vibes', cursive" }}
            >
                <span className="flex items-center gap-2">
                    To be continued, my love <Heart className="w-6 h-6 fill-current inline" />
                </span>
                <button
                    type="button"
                    onClick={onReturn}
                    className="text-xs uppercase tracking-[0.2em] text-amber-500/70 hover:text-amber-600 font-sans transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    ↺ Relive the beginning
                </button>
            </footer>
        </div>
    );
}
