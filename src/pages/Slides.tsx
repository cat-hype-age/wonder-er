import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  X,
  Mic,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  Eye,
  Brain,
  Heart,
  Zap,
  Target,
  Users,
  BarChart3,
  Wrench,
  MessageSquare,
  Volume2,
  Image,
  Music,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import portraitChild from "@/assets/portrait-child-wonder.jpg";
import portraitElder from "@/assets/portrait-elder-joy.jpg";
import portraitMan from "@/assets/portrait-man-awe.jpg";
import portraitWoman from "@/assets/portrait-woman-wonder.jpg";
import portraitGolden from "@/assets/portrait-woman-golden.jpg";
import portraitBlue from "@/assets/portrait-man-awe-blue.jpg";

/* ------------------------------------------------------------------ */
/*  Shared components                                                   */
/* ------------------------------------------------------------------ */

const SlideContent = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[1920px] h-[1080px] bg-wonder-navy relative overflow-hidden flex flex-col">
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-soft-light z-[1]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />
    {children}
  </div>
);

const GlowOrb = ({ color, className }: { color: string; className: string }) => (
  <motion.div
    className={`absolute rounded-full blur-[120px] opacity-30 pointer-events-none ${className}`}
    style={{ background: `hsl(var(${color}))` }}
    animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />
);

const SlideSparkles = ({ count = 12, hues = [270, 175, 42] }: { count?: number; hues?: number[] }) => {
  const dots = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      hue: hues[i % hues.length],
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
    })),
    [count, hues]
  );
  return (
    <>
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full pointer-events-none z-[2]"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: `hsl(${d.hue}, 80%, 70%)`,
            boxShadow: `0 0 ${d.size * 3}px hsl(${d.hue}, 90%, 65%)`,
          }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Slide data (desktop 1920x1080)                                     */
/* ------------------------------------------------------------------ */

interface Slide {
  id: string;
  render: () => React.ReactNode;
}

const slides: Slide[] = [
  /* ====== 1. TITLE ====== */
  {
    id: "title",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-purple" className="w-[600px] h-[600px] -top-40 -right-40" />
        <GlowOrb color="--wonder-coral" className="w-[500px] h-[500px] bottom-0 -left-40" />
        <GlowOrb color="--wonder-teal" className="w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <SlideSparkles count={20} hues={[270, 350, 175]} />
        <div className="absolute top-[120px] right-[100px] flex gap-4 opacity-40">
          {[portraitChild, portraitElder, portraitMan, portraitWoman, portraitGolden, portraitBlue].map((src, i) => (
            <motion.div key={i} className="w-[140px] h-[180px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.7 }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="flex-1 flex flex-col justify-center px-[140px] relative z-10">
          <motion.p className="text-wonder-coral font-body text-[28px] tracking-widest uppercase mb-6" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            Center for Humane Technology Hackathon
          </motion.p>
          <motion.h1 className="font-display text-[120px] leading-[1.05] text-wonder-teal mb-8" initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.3, duration: 1 }}>
            Wonder-er
          </motion.h1>
          <motion.p className="text-wonder-teal/60 font-body text-[36px] max-w-[900px] leading-relaxed" initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.7, duration: 0.8 }}>
            An AI voice companion for finding awe in the ordinary
          </motion.p>
          <motion.p className="text-wonder-purple/50 font-body text-[22px] mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            February 14, 2026
          </motion.p>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 2. THE MISSION ====== */
  {
    id: "mission",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-gold" className="w-[500px] h-[500px] top-[-100px] left-[-100px]" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>The Mission</motion.p>
          <motion.h2 className="font-display text-[72px] text-wonder-teal mb-12 leading-tight max-w-[1400px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Build an AI that helps humans find wonder — without diminishing their humanity
          </motion.h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: Heart, label: "Not addictive", desc: "Optimizes for completion & release, not engagement" },
              { icon: Shield, label: "Not diminishing", desc: "Builds human capacity, not AI dependency" },
              { icon: Sparkles, label: "Wonder-generating", desc: "Creates conditions for awe to emerge naturally" },
            ].map((item, i) => (
              <motion.div key={i} className="bg-wonder-navy-light/60 rounded-3xl p-10 border border-wonder-purple/15" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }}>
                <item.icon size={40} className="text-wonder-coral mb-6" />
                <h3 className="font-display text-[32px] text-wonder-teal mb-3">{item.label}</h3>
                <p className="text-wonder-teal/60 font-body text-[22px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 3. THREE LAYERS ====== */
  {
    id: "three-layers",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-teal" className="w-[400px] h-[400px] top-[200px] right-[100px]" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>The Framework</motion.p>
          <motion.h2 className="font-display text-[68px] text-wonder-teal mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Three Layers of Wonder</motion.h2>
          <div className="flex flex-col gap-6">
            {[
              { layer: "INPUT", subtitle: "Pre-requisites", color: "--wonder-teal", desc: "Openness · Curiosity · Presence · Trust · Psychological Safety", who: "Human brings", ai: "AI invites & protects" },
              { layer: "EXPERIENCE", subtitle: "The Wonder State", color: "--wonder-gold", desc: "Playfulness · Creativity · Visceral Response · Awe · Beauty · Questioning", who: "Human + AI co-create", ai: "AI facilitates" },
              { layer: "OUTPUT", subtitle: "Impact", color: "--wonder-coral", desc: "Epiphany · Expansion · Transcendence · Interconnection · Mindfulness", who: "Human receives", ai: "AI reflects & integrates" },
            ].map((item, i) => (
              <motion.div key={i} className="flex items-stretch gap-6 bg-wonder-navy-light/50 rounded-2xl overflow-hidden border border-wonder-purple/10" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                <div className="w-[6px] shrink-0" style={{ background: `hsl(var(${item.color}))` }} />
                <div className="flex-1 py-8 pr-10">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-display text-[36px] font-bold" style={{ color: `hsl(var(${item.color}))` }}>{item.layer}</span>
                    <span className="text-wonder-purple/40 font-body text-[20px]">{item.subtitle}</span>
                  </div>
                  <p className="text-wonder-teal/70 font-body text-[24px] mb-3">{item.desc}</p>
                  <div className="flex gap-8">
                    <span className="text-wonder-purple/50 font-body text-[18px]">👤 {item.who}</span>
                    <span className="text-wonder-purple/50 font-body text-[18px]">🤖 {item.ai}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 4. SESSION ARC ====== */
  {
    id: "session-arc",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-purple" className="w-[600px] h-[600px] bottom-[-200px] left-1/2 -translate-x-1/2" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Session Flow</motion.p>
          <motion.h2 className="font-display text-[68px] text-wonder-teal mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>A Natural Arc</motion.h2>
          <div className="flex items-center gap-4">
            {[
              { phase: "ARRIVAL", icon: Eye, desc: "Check in · Invite presence", color: "--wonder-teal", layer: "Input" },
              { phase: "EXPLORATION", icon: Brain, desc: "Co-create · Wonder prompts · AI notices + reflects", color: "--wonder-gold", layer: "Experience" },
              { phase: "INTEGRATION", icon: Zap, desc: "\"What surprised you?\" · Anchor wonder", color: "--wonder-purple", layer: "Output" },
              { phase: "RELEASE", icon: Heart, desc: "Clean closure · No cliffhangers", color: "--wonder-coral", layer: "Output" },
            ].map((item, i) => (
              <motion.div key={i} className="flex-1 flex flex-col items-center text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center mb-6 border-2" style={{ borderColor: `hsl(var(${item.color}))`, background: `hsl(var(${item.color}) / 0.1)` }}>
                  <item.icon size={48} style={{ color: `hsl(var(${item.color}))` }} />
                </div>
                <h3 className="font-display text-[28px] text-wonder-teal mb-2">{item.phase}</h3>
                <p className="text-wonder-purple/40 font-body text-[16px] mb-3">{item.layer} Layer</p>
                <p className="text-wonder-teal/60 font-body text-[20px] leading-relaxed max-w-[280px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 5. ETHICAL GUARDRAILS ====== */
  {
    id: "ethics",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-coral" className="w-[500px] h-[500px] top-[100px] right-[-100px]" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>CHT Alignment</motion.p>
          <motion.h2 className="font-display text-[68px] text-wonder-teal mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Ethical Guardrails</motion.h2>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            {[
              { dark: "Streaks", wonder: "\"Welcome back\" (no count)" },
              { dark: "Notifications", wonder: "User-initiated only" },
              { dark: "Infinite scroll", wonder: "Natural session endings" },
              { dark: "Variable rewards", wonder: "Consistent presence" },
              { dark: "Social comparison", wonder: "Personal journey only" },
              { dark: "Guilt mechanics", wonder: "Unconditional welcome" },
            ].map((item, i) => (
              <motion.div key={i} className="flex items-center gap-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <div className="w-[240px] text-right">
                  <span className="text-wonder-coral/50 font-body text-[24px] line-through">{item.dark}</span>
                </div>
                <ArrowRight size={24} className="text-wonder-purple/30 shrink-0" />
                <span className="text-wonder-teal font-body text-[24px] font-medium">{item.wonder}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 6. THE EXPERIENCE ====== */
  {
    id: "demo-experience",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-purple" className="w-[600px] h-[600px] top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>The Experience</motion.p>
          <motion.h2 className="font-display text-[68px] text-wonder-teal mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>What a Session Feels Like</motion.h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-8">
              <motion.div className="bg-wonder-navy-light/60 rounded-3xl p-10 border border-wonder-teal/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="font-display text-[36px] text-wonder-teal mb-2">Daily Reflection</h3>
                <p className="text-wonder-purple/50 font-body text-[20px] italic mb-4">"How am I?"</p>
                <p className="text-wonder-teal/60 font-body text-[22px] leading-relaxed">Inward focus · 5–10 min · Finding wonder in the ordinary</p>
              </motion.div>
              <motion.div className="bg-wonder-navy-light/60 rounded-3xl p-10 border border-wonder-coral/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h3 className="font-display text-[36px] text-wonder-coral mb-2">Thought Partnership</h3>
                <p className="text-wonder-purple/50 font-body text-[20px] italic mb-4">"What am I working on?"</p>
                <p className="text-wonder-teal/60 font-body text-[22px] leading-relaxed">Outward focus · 10–20 min · Finding wonder in creative process</p>
              </motion.div>
            </div>
            <div className="flex flex-col gap-6 justify-center">
              {[
                { icon: Mic, label: "Voice-first interaction", desc: "Speak naturally, AI listens deeply" },
                { icon: Volume2, label: "AI speaks back", desc: "Warm, paced voice with breathing room" },
                { icon: Image, label: "Wonder images", desc: "AI generates dreamlike visuals at peak moments" },
                { icon: Music, label: "Ambient soundscapes", desc: "Mood-matched audio environments" },
                { icon: MessageSquare, label: "Live transcript", desc: "Flowing conversation rendered in real-time" },
              ].map((item, i) => (
                <motion.div key={i} className="flex items-center gap-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  <div className="w-[56px] h-[56px] rounded-xl bg-wonder-purple/15 flex items-center justify-center shrink-0">
                    <item.icon size={28} className="text-wonder-purple" />
                  </div>
                  <div>
                    <h4 className="text-wonder-teal font-body text-[22px] font-medium">{item.label}</h4>
                    <p className="text-wonder-teal/50 font-body text-[18px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 7. WONDER PROMPTS ====== */
  {
    id: "wonder-prompts",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-gold" className="w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Conversational Design</motion.p>
          <motion.h2 className="font-display text-[68px] text-wonder-teal mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Wonder Prompts</motion.h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {[
              { technique: "Reframe", example: "\"What if that obstacle is actually the material?\"" },
              { technique: "Scale Shift", example: "\"Zoom out — what does this connect to beyond you?\"" },
              { technique: "Absurdity", example: "\"What's the most ridiculous version of this?\"" },
              { technique: "Embodiment", example: "\"Where do you feel that in your body?\"" },
              { technique: "Noticing", example: "\"You just paused. What happened there?\"" },
              { technique: "Beauty Hunt", example: "\"What's one beautiful thing about this problem?\"" },
              { technique: "Edges", example: "\"What's the part you're avoiding?\"" },
              { technique: "Gratitude Flip", example: "\"What would you miss if it vanished?\"" },
            ].map((item, i) => (
              <motion.div key={i} className="flex items-start gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.08 }}>
                <span className="text-wonder-gold font-display text-[20px] font-bold w-[140px] shrink-0 text-right pt-1">{item.technique}</span>
                <p className="text-wonder-teal/70 font-body text-[22px] italic leading-relaxed">{item.example}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 8. VOICE DESIGN ====== */
  {
    id: "voice-design",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-teal" className="w-[500px] h-[500px] top-[-100px] right-[200px]" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Design Principles</motion.p>
          <motion.h2 className="font-display text-[68px] text-wonder-teal mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Voice & Presence</motion.h2>
          <div className="grid grid-cols-2 gap-10">
            {[
              { title: "Pacing", desc: "Wonder needs breath. Don't rush.", icon: "🌬️" },
              { title: "Silence", desc: "Let pauses exist. Don't fill every gap.", icon: "🔇" },
              { title: "Tone", desc: "Warm but not saccharine. Present but not performative.", icon: "🎵" },
              { title: "Questions > Statements", desc: "Invite, don't lecture.", icon: "❓" },
              { title: "Brevity", desc: "Short responses. Leave room for human.", icon: "✂️" },
              { title: "Agency", desc: "\"You noticed that\" not \"I showed you that.\"", icon: "🪞" },
            ].map((item, i) => (
              <motion.div key={i} className="flex items-start gap-5 bg-wonder-navy-light/40 rounded-2xl p-8 border border-wonder-purple/10" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <span className="text-[36px] shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-display text-[28px] text-wonder-teal mb-2">{item.title}</h3>
                  <p className="text-wonder-teal/60 font-body text-[22px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 9. WHAT'S NEXT ====== */
  {
    id: "whats-next",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-coral" className="w-[500px] h-[500px] top-[-100px] left-[-100px]" />
        <GlowOrb color="--wonder-purple" className="w-[400px] h-[400px] bottom-[-100px] right-[-100px]" />
        <div className="flex-1 flex flex-col justify-center px-[140px]">
          <motion.p className="text-wonder-coral font-body text-[22px] tracking-widest uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Road Ahead</motion.p>
          <motion.h2 className="font-display text-[68px] text-wonder-teal mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>What's Next</motion.h2>
          <div className="flex flex-col gap-6">
            {[
              { icon: CheckCircle2, label: "Test", desc: "End-to-end user testing with diverse participants across both session modes", color: "--wonder-teal" },
              { icon: Wrench, label: "Tune the Model", desc: "Refine system prompts, pacing, wonder prompt frequency, and voice persona calibration", color: "--wonder-gold" },
              { icon: Layers, label: "More Multimodal Experiences", desc: "Video clips, haptic feedback, generative soundscapes, AR wonder moments", color: "--wonder-purple" },
              { icon: Users, label: "Distribute & Gather Feedback", desc: "Beta release to CHT community, collect qualitative and quantitative user stories", color: "--wonder-coral" },
              { icon: BarChart3, label: "Measure", desc: "Pre/post wonder state shifts, session completion rates, long-term capacity building vs. dependency metrics", color: "--wonder-sky" },
            ].map((item, i) => (
              <motion.div key={i} className="flex items-center gap-8 bg-wonder-navy-light/50 rounded-2xl px-10 py-7 border border-wonder-purple/10" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }}>
                <div className="w-[64px] h-[64px] rounded-xl flex items-center justify-center shrink-0" style={{ background: `hsl(var(${item.color}) / 0.15)` }}>
                  <item.icon size={32} style={{ color: `hsl(var(${item.color}))` }} />
                </div>
                <div>
                  <h3 className="font-display text-[32px] text-wonder-teal mb-1">{item.label}</h3>
                  <p className="text-wonder-teal/60 font-body text-[22px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideContent>
    ),
  },

  /* ====== 10. CLOSING ====== */
  {
    id: "closing",
    render: () => (
      <SlideContent>
        <GlowOrb color="--wonder-purple" className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <GlowOrb color="--wonder-teal" className="w-[400px] h-[400px] top-[100px] right-[200px]" />
        <GlowOrb color="--wonder-coral" className="w-[300px] h-[300px] bottom-[100px] left-[200px]" />
        <SlideSparkles count={30} hues={[270, 350, 175, 42, 200]} />
        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
          <motion.h2 className="font-display text-[100px] text-wonder-teal mb-8" initial={{ opacity: 0, scale: 0.8, filter: "blur(16px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            Wonder awaits.
          </motion.h2>
          <motion.p className="text-wonder-teal/50 font-body text-[28px] max-w-[700px] leading-relaxed mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            A moment of awe is waiting for you — not in some extraordinary place, but right here in the ordinary.
          </motion.p>
          <motion.p className="text-wonder-purple/40 font-body text-[20px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            Built with wonder at the CHT Hackathon · No accounts · No data collected · Just presence
          </motion.p>
        </div>
      </SlideContent>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Mobile slide data (card-based, responsive)                         */
/* ------------------------------------------------------------------ */

interface MobileSlideData {
  id: string;
  label: string;
  labelColor: string;
  title: string;
  content: React.ReactNode;
}

const mobileSlides: MobileSlideData[] = [
  {
    id: "title", label: "CHT Hackathon", labelColor: "text-wonder-coral",
    title: "Wonder-er",
    content: (
      <>
        <p className="text-wonder-teal/70 font-body text-base leading-relaxed">An AI voice companion for finding awe in the ordinary</p>
        <div className="flex gap-2 mt-4 opacity-50">
          {[portraitChild, portraitElder, portraitMan, portraitWoman].map((src, i) => (
            <div key={i} className="w-14 h-14 rounded-xl overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p className="text-wonder-purple/50 font-body text-xs mt-4">February 14, 2026</p>
      </>
    ),
  },
  {
    id: "mission", label: "The Mission", labelColor: "text-wonder-coral",
    title: "Build an AI that helps humans find wonder",
    content: (
      <div className="flex flex-col gap-3">
        {[
          { icon: Heart, label: "Not addictive", desc: "Optimizes for completion & release" },
          { icon: Shield, label: "Not diminishing", desc: "Builds human capacity, not dependency" },
          { icon: Sparkles, label: "Wonder-generating", desc: "Conditions for awe to emerge naturally" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-wonder-navy-light/60 rounded-xl p-3 border border-wonder-purple/10">
            <item.icon size={18} className="text-wonder-coral mt-0.5 shrink-0" />
            <div>
              <span className="text-wonder-teal font-body text-sm font-medium">{item.label}</span>
              <p className="text-wonder-teal/60 font-body text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "three-layers", label: "The Framework", labelColor: "text-wonder-coral",
    title: "Three Layers of Wonder",
    content: (
      <div className="flex flex-col gap-3">
        {[
          { layer: "INPUT", color: "border-wonder-teal/30", desc: "Openness · Curiosity · Presence · Trust" },
          { layer: "EXPERIENCE", color: "border-wonder-gold/30", desc: "Playfulness · Creativity · Awe · Beauty" },
          { layer: "OUTPUT", color: "border-wonder-coral/30", desc: "Epiphany · Expansion · Transcendence" },
        ].map((item, i) => (
          <div key={i} className={`rounded-xl p-3 border-l-4 ${item.color} bg-wonder-navy-light/40 pl-4`}>
            <span className="text-wonder-teal font-display text-sm font-bold">{item.layer}</span>
            <p className="text-wonder-teal/60 font-body text-xs mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "session-arc", label: "Session Flow", labelColor: "text-wonder-coral",
    title: "A Natural Arc",
    content: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { phase: "ARRIVAL", icon: Eye, color: "text-wonder-teal" },
          { phase: "EXPLORATION", icon: Brain, color: "text-wonder-gold" },
          { phase: "INTEGRATION", icon: Zap, color: "text-wonder-purple" },
          { phase: "RELEASE", icon: Heart, color: "text-wonder-coral" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center bg-wonder-navy-light/40 rounded-xl p-4 border border-wonder-purple/10">
            <item.icon size={24} className={item.color} />
            <span className="text-wonder-teal font-display text-xs font-bold mt-2">{item.phase}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "ethics", label: "CHT Alignment", labelColor: "text-wonder-coral",
    title: "Ethical Guardrails",
    content: (
      <div className="flex flex-col gap-2">
        {[
          { dark: "Streaks", wonder: "\"Welcome back\"" },
          { dark: "Notifications", wonder: "User-initiated" },
          { dark: "Infinite scroll", wonder: "Natural endings" },
          { dark: "Variable rewards", wonder: "Consistent presence" },
          { dark: "Social comparison", wonder: "Personal journey" },
          { dark: "Guilt mechanics", wonder: "Unconditional welcome" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-body">
            <span className="text-wonder-coral/50 line-through flex-1 text-right text-xs">{item.dark}</span>
            <ArrowRight size={12} className="text-wonder-purple/30 shrink-0" />
            <span className="text-wonder-teal font-medium flex-1 text-xs">{item.wonder}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "demo-experience", label: "The Experience", labelColor: "text-wonder-coral",
    title: "What a Session Feels Like",
    content: (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-wonder-navy-light/60 rounded-xl p-3 border border-wonder-teal/20">
            <span className="text-wonder-teal font-display text-sm">Daily Reflection</span>
            <p className="text-wonder-purple/50 font-body text-xs italic">"How am I?"</p>
          </div>
          <div className="bg-wonder-navy-light/60 rounded-xl p-3 border border-wonder-coral/20">
            <span className="text-wonder-coral font-display text-sm">Thought Partner</span>
            <p className="text-wonder-purple/50 font-body text-xs italic">"What am I working on?"</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { icon: Mic, label: "Voice-first" },
            { icon: Volume2, label: "AI speaks" },
            { icon: Image, label: "Visuals" },
            { icon: Music, label: "Soundscapes" },
            { icon: MessageSquare, label: "Transcript" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-wonder-purple/10 rounded-lg px-2.5 py-1.5">
              <item.icon size={12} className="text-wonder-purple" />
              <span className="text-wonder-teal/70 font-body text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "wonder-prompts", label: "Conversational Design", labelColor: "text-wonder-coral",
    title: "Wonder Prompts",
    content: (
      <div className="flex flex-col gap-2">
        {[
          { t: "Reframe", e: "\"What if that obstacle is actually the material?\"" },
          { t: "Scale Shift", e: "\"Zoom out — what does this connect to beyond you?\"" },
          { t: "Absurdity", e: "\"What's the most ridiculous version of this?\"" },
          { t: "Noticing", e: "\"You just paused. What happened there?\"" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-wonder-gold font-display text-xs font-bold shrink-0 w-16 text-right pt-0.5">{item.t}</span>
            <p className="text-wonder-teal/70 font-body text-xs italic leading-relaxed">{item.e}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "voice-design", label: "Design Principles", labelColor: "text-wonder-coral",
    title: "Voice & Presence",
    content: (
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: "🌬️", title: "Pacing" },
          { icon: "🔇", title: "Silence" },
          { icon: "🎵", title: "Warm Tone" },
          { icon: "❓", title: "Questions > Statements" },
          { icon: "✂️", title: "Brevity" },
          { icon: "🪞", title: "Agency" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-wonder-navy-light/40 rounded-lg p-2.5 border border-wonder-purple/10">
            <span className="text-lg">{item.icon}</span>
            <span className="text-wonder-teal font-body text-xs font-medium">{item.title}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "whats-next", label: "Road Ahead", labelColor: "text-wonder-coral",
    title: "What's Next",
    content: (
      <div className="flex flex-col gap-2">
        {[
          { icon: CheckCircle2, label: "Test with diverse participants", color: "text-wonder-teal" },
          { icon: Wrench, label: "Tune model & voice persona", color: "text-wonder-gold" },
          { icon: Layers, label: "More multimodal experiences", color: "text-wonder-purple" },
          { icon: Users, label: "Distribute & gather feedback", color: "text-wonder-coral" },
          { icon: BarChart3, label: "Measure wonder state shifts", color: "text-wonder-sky" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-wonder-navy-light/50 rounded-xl px-3 py-2.5 border border-wonder-purple/10">
            <item.icon size={16} className={item.color} />
            <span className="text-wonder-teal font-body text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "closing", label: "", labelColor: "",
    title: "Wonder awaits.",
    content: (
      <div className="text-center">
        <p className="text-wonder-teal/60 font-body text-sm leading-relaxed mb-4">
          A moment of awe is waiting for you — right here in the ordinary.
        </p>
        <p className="text-wonder-purple/40 font-body text-xs">
          Built with wonder · No accounts · No data · Just presence
        </p>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Mobile Slides Component                                            */
/* ------------------------------------------------------------------ */

const MobileSlides = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-wonder-navy safe-top safe-bottom relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-[120px] bg-wonder-purple/20" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full blur-[100px] bg-wonder-coral/15" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-20 bg-wonder-navy/80 backdrop-blur-md border-b border-wonder-purple/10 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-wonder-teal/50 hover:text-wonder-teal transition-colors">
          <X size={20} />
        </button>
        <span className="text-wonder-teal font-display text-sm">Wonder-er Deck</span>
        <div className="w-5" />
      </div>

      {/* Scrollable cards */}
      <div className="px-4 py-6 flex flex-col gap-4 relative z-10">
        {mobileSlides.map((slide, i) => (
          <motion.div
            key={slide.id}
            className={`rounded-2xl border border-wonder-purple/15 bg-wonder-navy-light/50 backdrop-blur-sm p-5 shadow-lg shadow-wonder-navy/50 ${
              slide.id === "closing" ? "text-center" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            {slide.label && (
              <p className={`${slide.labelColor} font-body text-[10px] tracking-widest uppercase mb-2`}>
                {slide.label}
              </p>
            )}
            <h2 className={`font-display text-wonder-teal mb-3 ${
              slide.id === "title" ? "text-3xl" : slide.id === "closing" ? "text-2xl" : "text-lg"
            }`}>
              {slide.title}
            </h2>
            {slide.content}
          </motion.div>
        ))}

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Desktop Slides Presenter Component                                 */
/* ------------------------------------------------------------------ */

const DesktopSlides = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const total = slides.length;

  const goNext = useCallback(() => setCurrent((c) => Math.min(c + 1, total - 1)), [total]);
  const goPrev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") {
        if (document.fullscreenElement) document.exitFullscreen();
        else navigate("/");
      }
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFullscreen(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, navigate]);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      setScale(Math.min(w / 1920, h / 1080));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-wonder-navy z-[100] overflow-hidden cursor-none group"
      onClick={(e) => {
        const rect = (e.target as HTMLElement).closest("[data-slide-container]")?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        if (x > rect.width / 2) goNext();
        else goPrev();
      }}
      data-slide-container
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides[current].render()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-auto z-10">
        <button onClick={(e) => { e.stopPropagation(); navigate("/"); }} className="text-wonder-teal/40 hover:text-wonder-teal transition-colors">
          <X size={20} />
        </button>
        <div className="flex items-center gap-4">
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="text-wonder-teal/40 hover:text-wonder-teal transition-colors disabled:opacity-20" disabled={current === 0}>
            <ChevronLeft size={24} />
          </button>
          <span className="text-wonder-teal/40 font-body text-sm tabular-nums">{current + 1} / {total}</span>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="text-wonder-teal/40 hover:text-wonder-teal transition-colors disabled:opacity-20" disabled={current === total - 1}>
            <ChevronRight size={24} />
          </button>
        </div>
        <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="text-wonder-teal/40 hover:text-wonder-teal transition-colors">
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-wonder-navy-light">
        <motion.div className="h-full bg-wonder-coral/60" animate={{ width: `${((current + 1) / total) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main export — switches on screen size                              */
/* ------------------------------------------------------------------ */

const Slides = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSlides /> : <DesktopSlides />;
};

export default Slides;
