import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import portraitChild from "@/assets/portrait-child-wonder.jpg";
import portraitElder from "@/assets/portrait-elder-joy.jpg";
import portraitMan from "@/assets/portrait-man-awe.jpg";
import portraitWoman from "@/assets/portrait-woman-wonder.jpg";
import portraitSnow from "@/assets/portrait-man-snow.jpg";
import portraitSurprise from "@/assets/portrait-woman-surprise.jpg";
import portraitGratitude from "@/assets/portrait-elder-gratitude.jpg";
import portraitTeen from "@/assets/portrait-teen-excitement.jpg";

const portraits = [
  { src: portraitChild, alt: "Child expressing wonder", style: "rounded-2xl rotate-[-4deg]" },
  { src: portraitElder, alt: "Elder laughing with delight", style: "rounded-full rotate-[3deg]" },
  { src: portraitMan, alt: "Young man in awe", style: "rounded-3xl rotate-[-2deg]" },
  { src: portraitWoman, alt: "Woman looking up in wonder", style: "rounded-2xl rotate-[5deg]" },
  { src: portraitSnow, alt: "Man seeing snow for first time", style: "rounded-full rotate-[-3deg]" },
  { src: portraitSurprise, alt: "Woman in joyful surprise", style: "rounded-2xl rotate-[2deg]" },
  { src: portraitGratitude, alt: "Elder expressing gratitude", style: "rounded-3xl rotate-[-5deg]" },
  { src: portraitTeen, alt: "Teenager lit up with excitement", style: "rounded-full rotate-[4deg]" },
];

const wowWords = [
  { text: "WOW", color: "text-wonder-coral", font: "font-display font-black", size: "text-6xl md:text-8xl", delay: 0 },
  { text: "واو", color: "text-wonder-gold", font: "font-arabic font-bold", size: "text-5xl md:text-7xl", delay: 0.2 },
  { text: "すごい", color: "text-wonder-teal", font: "font-japanese font-bold", size: "text-4xl md:text-6xl", delay: 0.4 },
  { text: "¡Guau!", color: "text-wonder-purple", font: "font-display italic font-bold", size: "text-5xl md:text-7xl", delay: 0.6 },
  { text: "Вау", color: "text-wonder-sky", font: "font-body font-bold", size: "text-5xl md:text-7xl", delay: 0.3 },
  { text: "哇", color: "text-wonder-warm", font: "font-chinese font-bold", size: "text-6xl md:text-8xl", delay: 0.5 },
  { text: "와!", color: "text-wonder-coral", font: "font-korean font-bold", size: "text-4xl md:text-6xl", delay: 0.7 },
  { text: "Uau!", color: "text-wonder-gold", font: "font-display italic font-bold", size: "text-5xl md:text-6xl", delay: 0.1 },
];

// Positions for the collage grid — organic, non-uniform
const portraitPositions = [
  "col-start-1 row-start-1",
  "col-start-3 row-start-1",
  "col-start-2 row-start-2",
  "col-start-4 row-start-2",
  "col-start-1 row-start-3",
  "col-start-3 row-start-3",
  "col-start-2 row-start-4",
  "col-start-4 row-start-4",
];

const wowPositions = [
  "col-start-2 row-start-1 self-center justify-self-center",
  "col-start-4 row-start-1 self-end justify-self-start",
  "col-start-1 row-start-2 self-start justify-self-end",
  "col-start-3 row-start-2 self-center justify-self-center",
  "col-start-2 row-start-3 self-end justify-self-start",
  "col-start-4 row-start-3 self-start justify-self-center",
  "col-start-1 row-start-4 self-center justify-self-center",
  "col-start-3 row-start-4 self-end justify-self-end",
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* SEO */}
      <header className="sr-only">
        <h1>Wonder Companion — Find Awe in Your Daily Life</h1>
      </header>

      <main className="relative min-h-screen flex flex-col">
        {/* Collage area */}
        <div className="flex-1 relative px-4 pt-8 pb-4 md:px-8">
          <div className="grid grid-cols-4 grid-rows-4 gap-3 md:gap-5 max-w-5xl mx-auto h-full min-h-[60vh]">
            {/* Portraits */}
            {portraits.map((p, i) => (
              <motion.div
                key={p.alt}
                className={`${portraitPositions[i]} relative`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <motion.img
                  src={p.src}
                  alt={p.alt}
                  className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover shadow-xl ${p.style}`}
                  animate={{ y: [0, i % 2 === 0 ? -8 : -12, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            ))}

            {/* WOW words scattered */}
            {wowWords.map((w, i) => (
              <motion.span
                key={w.text}
                className={`${wowPositions[i]} ${w.color} ${w.font} ${w.size} select-none pointer-events-none z-10`}
                style={{ ["--rotate" as string]: `${(i % 2 === 0 ? 1 : -1) * (3 + i * 2)}deg` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: 1 }}
                transition={{
                  opacity: { delay: w.delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { delay: w.delay, duration: 0.5, ease: "backOut" },
                }}
              >
                {w.text}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Entry points */}
        <motion.div
          className="relative z-20 px-6 py-10 md:py-14 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-muted-foreground font-body text-lg md:text-xl text-center max-w-md">
            A moment of wonder is waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/session?mode=reflection")}
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-[0.98]"
            >
              Check in with yourself
            </button>
            <button
              onClick={() => navigate("/session?mode=partnership")}
              className="px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-body font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-[0.98]"
            >
              Work through something
            </button>
          </div>

          <p className="text-muted-foreground/60 text-sm font-body mt-2">
            No account needed. Just begin.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
