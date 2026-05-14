import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { Link } from "react-router";

export function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, cartExpiry } = useAppContext();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] shadow-2xl flex flex-col"
            style={{ backgroundColor: "var(--bg-card)" }}
          >
            {cartExpiry && (
              <div className="bg-[color:var(--accent)] text-[color:var(--text-on-accent)] text-xs font-bold text-center py-2 flex items-center justify-center gap-2">
                Items reserved for 1 hour
              </div>
            )}
            <div className="flex justify-between items-center p-6 border-b border-[color:var(--bg-primary)]">
              <h2 className="text-2xl font-syne text-[color:var(--text-primary)]">Your Cart</h2>
              <button onClick={onClose} className="p-2 -mr-2 text-[color:var(--text-primary)] hover:opacity-70">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <p className="text-[color:var(--text-primary)] font-space">Your cart is empty</p>
                  <button onClick={onClose} className="px-6 py-2 border border-[color:var(--accent)] text-[color:var(--accent)] rounded-full hover:bg-[color:var(--accent)] hover:text-[color:var(--bg-card)] transition-colors">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4 group">
                      <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[color:var(--bg-primary)]">
                        <ImageWithFallback src={item.product.images.main} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-space text-sm text-[color:var(--text-primary)]">{item.product.name}</h3>
                            <p className="text-xs text-[color:var(--text-primary)] opacity-60">
                              {item.deviceModel} • {item.caseType}
                            </p>
                          </div>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-[color:var(--text-primary)] opacity-50 hover:opacity-100 hover:text-[color:var(--accent)] transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-3 border border-[color:var(--bg-primary)] rounded-full px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="text-[color:var(--text-primary)] opacity-70 hover:opacity-100"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-xs font-medium w-4 text-center text-[color:var(--text-primary)]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="text-[color:var(--text-primary)] opacity-70 hover:opacity-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-bold text-[color:var(--text-primary)]">€{item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-[color:var(--bg-primary)]">
                <div className="flex justify-between mb-4 font-space text-sm text-[color:var(--text-primary)]">
                  <span>Subtotal</span>
                  <span className="font-bold">€{total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[color:var(--text-primary)] opacity-60 mb-4 text-center">Delivery & taxes calculated at checkout</p>
                <Link to="/checkout" onClick={onClose} className="w-full py-4 bg-[color:var(--accent)] text-[color:var(--text-on-accent)] rounded-full font-bold hover:opacity-90 transition-opacity block text-center mb-4">
                  Go to Checkout
                </Link>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 text-[color:var(--text-primary)] opacity-70 text-xs font-space font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} /> Secure Checkout
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <CreditCard size={20} />
                    <span className="text-xs font-bold uppercase">Visa</span>
                    <span className="text-xs font-bold uppercase">MC</span>
                    <span className="text-xs font-bold uppercase">PayPay</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
