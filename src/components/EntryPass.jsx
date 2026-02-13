import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function EntryPass({ onEnter }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            onEnter();
        }, 800); // Wait for exit animation
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-rose-50 overflow-hidden">
            {/* Background floating hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden text-rose-200" style={{ position: 'absolute' }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        layout
                        initial={{
                            opacity: 0,
                            y: "100vh",
                            x: Math.random() * 100 + "vw"
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: "-10vh",
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                        className="absolute"
                        style={{ position: 'absolute' }}
                    >
                        <Heart size={10 + Math.random() * 30} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={clicked ? { opacity: 0 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="relative cursor-pointer group z-10"
                style={{ position: 'relative' }} // Explicitly setting position for Framer Motion
                onClick={handleClick}
            >
                {/* Envelope/Heart Container */}
                <div className="relative text-rose-500 drop-shadow-2xl">
                    <motion.div
                        animate={clicked ? {
                            y: -200,
                            opacity: 0,
                            scale: 1.5
                        } : {
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0],
                            y: 0,
                            opacity: 1
                        }}
                        transition={{
                            duration: clicked ? 0.8 : 2,
                            ease: clicked ? "anticipate" : "easeInOut",
                            repeat: clicked ? 0 : Infinity
                        }}
                    >
                        <Heart size={140} fill="currentColor" />
                    </motion.div>
                </div>

                {/* Pulse ring */}
                <motion.div
                    className="absolute inset-0 -m-8 rounded-full border-4 border-rose-300/30"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                    className="absolute inset-0 -m-8 rounded-full border-4 border-rose-300/30"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: 1.5 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
            </motion.div>

            {!clicked && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-20 text-rose-400 font-serif italic text-lg"
                >
                    A special message awaits...
                </motion.p>
            )}
        </div>
    );
}
