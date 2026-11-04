import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const C = 2 * Math.PI * 92;

// A diya whose flame shrinks and ring drains as the seconds run out. Calls onEnd at zero.
export default function DiyaTimer({ secs, onEnd }) {
  const [left, setLeft] = useState(secs);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const l = Math.max(0, secs - (Date.now() - start) / 1000);
      setLeft(l);
      if (l <= 0) { clearInterval(id); onEnd(); }
    }, 100);
    return () => clearInterval(id);
  }, [secs]);
  const frac = left / secs, low = left < 3;
  return (
    <div className="relative grid h-60 w-60 place-items-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span key={i} className="absolute bottom-10 text-2xl text-[#e8962e]" style={{ left: `${18 + i * 16}%` }}
          animate={{ y: [0, -150], opacity: [0, 1, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.6 }}>{i % 2 ? "♫" : "♪"}</motion.span>
      ))}
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle cx="100" cy="100" r="92" fill="none" stroke="#c8302f22" strokeWidth="6" />
        <circle cx="100" cy="100" r="92" fill="none" stroke={low ? "#c8302f" : "#e8962e"} strokeWidth="6" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - frac)} transform="rotate(-90 100 100)" />
        <circle cx="100" cy="92" r={46 + 8 * frac} fill="#ffb34733" />
        <motion.g style={{ transformOrigin: "100px 118px" }} animate={{ scale: 0.35 + 0.65 * frac }} transition={{ duration: 0.2 }}>
          <path className="flame" d="M100 118Q124 88 100 52Q76 88 100 118Z" fill={low ? "#ff6a3d" : "#ffc15a"} />
        </motion.g>
        <path d="M58 120H142Q132 150 100 150Q68 150 58 120Z" fill="#d9632b" /><rect x="54" y="116" width="92" height="8" rx="4" fill="#f0a030" />
        <text x="100" y="186" textAnchor="middle" className={`font-display ${low ? "fill-[#c8302f]" : "fill-[#4a1a22]"}`} fontSize="26">{Math.ceil(left)}s</text>
      </svg>
    </div>
  );
}
