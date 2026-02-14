import { motion } from "framer-motion";

const WonderPageBackground = () => (
  <>
    {/* Animated color blobs */}
    <motion.div
      className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsl(350 72% 55% / 0.15) 0%, transparent 70%)' }}
      animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[10%] right-[-15%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsl(270 50% 55% / 0.12) 0%, transparent 70%)' }}
      animate={{ x: [0, -25, 15, 0], y: [0, 25, -10, 0], scale: [1, 0.9, 1.1, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[5%] left-[20%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsl(175 45% 45% / 0.1) 0%, transparent 65%)' }}
      animate={{ x: [0, 20, -15, 0], y: [0, -15, 20, 0], scale: [1, 1.05, 0.95, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsl(42 90% 58% / 0.08) 0%, transparent 60%)' }}
      animate={{ x: [0, -10, 20, 0], y: [0, 15, -20, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[20%] right-[30%] w-[30vw] h-[30vw] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsl(200 70% 55% / 0.1) 0%, transparent 65%)' }}
      animate={{ x: [0, 15, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.08, 0.92, 1] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[55%] left-[-5%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsl(42 90% 58% / 0.07) 0%, transparent 60%)' }}
      animate={{ x: [0, 15, -10, 0], y: [0, -10, 15, 0] }}
      transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Noise/grain */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-soft-light z-[1]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />

    {/* Subtle grid */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
      style={{
        backgroundImage: `linear-gradient(hsl(270 50% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(270 50% 55% / 0.3) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}
    />
  </>
);

export default WonderPageBackground;
