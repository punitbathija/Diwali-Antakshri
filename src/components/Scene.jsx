import { motion } from "framer-motion";

// Hanging flower ornaments, faint mandalas, and a layered mountain-and-pine landscape.
const STRANDS = [{ x: 28, len: 240, f: [70, 150] }, { x: 84, len: 130, f: [80] }, { x: 130, len: 215, f: [120] }, { x: 190, len: 170, f: [85] }];

const Toran = ({ className }) => (
  <svg viewBox="0 0 220 260" className={`absolute top-0 w-[clamp(130px,24vw,260px)] ${className}`}>
    <defs>
      <symbol id="fl" viewBox="-22 -22 44 44">
        {Array.from({ length: 8 }, (_, i) => <ellipse key={i} rx="5.5" ry="10" cy="-11" transform={`rotate(${i * 45})`} fill="#f4c63a" stroke="#e8862e" strokeWidth="1" />)}
        <circle r="9" fill="#e8962e" /><circle r="5.5" fill="#c8302f" /><circle r="2" fill="#ffd780" />
      </symbol>
    </defs>
    {STRANDS.map((s, i) => (
      <motion.g key={i} style={{ transformOrigin: `${s.x}px 0px` }} animate={{ rotate: [-1.6, 1.6, -1.6] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
        <line x1={s.x} y1="0" x2={s.x} y2={s.len} stroke="#4a4a8f" strokeWidth="1.2" />
        {s.f.map((y) => <g key={y}><use href="#fl" x={s.x - 30} y={y - 30} width="60" height="60" /><circle cx={s.x} cy={y + 38} r="3" fill="#e8962e" /></g>)}
        <path d={`M${s.x} ${s.len - 4}q7 11 0 22q-7-11 0-22z`} fill="#c8302f" />
      </motion.g>
    ))}
  </svg>
);

const Mandala = ({ className }) => (
  <svg viewBox="-100 -100 200 200" fill="none" stroke="#6f9bbd" strokeWidth="1" className={`absolute opacity-30 ${className}`}>
    {Array.from({ length: 16 }, (_, i) => <ellipse key={i} rx="9" ry="40" cy="-54" transform={`rotate(${i * 22.5})`} />)}
    {Array.from({ length: 8 }, (_, i) => <path key={i} d="M0-34Q12-20 0-6Q-12-20 0-34" transform={`rotate(${i * 45})`} />)}
    <circle r="96" /><circle r="30" />
  </svg>
);

const trees = Array.from({ length: 50 }, (_, i) => {
  const x = i * 30, h = 70 + 42 * Math.abs(Math.sin(i * 1.7)), w = 15 + 6 * Math.abs(Math.cos(i)), b = 320;
  const [m1, m2] = [b - h * 0.62, b - h * 0.32];
  return `M${x} ${b - h}L${x + w * 0.45} ${m1}L${x + w * 0.22} ${m1}L${x + w * 0.7} ${m2}L${x + w * 0.38} ${m2}L${x + w} ${b}L${x - w} ${b}L${x - w * 0.38} ${m2}L${x - w * 0.7} ${m2}L${x - w * 0.22} ${m1}L${x - w * 0.45} ${m1}Z`;
}).join("");

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#e3f7ff] to-[#f3fcff]">
      <Mandala className="-top-28 left-1/2 w-80 -translate-x-1/2" />
      <Mandala className="-left-28 top-1/3 w-72" />
      <Mandala className="-right-28 top-1/3 w-72" />
      <Toran className="left-0" />
      <Toran className="right-0 -scale-x-100" />
      <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[34vh] min-h-[190px] w-full">
        <path fill="#b9b3d8" d="M0 180L180 110L330 170L520 90L700 160L900 100L1100 170L1260 120L1440 170V320H0Z" />
        <path fill="#6f9ab3" d="M0 220L140 160L300 210L480 150L660 215L860 140L1040 210L1240 160L1440 215V320H0Z" />
        <path fill="#3b617f" d="M0 255Q240 195 480 245T960 240T1440 250V320H0Z" />
        <path fill="#0c2038" d={trees} />
        {Array.from({ length: 10 }, (_, i) => 70 + i * 150).map((x, i) => (
          <g key={x} transform={`translate(${x} 298)`}>
            <circle r="30" cy="-12" fill="#ffb34733" />
            <path d="M-18 0H18Q14 15 0 15Q-14 15-18 0Z" fill="#d9632b" /><rect x="-19" y="-2" width="38" height="4" rx="2" fill="#f0a030" />
            <motion.path d="M0-4Q9-17 0-32Q-9-17 0-4Z" fill="#ffc15a" style={{ transformOrigin: "0px -4px", filter: "drop-shadow(0 0 8px #ff9d2e)" }} animate={{ scaleY: [1, 1.18, 0.95, 1], scaleX: [1, 0.9, 1.05, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.23 }} />
          </g>
        ))}
        {[120, 340, 560, 790, 1010, 1240].map((x, i) => (
          <motion.circle key={x} cx={x} cy={270 + (i % 3) * 14} r="3" fill="#ffc15a" style={{ filter: "drop-shadow(0 0 6px #ff9d2e)" }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5 }} />
        ))}
      </svg>
    </div>
  );
}
