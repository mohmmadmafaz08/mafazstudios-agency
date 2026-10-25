import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MacWindow, PageHero, Pixel, Reveal } from "@/components/site";
import { calendlyUrl, contactEmail } from "@/lib/contact";
import { playSound } from "@/lib/sound";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Call — mafazstudios" },
      { name: "description", content: "Book a call or email mafazstudios to start your app, website or digital product." },
      { property: "og:title", content: "Contact & Book a Call — mafazstudios" },
      { property: "og:description", content: "Book a call or email mafazstudios." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState("");
  useEffect(() => { setDomain(window.location.host); }, []);
  const embedSrc = `${calendlyUrl}?hide_gdpr_banner=1&background_color=ffffff&embed_type=Inline&embed_domain=${domain}`;
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build something." sub="Pick a time that works for you, or drop us an email." />
      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <Reveal className="space-y-4 px-5 lg:col-span-1">
            <div className="glass rounded-3xl p-6">
              <Pixel className="text-muted-foreground">email us</Pixel>
              <a href={`mailto:${contactEmail}`} className="mt-3 block break-all text-xl font-medium tracking-tight">{contactEmail}</a>
              <button onClick={() => { navigator.clipboard.writeText(contactEmail); playSound("pop"); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                className="mt-4 rounded-full bg-card px-4 py-2 text-sm shadow-soft">{copied ? "copied ✓" : "copy email"}</button>
            </div>
            <div className="glass rounded-3xl p-6">
              <Pixel className="text-muted-foreground">what to expect</Pixel>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>● 30-minute intro call</li><li>● talk through your idea</li><li>● a clear plan & quote after</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <MacWindow title="book a call — calendly" bareOnMobile>
              {domain ? <iframe src={embedSrc} title="Schedule a meeting with mafazstudios" loading="lazy" className="h-[760px] w-full border-0 md:h-[760px]" /> : <div className="h-[760px] w-full" />}
            </MacWindow>
          </Reveal>
        </div>
      </section>
    </>
  );
}
