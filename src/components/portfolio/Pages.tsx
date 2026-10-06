import cover from "@/assets/cover.png.asset.json";
import portrait from "@/assets/deepak.png.asset.json";
import { projects, projectStart, type Project } from "@/lib/projects";

export function Placeholder({ src, label = "Project Image", className = "" }: { src?: string | undefined; label?: string; className?: string }) {
  if (src) return <img src={src} alt={label} className={`h-full w-full object-cover ${className}`} />;
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-border bg-muted/60 text-muted-foreground ${className}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="4" width="18" height="16" /><circle cx="9" cy="10" r="1.6" /><path d="M3 17l5-5 4 4 3-3 6 6" /></svg>
      <span className="label text-center">{label}</span>
      <span className="text-[0.6rem] tracking-[0.2em] opacity-60">UPLOAD IMAGE</span>
    </div>
  );
}

const Num = ({ n }: { n: string }) => <span className="font-serif text-6xl leading-none text-primary md:text-8xl">{n}</span>;

export function Cover() {
  return (
    <div className="h-full w-full overflow-hidden bg-background">
      <img src={cover.url} alt="Interior Designer Portfolio — Deepak Urade" className="h-full w-full object-contain" />
    </div>
  );
}

export function About() {
  return (
    <div className="grid h-full grid-cols-1 items-end gap-8 md:grid-cols-[5fr_7fr] md:gap-16">
      <div className="rise h-[40vh] overflow-hidden md:h-full">
        <img src={portrait.url} alt="Deepak Urade" className="h-full w-full object-cover object-top grayscale-[15%]" />
      </div>
      <div className="rise flex max-w-xl flex-col self-center pb-4" style={{ animationDelay: ".15s" }}>
        <h1 className="text-3xl font-semibold uppercase leading-tight tracking-wide text-primary md:text-5xl">About<br />Me</h1>
        <div className="my-8 h-px w-16 bg-primary" />
        <div className="space-y-4 text-justify font-serif text-lg italic leading-relaxed text-foreground/85">
          <p>I believe every space has a story to tell.</p>
          <p>I’m <b className="not-italic font-semibold">Deepak Urade</b>, an Interior Designer who enjoys turning ideas into spaces that feel thoughtful, functional, and inviting. From understanding a client’s vision to shaping the smallest details, I focus on creating interiors that balance aesthetics with everyday comfort.</p>
          <p>My work brings together space planning, materials, furniture, colours, and visual details to create spaces that are not only beautiful, but also feel right.</p>
        </div>
        <a href="mailto:deepakurade2@gmail.com" className="link-line mt-12 self-start font-serif text-lg italic text-secondary">deepakurade2@gmail.com</a>
      </div>
    </div>
  );
}

export function Contents({ go }: { go: (i: number) => void }) {
  return (
    <div className="flex h-full flex-col">
      <h1 className="relative mb-8 self-start text-4xl font-light tracking-[0.4em] text-foreground md:text-5xl">
        CONTENTS<span className="absolute -bottom-1 left-0 -z-10 h-3 w-full bg-muted" />
      </h1>
      <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {projects.map((p, i) => (
          <button key={p.id} onClick={() => go(projectStart(i))} className="group rise flex flex-col text-center" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="relative h-56 w-full overflow-hidden lg:h-auto lg:flex-1">
              <div className="h-full transition-transform duration-700 group-hover:scale-[1.03]"><Placeholder src={p.heroImage} label="Image" /></div>
              <span className="absolute -bottom-3 right-1 text-8xl font-bold leading-none text-background md:text-9xl" style={{ WebkitTextStroke: "1px var(--border)" }}>{i + 1}</span>
            </div>
            <span className="mt-4 text-sm font-semibold uppercase tracking-wider text-primary">{p.title}</span>
            <span className="mt-1 text-xs text-muted-foreground">{p.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectIntro({ p }: { p: Project }) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-[35vh] flex-1 overflow-hidden rise">
        <Placeholder src={p.heroImage} label="Hero Render / Photograph" />
        <span className="absolute bottom-2 right-4 text-7xl font-bold leading-none text-transparent md:text-9xl" style={{ WebkitTextStroke: "1.5px var(--secondary)" }}>{p.id}</span>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="flex gap-3">
          {p.materials.slice(0, 4).map((m) => (
            <div key={m.label} className="h-16 w-16 md:h-20 md:w-20"><Placeholder src={m.image} label={m.label} className="[&_svg]:hidden [&_span:last-child]:hidden" /></div>
          ))}
        </div>
        <div className="text-right rise" style={{ animationDelay: ".2s" }}>
          <h2 className="text-3xl font-bold uppercase tracking-wide text-primary md:text-5xl">{p.title}</h2>
          <p className="label mt-3 text-secondary">{p.type}</p>
          <p className="label mt-1 text-secondary">{p.year}</p>
          <p className="ml-auto mt-3 max-w-md font-serif italic text-foreground/70">{p.description}</p>
        </div>
      </div>
      <div className="mt-4 h-px bg-foreground/40" />
    </div>
  );
}

export function ProjectDetails({ p }: { p: Project }) {
  const rows: [string, string][] = [["Type", p.type], ["Year", p.year]];
  return (
    <div className="grid h-full gap-8 md:grid-cols-[3fr_2fr_auto]">
      <div className="grid min-h-[50vh] grid-rows-2 gap-3 rise">
        <Placeholder src={p.detailImage1} label="Project Image 01" />
        <Placeholder src={p.detailImage2} label="Project Image 02" />
      </div>
      <div className="flex flex-col rise" style={{ animationDelay: ".15s" }}>
        <h2 className="text-xl font-bold uppercase tracking-wide text-primary">{p.title}</h2>
        <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-y-1 text-sm">
          {rows.flatMap(([k, v]) => [<dt key={k} className="text-muted-foreground">{k}:</dt>, <dd key={k + "v"} className="text-foreground/80">{v}</dd>])}
        </dl>
        <p className="label mt-6 text-secondary">Design Concept</p>
        <p className="mt-2 text-sm leading-7 text-foreground/80">{p.concept}</p>
        <p className="mt-4 text-justify text-sm leading-7 text-foreground/80">{p.description}</p>
        <div className="mt-6 min-h-48 flex-1"><Placeholder src={p.floorPlan} label="Floor Plan / Technical Drawing" /></div>
      </div>
      <div className="hidden border-l border-foreground/60 pl-3 md:flex md:items-end">
        <span className="text-xs text-foreground/70 [writing-mode:vertical-rl] rotate-180">{p.title}</span>
      </div>
    </div>
  );
}

export function ProjectMoodboard({ p }: { p: Project }) {
  const [a, b, c] = p.moodboardImages;
  return (
    <div className="grid h-full gap-8 md:grid-cols-[2fr_3fr]">
      <div className="flex flex-col rise">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Moodboard</h2>
        <div className="mt-6 grid flex-1 grid-cols-3 gap-3">
          {p.materials.map((m, i) => (
            <div key={m.label} className={`min-h-20 ${i === 0 ? "col-span-2" : ""}`}><Placeholder src={m.image} label={m.label} /></div>
          ))}
          <div className="col-span-2 flex flex-col justify-end">
            <p className="label mb-2 text-muted-foreground">Colour Palette</p>
            <div className="flex h-10 border border-border">
              {["bg-background", "bg-muted", "bg-accent", "bg-border"].map((c) => <div key={c} className={`flex-1 ${c}`} />)}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Keywords</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/80">{p.keywords.map((k) => <li key={k}>• {k}</li>)}</ul>
        </div>
      </div>
      <div className="grid min-h-[60vh] grid-cols-2 grid-rows-2 gap-3 rise" style={{ animationDelay: ".15s" }}>
        <div className="col-span-2"><Placeholder src={a} label="Moodboard Image 01" /></div>
        <Placeholder src={b} label="Moodboard Image 02" />
        <Placeholder src={c} label="Moodboard Image 03" />
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="grid h-full gap-10 md:grid-cols-2">
      <div className="flex flex-col justify-center rise">
        <h1 className="font-serif text-5xl leading-[1.05] text-primary md:text-7xl">LET'S CREATE<br /><em>something beautiful.</em></h1>
        <div className="my-10 h-px w-24 bg-primary" />
        <p className="text-xl font-semibold uppercase tracking-[0.2em] text-foreground">Deepak Urade</p>
        <p className="label mt-1 text-secondary">Interior Designer</p>
        <dl className="mt-8 grid grid-cols-[6rem_1fr] gap-y-3 text-sm">
          <dt className="label text-muted-foreground">Phone</dt><dd><a className="link-line" href="tel:9390173272">9390173272</a></dd>
          <dt className="label text-muted-foreground">Email</dt><dd><a className="link-line" href="mailto:deepakurade2@gmail.com">deepakurade2@gmail.com</a></dd>
          <dt className="label text-muted-foreground">Location</dt><dd>Hyderabad, Telangana</dd>
        </dl>
        <a href="mailto:deepakurade2@gmail.com" className="label mt-10 self-start border border-primary px-8 py-4 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Send an email →</a>
      </div>
      <div className="min-h-[40vh] rise" style={{ animationDelay: ".15s" }}><Placeholder label="Architectural / Interior Image" /></div>
    </div>
  );
}
