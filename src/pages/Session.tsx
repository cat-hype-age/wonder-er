import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, MicOff, MessageSquare, X, Send } from "lucide-react";

type ConversationState = "idle" | "listening" | "processing" | "speaking";

const orbClasses: Record<ConversationState, string> = {
  idle: "animate-orb-breathe",
  listening: "animate-orb-listen",
  processing: "animate-pulse-glow",
  speaking: "animate-orb-speak",
};

const stateLabels: Record<ConversationState, string> = {
  idle: "Ready when you are",
  listening: "Listening...",
  processing: "Thinking...",
  speaking: "Speaking...",
};

const Session = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "reflection";

  const [conversationState, setConversationState] = useState<ConversationState>("idle");
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [transcript, setTranscript] = useState<{ role: string; content: string }[]>([]);

  const handleMicToggle = () => {
    if (conversationState === "listening") {
      setConversationState("idle");
    } else {
      setConversationState("listening");
      // Web Speech API will be wired here
    }
  };

  const handleSendText = () => {
    if (!textInput.trim()) return;
    setTranscript((prev) => [...prev, { role: "user", content: textInput }]);
    setTextInput("");
    setConversationState("processing");
    // AI call will be wired here
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        { role: "assistant", content: "I hear you. Tell me more about what you're noticing." },
      ]);
      setConversationState("idle");
    }, 2000);
  };

  const handleEndSession = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-wonder-navy flex flex-col items-center justify-between relative overflow-hidden">
      {/* Top bar */}
      <motion.div
        className="w-full flex justify-between items-center px-6 py-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-wonder-teal/60 hover:text-wonder-teal transition-colors font-body text-sm flex items-center gap-2"
        >
          <MessageSquare size={16} />
          {showTranscript ? "Hide transcript" : "Show transcript"}
        </button>

        <button
          onClick={handleEndSession}
          className="text-wonder-coral/60 hover:text-wonder-coral transition-colors font-body text-sm flex items-center gap-2"
        >
          End session
          <X size={16} />
        </button>
      </motion.div>

      {/* Transcript overlay */}
      {showTranscript && transcript.length > 0 && (
        <motion.div
          className="absolute top-16 left-4 right-4 md:left-auto md:right-8 md:w-96 max-h-[40vh] overflow-y-auto bg-wonder-navy-light/90 backdrop-blur-lg rounded-2xl p-4 z-20 border border-wonder-purple/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {transcript.map((msg, i) => (
            <div key={i} className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-3 py-2 rounded-2xl text-sm font-body ${
                  msg.role === "user"
                    ? "bg-wonder-teal/20 text-wonder-teal"
                    : "bg-wonder-purple/20 text-wonder-purple"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Central orb */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Outer glow */}
          <div
            className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-wonder-purple/40 via-wonder-teal/30 to-wonder-coral/20 blur-xl absolute inset-0 ${orbClasses[conversationState]}`}
          />
          {/* Inner orb */}
          <div
            className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-wonder-purple/60 via-wonder-teal/40 to-wonder-sky/30 backdrop-blur-sm relative z-10 flex items-center justify-center ${orbClasses[conversationState]}`}
          >
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-wonder-purple/80 via-wonder-teal/60 to-wonder-coral/30" />
          </div>
        </motion.div>

        {/* State label */}
        <motion.p
          className="text-wonder-purple/70 font-body text-sm tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {stateLabels[conversationState]}
        </motion.p>

        {/* Welcome text for idle state */}
        {conversationState === "idle" && transcript.length === 0 && (
          <motion.p
            className="text-wonder-teal/80 font-display text-xl md:text-2xl text-center max-w-md px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {mode === "reflection"
              ? "How are you arriving today?"
              : "What are you working through?"}
          </motion.p>
        )}
      </div>

      {/* Bottom controls */}
      <motion.div
        className="w-full px-6 pb-8 flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {/* Text input */}
        {showTextInput && (
          <div className="flex items-center gap-2 w-full max-w-md">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendText()}
              placeholder="Type instead..."
              className="flex-1 bg-wonder-navy-light border border-wonder-purple/20 rounded-full px-4 py-3 text-wonder-teal font-body text-sm focus:outline-none focus:border-wonder-purple/50 placeholder:text-wonder-purple/30"
            />
            <button
              onClick={handleSendText}
              className="w-10 h-10 rounded-full bg-wonder-teal/20 flex items-center justify-center text-wonder-teal hover:bg-wonder-teal/30 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowTextInput(!showTextInput)}
            className="text-wonder-purple/40 hover:text-wonder-purple/70 transition-colors"
          >
            <MessageSquare size={20} />
          </button>

          <button
            onClick={handleMicToggle}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
              conversationState === "listening"
                ? "bg-wonder-coral text-wonder-navy scale-110"
                : "bg-wonder-purple/30 text-wonder-purple hover:bg-wonder-purple/40"
            }`}
          >
            {conversationState === "listening" ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          <div className="w-5" /> {/* Spacer for balance */}
        </div>
      </motion.div>
    </div>
  );
};

export default Session;
