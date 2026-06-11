import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { authAPI } from "../services/api";

import {
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const message =
      sessionStorage.getItem(
        "logoutMessage"
      );

    if (message) {

      toast.warning(message);

      sessionStorage.removeItem(
        "logoutMessage"
      );
    }

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);
        setError("");

        const data =
          await authAPI.login(
            email,
            password,
            rememberMe
          );

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.name,
            email: data.email,
          })
        );

        navigate("/", {
          replace: true,
        });

      } catch (err) {

        setError(
          err.response?.data?.error ||
          "Invalid email or password"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#07070b]
      relative
      overflow-hidden
      px-6
    ">

      <div className="
        absolute
        w-[400px]
        h-[400px]
        bg-violet-600/20
        blur-[120px]
        rounded-full
        top-[-100px]
        left-[-100px]
      " />

      <div className="
        absolute
        w-[350px]
        h-[350px]
        bg-cyan-600/20
        blur-[120px]
        rounded-full
        bottom-[-100px]
        right-[-100px]
      " />

      <form
        onSubmit={handleSubmit}
        className="
          relative
          w-full
          max-w-md
          p-8
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
        "
      >

        <h1 className="
          text-4xl
          font-bold
          text-center
          mb-2
        ">
          Welcome Back
        </h1>

        <p className="
          text-center
          text-white/50
          mb-8
        ">
          Login to continue using
          AI Study Suite
        </p>

        {error && (
          <div className="
            mb-5
            p-3
            rounded-xl
            bg-red-500/10
            border border-red-500/20
            text-red-400
          ">
            {error}
          </div>
        )}

        <div className="mb-4 relative">

          <Mail
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="
              w-full
              pl-12
              py-3
              rounded-xl
              bg-black/40
              border border-white/10
            "
          />

        </div>

        <div className="mb-4 relative">

          <Lock
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="
              w-full
              pl-12
              py-3
              rounded-xl
              bg-black/40
              border border-white/10
            "
          />

        </div>

        <div className="
          flex
          items-center
          mb-6
        ">

          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) =>
              setRememberMe(
                e.target.checked
              )
            }
          />

          <label
            htmlFor="remember"
            className="
              ml-2
              text-sm
              text-white/70
            "
          >
            Remember Me
          </label>

        </div>

        <button
          disabled={loading}
          className="
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-600
          "
        >
          {loading
            ? "Signing In..."
            : (
              <>
                Login
                <ArrowRight
                  size={18}
                  className="inline ml-2"
                />
              </>
            )}
        </button>

        <div className="
          mt-6
          text-center
          text-white/50
        ">
          Don't have an account?

          <Link
            to="/register"
            className="
              ml-2
              text-violet-400
            "
          >
            Create Account
          </Link>

        </div>

      </form>

    </div>
  );
}