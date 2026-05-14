import { motion } from "motion/react";
import { Link } from "react-router";
import { MainLogo } from "../components/MainLogo";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AltLogo } from "../components/AltLogo";

export default function Careers() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl p-12 rounded-3xl bg-[color:var(--bg-card)] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none -mr-12 -mt-12">
          <AltLogo className="w-64 h-64" starColor="var(--text-primary)" zColor="var(--bg-primary)" />
        </div>

        <Link to="/about" className="inline-flex items-center gap-2 text-[color:var(--text-primary)] opacity-70 hover:opacity-100 transition-opacity mb-12">
          <ArrowLeft size={16} /> Back to About
        </Link>
        
        <div className="flex justify-center mb-12">
          <MainLogo className="h-12" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-syne font-bold text-center mb-8">Careers at ZORA</h1>
        
        <div className="font-space text-lg text-center opacity-80 leading-relaxed mb-12 max-w-lg mx-auto">
          ZORA is a fictional company created purely as a Human-Computer Interaction prototype. There are no current career opportunities. 
          <br /><br />
          Instead, you can reach out to the author, <span className="font-bold">Shanice C. Sagonda</span>, or explore her work below.
        </div>

        <div className="flex flex-col gap-4 max-w-md mx-auto relative z-10">
          <a 
            href="https://www.linkedin.com/in/shanicecsagonda/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-4 px-6 rounded-full border border-[color:var(--text-primary)]/20 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/5 transition-colors font-syne font-bold uppercase tracking-widest text-sm"
          >
            LinkedIn <ExternalLink size={16} />
          </a>
          <a 
            href="https://github.com/sha2w2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-4 px-6 rounded-full border border-[color:var(--text-primary)]/20 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/5 transition-colors font-syne font-bold uppercase tracking-widest text-sm"
          >
            GitHub <ExternalLink size={16} />
          </a>
          <a 
            href="https://2025digitalcontent-portfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-4 px-6 rounded-full bg-[color:var(--accent)] text-[color:var(--text-on-accent)] hover:scale-95 transition-transform font-syne font-bold uppercase tracking-widest text-sm border border-transparent"
          >
            Portfolio <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}