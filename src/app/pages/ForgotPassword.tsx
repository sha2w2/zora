import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { MainLogo } from "../components/MainLogo";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-[color:var(--bg-card)] shadow-xl relative"
      >
        <Link to="/signin" className="absolute top-8 left-8 text-[color:var(--text-primary)] opacity-50 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
        </Link>
        
        <div className="flex justify-center mb-8">
          <MainLogo className="h-10" />
        </div>
        
        <h1 className="text-2xl font-syne font-bold text-center mb-2">Reset Password</h1>
        <p className="text-center font-space text-sm opacity-70 mb-6">
          Enter your email and we'll send you instructions to reset your password.
        </p>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-lg bg-[color:var(--text-primary)]/5 border border-[color:var(--text-primary)]/10 text-center"
          >
            <p className="font-space text-sm text-[color:var(--text-primary)]">
              If an account exists for <span className="font-bold">{email}</span>, we've sent a password reset link.
            </p>
            <Link to="/signin" className="block mt-6 px-6 py-3 bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] font-syne font-bold uppercase tracking-widest rounded-full hover:scale-95 transition-transform">
              Back to Sign In
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 font-space uppercase tracking-widest text-[color:var(--text-primary)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg border border-[color:var(--text-primary)]/20 bg-transparent focus:outline-none focus:border-[color:var(--accent)] transition-colors"
              />
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 py-4 rounded-full bg-[color:var(--accent)] text-[color:var(--text-on-accent)] font-syne font-bold uppercase tracking-widest hover:scale-[0.98] active:scale-95 transition-transform"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}