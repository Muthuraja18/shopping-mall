import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Props {
  onBack: () => void;
}

export default function ForgotPassword({ onBack }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (!email) {
      alert("Enter your email");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password reset email sent.");
    onBack();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-4xl font-bold text-white text-center">
          Forgot Password
        </h1>

        <p className="text-neutral-400 text-center mt-3">
          We'll send you a password reset link.
        </p>

        <div className="mt-8 relative">
          <Mail className="absolute left-4 top-4 text-neutral-500" />

          <input
            className="w-full bg-neutral-900 rounded-xl py-4 pl-12 text-white outline-none"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: .95 }}
          onClick={handleReset}
          disabled={loading}
          className="mt-6 w-full bg-white text-black rounded-xl py-4 font-semibold flex items-center justify-center gap-2"
        >
          {loading ? "Sending..." : "Send Reset Link"}
          <Send size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
}