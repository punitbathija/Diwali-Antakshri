import { useState, useEffect } from "react";
export default function useSession(key, init) {
  const [v, setV] = useState(() => {
    try { const s = sessionStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { sessionStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}