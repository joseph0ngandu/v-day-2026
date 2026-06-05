import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Pause, Music } from 'lucide-react';

export function MusicPlayer({ autoPlay = false, src = "/music.mp3" }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (autoPlay && audioRef.current) {
            const playAudio = async () => {
                try {
                    audioRef.current.volume = 0.4;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Auto-play blocked:", err);
                    setIsPlaying(false);
                }
            };
            playAudio();
        }

        // Handle visibility change to stop music when tab is closed/minimized
        const handleVisibilityChange = () => {
            if (document.hidden && audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [autoPlay]);

    // Swap tracks between chapters. Changing the <audio> src already pauses/resets
    // the element, so we can't read audio.paused to know if it "was" playing — that
    // always reads paused here. Instead we just load the new track and play it: the
    // chapter switch only ever happens right after a user gesture (holding the
    // portal sun), so autoplay is allowed. The first mount is skipped — chapter
    // one's playback is handled by the autoPlay effect above.
    const isFirstSrc = useRef(true);
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isFirstSrc.current) {
            isFirstSrc.current = false;
            return;
        }
        audio.load();
        audio.volume = 0.4;
        audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
    }, [src]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Playback failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center">
            <audio ref={audioRef} src={src} loop />

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
                className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-rose-200 text-rose-500 hover:bg-white transition-colors"
                title={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? <Music size={24} /> : <Heart size={24} fill="currentColor" />}
            </motion.button>
        </div>
    );
}
