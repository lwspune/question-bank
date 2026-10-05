/**
 * The pictures a paper or key shows, fetched once and turned into data URIs for
 * the PDF page. A paper takes question and option pictures and NEVER a
 * solution picture (it would give the answer away); a key takes only solution
 * pictures. A picture that fails to fetch is left out and logged, as the Word
 * export does: one missing figure must not cost the student the whole file.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { QuestionRow } from "@/lib/questions/query";
import { downloadImage } from "@/lib/storage/images";

function mimeOf(bytes: Buffer): string {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "image/jpeg";
  if (bytes.subarray(0, 4).toString("ascii") === "RIFF") return "image/webp";
  if (bytes.subarray(0, 3).toString("ascii") === "GIF") return "image/gif";
  return "image/png";
}

/** Storage paths of the pictures one document shows. Pure. */
export function imagePathsFor(kind: "paper" | "key", questions: QuestionRow[]): string[] {
  const paths = new Set<string>();
  for (const q of questions) {
    if (kind === "key") {
      if (q.solutionImageUrl) paths.add(q.solutionImageUrl);
      continue;
    }
    if (q.imageUrl) paths.add(q.imageUrl);
    for (const o of q.options) if (o.imageUrl) paths.add(o.imageUrl);
  }
  return Array.from(paths);
}

export async function imageDataUris(
  admin: SupabaseClient,
  kind: "paper" | "key",
  questions: QuestionRow[]
): Promise<Map<string, string>> {
  const paths = imagePathsFor(kind, questions);
  const out = new Map<string, string>();
  await Promise.all(
    paths.map(async (path) => {
      try {
        const bytes = await downloadImage(admin, path);
        out.set(path, `data:${mimeOf(bytes)};base64,${bytes.toString("base64")}`);
      } catch (err) {
        console.warn(`pdf: failed to fetch image ${path}: ${err instanceof Error ? err.message : err}`);
      }
    })
  );
  return out;
}
