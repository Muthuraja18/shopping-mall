import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Crown,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface Props {
  onSuccess: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export default function Login({ onSuccess, onRegister, onForgotPassword }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onSuccess();
  }

  async function googleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-6">

      {/* Background */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.6, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-yellow-500/20 blur-[120px]"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute top-20 right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl"
      >

        {/* Logo */}

        <div className="flex justify-center mb-6">

          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 flex items-center justify-center"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>

        </div>

        <h1 className="text-center text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="text-center text-neutral-400 mt-3">
          Login to continue your premium shopping experience.
        </p>

        {/* Email */}

        <div className="relative mt-8">

          <Mail className="absolute left-4 top-4 text-neutral-500" />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl bg-neutral-900 py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}

        <div className="relative mt-5">

          <Lock className="absolute left-4 top-4 text-neutral-500" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-xl bg-neutral-900 py-4 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-neutral-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

        </div>

        {/* Remember */}

        <div className="flex justify-between items-center mt-4">

          <label className="flex items-center gap-2 text-sm text-neutral-400">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            Remember Me

          </label>

          <button onClick={onForgotPassword}
          className="
          text-sm
          text-yellow-400
          hover:text-yellow-300
          "
          >
          Forgot Password?
          </button>


        </div>

        {/* Login */}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: .97 }}
          onClick={handleLogin}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-white py-4 text-black font-semibold flex justify-center items-center gap-2"
        >
          {loading ? "Signing In..." : "Login"}

          <ArrowRight size={18} />
        </motion.button>

        {/* Divider */}

        <div className="flex items-center my-6">

          <div className="flex-1 h-px bg-white/10"></div>

          <span className="px-4 text-neutral-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-white/10"></div>

        </div>

        {/* Google */}

        <button
          onClick={googleLogin}
          className="w-full rounded-xl border border-white/10 bg-neutral-900 py-4 text-white hover:bg-neutral-800 transition"
        >
          Continue with Google
        </button>

        {/* Benefits */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">

          <div className="flex items-center gap-2 mb-4">

            <Sparkles className="text-yellow-400" />

            <h3 className="font-semibold text-white">
              Premium Benefits
            </h3>

          </div>

          <div className="space-y-3 text-sm text-neutral-300">

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" size={18} />
              AI Shopping Concierge
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" size={18} />
              VIP Lounge Access
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" size={18} />
              Exclusive Rewards
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" size={18} />
              Indoor Smart Navigation
            </div>

          </div>

        </div>

        {/* Register */}

        <p className="mt-8 text-center text-neutral-400">

          Don't have an account?

          <button
            onClick={onRegister}
            className="ml-2 font-semibold text-white hover:text-yellow-400"
          >
            Register
          </button>

        </p>

      </motion.div>

    </div>
  );
}
