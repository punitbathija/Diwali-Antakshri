// Each turn draws a starting letter plus a twist. Twists are editable in the Twist Book.
export const LETTERS = "ABCDGHJKLMNPRSTY".split("");
export const TWISTS = [
  { id: "classic", title: "Classic", text: "Sing the first line of any Hindi film song starting with this letter.", secs: 10 },
  { id: "whisper", title: "Whisper Mode", text: "Sing it so softly that only the person beside you can hear. They vouch for it.", secs: 10 },
  { id: "villain", title: "Villain Entry", text: "Sing it like a movie villain, and finish with an evil laugh.", secs: 12 },
  { id: "duet", title: "Duet Round", text: "Sing the first line. Your partner, or a player you pick, finishes the next line.", secs: 12 },
  { id: "heroine", title: "Filmy Heroine", text: "Sing with full filmy expressions. One dramatic twirl is compulsory.", secs: 12 },
  { id: "rapid", title: "Rapid Fire", text: "No time to think. The diya burns fast tonight.", secs: 5 },
  { id: "couple", title: "Couple's Special", text: "A romantic song only. Couples sing together, solo players dedicate it to someone.", secs: 10 },
  { id: "king", title: "King's Pick", text: "The table picks the letter. Sing anything from before the year 2000.", secs: 10 },
];
export const drawCard = (twists) => {
  const t = twists[Math.floor(Math.random() * twists.length)];
  return { twist: t.id, letter: t.id === "king" ? "?" : LETTERS[Math.floor(Math.random() * LETTERS.length)] };
};