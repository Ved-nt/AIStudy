import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Study", path: "/study" },
    { name: "Quiz", path: "/quiz" },
    { name: "History", path: "/history" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          sticky top-0 z-50
          border-b border-white/10
          backdrop-blur-2xl
          bg-white/[0.03]
          shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        "
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="relative text-xl md:text-2xl font-bold tracking-wider"
          >
            <span className="text-white">AI</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              {" "}
              STUDY SUITE
            </span>

            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-violet-500/0 via-violet-500 to-cyan-500/0" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                      ${
                        active
                          ? "text-white bg-white/10 border border-white/10"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {active && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="
                          absolute inset-0 rounded-xl
                          bg-gradient-to-r from-violet-500/20 to-cyan-500/20
                          border border-white/10
                        "
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              md:hidden
              p-2 rounded-lg
              border border-white/10
              bg-white/5
              text-white
            "
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden
              fixed top-16 left-4 right-4 z-40
              rounded-2xl
              border border-white/10
              backdrop-blur-2xl
              bg-[#0f0f17]/90
              shadow-2xl
              overflow-hidden
            "
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      px-4 py-3 rounded-xl text-sm transition-all
                      ${
                        active
                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/20"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}