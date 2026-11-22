/**
 * Write the two diagram files live notes pages use, from diagramRegistry.tsx:
 * serverDiagrams.generated.tsx (picture-only diagrams) and
 * ClientDiagram.generated.tsx (one lazily loaded script per browser-run diagram).
 * Why: src/lib/notes/diagramSplit.ts.
 *
 *   npm run notes:diagrams              # regenerate
 *   npm run notes:diagrams -- --check   # exit 1 if a committed file is stale
 *
 * RUN AFTER WIRING A DIAGRAM and commit the result (place-visuals.ts and
 * wire-visuals.ts run it for you); tests/notes-diagram-split.test.ts fails until you do.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  buildClientDiagramModule,
  buildServerDiagramsModule,
  isClientSource,
  parseDiagramRegistry,
} from "../../src/lib/notes/diagramSplit";

const DIR = path.resolve(__dirname, "../../src/app/notes/_components");
const read = (f: string) => readFileSync(path.join(DIR, f), "utf8").replace(/\r\n/g, "\n");

const entries = parseDiagramRegistry(read("diagramRegistry.tsx"));
const isClientFile = (file: string) => {
  const p = `visualizations/${file}.tsx`;
  if (!existsSync(path.join(DIR, p))) throw new Error(`diagramRegistry imports ${p}, which does not exist`);
  return isClientSource(read(p));
};

const outputs: Record<string, string> = {
  "serverDiagrams.generated.tsx": buildServerDiagramsModule(entries, isClientFile),
  "ClientDiagram.generated.tsx": buildClientDiagramModule(entries, isClientFile),
};

const check = process.argv.includes("--check");
let stale = 0;
for (const [file, body] of Object.entries(outputs)) {
  const full = path.join(DIR, file);
  const current = existsSync(full) ? read(file) : "";
  if (current === body) continue;
  if (check) {
    console.error(`${file} is stale. Run \`npm run notes:diagrams\` and commit it.`);
    stale++;
  } else writeFileSync(full, body);
}
if (stale) process.exit(1);
const client = entries.filter((e) => isClientFile(e.file)).length;
console.log(`${check ? "checked" : "wrote"}: ${entries.length - client} picture-only + ${client} browser-run diagrams`);
