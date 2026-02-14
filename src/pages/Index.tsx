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
const portraitImages = [
  portraitChild, portraitGolden, portraitBlue, portraitSurprise,
  portraitDelight, portraitMan, portraitMoved, portraitElder,
  portraitAmazed, portraitSerene, portraitSnow, portraitWoman,
  portraitGratitude, portraitTeen,
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

      <main className="relative min-h-screen flex flex-col items-center justify-center z-[2]">
        {/* Repeating portrait grid behind everything */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 p-3 opacity-40">
            {Array.from({ length: 42 }).map((_, i) => {
              const src = portraitImages[i % portraitImages.length];
              return (
                <motion.div
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i % 14) * 0.05 + 0.2, duration: 0.6 }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
              );
            })}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-wonder-navy/50 via-wonder-navy/65 to-wonder-navy/85" />
        </div>

        {/* WOW words scattered */}
        {wowWords.map((w, i) => (
          <motion.span
            key={w.text}
            className={`absolute ${wowPositions[i]} ${w.color} ${w.font} ${w.size} select-none pointer-events-none drop-shadow-[0_0_18px_currentColor]`}
            style={{ zIndex: 3, ["--rotate" as string]: `${(i % 2 === 0 ? 1 : -1) * (3 + i * 1.5)}deg`, transform: `rotate(var(--rotate))` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: 1 }}
            transition={{
              opacity: { delay: w.delay + 0.6, duration: 5, repeat: Infinity, ease: "easeInOut" },
              scale: { delay: w.delay + 0.3, duration: 0.7, ease: "backOut" },
            }}
          >
            {w.text}
          </motion.span>
        ))}

        {/* Entry points — centered over the pattern */}
        <motion.div
          className="relative z-20 px-6 py-10 md:py-14 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
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
