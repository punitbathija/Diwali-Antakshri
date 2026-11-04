import { useMemo } from "react";
import { motion } from "framer-motion";

// Slow golden embers rising over a soft glow. Mounted when the 4th King is drawn.
export default function Celebration() {
  const sparks = useMemo(() => Array.from({ length: 48 }, (_, i) => ({ i, x: Math.random() * 100, d: 4 + Math.random() * 4, s: 4 + Math.random() * 8, delay: Math.random() * 3 })), []);
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0.35] }} transition={{ duration: 2 }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,179,71,0.35),transparent_60%)]" />
      {sparks.map((p) => (
        <motion.span key={p.i} className="absolute bottom-0 rounded-full bg-[#ffcb5c] shadow-[0_0_14px_#ff9f1c]"
          style={{ left: `${p.x}%`, width: p.s, height: p.s }}
          initial={{ y: 0, opacity: 0 }} animate={{ y: "-105vh", opacity: [0, 1, 0] }}
          transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: "easeOut" }} />
      ))}
    </div>
  );
}