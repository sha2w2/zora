import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const productCard = target.closest('.group.flex.flex-col.relative');
      const addBtn = target.closest('button');

      if (addBtn && addBtn.textContent?.includes('Add')) {
        setIsHovering(true);
        setHoverText("Add");
      } else if (productCard) {
        setIsHovering(true);
        setHoverText("View");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      animate={{
        x: position.x - (isHovering ? 24 : 6),
        y: position.y - (isHovering ? 24 : 6),
        width: isHovering ? 48 : 12,
        height: isHovering ? 48 : 12,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 35,
        mass: 1
      }}
      style={{
        borderRadius: "50%",
        backgroundColor: "white",
        color: "black",
      }}
    >
      {isHovering && (
        <span className="text-[10px] font-bold font-syne uppercase tracking-widest pointer-events-none">
          {hoverText}
        </span>
      )}
    </motion.div>
  );
}