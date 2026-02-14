import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, ChevronDown, BookOpen } from "lucide-react";
import WonderPageBackground from "@/components/WonderPageBackground";

const VOICES = [
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", description: "Warm & calm" },
  { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice", description: "Bright & clear" },
  { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily", description: "Soft & soothing" },
];

const Settings = () => {
  const navigate = useNavigate();

  const [selectedVoice, setSelectedVoice] = useState(() =>
    localStorage.getItem("wonder-voice") || "EXAVITQu4vr4xnSDxMaL"
  );
  const [autoTranscript, setAutoTranscript] = useState(() =>
    localStorage.getItem("wonder-auto-transcript") !== "false"
  );
  const [visualsEnabled, setVisualsEnabled] = useState(() =>
    localStorage.getItem("wonder-visuals") !== "false"
  );
  const [ambientEnabled, setAmbientEnabled] = useState(() =>
    localStorage.getItem("wonder-ambient") !== "false"
  );

  useEffect(() => {
    localStorage.setItem("wonder-voice", selectedVoice);
  }, [selectedVoice]);

  useEffect(() => {
    localStorage.setItem("wonder-auto-transcript", String(autoTranscript));
  }, [autoTranscript]);

  useEffect(() => {
    localStorage.setItem("wonder-visuals", String(visualsEnabled));
  }, [visualsEnabled]);

  useEffect(() => {
    localStorage.setItem("wonder-ambient", String(ambientEnabled));
  }, [ambientEnabled]);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-wonder-navy safe-top safe-bottom relative overflow-hidden">
      <WonderPageBackground />
      {/* Warm accent line bridging landing page warmth */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-wonder-coral/30 to-transparent" />

      {/* Header */}
      <motion.div
        className="flex items-center gap-4 px-6 py-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate("/")}
          className="text-wonder-teal/70 hover:text-wonder-teal transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-wonder-teal font-display text-2xl">Settings</h1>
      </motion.div>

      <motion.div
        className="px-6 pb-12 max-w-lg mx-auto flex flex-col gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {/* Voice Selection */}
        <section>
          <h2 className="text-wonder-purple font-display text-lg mb-1">Voice</h2>
          <p className="text-wonder-purple/50 font-body text-sm mb-4">
            Choose the voice that feels right for your sessions.
          </p>

          <div className="grid gap-2">
            {VOICES.map((voice) => (
              <button
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-body text-sm transition-all ${
                  selectedVoice === voice.id
                    ? "bg-wonder-purple/20 text-wonder-teal border border-wonder-purple/40"
                    : "bg-wonder-navy-light/60 text-wonder-teal/70 border border-transparent hover:border-wonder-purple/20"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{voice.name}</span>
                  <span className="text-xs text-wonder-purple/50">{voice.description}</span>
                </div>
                {selectedVoice === voice.id && (
                  <Volume2 size={16} className="text-wonder-purple" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Session Preferences */}
        <section>
          <h2 className="text-wonder-purple font-display text-lg mb-1">Session</h2>
          <p className="text-wonder-purple/50 font-body text-sm mb-4">
            Customize your session experience.
          </p>

          <div className="flex flex-col gap-3">
            <ToggleRow
              label="Show transcript"
              description="Display conversation text during sessions"
              checked={autoTranscript}
              onChange={setAutoTranscript}
            />
            <ToggleRow
              label="Wonder visuals"
              description="Generate abstract images from conversation mood"
              checked={visualsEnabled}
              onChange={setVisualsEnabled}
            />
            <ToggleRow
              label="Ambient soundscapes"
              description="Play subtle background audio matched to conversation"
              checked={ambientEnabled}
              onChange={setAmbientEnabled}
            />
          </div>
        </section>

        {/* About / Framework Link */}
        <section>
          <h2 className="text-wonder-purple font-display text-lg mb-1">About</h2>
          <p className="text-wonder-purple/50 font-body text-sm mb-4">
            The Wonder Framework
          </p>

          <div className="bg-wonder-navy-light/60 rounded-2xl p-5 border border-wonder-purple/10 flex flex-col gap-4">
            <p className="text-wonder-teal/70 font-body text-sm leading-relaxed">
              Wonder is a daily practice for finding awe in the ordinary. It's not therapy, not coaching, not productivity — it's a space to notice what's alive in you and around you.
            </p>

            <div className="w-full h-px bg-wonder-purple/10" />

            <p className="text-wonder-teal/70 font-body text-sm leading-relaxed">
              Each session follows a natural arc: <span className="text-wonder-coral/80">arrive</span>, <span className="text-wonder-gold/80">explore</span>, <span className="text-wonder-purple/80">integrate</span>, <span className="text-wonder-teal">release</span>. Built on ethical guardrails from the Center for Humane Technology — no streaks, no guilt, no addiction mechanics.
            </p>

            <button
              onClick={() => navigate("/framework")}
              className="flex items-center justify-center gap-2 mt-2 px-5 py-3 rounded-xl bg-wonder-purple/15 text-wonder-purple font-body text-sm font-medium hover:bg-wonder-purple/25 transition-colors border border-wonder-purple/20"
            >
              <BookOpen size={16} />
              Read the full Wonder Framework
            </button>

            <div className="w-full h-px bg-wonder-purple/10" />

            <p className="text-wonder-teal/50 font-body text-xs leading-relaxed">
              Wonder is not a substitute for professional mental health support. If you're in crisis, please reach out to a trusted person or professional.
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!checked)}
    className="flex items-center justify-between px-4 py-3 rounded-xl bg-wonder-navy-light/60 border border-transparent hover:border-wonder-purple/20 transition-all"
  >
    <div className="flex flex-col items-start">
      <span className="text-wonder-teal font-body text-sm font-medium">{label}</span>
      <span className="text-wonder-purple/50 font-body text-xs">{description}</span>
    </div>
    <div
      className={`w-10 h-6 rounded-full transition-colors relative ${
        checked ? "bg-wonder-purple/50" : "bg-wonder-navy-light"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-wonder-teal transition-transform ${
          checked ? "left-5" : "left-1"
        }`}
      />
    </div>
  </button>
);

export default Settings;
