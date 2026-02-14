import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, ChevronDown } from "lucide-react";

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
    <div className="min-h-screen min-h-[100dvh] bg-wonder-navy safe-top safe-bottom">
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

        {/* About the Wonder Framework */}
        <section>
          <h2 className="text-wonder-purple font-display text-lg mb-1">About</h2>
          <p className="text-wonder-purple/50 font-body text-sm mb-5">
            The Wonder Framework
          </p>

          <div className="bg-wonder-navy-light/60 rounded-2xl p-5 border border-wonder-purple/10 flex flex-col gap-5">
            <div>
              <h3 className="text-wonder-teal font-display text-base mb-2">What is Wonder?</h3>
              <p className="text-wonder-teal/70 font-body text-sm leading-relaxed">
                Wonder is a daily practice for finding awe in the ordinary. It's not therapy, not coaching, not productivity — it's a space to notice what's alive in you and around you.
              </p>
            </div>

            <div className="w-full h-px bg-wonder-purple/10" />

            <div>
              <h3 className="text-wonder-teal font-display text-base mb-2">How it works</h3>
              <p className="text-wonder-teal/70 font-body text-sm leading-relaxed">
                Each session follows a natural arc: <span className="text-wonder-coral/80">arrive</span>, <span className="text-wonder-gold/80">explore</span>, <span className="text-wonder-purple/80">integrate</span>, <span className="text-wonder-teal">release</span>. The AI companion meets you where you are and uses wonder prompts — gentle reframes, scale shifts, and questions — to help you see your experience with fresh eyes.
              </p>
            </div>

            <div className="w-full h-px bg-wonder-purple/10" />

            <div>
              <h3 className="text-wonder-teal font-display text-base mb-2">Core principles</h3>
              <ul className="text-wonder-teal/70 font-body text-sm leading-relaxed flex flex-col gap-2">
                <li className="flex items-start gap-2">
                  <span className="text-wonder-coral mt-0.5">·</span>
                  <span>Wonder cannot be forced, only invited</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wonder-gold mt-0.5">·</span>
                  <span>Presence over performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wonder-purple mt-0.5">·</span>
                  <span>Wonder over interrogation — alternate between asking and offering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wonder-coral/70 mt-0.5">·</span>
                  <span>Surprise is a doorway to wonder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wonder-teal mt-0.5">·</span>
                  <span>Brevity over elaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wonder-sky mt-0.5">·</span>
                  <span>Agency stays with the human</span>
                </li>
              </ul>
            </div>

            <div className="w-full h-px bg-wonder-purple/10" />

            <div>
              <h3 className="text-wonder-teal font-display text-base mb-2">Multimodal experience</h3>
              <p className="text-wonder-teal/70 font-body text-sm leading-relaxed">
                Sessions come alive with generated abstract visuals that shift with the conversation's emotional tone, and subtle ambient soundscapes that create a living, breathing environment for reflection.
              </p>
            </div>

            <div className="w-full h-px bg-wonder-purple/10" />

            <div>
              <h3 className="text-wonder-teal font-display text-base mb-2">Important note</h3>
              <p className="text-wonder-teal/70 font-body text-sm leading-relaxed">
                Wonder is not a substitute for professional mental health support. If you're in crisis, please reach out to a trusted person or professional who can really be there for you.
              </p>
            </div>
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
