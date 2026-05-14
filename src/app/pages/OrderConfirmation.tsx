import { Link, useSearchParams } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order") || "ZORA-2026-0087";

  return (
    <div className="min-h-[60vh] max-w-3xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-8 text-[color:var(--accent)]"
      >
        <CheckCircle2 size={80} strokeWidth={1.5} />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-syne text-[color:var(--text-primary)] mb-4">
        Thank you for your order!
      </h1>
      
      <p className="text-lg font-space text-[color:var(--text-primary)] opacity-80 mb-2">
        Your payment has been successfully processed.
      </p>
      
      <div className="bg-[color:var(--bg-card)] px-8 py-6 rounded-2xl my-8 border border-[color:var(--bg-primary)] border-opacity-20 shadow-sm">
        <p className="text-sm font-bold text-[color:var(--text-primary)] opacity-60 mb-2 uppercase tracking-widest">Order Number</p>
        <p className="text-3xl font-syne text-[color:var(--text-primary)]">{orderNumber}</p>
      </div>
      
      <p className="text-sm text-[color:var(--text-primary)] opacity-60 max-w-md mb-12">
        We'll send you an email confirmation with your tracking details as soon as your order ships.
      </p>
      
      <Link 
        to="/" 
        className="px-10 py-4 bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] rounded-full font-bold hover:bg-[color:var(--accent)] hover:text-[color:var(--text-on-accent)] transition-colors inline-block"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
