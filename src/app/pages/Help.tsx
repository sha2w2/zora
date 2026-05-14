import { useState, useEffect } from "react";
import { Search, ChevronDown, MessageCircle, Mail, Phone, ThumbsUp, ThumbsDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqData = [
  {
    category: "Orders & Payment",
    items: [
      { q: "How can I track my order?", a: "Once your order ships, you will receive a tracking link via email. You can also view tracking information in your ZORA account dashboard under 'My Orders'." },
      { q: "Can I modify or cancel my order?", a: "We process orders quickly. You have a 1-hour window after placing your order to contact support for any modifications or cancellations." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay." }
    ]
  },
  {
    category: "Delivery",
    items: [
      { q: "Do you deliver internationally?", a: "Yes! We deliver to over 100 countries worldwide. Delivery costs are calculated at checkout based on your location." },
      { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days domestically, and 7-14 business days for international orders." }
    ]
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 30 days of delivery. Items must be unused and in their original packaging. Custom items are final sale." },
      { q: "How do I start an exchange?", a: "To initiate an exchange, please visit our Returns Portal with your order number and email address." }
    ]
  },
  {
    category: "Product Compatibility",
    items: [
      { q: "Are your cases MagSafe compatible?", a: "We offer both standard and MagSafe compatible cases. Look for the 'MagSafe Compatible' badge on the product page or use the filter." },
      { q: "Will your cases fit with a screen protector?", a: "Yes, our cases are designed to be compatible with most standard tempered glass screen protectors." }
    ]
  },
  {
    category: "Account & Loyalty",
    items: [
      { q: "How do loyalty points work?", a: "You earn 1 point for every €1 spent. 100 points equals €10 off your next purchase. You also earn points for signing up!" },
      { q: "How can I reset my password?", a: "Go to the Sign In page and click 'Forgot Password'. We will send a reset link to your email." }
    ]
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [feedbackState, setFeedbackState] = useState<Record<string, 'none' | 'yes' | 'no' | 'submitted'>>({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const toggleItem = (categoryIdx: number, itemIdx: number) => {
    const id = `${categoryIdx}-${itemIdx}`;
    setOpenItems(prev => {
      // Optional: Close others in the same category
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        if (key.startsWith(`${categoryIdx}-`) && key !== id) {
          newState[key] = false;
        }
      });
      newState[id] = !prev[id];
      return newState;
    });
  };

  const handleFeedback = (id: string, type: 'yes' | 'no') => {
    setFeedbackState(prev => ({ ...prev, [id]: type }));
  };

  const submitFeedback = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackState(prev => ({ ...prev, [id]: 'submitted' }));
  };

  const filteredData = faqData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-syne text-[color:var(--text-primary)] font-bold mb-4">Help Centre</h1>
        <p className="font-space opacity-70 mb-8">How can we assist you today?</p>
        <div className="max-w-xl mx-auto relative group">
          <input 
            type="text" 
            placeholder="Search for answers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[color:var(--bg-card)] border-2 border-[color:var(--text-primary)]/10 rounded-full py-4 pl-12 pr-6 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-all font-space shadow-sm group-hover:shadow-md"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-primary)] opacity-50" size={20} />
        </div>
      </div>

      <div className="space-y-12 mb-16">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 bg-[color:var(--bg-card)] rounded-2xl border border-[color:var(--text-primary)]/5">
            <p className="font-syne font-bold text-lg mb-2">No articles match your search.</p>
            <p className="font-space opacity-70 mb-6">Try different keywords or contact us below.</p>
            <button className="px-6 py-3 bg-[color:var(--accent)] text-[color:var(--text-on-accent)] font-syne font-bold uppercase tracking-widest rounded-full hover:scale-95 transition-transform">
              Contact Support
            </button>
          </div>
        ) : (
          filteredData.map((category, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <h2 className="text-2xl font-syne font-bold text-[color:var(--text-primary)] mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIdx) => {
                  const id = `${idx}-${itemIdx}`;
                  const isOpen = openItems[id];
                  const feedback = feedbackState[id] || 'none';

                  return (
                    <div key={itemIdx} className="border border-[color:var(--text-primary)]/10 rounded-xl overflow-hidden bg-[color:var(--bg-card)] transition-all hover:border-[color:var(--text-primary)]/30">
                      <button 
                        onClick={() => toggleItem(idx, itemIdx)}
                        className="w-full flex justify-between items-center p-5 text-left bg-transparent"
                      >
                        <span className="font-space font-bold text-[color:var(--text-primary)] pr-4">{item.q}</span>
                        <ChevronDown 
                          size={20} 
                          className={`shrink-0 text-[color:var(--text-primary)] opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 pt-0 border-t border-[color:var(--text-primary)]/5">
                              <p className="font-space text-sm opacity-80 leading-relaxed mb-6">
                                {item.a}
                              </p>
                              
                              {/* Feedback Mechanism */}
                              <div className="bg-[color:var(--bg-primary)]/30 rounded-lg p-4 text-sm font-space">
                                {feedback === 'none' && (
                                  <div className="flex items-center gap-4">
                                    <span className="opacity-70 font-bold">Was this helpful?</span>
                                    <button onClick={() => handleFeedback(id, 'yes')} className="flex items-center gap-1 hover:text-[color:var(--accent)] transition-colors"><ThumbsUp size={14}/> Yes</button>
                                    <button onClick={() => handleFeedback(id, 'no')} className="flex items-center gap-1 hover:text-[color:var(--accent)] transition-colors"><ThumbsDown size={14}/> No</button>
                                  </div>
                                )}
                                {feedback === 'yes' && (
                                  <p className="text-green-600 dark:text-green-400 font-bold flex items-center gap-2"><ThumbsUp size={14}/> Thanks for your feedback!</p>
                                )}
                                {feedback === 'submitted' && (
                                  <p className="opacity-80 font-bold">Thank you. We'll use this to improve our help centre.</p>
                                )}
                                {feedback === 'no' && (
                                  <form onSubmit={(e) => submitFeedback(id, e)} className="animate-fade-in">
                                    <p className="mb-2 opacity-80 font-bold flex items-center gap-2"><ThumbsDown size={14}/> We're sorry to hear that. What were you looking for?</p>
                                    <textarea 
                                      className="w-full bg-[color:var(--bg-card)] border border-[color:var(--text-primary)]/20 rounded p-2 text-sm focus:outline-none focus:border-[color:var(--accent)] mb-2"
                                      rows={2}
                                      placeholder="Optional feedback..."
                                    />
                                    <button type="submit" className="px-4 py-2 bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] rounded text-xs font-bold uppercase tracking-wide hover:opacity-80">
                                      Submit
                                    </button>
                                  </form>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Escalation Path */}
      <div className="bg-[color:var(--bg-card)] border border-[color:var(--text-primary)]/10 rounded-2xl p-8 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--text-primary)]" />
        <h3 className="text-2xl font-syne font-bold text-[color:var(--text-primary)] mb-2">Still need help?</h3>
        <p className="font-space opacity-70 mb-8 max-w-md mx-auto">
          Our support team is available Monday through Friday, 9am to 5pm GMT.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 w-full max-w-3xl">
          <a href="mailto:support@zorastore.com" className="flex flex-col items-center justify-center gap-3 p-6 border border-[color:var(--text-primary)]/10 rounded-xl hover:bg-[color:var(--bg-primary)]/50 transition-colors group">
            <Mail size={24} className="text-[color:var(--accent)] group-hover:scale-110 transition-transform" />
            <span className="font-syne font-bold">Email Us</span>
            <span className="text-xs font-space opacity-60">support@zorastore.com</span>
          </a>
          <button onClick={() => window.dispatchEvent(new Event('open-live-chat'))} className="flex flex-col items-center justify-center gap-3 p-6 border border-[color:var(--text-primary)]/10 rounded-xl hover:bg-[color:var(--bg-primary)]/50 transition-colors group">
            <MessageCircle size={24} className="text-[color:var(--accent)] group-hover:scale-110 transition-transform" />
            <span className="font-syne font-bold">Live Chat</span>
            <span className="text-xs font-space opacity-60">Bottom-right corner</span>
          </button>
          <a href="tel:+37012345678" className="flex flex-col items-center justify-center gap-3 p-6 border border-[color:var(--text-primary)]/10 rounded-xl hover:bg-[color:var(--bg-primary)]/50 transition-colors group">
            <Phone size={24} className="text-[color:var(--accent)] group-hover:scale-110 transition-transform" />
            <span className="font-syne font-bold">Call Us</span>
            <span className="text-xs font-space opacity-60">+37012345678</span>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 p-3 bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] rounded-full shadow-xl hover:scale-110 transition-transform"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}