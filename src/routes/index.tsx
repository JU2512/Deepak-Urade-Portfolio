import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { pages, projects, projectStart } from "@/lib/projects";
import { About, Contact, Contents, Cover, ProjectDetails, ProjectIntro, ProjectMoodboard } from "@/components/portfolio/Pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deepak Urade — Interior Designer Portfolio" },
      { name: "description", content: "The interior design portfolio of Deepak Urade, Hyderabad — thoughtful, functional and inviting spaces." },
      { property: "og:title", content: "Deepak Urade — Interior Designer Portfolio" },
      { property: "og:description", content: "An editorial digital portfolio of interior design work by Deepak Urade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Book,
});

const pad = (n: number) => String(n).padStart(2, "0");

function Book() {
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [menu, setMenu] = useState(false);
  const total = pages.length;
  const go = useCallback((n: number) => {
    setMenu(false);
    document.getElementById(`page-${n + 1}`)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = Number((e.target as HTMLElement).dataset["n"]);
        setI(n);
        setSeen((s) => (s.has(n) ? s : new Set(s).add(n)));
      });
    }, { threshold: 0.35 });
    document.querySelectorAll("[data-n]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const render = (n: number) => {
    const page = pages[n]!;
    if (page.kind === "cover") return <Cover />;
    if (page.kind === "about") return <About />;
    if (page.kind === "contents") return <Contents go={go} />;
    if (page.kind === "contact") return <Contact />;
    const p = projects[page.project]!;
    if (page.kind === "intro") return <ProjectIntro p={p} />;
    if (page.kind === "details") return <ProjectDetails p={p} />;
    return <ProjectMoodboard p={p} />;
  };

  const cur = pages[i]!;
  const proj = "project" in cur ? cur.project : null;
  const sub = cur.kind === "intro" ? 1 : cur.kind === "details" ? 2 : 3;
  const menuItems: [string, number][] = [["Home", 0], ["About", 1], ["Contents", 2], ...projects.map((p, n) => [p.title, projectStart(n)] as [string, number]), ["Contact", total - 1]];

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
      <header className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 transition-opacity duration-500 md:px-10 ${i === 0 ? "opacity-0 hover:opacity-100" : "bg-background/90"}`}>
        <button onClick={() => go(0)} className="label text-primary">Deepak Urade</button>
        <div className="flex items-center gap-6">
          {proj !== null && <span className="label hidden text-muted-foreground sm:inline">Project {projects[proj]!.id} · {sub}/3</span>}
          {i > 2 && <button onClick={() => go(2)} className="label link-line hidden text-secondary sm:inline">Contents</button>}
          <button onClick={() => setMenu(true)} className="label flex items-center gap-2 text-primary" aria-label="Open menu">
            Menu <span className="flex flex-col gap-1"><span className="h-px w-5 bg-primary" /><span className="h-px w-5 bg-primary" /></span>
          </button>
        </div>
      </header>

      {pages.map((_, n) => (
        <section key={n} id={`page-${n + 1}`} data-n={n}
          className={n === 0 ? "h-screen snap-start" : "min-h-screen snap-start px-5 pb-10 pt-16 md:h-screen md:px-10 md:pb-8"}>
          <div className={`h-full ${seen.has(n) ? "page-in" : "opacity-0"}`}>{render(n)}</div>
        </section>
      ))}

      <div className={`fixed bottom-4 right-5 z-40 flex items-center gap-3 md:right-10 ${i === 0 ? "opacity-0" : ""}`}>
        <div className="hidden h-px w-24 bg-border md:block"><div className="h-px bg-primary transition-all duration-700" style={{ width: `${((i + 1) / total) * 100}%` }} /></div>
        <span className="label tabular-nums text-secondary">{pad(i + 1)} / {pad(total)}</span>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20 animate-in fade-in" onClick={() => setMenu(false)}>
          <nav className="flex h-full w-full max-w-sm flex-col overflow-y-auto bg-background px-10 py-8 animate-in slide-in-from-right-8 duration-500" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMenu(false)} className="label self-end text-primary">Close ✕</button>
            <ul className="mt-10 space-y-3">
              {menuItems.map(([label, n]) => (
                <li key={label}><button onClick={() => go(n)} className="link-line font-serif text-2xl text-foreground hover:text-primary">{label}</button></li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
