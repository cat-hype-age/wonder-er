import { motion } from "framer-motion";
import { ReactNode, useState, useRef } from "react";

interface MagicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const MagicButton = ({ children, onClick, className = "" }: MagicButtonProps) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = idRef.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
    onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.06, boxShadow: "0 0 30px 8px hsl(270 50% 55% / 0.3)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.15) 45%, hsl(0 0% 100% / 0.25) 50%, hsl(0 0% 100% / 0.15) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />

      {/* Click ripple burst */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: r.x, top: r.y, width: 8, height: 8, x: "-50%", y: "-50%", background: "hsl(0 0% 100% / 0.4)" }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default MagicButton;
