import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { Star, ArrowLeft, Gift, Award } from "lucide-react";
import { toast } from "sonner";

export default function Loyalty() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view your loyalty points.");
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) return null;

  const points = user.loyaltyPoints || 0;
  
  // Mock history data
  const history = [
    { id: 1, action: "Account Creation", points: "+10", date: "Jan 1, 2026", isPositive: true },
    { id: 2, action: "First Purchase", points: "+50", date: "Jan 5, 2026", isPositive: true },
    { id: 3, action: "Redeemed for Discount", points: "-20", date: "Feb 14, 2026", isPositive: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[color:var(--text-primary)] opacity-70 hover:opacity-100 transition-opacity mb-4">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="font-syne text-4xl font-bold">ZORA Rewards</h1>
        <p className="font-space opacity-70 mt-2">Earn points. Get exclusive access.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Points Display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-gradient-to-br from-[color:var(--bg-card)] to-[color:var(--bg-primary)] p-8 rounded-2xl shadow-xl border border-[color:var(--accent)]/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Star size={120} className="fill-[color:var(--accent)]" />
          </div>
          
          <h2 className="font-space text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Current Balance</h2>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-syne text-6xl md:text-7xl font-extrabold text-[color:var(--accent)]">{points}</span>
            <span className="font-syne text-2xl font-bold opacity-80">points</span>
          </div>
          
          <div className="w-full bg-[color:var(--text-primary)]/10 h-2 rounded-full overflow-hidden mb-2">
            <motion.div 
              initial={{ width: 0 }} animate={{ width: `${Math.min(100, (points / 500) * 100)}%` }} 
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-[color:var(--accent)]"
            />
          </div>
          <p className="font-space text-xs opacity-70">
            {500 - points > 0 ? `${500 - points} points to next tier (VIP)` : "You are a VIP member!"}
          </p>
        </motion.div>

        {/* How to earn */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[color:var(--bg-card)] p-6 rounded-2xl shadow-xl border border-[color:var(--text-primary)]/5 flex flex-col justify-center gap-4"
        >
          <div className="flex items-center gap-3">
            <Gift size={20} className="text-[color:var(--accent)]" />
            <h3 className="font-syne font-bold">Earn Points</h3>
          </div>
          <ul className="space-y-2 font-space text-sm opacity-80">
            <li>• 1 point per €1 spent</li>
            <li>• 10 points for signing up</li>
            <li>• 25 points on your birthday</li>
          </ul>
          
          <div className="w-full h-px bg-[color:var(--text-primary)]/10 my-2" />
          
          <div className="flex items-center gap-3">
            <Award size={20} className="text-[color:var(--accent)]" />
            <h3 className="font-syne font-bold">Redeem</h3>
          </div>
          <p className="font-space text-sm opacity-80">
            100 points = €10 off your next order.
          </p>
        </motion.div>
      </div>

      {/* History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-[color:var(--bg-card)] rounded-2xl shadow-xl overflow-hidden border border-[color:var(--text-primary)]/5"
      >
        <div className="p-6 border-b border-[color:var(--text-primary)]/10">
          <h3 className="font-syne text-xl font-bold">Points History</h3>
        </div>
        <div className="divide-y divide-[color:var(--text-primary)]/10">
          {history.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }}
              className="p-4 sm:px-6 flex justify-between items-center hover:bg-[color:var(--text-primary)]/5 transition-colors"
            >
              <div>
                <p className="font-space font-bold">{item.action}</p>
                <p className="font-space text-xs opacity-60 mt-1">{item.date}</p>
              </div>
              <div className={`font-syne font-bold text-lg ${item.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {item.points}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}