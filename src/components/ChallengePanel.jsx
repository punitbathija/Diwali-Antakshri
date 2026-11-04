import { useState } from "react";
import { Avatars, label } from "./PlayerManager";

// The table doubts the song. Pick who challenged, then rule on it.
export default function ChallengePanel({ singer, challengers, onResolve }) {
  const [who, setWho] = useState(null);
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <h3 className="font-script text-4xl text-[#c8302f]">Bhai, no!</h3>
      <p>Who is calling it out?</p>
      <div className="flex flex-wrap justify-center gap-3">
        {challengers.map((p) => (
          <button key={p.id} onClick={() => setWho(p)} className={`rounded-2xl p-2 transition ${who?.id === p.id ? "bg-[#c8302f]/15 ring-2 ring-[#c8302f]" : "hover:bg-white"}`}>
            <Avatars p={p} /><span className="text-sm">{p.name}</span>
          </button>
        ))}
      </div>
      <button className="btn-primary w-full" onClick={() => onResolve(singer, `${label(singer)} sang a fake. `)}>Fake song: {singer.name} loses a diya</button>
      <button className="btn-ghost w-full py-2" disabled={!who} onClick={() => onResolve(who, `${label(singer)}'s song was real. `)}>Real song: {who ? who.name : "challenger"} loses a diya</button>
    </div>
  );
}
