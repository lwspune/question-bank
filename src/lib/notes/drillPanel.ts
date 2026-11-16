/**
 * The notes drill panel (2026-11-15, owner): a notes page's "Drill N more on
 * <concept>" and "Drill all N questions" open their questions in a panel on the
 * same page, like the repeat line's See all, so a student practises and closes
 * it back to the concept they were reading. /browse stays one tap away inside.
 *
 * Pure rules shared by the panel (what to ask for) and GET /api/notes/drill
 * (what to accept). A concept's ids are known to the page, so the panel asks
 * for one page of them; a topic can hold 260 questions, so it is asked for by
 * id and page and the server pages it like /browse does.
 */

/** Questions per load. A concept's link is usually 5, a topic's usually 19. */
export const DRILL_PAGE_SIZE = 20;
/** 100 pages = 2,000 questions, far past the biggest topic (260). */
const MAX_PAGE = 100;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** What a drill link opens: a concept's tagged ids, or a whole topic. */
export type DrillSource =
  | { kind: "ids"; ids: string[] }
  /** `all`: the exam's notes count practice too (lib/notes/countKind), so the topic does. */
  | { kind: "subtopic"; subtopicId: string; all: boolean };

/** The query string the panel sends for page `page` (1-based) of `source`. */
export function drillRequestQuery(source: DrillSource, page: number): string {
  const sp = new URLSearchParams();
  if (source.kind === "ids") {
    const start = (page - 1) * DRILL_PAGE_SIZE;
    sp.set("ids", source.ids.slice(start, start + DRILL_PAGE_SIZE).join(","));
  } else {
    sp.set("subtopic", source.subtopicId);
    sp.set("kind", source.all ? "all" : "pyq");
    sp.set("page", String(page));
  }
  return sp.toString();
}

export type DrillRequest =
  | { ok: true; mode: "ids"; ids: string[] }
  | { ok: true; mode: "subtopic"; subtopicId: string; kind: "pyq" | "all"; page: number }
  | { ok: false; error: string };

export function parseDrillRequest(params: URLSearchParams): DrillRequest {
  const rawIds = params.get("ids");
  const subtopic = params.get("subtopic");
  if (rawIds !== null && subtopic !== null) return { ok: false, error: "Give ids or a topic, not both." };

  if (rawIds !== null) {
    const ids = rawIds.split(",").filter((s) => s.length > 0);
    if (ids.length === 0) return { ok: false, error: "No questions given." };
    if (ids.length > DRILL_PAGE_SIZE) return { ok: false, error: "Too many questions at once." };
    if (!ids.every((s) => UUID_RE.test(s))) return { ok: false, error: "Invalid question id." };
    return { ok: true, mode: "ids", ids };
  }

  if (subtopic !== null) {
    if (!UUID_RE.test(subtopic)) return { ok: false, error: "Invalid topic id." };
    const kind = params.get("kind");
    if (kind !== "pyq" && kind !== "all") return { ok: false, error: "Unknown kind." };
    const rawPage = params.get("page") ?? "1";
    if (!/^\d{1,3}$/.test(rawPage)) return { ok: false, error: "Invalid page." };
    const page = Number(rawPage);
    if (page < 1 || page > MAX_PAGE) return { ok: false, error: "Invalid page." };
    return { ok: true, mode: "subtopic", subtopicId: subtopic, kind, page };
  }

  return { ok: false, error: "Give ids or a topic." };
}

/**
 * Whether "Show more" stays. `lastBatch` is how many the latest load returned:
 * a short page means the rest are gone (made private since the page was
 * cached), so the button must not ask forever for questions that never come.
 */
export function drillHasMore(loaded: number, total: number, lastBatch: number = DRILL_PAGE_SIZE): boolean {
  return loaded < total && lastBatch >= DRILL_PAGE_SIZE;
}
