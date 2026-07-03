import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  Menu,
  X,
  LogOut,
  Home,
  BookOpen,
  Brain,
  History,
  LayoutDashboard,
  LogIn,
  UserPlus,
  MessageSquare
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [user, setUser] =
    useState(null);

  useEffect(() => {

  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {

    setUser(
      JSON.parse(storedUser)
    );

    setIsLoggedIn(true);

  } else {

    setUser(null);

    setIsLoggedIn(false);
  }

}, [location.pathname]);

  const handleLogout = async () => {

  try {

    await authAPI.logout();

    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    navigate("/login");

  } catch (err) {
    console.error(err);
  }

  localStorage.removeItem("user");

  setIsLoggedIn(false);

  setUser(null);

  navigate("/login");
};

  const navItems = isLoggedIn
    ? [
        {
          name: "Home",
          path: "/",
          icon: Home,
        },
        {
          name: "Study",
          path: "/study",
          icon: BookOpen,
        },
        {
          name: "Quiz",
          path: "/quiz",
          icon: Brain,
        },
        {
          name: "History",
          path: "/history",
          icon: History,
        },
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Chat",
          path: "/chat",
          icon: MessageSquare,
        },
      ]
    : [
        {
          name: "Login",
          path: "/login",
          icon: LogIn,
        },
        {
          name: "Register",
          path: "/register",
          icon: UserPlus,
        },
      ];

  return (
    <>
      <motion.nav
        initial={{
          y: -50,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          sticky top-0 z-50
          h-20
          border-b border-white/10
          bg-[#0a0a0f]/80
          backdrop-blur-2xl
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            h-full
            flex
            items-center
            justify-between
          "
        >
          {/* Logo */}
          <Link
            to={
              isLoggedIn
                ? "/"
                : "/login"
            }
            className="
              flex
              items-center
              gap-2
              shrink-0
            "
          >
            

            <div>
              <h1
                className="
                  text-lg
                  font-bold
                  leading-none
                "
              >
                AI Study Suite
              </h1>

              <p
                className="
                  text-xs
                  text-white/40
                "
              >
                Smart Learning Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
            "
          >
            {navItems.map((item) => {
              const active =
                location.pathname ===
                item.path;

              const Icon =
                item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                >
                  <motion.div
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className={`
                      h-11
                      px-4
                      rounded-xl
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon size={16} />

                    <span>
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-4
              min-w-[220px]
              justify-end
            "
          >
            {isLoggedIn &&
              user && (
                <div
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    text-sm
                    text-white/80
                    truncate
                    max-w-[160px]
                  "
                >
                  {user.name}
                </div>
              )}

            {isLoggedIn && (
              <button
                onClick={
                  handleLogout
                }
                className="
                  h-11
                  px-4
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  text-red-400
                  hover:bg-red-500/10
                  transition-all
                "
              >
                <LogOut
                  size={16}
                />

                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="
              md:hidden
              p-2
              rounded-xl
              border
              border-white/10
              bg-white/5
            "
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="
              md:hidden
              fixed
              top-20
              left-4
              right-4
              z-40
              rounded-2xl
              border
              border-white/10
              bg-[#111118]
              backdrop-blur-xl
              overflow-hidden
            "
          >
            <div className="p-4">
              {navItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <Link
                      key={
                        item.path
                      }
                      to={
                        item.path
                      }
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        text-white/70
                        hover:bg-white/5
                        transition-all
                      "
                    >
                      <Icon
                        size={
                          18
                        }
                      />

                      {
                        item.name
                      }
                    </Link>
                  );
                }
              )}

              {isLoggedIn && (
                <>
                  <div
                    className="
                      mt-3
                      px-4
                      py-3
                      text-white/50
                      border-t
                      border-white/10
                    "
                  >
                    {
                      user?.name
                    }
                  </div>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="
                      w-full
                      mt-2
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-red-400
                      hover:bg-red-500/10
                    "
                  >
                    <LogOut
                      size={
                        18
                      }
                    />

                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
