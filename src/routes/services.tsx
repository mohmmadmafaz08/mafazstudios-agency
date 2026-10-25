import { createFileRoute } from "@tanstack/react-router";
import { Folder, PageHero, Pixel, Reveal } from "@/components/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — mafazstudios" },
      { name: "description", content: "App development, web development and digital products by mafazstudios." },
      { property: "og:title", content: "Services — mafazstudios" },
      { property: "og:description", content: "App development, web development and digital products." },
    ],
  }),
  component: Services,
});

const services = [
  { n: "01", t: "App Development", d: "Native iOS & Android and cross-platform apps that feel fast, fluid and familiar.", tags: ["Swift", "React Native", "Flutter"] },
  { n: "02", t: "Web Development", d: "Marketing sites, web apps and platforms — performant, accessible and beautifully built.", tags: ["React", "Next / TanStack", "CMS"] },
  { n: "03", t: "Digital Products", d: "We design and launch our own tools, templates and SaaS — and help you launch yours.", tags: ["SaaS", "Templates", "MVPs"] },
];

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Three things, done really well." sub="Strategy, design and engineering under one roof." />
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl divide-y border-y">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="grid items-center gap-6 py-12 md:grid-cols-12">
                <Pixel className="text-accent md:col-span-1">{s.n}</Pixel>
                <h2 className="text-3xl font-medium tracking-[-0.03em] md:col-span-4 md:text-4xl">{s.t}</h2>
                <p className="text-muted-foreground md:col-span-4">{s.d}</p>
                <div className="flex flex-wrap gap-2 md:col-span-2">{s.tags.map((t) => <span key={t} className="rounded-full border px-3 py-1 text-xs">{t}</span>)}</div>
                <div className="hidden md:col-span-1 md:block"><Folder label="" /></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
