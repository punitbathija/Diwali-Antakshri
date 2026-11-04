import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const label = (p) => (p.partner ? `${p.name} & ${p.partner}` : p.name);

const Av = ({ n, className = "" }) => (
  <span className={`font-display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffd780] to-[#f0a030] text-xl text-[#9a1f24] ring-1 ring-[#c8302f]/30 ${className}`}>{n[0].toUpperCase()}</span>
);
export const Avatars = ({ p, className = "" }) => (
  <span className="flex"><Av n={p.name} className={className} />{p.partner && <Av n={p.partner} className={`-ml-3 ${className}`} />}</span>
);

// Used on the setup screen and, with inGame, inside the "Players" dialog during a game.
export function PlayerManager({ players, setPlayers, onStart, inGame }) {
  const [name, setName] = useState(""), [partner, setPartner] = useState(""), [couple, setCouple] = useState(false);
  const add = () => {
    if (!name.trim() || (couple && !partner.trim())) return;
    setPlayers([...players, { id: crypto.randomUUID(), name: name.trim(), partner: couple ? partner.trim() : null }]);
    setName(""); setPartner("");
  };
  const total = players.reduce((n, p) => n + (p.partner ? 2 : 1), 0);
  const key = (e) => e.key === "Enter" && add();
  return (
    <div className="panel w-full max-w-lg p-6">
      <div className="relative mb-4 grid grid-cols-2 rounded-full bg-[#c8302f]/10 p-1">
        {[false, true].map((c) => (
          <button key={String(c)} onClick={() => setCouple(c)} className={`relative z-10 py-1.5 font-bold transition-colors ${couple === c ? "text-white" : "text-[#4a1a22]/60"}`}>
            {couple === c && <motion.span layoutId="seg" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#dc4543] to-[#b32426]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            {c ? "Couple" : "Solo"}
          </button>
        ))}
      </div>
      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <input className={`field ${couple ? "" : "sm:col-span-2"}`} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={key} placeholder="Name" />
        {couple && <input className="field" value={partner} onChange={(e) => setPartner(e.target.value)} onKeyDown={key} placeholder="Partner's name" />}
      </div>
      <button className="btn-ghost w-full py-2" onClick={add}>Add to the table</button>
      <ul className="my-5 space-y-2">
        <AnimatePresence>
          {players.map((p) => (
            <motion.li key={p.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="flex items-center gap-3 rounded-2xl bg-white/80 px-3 py-2">
              <Avatars p={p} />
              <span className="flex-1 text-lg">{label(p)}</span>
              <button aria-label={`Remove ${label(p)}`} disabled={inGame && players.length <= 2} title={inGame && players.length <= 2 ? "Keep at least two players" : ""}
                className="grid h-8 w-8 place-items-center rounded-full text-[#4a1a22]/40 transition hover:bg-[#c8302f]/10 hover:text-[#c8302f] disabled:opacity-20"
                onClick={() => setPlayers(players.filter((x) => x.id !== p.id))}>✕</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <button className="btn-primary w-full" disabled={players.length < 2} onClick={onStart}>
        {players.length < 2 ? "Add at least two players" : inGame ? "Done" : `Light the diya · ${total} playing`}
      </button>
    </div>
  );
}

export function PlayerStrip({ players, turn }) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-x-6 gap-y-3">
      {players.map((p, i) => (
        <motion.div key={p.id} layout animate={{ opacity: i === turn ? 1 : 0.6, scale: i === turn ? 1.08 : 1 }} className="flex flex-col items-center gap-1">
          <Avatars p={p} className={i === turn ? "!ring-2 !ring-[#c8302f] shadow-[0_0_24px_#c8302f66]" : ""} />
          <span className="text-sm font-bold text-[#4a1a22]/85">{p.name}{p.partner ? ` & ${p.partner}` : ""}</span>
        </motion.div>
      ))}
    </div>
  );
}