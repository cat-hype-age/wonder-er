import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt) throw new Error("Missing prompt");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    console.log("Generating wonder image:", prompt);

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
              content: `Create a beautiful, evocative image: ${prompt}. Style: painterly, dreamlike, emotionally resonant. Rich colors and textures. Square format.`,
            },
          ],
          modalities: ["image", "text"],
        }),
      }
    );

    if (!imageResponse.ok) {
      if (imageResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please wait a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (imageResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await imageResponse.text();
      console.error("Image generation error:", imageResponse.status, t);
      throw new Error("Image generation failed");
    }

    const imageData = await imageResponse.json();

    // Extract image from response
    let imageUrl = null;
    const choice = imageData.choices?.[0];

    // Check for images array (Lovable AI gateway format)
    if (choice?.message?.images?.[0]?.image_url?.url) {
      imageUrl = choice.message.images[0].image_url.url;
    }
    // Check content array format
    else if (Array.isArray(choice?.message?.content)) {
      for (const part of choice.message.content) {
        if (part.type === "image_url" && part.image_url?.url) {
          imageUrl = part.image_url.url;
          break;
        }
        if (part.inline_data) {
          imageUrl = `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
          break;
        }
      }
    }
    // Check b64_json format
    else if (imageData.data?.[0]?.b64_json) {
      imageUrl = `data:image/png;base64,${imageData.data[0].b64_json}`;
    }

    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(imageData).slice(0, 500));
      throw new Error("No image generated");
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("wonder-image error:", e);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again.", imageUrl: null }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
