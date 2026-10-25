// Drop real video/photo URLs here. Leave src empty to show a placeholder.
export type Media = { src?: string; type?: "video" | "image"; name: string };

export const heroMain: Media = { name: "showreel.mov", type: "video" };

export const heroWindows: Media[] = [
  { name: "orbit-app.mov" },
  { name: "website-build.mov" },
  { name: "behind-the-scenes.mov" },
  { name: "code-session.mov" },
  { name: "studio-life.mov" },
];

export const recentWork: (Media & { title: string; tag: string })[] = [
  { name: "orbit.mov", title: "Orbit", tag: "iOS App" },
  { name: "northwind.mov", title: "Northwind", tag: "Web Platform" },
  { name: "pebble.mov", title: "Pebble", tag: "Digital Product" },
  { name: "lumen.mov", title: "Lumen", tag: "SaaS Dashboard" },
];

export const instagramHandle = "mafazstudios";
