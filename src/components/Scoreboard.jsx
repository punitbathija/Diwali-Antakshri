import { motion } from "framer-motion";
import { Avatars } from "./PlayerManager";

const MiniDiya = ({ lit }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path d="M4 14H20Q18 21 12 21Q6 21 4 14Z" fill={lit ? "#d9632b" : "#9aa5ad"} />
    {lit && <motion.path d="M12 13Q17 8 12 2Q7 8 12 13Z" fill="#ffc15a" style={{ filter: "drop-shadow(0 0 4px #ff9d2e)", transformOrigin: "12px 13px" }} animate={{ scaleY: [1, 1.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />}
  </svg>
);

export default function Scoreboard({ players, turn, lives }) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-x-7 gap-y-3">
      {players.map((p, i) => {
        const n = lives[p.id] ?? 0;
        return (
          <motion.div key={p.id} layout animate={{ scale: i === turn ? 1.08 : 1, opacity: n ? (i === turn ? 1 : 0.7) : 0.3 }} className={`flex flex-col items-center gap-1 ${n ? "" : "grayscale"}`}>
            <Avatars p={p} className={i === turn ? "!ring-2 !ring-[#c8302f] shadow-[0_0_24px_#c8302f66]" : ""} />
            <span className="text-sm font-bold">{p.name}{p.partner ? ` & ${p.partner}` : ""}</span>
            <span className="flex">{[0, 1, 2].map((k) => <MiniDiya key={k} lit={k < n} />)}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
