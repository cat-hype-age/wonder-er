

# Wonder Companion — Voice-First AI Practice Partner

## Vision
A voice-first AI companion for daily wonder practice — helping humans find awe in reflection and work. Built for the Center for Humane Technology Hackathon, operating under the Truce Protocol.

---

## Page 1: Landing — "The Universal WOW"

**A joyful, multicultural celebration of awe.**

- Mixed-media collage of diverse faces expressing wonder — AI-generated portraits in varied artistic styles (painterly, sketchy, photographic) arranged in an organic, flowing layout
- Bold, colorful exclamations scattered playfully across the screen in many scripts and languages: **"WOW"** · **"واو"** · **"すごい"** · **"¡Guau!"** · **"Вау"** · **"哇"** · **"와"** · **"Uau"** — different fonts, sizes, angles, colors
- Faces and words animate in — cycling, floating, gently rotating — creating a living collage that feels warm and alive
- Charm & humor woven in: maybe a kid with mouth wide open, an elder laughing with delight, someone seeing snow for the first time
- Two gentle entry points visible alongside the gallery:
  - **"Check in with yourself"** → Daily Reflection mode
  - **"Work through something"** → Thought Partnership mode
- No sign-up wall. No account required. Just begin.

---

## Page 2: The Voice Conversation Interface

**The core experience — voice-first interaction with the Wonder Companion.**

- Transition from the colorful landing into a calm, focused space — deep navy/dark background
- Central animated element (soft glowing orb or gentle visual) that responds to conversation state:
  - **Listening** — gentle pulse, present and attentive
  - **Speaking** — faster, subtler animation while AI responds
  - **Processing** — soft transition while thinking
  - **Idle** — slow breathing, comfortable with silence
- **End Session** button always visible, never guilt-inducing
- Optional text input fallback for those who prefer typing
- Optional transcript toggle (off by default to keep experience voice-centered)

---

## Page 3: The Wonder Framework Engine (Behind the Scenes)

**Voice pipeline powering the companion:**

1. **Voice In** — Browser's Web Speech API captures user speech
2. **AI Intelligence** — Gemini 2.5 via Supabase Edge Function, with the full Wonder Framework embedded in its system prompt (Input → Experience → Output layers, wonder prompts, ethical guardrails, crisis protocol)
3. **Voice Out** — ElevenLabs streaming TTS responds in a warm, calm voice

**Session arc built into the AI's behavior:**
- **Arrival** — "How are you arriving today?"
- **Exploration** — Wonder prompts woven naturally (reframes, scale shifts, beauty hunts) — max 2-3 per session, never forced
- **Integration** — "What's one thing landing for you?"
- **Release** — "Go well." Clean ending, no hooks or streaks

---

## Page 4: Ethical Design — Anti-Addiction Architecture

**What makes this humane:**

- No streaks, no push notifications, no metrics
- No infinite sessions — AI senses natural endings
- No social comparison — personal journey only
- No guilt mechanics — unconditional welcome whenever you return
- Crisis protocol — if distress detected, warmly direct to real human support
- Agency stays with the human: "You noticed that" — never "I showed you that"

---

## Page 5: Minimal Settings

- Voice selection (2-3 warm ElevenLabs voice options)
- Transcript display toggle
- About the Wonder Framework
- Privacy statement (nothing persisted in MVP)

---

## Technical Approach

- **Frontend:** React + Tailwind CSS with CSS animations for the collage and orb
- **Landing images:** AI-generated via Gemini image generation (mixed-media portrait collage)
- **Backend:** Supabase Edge Functions for secure Gemini 2.5 and ElevenLabs API calls
- **Voice In:** Web Speech API (browser-native)
- **Voice Out:** ElevenLabs streaming TTS
- **State:** Client-side only — conversation lives in React state, nothing persisted
- **Secrets needed:** Gemini API key, ElevenLabs API key

