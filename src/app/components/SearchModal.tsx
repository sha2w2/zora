import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import productsData from "../../data/products.json";

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return productsData.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q)
    ).slice(0, 5); // Limit to 5 results for cognitive load
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-[color:var(--bg-card)] rounded-2xl shadow-2xl border border-[color:var(--bg-primary)] overflow-hidden">
              <div className="flex items-center p-4 border-b border-[color:var(--bg-primary)]">
                <SearchIcon size={24} className="text-[color:var(--text-primary)] opacity-50 ml-2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ZORA..."
                  className="flex-1 bg-transparent border-none outline-none text-xl font-syne text-[color:var(--text-primary)] px-4 py-2 placeholder:opacity-50"
                />
                <button onClick={onClose} className="p-2 text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              {query && (
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  <h3 className="text-xs font-space font-bold uppercase tracking-widest text-[color:var(--text-primary)] opacity-50 mb-4 px-2">Results</h3>
                  
                  {filteredProducts.length > 0 ? (
                    <div className="space-y-2">
                      {filteredProducts.map(product => (
                        <Link 
                          key={product.id} 
                          to={`/product/${product.id}`} 
                          onClick={onClose}
                          className="flex items-center justify-between p-3 hover:bg-[color:var(--bg-primary)] rounded-xl transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-12 bg-black/10 rounded overflow-hidden">
                              <img src={product.images.main} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-space font-bold text-sm text-[color:var(--text-primary)]">{product.name}</p>
                              <p className="text-xs text-[color:var(--text-primary)] opacity-60">{product.category} • {product.color}</p>
                            </div>
                          </div>
                          <ArrowRight size={16} className="text-[color:var(--text-primary)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[color:var(--accent)]" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 text-[color:var(--text-primary)] opacity-50 font-space text-sm">
                      No results found for "{query}"
                    </div>
                  )}

                  {filteredProducts.length > 0 && (
                    <Link to={`/collection?search=${encodeURIComponent(query)}`} onClick={onClose} className="block mt-4 text-center text-sm font-space font-bold text-[color:var(--accent)] hover:underline py-2">
                      See all results for "{query}"
                    </Link>
                  )}
                </div>
              )}
              {!query && (
                <div className="p-8 text-center text-[color:var(--text-primary)] opacity-50 font-space text-sm">
                  Start typing to search for products, categories, or collections.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}