import { motion } from "framer-motion";
import { Heart, Star, Calendar, Music, Coffee } from "lucide-react";
import { RelationshipTimer } from "./RelationshipTimer";

// Generic milestones that fit a 19-month timeline
const milestones = [
    {
        date: "Month 1",
        title: "The Spark",
        description: "When strangers became friends, and friends became something more.",
        icon: <Star className="w-5 h-5 text-white" />
    },
    {
        date: "Month 3",
        title: "Falling",
        description: "Late night calls, shared playlists, and realizing this was real.",
        icon: <Music className="w-5 h-5 text-white" />
    },
    {
        date: "Month 6",
        title: "Growing Stronger",
        description: "Learning each other’s stories, quirks, and dreams.",
        icon: <Coffee className="w-5 h-5 text-white" />
    },
    {
        date: "1 Year",
        title: "365 Days of Us",
        description: "A whole year of memories. Highs, lows, and everything in between.",
        icon: <Calendar className="w-5 h-5 text-white" />
    },
    {
        date: "Month 17",
        title: "Still Choosing You",
        description: "Every single day since then, you’re still my favorite person.",
        icon: <Heart className="w-5 h-5 text-white fill-current" />
    },
];

export function Timeline() {
    return (
        <section id="timeline" className="min-h-screen py-20 px-4 bg-rose-50 overflow-hidden relative">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-rose-800 mb-4">Our Story</h2>
                    <p className="text-rose-500 font-medium tracking-wide uppercase">Rewriting our story every day</p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-200 via-rose-400 to-rose-200 rounded-full" />

                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`flex items-center justify-between mb-16 w-full relative ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } flex-row`}
                        >
                            {/* Content Box - Left on desktop for even, Right for odd */}
                            <div className="w-full pl-16 md:pl-0 md:w-5/12">
                                <div className={`p-6 bg-white rounded-2xl shadow-lg border border-rose-100 hover:shadow-xl transition-shadow relative ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                    }`}>
                                    <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold mb-3">
                                        {item.date}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                                </div>
                            </div>

                            {/* Center Icon */}
                            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                                >
                                    {item.icon}
                                </motion.div>
                            </div>

                            {/* Spacer for desktop layout */}
                            <div className="hidden md:block md:w-5/12" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-12"
                >
                    <RelationshipTimer startDate="2024-08-22T14:34:00" />
                </motion.div>
            </div>
        </section>
    );
}
