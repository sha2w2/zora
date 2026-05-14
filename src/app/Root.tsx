import { Outlet, useLocation } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Preloader } from "./components/Preloader";
import { usePreloader } from "./context/PreloaderContext";
import { Toaster } from "sonner";
import { DeviceModal } from "./components/DeviceModal";
import { SearchModal } from "./components/SearchModal";
import { LiveChat } from "./components/LiveChat";
import { CustomCursor } from "./components/CustomCursor";
import { FloatingAboutButton } from "./components/FloatingAboutButton";
import { useAppContext } from "./context/AppContext";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function Root() {
  const { hasLoaded } = usePreloader();
  const { isDeviceModalOpen, setIsDeviceModalOpen, isSearchOpen, setIsSearchOpen } = useAppContext();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[color:var(--accent)] focus:text-[color:var(--text-on-accent)] focus:font-bold focus:rounded-full">
        Skip to content
      </a>
      {!hasLoaded && <Preloader />}
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -30 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        
        {/* The Curtain Wipe */}
        <AnimatePresence>
          {!shouldReduceMotion && (
            <motion.div
              key={`curtain-${location.pathname}`}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="fixed inset-0 z-40 pointer-events-none bg-[color:var(--bg-primary)]"
            />
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <DeviceModal isOpen={isDeviceModalOpen} onClose={() => setIsDeviceModalOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LiveChat />
      <CustomCursor />
      <FloatingAboutButton />
      <Toaster position="bottom-center" toastOptions={{ style: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--accent)' } }} />
    </div>
  );
}
