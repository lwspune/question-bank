import { describe, it, expect } from "vitest";
import { clickScript, pageSlug, planCaptures, parseShotArgs, sheetHtml, storageScript, stubHeaderSession, VIEWPORTS } from "../scripts/ui/lib";

/**
 * `npm run ui:shots` (2026-10-04): the before/after screenshot sheet every
 * user-visible change ships with (CLAUDE.md Conventions). These pin the pure
 * half: what gets captured, where it is written, and how the sheet is laid
 * out. The browser half (scripts/ui/shots.ts) drives the installed Edge.
 */
describe("pageSlug", () => {
  it("names the homepage and flattens nested paths", () => {
    expect(pageSlug("/")).toBe("home");
    expect(pageSlug("/guide/nda")).toBe("guide-nda");
    expect(pageSlug("/notes/nda-maths/")).toBe("notes-nda-maths");
  });

  it("keeps the name file-safe", () => {
    expect(pageSlug("/board/[x]")).toBe("board-x");
  });

  it("gives URLs that differ only in their query different names", () => {
    // Dropping the query made /browse and /browse?examId=... both "browse", so
    // the second capture overwrote the first (2026-10-05). A short hash keeps
    // the file name readable when the query is a row of uuids.
    const bare = pageSlug("/browse");
    const a = pageSlug("/browse?examId=e4e753d1-c84a-45a8-93ad-6f0bf9733c95");
    const b = pageSlug("/browse?examId=70e70f9d-c20c-45c6-a346-0c914d65035d");
    expect(bare).toBe("browse");
    expect(a).toMatch(/^browse-q[0-9a-z]{6}$/);
    expect(b).toMatch(/^browse-q[0-9a-z]{6}$/);
    expect(a).not.toBe(b);
    expect(pageSlug("/browse?examId=e4e753d1-c84a-45a8-93ad-6f0bf9733c95")).toBe(a);
  });
});

describe("planCaptures", () => {
  const plan = planCaptures({
    pages: ["/", "/mock"],
    viewports: ["phone", "desktop"],
    themes: ["light", "dark"],
    targets: { before: "https://www.pyqvault.com", after: "http://localhost:3000/" },
  });

  it("captures every page x viewport x theme, before AND after", () => {
    expect(plan).toHaveLength(2 * 2 * 2 * 2);
  });

  it("joins each base URL to the page path without a double slash", () => {
    expect(plan.map((c) => c.url)).toContain("http://localhost:3000/mock");
    expect(plan.map((c) => c.url)).toContain("https://www.pyqvault.com/");
  });

  it("gives every capture a unique, readable file name", () => {
    const files = plan.map((c) => c.file);
    expect(new Set(files).size).toBe(files.length);
    expect(files).toContain("after-phone-dark-mock.png");
  });
});

describe("parseShotArgs", () => {
  it("defaults to live vs local, phone and desktop, light only", () => {
    const a = parseShotArgs(["--pages=/,/mock"]);
    expect(a.pages).toEqual(["/", "/mock"]);
    expect(a.targets).toEqual({ before: "https://www.pyqvault.com", after: "http://localhost:3000" });
    expect(a.viewports).toEqual(["phone", "desktop"]);
    expect(a.themes).toEqual(["light"]);
  });

  it("adds dark mode, narrows the viewport, and takes overrides", () => {
    const a = parseShotArgs(["--pages=/pricing", "--dark", "--phone", "--wait=3000", "--before=http://localhost:3001", "--full"]);
    expect(a.themes).toEqual(["light", "dark"]);
    expect(a.viewports).toEqual(["phone"]);
    expect(a.waitMs).toBe(3000);
    expect(a.targets.before).toBe("http://localhost:3001");
    expect(a.fullPage).toBe(true);
  });

  it("undoes Git Bash's path conversion and accepts paths without a slash", () => {
    // Git Bash rewrites an argument that starts with "/" into a Windows path,
    // so "--pages=/" arrives as "--pages=C:/Program Files/Git/". Found on the
    // first real run: the homepage rows captured a URL that does not exist.
    expect(parseShotArgs(["--pages=C:/Program Files/Git/,/pricing"]).pages).toEqual(["/", "/pricing"]);
    expect(parseShotArgs(["--pages=C:/Program Files/Git/mock"]).pages).toEqual(["/mock"]);
    expect(parseShotArgs(["--pages=guide/nda"]).pages).toEqual(["/guide/nda"]);
  });

  it("splits a local change into a before run and an after run", () => {
    // A change that exists only on localhost has no live "before": capture the
    // local page first (--phase=before), edit, then --phase=after into the
    // same --out folder, which builds the sheet.
    expect(parseShotArgs(["--pages=/about"]).phase).toBe("both");
    expect(parseShotArgs(["--pages=/about", "--phase=before"]).phase).toBe("before");
    expect(() => parseShotArgs(["--pages=/about", "--phase=later"])).toThrow(/--phase/);
  });

  it("refuses to run with no pages, since an empty sheet proves nothing", () => {
    expect(() => parseShotArgs([])).toThrow(/--pages/);
  });
});

describe("sheetHtml", () => {
  const plan = planCaptures({
    pages: ["/mock"],
    viewports: ["phone"],
    themes: ["light"],
    targets: { before: "https://a", after: "http://b" },
  });

  it("puts BEFORE and AFTER side by side for each page, labelled", () => {
    const html = sheetHtml(plan, { title: "Theme change" });
    expect(html).toContain("BEFORE");
    expect(html).toContain("AFTER");
    expect(html).toContain('src="before-phone-light-mock.png"');
    expect(html).toContain('src="after-phone-light-mock.png"');
    expect(html.indexOf("before-phone")).toBeLessThan(html.indexOf("after-phone"));
  });

  it("sizes phone shots at the phone width", () => {
    expect(sheetHtml(plan, { title: "t" })).toContain(`width="${VIEWPORTS.phone.width}"`);
  });

  it("escapes the title and labels", () => {
    expect(sheetHtml(plan, { title: "<b>x</b>" })).not.toContain("<b>x</b>");
  });
});

describe("--as-student: a signed-in view without signing in", () => {
  it("is off unless asked for", () => {
    expect(parseShotArgs(["--pages=/notes"]).asStudent).toBeNull();
  });
  it("reads the student's chosen exams", () => {
    expect(parseShotArgs(["--pages=/notes", "--as-student=mpsc-group-b-c,cds"]).asStudent).toEqual(["mpsc-group-b-c", "cds"]);
  });
  it("refuses an empty list rather than shooting an anonymous page labelled as a student's", () => {
    expect(() => parseShotArgs(["--pages=/notes", "--as-student="])).toThrow(/as-student/);
  });
  it("answers /api/me/header as a plain student, never staff", () => {
    expect(stubHeaderSession(["mpsc-group-b-c"])).toEqual({
      session: {
        email: "student@example.invalid",
        role: null,
        orgName: null,
        isStaff: false,
        isSuperadmin: false,
        hasPass: false,
        stage: null,
        targetExams: ["mpsc-group-b-c"],
      },
    });
  });
  it("--with-pass makes that student a Premium Pass holder", () => {
    expect(parseShotArgs(["--pages=/", "--as-student=nda", "--with-pass"]).withPass).toBe(true);
    expect(parseShotArgs(["--pages=/", "--as-student=nda"]).withPass).toBe(false);
    expect(stubHeaderSession(["nda"], { hasPass: true }).session.hasPass).toBe(true);
  });
  it("refuses --with-pass without --as-student, which has no one to give the pass to", () => {
    expect(() => parseShotArgs(["--pages=/", "--with-pass"])).toThrow(/with-pass/);
  });
});

/**
 * `--click="<text>"`: dialogs, sheets and popovers exist only after a tap, so
 * a before/after sheet could never show them (2026-10-12: the download box).
 * The capture taps the first visible button or link whose text starts with
 * this, then waits for it to open.
 */
describe("--click", () => {
  it("is off unless asked for", () => {
    expect(parseShotArgs(["--pages=/browse"]).click).toBeNull();
  });

  it("carries the button text", () => {
    expect(parseShotArgs(["--pages=/browse", "--click=Download"]).click).toEqual(["Download"]);
  });

  it("refuses an empty value", () => {
    expect(() => parseShotArgs(["--pages=/browse", "--click="])).toThrow(/--click/);
  });

  // V's builder (2026-10-15) sits two taps deep, behind an icon-only launcher.
  it("takes a chain of taps separated by >>", () => {
    expect(parseShotArgs(["--pages=/", "--click=Chat with V >> Build a practice test"]).click).toEqual([
      "Chat with V",
      "Build a practice test",
    ]);
  });

  it("refuses a chain with an empty tap", () => {
    expect(() => parseShotArgs(["--pages=/", "--click=Chat with V>>"])).toThrow(/--click/);
  });

  it("builds a page script that embeds the text safely", () => {
    const js = clickScript('Say "hi"');
    expect(js).toContain(JSON.stringify('Say "hi"'));
    expect(js).toMatch(/startsWith/);
  });

  it("looks inside an open dialog first, so a tap there cannot hit the page behind it", () => {
    expect(clickScript("MHT-CET")).toContain('[role="dialog"]');
  });

  it("also finds an icon-only button by its aria-label", () => {
    expect(clickScript("Chat with V")).toContain("aria-label");
  });

  // 2026-10-20: a button far down a long page (a notes practice rep) was clicked off screen, so the
  // shot showed the page top. It is scrolled to the middle of the screen first.
  it("can open a collapsed <details> section by its summary (notes 'Practice this concept')", () => {
    expect(clickScript("Practice this concept")).toContain("summary");
  });

  it("scrolls the button into view before tapping it", () => {
    const js = clickScript("Reveal answer");
    expect(js.indexOf("scrollIntoView")).toBeGreaterThan(-1);
    expect(js.indexOf("scrollIntoView")).toBeLessThan(js.indexOf("el.click()"));
  });
});

describe("--storage: seed localStorage before every page load", () => {
  // The V chat panel restores its conversation from localStorage ("v-chat"),
  // so a sheet can show real message bubbles without sending a question to
  // production (which would write a fake row into the chat log).
  it("takes a JSON file path, null when absent", () => {
    expect(parseShotArgs(["--pages=/"]).storage).toBeNull();
    expect(parseShotArgs(["--pages=/", "--storage=tmp/seed.json"]).storage).toBe("tmp/seed.json");
  });

  it("writes each entry, serialising objects and keeping strings as they are", () => {
    const set: Record<string, string> = {};
    const localStorage = { setItem: (k: string, v: string) => void (set[k] = v) };
    new Function("localStorage", storageScript({ "v-chat": { v: 1, turns: [] }, theme: "dark" }))(localStorage);
    expect(set).toEqual({ "v-chat": '{"v":1,"turns":[]}', theme: "dark" });
  });

  it("reads --cookie as name=value pairs, so a view chosen by a cookie (the exam) can be captured", () => {
    expect(parseShotArgs(["--pages=/"]).cookies).toBeNull();
    expect(parseShotArgs(["--pages=/", "--cookie=qb_exam=cbse-12"]).cookies).toEqual([{ name: "qb_exam", value: "cbse-12" }]);
    expect(parseShotArgs(["--pages=/", "--cookie=a=1,b=x=y"]).cookies).toEqual([
      { name: "a", value: "1" },
      { name: "b", value: "x=y" },
    ]);
    expect(() => parseShotArgs(["--pages=/", "--cookie=novalue"])).toThrow(/name=value/);
  });

  it("never throws where storage is blocked", () => {
    const localStorage = { setItem: () => { throw new Error("blocked"); } };
    expect(() => new Function("localStorage", storageScript({ a: "b" }))(localStorage)).not.toThrow();
  });
});
