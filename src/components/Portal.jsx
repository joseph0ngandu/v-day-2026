import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";

// End-of-(past)-chapter portal.
// There is no button here. The dawn is asleep below the horizon, and she has to
// *bring it up herself*: press and hold, and the sun rises out of the dark while
// the whole sky warms in real time. Only patience carries it all the way up —
// and when it crests, the day breaks and the time-warp takes her to the present.
export function Portal({ onTravel }) {
    // 0 = deep night, 1 = full dawn (triggers travel)
    const progress = useMotionValue(0);
    const holdingRef = useRef(false);
    const doneRef = useRef(false);
    const rafRef = useRef(0);
    const lastRef = useRef(0);

    const [holding, setHolding] = useState(false);
    const [phase, setPhase] = useState("idle"); // idle | complete
    const [label, setLabel] = useState("Press & hold");

    const HOLD_MS = 2600; // patience required to bring the sun all the way up
    const DECAY_MS = 1100; // how fast it sinks back if she lets go

    // The animation loop: holding fills the sunrise, releasing lets it sink.
    useEffect(() => {
        const tick = (t) => {
            if (!lastRef.current) lastRef.current = t;
            const dt = t - lastRef.current;
            lastRef.current = t;

            let p = progress.get();
            p += holdingRef.current ? dt / HOLD_MS : -dt / DECAY_MS;
            p = Math.min(1, Math.max(0, p));
            progress.set(p);

            if (p >= 1 && !doneRef.current) {
                doneRef.current = true;
                holdingRef.current = false;
                setHolding(false);
                setPhase("complete");
                setLabel("Good morning, my love");
                window.setTimeout(() => onTravel?.(), 1050); // let the dawn flare bloom, then warp
                return; // stop the loop
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [onTravel, progress]);

    // Living instruction text — builds tension as she holds (or lets go).
    useMotionValueEvent(progress, "change", (v) => {
        if (doneRef.current) return;
        if (v >= 0.8) setLabel("Almost dawn…");
        else if (holdingRef.current) setLabel("Keep holding…");
        else if (v > 0.02) setLabel("Don't let go…");
        else setLabel("Press & hold");
    });

    const startHold = (e) => {
        if (doneRef.current) return;
        e.preventDefault();
        try {
            e.currentTarget.setPointerCapture?.(e.pointerId);
        } catch {
            /* no-op */
        }
        holdingRef.current = true;
        setHolding(true);
    };
    const endHold = () => {
        if (doneRef.current) return;
        holdingRef.current = false;
        setHolding(false);
    };
    const onKeyDown = (e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault();
            holdingRef.current = true;
            setHolding(true);
        }
    };
    const onKeyUp = (e) => {
        if (e.key === " " || e.key === "Enter") {
            holdingRef.current = false;
            setHolding(false);
        }
    };

    // --- Derived light, all driven by `progress` so it tracks her finger 1:1 ---
    // The sun's motion is eased (slow lift-off, glide, gentle settle) so the
    // rise reads like a real sunrise instead of a mechanical, linear slide.
    const dawnOpacity = useTransform(progress, [0, 0.35, 0.7, 1], [0, 0.3, 0.7, 1]);
    const starsOpacity = useTransform(progress, [0, 0.45], [1, 0]);
    const sunY = useTransform(progress, [0, 0.2, 0.5, 0.8, 1], [205, 170, 28, -128, -150]);
    const sunScale = useTransform(progress, [0, 0.5, 1], [0.88, 1.0, 1.12]);
    const glowOpacity = useTransform(progress, [0, 0.6, 1], [0.25, 0.7, 1]);
    const raysOpacity = useTransform(progress, [0, 0.5, 1], [0.03, 0.4, 0.82]);
    const horizonOpacity = useTransform(progress, [0, 0.6, 1], [0.15, 0.6, 1]);
    const horizonScaleX = useTransform(progress, [0, 0.5, 1], [0.6, 1.05, 1.5]);
    const reflectionOpacity = useTransform(progress, [0, 0.3, 1], [0, 0.15, 0.55]);
    const copyOpacity = useTransform(progress, [0, 0.45], [1, 0]);
    const ringOpacity = useTransform(progress, [0, 0.25], [1, 0]);

    return (
        <section
            id="portal"
            className="relative min-h-screen w-full overflow-hidden select-none"
        >
            {/* z0 — deep night sky, always present underneath */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, #070512 0%, #0f0a22 38%, #1b1030 60%, #241433 100%)",
                }}
            />

            {/* z1 — dawn sky, warmed up by progress (concentrated at the horizon) */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: dawnOpacity,
                    background:
                        "linear-gradient(to bottom, #2a1b3d 0%, #6d2f57 32%, #c2536b 50%, #ef8b5d 60%, #ffd9a0 70%, #ffe9c2 100%)",
                }}
            />

            {/* z2 — stars, fading as the sky brightens */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: starsOpacity }}
            >
                {[...Array(75)].map((_, i) => {
                    // Sine-hash scatter so the night sky looks naturally spread.
                    const rand = (n) => {
                        const x = Math.sin(n) * 43758.5453;
                        return x - Math.floor(x);
                    };
                    const left = rand(i + 1) * 100;
                    const top = rand(i * 2.7 + 11) * 62; // upper sky, above the land
                    const size = 0.8 + rand(i * 5.3 + 3) * 1.9;
                    return (
                        <span
                            key={i}
                            className="absolute rounded-full bg-amber-50 animate-twinkle"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                opacity: 0.4 + rand(i * 3.1 + 7) * 0.55,
                                boxShadow: "0 0 3px rgba(255,250,235,0.7)",
                                "--twinkle-duration": `${3 + (i % 5)}s`,
                                animationDelay: `${rand(i + 4) * 4}s`,
                            }}
                        />
                    );
                })}
            </motion.div>

            {/* z3 — the glow along the horizon line, swelling as the sun nears */}
            <motion.div
                className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    opacity: horizonOpacity,
                    scaleX: horizonScaleX,
                    width: "140vw",
                    height: "44vh",
                    background:
                        "radial-gradient(ellipse at center, rgba(255,224,150,0.9) 0%, rgba(255,170,90,0.5) 28%, rgba(255,120,80,0.15) 52%, transparent 70%)",
                    filter: "blur(6px)",
                }}
            />

            {/* z4 — the sun itself, rising from below the horizon */}
            <motion.div
                className="absolute left-1/2 top-[60%] pointer-events-none"
                style={{ x: "-50%", y: sunY, scale: sunScale, willChange: "transform" }}
            >
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                    {/* volumetric rays */}
                    <motion.div
                        className="absolute inset-[-60%] animate-sun-rays"
                        style={{
                            opacity: raysOpacity,
                            background:
                                "conic-gradient(from 0deg, transparent 0deg, rgba(255,221,148,0.55) 4deg, transparent 11deg, transparent 18deg, rgba(255,196,120,0.4) 22deg, transparent 30deg)",
                            maskImage:
                                "radial-gradient(circle, transparent 24%, black 30%, transparent 78%)",
                            WebkitMaskImage:
                                "radial-gradient(circle, transparent 24%, black 30%, transparent 78%)",
                        }}
                    />
                    {/* soft outer bloom */}
                    <motion.div
                        className="absolute inset-[-30%] rounded-full animate-dawn-pulse"
                        style={{
                            opacity: glowOpacity,
                            background:
                                "radial-gradient(circle, rgba(255,236,180,0.85) 0%, rgba(255,180,110,0.4) 45%, transparent 70%)",
                            filter: "blur(12px)",
                        }}
                    />
                    {/* the disc */}
                    <div
                        className="relative w-40 h-40 md:w-52 md:h-52 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle at 50% 45%, #fffef8 0%, #fff0c4 24%, #ffd884 46%, #ff9e57 72%, rgba(255,138,76,0) 78%)",
                            boxShadow:
                                "0 0 80px 20px rgba(255,190,110,0.45), inset 0 0 40px rgba(255,140,70,0.35)",
                        }}
                    />
                </div>
            </motion.div>

            {/* z4.5 — a column of light pooling beneath the sun (reflection on the world) */}
            <motion.div
                className="absolute left-1/2 top-[60%] -translate-x-1/2 pointer-events-none"
                style={{
                    opacity: reflectionOpacity,
                    width: "min(60vw, 420px)",
                    height: "40vh",
                    background:
                        "linear-gradient(to bottom, rgba(255,214,140,0.7), rgba(255,170,100,0.12) 55%, transparent)",
                    filter: "blur(10px)",
                    maskImage: "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
            />

            {/* z5 — the land the sun rises from behind */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, #1a1024 0%, #140b1c 40%, #0c0714 100%)",
                }}
            >
                {/* bright rim light along the crest of the land */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                        opacity: horizonOpacity,
                        background:
                            "linear-gradient(to right, transparent, rgba(255,222,150,0.95) 25%, rgba(255,240,200,1) 50%, rgba(255,222,150,0.95) 75%, transparent)",
                        boxShadow: "0 0 18px rgba(255,210,140,0.8)",
                    }}
                />
            </div>

            {/* z10 — the words, fading as her dawn takes over */}
            <motion.div
                style={{ opacity: copyOpacity }}
                className="absolute top-0 left-0 right-0 pt-[14vh] px-6 flex flex-col items-center text-center pointer-events-none z-10"
            >
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-rose-100/70 uppercase tracking-[0.35em] text-xs md:text-sm mb-5"
                >
                    One more thing
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="font-['Great_Vibes'] text-5xl md:text-7xl text-amber-100 drop-shadow-[0_0_30px_rgba(255,200,120,0.35)] mb-4"
                >
                    Stay with me
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-amber-50/60 font-serif italic max-w-md"
                >
                    Hold on a second. I want to show you where we are now.
                </motion.p>
            </motion.div>

            {/* z20 — the invisible place she presses: right where the sun sleeps */}
            <div
                role="button"
                tabIndex={0}
                aria-label="Press and hold to bring the dawn"
                onPointerDown={startHold}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-20 w-64 h-64 md:w-72 md:h-72 rounded-full cursor-pointer touch-none outline-none flex items-end justify-center pb-6"
                style={{ WebkitTapHighlightColor: "transparent" }}
            >
                {/* a soft breathing halo inviting the first touch — gone once she starts */}
                <motion.span
                    style={{ opacity: ringOpacity }}
                    className="absolute inset-6 rounded-full border border-amber-200/30"
                />
                <motion.span
                    style={{ opacity: ringOpacity }}
                    className="absolute inset-6 rounded-full border border-amber-100/20 animate-dawn-pulse"
                />

                {/* living instruction */}
                <motion.span
                    animate={holding ? { scale: 1.04 } : { scale: 1 }}
                    className="relative z-10 text-amber-50/90 text-xs md:text-sm uppercase tracking-[0.3em] font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
                >
                    {label}
                </motion.span>
            </div>

            {/* z30 — the dawn flare that whites out the world and hands off to the warp */}
            {phase === "complete" && (
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 60%, #fffefb 0%, #fff3d0 35%, #ffd89b 62%, rgba(255,216,155,0) 80%)",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 2.4 }}
                    transition={{ duration: 0.95, ease: "easeIn" }}
                />
            )}
        </section>
    );
}
