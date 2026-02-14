import { motion } from "framer-motion";

interface WonderBackgroundProps {
  currentImage: string | null;
  previousImage: string | null;
  enabled: boolean;
}

const WonderBackground = ({ currentImage, previousImage, enabled }: WonderBackgroundProps) => {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Previous image fading out */}
      {previousImage && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <img
            src={previousImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Current image fading in */}
      {currentImage && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <img
            src={currentImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Dark overlay to keep orb readable */}
      <div className="absolute inset-0 bg-wonder-navy/60" />
    </div>
  );
};

export default WonderBackground;

