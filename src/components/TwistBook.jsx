import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";

// Editable twist list. Changes last for the session and apply to the next card drawn.
export default function TwistBook({ open, onOpenChange, twists, rules, setRules }) {
  const edit = (id, k, v) => setRules({ ...rules, [id]: { ...rules[id], [k]: v } });
  const reset = (id) => { const { [id]: _, ...rest } = rules; setRules(rest); };
  const f = "border-[#c8302f]/25 bg-white text-[#4a1a22]";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto border-[#c8302f]/25 bg-[#fffaf0] text-[#4a1a22]">
        <DialogHeader><DialogTitle className="font-script text-4xl font-normal text-[#c8302f]">Twist Book</DialogTitle></DialogHeader>
        {twists.map((t) => (
          <div key={t.id} className="space-y-2 rounded-2xl border border-[#c8302f]/15 bg-white p-4">
            <div className="flex gap-2">
              <Input value={t.title} onChange={(e) => edit(t.id, "title", e.target.value)} className={f} aria-label="Title" />
              <Input type="number" min={3} max={30} value={t.secs} onChange={(e) => edit(t.id, "secs", Math.max(3, +e.target.value || 3))} className={`w-24 ${f}`} aria-label="Seconds" />
            </div>
            <Textarea value={t.text} onChange={(e) => edit(t.id, "text", e.target.value)} className={f} aria-label="Rule" />
            {rules[t.id] && <button className="text-sm text-[#c8302f]" onClick={() => reset(t.id)}>Reset to default</button>}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
