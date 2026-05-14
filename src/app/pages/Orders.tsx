import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { Package, ExternalLink, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Orders() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view your orders.");
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) return null;

  const mockOrders = [
    {
      id: "ORD-8A7B9C",
      date: "May 4, 2026",
      items: ["Crimson Waves Case (iPhone 15 Pro)", "Glass Screen Protector"],
      total: 54.98,
      status: "Delivered"
    },
    {
      id: "ORD-2F3E4D",
      date: "April 12, 2026",
      items: ["Midnight Obsidian Case (iPhone 15 Pro)"],
      total: 44.99,
      status: "Delivered"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[color:var(--text-primary)] opacity-70 hover:opacity-100 transition-opacity mb-4">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="font-syne text-4xl font-bold">My Orders</h1>
        <p className="font-space opacity-70 mt-2">View and track your recent purchases.</p>
      </div>

      <div className="bg-[color:var(--bg-card)] rounded-2xl shadow-xl overflow-hidden border border-[color:var(--text-primary)]/5">
        {mockOrders.map((order, i) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border-b border-[color:var(--text-primary)]/10 last:border-0 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:bg-[color:var(--text-primary)]/5 transition-colors"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[color:var(--bg-primary)] flex items-center justify-center shrink-0">
                <Package size={24} className="text-[color:var(--text-primary)]" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-syne font-bold">{order.id}</h3>
                  <span className="text-xs font-space bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm font-space opacity-70 mb-2">{order.date}</p>
                <div className="text-sm font-space">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="opacity-80">• {item}</div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
              <p className="font-syne font-bold text-xl">€{order.total.toFixed(2)}</p>
              <button className="flex items-center gap-2 text-sm font-space font-bold uppercase tracking-widest text-[color:var(--accent)] hover:opacity-70 transition-opacity">
                View Details <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}