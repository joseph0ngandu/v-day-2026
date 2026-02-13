import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { intervalToDuration } from 'date-fns';

export function RelationshipTimer({ startDate }) {
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const calculateTimeLeft = () => {
            const start = new Date(startDate);
            const end = new Date();

            // Handle edge case where start date is in future (though unlikely here)
            if (end < start) return {};

            const duration = intervalToDuration({ start, end });
            return duration;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft()); // Initial call

        return () => clearInterval(timer);
    }, [startDate]);

    const timerComponents = [];

    // Order keys for display
    const keys = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

    keys.forEach((interval) => {
        if (!timeLeft[interval] && interval === 'years') return; // Hide years if 0

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-2 md:mx-4">
                <span className="text-3xl md:text-5xl font-bold text-rose-600 font-serif">
                    {timeLeft[interval] || 0}
                </span>
                <span className="text-xs md:text-sm text-rose-400 uppercase tracking-widest mt-1">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center py-8 px-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-rose-100 shadow-xl max-w-4xl mx-auto mt-12"
        >
            {timerComponents.length ? timerComponents : <span>Just started!</span>}
        </motion.div>
    );
}
