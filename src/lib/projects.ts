// Edit project data here. Set any image field to a URL to replace its placeholder.
import oakridge from "@/assets/oakridge.jpg.asset.json";
import oakridgeMoodboard from "@/assets/oakridge-moodboard.png.asset.json";

export type Project = {
  id: string; title: string; type: string; year: string;
  concept: string; description: string;
  heroImage?: string; detailImage1?: string; detailImage2?: string; floorPlan?: string;
  moodboardImages: (string | undefined)[];
  materialBoardImage?: string;
  materials: { label: string; image?: string }[];
  keywords: string[];
};

const make = (n: number): Project => {
  const id = String(n).padStart(2, "0");
  return {
    id, title: `Project ${id}`, type: "[Project Type]", year: "[Year]",
    concept: "[Design concept — replace with the core idea behind this space.]",
    description: "[Short project description — replace with a few lines describing the brief, the approach and the resulting space.]",
    moodboardImages: [undefined, undefined, undefined],
    materials: ["Wood", "Stone", "Metal", "Fabric", "Lighting", "Furniture", "Texture"].map((label) => ({ label })),
    keywords: ["Minimal", "Contemporary", "Functional", "Warm"],
  };
};

export const projects: Project[] = Array.from({ length: 6 }, (_, i) => make(i + 1));

// Project 02 — Oakridge International School
const oakridgeProject = projects[1]!;
oakridgeProject.title = "Oakridge International School";
oakridgeProject.type = "Commercial";
oakridgeProject.year = "2026";
oakridgeProject.description =
  "An educational interior designed for Oakridge International School, combining functional space planning with vibrant colours, natural elements, and comfortable collaborative spaces to create a welcoming environment for students and staff.";
oakridgeProject.heroImage = oakridge.url;
oakridgeProject.detailImage1 = oakridge.url;
oakridgeProject.detailImage2 = oakridge.url;

export type PageDef =
  | { kind: "cover" } | { kind: "about" } | { kind: "contents" } | { kind: "contact" }
  | { kind: "intro" | "details" | "mood"; project: number };

export const pages: PageDef[] = [
  { kind: "cover" }, { kind: "about" }, { kind: "contents" },
  ...projects.flatMap((_, i) => (["intro", "details", "mood"] as const).map((kind) => ({ kind, project: i }))),
  { kind: "contact" },
];

export const projectStart = (i: number) => 3 + i * 3;
