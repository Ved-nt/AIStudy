import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Study", path: "/study" },
    { name: "Quiz", path: "/quiz" },
    { name: "History", path: "/history" },
  ];

  return (
    <nav className="sticky text-2xl top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-violet-400">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide"
        >
          AI STUDY SUITE
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm transition-colors ${
                location.pathname === item.path
                  ? "text-violet-400"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}