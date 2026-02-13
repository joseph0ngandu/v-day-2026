import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play, Heart } from "lucide-react";

export function VideoSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id="video"
            ref={sectionRef}
            className="min-h-screen py-24 px-4 bg-zinc-950 text-white flex flex-col items-center justify-center relative overflow-hidden"
        >
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-zinc-950 to-zinc-950" />

            {/* Floating Bokeh Effects */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
                className="absolute top-20 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="max-w-6xl mx-auto w-full z-10 relative">
                {/* Header Group */}
                <motion.div
                    className="mb-16 text-center space-y-4"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-4xl md:text-5xl font-['Great_Vibes'] text-rose-500 mb-2">
                            Timeless Memories
                        </h3>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                            Our Story in Motion.
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-white/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
                    >
                        Every second spent with you is a frame I want to replay forever.
                    </motion.p>
                </motion.div>

                {/* Video Container with Premium Frame */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, rotateX: 20 }}
                    whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
                    className="relative mx-auto max-w-5xl"
                >
                    {/* Glassmorphism Frame / Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-tr from-rose-500/30 to-purple-500/30 rounded-[2rem] blur-xl opacity-70 animate-pulse" />

                    <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black group">
                        {/* Video */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/us.mov" type="video/mp4" />
                            <source src="/us.mov" type="video/quicktime" />
                        </video>

                        {/* Overlay texture for film grain effect */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                        {/* Play Button Overlay (Conceptual - since it's autoplay background, this acts as a 'status' indicator) */}
                        <div className="absolute bottom-8 left-8 flex items-center gap-4 pointer-events-none z-10">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                                <Play className="w-5 h-5 fill-white text-white ml-1 opacity-80" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-rose-300 font-bold tracking-widest uppercase">Now Playing</p>
                                <p className="text-sm text-white font-medium">Us being Us ❤️</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute -bottom-10 -right-10 text-rose-500/10 transform rotate-12"
                >
                    <Heart size={300} strokeWidth={0.5} />
                </motion.div>
            </div>
        </section>
    );
}
