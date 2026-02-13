import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function EntryPass({ onEnter }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        // Start revealing app much sooner (while zooming)
        setTimeout(() => {
            onEnter();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-rose-50 overflow-hidden pointer-events-none">
            {/* Background Atmosphere - Fades out on open */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden bg-rose-50"
                animate={isOpen ? { opacity: 0, transition: { duration: 1.5, delay: 0.5 } } : { opacity: 1 }}
            >
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: "110vh", x: Math.random() * 100 + "vw" }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            y: "-10vh",
                            x: (Math.random() - 0.5) * 50 + "vw"
                        }}
                        transition={{
                            duration: 8 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                        className="absolute text-rose-200"
                    >
                        <Heart size={10 + Math.random() * 20} fill="currentColor" />
                    </motion.div>
                ))}
            </motion.div>

            {/* ENVELOPE CONTAINER */}
            <motion.div
                className="relative w-80 h-52 md:w-96 md:h-64 perspective-1000 group cursor-pointer pointer-events-auto will-change-transform"
                onClick={handleOpen}
                animate={isOpen ? {
                    scale: 35, // Balanced scale
                    y: 1500,
                    rotate: 3,
                    opacity: 0,
                    transition: {
                        scale: { delay: 0.1, duration: 3.5, ease: [0.25, 0.1, 0.25, 1] }, // Very slow, romantic ease
                        y: { delay: 0.1, duration: 3.5, ease: [0.25, 0.1, 0.25, 1] },
                        rotate: { delay: 0.1, duration: 3.5, ease: "easeInOut" },
                        opacity: { delay: 1.5, duration: 1.5 } // Fade out slowly
                    }
                } : { scale: 1, y: 0, rotate: 0, opacity: 1 }}
            >

                {/* Inside of Envelope (The Void/Portal) */}
                <div className="absolute left-1 right-1 top-1 bottom-1 bg-[#fff0f5] z-10 flex items-center justify-center overflow-hidden">
                    {/* This mimics the app background but fades out quickly to show real app */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isOpen ? { opacity: 0, transition: { delay: 0.8, duration: 0.5 } } : {}}
                        className="w-full h-full bg-gradient-to-b from-rose-50 to-white opacity-95"
                    />
                </div>

                {/* Envelope Body (Back) */}
                <div className="absolute inset-0 bg-rose-200 shadow-xl border-2 border-rose-300 z-0" />

                {/* Envelope Front Pockets (Triangles) */}
                <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[160px] md:border-l-[192px] border-r-[160px] md:border-r-[192px] border-b-[104px] md:border-b-[128px] border-l-transparent border-r-transparent border-b-rose-300 z-20 point-events-none" />
                <div className="absolute top-0 left-0 right-0 h-0 border-l-[160px] md:border-l-[192px] border-r-[160px] md:border-r-[192px] border-t-[80px] md:border-t-[100px] border-l-transparent border-r-transparent border-t-rose-100/50 z-10 point-events-none opacity-50" />

                {/* Flap (Top) - Rotates Open */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-0 border-l-[160px] md:border-l-[192px] border-r-[160px] md:border-r-[192px] border-t-[110px] md:border-t-[140px] border-l-transparent border-r-transparent border-t-rose-400 origin-top z-30 drop-shadow-md"
                    animate={isOpen ? {
                        rotateX: 180,
                        zIndex: 0,
                        transition: { duration: 0.4, ease: "easeInOut" }
                    } : { rotateX: 0 }}
                >
                    {/* Wax Seal */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="absolute -top-[80px] md:-top-[100px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-red-800 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900/40"
                    >
                        <Heart size={24} className="text-red-100 fill-current" />
                        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-30" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Instruction Text */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-12 md:bottom-20 text-rose-500 font-['Great_Vibes'] text-3xl md:text-4xl z-0 pointer-events-none"
            >
                <span className="animate-pulse tracking-wider">Tap to open</span>
            </motion.p>
        </div>
    );
}
