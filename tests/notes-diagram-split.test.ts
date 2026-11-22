/**
 * Notes diagrams: a page downloads only the browser-run diagrams it shows.
 *
 * Before 2026-11-22 ConceptUnitCard imported all ~150 browser-run ("use client")
 * diagrams directly, so every notes chapter and subtopic page listed one 722 KB
 * script (172 KB compressed) and could not respond to a tap until it arrived:
 * 4.6-4.9 s on a slow phone connection, while ~93% of pages show none of them.
 *
 * The full list lives in diagramRegistry.tsx (ebooks and scripts draw from it).
 * Live pages use two generated files: serverDiagrams.generated.tsx (picture-only
 * diagrams, no browser code) and ClientDiagram.generated.tsx (one lazily loaded
 * script per browser-run diagram). Run `npm run notes:diagrams` after wiring a
 * new diagram; this test fails until you do.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  parseDiagramRegistry,
  buildServerDiagramsModule,
  buildClientDiagramModule,
  isClientSource,
} from "@/lib/notes/diagramSplit";
import { renderDiagramMarkup } from "@/lib/ebooks/diagrams";

const DIR = join(process.cwd(), "src/app/notes/_components");
const read = (f: string) => readFileSync(join(DIR, f), "utf8").replace(/\r\n/g, "\n");
const isClientFile = (file: string) => isClientSource(read(`visualizations/${file}.tsx`));

describe("parseDiagramRegistry", () => {
  const src = [
    'import Alpha from "./visualizations/Alpha";',
    'import Beta from "./visualizations/BetaFile";',
    "export function renderVisualizationStatic(slug) {",
    "  switch (slug) {",
    '    case "alpha":',
    "      return <Alpha />;",
    '    case "beta":',
    "      return <Beta />;",
    "  }",
    "}",
  ].join("\n");

  it("reads each case with its component's file", () => {
    expect(parseDiagramRegistry(src)).toEqual([
      { slug: "alpha", component: "Alpha", file: "Alpha" },
      { slug: "beta", component: "Beta", file: "BetaFile" },
    ]);
  });

  it("refuses a case whose component is not imported", () => {
    expect(() => parseDiagramRegistry(src.replace('import Beta from "./visualizations/BetaFile";\n', ""))).toThrow(/Beta/);
  });

  it("refuses an import no case uses", () => {
    expect(() => parseDiagramRegistry(`import Gamma from "./visualizations/Gamma";\n${src}`)).toThrow(/Gamma/);
  });

  it("refuses a slug wired twice", () => {
    expect(() => parseDiagramRegistry(src.replace('case "beta"', 'case "alpha"'))).toThrow(/alpha/);
  });
});

describe("isClientSource", () => {
  it("is true only for a file that opens with the use client directive", () => {
    expect(isClientSource('"use client";\nexport default 1')).toBe(true);
    expect(isClientSource("'use client'\nexport default 1")).toBe(true);
    expect(isClientSource('/** "use client" is not here */\nexport default 1')).toBe(false);
  });
});

describe("the live notes pages", () => {
  const entries = parseDiagramRegistry(read("diagramRegistry.tsx"));

  it("register every diagram wired today", () => {
    expect(entries.length).toBeGreaterThanOrEqual(576);
  });

  it("generated files match the registry — run `npm run notes:diagrams` after wiring a diagram", () => {
    expect(read("serverDiagrams.generated.tsx")).toBe(buildServerDiagramsModule(entries, isClientFile));
    expect(read("ClientDiagram.generated.tsx")).toBe(buildClientDiagramModule(entries, isClientFile));
  });

  it("never import a browser-run diagram directly", () => {
    for (const f of ["ConceptUnitCard.tsx", "serverDiagrams.generated.tsx", "print/NotesChapterPrint.tsx"]) {
      const direct = [...read(f).matchAll(/^import \w+ from "\.{1,2}\/(?:_components\/)?visualizations\/(\w+)";$/gm)].map((m) => m[1]);
      expect(direct.filter(isClientFile), f).toEqual([]);
    }
  });

  it("load each browser-run diagram as its own script", () => {
    const client = read("ClientDiagram.generated.tsx");
    const wanted = entries.filter((e) => isClientFile(e.file));
    expect(wanted.length).toBeGreaterThan(100);
    for (const e of wanted) {
      expect(client, e.slug).toContain(`${JSON.stringify(e.slug)}: dynamic(() => import("./visualizations/${e.file}")),`);
    }
    expect(client.startsWith('"use client";')).toBe(true);
  });
});

describe("ebook diagrams", () => {
  it("still draw a browser-run diagram in full (regression-line-fit)", () => {
    const html = renderDiagramMarkup("regression-line-fit");
    expect(html).toContain("<svg");
  });

  it("still draw a picture-only diagram", () => {
    const entries = parseDiagramRegistry(read("diagramRegistry.tsx"));
    const server = entries.find((e) => !isClientFile(e.file))!;
    expect(renderDiagramMarkup(server.slug as Parameters<typeof renderDiagramMarkup>[0])).toContain("<svg");
  });
});
