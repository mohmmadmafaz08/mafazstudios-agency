import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import { playSound } from "@/lib/sound";
import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";

export const ease = [0.22, 1, 0.36, 1] as const;

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}

export function Reveal({ children, delay = 0, ...rest }: { children: ReactNode; delay?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Pixel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-pixel text-[11px] uppercase tracking-wider ${className}`}>{children}</span>;
}

export function Folder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <motion.div whileHover={{ y: -6, rotate: -2 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className={`flex flex-col items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 80" className="w-20 drop-shadow-sm">
        <path d="M6 14a6 6 0 0 1 6-6h24l8 8h44a6 6 0 0 1 6 6v6H6z" className="fill-folder-back" />
        <rect x="4" y="22" width="92" height="54" rx="6" className="fill-folder" />
        <rect x="4" y="22" width="92" height="3" rx="1.5" className="fill-background opacity-40" />
      </svg>
      <span className="text-xs text-foreground">{label}</span>
    </motion.div>
  );
}

export function MacWindow({ title, children, className = "", bareOnMobile = false }: { title: string; children: ReactNode; className?: string; bareOnMobile?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-2xl border bg-card shadow-soft ${className}`}>
      <div className={`flex items-center gap-2 border-b px-4 py-3 ${bareOnMobile ? "hidden md:flex" : ""}`}>
        <span className="size-3 rounded-full bg-dot-red" />
        <span className="size-3 rounded-full bg-dot-yellow" />
        <span className="size-3 rounded-full bg-dot-green" />
        <span className="ml-3 text-xs text-muted-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function WinWindow({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bg-win p-[3px] win-bevel ${className}`}>
      <div className="flex items-center justify-between bg-win-bar px-2 py-1">
        <Pixel className="text-primary-foreground">{title}</Pixel>
        <div className="flex gap-[3px]">
          {["_", "□", "×"].map((c) => (
            <span key={c} className="grid size-4 place-items-center bg-win text-[10px] leading-none text-foreground win-bevel">{c}</span>
          ))}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Doodle({ kind, className = "" }: { kind: "squiggle" | "star" | "arrow" | "circle"; className?: string }) {
  const paths: Record<string, string> = {
    squiggle: "M5 30 Q 20 5, 35 30 T 65 30 T 95 30",
    star: "M50 8 L58 40 L92 42 L64 60 L74 92 L50 72 L26 92 L36 60 L8 42 L42 40 Z",
    arrow: "M10 70 C 30 20, 60 20, 85 40 M70 28 L86 40 L72 54",
    circle: "M50 10 C 80 8, 94 35, 88 60 C 80 88, 30 92, 14 66 C 2 44, 20 12, 54 14",
  };
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <motion.path
        d={paths[kind]}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      />
    </svg>
  );
}

const nav = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    f(); const id = setInterval(f, 30000); return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

export function PrimaryButton({ to, children }: { to: "/contact" | "/work" | "/services"; children: ReactNode }) {
  return (
    <Link to={to} onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")}
      className="glass group inline-flex justify-center rounded-full p-1.5 transition-transform active:scale-[0.97]">
      <span className="btn-blue flex w-full items-center justify-between gap-6 rounded-full py-2 pl-7 pr-2 text-[17px] font-semibold text-primary-foreground">
        {children}
        <span className="grid size-10 place-items-center rounded-full bg-card text-foreground transition-transform duration-500 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export function SecondaryButton({ to, children }: { to: "/contact" | "/work" | "/services"; children: ReactNode }) {
  return (
    <Link to={to} onMouseEnter={() => playSound("hover")} onClick={() => playSound("click")}
      className="inline-flex items-center justify-center rounded-full bg-card px-10 py-[1.15rem] text-[17px] font-semibold shadow-soft transition-transform hover:-translate-y-0.5 active:scale-[0.97]">
      {children}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-0 md:pt-0">
      <nav className="glass relative flex h-12 items-center justify-between rounded-full px-4 text-[13px] md:h-11 md:rounded-none md:border-x-0 md:border-t-0">
        <div className="flex items-center gap-5">
          <Link to="/" className="font-semibold" onClick={() => setOpen(false)}>mafazstudios</Link>
          <div className="hidden items-center gap-5 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => playSound("click")} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>{n.label.toLowerCase()}</Link>
            ))}
            <a href="/#instagram" className="text-muted-foreground hover:text-foreground">instagram</a>
          </div>
        </div>
        <Link to="/" className="absolute left-1/2 hidden -translate-x-1/2 font-pixel text-lg leading-none md:block">m^s</Link>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="hidden items-center gap-3 lg:flex" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/></svg>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="18" height="10" rx="2"/><rect x="4" y="9" width="11" height="6" fill="currentColor"/><path d="M22 11v2"/></svg>
            <Clock />
          </span>
          <Link to="/contact" className="hidden font-medium text-win-bar hover:underline md:inline">book a call</Link>
          <button aria-label="Menu" onClick={() => { playSound("pop"); setOpen(!open); }} className="grid size-8 place-items-center rounded-full bg-card text-foreground md:hidden">
            <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-lg leading-none">+</motion.span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.35, ease }}
            className="glass mt-2 flex flex-col rounded-3xl p-3 md:hidden">
            {[...nav].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => { playSound("click"); setOpen(false); }} className="rounded-2xl px-4 py-3 text-lg">{n.label}</Link>
            ))}
            <a href="/#instagram" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-lg">Instagram</a>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-blue mt-2 rounded-full px-4 py-3 text-center font-semibold text-primary-foreground">Book a call →</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="border-t px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <Pixel className="text-muted-foreground">© 2026 mafazstudios</Pixel>
          <p className="mt-4 max-w-sm text-3xl font-medium tracking-tight">Crafting apps, websites & digital products with care.</p>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/work" className="hover:text-foreground">Work</Link>
          <Link to="/services" className="hover:text-foreground">Services</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}
        className="mx-auto mt-16 max-w-6xl select-none overflow-hidden text-center font-pixel text-[11vw] leading-none tracking-tight text-folder">mafazstudios</motion.div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub: string }) {
  return (
    <section className="dot-grid px-6 pb-20 pt-44">
      <div className="mx-auto max-w-6xl">
        <Reveal><Pixel className="text-accent">{eyebrow}</Pixel></Reveal>
        <Reveal delay={0.1}><h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[1.02] tracking-[-0.04em] md:text-7xl">{title}</h1></Reveal>
        <Reveal delay={0.2}><p className="mt-6 max-w-xl text-lg text-muted-foreground">{sub}</p></Reveal>
      </div>
    </section>
  );
}

export const projects = [
  { name: "Orbit", type: "iOS App", year: "2026", tone: "bg-folder" },
  { name: "Northwind", type: "Web Platform", year: "2026", tone: "bg-accent" },
  { name: "Pebble", type: "Digital Product", year: "2025", tone: "bg-dot-green" },
  { name: "Lumen", type: "SaaS Dashboard", year: "2025", tone: "bg-dot-yellow" },
];
