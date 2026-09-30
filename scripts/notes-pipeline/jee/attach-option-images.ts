/**
 * Attach option pictures (and, where needed, a stem figure) to JEE rows whose images
 * the ingest never attached — graph-option questions that render with four blank
 * options.
 *
 *   npx tsx scripts/notes-pipeline/jee/attach-option-images.ts <spec.json>           # dry run
 *   npx tsx scripts/notes-pipeline/jee/attach-option-images.ts <spec.json> --apply   # upload + set
 *
 * spec.json: [{ "id": "<full question uuid>",
 *               "options": { "A": "<png>", "B": "<png>", "C": "<png>", "D": "<png>" },
 *               "stem": "<png>", "replaceStem": "<current image_url>" }]
 * `options` and `stem` are each optional. An option slot that already has an image is
 * left alone. A stem image is set only when the row has none, or when `replaceStem`
 * names the image it currently has (so a replacement is always deliberate).
 * Take the pictures from the source docx (pandoc --extract-media) and VIEW them
 * against the stored key before applying.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../../src/lib/storage/images";
import { ORG_ID } from "../../jee/config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Entry = { id: string; options?: Partial<Record<"A" | "B" | "C" | "D", string>>; stem?: string; replaceStem?: string };

const mimeOf = (f: string) => (/\.jpe?g$/i.test(f) ? "image/jpeg" : "image/png") as "image/jpeg" | "image/png";

const specPath = process.argv[2];
const apply = process.argv.includes("--apply");
if (!specPath) throw new Error("usage: attach-option-images.ts <spec.json> [--apply]");
const spec: Entry[] = JSON.parse(readFileSync(specPath, "utf8"));

async function main() {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  for (const e of spec) {
    const { data: rows, error } = await sb
      .from("questions")
      .select("id, image_url, options(id, label, image_url)")
      .eq("id", e.id);
    if (error) throw error;
    if (!rows || rows.length !== 1) throw new Error(`${e.id}: expected one row, found ${rows?.length ?? 0}`);
    const q = rows[0] as { id: string; image_url: string | null; options: { id: string; label: string; image_url: string | null }[] };

    if (e.stem) {
      const allowed = q.image_url === null || (e.replaceStem !== undefined && q.image_url === e.replaceStem);
      if (!allowed) {
        console.log(`${q.id.slice(0, 8)} stem: has ${q.image_url}; skipped (name it in replaceStem to replace)`);
      } else if (!apply) {
        console.log(`${q.id.slice(0, 8)} stem: would set from ${e.stem}`);
      } else {
        const path = await uploadImage(sb, ORG_ID, readFileSync(e.stem), mimeOf(e.stem));
        const { error: u } = await sb.from("questions").update({ image_url: path }).eq("id", q.id);
        if (u) throw u;
        console.log(`${q.id.slice(0, 8)} stem: ${q.image_url ?? "none"} -> ${path}`);
      }
    }

    for (const [label, file] of Object.entries(e.options ?? {})) {
      const opt = q.options.find((o) => o.label === label);
      if (!opt) throw new Error(`${q.id.slice(0, 8)}: no option ${label}`);
      if (opt.image_url) {
        console.log(`${q.id.slice(0, 8)} ${label}: already has an image; skipped`);
        continue;
      }
      if (!apply) {
        console.log(`${q.id.slice(0, 8)} ${label}: would set from ${file}`);
        continue;
      }
      const path = await uploadImage(sb, ORG_ID, readFileSync(file!), mimeOf(file!));
      const { error: u } = await sb.from("options").update({ image_url: path }).eq("id", opt.id);
      if (u) throw u;
      console.log(`${q.id.slice(0, 8)} ${label}: -> ${path}`);
    }
  }
  if (!apply) console.log("\ndry run — nothing written");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
