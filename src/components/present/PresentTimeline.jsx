import { motion } from "framer-motion";

// The growth arc — both of us becoming better, and finding our way back.
// Presented as an editorial sequence of "movements" rather than a card timeline.
const movements = [
    {
        tag: "Quietly",
        title: "We did the work",
        body: "Apart, in our own ways, we both started healing, looking inward, learning, growing into people who could love each other better.",
    },
    {
        tag: "Day by day",
        title: "I'm stepping up",
        body: "Learning to lead with patience and steadiness. To be the calm you can build a life beside, the man who carries what's his to carry.",
    },
    {
        tag: "And you",
        title: "You're blooming",
        body: "I watch you soften and strengthen at the very same time, stepping fully into yourself, growing, glowing, becoming the best version of you.",
    },
    {
        tag: "Right now",
        title: "Finding our way back",
        body: "We're talking again. Honest, unhurried, real. Not rushing it, just letting something true find its footing. And I'm here for all of it.",
    },
];

export function PresentTimeline() {
    return (
        <section
            id="present-timeline"
            className="relative py-28 md:py-40 px-6 bg-gradient-to-b from-[#f6e7d4] to-[#efd7bb] overflow-hidden"
        >
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-24">
                {/* sticky editorial title */}
                <div className="lg:sticky lg:top-32 self-start">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4 mb-7"
                    >
                        <span className="text-[11px] uppercase tracking-[0.4em] text-amber-700/70">
                            The growing
                        </span>
                        <span className="h-px w-16 bg-amber-900/20" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="font-['Great_Vibes'] text-6xl md:text-8xl text-amber-800 leading-[0.9]"
                    >
                        Becoming
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="mt-7 font-serif text-amber-900/55 text-lg leading-relaxed max-w-sm"
                    >
                        Two people doing the quiet work it takes to get love right. This is where we are.
                    </motion.p>
                </div>

                {/* the movements */}
                <ol className="relative">
                    {movements.map((m, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 44 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                            className="relative border-t border-amber-900/15 py-9 md:py-11 first:border-t-0 first:pt-0"
                        >
                            <div className="flex items-baseline gap-5 md:gap-8">
                                <span className="font-['Playfair_Display'] text-3xl md:text-5xl text-amber-700/35 tabular-nums leading-none shrink-0">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <span className="block text-[11px] uppercase tracking-[0.35em] text-amber-600/70 mb-3">
                                        {m.tag}
                                    </span>
                                    <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-amber-900 mb-4">
                                        {m.title}
                                    </h3>
                                    <p className="font-serif text-amber-900/65 text-base md:text-lg leading-relaxed max-w-xl">
                                        {m.body}
                                    </p>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
