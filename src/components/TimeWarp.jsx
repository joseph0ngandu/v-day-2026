import { useEffect } from "react";
import { motion } from "framer-motion";

// The transition between chapters. It picks up exactly where the portal's dawn
// flare left off — a blinding warm-white — then "the eyes adjust": the white
// settles, a soft sun blooms, light motes drift up, the words surface, and the
// whole thing dissolves to reveal the present. No hard cuts, no sci-fi streaks,
// just the morning arriving.
// onReveal  -> fires while fully covered (parent swaps chapters behind it)
// onComplete-> fires once the overlay has dissolved away
export function TimeWarp({ onReveal, onComplete }) {
    useEffect(() => {
        const revealT = setTimeout(() => onReveal?.(), 1600);
        const doneT = setTimeout(() => onComplete?.(), 3400);
        return () => {
            clearTimeout(revealT);
            clearTimeout(doneT);
        };
    }, [onReveal, onComplete]);

    // Gentle dawn motes drifting upward through the light (deterministic).
    const motes = [...Array(22)].map((_, i) => ({
        key: i,
        left: (i * 41) % 100,
        size: (i % 4) + 2,
        delay: (i % 7) * 0.16,
        duration: 2.6 + (i % 5) * 0.28,
        drift: ((i % 5) - 2) * 14,
    }));

    return (
        <motion.div
            className="fixed inset-0 z-[300] overflow-hidden pointer-events-none flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 1, 0] }}
            transition={{ duration: 3.4, times: [0, 0.5, 0.82, 1], ease: "easeInOut" }}
        >
            {/* Sunrise base the light resolves into (matches the present chapter) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, #4a2a52 0%, #b5546e 30%, #ef8b5d 52%, #ffcf9a 72%, #ffe9c6 100%)",
                }}
            />

            {/* Very soft volumetric godrays — heavily blurred so they read as light, not lines */}
            <motion.div
                className="absolute left-1/2 top-[64%] -translate-x-1/2 -translate-y-1/2 animate-sun-rays"
                style={{
                    width: "160vmax",
                    height: "160vmax",
                    opacity: 0.35,
                    filter: "blur(40px)",
                    background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(255,240,205,0.5) 6deg, transparent 16deg, transparent 30deg, rgba(255,228,180,0.4) 38deg, transparent 52deg)",
                    maskImage: "radial-gradient(circle, black 0%, transparent 60%)",
                    WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 60%)",
                }}
            />

            {/* The breathing sun bloom, low on the horizon */}
            <motion.div
                className="absolute left-1/2 top-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: "90vmax",
                    height: "90vmax",
                    background:
                        "radial-gradient(circle, rgba(255,255,250,0.95) 0%, rgba(255,232,180,0.6) 26%, rgba(255,190,130,0.25) 46%, transparent 66%)",
                }}
                initial={{ scale: 0.85, opacity: 0.9 }}
                animate={{ scale: [0.85, 1.06, 1.0], opacity: [0.9, 1, 0.95] }}
                transition={{ duration: 3.4, ease: "easeInOut", times: [0, 0.5, 1] }}
            />

            {/* Dawn motes rising */}
            <div className="absolute inset-0">
                {motes.map((m) => (
                    <motion.span
                        key={m.key}
                        className="absolute rounded-full"
                        style={{
                            left: `${m.left}%`,
                            top: "72%",
                            width: m.size,
                            height: m.size,
                            background:
                                "radial-gradient(circle, rgba(255,250,235,0.95), rgba(255,225,170,0.4) 70%, transparent)",
                        }}
                        initial={{ y: 40, x: 0, opacity: 0 }}
                        animate={{ y: -320, x: m.drift, opacity: [0, 0.9, 0] }}
                        transition={{
                            duration: m.duration,
                            delay: m.delay,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>

            {/* The white veil from the flare — fades as "the eyes adjust" to the dawn */}
            <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0.9, 0.08, 0.08, 0] }}
                transition={{ duration: 3.4, times: [0, 0.12, 0.42, 0.7, 1], ease: "easeOut" }}
            />

            {/* The words, written in light */}
            <motion.div
                className="relative z-10 text-center px-6"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{
                    opacity: [0, 0, 1, 1, 0],
                    y: [16, 16, 0, 0, -8],
                    scale: [0.96, 0.96, 1, 1, 1.04],
                }}
                transition={{ duration: 3.4, times: [0, 0.32, 0.5, 0.82, 1], ease: "easeOut" }}
            >
                <p className="text-white/80 uppercase tracking-[0.45em] text-xs md:text-sm mb-4 drop-shadow-[0_2px_12px_rgba(180,80,60,0.5)]">
                    And then, one morning
                </p>
                <h1 className="font-['Great_Vibes'] text-6xl md:text-8xl text-white drop-shadow-[0_4px_30px_rgba(255,170,110,0.7)]">
                    Present Day
                </h1>
            </motion.div>
        </motion.div>
    );
}
