import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function PresentHero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-amber-50/80 uppercase tracking-[0.35em] text-xs md:text-sm mb-6"
                >
                    Chapter Two
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="font-['Great_Vibes'] text-6xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_4px_30px_rgba(255,200,120,0.5)] mb-6"
                >
                    In This New Light
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-amber-50/90 font-serif text-lg md:text-2xl max-w-2xl leading-relaxed mb-12"
                >
                    I've had time to think, and time to grow. And when I look at you now, at who you are, and who you're becoming, I see you more clearly than I ever have.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 1.5, duration: 1 },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 z-10"
            >
                <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
                <ArrowDown className="w-4 h-4" />
            </motion.div>
        </section>
    );
}
