import { cn } from "../../lib/utils";

// Sunrise sky backdrop for the present-day chapter: deep dawn gradient,
// fading stars near the top, and a warm sun glow rising from the horizon.
export function DawnBackground({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "relative w-full overflow-hidden",
                "bg-gradient-to-b from-[#2a1b3d] via-[#c2536b] via-40% to-[#ffd9a0]",
                className
            )}
            {...props}
        >
            {/* Fading stars scattered across the dark upper sky */}
            <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none">
                {[...Array(70)].map((_, i) => {
                    // Deterministic pseudo-random scatter (sine hash) so the stars
                    // look naturally spread instead of falling on diagonal lines.
                    const rand = (n) => {
                        const x = Math.sin(n) * 43758.5453;
                        return x - Math.floor(x);
                    };
                    const left = rand(i + 1) * 100;
                    const top = rand(i * 2.7 + 11) * 100; // 0–100% of the upper-half band
                    const size = 0.8 + rand(i * 5.3 + 3) * 1.8;
                    // Brighter up high, fading to nothing as the sky warms toward the horizon.
                    const opacity = Math.max(0, 0.85 - (top / 100) * 0.95);
                    return (
                        <span
                            key={i}
                            className="absolute rounded-full bg-amber-50 animate-twinkle"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                opacity,
                                boxShadow: "0 0 3px rgba(255,250,235,0.8)",
                                "--twinkle-duration": `${3 + (i % 5)}s`,
                                animationDelay: `${rand(i + 4) * 4}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Rising sun glow on the horizon */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 pointer-events-none">
                <div className="w-[140vw] h-[60vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,237,200,0.9),rgba(253,186,116,0.5)_40%,transparent_70%)] animate-dawn-pulse" />
            </div>

            {children}
        </div>
    );
}
