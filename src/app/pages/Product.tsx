import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Heart, Info, ChevronDown, Check, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext, Product } from "../context/AppContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { RecentlyViewed } from "../components/RecentlyViewed";
import { toast } from "sonner";
import productsData from "../../data/products.json";
import productMapping from "../../data/product-mapping.json";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist, isInWishlist, addRecentlyViewed } = useAppContext();

  const productObj = productsData.find(p => p.id === id) as Product || productsData[0] as Product;
  
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImage, setActiveImage] = useState(productObj.images.main);

  useEffect(() => {
    addRecentlyViewed(productObj);
    setSelections({}); // Reset selections on product change
    setShowErrors(false);
    setActiveImage(productObj.images.main);
  }, [productObj]);

  const isWishlisted = isInWishlist(productObj.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(productObj.id);
    } else {
      addToWishlist(productObj);
    }
  };

  const getCategoryKey = (category: string): string => {
    const mapping: Record<string, string> = {
      "Phone Cases": "phone_cases",
      "Earbuds Cases": "earbud_cases",
      "Kindle Cases": "kindle_cases",
      "Drinkware": "drinkware"
    };
    return mapping[category] || "";
  };

  const getMandatoryOptions = (category: string) => {
    const categoryKey = getCategoryKey(category);
    const categoryData = categoryKey ? (productMapping.product_mapping as any)[categoryKey] : null;

    if (categoryData) {
      const options: string[] = [];
      if (categoryData.brands) options.push("brand");
      if (categoryData.brands) options.push("model");
      if (categoryData.attributes) options.push("caseType");
      options.push("colour");
      return options;
    }

    // Fallback for other categories
    switch (category) {
      case "Tablet Cases": return ["brand", "model", "caseType", "colour"];
      case "Laptop Protection": return ["brand", "screenSize", "type", "colour"];
      case "Watch Bands": return ["watchModel", "caseSize", "hardwareColour"];
      case "Ring Holders": return ["type", "colour"];
      case "Charging": return ["colour"];
      case "Phone Straps": return ["type", "colour"];
      case "Notebooks & Planners": return ["type", "colour"];
      case "Eyewear": return ["style", "lens"];
      case "Bundles": return ["combination", "colourTheme"];
      case "Accessories": return ["type", "colour"];
      case "Collaborations": return ["design", "colour"];
      default: return ["colour"];
    }
  };

  const mandatoryOptions = getMandatoryOptions(productObj.category || "Phone Cases");
  const missingOptions = mandatoryOptions.filter(opt => !selections[opt]);
  const canAddToCart = missingOptions.length === 0;

  const handleAddToCart = () => {
    if (!canAddToCart) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    addToCart({
      product: productObj,
      quantity,
      deviceModel: selections.model || selections.watchModel || selections.screenSize || selections.brand || "Standard",
      caseType: selections.caseType || selections.type || selections.style || selections.combination || "Standard",
      color: selections.colour || selections.colourTheme || selections.hardwareColour || productObj.color
    });
    toast.success(`Added ${productObj.name} to cart`);
  };

  const setSelection = (key: string, val: string) => {
    setSelections(prev => {
      const next = { ...prev, [key]: val };
      // Clear dependent fields when brand changes
      if (key === 'brand') {
        delete next.model;
      }
      // Clear dependent fields if type changes
      if (key === 'type' && productObj.category === 'Drinkware') {
        delete next.lidType;
      }
      return next;
    });
    setShowErrors(false);
  };

  const getTypeOptions = (category: string) => {
    switch (category) {
      case "Drinkware": return ["Travel Mug", "Leakproof Tumbler", "Water Bottle"];
      case "Ring Holders": return ["MagSafe Ring", "Universal Clip Ring"];
      case "Laptop Protection": return ["Hardshell Case", "Sleeve"];
      case "Phone Straps": return ["Wristlet", "Crossbody"];
      case "Notebooks & Planners": return ["A5 Hardcover Notebook", "Dated Planner"];
      case "Accessories": return ["Screen Protector", "Lens Protector", "Charm"];
      default: return [];
    }
  };

  const getFilteredOptions = () => {
    const categoryKey = getCategoryKey(productObj.category || "Phone Cases");
    const categoryData = categoryKey ? (productMapping.product_mapping as any)[categoryKey] : null;

    const baseOptions = {
      watchModel: ["Apple Watch Series 9", "Ultra 2", "Galaxy Watch6"],
      screenSize: ["13\"", "14\"", "15\"", "16\""],
      caseSize: ["40mm", "44mm", "45mm", "49mm"],
      type: getTypeOptions(productObj.category || "Phone Cases"),
      volume: ["12 oz", "16 oz", "20 oz"],
      lidType: ["Standard", "Straw", "Flip"],
      style: ["Classic", "Round"],
      combination: ["Phone+Earbuds", "Phone+Watch Band"],
      design: ["Artist Collab 1", "Collab 2"],
      lens: ["Blue Light", "Sunglasses"],
      colourTheme: ["Clover", "Floral", "Midnight", "Monochrome"],
      hardwareColour: ["Silver", "Space Black", "Gold", "Rose Gold"]
    };

    if (categoryData) {
      // Use product mapping for brands
      const brands = categoryData.brands || [];

      // Get models based on selected brand
      let models: string[] = [];
      if (selections.brand && categoryData.models && categoryData.models[selections.brand]) {
        models = categoryData.models[selections.brand];
      } else if (categoryData.models && typeof categoryData.models === 'object' && !Array.isArray(categoryData.models)) {
        // Flatten all models from all brands if no brand selected
        models = Object.values(categoryData.models).flat() as string[];
      } else if (Array.isArray(categoryData.models)) {
        // For drinkware where models is just an array
        models = categoryData.models;
      }

      // Get case types
      const caseTypeOptions = categoryData.attributes ? categoryData.attributes.map((attr: string) => ({
        id: attr,
        name: attr,
        desc: attr === "Snap" ? "Slim, one-piece hard shell." :
              attr === "Tough" ? "Dual-layer silicone + hard shell." :
              attr === "Elite" ? "Premium materials, max protection." :
              attr === "Snap MagSafe" ? "Slim hard shell with MagSafe." :
              attr === "Tough MagSafe" ? "Dual-layer with MagSafe." :
              attr === "Folio" ? "Wrap-around protection with stand." : ""
      })) : [];

      return {
        ...baseOptions,
        brand: brands,
        model: models,
        caseType: caseTypeOptions,
        colour: categoryData.colours || ["Black", "White", "ZORA Green", "Midnight", "Blush", "Lime"]
      };
    }

    // Fallback for non-mapped categories
    return {
      ...baseOptions,
      brand: ["Apple", "Samsung", "Google", "HP", "Dell", "Lenovo"],
      model: ["iPhone 17 Pro", "iPhone 17", "Galaxy S25 Ultra", "Pixel 9", "AirPods Pro 2", "iPad Pro 11\"", "Paperwhite", "Oasis"],
      caseType: [
        { id: "Snap", name: "Snap", desc: "Slim, one-piece hard shell." },
        { id: "Tough", name: "Tough", desc: "Dual-layer silicone + hard shell." },
        { id: "Elite", name: "Elite", desc: "Premium materials, max protection." },
        { id: "Snap MagSafe", name: "Snap MagSafe", desc: "Slim hard shell with MagSafe." },
        { id: "Tough MagSafe", name: "Tough MagSafe", desc: "Dual-layer with MagSafe." },
        { id: "Folio", name: "Folio", desc: "Wrap-around protection with stand." }
      ],
      colour: ["Black", "White", "ZORA Green", "Midnight", "Blush", "Lime"]
    };
  };

  const OPTION_DATA = getFilteredOptions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-space text-[color:var(--text-primary)] hover:text-[color:var(--accent)] hover:-translate-x-1 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </button>
        <div className="text-xs font-space text-[color:var(--text-primary)] opacity-70 flex items-center">
          <Link to="/" className="hover:text-[color:var(--accent)]">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link to="/collection" className="hover:text-[color:var(--accent)]">{productObj.category}</Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="opacity-50">{productObj.name}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Gallery */}
        <div className="flex-1 flex gap-4">
          <div className="flex flex-col gap-4 w-20 hidden md:flex">
            {[1, 2].map(i => {
              const imgSrc = i === 1 ? productObj.images.main : productObj.images.detail;
              return (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(imgSrc)}
                  className={`aspect-[3/4] bg-[color:var(--bg-card)] rounded-lg overflow-hidden border-2 transition-colors focus:outline-none ${activeImage === imgSrc ? 'border-[color:var(--accent)]' : 'border-transparent hover:border-[color:var(--accent)]/50'}`}
                >
                  <ImageWithFallback src={imgSrc} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
          <div 
            className="flex-1 aspect-[3/4] bg-[color:var(--bg-card)] rounded-2xl overflow-hidden cursor-zoom-in group relative"
            onClick={() => setIsZoomed(true)}
          >
            <ImageWithFallback src={activeImage} alt={productObj.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col">
          <h1 className="text-4xl md:text-5xl font-syne text-[color:var(--text-primary)] mb-2">{productObj.name}</h1>
          <p className="text-2xl font-space font-bold text-[color:var(--text-primary)] mb-8">€{productObj.price.toFixed(2)}</p>

          {/* Dynamic Options */}
          <div className="mb-8 space-y-6">
            {mandatoryOptions.map(opt => {
              // Skip rendering if the option array is empty (conditional visibility)
              const optionArray = (OPTION_DATA as any)[opt];
              if (Array.isArray(optionArray) && optionArray.length === 0) return null;

              return (
                <div key={opt}>
                  <label className="text-sm font-space font-bold text-[color:var(--text-primary)] mb-3 flex items-center capitalize">
                    {opt.replace(/([A-Z])/g, ' $1').trim()}
                    {showErrors && !selections[opt] && (
                      <span className="ml-2 text-xs text-red-500 bg-red-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertTriangle size={12} /> Required
                      </span>
                    )}
                  </label>

                  {opt === 'caseType' ? (
                    <div className="flex flex-col gap-3">
                      {OPTION_DATA.caseType.map(type => (
                        <label
                          key={type.id}
                          className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                            selections[opt] === type.id
                              ? 'border-[color:var(--accent)] bg-[color:var(--bg-card)]'
                              : showErrors && !selections[opt]
                                ? 'border-red-500 bg-red-500/5'
                                : 'border-[color:var(--bg-primary)] hover:border-[color:var(--text-primary)]'
                          }`}
                        >
                          <input type="radio" name={opt} value={type.id} checked={selections[opt] === type.id} onChange={() => setSelection(opt, type.id)} className="sr-only" />
                          <div className="flex-1 flex flex-col">
                            <span className="font-bold text-[color:var(--text-primary)]">{type.name}</span>
                            <span className="text-xs text-[color:var(--text-primary)] opacity-60">{type.desc}</span>
                          </div>
                          {selections[opt] === type.id && <Check size={20} className="text-[color:var(--accent)]" />}
                          <div className="absolute right-4 top-4 text-[color:var(--text-primary)] opacity-30 hover:opacity-100 hidden sm:block" title={type.desc}><Info size={16} /></div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={selections[opt] || ""}
                        onChange={(e) => setSelection(opt, e.target.value)}
                        className={`w-full bg-[color:var(--bg-card)] border rounded-lg px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] appearance-none cursor-pointer ${
                          showErrors && !selections[opt] ? 'border-red-500 bg-red-500/5' : 'border-[color:var(--bg-primary)]'
                        }`}
                      >
                        <option value="" disabled>Select {opt.replace(/([A-Z])/g, ' $1').trim()}</option>
                        {((OPTION_DATA as any)[opt] || OPTION_DATA.colour).map((val: string) => (
                          <option key={val} value={val}>{val}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${showErrors && !selections[opt] ? 'text-red-500' : 'text-[color:var(--text-primary)]'}`} size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-3 border border-[color:var(--bg-primary)] rounded-full px-4 bg-[color:var(--bg-card)]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] p-2 -ml-2 transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-full">-</button>
              <span className="w-4 text-center font-bold text-[color:var(--text-primary)]">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] p-2 -mr-2 transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-full">+</button>
            </div>
            
            <div className="flex-1 relative group">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-bold flex justify-center items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none ${
                  canAddToCart 
                    ? 'bg-[color:var(--accent)] text-[color:var(--text-on-accent)] hover:opacity-90 active:scale-95' 
                    : 'bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] opacity-80'
                }`}
              >
                Add to Cart
              </button>
              {!canAddToCart && showErrors && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] px-3 py-2 bg-red-500 text-white text-xs rounded-lg transition-opacity pointer-events-none text-center shadow-lg z-10 font-bold">
                  Please select: {missingOptions.map(o => o.replace(/([A-Z])/g, ' $1').trim().toLowerCase()).join(", ")}
                </div>
              )}
            </div>

            <button 
              onClick={handleWishlist}
              className="w-14 flex-shrink-0 border border-[color:var(--bg-primary)] rounded-full flex items-center justify-center text-[color:var(--text-primary)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors bg-[color:var(--bg-card)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none"
            >
              <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
            </button>
          </div>

          <div className="border-t border-[color:var(--bg-primary)]">
            {[
              { id: "details", title: "Product Details", content: "Printed edge to edge on a high-quality shatterproof polycarbonate case. The print is embedded into the material, meaning it will never fade, peel, or scratch." },
              { id: "delivery", title: "Delivery & Returns", content: "Free delivery over €40. 30-day hassle-free returns. Custom cases are final sale." },
              { id: "care", title: "Care Instructions", content: "Wipe clean with a damp cloth. Do not use harsh chemicals or alcohol-based cleaners." }
            ].map(acc => (
              <div key={acc.id} className="border-b border-[color:var(--bg-primary)]">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === acc.id ? null : acc.id)}
                  className="w-full py-5 flex justify-between items-center text-left"
                >
                  <span className="font-syne text-[color:var(--text-primary)]">{acc.title}</span>
                  <ChevronDown size={20} className={`text-[color:var(--text-primary)] transition-transform ${activeAccordion === acc.id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeAccordion === acc.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 text-sm text-[color:var(--text-primary)] opacity-70 leading-relaxed">
                        {acc.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12">
        <h2 className="text-2xl font-syne text-[color:var(--text-primary)] mb-8">Complete Your Look</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {[
            { id: 'c1', name: 'Glass Screen Protector', price: 19.99, image: 'https://images.unsplash.com/photo-1771142061212-71a82269ecb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhciUyMHBob25lJTIwY2FzZXxlbnwxfHx8fDE3NzgyNzU0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
            { id: 'c2', name: 'MagSafe Ring Holder', price: 24.99, image: 'https://images.unsplash.com/photo-1760443728337-35a585921497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjB0ZXh0dXJlfGVufDF8fHx8MTc3ODI3ODI2OXww&ixlib=rb-4.1.0&q=80&w=1080' },
            { id: 'c3', name: 'Matching AirPods Case', price: 29.99, image: 'https://images.unsplash.com/photo-1592756086927-9a334c956fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBwaG9uZSUyMGNhc2V8ZW58MXx8fHwxNzc4Mjc4MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080' }
          ].map(cross => (
            <div key={cross.id} className="min-w-[200px] sm:min-w-[240px] flex-shrink-0 snap-start group relative bg-[color:var(--bg-card)] p-4 rounded-xl flex flex-col">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-[color:var(--bg-primary)]">
                <ImageWithFallback src={cross.image} alt={cross.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-space text-sm mb-1 text-[color:var(--text-primary)]">{cross.name}</h3>
                <p className="font-bold text-[color:var(--text-primary)]">€{cross.price.toFixed(2)}</p>
                <button 
                  onClick={() => toast.success(`Added ${cross.name} to cart`)}
                  className="w-full mt-4 py-2 border border-[color:var(--text-primary)] text-[color:var(--text-primary)] rounded-full hover:bg-[color:var(--text-primary)] hover:text-[color:var(--bg-primary)] transition-colors text-sm font-bold"
                >
                  Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/30 transition-colors">
              <X size={24} />
            </button>
            <img src={activeImage} alt={productObj.name} className="max-w-full max-h-full object-contain rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      <RecentlyViewed />
    </div>
  );
}
