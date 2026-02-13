import { motion } from "framer-motion";

export function IntroLetter() {
    return (
        <section id="about" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
                    A Love Letter
                </h3>

                <div className="space-y-6 text-xl md:text-2xl font-serif leading-relaxed text-gray-800">
                    <p>
                        From the moment we met, you've filled my life with joy and adventure.
                        Every day is beautiful with you by my side. I cherish every laugh and every moment we share.
                    </p>
                    <p>
                        Thank you for always supporting me, loving me, and making me feel special.
                        I hope this little website puts a smile on your face like you always do for me.
                        Happy Valentine’s Day, my love.
                    </p>
                </div>

                <div className="mt-12">
                    {/* Signature representation */}
                    <svg width="150" height="60" viewBox="0 0 200 80" className="text-gray-900 fill-current stroke-current" style={{ fill: 'none', strokeWidth: 2 }}>
                        <path d="M10,40 Q30,10 50,40 T90,40 T130,40 T170,40" stroke="black" strokeWidth="2" fill="none" />
                        {/* Abstract signature squiggle */}
                        <path d="M20,45 C40,20 60,60 80,30 S120,60 150,35" stroke="black" strokeWidth="2" fill="none" />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}
