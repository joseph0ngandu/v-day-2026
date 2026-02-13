import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const letters = [
    {
        title: "You’re My Favorite Person",
        content: `My love,

If someone asked me what joy looks like, I’d say it looks like you dancing when no one is watching.

You don’t even realize how powerful you are. You’ve been through things that could have made you cold, but instead you chose to be warm. You chose to be kind. You chose to make other people laugh.

I admire that about you more than you know.

You’re small in height but huge in heart. And I don’t just love you — I respect you.

Thank you for being you.`
    },
    {
        title: "The Way You Move",
        content: `Hey dancer,

I swear, when you move, the whole world pauses for a second. It’s like happiness has a physical form.

I love that you don’t need a stage. You don’t need attention. You just feel the music and let it take you.

Watching you be free like that makes me fall for you all over again.

Keep dancing. I’ll always be your biggest fan.`
    },
    {
        title: "You’re Safe With Me",
        content: `My love,

I know life hasn’t always been gentle with you.

But I want you to know something clearly: with me, you are safe. Safe to laugh loudly. Safe to cry if you need to. Safe to dream big.

I’m not here to add chaos to your life. I’m here to add peace.

You deserve softness. You deserve consistency. You deserve love that doesn’t confuse you.

And I choose you — calmly, confidently, and completely.`
    },
    {
        title: "Future Us",
        content: `Imagine us years from now.

You’re still dancing in the kitchen. I’m still staring at you like I just met you.

We’ve grown. We’ve built. We’ve won.

But the best thing I’ll ever build is a life where you feel loved every single day.

I don’t just want moments with you. I want a story with you.`
    },
    {
        title: "You Don’t Even Realize",
        content: `I don’t think you understand what you do to me.

You’ll just be existing — talking, laughing, being dramatic for no reason — and I’ll just sit there thinking, “Yeah. That’s my girl.”

It’s not even about big moments. It’s the small ones. The random voice notes. The way you say my name. The way you act tough but still want attention.

I like you. Not just love you. I genuinely like you as a person.

And that’s dangerous… because it means I’m not going anywhere.`
    },
    {
        title: "You’re Different",
        content: `I’ve met a lot of people in my life.

But you? You feel different.

You don’t force anything. You don’t beg for attention. You’re just naturally you — and somehow that’s enough to stand out.

You have this quiet strength about you. Even when you don’t see it.

And I promise you — I see you. Fully.

And I still choose you.`
    },
    {
        title: "Peace",
        content: `You know what’s crazy?

You’re fun. You’re funny. You can be chaotic.

But somehow… you’re also my peace.

Being around you doesn’t feel heavy. It doesn’t feel forced. It feels easy.

And in a world where everything is loud and complicated, you being my calm is something I’ll never take lightly.

Thank you for being a safe place I didn’t even know I needed.`
    },
    {
        title: "If I’m Honest",
        content: `If I’m honest…

I didn’t expect to care about you this much.

But here I am.

Caring about your day. Caring about your mood. Caring about what makes you smile.

I catch myself wanting to protect you, motivate you, build with you.

Not because I have to.

But because I want to.`
    },
    {
        title: "I’m Proud of You",
        content: `I don’t say this enough.

I’m proud of you.

Proud of how you handle things. Proud of how you keep going. Proud of how you don’t let your past define your future.

You deserve someone who sees that.

And I do.`
    },
    {
        title: "Your Laugh",
        content: `My love,

Your laugh does something to me.

Not just the sound of it — but what it represents. It means you’re relaxed. It means you feel safe enough to be yourself. It means you’re happy in that moment.

And if I can be part of the reason you laugh like that, then I’m doing something right.

I’ll always protect that sound.`
    },
    {
        title: "The Little Things",
        content: `I don’t think you realize how much the little things matter.

The random messages.
The small check-ins.
The way you remember tiny details about me.

It’s not loud. It’s not dramatic.

It’s just consistent.

And consistency is rare.
That’s why I value you.`
    },
    {
        title: "When It’s Hard",
        content: `Not every month is perfect.
Not every day is easy.

But I love how we don’t run when things get uncomfortable.
We talk. We adjust. We grow.

That tells me this isn’t fragile.
This is real.

And real is what I want.`
    },
    {
        title: "You Deserve More",
        content: `Sometimes I just look at you and think — you deserve more softness than life has given you.

More reassurance.
More calm.
More love without conditions.

I may not be perfect, but I promise you this —
I will always try to be better for you.`
    },
    {
        title: "My Person",
        content: `Out of everyone in this world, you became my person.

The one I tell things first.
The one I think about randomly during the day.
The one I want to share wins with.

That’s not small.

That’s special.`
    },
    {
        title: "Steady",
        content: `I love how steady we are.

Not rushed.
Not chaotic.
Not confusing.

Just two people choosing each other calmly.

That kind of love ages well.`
    },
    {
        title: "Your Strength",
        content: `You don’t always talk about what you’ve handled.

But I see it.

I see the strength in you.
The quiet resilience.
The way you keep going even when it’s heavy.

You inspire me more than you know.`
    },
    {
        title: "I Notice",
        content: `I notice the effort you put in.

I notice when you try.
I notice when you hold back instead of reacting.
I notice when you show up even when you’re tired.

You are not invisible to me.`
    },
    {
        title: "Still Here",
        content: `After all this time, I’m still here.

Not because it’s easy.
Not because it’s convenient.

But because you matter to me.

And that hasn’t changed.`
    },
    {
        title: "Valentine’s",
        content: `Every month with you built something.

Trust.
Comfort.
Memories.
Understanding.

So today isn’t just about romance.

It’s about appreciation.

Thank you for walking this journey with me.

I don’t take it lightly.`
    }
];

export function LoveLetter() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextLetter = () => {
        setCurrentIndex((prev) => (prev + 1) % letters.length);
    };

    const prevLetter = () => {
        setCurrentIndex((prev) => (prev - 1 + letters.length) % letters.length);
    };

    return (
        <section id="letter" className="min-h-screen py-20 px-4 flex items-center justify-center relative bg-[#fff0f5] overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
            </div>

            <div className="max-w-3xl w-full relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-rose-800 mb-4">Notes for You</h2>
                    <p className="text-rose-500 font-medium">Letter {currentIndex + 1} of {letters.length}</p>
                </div>

                <div className="relative h-[600px] md:h-[500px] perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, rotateY: 90, x: 100 }}
                            animate={{ opacity: 1, rotateY: 0, x: 0 }}
                            exit={{ opacity: 0, rotateY: -90, x: -100 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 bg-white shadow-2xl rounded-lg p-8 md:p-12 rotate-1 paper-texture flex flex-col justify-center"
                        >
                            {/* Tape effect */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-200/50 rotate-2 backdrop-blur-sm" />

                            <h3 className="text-2xl font-serif text-rose-700 mb-6 border-b-2 border-rose-100 pb-2 inline-block">
                                {letters[currentIndex].title}
                            </h3>

                            <div className="font-serif text-lg leading-relaxed text-gray-700 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-rose-200 pr-2">
                                {letters[currentIndex].content.split(" ").map((word, index) => (
                                    <motion.span
                                        key={`${currentIndex}-${index}`}
                                        style={{ display: "inline-block", marginRight: "5px" }}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.02,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                    >
                                        {word === "\n" ? <br /> : word}
                                    </motion.span>
                                ))}
                            </div>

                            <div className="absolute bottom-4 right-6 text-rose-300 text-sm italic flex items-center gap-1">
                                With all my love <Heart className="w-4 h-4 fill-current text-rose-400" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center gap-8 mt-12">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevLetter}
                        className="p-4 rounded-full bg-white shadow-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            // Heart beat animation on click
                        }}
                        className="p-4 rounded-full bg-rose-500 shadow-lg text-white"
                    >
                        <Heart size={24} fill="currentColor" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextLetter}
                        className="p-4 rounded-full bg-white shadow-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                        <ChevronRight size={24} />
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
