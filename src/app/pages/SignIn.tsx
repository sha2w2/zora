import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { MainLogo } from "../components/MainLogo";
import { useAppContext } from "../context/AppContext";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Incorrect password.");
      return;
    }

    // Check mock database
    const usersStr = localStorage.getItem("zora-users");
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    const foundUser = users.find((u: any) => u.email === email);
    
    if (!foundUser) {
      setError("No account found with that email.");
      return;
    }

    if (foundUser.password !== password) {
      setError("Incorrect password.");
      return;
    }

    // Success
    login({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      loyaltyPoints: foundUser.loyaltyPoints || 0
    });
    
    navigate(-1); // Go back to where they came from
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-[color:var(--bg-card)] shadow-xl"
      >
        <div className="flex justify-center mb-8">
          <MainLogo className="h-10" />
        </div>
        
        <h1 className="text-2xl font-syne font-bold text-center mb-6">Sign In</h1>
        
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
          
          <div className="relative">
            <label className="block text-sm font-medium mb-1 font-space uppercase tracking-widest text-[color:var(--text-primary)]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg border border-[color:var(--text-primary)]/20 bg-transparent focus:outline-none focus:border-[color:var(--accent)] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-primary)] opacity-50 hover:opacity-100"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-[color:var(--accent)] text-sm font-medium">
              {error}{" "}
              {error.includes("No account") && (
                <Link to="/register" className="underline">Create one?</Link>
              )}
            </div>
          )}

          <div className="flex justify-between items-center text-sm pt-2">
            <Link to="/forgot-password" className="text-[color:var(--text-primary)] opacity-70 hover:opacity-100 underline transition-opacity">
              Forgot password?
            </Link>
            <Link to="/register" className="text-[color:var(--text-primary)] opacity-70 hover:opacity-100 underline transition-opacity">
              Create an account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-4 rounded-full bg-[color:var(--accent)] text-[color:var(--text-on-accent)] font-syne font-bold uppercase tracking-widest hover:scale-[0.98] active:scale-95 transition-transform"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}