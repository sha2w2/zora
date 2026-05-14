import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { X, SlidersHorizontal, Heart, ShoppingCart, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext, Product } from "../context/AppContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import productsData from "../../data/products.json";

const MOCK_PRODUCTS: Product[] = productsData as Product[];

export default function Collection() {
  const { deviceModel, setDeviceModel, addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useAppContext();
  const [searchParams] = useSearchParams();
  
  const paramCategory = searchParams.get("category");
  const paramVibe = searchParams.get("vibe");
  const paramSale = searchParams.get("sale");
  const paramCaseType = searchParams.get("casetype");

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    color: [],
    caseType: [],
    features: []
  });
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsFilterOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced load
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];
      
      // Apply URL Params first
      if (paramCategory) {
        const catMap: Record<string, string> = {
          "phone-cases": "Phone Cases",
          "charging": "Charging",
          "ring-holders": "Ring Holders",
          "drinkware": "Drinkware",
          "earbuds-cases": "Earbuds Cases",
          "tablet-cases": "Tablet Cases",
          "kindle-cases": "Kindle Cases",
          "laptop-protection": "Laptop Protection",
          "watch-bands": "Watch Bands",
          "phone-straps": "Phone Straps",
          "notebooks-planners": "Notebooks & Planners",
          "eyewear": "Eyewear",
          "bundles": "Bundles",
          "accessories": "Accessories",
          "collaborations": "Collaborations"
        };
        const mappedCat = catMap[paramCategory.toLowerCase()];
        if (mappedCat) {
          filtered = filtered.filter(p => p.category === mappedCat);
        }
      }
      
      if (paramVibe) {
        filtered = filtered.filter(p => p.vibe === paramVibe);
      }
      
      if (paramSale) {
        filtered = filtered.filter(p => p.isSale);
      }

      if (paramCaseType) {
        filtered = filtered.filter(p => p.caseType.toLowerCase() === paramCaseType.toLowerCase());
      }

      // Then apply UI filters
      if (activeFilters.color.length > 0) {
        filtered = filtered.filter(p => activeFilters.color.includes(p.color));
      }
      if (activeFilters.caseType.length > 0) {
        filtered = filtered.filter(p => activeFilters.caseType.includes(p.caseType));
      }
      if (activeFilters.features.includes("MagSafe")) {
        filtered = filtered.filter(p => p.isMagSafe);
      }
      
      // Sort
      if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
      if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
      if (sortBy === "newest") filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));

      setProducts(filtered);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeFilters, sortBy, paramCategory, paramVibe, paramSale, paramCaseType]);

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearFilters = () => {
    const prev = { ...activeFilters };
    setActiveFilters({ color: [], caseType: [], features: [] });
    toast("Filters cleared", {
      action: {
        label: "Undo",
        onClick: () => setActiveFilters(prev)
      }
    });
  };

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (product.isSoldOut) {
      toast.error("This item is sold out");
      return;
    }
    addToCart({
      product,
      quantity: 1,
      deviceModel: "Standard",
      caseType: product.caseType,
      color: product.color
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-syne text-[color:var(--text-primary)] mb-2 capitalize">
            {paramCategory ? paramCategory.replace('-', ' ') : paramVibe ? paramVibe.replace('-', ' ') + ' Vibe' : paramSale ? 'Sale' : 'All Products'}
          </h1>
          <p className="text-[color:var(--text-primary)] opacity-70 font-space text-sm">
            {loading ? "Updating..." : `${products.length} items`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[color:var(--bg-card)] border border-[color:var(--bg-primary)] rounded-full text-sm font-bold text-[color:var(--text-primary)] hover:border-[color:var(--text-primary)] transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
          </button>
          
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--bg-card)] border border-[color:var(--bg-primary)] rounded-full text-sm font-bold text-[color:var(--text-primary)] hover:border-[color:var(--text-primary)] transition-colors">
              Sort: <span className="opacity-70 capitalize">{sortBy.replace('-', ' ')}</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-[color:var(--bg-card)] border border-[color:var(--bg-primary)] rounded-xl shadow-xl overflow-hidden hidden group-hover:block z-20">
              {[
                { id: "featured", label: "Featured" },
                { id: "newest", label: "Newest" },
                { id: "price-low", label: "Price: Low to High" },
                { id: "price-high", label: "Price: High to Low" }
              ].map(sort => (
                <button
                  key={sort.id}
                  onClick={() => setSortBy(sort.id)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-[color:var(--bg-primary)] transition-colors flex items-center justify-between ${sortBy === sort.id ? 'font-bold text-[color:var(--accent)]' : 'text-[color:var(--text-primary)]'}`}
                >
                  {sort.label}
                  {sortBy === sort.id && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      <AnimatePresence>
        {(totalActiveFilters > 0 || isFilterOpen) && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            {isFilterOpen && (
              <div className="bg-[color:var(--bg-card)] border border-[color:var(--bg-primary)] rounded-2xl p-6 mb-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Colors */}
                <div>
                  <h3 className="font-syne text-[color:var(--text-primary)] mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Black", "Floral", "Clear", "Neon"].map(color => (
                      <button
                        key={color}
                        onClick={() => toggleFilter("color", color)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          activeFilters.color.includes(color) 
                            ? 'bg-[color:var(--accent)] text-[color:var(--text-on-accent)] border-[color:var(--accent)]' 
                            : 'bg-transparent text-[color:var(--text-primary)] border-[color:var(--bg-primary)] hover:border-[color:var(--text-primary)]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Case Type */}
                <div>
                  <h3 className="font-syne text-[color:var(--text-primary)] mb-3">Case Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Snap", "Tough", "Elite"].map(type => (
                      <button
                        key={type}
                        onClick={() => toggleFilter("caseType", type)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          activeFilters.caseType.includes(type) 
                            ? 'bg-[color:var(--accent)] text-[color:var(--text-on-accent)] border-[color:var(--accent)]' 
                            : 'bg-transparent text-[color:var(--text-primary)] border-[color:var(--bg-primary)] hover:border-[color:var(--text-primary)]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Features */}
                <div>
                  <h3 className="font-syne text-[color:var(--text-primary)] mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleFilter("features", "MagSafe")}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        activeFilters.features.includes("MagSafe") 
                          ? 'bg-[color:var(--accent)] text-[color:var(--text-on-accent)] border-[color:var(--accent)]' 
                          : 'bg-transparent text-[color:var(--text-primary)] border-[color:var(--bg-primary)] hover:border-[color:var(--text-primary)]'
                      }`}
                    >
                      MagSafe Compatible
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {totalActiveFilters > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-space text-[color:var(--text-primary)] opacity-70 mr-2">Active:</span>
                {Object.entries(activeFilters).flatMap(([category, values]) => 
                  values.map(val => (
                    <span key={`${category}-${val}`} className="inline-flex items-center gap-1 px-3 py-1 bg-[color:var(--accent)] text-[color:var(--text-on-accent)] rounded-full text-xs font-bold">
                      {val}
                      <button onClick={() => toggleFilter(category, val)} className="hover:opacity-70">
                        <X size={14} />
                      </button>
                    </span>
                  ))
                )}
                <button onClick={clearFilters} className="text-sm text-[color:var(--text-primary)] underline-offset-4 hover:underline ml-2">
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
        <AnimatePresence>
          {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="animate-pulse flex flex-col">
              <div className="aspect-[3/4] bg-[color:var(--bg-card)] rounded-xl mb-4"></div>
              <div className="h-4 bg-[color:var(--bg-card)] rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-[color:var(--bg-card)] rounded w-1/4"></div>
            </motion.div>
          ))
        ) : products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full py-20 text-center">
            <h3 className="text-2xl font-syne text-[color:var(--text-primary)] mb-2">No designs found</h3>
            <p className="text-[color:var(--text-primary)] opacity-70 mb-6">Try adjusting your filters to see more results.</p>
            <button onClick={clearFilters} className="px-6 py-2 bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] rounded-full font-bold">
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          products.map(product => {
            const isWishlisted = isInWishlist(product.id);
            return (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={product.id}>
                <Link to={`/product/${product.id}`} viewTransition className="group flex flex-col relative h-full">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isSoldOut ? (
                    <span className="bg-[color:var(--bg-card)] text-[color:var(--text-primary)] text-[10px] font-bold px-2 py-1 rounded-full border border-[color:var(--text-primary)] uppercase tracking-widest">Sold Out</span>
                  ) : product.isNew ? (
                    <span className="bg-[color:var(--accent)] text-[color:var(--text-on-accent)] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">New</span>
                  ) : product.isSale ? (
                    <span className="bg-[#E43131] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Sale</span>
                  ) : product.isMagSafe ? (
                    <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest border border-white/20">MagSafe</span>
                  ) : null}
                </div>

                {/* Wishlist Toggle */}
                <button 
                  onClick={(e) => handleWishlist(e, product)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[color:var(--bg-card)] flex items-center justify-center text-[color:var(--text-primary)] hover:scale-110 transition-transform shadow-sm"
                >
                  <Heart size={16} className={isWishlisted ? "fill-[color:var(--accent)] text-[color:var(--accent)]" : ""} />
                </button>

                {/* Image */}
                <motion.div 
                  whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-[color:var(--bg-card)] relative transform-style-3d perspective-1000"
                >
                  <ImageWithFallback src={product.images.main} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0" />
                  <ImageWithFallback src={product.images.detail} alt={`${product.name} Detail`} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button 
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-full py-3 rounded-full flex items-center justify-center gap-2 font-bold text-sm active:scale-95 transition-transform ${
                        product.isSoldOut 
                          ? "bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] opacity-50 cursor-not-allowed" 
                          : "bg-white/90 backdrop-blur-md text-black hover:bg-white"
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {product.isSoldOut ? "Sold Out" : "Quick Add"}
                    </button>
                  </div>
                </motion.div>

                {/* Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-space text-sm text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">{product.name}</h3>
                    <p className="text-xs text-[color:var(--text-primary)] opacity-50 mt-1">{product.caseType} • {product.color}</p>
                  </div>
                  <p className="font-bold text-[color:var(--text-primary)]">€{product.price.toFixed(2)}</p>
                </div>
              </Link>
            </motion.div>
            );
          })
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}