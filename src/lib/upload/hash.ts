import { createHash } from "node:crypto";

const norm = (s: string) => s.trim().replace(/\s+/g, " ");

export function contentHash(
  question: string,
  options: string[],
  answer: string
): string {
  const q = norm(question);
  const opts = options.map(norm).sort();
  const ans = answer.trim().toUpperCase();
  return createHash("sha256")
    .update(`${q}\n${opts.join("\n")}\n${ans}`)
    .digest("hex");
}
