import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

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
  { text: "वाह", color: "text-wonder-sky", font: "font-body font-bold", size: "text-5xl md:text-7xl", delay: 0.3 },
  { text: "哇", color: "text-wonder-warm", font: "font-chinese font-bold", size: "text-6xl md:text-8xl", delay: 0.5 },
  { text: "와!", color: "text-wonder-coral", font: "font-korean font-bold", size: "text-4xl md:text-6xl", delay: 0.7 },
  { text: "Ajabu!", color: "text-wonder-gold", font: "font-display italic font-bold", size: "text-5xl md:text-6xl", delay: 0.1 },
  { text: "ว้าว", color: "text-wonder-teal", font: "font-body font-bold", size: "text-4xl md:text-6xl", delay: 0.35 },
  { text: "Uau!", color: "text-wonder-purple", font: "font-display italic font-bold", size: "text-5xl md:text-6xl", delay: 0.55 },
];

const portraitPositions = [
  "col-start-1 row-start-1",
  "col-start-3 row-start-1",
  "col-start-5 row-start-1",
  "col-start-2 row-start-2",
  "col-start-4 row-start-2",
  "col-start-1 row-start-3",
  "col-start-3 row-start-3",
  "col-start-5 row-start-3",
];

const wowPositions = [
  "col-start-2 row-start-1 self-center justify-self-center",
  "col-start-4 row-start-1 self-end justify-self-start",
  "col-start-1 row-start-2 self-start justify-self-end",
  "col-start-3 row-start-2 self-center justify-self-center",
  "col-start-5 row-start-2 self-end justify-self-start",
  "col-start-2 row-start-3 self-start justify-self-center",
  "col-start-4 row-start-3 self-center justify-self-center",
  "col-start-1 row-start-1 self-end justify-self-start",
  "col-start-3 row-start-3 self-end justify-self-end",
  "col-start-5 row-start-3 self-start justify-self-end",
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-h-[100dvh] bg-wonder-navy overflow-hidden relative safe-top safe-bottom">
      {/* SEO */}
      <header className="sr-only">
        <h1>Wonder Companion — Find Awe in Your Daily Life</h1>
      </header>

      {/* === TEXTURE LAYERS === */}
      {/* Animated colorful gradient blobs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(350 72% 55% / 0.15) 0%, transparent 70%)' }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[10%] right-[-15%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(270 50% 55% / 0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, -25, 15, 0], y: [0, 25, -10, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[20%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(175 45% 45% / 0.1) 0%, transparent 65%)' }}
        animate={{ x: [0, 20, -15, 0], y: [0, -15, 20, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(42 90% 58% / 0.08) 0%, transparent 60%)' }}
        animate={{ x: [0, -10, 20, 0], y: [0, 15, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[30%] w-[30vw] h-[30vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(200 70% 55% / 0.1) 0%, transparent 65%)' }}
        animate={{ x: [0, 15, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.08, 0.92, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise/grain texture overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-soft-light z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Subtle grid lines for structure */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `linear-gradient(hsl(270 50% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(270 50% 55% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <main className="relative min-h-screen flex flex-col z-[2]">
        {/* Collage area */}
        <div className="flex-1 relative px-4 pt-8 pb-4 md:px-8">
          <div className="grid grid-cols-5 grid-rows-3 gap-4 md:gap-6 max-w-6xl mx-auto h-full min-h-[55vh]">
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
                  className={`w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-cover shadow-2xl ring-1 ring-white/10 ${p.style}`}
                  animate={{ y: [0, i % 2 === 0 ? -6 : -10, 0] }}
                  transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            ))}

            {/* WOW words scattered */}
            {wowWords.map((w, i) => (
              <motion.span
                key={w.text}
                className={`${wowPositions[i]} ${w.color} ${w.font} ${w.size} select-none pointer-events-none z-10 drop-shadow-[0_0_15px_currentColor]`}
                style={{ ["--rotate" as string]: `${(i % 2 === 0 ? 1 : -1) * (3 + i * 2)}deg` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
                transition={{
                  opacity: { delay: w.delay + 0.5, duration: 5, repeat: Infinity, ease: "easeInOut" },
                  scale: { delay: w.delay, duration: 0.7, ease: "backOut" },
                }}
              >
                {w.text}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-wonder-navy via-wonder-navy/80 to-transparent pointer-events-none z-10" />

        {/* Entry points */}
        <motion.div
          className="relative z-20 px-6 py-10 md:py-14 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-wonder-teal/70 font-body text-lg md:text-xl text-center max-w-md">
            A moment of wonder is waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/session?mode=reflection")}
              className="px-8 py-4 rounded-full bg-wonder-coral text-white font-body font-semibold text-lg shadow-lg shadow-wonder-coral/20 hover:shadow-xl hover:shadow-wonder-coral/30 transition-all hover:scale-105 active:scale-[0.98]"
            >
              Check in with yourself
            </button>
            <button
              onClick={() => navigate("/session?mode=partnership")}
              className="px-8 py-4 rounded-full bg-wonder-teal text-white font-body font-semibold text-lg shadow-lg shadow-wonder-teal/20 hover:shadow-xl hover:shadow-wonder-teal/30 transition-all hover:scale-105 active:scale-[0.98]"
            >
              Work through something
            </button>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <p className="text-wonder-purple/50 text-sm font-body">
              No account needed. Just begin.
            </p>
            <button
              onClick={() => navigate("/settings")}
              className="text-wonder-purple/30 hover:text-wonder-purple/60 transition-colors"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
