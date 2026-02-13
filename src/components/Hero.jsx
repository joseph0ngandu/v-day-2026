import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

export function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const handleInternalConfetti = () => {
        const end = Date.now() + 1000;
        const colors = ['#000000', '#ff0000', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
            {/* Background Parallax - simplified to just overlay interactions if needed */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            >
                {/* Optional: Subtle gradient or soft glowing orb behind text */}
                <div className="w-[800px] h-[800px] bg-rose-300/20 rounded-full blur-[120px] absolute" />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center justify-center pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-rose-600 tracking-tight leading-[0.95] mb-4 whitespace-nowrap">
                        Happy Valentine’s Day,
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-black text-rose-400 tracking-tight leading-[0.95] mb-12">
                        Beautiful.
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <motion.a
                            href="#gallery"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-colors shadow-lg"
                        >
                            View Memories
                        </motion.a>
                        <motion.a
                            href="#letter"
                            onClick={handleInternalConfetti}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gray-100 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors border border-gray-200"
                        >
                            Read Letters
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
