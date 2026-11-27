/**
 * KaTeX's stylesheet for V (2026-11-27). V draws maths with a renderer it
 * loads on first use (a plain import()), and the production build (Turbopack)
 * did not bring that renderer's CSS along: on the live homepage, /notes and
 * /mock, V's maths had no KaTeX stylesheet at all (a headless probe found 10
 * .katex elements and no `.katex .katex-mathml` rule), so every symbol showed
 * twice and text ran out of the bubble. Local dev (webpack) brought the CSS,
 * so it never showed there. V now adds a copy served from public/katex/ the
 * first time it draws maths. These tests keep that copy equal to the installed
 * KaTeX; after a KaTeX upgrade run `npm run katex:assets`.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { KATEX_CSS_HREF } from "@/lib/chat/katexStylesheet";

const root = process.cwd();
const dist = join(root, "node_modules", "katex", "dist");
const pub = join(root, "public", "katex");
const read = (...p: string[]) => readFileSync(join(root, ...p), "utf8");

describe("the public copy of KaTeX's stylesheet", () => {
  it("is served where V links it", () => {
    expect(KATEX_CSS_HREF).toBe("/katex/katex.min.css");
    expect(existsSync(join(root, "public", KATEX_CSS_HREF))).toBe(true);
  });

  it("matches the installed KaTeX byte for byte (after an upgrade: npm run katex:assets)", () => {
    expect(readFileSync(join(pub, "katex.min.css"))).toEqual(readFileSync(join(dist, "katex.min.css")));
  });

  it("carries every .woff2 font the stylesheet names, equal to the installed ones", () => {
    const css = readFileSync(join(dist, "katex.min.css"), "utf8");
    const fonts = [...css.matchAll(/url\(fonts\/([^)]+\.woff2)\)/g)].map((m) => m[1]);
    expect(fonts.length).toBeGreaterThan(10);
    for (const f of fonts) {
      expect(existsSync(join(pub, "fonts", f)), f).toBe(true);
      expect(readFileSync(join(pub, "fonts", f)).equals(readFileSync(join(dist, "fonts", f))), f).toBe(true);
    }
  });
});

/** Every source file under src/, for the scan below. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? sourceFiles(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
  });
}

describe("V adds the stylesheet wherever it draws maths after loading the renderer itself", () => {
  it("both of V's lazy maths components ask for it", () => {
    for (const file of ["MathText.tsx", "MathBlockText.tsx"]) {
      expect(read("src", "components", "chat", file), file).toMatch(/useKatexStylesheet\(/);
    }
  });

  // The class, not just today's two files: a plain import() of a maths component gets no CSS in the
  // production build, and local dev hides it. Any file that loads one that way must add the stylesheet.
  it("any file loading a maths component with a plain import() adds the stylesheet too", () => {
    const offenders = sourceFiles(join(root, "src"))
      .filter((f) => {
        const src = readFileSync(f, "utf8");
        return src.includes("@/components/math/") && /(?<![\w.])import\(\s*["']@\/components\/math\//.test(src) && !/useKatexStylesheet\(/.test(src);
      })
      .map((f) => f.slice(root.length + 1));
    expect(offenders).toEqual([]);
  });
});
