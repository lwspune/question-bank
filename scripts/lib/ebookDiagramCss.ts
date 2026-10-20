/**
 * The styles the notes diagrams draw with, for the Notes Books (2026-10-20).
 *
 * The diagrams are styled by the site's Tailwind classes, which a PDF page
 * does not have. This compiles the site's own Tailwind config over JUST the
 * diagram components, so the book carries the classes they use and nothing
 * else, and prepends the site's light-mode colour variables (`border`,
 * `card` and friends resolve through them).
 *
 * Preflight (Tailwind's page reset) is OFF: it would zero every margin and
 * border in the book. Dark-mode rules come out scoped to `.dark`, which a
 * book page never has, so the light look is the only one that applies.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import tailwind from "tailwindcss";
import siteConfig from "../../tailwind.config";

const DIAGRAMS = join(process.cwd(), "src", "app", "notes", "_components", "visualizations", "**", "*.tsx");

/** The site's first `:root { ... }` block: its light-mode colour variables. */
export function lightRootVars(globalsCss: string): string {
  const m = globalsCss.match(/:root\s*\{[^}]*\}/);
  return m ? m[0] : "";
}

export async function buildDiagramCss(): Promise<string> {
  const globals = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf8");
  const config = {
    ...siteConfig,
    content: [DIAGRAMS],
    corePlugins: { ...(typeof siteConfig.corePlugins === "object" ? siteConfig.corePlugins : {}), preflight: false },
  };
  const out = await postcss([tailwind(config)]).process("@tailwind components;\n@tailwind utilities;", { from: undefined });
  return `${lightRootVars(globals)}\n${out.css}`;
}
