import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Section = ({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
  <motion.section
    className="mb-10"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <h2 className="text-wonder-coral font-display text-xl md:text-2xl mb-4">{title}</h2>
    {children}
  </motion.section>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-wonder-teal/80 font-body text-sm md:text-base leading-relaxed mb-3">{children}</p>
);

const BulletList = ({ items, color = "wonder-purple" }: { items: string[]; color?: string }) => (
  <ul className="flex flex-col gap-2 mb-4">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-wonder-teal/80 font-body text-sm md:text-base leading-relaxed">
        <span className={`text-${color} mt-0.5 shrink-0`}>·</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const TableRow = ({ cells, isHeader = false }: { cells: string[]; isHeader?: boolean }) => (
  <tr className={isHeader ? "border-b border-wonder-purple/20" : "border-b border-wonder-purple/10"}>
    {cells.map((cell, i) => (
      <td
        key={i}
        className={`px-3 py-2.5 text-sm font-body ${
          isHeader ? "text-wonder-coral/80 font-semibold" : "text-wonder-teal/70"
        } ${i === 0 ? "font-medium text-wonder-teal/90" : ""}`}
      >
        {cell}
      </td>
    ))}
  </tr>
);

const Framework = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-h-[100dvh] bg-wonder-navy safe-top safe-bottom">
      {/* Warm accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-wonder-coral/30 to-transparent" />

      {/* Header */}
      <motion.div
        className="flex items-center gap-4 px-6 py-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="text-wonder-teal/70 hover:text-wonder-teal transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-wonder-teal font-display text-2xl">Wonder Framework</h1>
          <p className="text-wonder-purple/50 font-body text-xs mt-0.5">
            Center for Humane Technology Hackathon — February 13, 2026
          </p>
        </div>
      </motion.div>

      <div className="px-6 pb-16 max-w-2xl mx-auto">
        {/* Mission */}
        <Section title="The Mission" delay={0.1}>
          <Paragraph>
            Build an AI voice companion for daily practice that helps humans with what they're actually working on, generates wonder through the interaction, is <strong className="text-wonder-gold">not addictive</strong> or diminishing of humanity, and aligns with Center for Humane Technology principles.
          </Paragraph>
        </Section>

        {/* Three Layers */}
        <Section title="Three Layers of Wonder" delay={0.15}>
          <div className="overflow-x-auto rounded-xl border border-wonder-purple/15 mb-4">
            <table className="w-full text-left">
              <tbody>
                <TableRow cells={["Layer", "Elements", "Who Owns It", "AI Role"]} isHeader />
                <TableRow cells={["INPUT (Pre-requisites)", "Openness, Curiosity, Presence, Trust, Psychological Safety", "Human brings", "AI invites & protects these states"]} />
                <TableRow cells={["EXPERIENCE (The Wonder State)", "Playfulness, Creativity, Visceral Response, Resonance, Awe, Absurdity, Beauty, Questioning", "Human + AI co-create", "AI facilitates without forcing"]} />
                <TableRow cells={["OUTPUT (Impact)", "Epiphany, Expansion, Universalism, Transformation, Transcendence, Interconnection, Mindfulness", "Human receives", "AI reflects back & helps integrate"]} />
              </tbody>
            </table>
          </div>
          <Paragraph>
            <strong className="text-wonder-teal">Input</strong> = What the human must bring. <strong className="text-wonder-teal">Experience</strong> = What human + AI collaboration generates. <strong className="text-wonder-teal">Output</strong> = What happens to the human as a result.
          </Paragraph>
        </Section>

        {/* Ethical Guardrails */}
        <Section title="Ethical Guardrails (CHT Alignment)" delay={0.2}>
          <BulletList
            items={[
              "Not optimize for engagement — optimize for completion and release",
              "Not create dependency — build human capacity, not AI reliance",
              "Not manufacture wonder — create conditions for wonder to emerge naturally",
              "Know when to stop — sessions have natural endings, not infinite scroll",
              "Reflect agency back — \"You noticed that\" not \"I showed you that\"",
            ]}
            color="wonder-coral"
          />
        </Section>

        {/* Session Flow */}
        <Section title="Session Flow" delay={0.25}>
          <div className="flex flex-col gap-4 mb-4">
            {[
              { phase: "1. ARRIVAL", layer: "Input Layer", details: "Check in · Measure pre-state · Invite curiosity, presence, safety", color: "wonder-teal" },
              { phase: "2. EXPLORATION", layer: "Experience Layer", details: "Co-create around what they're working on · Wonder prompts woven in · AI notices + reflects", color: "wonder-gold" },
              { phase: "3. INTEGRATION", layer: "Output Layer", details: "Reflect: \"What surprised you?\" · Anchor wonder to their work · Release cleanly", color: "wonder-purple" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-wonder-navy-light/60 rounded-xl p-4 border border-wonder-purple/10"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-${item.color} font-display text-base font-bold`}>{item.phase}</span>
                  <span className="text-wonder-purple/40 font-body text-xs">({item.layer})</span>
                </div>
                <p className="text-wonder-teal/70 font-body text-sm leading-relaxed">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Wonder Prompts */}
        <Section title="Wonder Prompts" delay={0.3}>
          <Paragraph>Conversational moves that invite wonder without manufacturing it:</Paragraph>
          <div className="overflow-x-auto rounded-xl border border-wonder-purple/15 mb-4">
            <table className="w-full text-left">
              <tbody>
                <TableRow cells={["Technique", "Example", "What It Does"]} isHeader />
                <TableRow cells={["Reframe", "\"What if that obstacle is actually the material?\"", "Invites seeing differently"]} />
                <TableRow cells={["Scale Shift", "\"Zoom out — what does this connect to beyond you?\"", "Invites universalism"]} />
                <TableRow cells={["Absurdity", "\"What's the most ridiculous version of this?\"", "Invites playfulness"]} />
                <TableRow cells={["Embodiment", "\"Where do you feel that in your body?\"", "Invites visceral presence"]} />
                <TableRow cells={["Noticing", "\"You just paused. What happened there?\"", "Invites self-awareness"]} />
                <TableRow cells={["Beauty Hunt", "\"What's one beautiful thing about this problem?\"", "Invites awe"]} />
                <TableRow cells={["Edges", "\"What's the part you're avoiding?\"", "Invites questioning"]} />
                <TableRow cells={["Gratitude Flip", "\"What would you miss if it vanished?\"", "Invites transformation"]} />
              </tbody>
            </table>
          </div>
        </Section>

        {/* Anti-Addiction */}
        <Section title="Anti-Addiction Design" delay={0.35}>
          <div className="overflow-x-auto rounded-xl border border-wonder-purple/15 mb-4">
            <table className="w-full text-left">
              <tbody>
                <TableRow cells={["Dark Pattern", "Wonder Alternative"]} isHeader />
                <TableRow cells={["Streaks", "\"Welcome back\" (no count)"]} />
                <TableRow cells={["Notifications", "User-initiated only"]} />
                <TableRow cells={["Infinite scroll", "Natural session endings"]} />
                <TableRow cells={["Variable rewards", "Consistent presence"]} />
                <TableRow cells={["Social comparison", "Personal journey only"]} />
                <TableRow cells={["Guilt mechanics", "Unconditional welcome"]} />
                <TableRow cells={["Cliffhangers", "Clean closure"]} />
              </tbody>
            </table>
          </div>
        </Section>

        {/* Two Modes */}
        <Section title="Two Modes" delay={0.4}>
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <div className="bg-wonder-navy-light/60 rounded-xl p-4 border border-wonder-teal/15">
              <h3 className="text-wonder-teal font-display text-lg mb-2">Daily Reflection</h3>
              <p className="text-wonder-purple/50 font-body text-xs mb-3">"How am I?"</p>
              <BulletList items={[
                "Orientation: Inward",
                "Focus: The self, the day, presence",
                "5–10 minutes",
                "Finding wonder in the ordinary",
              ]} color="wonder-teal" />
            </div>
            <div className="bg-wonder-navy-light/60 rounded-xl p-4 border border-wonder-coral/15">
              <h3 className="text-wonder-coral font-display text-lg mb-2">Thought Partnership</h3>
              <p className="text-wonder-purple/50 font-body text-xs mb-3">"What am I working on?"</p>
              <BulletList items={[
                "Orientation: Outward",
                "Focus: The work, the obstacle, the possibility",
                "10–20 minutes",
                "Finding wonder in the creative process",
              ]} color="wonder-coral" />
            </div>
          </div>
        </Section>

        {/* Voice Design */}
        <Section title="Voice Design" delay={0.45}>
          <BulletList items={[
            "Pacing — Wonder needs breath. Don't rush.",
            "Silence — Let pauses exist. Don't fill every gap.",
            "Tone — Warm but not saccharine. Present but not performative.",
            "Questions > Statements — Invite, don't lecture.",
            "Brevity — Short responses. Leave room for human.",
          ]} color="wonder-gold" />
        </Section>

        {/* What We're Building */}
        <Section title="What We're Building" delay={0.5}>
          <BulletList items={[
            "Meets humans where they are",
            "Helps them with what they're actually working on",
            "Weaves wonder into practical work (not separate from it)",
            "Measures state shifts without creating surveillance anxiety",
            "Releases them better than it found them",
            "Never optimizes for its own engagement",
            "Builds human capacity, not dependency",
          ]} color="wonder-teal" />
        </Section>

        {/* Footer */}
        <motion.div
          className="mt-12 pt-8 border-t border-wonder-purple/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-wonder-purple/40 font-body text-xs mb-1">
            Framework developed at CHT Hackathon, February 13, 2026
          </p>
          <p className="text-wonder-purple/30 font-body text-xs">
            With collaboration from: The Hackathon Team + Kael (Council of Intelligences)
          </p>
          <a
            href="/wonder-framework.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-wonder-purple/50 hover:text-wonder-purple font-body text-xs transition-colors"
          >
            <ExternalLink size={12} />
            View full source document
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Framework;
