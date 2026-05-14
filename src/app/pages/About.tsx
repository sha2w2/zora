import { motion } from "motion/react";
import { AltLogo } from "../components/AltLogo";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">
      <section className="min-h-[80vh] flex flex-col md:flex-row items-center px-4 max-w-7xl mx-auto py-24 gap-16 md:gap-8">
        
        {/* Left Column: Rotating Alt Logo */}
        <div className="flex-1 flex justify-center items-center h-full w-full max-w-md relative order-first md:order-first mb-16 md:mb-0 perspective-[1000px]">
          <motion.div
            initial={{ opacity: 0, rotateY: -30, rotateX: 10 }}
            animate={mounted ? { opacity: 1, rotateY: 360, rotateX: 0 } : {}}
            transition={{
              opacity: { duration: 1 },
              rotateY: { duration: 20, ease: "linear", repeat: Infinity },
              rotateX: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" },
            }}
            className="w-64 h-64 sm:w-96 sm:h-96 drop-shadow-2xl z-10"
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            <AltLogo className="w-full h-full" starColor="var(--accent)" zColor="var(--bg-card)" />
          </motion.div>
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-gradient-radial from-[color:var(--accent)]/20 to-transparent blur-3xl -z-10" />
        </div>

        {/* Right Column: Narrative */}
        <div className="flex-1 flex flex-col justify-center space-y-8 px-4 md:px-12 order-last">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-syne text-5xl md:text-6xl font-bold text-[color:var(--text-primary)] uppercase tracking-tight"
          >
            The Brand <br />
            <span className="text-[color:var(--accent)] text-4xl md:text-5xl mt-2 block">Story</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-space text-lg space-y-6 text-[color:var(--text-primary)] opacity-80 leading-relaxed"
          >
            <p>
              Shanice C S, the author, is a student who is constantly on the path to merge Human Computer Interaction Compliance with Aesthetic Appeal. As a consumer of many platforms on the beautiful web, her inspiration comes from existing platforms as she studies them beyond the average consumer perspective.
            </p>
            <p>
              Of course, for the sake of integrity, these prototypes, whilst being based on existing platforms, are fictional and only serve the purpose of demonstrating how UI elements can be enhanced to improve user experience whilst staying stylish.
            </p>
            <p>
              She is very appreciative of your time here and hopes you had fun with this fictional prototype.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <Link 
              to="/careers"
              className="inline-block px-12 py-4 rounded-full bg-[color:var(--accent)] text-[color:var(--text-on-accent)] font-syne font-bold uppercase tracking-widest hover:scale-95 transition-transform"
            >
              Careers
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Grid of brand imagery */}
      <section className="bg-[color:var(--bg-card)] py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne text-3xl font-bold mb-16 text-center text-[color:var(--text-primary)] uppercase tracking-widest">
            Behind the Scenes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-square bg-[color:var(--bg-primary)] rounded-3xl overflow-hidden"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1764855310912-15dee3625bf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc4Mjc4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Brand image 1" 
                className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-[3/4] lg:aspect-square bg-[color:var(--accent)]/10 rounded-3xl overflow-hidden mt-0 md:mt-16"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1760443728337-35a585921497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjB0ZXh0dXJlfGVufDF8fHx8MTc3ODI3ODI2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Brand image 2" 
                className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="aspect-square bg-[color:var(--text-primary)] rounded-3xl overflow-hidden md:col-span-2 lg:col-span-1"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1771142061212-71a82269ecb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhciUyMHBob25lJTIwY2FzZXxlbnwxfHx8fDE3NzgyNzU0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Brand image 3" 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700" 
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
