import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VISUAL_PROMPT_SYSTEM = `You are an emotional-visual translator. Given a conversation snippet, produce TWO things:

1. An IMAGE PROMPT for an abstract, painterly artwork that captures the emotional tone of the conversation. Rules:
   - Always abstract and evocative, NEVER literal or photorealistic
   - Use watercolor, oil paint, or mixed-media aesthetics
   - Focus on color, light, texture, and movement
   - Emotionally resonant: calm → soft blues and golds; tension → deep reds and stormy greys; joy → warm light breaking through; curiosity → swirling patterns and openings
   - Always beautiful and safe — no disturbing imagery
   - Include aspect ratio mention: "16:9 landscape format"
   - Keep under 100 words

2. A SOUNDSCAPE PROMPT for a short ambient sound effect (5-10 seconds). Rules:
   - Match the emotional tone of the conversation
   - Nature sounds, atmospheric textures, or subtle musical elements
   - Calm → gentle rain, soft wind, distant chimes
   - Tension → low rumble, wind through canyons, distant thunder
   - Joy → birdsong, sunlit meadow ambience, gentle stream
   - Curiosity → crystalline tones, cave echoes, underwater bubbles
   - Keep under 20 words

Respond in EXACTLY this JSON format (no markdown, no code fences):
{"imagePrompt":"your image prompt here","soundscapePrompt":"your soundscape prompt here"}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Step 1: Analyze conversation and generate prompts using Gemini Flash
    const recentMessages = messages.slice(-4); // Last 2-3 exchanges
    const promptResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            { role: "system", content: VISUAL_PROMPT_SYSTEM },
            {
              role: "user",
              content: `Analyze this conversation and generate visual + soundscape prompts:\n\n${recentMessages
                .map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
                .join("\n")}`,
            },
          ],
        }),
      }
    );

    if (!promptResponse.ok) {
      const t = await promptResponse.text();
      console.error("Prompt generation error:", promptResponse.status, t);
      throw new Error("Visual generation failed");
    }

    const promptData = await promptResponse.json();
    const promptContent = promptData.choices?.[0]?.message?.content || "{}";
    
    // Extract JSON from possible markdown fences
    const jsonMatch = promptContent.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) throw new Error("Invalid prompt format");
    const { imagePrompt, soundscapePrompt } = JSON.parse(jsonMatch[0]);

    console.log("Generated image prompt:", imagePrompt);
    console.log("Generated soundscape prompt:", soundscapePrompt);

    // Step 2: Generate image using Gemini Flash Image model
    const imageResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            {
              role: "user",
              content: imagePrompt,
            },
          ],
        }),
      }
    );

    if (!imageResponse.ok) {
      const t = await imageResponse.text();
      console.error("Visual image generation error:", imageResponse.status, t);
      // Return just the soundscape prompt if image fails
      return new Response(
        JSON.stringify({ imageBase64: null, soundscapePrompt }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const imageData = await imageResponse.json();
    
    // Extract base64 image from the response
    // Gemini image model returns inline_data with base64
    let imageBase64 = null;
    const choice = imageData.choices?.[0];
    if (choice?.message?.content) {
      // Check if content is an array with parts (multimodal response)
      const content = choice.message.content;
      if (Array.isArray(content)) {
        for (const part of content) {
          if (part.type === "image_url" && part.image_url?.url) {
            // Already a data URI
            imageBase64 = part.image_url.url;
            break;
          }
          if (part.inline_data) {
            imageBase64 = `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
            break;
          }
        }
      } else if (typeof content === "string" && content.startsWith("data:image")) {
        imageBase64 = content;
      }
    }

    // Also check for inline images in the response format used by some models
    if (!imageBase64 && imageData.data?.[0]?.b64_json) {
      imageBase64 = `data:image/png;base64,${imageData.data[0].b64_json}`;
    }

    return new Response(
      JSON.stringify({ imageBase64, soundscapePrompt }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("wonder-visuals error:", e);
    return new Response(
      JSON.stringify({
        error: "An error occurred. Please try again.",
        imageBase64: null,
        soundscapePrompt: null,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
