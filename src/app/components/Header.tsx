import { Link } from "react-router";
import { MainLogo } from "./MainLogo";
import { Search, Heart, ShoppingCart, Menu, X, User, Sun, Moon, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartSidebar } from "./CartSidebar";
import { useAppContext } from "../context/AppContext";
import { ScrambleText } from "./ScrambleText";
import { MegaMenuPopup } from "./MegaMenuPopup";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { cart, wishlist, theme, toggleTheme, setIsSearchOpen, user, logout } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchOpen]);

  const navLinks = [
    { name: "Phone Cases", path: "/collection?category=phone-cases" },
    { name: "Earbuds Cases", path: "/collection?category=earbuds-cases" },
    { name: "Watch Bands", path: "/collection?category=watch-bands" },
    { name: "Tablet Cases", path: "/collection?category=tablet-cases" },
    { name: "Laptop Protection", path: "/collection?category=laptop-protection" },
    { name: "Accessories", path: "/collection?category=accessories" },
    { name: "Sale", path: "/collection?sale=true", isSale: true },
  ];

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header
        className={`sticky top-[36px] z-30 w-full transition-all duration-300 ${
          isScrolled ? "shadow-sm backdrop-blur-md" : ""
        }`}
        style={{
          backgroundColor: isScrolled ? "color-mix(in srgb, var(--bg-primary) 90%, transparent)" : "var(--bg-primary)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Toggle */}
            <div className="flex-1 flex items-center lg:hidden">
              <button
                className="p-2 -ml-2"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Menu"
              >
                <Menu size={24} className="text-[color:var(--text-primary)]" />
              </button>
            </div>

            {/* Desktop Navigation - Primary */}
            <nav className="hidden lg:flex flex-1 gap-6 items-center">
              <button 
                onClick={() => setIsMegaMenuOpen(true)} 
                className="flex items-center gap-2 text-sm font-bold font-syne uppercase tracking-widest text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm px-2 py-1"
              >
                Menu <Menu size={16} />
              </button>
            </nav>

            {/* Logo */}
            <div className="flex-1 flex justify-center">
              <Link to="/" className="w-32 hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm">
                <MainLogo className="w-full h-12" />
              </Link>
            </div>

            {/* Icons */}
            <div className="flex-1 flex justify-end items-center gap-4 sm:gap-6">
              <button aria-label="Search" onClick={() => setIsSearchOpen(true)} className="hidden sm:flex items-center gap-2 text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm p-1">
                <Search size={20} />
                <span className="text-xs border border-current rounded px-1.5 py-0.5 opacity-50">Ctrl+K</span>
              </button>
              <button aria-label="Search (Mobile)" onClick={() => setIsSearchOpen(true)} className="sm:hidden text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm p-1">
                <Search size={20} />
              </button>

              <button
                onClick={toggleTheme}
                className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-all duration-300 hover:rotate-12 hover:scale-110 flex items-center focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm p-1"
                aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/help" aria-label="Help & FAQ" className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm p-1">
                <HelpCircle size={20} />
              </Link>

              <div className="relative">
                <button
                  aria-label="Account"
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors flex items-center justify-center w-8 h-8 rounded-full border border-transparent hover:border-[color:var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none"
                >
                  {user ? (
                    <span className="font-syne font-bold text-sm uppercase">{user.firstName.charAt(0)}</span>
                  ) : (
                    <User size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-4 w-56 rounded-lg shadow-xl border border-[color:var(--bg-primary)] overflow-hidden z-50"
                      style={{ backgroundColor: "var(--bg-card)" }}
                    >
                      <div className="py-2">
                        {user ? (
                          <>
                            <div className="px-4 py-3 border-b border-[color:var(--bg-primary)] opacity-70">
                              <p className="text-sm font-bold font-syne">Hi, {user.firstName}</p>
                            </div>
                            <Link to="/orders" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">My Orders</Link>
                            <Link to="/returns" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Returns</Link>
                            <Link to="/wishlist" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Wishlist</Link>
                            <Link to="/loyalty" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Loyalty Points ({user.loyaltyPoints || 0})</Link>
                            <Link to="/help" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Help & FAQ</Link>
                            <div className="border-t border-[color:var(--bg-primary)] my-1"></div>
                            <button onClick={() => { logout(); setIsAccountOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Sign Out</button>
                          </>
                        ) : (
                          <>
                            <Link to="/signin" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Sign In</Link>
                            <Link to="/register" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Register</Link>
                            <div className="border-t border-[color:var(--bg-primary)] my-1"></div>
                            <Link to="/wishlist" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Wishlist</Link>
                            <Link to="/help" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Help & FAQ</Link>
                            <Link to="/orders" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Orders & Returns</Link>
                            <Link to="/loyalty" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]">Loyalty Points</Link>
                            <div className="border-t border-[color:var(--bg-primary)] my-1"></div>
                            <button onClick={toggleTheme} className="w-full text-left px-4 py-2 text-sm text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)] flex items-center justify-between">
                              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link to="/wishlist" className="relative text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm p-1" aria-label="Wishlist">
                <Heart size={20} className={wishlist.length > 0 ? "fill-[color:var(--accent)] text-[color:var(--accent)]" : ""} />
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="absolute -top-1.5 -right-1.5 bg-[color:var(--accent)] text-[color:var(--bg-primary)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm p-1"
                aria-label="Cart"
              >
                <ShoppingCart size={20} className={cartItemsCount > 0 ? "fill-current" : ""} />
                {cartItemsCount > 0 && (
                  <motion.span
                    key={cartItemsCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="absolute -top-1.5 -right-1.5 bg-[color:var(--accent)] text-[color:var(--bg-primary)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Secondary Navigation (Scrolling Categories) */}
        <div className="hidden lg:block border-t border-[color:var(--text-primary)]/5 bg-[color:var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-6 overflow-x-auto py-3 no-scrollbar">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-space uppercase tracking-widest whitespace-nowrap transition-colors hover:text-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm px-1 py-0.5 ${
                    link.isSale ? "text-[color:var(--accent)] font-bold" : "text-[color:var(--text-primary)]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-sm shadow-xl p-6 flex flex-col overflow-y-auto"
              style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <div className="flex justify-between items-center mb-8 shrink-0">
                <MainLogo className="w-24 h-8" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm">
                  <X size={24} className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-xl font-syne hover:text-[color:var(--accent)] transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm p-1 inline-block w-fit ${
                      link.isSale ? "text-[color:var(--accent)]" : "text-[color:var(--text-primary)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-[color:var(--text-primary)]/10 mt-auto shrink-0">
                <button onClick={() => { setIsMenuOpen(false); setIsMegaMenuOpen(true); }} className="flex items-center gap-2 text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors mb-6 font-syne font-bold uppercase tracking-widest text-sm focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm">
                  <Menu size={16} /> Filter Hub
                </button>
                <button onClick={toggleTheme} className="flex items-center gap-2 text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors mb-4 focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm">
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors mb-4 block focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm">About ZORA</Link>
                <Link to="/help" onClick={() => setIsMenuOpen(false)} className="text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors block focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none rounded-sm">Help & FAQ</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MegaMenuPopup isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}