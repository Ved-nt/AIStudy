import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <>
      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* VIOLET ORB */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute top-[-200px] left-[-200px]
          w-[600px] h-[600px]
          rounded-full
          bg-violet-600
          opacity-15
          blur-[140px]
        "
      />

      {/* CYAN ORB */}
      <motion.div
        animate={{
          x: [0, -20, 25, 0],
          y: [0, 25, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-[-200px] right-[-200px]
          w-[600px] h-[600px]
          rounded-full
          bg-cyan-500
          opacity-15
          blur-[140px]
        "
      />

      {/* CENTER GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px]
          rounded-full
          bg-violet-500
          blur-[180px]
        "
      />

      {/* NOISE OVERLAY */}
      <div
        className="
          absolute inset-0 opacity-[0.02]
          mix-blend-soft-light
          pointer-events-none
        "
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/noise.png')",
        }}
      />
    </>
  );
}