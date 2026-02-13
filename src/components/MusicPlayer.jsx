import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Pause, Music } from 'lucide-react';

export function MusicPlayer({ autoPlay = false }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (autoPlay && audioRef.current) {
            // Attempt auto-play when component mounts if autoPlay is true
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
    }, [autoPlay]);

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
            <audio ref={audioRef} src="/music.mp3" loop />

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
