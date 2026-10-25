import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero, Pixel, Reveal, ease, projects } from "@/components/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — mafazstudios" },
      { name: "description", content: "Selected apps, websites and digital products built by mafazstudios." },
      { property: "og:title", content: "Work — mafazstudios" },
      { property: "og:description", content: "Selected apps, websites and digital products." },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <>
      <PageHero eyebrow="Work" title="Things we've made." sub="A few projects we're proud of — from native apps to platforms and our own products." />
      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-14 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.5, ease }}>
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${p.tone}`}>
                  <div className="absolute inset-10 rounded-xl bg-card shadow-soft">
                    <div className="flex gap-1.5 p-3"><span className="size-2 rounded-full bg-dot-red" /><span className="size-2 rounded-full bg-dot-yellow" /><span className="size-2 rounded-full bg-dot-green" /></div>
                    <div className="px-6 pt-6 text-3xl font-medium tracking-tight">{p.name}</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm"><span className="font-medium">{p.name}</span><Pixel className="text-muted-foreground">{p.type} · {p.year}</Pixel></div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
