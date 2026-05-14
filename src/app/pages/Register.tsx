import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { MainLogo } from "../components/MainLogo";
import { useAppContext } from "../context/AppContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return 0;
    if (len < 4) return 25;
    if (len < 6) return 50;
    if (len < 8) return 75;
    return 100;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return "#A22828";
    if (strength <= 50) return "#d97706";
    if (strength <= 75) return "#ca8a04";
    return "#16a34a";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const usersStr = localStorage.getItem("zora-users");
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    if (users.find((u: any) => u.email === formData.email)) {
      toast.error("Account already exists with this email.");
      return;
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      loyaltyPoints: 0
    };

    users.push(newUser);
    localStorage.setItem("zora-users", JSON.stringify(users));

    login({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      loyaltyPoints: newUser.loyaltyPoints
    });

    toast.success(`Welcome, ${newUser.firstName}!`);
    navigate("/");
  };

  const strength = getPasswordStrength();
  const isMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-[color:var(--bg-card)] shadow-xl"
      >
        <div className="flex justify-center mb-8">
          <MainLogo className="h-10" />
        </div>
        
        <h1 className="text-2xl font-syne font-bold text-center mb-6">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1 font-space uppercase tracking-widest text-[color:var(--text-primary)]">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-[color:var(--text-primary)]/20 bg-transparent focus:outline-none focus:border-[color:var(--accent)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 font-space uppercase tracking-widest text-[color:var(--text-primary)]">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-[color:var(--text-primary)]/20 bg-transparent focus:outline-none focus:border-[color:var(--accent)] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 font-space uppercase tracking-widest text-[color:var(--text-primary)]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-[color:var(--text-primary)]/20 bg-transparent focus:outline-none focus:border-[color:var(--accent)] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1 font-space uppercase tracking-widest text-[color:var(--text-primary)]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            {/* Strength Indicator */}
            <div className="w-full h-1 bg-[color:var(--text-primary)]/10 mt-2 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300" 
                style={{ width: `${strength}%`, backgroundColor: getStrengthColor(strength) }} 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 font-space uppercase tracking-widest text-[color:var(--text-primary)]">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full p-3 rounded-lg border bg-transparent focus:outline-none transition-colors ${
                formData.confirmPassword.length > 0 
                  ? isMatch ? 'border-green-500' : 'border-red-500'
                  : 'border-[color:var(--text-primary)]/20 focus:border-[color:var(--accent)]'
              }`}
            />
          </div>

          <div className="text-center text-sm pt-2">
            <span className="opacity-70">Already have an account? </span>
            <Link to="/signin" className="text-[color:var(--text-primary)] font-bold underline transition-opacity hover:opacity-70">
              Sign In
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-4 rounded-full bg-[color:var(--accent)] text-[color:var(--text-on-accent)] font-syne font-bold uppercase tracking-widest hover:scale-[0.98] active:scale-95 transition-transform"
          >
            Create Account
          </button>
        </form>
      </motion.div>
    </div>
  );
}