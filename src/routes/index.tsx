import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { heroMain, heroWindows, recentWork, instagramHandle, type Media } from "@/lib/media";
import { Doodle, Folder, MacWindow, Pixel, PrimaryButton, Reveal, SecondaryButton, WinWindow, ease } from "@/components/site";
import { playSound } from "@/lib/sound";
import sky from "@/assets/sky.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "mafazstudios — App & Web Development Studio" },
      { name: "description", content: "mafazstudios designs and builds apps, websites and digital products with clean, considered craft." },
      { property: "og:title", content: "mafazstudios — App & Web Development Studio" },
      { property: "og:description", content: "Apps, websites and digital products, crafted with care." },
    ],
  }),
  component: Index,
});

function MediaFill({ m, tone }: { m: Media; tone: string }) {
  if (m.src && m.type !== "image") return <video src={m.src} autoPlay muted loop playsInline className="size-full object-cover" />;
  if (m.src) return <img src={m.src} alt={m.name} className="size-full object-cover" />;
  return <div className={`grid size-full place-items-center ${tone}`}><Pixel className="text-primary-foreground/80">▶ {m.name}</Pixel></div>;
}

function VidWin({ m, tone, className }: { m: Media; tone: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`overflow-hidden rounded-md border bg-secondary p-1 shadow-soft ${className}`}>
        <div className="flex items-center gap-1.5 px-1.5 pb-1.5 pt-0.5">
          <span className="size-2.5 rounded-full bg-dot-red" /><span className="size-2.5 rounded-full bg-dot-yellow" /><span className="size-2.5 rounded-full bg-dot-green" />
          <span className="ml-auto text-[10px] text-muted-foreground">x</span>
        </div>
        <div className="h-[calc(100%-1.6rem)] overflow-hidden rounded-sm"><MediaFill m={m} tone={tone} /></div>
      </div>
      <span className="text-[11px] text-muted-foreground">{m.name}</span>
    </div>
  );
}

function NameTag({ color }: { color: string }) {
  return (
    <div className="w-20 overflow-hidden rounded-sm bg-card text-center shadow-soft">
      <div className={`${color} py-1 font-pixel text-[7px] leading-tight text-primary-foreground`}>HELLO<br />my name is</div>
      <div className="py-2 text-[11px] italic">mafaz</div>
    </div>
  );
}

const W = heroWindows as [Media, Media, Media, Media, Media];
const floaters: { x: string; y: string; r: number; el: ReactNode }[] = [
  { x: "6%", y: "6%", r: -3, el: <VidWin m={W[0]} tone="bg-folder" className="h-56 w-32" /> },
  { x: "30%", y: "0%", r: -4, el: <NameTag color="bg-win-bar" /> },
  { x: "68%", y: "2%", r: 2, el: <VidWin m={W[2]} tone="bg-accent" className="h-36 w-56" /> },
  { x: "4%", y: "66%", r: 2, el: <VidWin m={W[3]} tone="bg-foreground" className="h-32 w-48" /> },
  { x: "84%", y: "48%", r: -2, el: <VidWin m={W[4]} tone="bg-dot-green" className="h-56 w-32" /> },
  { x: "72%", y: "72%", r: 0, el: <Folder label="" /> },
];
const kaomoji = [
  { x: "24%", y: "26%", t: "^ ω ^" }, { x: "70%", y: "38%", t: "{ ^-^ }" },
];

function MobileStrip() {
  return (
    <div className="mb-10 flex items-end justify-center gap-3 lg:hidden">
      <motion.div initial={{ opacity: 0, y: 20, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: -6 }} transition={{ duration: 0.8, ease, delay: 0.1 }}>
        <VidWin m={W[0]} tone="bg-folder" className="h-32 w-20" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: -12 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
        <VidWin m={W[2]} tone="bg-accent" className="h-24 w-32" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: 6 }} transition={{ duration: 0.8, ease, delay: 0.3 }}>
        <VidWin m={W[4]} tone="bg-dot-green" className="h-32 w-20" />
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="dot-grid relative overflow-hidden px-5 pb-16 pt-24 lg:pb-24 lg:pt-16">
      <div className="relative mx-auto max-w-[1400px] lg:h-[560px]">
        {floaters.map((f, i) => (
          <motion.div key={i} className="absolute z-10 hidden lg:block" style={{ left: f.x, top: f.y }}
            initial={{ opacity: 0, y: 20, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: f.r }} transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.06 }}
            drag dragMomentum={false} whileDrag={{ scale: 1.04, zIndex: 30 }} whileHover={{ scale: 1.03 }} onDragStart={() => playSound("pop")}>
            <div className="cursor-grab active:cursor-grabbing">{f.el}</div>
          </motion.div>
        ))}
        {kaomoji.map((k, i) => (
          <motion.span key={k.t} className="absolute hidden text-muted-foreground lg:block" style={{ left: k.x, top: k.y }}
            animate={{ y: [0, -6, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}>{k.t}</motion.span>
        ))}
        <MobileStrip />
        <div className="pointer-events-none relative z-20 flex h-full flex-col items-center justify-center text-center">
          <Reveal><Pixel className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-muted-foreground"><span className="size-1.5 rounded-full bg-dot-green" />open for projects</Pixel></Reveal>
          <motion.h1 initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0)" }} transition={{ duration: 1.1, ease }}
            className="mt-5 font-pixel text-[13vw] leading-none tracking-tight sm:text-6xl md:text-7xl">mafazstudios</motion.h1>
          <Reveal delay={0.2}><p className="mx-auto mt-4 max-w-xs text-base text-muted-foreground sm:max-w-none sm:text-lg">apps, websites & digital products — built with care.</p></Reveal>
          <Reveal delay={0.35}>
            <div className="pointer-events-auto mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <PrimaryButton to="/contact">Start your project</PrimaryButton>
              <SecondaryButton to="/contact">Let's talk</SecondaryButton>
            </div>
          </Reveal>
        </div>
      </div>
      <Showreel />
    </section>
  );
}

function Showreel() {
  const [play, setPlay] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <Reveal delay={0.5} className="relative z-20 mx-auto mt-12 max-w-4xl">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border bg-foreground shadow-soft sm:aspect-video">
        {heroMain.src ? (
          <video ref={ref} src={heroMain.src} muted={!play} autoPlay loop playsInline controls={play} className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center bg-gradient-to-br from-win-bar via-folder to-accent"><Pixel className="text-primary-foreground">your showreel goes here</Pixel></div>
        )}
        {!play && (
          <button onClick={() => { playSound("click"); setPlay(true); ref.current?.play(); }}
            className="glass-dark absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full py-2 pl-2 pr-5 text-base text-primary-foreground transition-transform hover:scale-105">
            <span className="grid size-8 place-items-center rounded-full bg-card text-foreground">▶</span> play video
          </button>
        )}
      </div>
    </Reveal>
  );
}

function RecentWork() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal className="flex items-end justify-between">
        <div><Pixel className="text-accent">recent work</Pixel><h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] md:text-6xl">top-notch, recently shipped.</h2></div>
        <Link to="/work" className="hidden text-sm text-muted-foreground hover:text-foreground md:block">all projects →</Link>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {recentWork.map((w, i) => (
          <Reveal key={w.title} delay={(i % 2) * 0.1}>
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.5, ease }}>
              <div className="overflow-hidden rounded-xl border bg-secondary p-1.5 shadow-soft">
                <div className="flex items-center gap-1.5 px-2 pb-2 pt-1"><span className="size-2.5 rounded-full bg-dot-red" /><span className="size-2.5 rounded-full bg-dot-yellow" /><span className="size-2.5 rounded-full bg-dot-green" /><span className="ml-3 text-[11px] text-muted-foreground">{w.name}</span></div>
                <div className="aspect-[16/10] overflow-hidden rounded-lg"><MediaFill m={w} tone={["bg-folder", "bg-accent", "bg-dot-green", "bg-win-bar"][i] ?? "bg-folder"} /></div>
              </div>
              <div className="mt-4 flex justify-between text-sm"><span className="font-medium">{w.title}</span><Pixel className="text-muted-foreground">{w.tag}</Pixel></div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Instagram() {
  return (
    <section id="instagram" className="dot-grid px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <Pixel className="text-accent">@{instagramHandle}</Pixel>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em]">follow along on instagram</h2>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-xl">
          <MacWindow title={`instagram.com/${instagramHandle}`}>
            <iframe src={`https://www.instagram.com/${instagramHandle}/embed`} title="mafazstudios on Instagram" loading="lazy" className="h-[520px] w-full sm:h-[640px] border-0 bg-card" />
          </MacWindow>
          <div className="mt-6 text-center">
            <a href={`https://www.instagram.com/${instagramHandle}/`} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">open on instagram ↗</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const features = [
  { t: "we build apps", d: "native iOS & android apps that feel fast, fluid and familiar from the first tap.", tone: "bg-folder", tag: "app dev" },
  { t: "we build websites", d: "marketing sites and web platforms — performant, accessible and beautifully crafted.", tone: "bg-accent", tag: "web dev" },
  { t: "we build products", d: "our own tools, templates and SaaS — and we help you launch yours too.", tone: "bg-dot-green", tag: "products" },
];

function Features() {
  return (
    <section className="mx-auto max-w-5xl space-y-20 px-5 py-20 md:space-y-32 md:py-24">
      {features.map((f, i) => (
        <div key={f.t} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <Reveal>
            <Pixel className="text-muted-foreground">▪▪▪▪▪▪▪▪ 0{i + 1}</Pixel>
            <span className="mt-4 block w-fit rounded-full border border-folder bg-folder/15 px-3 py-1 text-xs">{f.tag}</span>
            <h3 className="mt-6 text-sm font-semibold">{f.t}</h3>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">{f.d}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div whileHover={{ rotate: i % 2 ? 1 : -1, y: -4 }} transition={{ duration: 0.5, ease }}
              className="overflow-hidden rounded-xl border-4 border-dot-green/60 bg-card p-1 shadow-soft">
              <div className={`relative aspect-video rounded-lg ${f.tone}`}>
                <div className="absolute inset-x-10 bottom-0 top-10 rounded-t-lg bg-card p-4 shadow-soft">
                  <div className="h-2 w-1/3 rounded bg-muted" /><div className="mt-2 h-2 w-1/2 rounded bg-muted" />
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

const rainbow = ["bg-dot-red", "bg-accent", "bg-dot-yellow", "bg-dot-green", "bg-folder", "bg-win-bar"];

function Letter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32">
      {[0, 1].map((side) => (
        <motion.div key={side} style={{ y: lift }} className={`absolute top-24 hidden md:flex ${side ? "right-[6%] flex-row-reverse" : "left-[6%]"} items-end gap-1`}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              {rainbow.map((c) => <div key={c} className={`size-3 ${c}`} />)}
              <div style={{ height: Math.abs(7 - i) * 16 }} />
            </div>
          ))}
        </motion.div>
      ))}
      <Reveal className="relative z-10 mx-auto max-w-sm">
        <div className="rounded-lg border bg-card p-8 text-sm leading-relaxed shadow-soft">
          <Pixel className="mb-4 block text-muted-foreground">a note from us</Pixel>
          <p>we started mafazstudios because we love making software that feels <mark className="bg-dot-yellow/60 px-1">simple, calm and delightful</mark>.</p>
          <p className="mt-3 text-muted-foreground">every app, site and product we build gets the same care — from the first sketch to the final pixel.</p>
          <div className="mt-6 flex items-center justify-between"><span className="text-xs">mafaz — founder</span><span className="font-pixel text-lg">mafaz</span></div>
        </div>
      </Reveal>
    </section>
  );
}

function Marquee() {
  const line = "clients love it  ·  ";
  return (
    <div className="overflow-hidden py-10">
      <motion.div className="flex whitespace-nowrap text-4xl font-medium tracking-[-0.04em] md:text-6xl" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 24, ease: "linear", repeat: Infinity }}>
        {Array.from({ length: 8 }).map((_, i) => <span key={i} className={i % 2 ? "text-foreground" : "text-muted-foreground/40"}>{line}</span>)}
      </motion.div>
    </div>
  );
}

const quotes: [string, string, string][] = [
  ["aisha k.", "founder, orbit", "they shipped our app in 8 weeks and it feels better than anything we imagined."],
  ["dev patel", "cto, northwind", "clean code, clean design, zero drama. the best team we've worked with."],
  ["sara m.", "pebble", "every detail is considered. our users noticed instantly."],
  ["omar r.", "lumen", "fast, thoughtful and genuinely fun to work with."],
  ["lena v.", "studio nine", "the website they built doubled our signups in a month."],
  ["yusuf a.", "founder", "felt like an extension of our own team."],
];
const bars = ["bg-dot-green/40", "bg-folder/40", "bg-dot-yellow/50"];

function Testimonials() {
  return (
    <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 md:grid-cols-3">
      {quotes.map(([n, r, q], i) => (
        <Reveal key={n} delay={(i % 3) * 0.08}>
          <div className="overflow-hidden rounded-md border bg-card text-sm shadow-soft">
            <div className={`flex gap-1 px-2 py-1.5 ${bars[i % 3]}`}><span className="size-2 rounded-full bg-dot-red" /><span className="size-2 rounded-full bg-dot-yellow" /><span className="size-2 rounded-full bg-dot-green" /></div>
            <div className="p-4">
              <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-muted font-pixel text-[10px]">{n.charAt(0)}</span><div><div className="text-xs font-semibold">{n}</div><div className="text-[11px] text-muted-foreground">{r}</div></div></div>
              <p className="mt-3 leading-relaxed">{q}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

const plans = [
  { n: "website", d: "a beautiful site, fast", p: "$2k+", f: ["design + build", "cms setup", "2–4 weeks"] },
  { n: "app", d: "native or cross-platform", p: "$8k+", f: ["ios & android", "backend + launch", "6–12 weeks"], hot: true },
  { n: "product", d: "your idea, end to end", p: "custom", f: ["strategy", "design + engineering", "ongoing support"] },
];

function Pricing() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <img src={sky} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center text-primary-foreground">
          <Pixel className="rounded bg-card/30 px-2 py-1">pricing</Pixel>
          <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em]">mafazstudios, your way</h2>
          <p className="mt-2 text-sm opacity-90">simple starting points. every project is tailored.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="rounded-lg border bg-card p-6 text-center shadow-soft">
                <div className="text-sm font-semibold">{p.n}</div>
                <div className="text-xs text-muted-foreground">{p.d}</div>
                <div className="my-6 text-5xl font-medium tracking-[-0.04em]">{p.p}</div>
                <Link to="/contact" className={`inline-block rounded-md px-4 py-1.5 text-xs ${p.hot ? "bg-win-bar text-primary-foreground" : "border"}`}>get started</Link>
                <ul className="mt-6 space-y-2 border-t pt-4 text-left text-xs">{p.f.map((x) => <li key={x}>● {x}</li>)}</ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["what does mafazstudios do?", "we design and build mobile apps, websites and our own digital products for startups and brands."],
  ["how long does a project take?", "websites usually take 2–4 weeks, apps 6–12 weeks, depending on scope."],
  ["do you work with startups?", "yes — most of our clients are early-stage teams turning an idea into a product."],
  ["what tech do you use?", "swift, react native, flutter, react and modern web stacks — whatever fits best."],
  ["do you offer support after launch?", "always. we offer ongoing care plans for updates and improvements."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-2xl px-6 py-32">
      <Reveal className="text-center">
        <Pixel className="rounded border px-2 py-1 text-muted-foreground">faq</Pixel>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">frequently asked questions</h2>
      </Reveal>
      <div className="mt-10 divide-y border-y">
        {faqs.map(([q, a], i) => (
          <button key={q} onClick={() => setOpen(open === i ? -1 : i)} className="block w-full py-4 text-left text-sm">
            <div className="flex justify-between"><span>{q}</span><motion.span animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span></div>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden text-muted-foreground">
                  <span className="block pt-2">{a}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <RecentWork />
      <Features />
      <Letter />
      <Marquee />
      <Testimonials />
      <Instagram />
      <Pricing />
      <Faq />
      <div className="flex justify-center pb-10"><Doodle kind="squiggle" className="w-32 text-folder" /></div>
    </>
  );
}
