import "./festive.css";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import useSession from "@/hooks/useSession";
import { TWISTS } from "@/data/cards";
import GameBoard from "@/components/GameBoard";
import TwistBook from "@/components/TwistBook";
import Scene from "@/components/Scene";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlayerManager } from "./components/PlayerManager";

export default function App() {
  const [players, setPlayers] = useSession("ak-players", []);
  const [rules, setRules] = useSession("ak-rules", {});
  const [game, setGame] = useSession("ak-game", null);
  const [bookOpen, setBookOpen] = useState(false), [playersOpen, setPlayersOpen] = useState(false);
  const twists = useMemo(() => TWISTS.map((t) => ({ ...t, ...rules[t.id] })), [rules]);

  const start = () => setGame({ turn: 0, card: null, phase: "idle", note: "", over: false, winner: null, lives: Object.fromEntries(players.map((p) => [p.id, 3])) });
  const newGame = () => window.confirm("Relight every diya and start over with the same players?") && start();
  // Add or remove players mid-game. Newcomers get 3 diyas; the turn follows the current singer.
  const changePlayers = (list) => {
    if (game) {
      const idx = list.findIndex((p) => p.id === players[game.turn]?.id);
      setGame({ ...game, turn: idx >= 0 ? idx : Math.min(game.turn, list.length - 1), card: idx >= 0 ? game.card : null, phase: idx >= 0 ? game.phase : "idle",
        lives: Object.fromEntries(list.map((p) => [p.id, game.lives[p.id] ?? 3])) });
    }
    setPlayers(list);
  };

  return (
    <div className="relative min-h-screen px-4 pb-[38vh] pt-24 text-[#4a1a22]">
      <Scene />
      <nav className="fixed inset-x-0 top-3 z-30 flex justify-center gap-2">
        {game && <button className="btn-ghost" onClick={() => setPlayersOpen(true)}>Players</button>}
        <button className="btn-ghost" onClick={() => setBookOpen(true)}>Twist Book</button>
        {game && <button className="btn-ghost" onClick={newGame}>New game</button>}
      </nav>
      <main className="mx-auto flex max-w-5xl flex-col items-center">
        {game ? <GameBoard players={players} twists={twists} game={game} setGame={setGame} onReset={start} /> : (
          <>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 text-center text-[#c8302f]">
              <p className="text-2xl tracking-[0.35em]">LET'S SING</p>
              <h1 className="font-script -mt-1 text-[5.5rem] leading-[1.1] md:text-[8.5rem]">Antakshari</h1>
              <p className="-mt-2 text-3xl tracking-[0.5em]">KINGS</p>
              <p className="mx-auto mt-4 max-w-md text-xl">Three diyas each. Sing, bluff, and keep your flame alive till the end.</p>
            </motion.div>
            <PlayerManager players={players} setPlayers={setPlayers} onStart={start} />
          </>
        )}
      </main>
      <Dialog open={playersOpen} onOpenChange={setPlayersOpen}>
        <DialogContent className="max-w-lg border-[#c8302f]/20 bg-[#fffaf0] p-3">
          <DialogTitle className="sr-only">Players</DialogTitle>
          <PlayerManager inGame players={players} setPlayers={changePlayers} onStart={() => setPlayersOpen(false)} />
        </DialogContent>
      </Dialog>
      <TwistBook open={bookOpen} onOpenChange={setBookOpen} twists={twists} rules={rules} setRules={setRules} />
    </div>
  );
}
