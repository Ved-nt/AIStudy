import { motion } from "framer-motion";

import Navbar from "./Navbar";
import BackgroundEffects from "./BackgroundEffects";

export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Background */}
      <BackgroundEffects />

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          relative z-10
          max-w-6xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-10
        "
      >
        {/* Glass Container */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-2xl
            shadow-[0_8px_32px_rgba(0,0,0,0.45)]
            p-6 md:p-10
          "
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}