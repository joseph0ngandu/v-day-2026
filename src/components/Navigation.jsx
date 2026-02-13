import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "../lib/utils";

export function Navigation() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 p-6"
        >
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <motion.div
                    className="flex items-center gap-1 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    <h1 className="text-4xl font-['Great_Vibes'] text-rose-600" style={{ fontFamily: "'Great Vibes', cursive" }}>J & T</h1>
                </motion.div>

                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                    {["Home", "Gallery", "Letter"].map((item, index) => (
                        <motion.a
                            key={item}
                            href={item === "Home" ? "#hero" : `#${item.toLowerCase()}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ color: "black" }}
                            className="hover:text-black transition-colors"
                        >
                            {item}
                        </motion.a>
                    ))}
                </div>
            </nav>
        </motion.header>
    );
}
