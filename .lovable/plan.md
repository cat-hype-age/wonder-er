

# Multimodal Wonder Experience

## Overview

Transform the session from voice-only into a full sensory experience. After each AI response, the system generates a **wonder image** (an abstract, evocative visual inspired by the conversation) and optionally an **ambient soundscape** -- creating a living, breathing environment that responds to the emotional texture of the dialogue.

## What the User Experiences

1. Session begins as usual -- orb, voice/text input
2. After each AI response, a **wonder image** fades in behind the orb -- an abstract, painterly visual generated from the conversation's emotional tone (not a literal illustration)
3. Optionally, a subtle **ambient soundscape** plays softly underneath the conversation (e.g., "gentle rain on leaves" if discussing calm, "distant thunder and wind" if exploring tension)
4. Images crossfade between turns, creating a slowly evolving visual landscape
5. The session summary page also gets a final generated image as a keepsake

## Technical Architecture

### New Edge Function: `wonder-visuals`

A new backend function that takes the latest conversation exchange and returns:
- An image generation prompt (distilled from the conversation mood)
- A soundscape prompt (short ambient description)

Uses Gemini Flash to analyze the conversation and produce evocative prompts, then calls `google/gemini-2.5-flash-image` to generate an abstract image.

Returns the image as base64 and the soundscape prompt as text.

### New Edge Function: `wonder-sfx`

Uses ElevenLabs Sound Effects API to generate short ambient soundscapes (5-10 seconds) from text prompts. These loop softly in the background.

### Session Page Changes

- Add a full-screen background layer behind the orb that displays the generated wonder image with a slow crossfade (opacity transition over 2-3 seconds)
- Add ambient audio layer that plays looped soundscapes at low volume (15-20% volume)
- A small toggle in the top bar to mute/disable visuals and sound if desired
- Images are generated asynchronously after TTS plays -- they enhance but never block the conversation flow
- On the summary screen, the final wonder image becomes the backdrop for the "You arrived / You're leaving with" text

### Files to Create

1. **`supabase/functions/wonder-visuals/index.ts`** -- Analyzes conversation, generates image via Gemini image model, returns base64 image + soundscape prompt
2. **`supabase/functions/wonder-sfx/index.ts`** -- Takes a soundscape prompt, calls ElevenLabs SFX API, returns audio

### Files to Modify

1. **`src/lib/wonder-api.ts`** -- Add `generateWonderVisual()` and `generateWonderSFX()` functions
2. **`src/pages/Session.tsx`** -- Add background image layer, ambient audio player, visual toggle, integrate visual generation into the conversation flow
3. **`supabase/config.toml`** -- Register new edge functions with `verify_jwt = false`

### Conversation Flow with Visuals

```text
User speaks/types
  -> AI streams text response
  -> TTS plays response
  -> Meanwhile: wonder-visuals generates image + soundscape prompt
  -> Image crossfades in behind orb
  -> wonder-sfx generates ambient audio
  -> Ambient audio fades in at low volume
  -> Next turn: previous image/audio crossfades out as new ones arrive
```

### Image Generation Strategy

The wonder-visuals function uses a two-step approach:
1. Gemini Flash analyzes the last 2-3 messages and produces an **abstract visual prompt** (e.g., "An abstract watercolor of warm golden light breaking through deep blue clouds, sense of emergence and possibility") -- never literal, always evocative
2. Gemini Flash Image generates the actual image from that prompt

The system prompt instructs the AI to create prompts that are:
- Abstract and painterly, never photorealistic
- Emotionally resonant with the conversation tone
- Shifting in palette and texture as the session evolves
- Safe and beautiful -- no disturbing imagery

### Soundscape Strategy

Short (5-10 second) ambient loops generated via ElevenLabs SFX:
- Matched to emotional tone: calm conversations get gentle nature sounds, energetic ones get subtle rhythmic textures
- Played at very low volume (15-20%) so they don't compete with voice
- Crossfade between soundscapes as the conversation evolves
- User can mute with a single tap

### Performance Considerations

- Image and SFX generation happen in parallel, after TTS completes
- Images are displayed as data URIs (no storage needed)
- Previous images are cleaned up to prevent memory leaks
- If generation fails, the session continues normally -- visuals are purely additive
- Soundscapes are cached per turn to avoid re-generation

