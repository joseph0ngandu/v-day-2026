import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function FloatingHearts() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts(current => {
                const newHeart = {
                    id: Date.now(),
                    x: Math.random() * 100,
                    scale: Math.random() * 0.5 + 0.5,
                    duration: Math.random() * 10 + 10,
                };
                // Keep only last 20 hearts to avoid performance issues
                return [...current.slice(-19), newHeart];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map(heart => (
                <motion.div
                    key={heart.id}
                    initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0, scale: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 1, 1, 0],
                        scale: [0, heart.scale, heart.scale, 0],
                        x: [`${heart.x}vw`, `${heart.x + (Math.random() * 20 - 10)}vw`]
                    }}
                    transition={{
                        duration: heart.duration,
                        ease: [0.45, 0.05, 0.55, 0.95],
                        times: [0, 0.1, 0.9, 1],
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    style={{
                        filter: "blur(1px)",
                    }}
                    className="absolute text-rose-300/40"
                >
                    <Heart className="w-12 h-12 fill-current" />
                </motion.div>
            ))}
        </div>
    );
}
