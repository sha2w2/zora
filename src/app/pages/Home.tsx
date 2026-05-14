import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAppContext } from "../context/AppContext";
import productsData from "../../data/products.json";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { recentlyViewed, setIsDeviceModalOpen } = useAppContext();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const trendingProducts = productsData.slice(0, 8).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    images: p.images,
    isNew: p.isNew || false
  }));

  const vibes = [
    { name: "Dark & Moody", color: "var(--bg-card-dark)", text: "var(--text-primary-dark)" },
    { name: "Soft & Floral", color: "#fce7f3", text: "#9d174d" },
    { name: "Clean & Minimal", color: "#f8fafc", text: "#1e293b" },
    { name: "Bold & Loud", color: "var(--accent)", text: "var(--text-on-accent)" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section - Layered Interactive Intro */}
      <section className="relative h-[100vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-[color:var(--bg-primary)] perspective-1000">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--bg-primary)]/20 to-[color:var(--bg-primary)]" />
        </div>
        
        {/* Decorative Floating Images */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: -5 } : { opacity: 0, scale: 0.5, x: -100, y: 100, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: -5 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-[15%] left-[10%] w-[18vw] max-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-0"
          >
            <ImageWithFallback src="https://images.unsplash.com/photo-1764855310912-15dee3625bf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc4Mjc4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Floating product 1" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: 8 } : { opacity: 0, scale: 0.5, x: 100, y: -100, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 8 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute bottom-[20%] right-[12%] w-[22vw] max-w-[250px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl z-0"
          >
            <ImageWithFallback src="https://images.unsplash.com/photo-1592756086927-9a334c956fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBwaG9uZSUyMGNhc2V8ZW58MXx8fHwxNzc4Mjc4MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Floating product 2" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0, rotate: -2 } : { opacity: 0, scale: 0, y: 200 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-[60%] left-[45%] w-[15vw] max-w-[180px] aspect-square rounded-full overflow-hidden shadow-2xl z-0"
          >
            <ImageWithFallback src="https://images.unsplash.com/photo-1760443728337-35a585921497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjB0ZXh0dXJlfGVufDF8fHx8MTc3ODI3ODI2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Floating product 3" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.1,
                  delayChildren: shouldReduceMotion ? 0 : 0.1,
                }
              }
            }}
            className="flex flex-col items-center mb-6 px-12 py-8 rounded-3xl"
            style={{ color: "var(--text-primary)", background: "radial-gradient(circle, var(--bg-primary) 0%, transparent 70%)" }}
          >
            <div className="flex font-syne text-[15vw] leading-none font-extrabold tracking-tighter">
              {['Z', 'O', 'R', 'A'].map((letter, i) => (
                <motion.span 
                  key={i}
                  variants={{
                    hidden: shouldReduceMotion ? { y: 0, opacity: 1, rotateX: 0 } : { y: 150, opacity: 0, rotateX: -90 },
                    visible: { y: 0, opacity: 1, rotateX: 0 }
                  }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block transform-gpu"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-space text-lg md:text-xl text-[color:var(--text-primary)] mb-10 max-w-lg"
          >
            The Spring collection is here. Protect your tech with unapologetic style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col sm:flex-row gap-4 relative z-30"
          >
            <Link 
              to="/collection"
              className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] font-syne font-bold uppercase tracking-widest rounded-full hover:-translate-y-1 active:scale-95 transition-transform duration-300 shadow-xl"
            >
              Shop Collection
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-[color:var(--text-primary)]">Trending Now</h2>
          <Link to="/collection/trending" className="hidden sm:inline-flex items-center gap-2 font-space text-sm font-bold text-[color:var(--accent)] hover:opacity-70 transition-opacity uppercase tracking-widest">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
          {trendingProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[280px] w-[280px] sm:w-[320px] shrink-0 snap-start group cursor-pointer perspective-1000"
            >
              <motion.div 
                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative aspect-[3/4] mb-4 bg-[color:var(--bg-card)] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform-style-3d"
              >
                {/* Primary Image */}
                <ImageWithFallback 
                  src={product.images.main} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                {/* Secondary/Lifestyle Image */}
                <ImageWithFallback 
                  src={product.images.detail} 
                  alt={`${product.name} Lifestyle`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-[color:var(--accent)] text-[color:var(--text-on-accent)] text-xs font-bold font-space px-3 py-1 rounded-full uppercase tracking-widest z-10">
                    New
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <button className="w-full py-3 bg-[color:var(--bg-primary)]/90 backdrop-blur text-[color:var(--text-primary)] font-syne font-bold uppercase tracking-widest rounded-full hover:bg-[color:var(--accent)] hover:text-[color:var(--text-on-accent)] active:scale-95 transition-all">
                    Quick Add
                  </button>
                </div>
              </motion.div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-space font-medium text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-[color:var(--text-primary)] opacity-60">
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <span className="text-xs ml-1">(42)</span>
                  </div>
                </div>
                <p className="font-syne font-bold text-[color:var(--text-primary)]">€{product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/collection/trending" className="inline-flex items-center gap-2 font-space text-sm font-bold text-[color:var(--accent)] uppercase tracking-widest px-6 py-3 border border-[color:var(--accent)] rounded-full">
            View All Collection
          </Link>
        </div>
      </section>

      {/* Social Marquee */}
      <section className="py-24 bg-[color:var(--bg-card)] overflow-hidden">
        <h2 className="font-syne text-center font-bold text-[color:var(--text-primary)] mb-8 text-2xl md:text-3xl">
          Join 1.2M+ followers of @zora_official
        </h2>
        
        <div className="w-full mask-linear-gradient" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="inline-flex gap-5 pl-5 animate-scrollTrack hover:[animation-play-state:paused]">
            {[
              "https://images.unsplash.com/photo-1547955973-a6b98dc67e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGhvbGRpbmclMjBwaG9uZSUyMGNhc2V8ZW58MXx8fHwxNzc4Mjg4MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1775757257623-118fa2be177f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBvbiUyMGxhcCUyMGhhbmRzfGVufDF8fHx8MTc3ODI4ODAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1613994518041-8cd73527ecc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9zZSUyMHVwJTIwaGFuZHMlMjBlYXJwaG9uZXN8ZW58MXx8fHwxNzc4Mjg4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1760624294699-3d3156314391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zc2JvZHklMjBwaG9uZSUyMHN0cmFwfGVufDF8fHx8MTc3ODI4ODAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1598689856596-3c69f6a6b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd3Jpc3QlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3ODI4ODAxNHww&ixlib=rb-4.1.0&q=80&w=1080"
            ].map((src, i) => (
              <div key={i} className="flex-none w-[250px] aspect-[4/5] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.04]">
                <ImageWithFallback src={src} alt={`ZORA community style ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {[
              "https://images.unsplash.com/photo-1547955973-a6b98dc67e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGhvbGRpbmclMjBwaG9uZSUyMGNhc2V8ZW58MXx8fHwxNzc4Mjg4MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1775757257623-118fa2be177f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBvbiUyMGxhcCUyMGhhbmRzfGVufDF8fHx8MTc3ODI4ODAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1613994518041-8cd73527ecc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9zZSUyMHVwJTIwaGFuZHMlMjBlYXJwaG9uZXN8ZW58MXx8fHwxNzc4Mjg4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1760624294699-3d3156314391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zc2JvZHklMjBwaG9uZSUyMHN0cmFwfGVufDF8fHx8MTc3ODI4ODAxNHww&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1598689856596-3c69f6a6b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwd3Jpc3QlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3ODI4ODAxNHww&ixlib=rb-4.1.0&q=80&w=1080"
            ].map((src, i) => (
              <div key={`clone-${i}`} className="flex-none w-[250px] aspect-[4/5] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.04]" aria-hidden="true">
                <ImageWithFallback src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-12 border-t border-[color:var(--bg-primary)] border-opacity-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-space text-sm font-bold uppercase tracking-widest text-[color:var(--text-primary)] opacity-70 mb-6">Recently Viewed</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {recentlyViewed.map((product) => (
                <Link to={`/product/${product.id}`} key={`recent-${product.id}`} className="flex items-center gap-4 w-[240px] shrink-0 p-3 rounded-xl bg-[color:var(--bg-card)]/50 hover:bg-[color:var(--bg-card)] transition-colors group">
                  <div className="w-12 h-16 rounded-md overflow-hidden bg-[color:var(--bg-primary)]">
                    <ImageWithFallback src={product.images.main} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="font-space text-sm font-medium text-[color:var(--text-primary)] truncate max-w-[150px]">{product.name}</h4>
                    <p className="font-syne text-xs text-[color:var(--text-primary)] font-bold mt-1">€{product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes scrollTrack {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-scrollTrack {
          animation: scrollTrack 30s linear infinite;
        }
        .mask-linear-gradient {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}
