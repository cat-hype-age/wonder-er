import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, X, RotateCcw } from "lucide-react";
import WonderPageBackground from "@/components/WonderPageBackground";

type BubbleRole = "ai" | "human" | "stage";

interface DemoBeat {
  role: BubbleRole;
  text: string;
  /** ms to wait after this beat before advancing */
  pause: number;
}

interface DemoScene {
  phase: string;
  phaseColor: string;
  label: string;
  beats: DemoBeat[];
}

const SCENES: DemoScene[] = [
  {
    phase: "ARRIVE",
    phaseColor: "text-wonder-teal",
    label: "The session begins with presence",
    beats: [
      { role: "stage", text: "You open Wonder. No login. No streak count. Just a breathing orb waiting for you.", pause: 4000 },
      { role: "ai", text: "Hey. What would you like to experience today?", pause: 3500 },
      { role: "human", text: "Honestly... kind of scattered. Long day. I don't even know why I opened this.", pause: 4000 },
      { role: "ai", text: "That's a perfectly fine reason to be here. Scattered is just another word for open in a lot of directions. What's pulling at you most?", pause: 5000 },
      { role: "human", text: "Work stuff, mostly. I have this project that's due and I keep avoiding the hard part.", pause: 4000 },
    ],
  },
  {
    phase: "EXPLORE",
    phaseColor: "text-wonder-gold",
    label: "Wonder prompts woven naturally into conversation",
    beats: [
      { role: "stage", text: "The AI doesn't fix or coach. It gets curious.", pause: 3000 },
      { role: "ai", text: "The hard part. What makes it hard — is it that you don't know how, or that you know how and it scares you?", pause: 5000 },
      { role: "human", text: "...huh. I think it's the second one. I know what to do. I just don't want to be wrong about it.", pause: 4500 },
      { role: "stage", text: "✦ Wonder prompt: Reframe — seeing the obstacle differently", pause: 3000 },
      { role: "ai", text: "What if being wrong about it is actually the interesting part?", pause: 4500 },
      { role: "human", text: "That's... actually a weird way to think about it. Like, the wrongness is where something unexpected could happen.", pause: 5000 },
      { role: "stage", text: "✦ Wonder prompt: Noticing — the AI catches a shift", pause: 2500 },
      { role: "ai", text: "Your voice just changed. Something landed there. Want to stay with that a second?", pause: 4500 },
      { role: "human", text: "Yeah. I think I've been treating this like something to survive instead of something to explore.", pause: 4000 },
      { role: "stage", text: "✦ Wonder prompt: Scale Shift — zooming out", pause: 2500 },
      { role: "ai", text: "Zoom out for a second. Who else — in all of human history — has stood at the edge of something they made, afraid to find out if it works?", pause: 5500 },
      { role: "human", text: "Ha. Everyone. Every artist, every scientist... every kid showing their drawing to their parents.", pause: 4500 },
      { role: "ai", text: "You're in very good company.", pause: 3500 },
    ],
  },
  {
    phase: "INTEGRATE",
    phaseColor: "text-wonder-purple",
    label: "Anchoring what emerged",
    beats: [
      { role: "stage", text: "The session finds its natural close. No hooks. No cliffhangers.", pause: 3500 },
      { role: "ai", text: "Before we close — what's one thing that's landing for you right now?", pause: 4000 },
      { role: "human", text: "That the scary part might be the interesting part. I don't have to survive this project. I can explore it.", pause: 5000 },
      { role: "ai", text: "That's a wonder.", pause: 3500 },
    ],
  },
  {
    phase: "RELEASE",
    phaseColor: "text-wonder-coral",
    label: "Clean closure. No guilt. No hooks.",
    beats: [
      { role: "stage", text: "You arrived scattered. You're leaving with a different relationship to the thing that scared you.", pause: 5000 },
      { role: "ai", text: "Thanks for being here. Go well.", pause: 4000 },
      { role: "stage", text: "No \"see you tomorrow.\" No streak. No notification. Just a human who found a moment of wonder in an ordinary evening.", pause: 6000 },
    ],
  },
];

const totalBeats = SCENES.reduce((sum, s) => sum + s.beats.length, 0);

const Demo = () => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [visibleBeats, setVisibleBeats] = useState<{ sceneIdx: number; beatIdx: number }[]>([]);
  const [finished, setFinished] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const globalBeatIndex = SCENES.slice(0, currentScene).reduce((s, sc) => s + sc.beats.length, 0) + currentBeat;
  const progress = finished ? 100 : (globalBeatIndex / totalBeats) * 100;

  const advance = useCallback(() => {
    setVisibleBeats((prev) => [...prev, { sceneIdx: currentScene, beatIdx: currentBeat }]);

    const scene = SCENES[currentScene];
    if (currentBeat < scene.beats.length - 1) {
      setCurrentBeat((b) => b + 1);
    } else if (currentScene < SCENES.length - 1) {
      setCurrentScene((s) => s + 1);
      setCurrentBeat(0);
    } else {
      setFinished(true);
      setPlaying(false);
    }
  }, [currentScene, currentBeat]);

  useEffect(() => {
    if (!playing || finished) return;

    const beat = SCENES[currentScene]?.beats[currentBeat];
    if (!beat) return;

    // Show this beat immediately, then wait its pause before advancing
    setVisibleBeats((prev) => {
      const exists = prev.some((b) => b.sceneIdx === currentScene && b.beatIdx === currentBeat);
      if (exists) return prev;
      return [...prev, { sceneIdx: currentScene, beatIdx: currentBeat }];
    });

    timeoutRef.current = setTimeout(() => {
      const scene = SCENES[currentScene];
      if (currentBeat < scene.beats.length - 1) {
        setCurrentBeat((b) => b + 1);
      } else if (currentScene < SCENES.length - 1) {
        setCurrentScene((s) => s + 1);
        setCurrentBeat(0);
      } else {
        setFinished(true);
        setPlaying(false);
      }
    }, beat.pause);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playing, currentScene, currentBeat, finished]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleBeats]);

  const handleSkip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const scene = SCENES[currentScene];
    if (currentBeat < scene.beats.length - 1) {
      setCurrentBeat((b) => b + 1);
    } else if (currentScene < SCENES.length - 1) {
      setCurrentScene((s) => s + 1);
      setCurrentBeat(0);
    } else {
      setFinished(true);
      setPlaying(false);
    }
  };

  const handleRestart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentScene(0);
    setCurrentBeat(0);
    setVisibleBeats([]);
    setFinished(false);
    setPlaying(true);
  };

  const currentPhase = SCENES[currentScene];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-wonder-navy flex flex-col relative overflow-hidden safe-top safe-bottom">
      <WonderPageBackground />

      {/* Progress bar */}
      <div className="w-full h-[2px] bg-wonder-navy-light relative z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-wonder-teal via-wonder-gold to-wonder-coral"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 pl-16 z-20">
        <div>
          <h1 className="text-wonder-teal font-display text-lg">Finding Wonder</h1>
          <p className="text-wonder-purple/40 font-body text-xs">A walk-through of the experience</p>
        </div>
      </div>

      {/* Phase indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase.phase}
          className="px-6 py-2 z-20"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          <div className="flex items-center gap-3">
            <span className={`${currentPhase.phaseColor} font-display text-sm font-bold uppercase tracking-widest`}>
              {currentPhase.phase}
            </span>
            <span className="text-wonder-purple/30 font-body text-xs">{currentPhase.label}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Conversation area — tarot card style */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 pb-6 z-10 flex items-start justify-center">
        <div className="max-w-2xl w-full flex flex-col gap-10 py-8">
          <AnimatePresence>
            {visibleBeats.map(({ sceneIdx, beatIdx }, i) => {
              const beat = SCENES[sceneIdx].beats[beatIdx];
              return (
                <motion.div
                  key={`${sceneIdx}-${beatIdx}`}
                  initial={{ opacity: 0, y: 30, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex justify-center"
                >
                  {beat.role === "stage" ? (
                    <div className="w-full max-w-lg px-8 py-7 rounded-2xl border border-wonder-purple/10 bg-wonder-navy-light/30 text-center">
                      <p className="text-wonder-purple/50 font-body text-base md:text-lg italic leading-relaxed">
                        {beat.text}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`w-full max-w-lg rounded-[2rem] px-10 py-10 md:px-12 md:py-12 border shadow-xl ${
                        beat.role === "ai"
                          ? "bg-gradient-to-br from-wonder-purple/15 via-wonder-navy-light/80 to-wonder-teal/5 border-wonder-purple/20 shadow-wonder-purple/15"
                          : "bg-gradient-to-br from-wonder-teal/10 via-wonder-navy-light/80 to-wonder-sky/5 border-wonder-teal/20 shadow-wonder-teal/15"
                      }`}
                    >
                      <span className={`font-body text-xs uppercase tracking-[0.25em] block mb-5 ${
                        beat.role === "ai" ? "text-wonder-purple/50" : "text-wonder-teal/50"
                      }`}>
                        {beat.role === "ai" ? "✦ Wonder" : "You"}
                      </span>
                      <p className={`font-display text-xl md:text-2xl lg:text-[1.7rem] leading-[1.6] tracking-wide ${
                        beat.role === "ai" ? "text-wonder-teal/90 italic" : "text-wonder-teal"
                      }`}>
                        {beat.text}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          {playing && !finished && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex gap-1 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-wonder-purple/30"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-5 flex items-center justify-center gap-4 z-20 border-t border-wonder-purple/10">
        {finished ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-wonder-teal/70 font-body text-sm text-center">
              That's how wonder works. Ready to try it yourself?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-full bg-wonder-purple/15 text-wonder-purple font-body text-sm hover:bg-wonder-purple/25 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={14} />
                Watch again
              </button>
              <button
                onClick={() => navigate("/session?mode=reflection")}
                className="px-6 py-2.5 rounded-full bg-wonder-coral text-white font-body text-sm font-semibold shadow-lg shadow-wonder-coral/20 hover:shadow-xl transition-all hover:scale-105"
              >
                Begin your session
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlaying(!playing)}
              className="w-10 h-10 rounded-full bg-wonder-purple/20 text-wonder-purple flex items-center justify-center hover:bg-wonder-purple/30 transition-colors"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={handleSkip}
              className="w-10 h-10 rounded-full bg-wonder-navy-light text-wonder-teal/60 flex items-center justify-center hover:text-wonder-teal transition-colors"
            >
              <SkipForward size={16} />
            </button>
            <span className="text-wonder-purple/30 font-body text-xs ml-2">
              {playing ? "Playing..." : "Paused"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
