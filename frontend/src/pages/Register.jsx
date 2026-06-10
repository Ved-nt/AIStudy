import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import { authAPI } from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
        await authAPI.register(
          name,
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

    } catch (err) {

      setError(
        err.response?.data?.message ||
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

      <div className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top,#7c3aed20,transparent_40%)]
      " />

      <form
        onSubmit={handleSubmit}
        className="
          relative
          z-10
          w-full
          max-w-md
          p-8
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-3xl
          shadow-2xl
        "
      >

        <h1 className="
          text-4xl
          font-bold
          mb-2
          text-center
          bg-gradient-to-r
          from-violet-400
          to-cyan-400
          bg-clip-text
          text-transparent
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
            text-sm
          ">
            {error}
          </div>
        )}

        <div className="space-y-4">

          <InputField
            icon={<User size={18} />}
            placeholder="Full Name"
            value={name}
            onChange={setName}
          />

          <InputField
            icon={<Mail size={18} />}
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />

          <InputField
            icon={<Lock size={18} />}
            placeholder="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />

        </div>

        <button
          disabled={loading}
          className="
            w-full
            mt-6
            py-3
            rounded-xl
            font-semibold
            bg-gradient-to-r
            from-violet-600
            to-cyan-500
            hover:opacity-90
            transition-all
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
              hover:text-violet-300
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
    ">

      <div className="text-white/40">
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
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