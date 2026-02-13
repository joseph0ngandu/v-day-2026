import { motion } from "framer-motion";
import { useState } from "react";
import { X, Heart } from "lucide-react";

const photos = [
    { id: 1, src: "/assets/gallery/1.jpg", alt: "Us 1" },
    { id: 2, src: "/assets/gallery/2.jpg", alt: "Us 2" },
    { id: 3, src: "/assets/gallery/3.jpg", alt: "Us 3" },
    { id: 4, src: "/assets/gallery/4.jpg", alt: "Us 4" },
    { id: 5, src: "/assets/gallery/5.jpg", alt: "Us 5" },
    { id: 6, src: "/assets/gallery/6.jpg", alt: "Us 6" },
    { id: 7, src: "/assets/gallery/7.jpg", alt: "Us 7" },
    { id: 8, src: "/assets/gallery/8.jpg", alt: "Us 8" },
    { id: 9, src: "/assets/gallery/9.jpg", alt: "Us 9" },
    { id: 10, src: "/assets/gallery/10.jpg", alt: "Us 10" },
];

const PhotoCard = ({ photo, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05, y: -10 }}
        className="relative flex-shrink-0 w-[280px] h-[380px] rounded-2xl overflow-hidden cursor-pointer shadow-xl mx-4 group"
        onClick={() => onClick(photo)}
    >
        <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Heart className="w-12 h-12 text-white fill-current drop-shadow-lg" />
        </div>
    </motion.div>
);

export function Gallery() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <section id="gallery" className="py-20 bg-[#fff0f5] relative overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-['Great_Vibes'] text-rose-600 mb-4"
                >
                    Endless Memories
                </motion.h2>
                <p className="text-gray-500 font-serif italic">Forever grateful for every memory.</p>
            </div>

            {/* Infinite Marquee */}
            <div className="relative w-full overflow-hidden py-10">
                {/* Gradient Masks for fade effect */}
                <div className="absolute top-0 left-0 w-8 md:w-32 h-full z-10 bg-gradient-to-r from-[#fff0f5] to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 md:w-32 h-full z-10 bg-gradient-to-l from-[#fff0f5] to-transparent pointer-events-none" />

                <div className="flex w-max">
                    <motion.div
                        className="flex"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40, // Slower speed for more photos
                            repeatType: "loop"
                        }}
                    >
                        {/* Tripling the array to ensure smooth loop with wider screens */}
                        {[...photos, ...photos, ...photos].map((photo, index) => (
                            <PhotoCard key={`${photo.id}-${index}`} photo={photo} onClick={setSelectedPhoto} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhoto(null);
                        }}
                        className="fixed top-6 right-6 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 z-[110] cursor-pointer"
                    >
                        <X size={36} />
                    </button>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </div>
            )}
        </section>
    );
}
