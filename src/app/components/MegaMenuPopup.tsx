import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { X, ChevronRight } from "lucide-react";

export function MegaMenuPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const vibes = [
    { name: "Dark & Moody", slug: "dark-moody" },
    { name: "Soft & Floral", slug: "soft-floral" },
    { name: "Clean & Minimal", slug: "clean-minimal" },
    { name: "Bold & Loud", slug: "bold-loud" }
  ];

  const deviceTypes = [
    { name: "Phone", slug: "phone-cases" },
    { name: "AirPods", slug: "earbuds-cases" },
    { name: "Tablet", slug: "tablet-cases" },
    { name: "Laptop", slug: "laptop-protection" },
    { name: "Watch", slug: "watch-bands" },
    { name: "Kindle", slug: "kindle-cases" }
  ];

  const caseTypes = [
    { name: "Snap", slug: "snap" },
    { name: "Tough", slug: "tough" },
    { name: "Elite", slug: "elite" },
    { name: "MagSafe", slug: "magsafe" }
  ];

  const quickLinks = [
    { name: "Sale", path: "/collection?sale=true" },
    { name: "New Arrivals", path: "/collection?new=true" },
    { name: "Best Sellers", path: "/collection?best=true" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-full md:w-[600px] z-[70] bg-[color:var(--bg-primary)] shadow-2xl overflow-hidden flex flex-col border-r border-[color:var(--text-primary)]/10"
          >
            <div className="p-6 border-b border-[color:var(--text-primary)]/10 flex justify-between items-center">
              <h2 className="font-syne text-2xl font-bold uppercase tracking-widest text-[color:var(--text-primary)]">Filter Hub</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[color:var(--text-primary)]/5 transition-colors">
                <X size={24} className="text-[color:var(--text-primary)]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <h3 className="font-space text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Filter by Vibe</h3>
                <div className="grid grid-cols-2 gap-3">
                  {vibes.map(vibe => (
                    <Link 
                      key={vibe.name}
                      to={`/collection?vibe=${vibe.slug}`}
                      onClick={onClose}
                      className="p-4 rounded-xl border border-[color:var(--text-primary)]/10 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/5 transition-colors font-syne font-bold text-center"
                    >
                      {vibe.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                <h3 className="font-space text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Device Type</h3>
                <div className="grid grid-cols-3 gap-3">
                  {deviceTypes.map(device => (
                    <Link 
                      key={device.name}
                      to={`/collection?category=${device.slug}`}
                      onClick={onClose}
                      className="p-3 rounded-xl bg-[color:var(--bg-card)] hover:bg-[color:var(--text-primary)]/5 transition-colors font-space text-sm text-center border border-[color:var(--text-primary)]/5"
                    >
                      {device.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="font-space text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Case Type</h3>
                <div className="flex flex-wrap gap-3">
                  {caseTypes.map(type => (
                    <Link 
                      key={type.name}
                      to={`/collection?casetype=${type.slug}`}
                      onClick={onClose}
                      className="px-5 py-2 rounded-full border border-[color:var(--text-primary)]/20 hover:border-[color:var(--accent)] transition-colors font-space text-sm"
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <h3 className="font-space text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {quickLinks.map(link => (
                    <Link 
                      key={link.name}
                      to={link.path}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[color:var(--text-primary)]/5 transition-colors font-syne font-bold text-lg"
                    >
                      <span className={link.name === "Sale" ? "text-[color:var(--accent)]" : ""}>{link.name}</span>
                      <ChevronRight size={16} className="opacity-50" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}