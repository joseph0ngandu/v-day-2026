import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Letters for the present-day chapter — sincere, sentimental, written to her now.
// Presented as a curated correspondence: an index of titles on the left, the open
// letter on a sheet of warm stationery on the right.
const letters = [
    {
        title: "The one I get to see",
        content: `There's a version of you the world gets to see, and then there's the one I get to witness.

The quiet brilliance. The way your mind runs three steps ahead, catching things no one else does. You are beautiful, and not only the kind that turns a room. It's in how you carry yourself, how you think, how you love even when it costs you something.

I don't know how I got to be the one who sees you this closely. But I never want to stop looking.`,
    },
    {
        title: "I'm proud of you",
        content: `I need you to know that I see how hard you've been working on yourself.

I see you growing softer in the places that needed gentleness, stronger in the places that needed steel. You become more yourself every single day, and it takes my breath away.

I am so proud of you. Proud to know you. Proud of the woman you are choosing to become. And quietly, I'm proud that I get a front-row seat to it.`,
    },
    {
        title: "Becoming your calm",
        content: `I've been doing my own growing too.

I'm learning to be steady, to be the kind of man you can lean the whole weight of yourself against and trust the ground will hold. I want to carry what's mine to carry, so you never have to brace yourself around me again.

I want you soft. I want you free. I want you so safe in being loved that you forget what it felt like to guard your heart. Let me be the calm, you just be you.`,
    },
    {
        title: "However long it takes",
        content: `We're not where we started. We're not quite where we're going either. We're somewhere in between, talking, healing, finding our way back to each other one honest day at a time.

And through all of it, the one thing I'm sure of is this: I love you. Not the rushed, prove-it kind of love. The patient kind. The kind willing to do the work and wait for the right thing.

I'm not asking you for anything, I just needed you to know that you are loved deeply, carefully, completely.

However long it takes. Always.`,
    },
];

export function PresentLetters() {
    const [active, setActive] = useState(0);
    const num = (i) => String(i + 1).padStart(2, "0");

    return (
        <section
            id="present-letter"
            className="relative py-28 md:py-40 px-6 bg-gradient-to-b from-[#efd7bb] to-[#fff7ed] overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                {/* editorial header */}
                <div className="mb-14 md:mb-20 max-w-2xl">
                    <div className="flex items-center gap-4 mb-7">
                        <span className="text-[11px] uppercase tracking-[0.4em] text-amber-700/70">
                            Letters · {num(active)} — {num(letters.length - 1)}
                        </span>
                        <span className="h-px w-16 bg-amber-900/20" />
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="font-['Great_Vibes'] text-6xl md:text-8xl text-amber-800 leading-[0.9]"
                    >
                        From me, to you
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16 items-start">
                    {/* the index of letters — a clean vertical list on every size */}
                    <ol className="flex flex-col shrink-0">
                        {letters.map((l, i) => (
                            <li key={i}>
                                <button
                                    type="button"
                                    onClick={() => setActive(i)}
                                    className="group relative flex w-full items-baseline gap-4 py-4 lg:py-5 border-b border-amber-900/10 text-left"
                                >
                                    {/* active marker */}
                                    <span
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-amber-700 transition-opacity duration-300 ${
                                            i === active ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                    <span
                                        className={`pl-4 text-xs tabular-nums tracking-[0.25em] transition-colors ${
                                            i === active ? "text-amber-700" : "text-amber-700/50"
                                        }`}
                                    >
                                        {num(i)}
                                    </span>
                                    <span
                                        className={`font-['Playfair_Display'] text-xl md:text-2xl transition-opacity duration-300 ${
                                            i === active
                                                ? "text-amber-900 opacity-100"
                                                : "text-amber-900 opacity-45 group-hover:opacity-75"
                                        }`}
                                    >
                                        {l.title}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ol>

                    {/* the open letter */}
                    <div className="relative min-h-[520px] md:min-h-[460px]">
                        <AnimatePresence mode="wait">
                            <motion.article
                                key={active}
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="relative bg-[#fffdf8] paper-texture-warm border border-amber-900/10 shadow-[0_40px_90px_-35px_rgba(120,60,20,0.5)] p-8 md:p-14"
                            >
                                <span className="block text-[11px] uppercase tracking-[0.35em] text-amber-600/70 mb-5">
                                    Letter {num(active)}
                                </span>
                                <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl text-amber-900 mb-8">
                                    {letters[active].title}
                                </h3>
                                <div className="font-['Playfair_Display'] text-lg md:text-xl leading-[1.85] text-stone-700 whitespace-pre-line first-letter:float-left first-letter:font-['Playfair_Display'] first-letter:text-6xl first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-700">
                                    {letters[active].content}
                                </div>
                                <div className="mt-10 pt-6 border-t border-amber-900/10">
                                    <span className="font-['Great_Vibes'] text-3xl md:text-4xl text-amber-700">
                                        With all my love
                                    </span>
                                </div>
                            </motion.article>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
