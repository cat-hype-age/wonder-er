import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  spin: number;
  life: number;
  maxLife: number;
  hue: number;
}

interface SparkleFieldProps {
  /** Number of sparkles alive at once */
  count?: number;
  /** Restrict to a className region or fullscreen */
  className?: string;
  /** Color hues to pick from (HSL hue values) */
  hues?: number[];
}

const SparkleField = ({ count = 30, className = "", hues = [350, 175, 42, 270, 200] }: SparkleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() ?? { width: window.innerWidth, height: window.innerHeight };
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Sparkle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3 + 1,
      opacity: 0,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      life: 0,
      maxLife: Math.random() * 200 + 100,
      hue: hues[Math.floor(Math.random() * hues.length)],
    });

    sparklesRef.current = Array.from({ length: count }, spawn);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      sparklesRef.current.forEach((s, i) => {
        s.life++;
        const progress = s.life / s.maxLife;
        // fade in first 20%, fade out last 30%
        s.opacity = progress < 0.2 ? progress / 0.2 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
        s.angle += s.spin;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed - 0.15; // slight upward drift

        if (s.life >= s.maxLife || s.x < -10 || s.x > w + 10 || s.y < -10 || s.y > h + 10) {
          sparklesRef.current[i] = spawn();
          return;
        }

        // Draw 4-point star
        const sz = s.size * (0.8 + 0.2 * Math.sin(s.life * 0.1));
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.globalAlpha = s.opacity * 0.7;
        ctx.fillStyle = `hsl(${s.hue}, 80%, 70%)`;
        ctx.shadowColor = `hsl(${s.hue}, 90%, 65%)`;
        ctx.shadowBlur = sz * 4;

        ctx.beginPath();
        for (let p = 0; p < 4; p++) {
          const a = (p * Math.PI) / 2;
          const outerR = sz * 2;
          const innerR = sz * 0.5;
          ctx.lineTo(Math.cos(a) * outerR, Math.sin(a) * outerR);
          ctx.lineTo(Math.cos(a + Math.PI / 4) * innerR, Math.sin(a + Math.PI / 4) * innerR);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, hues]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-[5] ${className}`}
      aria-hidden="true"
    />
  );
};

export default SparkleField;
