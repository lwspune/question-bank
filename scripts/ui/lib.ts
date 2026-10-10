/**
 * Pure half of `npm run ui:shots`: what to capture, where it goes, and the
 * before/after sheet's HTML. The browser half is scripts/ui/shots.ts.
 * Spec: tests/ui-shots-lib.test.ts.
 */

export type Viewport = "phone" | "desktop";
export type Theme = "light" | "dark";
export type Target = "before" | "after";

/** Phone = a 390 px Android-class screen at 2x; desktop = a 1440 px laptop. */
export const VIEWPORTS: Record<Viewport, { width: number; height: number; scale: number; mobile: boolean }> = {
  phone: { width: 390, height: 844, scale: 2, mobile: true },
  desktop: { width: 1440, height: 900, scale: 1, mobile: false },
};

export type Capture = {
  target: Target;
  viewport: Viewport;
  theme: Theme;
  path: string;
  url: string;
  file: string;
};

export type ShotArgs = {
  pages: string[];
  targets: Record<Target, string>;
  viewports: Viewport[];
  themes: Theme[];
  waitMs: number;
  fullPage: boolean;
  out: string | null;
  title: string;
  /** "before" / "after" capture one side only (a local-only change: shoot
   *  before, edit, shoot after into the same --out); "both" does both. */
  phase: "before" | "after" | "both";
  /** `--as-student=<exam,...>`: the browser answers /api/me/header as a plain
   *  student who chose these exams, so a signed-in view can be captured on
   *  both sides without signing in. Null = anonymous, as before. */
  asStudent: string[] | null;
};

/** "/guide/nda?x=1" → "guide-nda"; "/" → "home". */
export function pageSlug(path: string): string {
  const [pathPart, query] = path.split("?");
  const bare = pathPart.replace(/^\/+|\/+$/g, "");
  const base = !bare
    ? "home"
    : bare
        .replace(/[^A-Za-z0-9/-]+/g, "")
        .replace(/\//g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
  // A query gets a short hash, so /browse and /browse?examId=... do not share
  // a file name (the second capture used to overwrite the first).
  return query ? `${base}-q${shortHash(query)}` : base;
}

/** Six base-36 characters, stable for the same input (FNV-1a, 32-bit). */
function shortHash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).padStart(6, "0").slice(-6);
}

function join(base: string, path: string): string {
  return base.replace(/\/+$/, "") + (path.startsWith("/") ? path : `/${path}`);
}

export function planCaptures(opts: {
  pages: string[];
  viewports: Viewport[];
  themes: Theme[];
  targets: Record<Target, string>;
}): Capture[] {
  const out: Capture[] = [];
  for (const path of opts.pages)
    for (const viewport of opts.viewports)
      for (const theme of opts.themes)
        for (const target of ["before", "after"] as const)
          out.push({
            target,
            viewport,
            theme,
            path,
            url: join(opts.targets[target], path),
            file: `${target}-${viewport}-${theme}-${pageSlug(path)}.png`,
          });
  return out;
}

/**
 * A site path as typed. Git Bash converts an argument starting with "/" into a
 * Windows path ("/" → "C:/Program Files/Git/"), so strip that prefix back off;
 * and accept "pricing" for "/pricing".
 */
function sitePath(raw: string): string {
  const unmangled = raw.replace(/^[A-Za-z]:[\\/](?:.*?[\\/])?Git(?=[\\/]|$)/, "").replace(/\\/g, "/");
  return unmangled.startsWith("/") ? unmangled : `/${unmangled}`;
}

export function parseShotArgs(argv: string[]): ShotArgs {
  const flag = (name: string) => argv.includes(`--${name}`);
  const value = (name: string) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const pages = (value("pages") ?? "").split(",").map((p) => p.trim()).filter(Boolean).map(sitePath);
  if (!pages.length) throw new Error("--pages=/,/mock,... is required: an empty sheet proves nothing");
  const phase = value("phase") ?? "both";
  if (phase !== "before" && phase !== "after" && phase !== "both") throw new Error(`--phase must be before, after or both, not "${phase}"`);
  const viewports: Viewport[] = flag("phone") && !flag("desktop") ? ["phone"] : flag("desktop") && !flag("phone") ? ["desktop"] : ["phone", "desktop"];
  return {
    pages,
    targets: {
      before: value("before") ?? "https://www.pyqvault.com",
      after: value("after") ?? "http://localhost:3000",
    },
    viewports,
    themes: flag("dark") ? ["light", "dark"] : ["light"],
    waitMs: Number(value("wait") ?? 8000),
    fullPage: flag("full"),
    out: value("out") ?? null,
    title: value("title") ?? "Before / after",
    phase,
    asStudent: asStudentArg(value("as-student")),
  };
}

function asStudentArg(raw: string | undefined): string[] | null {
  if (raw === undefined) return null;
  const exams = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (!exams.length) throw new Error("--as-student= needs at least one exam slug");
  return exams;
}

/** The /api/me/header body for `--as-student`: a self-serve student, never staff. */
export function stubHeaderSession(exams: string[]) {
  return {
    session: {
      email: "student@example.invalid",
      role: null,
      orgName: null,
      isStaff: false,
      isSuperadmin: false,
      stage: null,
      targetExams: exams,
    },
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The sheet: one row per page x viewport x theme, BEFORE on the left and
 * AFTER on the right, each shot at its CSS width so a phone reads as a phone.
 * Image paths are relative: the HTML is written next to the captures.
 */
export function sheetHtml(captures: Capture[], opts: { title: string }): string {
  const rows = new Map<string, Capture[]>();
  for (const c of captures) {
    const key = `${c.path}|${c.viewport}|${c.theme}`;
    rows.set(key, [...(rows.get(key) ?? []), c]);
  }
  const cell = (c: Capture | undefined, label: string, color: string) => {
    if (!c) return `<div class="cell"></div>`;
    const w = VIEWPORTS[c.viewport].width;
    return `<div class="cell"><div class="lab" style="color:${color}">${label}</div>` +
      `<img src="${esc(c.file)}" width="${w}" alt="${esc(`${label} ${c.path}`)}"></div>`;
  };
  const body = [...rows.values()].map((pair) => {
    const before = pair.find((c) => c.target === "before");
    const after = pair.find((c) => c.target === "after");
    const any = before ?? after!;
    return `<section><h2>${esc(any.path)} <span>${any.viewport} · ${any.theme}</span></h2>` +
      `<div class="pair">${cell(before, "BEFORE", "#b91c1c")}${cell(after, "AFTER", "#15803d")}</div></section>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(opts.title)}</title><style>` +
    `body{margin:24px;font:15px/1.4 "Segoe UI",system-ui,sans-serif;color:#111827;background:#fff}` +
    `h1{font-size:26px;margin:0 0 16px}section{border-top:1px solid #e5e7eb;padding:14px 0}` +
    `h2{font-size:18px;margin:0 0 10px}h2 span{font-weight:400;color:#6b7280;font-size:14px;margin-left:8px}` +
    `.pair{display:flex;gap:24px;align-items:flex-start}.lab{font:700 15px "Segoe UI",sans-serif;margin-bottom:6px}` +
    `img{display:block;border:1px solid #e5e7eb;border-radius:6px;height:auto}` +
    `</style></head><body><h1>${esc(opts.title)}</h1>${body}</body></html>`;
}
