import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, Play } from "lucide-react";

import portraitChild from "@/assets/portrait-child-wonder.jpg";
import portraitElder from "@/assets/portrait-elder-joy.jpg";
import portraitMan from "@/assets/portrait-man-awe.jpg";
import portraitWoman from "@/assets/portrait-woman-wonder.jpg";
import portraitSnow from "@/assets/portrait-man-snow.jpg";
import portraitSurprise from "@/assets/portrait-woman-surprise.jpg";
import portraitGratitude from "@/assets/portrait-elder-gratitude.jpg";
import portraitTeen from "@/assets/portrait-teen-excitement.jpg";
import portraitGolden from "@/assets/portrait-woman-golden.jpg";
import portraitBlue from "@/assets/portrait-man-awe-blue.jpg";
import portraitDelight from "@/assets/portrait-girl-delight.jpg";
import portraitMoved from "@/assets/portrait-man-moved.jpg";
import portraitSerene from "@/assets/portrait-elder-serene.jpg";
import portraitAmazed from "@/assets/portrait-man-amazed.jpg";

/* 
  Each portrait is absolutely positioned via percentages for a dense, 
  overlapping, editorial collage feel. Sizes vary for depth.
*/
const portraits = [
  // Large anchors
  { src: portraitChild, alt: "Child wonder", cls: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl rotate-[-4deg]", pos: "top-[6%] left-[2%]", z: 4, delay: 0 },
  { src: portraitGolden, alt: "Woman looking up in golden light", cls: "w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl rotate-[3deg]", pos: "top-[2%] left-[28%] md:left-[22%]", z: 6, delay: 0.1 },
  { src: portraitBlue, alt: "Man in blue-teal awe", cls: "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full rotate-[-2deg]", pos: "top-[4%] right-[18%] md:right-[22%]", z: 5, delay: 0.15 },
  { src: portraitSurprise, alt: "Woman surprised", cls: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl rotate-[5deg]", pos: "top-[3%] right-[0%]", z: 4, delay: 0.2 },

  // Middle row — densest
  { src: portraitDelight, alt: "Girl delighted", cls: "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full rotate-[4deg]", pos: "top-[30%] left-[0%]", z: 7, delay: 0.05 },
  { src: portraitMan, alt: "Man in awe", cls: "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-3xl rotate-[-6deg]", pos: "top-[28%] left-[20%] md:left-[16%]", z: 3, delay: 0.25 },
  { src: portraitMoved, alt: "Man deeply moved", cls: "w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-2xl rotate-[2deg]", pos: "top-[24%] left-[40%] md:left-[36%]", z: 8, delay: 0.08 },
  { src: portraitElder, alt: "Elder laughing", cls: "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full rotate-[-3deg]", pos: "top-[30%] right-[14%] md:right-[18%]", z: 5, delay: 0.18 },
  { src: portraitAmazed, alt: "Man amazed", cls: "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl rotate-[6deg]", pos: "top-[26%] right-[0%]", z: 6, delay: 0.12 },

  // Bottom row
  { src: portraitSerene, alt: "Elder serene", cls: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl rotate-[-5deg]", pos: "top-[52%] left-[4%]", z: 5, delay: 0.22 },
  { src: portraitSnow, alt: "Man seeing snow", cls: "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full rotate-[3deg]", pos: "top-[56%] left-[28%] md:left-[24%]", z: 4, delay: 0.3 },
  { src: portraitWoman, alt: "Woman wondering", cls: "w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-2xl rotate-[-2deg]", pos: "top-[50%] right-[22%] md:right-[26%]", z: 7, delay: 0.14 },
  { src: portraitGratitude, alt: "Elder gratitude", cls: "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full rotate-[4deg]", pos: "top-[54%] right-[2%]", z: 3, delay: 0.28 },
  { src: portraitTeen, alt: "Teen excited", cls: "w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-3xl rotate-[-4deg]", pos: "top-[48%] left-[50%] md:left-[46%]", z: 2, delay: 0.35 },
];

const wowWords = [
  { text: "WOW", color: "text-wonder-coral", font: "font-display font-black", size: "text-5xl md:text-8xl", delay: 0 },
  { text: "واو", color: "text-wonder-gold", font: "font-arabic font-bold", size: "text-4xl md:text-7xl", delay: 0.2 },
  { text: "すごい", color: "text-wonder-teal", font: "font-japanese font-bold", size: "text-3xl md:text-6xl", delay: 0.4 },
  { text: "¡Guau!", color: "text-wonder-purple", font: "font-display italic font-bold", size: "text-4xl md:text-7xl", delay: 0.6 },
  { text: "वाह", color: "text-wonder-sky", font: "font-body font-bold", size: "text-4xl md:text-7xl", delay: 0.3 },
  { text: "哇", color: "text-wonder-warm", font: "font-chinese font-bold", size: "text-5xl md:text-8xl", delay: 0.5 },
  { text: "와!", color: "text-wonder-coral", font: "font-korean font-bold", size: "text-3xl md:text-6xl", delay: 0.7 },
  { text: "Ajabu!", color: "text-wonder-gold", font: "font-display italic font-bold", size: "text-4xl md:text-6xl", delay: 0.1 },
  { text: "ว้าว", color: "text-wonder-teal", font: "font-body font-bold", size: "text-3xl md:text-6xl", delay: 0.35 },
  { text: "Uau!", color: "text-wonder-purple", font: "font-display italic font-bold", size: "text-4xl md:text-6xl", delay: 0.55 },
  { text: "Vay!", color: "text-wonder-sky", font: "font-display font-bold", size: "text-3xl md:text-5xl", delay: 0.45 },
  { text: "Ó!", color: "text-wonder-warm", font: "font-display italic font-black", size: "text-5xl md:text-7xl", delay: 0.65 },
];

const wowPositions = [
  "top-[8%] left-[18%]",
  "top-[12%] right-[8%]",
  "top-[2%] left-[52%]",
  "top-[35%] left-[12%]",
  "top-[40%] right-[6%]",
  "top-[22%] left-[44%]",
  "top-[55%] left-[38%]",
  "top-[18%] right-[32%]",
  "top-[48%] right-[30%]",
  "top-[58%] left-[14%]",
  "top-[44%] left-[56%]",
  "top-[60%] right-[8%]",
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
      {/* Extra warm blob for fullness */}
      <motion.div
        className="absolute top-[55%] left-[-5%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(42 90% 58% / 0.07) 0%, transparent 60%)' }}
        animate={{ x: [0, 15, -10, 0], y: [0, -10, 15, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise/grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-soft-light z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `linear-gradient(hsl(270 50% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(270 50% 55% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <main className="relative min-h-screen flex flex-col z-[2]">
        {/* Collage area — absolutely positioned overlapping portraits */}
        <div className="flex-1 relative px-2 pt-4 md:px-8 md:pt-8 min-h-[62vh]">
          {/* Portraits */}
          {portraits.map((p, i) => (
            <motion.div
              key={p.alt}
              className={`absolute ${p.pos}`}
              style={{ zIndex: p.z }}
              initial={{ opacity: 0, scale: 0.7, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: p.delay + 0.2, duration: 0.7, ease: "easeOut" }}
            >
              <motion.img
                src={p.src}
                alt={p.alt}
                className={`${p.cls} object-cover shadow-2xl shadow-wonder-navy/60 ring-1 ring-white/10`}
                animate={{ y: [0, i % 2 === 0 ? -5 : -8, 0] }}
                transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}

          {/* WOW words scattered over the collage */}
          {wowWords.map((w, i) => (
            <motion.span
              key={w.text}
              className={`absolute ${wowPositions[i]} ${w.color} ${w.font} ${w.size} select-none pointer-events-none drop-shadow-[0_0_18px_currentColor]`}
              style={{ zIndex: 10, ["--rotate" as string]: `${(i % 2 === 0 ? 1 : -1) * (3 + i * 1.5)}deg`, transform: `rotate(var(--rotate))` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.5, 0.9, 0.5], scale: 1 }}
              transition={{
                opacity: { delay: w.delay + 0.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
                scale: { delay: w.delay + 0.3, duration: 0.7, ease: "backOut" },
              }}
            >
              {w.text}
            </motion.span>
          ))}
        </div>

        {/* Bottom gradient — heavy to ground the collage */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-wonder-navy via-wonder-navy/85 to-transparent pointer-events-none z-10" />

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
            <button
              onClick={() => navigate("/demo")}
              className="text-wonder-purple/50 hover:text-wonder-purple transition-colors font-body text-sm flex items-center gap-1.5"
            >
              <Play size={14} />
              Watch the demo
            </button>
            <span className="text-wonder-purple/20">·</span>
            <p className="text-wonder-purple/50 text-sm font-body">
              No account needed
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
