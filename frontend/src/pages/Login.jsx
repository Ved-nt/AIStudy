import { useState } from "react";
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

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const data =
        await authAPI.login(
          email,
          password
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
        })
      );

      navigate("/");

    } catch {

      setError(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#07070b]
        relative
        overflow-hidden
        px-6
      "
    >

      {/* Background Effects */}
      <div
        className="
          absolute
          w-[400px]
          h-[400px]
          bg-violet-600/20
          blur-[120px]
          rounded-full
          top-[-100px]
          left-[-100px]
        "
      />

      <div
        className="
          absolute
          w-[350px]
          h-[350px]
          bg-cyan-600/20
          blur-[120px]
          rounded-full
          bottom-[-100px]
          right-[-100px]
        "
      />

      {/* Login Card */}
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
          shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        "
      >

        {/* Header */}
        <div className="mb-8 text-center">

          <h1
            className="
              text-4xl
              font-bold
              mb-2
            "
          >
            Welcome Back
          </h1>

          <p className="text-white/50">
            Login to continue using
            AI Study Suite
          </p>

        </div>

        {/* Error */}
        {error && (

          <div
            className="
              mb-5
              p-3
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              text-red-400
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* Email */}
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
              pr-4
              py-3
              rounded-xl
              bg-black/40
              border
              border-white/10
              text-white
              outline-none
              focus:border-violet-500
              transition-all
            "
          />

        </div>

        {/* Password */}
        <div className="mb-6 relative">

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
              pr-4
              py-3
              rounded-xl
              bg-black/40
              border
              border-white/10
              text-white
              outline-none
              focus:border-violet-500
              transition-all
            "
          />

        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-xl
            font-medium
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-600
            hover:scale-[1.02]
            transition-all
            disabled:opacity-50
            disabled:hover:scale-100
          "
        >
          {loading
            ? "Signing In..."
            : (
              <>
                Login
                <ArrowRight size={18} />
              </>
            )}
        </button>

        {/* Register Link */}
        <div
          className="
            mt-6
            text-center
            text-white/50
            text-sm
          "
        >
          Don't have an account?

          <Link
            to="/register"
            className="
              ml-2
              text-violet-400
              hover:text-violet-300
              transition-colors
            "
          >
            Create Account
          </Link>
        </div>

      </form>
    </div>
  );
}