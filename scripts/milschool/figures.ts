// Where a question's figure crop lives: outside the repo, beside the sources.
// The crop is regenerable, but it is also what gets uploaded, so it is kept.
import { join } from "node:path";
import { FIGURE_ROOT } from "./config";

export { FIGURE_ROOT };

export const figurePath = (paperId: string, number: number) =>
  join(FIGURE_ROOT, paperId, `q${String(number).padStart(3, "0")}.png`);
