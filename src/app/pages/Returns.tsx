import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { RefreshCcw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Returns() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to process a return.");
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !reason) return;
    
    toast.success("Return request submitted. We'll email you a label.");
    setShowForm(false);
    setOrderId("");
    setReason("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[color:var(--text-primary)] opacity-70 hover:opacity-100 transition-opacity mb-4">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="font-syne text-4xl font-bold">Returns & Exchanges</h1>
        <p className="font-space opacity-70 mt-2">Not satisfied? Let's make it right.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="prose prose-sm dark:prose-invert font-space text-[color:var(--text-primary)]">
            <h3 className="font-syne text-xl mb-4">Our Return Policy</h3>
            <p className="mb-4 opacity-80">
              We accept returns within 30 days of delivery. Items must be unused, in their original packaging, and include all accessories.
            </p>
            <ul className="mb-6 opacity-80 list-disc pl-4 space-y-2">
              <li>Original delivery fees are non-refundable.</li>
              <li>A small return delivery fee may apply depending on your location.</li>
              <li>Custom or personalised cases cannot be returned unless defective.</li>
            </ul>
            <p className="opacity-80">
              Once we receive your return, please allow 3-5 business days for processing. Refunds will be issued to your original payment method.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-[color:var(--bg-card)] p-8 rounded-2xl shadow-xl border border-[color:var(--text-primary)]/5">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCcw size={24} className="text-[color:var(--accent)]" />
              <h2 className="font-syne text-2xl font-bold">Start a Return</h2>
            </div>

            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div 
                  key="start"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  <p className="font-space text-sm opacity-80 mb-6">
                    Have your order number ready. You can find this in your order confirmation email or your Order History.
                  </p>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="w-full py-4 rounded-full bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] font-syne font-bold uppercase tracking-widest hover:scale-[0.98] active:scale-95 transition-transform"
                  >
                    Initiate Return
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium mb-1 font-space uppercase tracking-widest opacity-80">Order Number</label>
                    <input
                      type="text"
                      placeholder="e.g. ORD-12345"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                      className="w-full p-3 rounded-lg border border-[color:var(--text-primary)]/20 bg-transparent focus:outline-none focus:border-[color:var(--accent)] transition-colors font-space"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium mb-1 font-space uppercase tracking-widest opacity-80">Reason for Return</label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      className="w-full p-3 rounded-lg border border-[color:var(--text-primary)]/20 bg-transparent focus:outline-none focus:border-[color:var(--accent)] transition-colors font-space appearance-none"
                    >
                      <option value="" disabled className="text-black">Select a reason</option>
                      <option value="wrong_size" className="text-black">Ordered wrong size</option>
                      <option value="defective" className="text-black">Item is defective</option>
                      <option value="changed_mind" className="text-black">Changed my mind</option>
                      <option value="other" className="text-black">Other</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-4 rounded-full border border-[color:var(--text-primary)]/20 font-syne font-bold uppercase tracking-widest hover:bg-[color:var(--text-primary)]/5 transition-colors text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 rounded-full bg-[color:var(--accent)] text-[color:var(--text-on-accent)] font-syne font-bold uppercase tracking-widest hover:scale-[0.98] active:scale-95 transition-transform text-xs sm:text-sm"
                    >
                      Submit
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}