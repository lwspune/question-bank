/**
 * stemTrim.ts on a real PNG: the picture is read as grey on white (a transparent PNG is laid on
 * white first) and the box is cut from the ORIGINAL colours, so a chart keeps its colours.
 * Used by figures.ts (new shifts come in trimmed) and trim-stems.ts (the shipped rows).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { stemTrimBox, type TrimBox, type TrimLimits } from "./stemTrim";

/**
 * Review decisions, keyed "<shiftId> Q<n>": a string keeps the picture whole (the string is why);
 * { maxTop, maxBottom, why } caps how many lines are cut where a chart's own title reads as a sentence.
 */
export const KEEP_FILE = join(__dirname, "stem-trim-keep.json");
export type KeepEntry = string | (TrimLimits & { why: string });
export function loadKeep(): Record<string, KeepEntry> {
  return JSON.parse(readFileSync(KEEP_FILE, "utf8"));
}
export const keepKey = (shiftId: string, n: number) => `${shiftId} Q${n}`;

export async function trimStemPng(png: Buffer, limits: TrimLimits = {}): Promise<{ box: TrimBox; png: Buffer } | null> {
  const sharp = (await import("sharp")).default;
  const { data, info } = await sharp(png).flatten({ background: "#ffffff" }).greyscale().raw().toBuffer({ resolveWithObject: true });
  const box = stemTrimBox({ width: info.width, height: info.height, data: new Uint8Array(data) }, limits);
  if (!box) return null;
  const out = await sharp(png)
    .extract({ left: box.left, top: box.top, width: box.right - box.left, height: box.bottom - box.top })
    .png()
    .toBuffer();
  return { box, png: out };
}
