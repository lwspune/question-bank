// Where a question's figure crop lives. Outside the repo, beside the booklets:
// the crop is regenerable from the booklet, but it is also what gets uploaded,
// so it is kept rather than cleaned with `out/`.
import { join } from "node:path";

export const FIGURE_ROOT = "C:\\Vilas\\LWS_Pune\\CAPF\\figures";

export const figurePath = (paperId: string, number: number) =>
  join(FIGURE_ROOT, paperId, `q${String(number).padStart(3, "0")}.png`);
