import { useEffect, useState } from "react";
import { AltLogo } from "./AltLogo";
import { usePreloader } from "../context/PreloaderContext";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Preloader() {
  const { setHasLoaded } = usePreloader();
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Hide preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setHasLoaded(true), 500); // give time for fade out
    }, 2500);
    return () => clearTimeout(timer);
  }, [setHasLoaded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {/* Background morphing blobs */}
          {!shouldReduceMotion && (
            <div className="absolute inset-0 z-0 overflow-hidden blur-3xl opacity-60">
              <motion.div
                animate={{
                  x: [0, 100, -50, 0],
                  y: [0, -100, 50, 0],
                  scale: [1, 1.5, 0.8, 1],
                  rotate: [0, 90, 180, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[color:var(--text-primary)]"
              />
              <motion.div
                animate={{
                  x: [0, -80, 100, 0],
                  y: [0, 120, -60, 0],
                  scale: [1, 1.2, 1.8, 1],
                  rotate: [0, -90, -180, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[color:var(--accent)]"
              />
              <motion.div
                animate={{
                  x: [0, 50, -100, 0],
                  y: [0, 80, -80, 0],
                  scale: [1, 0.9, 1.3, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-white"
              />
            </div>
          )}

          {/* Geometric fragments that assemble */}
          <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* The Alt Logo itself */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: shouldReduceMotion ? 0 : 1.2,
                duration: 0.8
              }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <AltLogo className="w-full h-full" starColor="var(--text-primary)" zColor="var(--bg-primary)" />
            </motion.div>

            {/* Fragments assembling */}
            {!shouldReduceMotion && (
              <>
                <motion.div
                  initial={{ x: -200, y: -200, rotate: -90, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, ease: "anticipate" }}
                  className="absolute w-24 h-24 bg-[color:var(--text-primary)] rounded-full mix-blend-difference"
                />
                <motion.div
                  initial={{ x: 200, y: 200, rotate: 90, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, ease: "anticipate", delay: 0.2 }}
                  className="absolute w-32 h-12 bg-[color:var(--accent)] mix-blend-difference"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                  className="absolute w-full h-full border-4 border-[color:var(--text-primary)] rounded-full"
                />
              </>
            )}
          </div>

          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: shouldReduceMotion ? 0 : 1.5, duration: 0.5 }}
            className="mt-6 text-3xl tracking-[0.2em] uppercase text-[color:var(--text-primary)] font-syne"
          >
            ZORA
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
