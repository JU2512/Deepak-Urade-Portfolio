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
  const [menu, setMenu] = useState(false);
  const total = pages.length;
  const go = useCallback((n: number) => { setI(Math.max(0, Math.min(total - 1, n))); setMenu(false); }, [total]);

  useEffect(() => {
    const h = parseInt(window.location.hash.slice(1));
    if (h >= 1 && h <= total) setI(h - 1);
  }, [total]);
  useEffect(() => { history.replaceState(null, "", `#${i + 1}`); }, [i]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [i, go]);

  const page = pages[i]!;
  const proj = "project" in page ? page.project : null;
  const sub = page.kind === "intro" ? 1 : page.kind === "details" ? 2 : 3;

  const body =
    page.kind === "cover" ? <Cover /> :
    page.kind === "about" ? <About /> :
    page.kind === "contents" ? <Contents go={go} /> :
    page.kind === "contact" ? <Contact /> :
    page.kind === "intro" ? <ProjectIntro p={projects[proj!]!} /> :
    page.kind === "details" ? <ProjectDetails p={projects[proj!]!} /> :
    <ProjectMoodboard p={projects[proj!]!} />;

  const menuItems: [string, number][] = [["Home", 0], ["About", 1], ["Contents", 2], ...projects.map((p, n) => [p.title, projectStart(n)] as [string, number]), ["Contact", total - 1]];

  return (
    <div className="flex min-h-screen flex-col md:h-screen">
      <header className="flex items-center justify-between px-5 py-4 md:px-10">
        <button onClick={() => go(0)} className="label text-primary">Deepak Urade</button>
        <div className="flex items-center gap-6">
          {proj !== null && (
            <span className="label hidden text-muted-foreground sm:inline">Project {projects[proj]!.id} · {sub}/3</span>
          )}
          {i > 2 && <button onClick={() => go(2)} className="label link-line hidden text-secondary sm:inline">Contents</button>}
          <button onClick={() => setMenu(true)} className="label flex items-center gap-2 text-primary" aria-label="Open menu">
            Menu <span className="flex flex-col gap-1"><span className="h-px w-5 bg-primary" /><span className="h-px w-5 bg-primary" /></span>
          </button>
        </div>
      </header>

      <main className="relative flex-1 overflow-y-auto px-5 md:overflow-hidden md:px-10">
        <div key={i} className="page-in h-full pb-4">{body}</div>
      </main>

      <footer className="flex items-center justify-between border-t border-border px-5 py-3 md:px-10">
        <button onClick={() => go(i - 1)} disabled={i === 0} className="label link-line text-primary disabled:opacity-25">← Previous</button>
        <div className="flex items-center gap-4">
          <div className="hidden h-px w-40 bg-border md:block"><div className="h-px bg-primary transition-all duration-700" style={{ width: `${((i + 1) / total) * 100}%` }} /></div>
          <span className="label tabular-nums text-secondary">{pad(i + 1)} / {pad(total)}</span>
        </div>
        <button onClick={() => go(i + 1)} disabled={i === total - 1} className="label link-line text-primary disabled:opacity-25">Next →</button>
      </footer>

      {menu && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20 animate-in fade-in" onClick={() => setMenu(false)}>
          <nav className="flex h-full w-full max-w-sm flex-col bg-background px-10 py-8 animate-in slide-in-from-right-8 duration-500" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMenu(false)} className="label self-end text-primary">Close ✕</button>
            <ul className="mt-10 space-y-3">
              {menuItems.map(([label, n]) => (
                <li key={label}>
                  <button onClick={() => go(n)} className="link-line font-serif text-2xl text-foreground hover:text-primary">{label}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
