import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, MessageSquare, X, Send, Eye, EyeOff, Volume2, VolumeX } from "lucide-react";
import { streamWonderChat, playWonderTTS, generateSessionSummary, type SessionSummary } from "@/lib/wonder-api";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useWonderVisuals } from "@/hooks/use-wonder-visuals";
import WonderBackground from "@/components/WonderBackground";
import { toast } from "sonner";

type ConversationState = "idle" | "listening" | "processing" | "speaking";
type SessionPhase = "active" | "summarizing" | "summary";
type Msg = { role: "user" | "assistant"; content: string };

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
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sessionPhase, setSessionPhase] = useState<SessionPhase>("active");
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const isProcessingRef = useRef(false);

  const {
    currentImage,
    previousImage,
    visualsEnabled,
    soundEnabled,
    toggleVisuals,
    toggleSound,
    generateVisuals,
    cleanup,
  } = useWonderVisuals();

  // Cleanup ambient audio on unmount
  useEffect(() => () => cleanup(), [cleanup]);

  const sendToAI = useCallback(
    async (userText: string) => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      const userMsg: Msg = { role: "user", content: userText };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setConversationState("processing");

      let assistantText = "";

      try {
        await streamWonderChat({
          messages: updatedMessages,
          mode,
          onDelta: (chunk) => {
            assistantText += chunk;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantText } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantText }];
            });
          },
          onDone: () => {},
        });

        // Play TTS and generate visuals in parallel
        if (assistantText) {
          setConversationState("speaking");
          const finalMessages = [...updatedMessages, { role: "assistant" as const, content: assistantText }];
          
          // Start visual generation in parallel (non-blocking)
          generateVisuals(finalMessages);

          try {
            const voiceId = localStorage.getItem("wonder-voice") || undefined;
            await playWonderTTS(assistantText, voiceId);
          } catch (e) {
            console.error("TTS error:", e);
          }
        }
      } catch (e: any) {
        console.error("AI error:", e);
        toast.error(e.message || "Something went wrong. Let's try again.");
      } finally {
        setConversationState("idle");
        isProcessingRef.current = false;
      }
    },
    [messages, mode]
  );

  const { isListening, start: startListening, stop: stopListening } = useSpeechRecognition({
    onResult: (transcript) => {
      sendToAI(transcript);
    },
    onEnd: () => {
      if (conversationState === "listening") {
        setConversationState("idle");
      }
    },
  });

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
      setConversationState("idle");
    } else {
      setConversationState("listening");
      startListening();
    }
  };

  const handleSendText = () => {
    if (!textInput.trim()) return;
    const text = textInput.trim();
    setTextInput("");
    sendToAI(text);
  };

  const handleEndSession = async () => {
    if (messages.length < 2) {
      navigate("/");
      return;
    }
    setSessionPhase("summarizing");
    try {
      const result = await generateSessionSummary(messages);
      setSummary(result);
      setSessionPhase("summary");
    } catch (e) {
      console.error("Summary error:", e);
      // Fallback — still show a generic summary
      setSummary({
        arrived: "with something on your mind",
        leaving: "a little more seen",
        reflection: "Sometimes just showing up is the wonder.",
      });
      setSessionPhase("summary");
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-wonder-navy flex flex-col items-center justify-between relative overflow-hidden safe-top safe-bottom">
      {/* Wonder background visuals */}
      <WonderBackground
        currentImage={currentImage}
        previousImage={previousImage}
        enabled={visualsEnabled}
      />

      <AnimatePresence mode="wait">
        {/* Summary screen */}
        {(sessionPhase === "summarizing" || sessionPhase === "summary") && (
          <motion.div
            key="summary"
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Summary backdrop — last wonder image */}
            {currentImage && (
              <div className="absolute inset-0">
                <img src={currentImage} alt="" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-wonder-navy/70" />
              </div>
            )}
            {!currentImage && <div className="absolute inset-0 bg-wonder-navy" />}
            
            {sessionPhase === "summarizing" ? (
              <motion.div
                className="relative z-10 flex flex-col items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wonder-purple/60 via-wonder-teal/40 to-wonder-sky/30 animate-orb-breathe" />
                <p className="text-wonder-purple/70 font-body text-sm">Reflecting on your session...</p>
              </motion.div>
            ) : summary && (
              <motion.div
                className="relative z-10 flex flex-col items-center gap-10 max-w-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-wonder-teal/50 font-body text-xs uppercase tracking-widest mb-2">You arrived</p>
                    <p className="text-wonder-teal font-display text-2xl md:text-3xl italic">{summary.arrived}</p>
                  </motion.div>

                  <motion.div
                    className="w-16 h-px bg-gradient-to-r from-transparent via-wonder-purple/40 to-transparent mx-auto"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-wonder-coral/50 font-body text-xs uppercase tracking-widest mb-2">You're leaving with</p>
                    <p className="text-wonder-coral font-display text-2xl md:text-3xl italic">{summary.leaving}</p>
                  </motion.div>
                </div>

                <motion.p
                  className="text-wonder-purple/60 font-body text-sm md:text-base max-w-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {summary.reflection}
                </motion.p>

                <motion.button
                  onClick={() => navigate("/")}
                  className="mt-4 px-8 py-3 rounded-full bg-wonder-purple/20 text-wonder-purple font-body text-sm hover:bg-wonder-purple/30 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  Go well
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <motion.div
        className="w-full flex justify-between items-center px-6 py-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-wonder-teal/60 hover:text-wonder-teal transition-colors font-body text-sm flex items-center gap-2"
          >
            <MessageSquare size={16} />
            <span className="hidden sm:inline">{showTranscript ? "Hide" : "Transcript"}</span>
          </button>

          <button
            onClick={toggleVisuals}
            className={`transition-colors flex items-center gap-1 font-body text-xs ${visualsEnabled ? 'text-wonder-purple/60 hover:text-wonder-purple' : 'text-wonder-purple/30'}`}
            title={visualsEnabled ? "Disable visuals" : "Enable visuals"}
          >
            {visualsEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>

          <button
            onClick={toggleSound}
            className={`transition-colors flex items-center gap-1 font-body text-xs ${soundEnabled ? 'text-wonder-purple/60 hover:text-wonder-purple' : 'text-wonder-purple/30'}`}
            title={soundEnabled ? "Mute ambient" : "Enable ambient"}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>

        <button
          onClick={handleEndSession}
          className="text-wonder-coral/60 hover:text-wonder-coral transition-colors font-body text-sm flex items-center gap-2"
        >
          End session
          <X size={16} />
        </button>
      </motion.div>

      {/* Transcript overlay */}
      {showTranscript && messages.length > 0 && (
        <motion.div
          className="absolute top-16 left-4 right-4 md:left-auto md:right-8 md:w-96 max-h-[40vh] overflow-y-auto bg-wonder-navy-light/90 backdrop-blur-lg rounded-2xl p-4 z-20 border border-wonder-purple/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {messages.map((msg, i) => (
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
          <div
            className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-wonder-purple/40 via-wonder-teal/30 to-wonder-coral/20 blur-xl absolute inset-0 ${orbClasses[conversationState]}`}
          />
          <div
            className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-wonder-purple/60 via-wonder-teal/40 to-wonder-sky/30 backdrop-blur-sm relative z-10 flex items-center justify-center ${orbClasses[conversationState]}`}
          >
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-wonder-purple/80 via-wonder-teal/60 to-wonder-coral/30" />
          </div>
        </motion.div>

        <motion.p
          className="text-wonder-purple/70 font-body text-sm tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {stateLabels[conversationState]}
        </motion.p>

        {conversationState === "idle" && messages.length === 0 && (
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
        className="w-full px-6 pb-8 flex flex-col items-center gap-5 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {/* Text input — always visible */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendText()}
            placeholder="Type what's on your mind..."
            className="flex-1 bg-wonder-navy-light border border-wonder-purple/20 rounded-full px-5 py-3 text-wonder-teal font-body text-sm focus:outline-none focus:border-wonder-purple/50 placeholder:text-wonder-purple/30"
          />
          <button
            onClick={handleSendText}
            disabled={!textInput.trim() || conversationState === "processing" || conversationState === "speaking"}
            className="w-10 h-10 rounded-full bg-wonder-teal/20 flex items-center justify-center text-wonder-teal hover:bg-wonder-teal/30 transition-colors disabled:opacity-30"
          >
            <Send size={16} />
          </button>
        </div>

        {/* Divider with "or" */}
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <div className="flex-1 h-px bg-wonder-purple/15" />
          <span className="text-wonder-purple/40 font-body text-xs">or</span>
          <div className="flex-1 h-px bg-wonder-purple/15" />
        </div>

        {/* Mic button with label */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleMicToggle}
            disabled={conversationState === "processing" || conversationState === "speaking"}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg disabled:opacity-40 ${
              isListening
                ? "bg-wonder-coral text-wonder-navy scale-110"
                : "bg-wonder-purple/30 text-wonder-purple hover:bg-wonder-purple/40"
            }`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <span className="text-wonder-purple/40 font-body text-xs">
            {isListening ? "Tap to stop" : "Tap to talk"}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Session;
