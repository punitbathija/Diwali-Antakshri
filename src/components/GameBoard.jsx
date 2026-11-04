import { motion, AnimatePresence } from "framer-motion";
import SongCard from "./SongCard";
import DiyaTimer from "./DiyaTimer";
import ChallengePanel from "./ChallengePanel";
import Scoreboard from "./Scoreboard";
import Celebration from "./Celebration";
import { label } from "./PlayerManager";
import { drawCard } from "@/data/cards";

const HINT = { idle: "Your turn. Draw a card.", drawn: "Read the card, then light the diya.", singing: "Sing! The diya is burning.", timeup: "The flame has gone out.", challenge: "The table has doubts." };

export default function GameBoard({ players, twists, game, setGame, onReset }) {
  const p = players[game.turn];
  const card = game.card, twist = card && twists.find((t) => t.id === card.twist);
  const set = (patch) => setGame({ ...game, ...patch });

  // Resolve a turn: the loser (if any) snuffs a diya, then play passes to the next player still lit.
  const settle = (loser, note = "") => {
    const lives = { ...game.lives };
    if (loser) lives[loser.id] = Math.max(0, lives[loser.id] - 1);
    const alive = players.filter((x) => lives[x.id] > 0);
    if (alive.length <= 1) return setGame({ ...game, lives, over: true, winner: (alive[0] ?? p).id, card: null, phase: "idle" });
    let t = game.turn;
    do { t = (t + 1) % players.length; } while (lives[players[t].id] <= 0);
    setGame({ ...game, lives, turn: t, card: null, phase: "idle", note: loser ? `${note}${label(loser)} lost a diya.` : `${label(p)} nailed it!` });
  };

  const winner = game.over && players.find((x) => x.id === game.winner);
  const panel = {
    idle: <p className="text-center text-xl">{game.note || "Tap the deck to draw a letter and a twist."}</p>,
    drawn: <p className="text-center text-xl">Everyone ready? Tap <b>Light the diya</b> when {p.name} starts.</p>,
    singing: <DiyaTimer key={game.card?.letter + game.turn} secs={twist?.secs ?? 10} onEnd={() => set({ phase: "timeup" })} />,
    timeup: <div className="text-center"><h3 className="font-script text-5xl text-[#c8302f]">Time's up!</h3><p className="mt-2 text-xl">{p.name} snuffs a diya.</p></div>,
    challenge: <ChallengePanel singer={p} challengers={players.filter((x) => x.id !== p.id && game.lives[x.id] > 0)} onResolve={settle} />,
  }[game.phase];

  return (
    <div className="flex w-full flex-col items-center gap-7">
      {game.over && <Celebration />}
      <Scoreboard players={players} turn={game.turn} lives={game.lives} />
      <AnimatePresence mode="wait">
        <motion.div key={game.turn + String(game.over)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="text-center">
          <h2 className="font-script text-6xl text-[#c8302f] md:text-7xl">{game.over ? `${label(winner)} wins!` : label(p)}</h2>
          <p className="mt-1 text-xl text-[#4a1a22]/75">{game.over ? "The last diya still burning." : HINT[game.phase]}</p>
        </motion.div>
      </AnimatePresence>

      <div className="relative flex w-full flex-col items-center gap-10 lg:flex-row lg:justify-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ff9d2e33,transparent_65%)] lg:left-[36%]" />
        <SongCard card={card} twist={twist} onDraw={() => !game.over && game.phase === "idle" && set({ card: drawCard(twists), phase: "drawn", note: "" })} />
        {!game.over && (
          <aside className="panel flex min-h-[260px] w-full max-w-sm items-center justify-center p-6">
            <AnimatePresence mode="wait"><motion.div key={game.phase} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full">{panel}</motion.div></AnimatePresence>
          </aside>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {game.over && <button className="btn-primary" onClick={onReset}>Play again</button>}
        {!game.over && game.phase === "idle" && <button className="btn-primary" onClick={() => set({ card: drawCard(twists), phase: "drawn", note: "" })}>Draw a card</button>}
        {game.phase === "drawn" && <button className="btn-primary" onClick={() => set({ phase: "singing" })}>Light the diya</button>}
        {game.phase === "singing" && <><button className="btn-primary" onClick={() => settle(null)}>Nailed it</button><button className="btn-ghost" onClick={() => set({ phase: "challenge" })}>Challenge!</button></>}
        {game.phase === "timeup" && <><button className="btn-primary" onClick={() => settle(p, "Out of time. ")}>Snuff a diya and pass</button><button className="btn-ghost" onClick={() => set({ phase: "challenge" })}>Challenge!</button></>}
        {game.phase === "challenge" && <button className="btn-ghost" onClick={() => set({ phase: "singing" })}>Back</button>}
      </div>
    </div>
  );
}
