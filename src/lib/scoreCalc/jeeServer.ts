/**
 * Server-side pieces of the JEE Main score calculator: checking and fetching
 * the pasted response-sheet link, turning the page into text, finding which
 * shift's key the sheet belongs to, and the rows the key loader writes.
 * SERVER ONLY (node:crypto, outbound fetch).
 *
 * THE LINK IS UNTRUSTED. The server fetches a URL a visitor typed, so it goes
 * only to NTA's response-sheet host over https: no other host, no address, no
 * port, no credentials, a redirect only if it stays on that host, a 10 s limit
 * and a 5 MB cap. Anything else is refused before a request is made.
 *
 * NO SHIFT PICKER. Every NTA question ID belongs to one shift, so the key whose
 * questions the sheet carries IS the student's shift (final key preferred over
 * provisional). scoreNtaSheet then insists on a full match.
 */
import { createHash } from "node:crypto";
import type { NtaKeyEntry, NtaKeyShift } from "./ntaKey";
import type { NtaResponse } from "./ntaSheet";

const SHEET_HOST = /^cdn\d*\.digialm\.com$/i;
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 10_000;

export type UrlCheck = { ok: true; url: URL } | { ok: false; error: string };

export function checkSheetUrl(raw: string): UrlCheck {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return { ok: false, error: "That is not a link. Paste the full link to your response sheet." };
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port || !SHEET_HOST.test(url.hostname)) {
    return { ok: false, error: "This does not look like an NTA response-sheet link. It should start with https://cdn3.digialm.com/" };
  }
  return { ok: true, url };
}

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export async function fetchSheetHtml(
  start: URL,
  fetchImpl: FetchLike = fetch,
): Promise<{ ok: true; html: string } | { ok: false; error: string }> {
  let current = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    let res: Response;
    try {
      res = await fetchImpl(current, {
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": "Mozilla/5.0 (compatible; PYQVaultScoreCalculator/1.0)" },
      });
    } catch {
      return { ok: false, error: "NTA's site did not answer in time. Try again in a minute." };
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) return { ok: false, error: "NTA's site sent us nowhere. Check the link." };
      const next = checkSheetUrl(new URL(location, current).toString());
      if (!next.ok) return { ok: false, error: "The link led away from NTA's site, so we stopped." };
      current = next.url;
      continue;
    }
    if (!res.ok) return { ok: false, error: "NTA's site no longer shows this sheet. Check the link, or save the page and upload it." };

    const declared = Number(res.headers.get("content-length") ?? "0");
    if (declared > MAX_BYTES) return { ok: false, error: "This page is too large to be a response sheet." };
    if (!res.body) return { ok: false, error: "NTA's site sent an empty page." };

    const reader = res.body.getReader();
    const parts: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return { ok: false, error: "This page is too large to be a response sheet." };
      }
      parts.push(value);
    }
    const bytes = new Uint8Array(size);
    let at = 0;
    for (const p of parts) {
      bytes.set(p, at);
      at += p.byteLength;
    }
    return { ok: true, html: new TextDecoder("utf-8").decode(bytes) };
  }
  return { ok: false, error: "Too many redirects. Check the link." };
}

const ENTITIES: Record<string, string> = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

/** The page's text in reading order, one cell or block per line. */
export function htmlToSheetText(html: string): string {
  return html
    .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/?(td|th|tr|table|tbody|thead|div|p|br|li|ul|ol|h[1-6]|section)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === "#") {
        const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : " ";
      }
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/[ \t ]+/g, " ")
    .replace(/ *\n[\s]*/g, "\n")
    .trim();
}

/** One sheet's fingerprint: the same answers always hash the same. */
export function sheetHash(responses: readonly NtaResponse[]): string {
  const body = responses.map((r) => `${r.questionId}:${r.chosen ?? "-"}`).join("|");
  return createHash("sha256").update(body).digest("hex");
}

/** A score_keys row as the calculator reads it. */
export interface StoredKeyRow {
  id: string;
  sitting: string;
  region: string;
  status: string;
  drop_policy: "all" | "attempted";
  loaded_at: string;
  key: Record<string, NtaKeyEntry>;
}

const SUBJECTS = new Set(["maths", "physics", "chemistry"]);

function toKeyEntry(v: unknown): NtaKeyEntry | null {
  if (!v || typeof v !== "object") return null;
  const { subject, answer } = v as { subject?: unknown; answer?: unknown };
  if (typeof subject !== "string" || !SUBJECTS.has(subject) || !answer || typeof answer !== "object") return null;
  const a = answer as { kind?: unknown; values?: unknown };
  const s = subject as NtaKeyEntry["subject"];
  if (a.kind === "dropped" || a.kind === "any-non-negative-integer") return { subject: s, answer: { kind: a.kind } };
  if (a.kind === "values" && Array.isArray(a.values) && a.values.length > 0 && a.values.every((x) => typeof x === "string")) {
    return { subject: s, answer: { kind: "values", values: a.values as string[] } };
  }
  return null;
}

/** A row from the database, checked: null when its key is not in the shape the loader writes. */
export function toStoredKeyRow(r: {
  id: string;
  sitting: string;
  region: string;
  status: string;
  drop_policy: string;
  loaded_at: string;
  key: unknown;
}): StoredKeyRow | null {
  if (r.drop_policy !== "all" && r.drop_policy !== "attempted") return null;
  if (!r.key || typeof r.key !== "object" || Array.isArray(r.key)) return null;
  const key: Record<string, NtaKeyEntry> = {};
  for (const [qid, v] of Object.entries(r.key)) {
    const entry = toKeyEntry(v);
    if (!entry) return null;
    key[qid] = entry;
  }
  return { ...r, drop_policy: r.drop_policy, key };
}

export function matchKeyRow(
  responses: readonly NtaResponse[],
  rows: readonly StoredKeyRow[],
): { row: StoredKeyRow; matched: number } | null {
  let best: { row: StoredKeyRow; matched: number } | null = null;
  const rank = (r: StoredKeyRow) => (r.status === "final" ? 1 : 0);
  for (const row of rows) {
    const matched = responses.filter((r) => Object.prototype.hasOwnProperty.call(row.key, r.questionId)).length;
    if (matched === 0) continue;
    const better =
      !best ||
      matched > best.matched ||
      (matched === best.matched && rank(row) > rank(best.row)) ||
      (matched === best.matched && rank(row) === rank(best.row) && row.loaded_at > best.row.loaded_at);
    if (better) best = { row, matched };
  }
  return best;
}

/** The rows the key loader writes: one per shift and region. */
export function keyRowsFromShifts(
  shifts: readonly NtaKeyShift[],
  opts: { status: "provisional" | "final"; sourceUrl: string },
) {
  return shifts.map((s) => ({
    calculator: "jee-main" as const,
    sitting: `${s.date}-s${s.shift}`,
    region: s.region,
    status: opts.status,
    drop_policy: "all" as const,
    source_url: opts.sourceUrl,
    key: Object.fromEntries(s.entries),
  }));
}
