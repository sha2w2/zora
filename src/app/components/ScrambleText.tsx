import { useState, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isHovered || prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const maxFrames = 20; // How long the scramble lasts
    let animationFrame: number;

    const animate = () => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        // As frame increases, reveal more real characters
        if (i < (frame / maxFrames) * text.length) {
          result += text[i];
        } else {
          // Scramble the rest
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(result);

      if (frame < maxFrames) {
        frame++;
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered, text, prefersReducedMotion]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
