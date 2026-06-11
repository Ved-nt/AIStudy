import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
} from "lucide-react";

import { authAPI } from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const data =
        await authAPI.register(
          name,
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
        "Registration failed"
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
      px-6
    ">

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          p-8
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-3xl
        "
      >

        <h1 className="
          text-4xl
          font-bold
          text-center
          mb-2
        ">
          Create Account
        </h1>

        <p className="
          text-center
          text-white/50
          mb-8
        ">
          Join AI Study Suite
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

        <InputField
          icon={<User size={18} />}
          placeholder="Full Name"
          value={name}
          onChange={setName}
        />

        <InputField
          icon={<Mail size={18} />}
          placeholder="Email Address"
          value={email}
          onChange={setEmail}
          type="email"
        />

        <InputField
          icon={<Lock size={18} />}
          placeholder="Password"
          value={password}
          onChange={setPassword}
          type="password"
        />

        <div className="
          flex
          items-center
          mt-4
        ">

          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) =>
              setRememberMe(
                e.target.checked
              )
            }
          />

          <label
            htmlFor="rememberMe"
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
            mt-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-cyan-500
          "
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <div className="
          text-center
          mt-5
          text-white/50
        ">
          Already have an account?

          <Link
            to="/login"
            className="
              ml-2
              text-violet-400
            "
          >
            Login
          </Link>

        </div>

      </form>

    </div>
  );
}

function InputField({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}) {

  return (
    <div className="
      flex
      items-center
      gap-3
      px-4
      py-3
      rounded-xl
      border border-white/10
      bg-black/30
      mb-4
    ">
      {icon}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        required
        className="
          w-full
          bg-transparent
          outline-none
          text-white
        "
      />
    </div>
  );
}