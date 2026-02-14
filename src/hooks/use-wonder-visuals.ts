import { useState, useRef, useCallback } from "react";
import { generateWonderVisual, fetchWonderSFX, type WonderVisual } from "@/lib/wonder-api";

type Msg = { role: "user" | "assistant"; content: string };

export function useWonderVisuals() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [visualsEnabled, setVisualsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const previousAudioUrlRef = useRef<string | null>(null);

  const crossfadeImage = useCallback((newImage: string | null) => {
    if (!newImage) return;
    setPreviousImage(currentImage);
    setIsCrossfading(true);
    // Small delay then set new image
    setTimeout(() => {
      setCurrentImage(newImage);
      // After crossfade completes, clear previous
      setTimeout(() => {
        setPreviousImage(null);
        setIsCrossfading(false);
      }, 2500);
    }, 100);
  }, [currentImage]);

  const playAmbientAudio = useCallback(async (soundscapePrompt: string) => {
    if (!soundEnabled) return;
    try {
      // Fade out current ambient audio
      if (ambientAudioRef.current) {
        const oldAudio = ambientAudioRef.current;
        const fadeOut = setInterval(() => {
          if (oldAudio.volume > 0.02) {
            oldAudio.volume = Math.max(0, oldAudio.volume - 0.02);
          } else {
            clearInterval(fadeOut);
            oldAudio.pause();
            if (previousAudioUrlRef.current) {
              URL.revokeObjectURL(previousAudioUrlRef.current);
            }
          }
        }, 100);
      }

      const audioUrl = await fetchWonderSFX(soundscapePrompt);
      previousAudioUrlRef.current = audioUrl;
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.volume = 0;
      ambientAudioRef.current = audio;

      await audio.play();
      // Fade in
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.15) {
          audio.volume = Math.min(0.15, audio.volume + 0.02);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    } catch (e) {
      console.error("Ambient audio error:", e);
    }
  }, [soundEnabled]);

  const generateVisuals = useCallback(async (messages: Msg[]) => {
    if (!visualsEnabled) return;
    try {
      const result = await generateWonderVisual(messages);
      if (result.imageBase64) {
        crossfadeImage(result.imageBase64);
      }
      if (result.soundscapePrompt && soundEnabled) {
        playAmbientAudio(result.soundscapePrompt);
      }
    } catch (e) {
      console.error("Visual generation error:", e);
      // Non-fatal — session continues without visuals
    }
  }, [visualsEnabled, soundEnabled, crossfadeImage, playAmbientAudio]);

  const cleanup = useCallback(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause();
      ambientAudioRef.current = null;
    }
    if (previousAudioUrlRef.current) {
      URL.revokeObjectURL(previousAudioUrlRef.current);
      previousAudioUrlRef.current = null;
    }
  }, []);

  const toggleVisuals = useCallback(() => setVisualsEnabled(v => !v), []);
  const toggleSound = useCallback(() => {
    setSoundEnabled(v => {
      const next = !v;
      if (!next && ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
      return next;
    });
  }, []);

  return {
    currentImage,
    previousImage,
    isCrossfading,
    visualsEnabled,
    soundEnabled,
    toggleVisuals,
    toggleSound,
    generateVisuals,
    cleanup,
  };
}
