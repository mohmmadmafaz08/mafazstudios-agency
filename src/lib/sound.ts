// Tiny synthesized UI sounds via Web Audio — no files needed.
let ctx: AudioContext | null = null;
let last = 0;

export function playSound(kind: "click" | "hover" | "pop" = "click") {
  if (typeof window === "undefined") return;
  const now = performance.now();
  if (kind === "hover" && now - last < 60) return;
  last = now;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const cfg = { click: [880, 520, 0.08, 0.09], hover: [1400, 1200, 0.02, 0.04], pop: [420, 900, 0.07, 0.1] }[kind];
    const [f0, f1, vol, dur] = cfg as [number, number, number, number];
    osc.type = "sine";
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur);
  } catch {
    /* audio unavailable */
  }
}
