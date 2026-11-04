import { motion } from "framer-motion";

const Back = () => (
  <svg viewBox="-100 -100 200 200" fill="none" stroke="#e8b04a" strokeWidth="1" className="h-52 w-52">
    {Array.from({ length: 24 }, (_, i) => <path key={i} d="M0-96L4-70L0-60L-4-70Z" transform={`rotate(${i * 15})`} strokeOpacity=".7" />)}
    <circle r="52" strokeOpacity=".6" /><circle r="40" strokeOpacity=".4" />
    <text className="flame" textAnchor="middle" y="16" fontSize="48" fill="#ffb347" stroke="none">♪</text>
  </svg>
);

// Flip card: back is a maroon music-mandala, front shows the letter and the twist.
export default function SongCard({ card, twist, onDraw }) {
  return (
    <div className="relative h-[430px] w-[min(300px,80vw)] [perspective:1600px]">
      {!card && ["-rotate-[4deg]", "rotate-[3deg]"].map((r) => <div key={r} className={`absolute inset-0 ${r} rounded-[22px] border border-[#e8b04a]/30 bg-[#3a0d22]`} />)}
      <motion.div className="absolute inset-0" whileHover={card ? {} : { y: -6 }}>
        <motion.div onClick={!card ? onDraw : undefined} animate={{ rotateY: card ? 180 : 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }} className={`h-full w-full ${card ? "" : "cursor-pointer"}`}>
          <div className="absolute inset-0 grid place-items-center rounded-[22px] bg-[radial-gradient(circle_at_50%_40%,#7a1d3a,#3a0d22_70%)] p-2 shadow-[0_30px_80px_rgba(90,20,30,.35)] [backface-visibility:hidden]">
            <div className="grid h-full w-full place-items-center rounded-[16px] border border-[#e8b04a]/60">
              <div className="flex flex-col items-center gap-2"><Back /><p className="font-display text-xl text-[#ffd98a]">Tap to draw</p></div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-[22px] bg-[#fffdf8] p-2 shadow-[0_30px_90px_rgba(255,157,46,.3)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {card && twist && (
              <div className="flex h-full flex-col items-center overflow-hidden rounded-[16px] border border-[#b98a2f]/60 px-5 py-4 text-center text-[#3a1420]">
                <p className="tracking-[0.3em] text-sm text-[#b98a2f]">STARTS WITH</p>
                <span className="font-script text-[9.5rem] leading-[1] text-[#c8302f]">{card.letter}</span>
                <h3 className="font-display text-2xl">{twist.title}</h3>
                <p className="mt-2 flex-1 overflow-y-auto text-[17px] leading-snug text-[#3a1420]/80">{twist.text}</p>
                <p className="mt-2 rounded-full border border-[#b98a2f] px-4 py-1 font-bold text-[#7a1d3a]">{twist.secs} seconds</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
