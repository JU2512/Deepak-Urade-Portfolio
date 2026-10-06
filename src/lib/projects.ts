// Edit project data here. Set any image field to a URL to replace its placeholder.
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

export const projects: Project[] = Array.from({ length: 7 }, (_, i) => make(i + 1));

export type PageDef =
  | { kind: "cover" } | { kind: "about" } | { kind: "contents" } | { kind: "contact" }
  | { kind: "intro" | "details" | "mood"; project: number };

export const pages: PageDef[] = [
  { kind: "cover" }, { kind: "about" }, { kind: "contents" },
  ...projects.flatMap((_, i) => (["intro", "details", "mood"] as const).map((kind) => ({ kind, project: i }))),
  { kind: "contact" },
];

export const projectStart = (i: number) => 3 + i * 3;
