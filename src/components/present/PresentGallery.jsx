import { motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Camera } from "lucide-react";

// Present-day photos. Drop your real images into /public/assets/present/
// as 1.jpg, 2.jpg, ... Until then each plate shows a warm placeholder.
// Edit the captions freely — they're the museum-label text under each print.
// `ratio` varies the frame height so the hang staggers like a real gallery wall.
const photos = [
    { id: 1, src: "/assets/present/1.jpg", caption: "Her mother's child, just standing there", ratio: "aspect-[4/5]" },
    { id: 2, src: "/assets/present/2.jpg", caption: "Brilliant, and she doesn't even know it", ratio: "aspect-[5/7]" },
    { id: 3, src: "/assets/present/3.jpg", caption: "That look should honestly be illegal", ratio: "aspect-[3/4]" },
    { id: 4, src: "/assets/present/4.jpg", caption: "The blush that ruins me every time", ratio: "aspect-[5/7]" },
    { id: 5, src: "/assets/present/5.jpg", caption: "When you smile, the whole room lifts", ratio: "aspect-[3/4]" },
    { id: 6, src: "/assets/present/6.jpg", caption: "This is the face I think about", ratio: "aspect-[4/5]" },
];

function Plate({ photo, index, onClick }) {
    const [failed, setFailed] = useState(false);
    const num = String(index + 1).padStart(2, "0");

    return (
        <motion.figure
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => !failed && onClick(photo)}
            className={`group ${failed ? "" : "cursor-pointer"}`}
        >
            {/* the print, matted in a thin paper frame with a soft cast shadow */}
            <div className="relative bg-[#fffdf9] p-2 md:p-2.5 shadow-[0_30px_60px_-25px_rgba(120,60,20,0.55)] ring-1 ring-amber-950/5 transition-transform duration-700 group-hover:-translate-y-1.5">
                <div className={`relative overflow-hidden ${photo.ratio}`}>
                    {failed ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 text-amber-700/60">
                            <Camera className="w-9 h-9 mb-3" />
                            <span className="text-[10px] uppercase tracking-[0.3em]">Plate {num}</span>
                        </div>
                    ) : (
                        <>
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                loading="lazy"
                                decoding="async"
                                onError={() => setFailed(true)}
                                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                            />
                            {/* gentle gallery vignette so each print has depth */}
                            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(40,20,10,0.25)]" />
                            {/* a slow sheen that drifts across on hover */}
                            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                        </>
                    )}
                </div>
            </div>

            {/* museum plate label */}
            <figcaption className="mt-5 px-1">
                <div className="flex items-center gap-3">
                    <span className="font-serif text-xs tabular-nums tracking-[0.25em] text-amber-700/70">
                        {num}
                    </span>
                    <span className="h-px flex-1 bg-amber-900/15" />
                </div>
                <p className="mt-2 font-serif italic text-amber-900/75 text-sm md:text-[15px] leading-snug">
                    {photo.caption}
                </p>
            </figcaption>
        </motion.figure>
    );
}

export function PresentGallery() {
    const [selected, setSelected] = useState(null);

    return (
        <section
            id="present-gallery"
            className="relative py-28 md:py-36 px-6 bg-gradient-to-b from-[#fdf6ec] to-[#f6e7d4] overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                {/* editorial, left-aligned header */}
                <div className="mb-16 md:mb-24 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4 mb-7"
                    >
                        <span className="text-[11px] uppercase tracking-[0.4em] text-amber-700/70">
                            Plates 01 — 06
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
                        The way I see you
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="mt-7 font-serif text-amber-900/55 text-lg md:text-xl leading-relaxed"
                    >
                        A handful of frames I keep coming back to. Nothing posed, no occasion. Just you.
                    </motion.p>
                </div>

                {/* asymmetric masonry hang — built from flex columns (not CSS
                    multicol) so Safari never drops the paint as you scroll/hover */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-10">
                    {[0, 1, 2].map((col) => (
                        <div key={col} className="flex-1 flex flex-col gap-10 lg:gap-16">
                            {photos
                                .map((photo, i) => ({ photo, i }))
                                .filter(({ i }) => i % 3 === col)
                                .map(({ photo, i }) => (
                                    <Plate key={photo.id} photo={photo} index={i} onClick={setSelected} />
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selected &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#120a06]/95 p-4 backdrop-blur-md"
                        onClick={() => setSelected(null)}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelected(null);
                            }}
                            className="absolute top-5 right-5 md:top-8 md:right-8 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-[1010] cursor-pointer"
                        >
                            <X size={30} />
                        </button>
                        <motion.figure
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center gap-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-[#fffdf9] p-3 shadow-2xl">
                                <img
                                    src={selected.src}
                                    alt={selected.caption}
                                    className="max-w-full max-h-[78vh] object-contain"
                                />
                            </div>
                            <figcaption className="flex items-center gap-3 text-amber-100/80">
                                <span className="font-serif text-xs tabular-nums tracking-[0.25em]">
                                    {String(photos.findIndex((p) => p.id === selected.id) + 1).padStart(2, "0")}
                                </span>
                                <span className="h-px w-8 bg-amber-100/30" />
                                <span className="font-serif italic text-sm md:text-base">
                                    {selected.caption}
                                </span>
                            </figcaption>
                        </motion.figure>
                    </div>,
                    document.body
                )}
        </section>
    );
}
