import { describe, it, expect } from "vitest";
import {
  blockingTime,
  compareToBaseline,
  diffSeoViews,
  isSavedFolder,
  parsePageWeightArgs,
  prefetchedPages,
  requestKind,
  seoView,
  summarise,
  type Measurement,
  type RequestRecord,
} from "../scripts/lib/pageWeight";

/**
 * `npm run audit:page-weight` (PAGE_WEIGHT_SPEC.md item 0). These pin the
 * pure half: how a request is classed and totalled, which pages were fetched
 * in advance, what a search engine reads from a page (Rule A), and the ratchet
 * against a saved baseline. The browser half is scripts/perf/pageWeight.ts.
 */

const req = (over: Partial<RequestRecord>): RequestRecord => ({
  url: "https://www.pyqvault.com/x",
  type: "Other",
  sentBytes: 0,
  unpackedBytes: 0,
  ...over,
});

describe("requestKind", () => {
  it("names a router fetch of another page as prefetch, whatever its resource type", () => {
    expect(requestKind(req({ url: "https://www.pyqvault.com/store?_rsc=abc", type: "Fetch" }))).toBe("prefetch");
    expect(requestKind(req({ url: "https://www.pyqvault.com/a?x=1&_rsc=abc", type: "Other" }))).toBe("prefetch");
  });

  it("does not mistake a query that merely contains rsc for one", () => {
    expect(requestKind(req({ url: "https://www.pyqvault.com/a?q=_rscx", type: "Fetch" }))).toBe("other");
  });

  it("classes the rest by resource type", () => {
    expect(requestKind(req({ type: "Document" }))).toBe("html");
    expect(requestKind(req({ type: "Script" }))).toBe("js");
    expect(requestKind(req({ type: "Stylesheet" }))).toBe("css");
    expect(requestKind(req({ type: "Font" }))).toBe("font");
    expect(requestKind(req({ type: "Image" }))).toBe("image");
    expect(requestKind(req({ type: "XHR" }))).toBe("other");
  });

  it("names a third-party script as third-party, apart from our own", () => {
    expect(requestKind(req({ url: "https://scripts.clarity.ms/c.js", type: "Script" }), "www.pyqvault.com")).toBe("third-party");
    expect(requestKind(req({ url: "https://www.pyqvault.com/_next/a.js", type: "Script" }), "www.pyqvault.com")).toBe("js");
  });
});

describe("summarise", () => {
  it("totals requests and bytes, overall and by kind, in KB rounded", () => {
    const s = summarise([
      req({ type: "Script", sentBytes: 1024, unpackedBytes: 3072 }),
      req({ type: "Script", sentBytes: 1024, unpackedBytes: 1024 }),
      req({ type: "Document", sentBytes: 2048, unpackedBytes: 10240 }),
    ]);
    expect(s.requests).toBe(3);
    expect(s.sentKB).toBe(4);
    expect(s.unpackedKB).toBe(14);
    expect(s.byKind.js).toEqual({ requests: 2, sentKB: 2, unpackedKB: 4 });
    expect(s.byKind.html).toEqual({ requests: 1, sentKB: 2, unpackedKB: 10 });
  });

  it("skips non-http requests (data: urls, extensions)", () => {
    expect(summarise([req({ url: "data:image/png;base64,AA", type: "Image", sentBytes: 900 })]).requests).toBe(0);
  });
});

describe("prefetchedPages", () => {
  it("adds up every router fetch per page path, largest first", () => {
    const pages = prefetchedPages([
      req({ url: "https://www.pyqvault.com/store?_rsc=a", unpackedBytes: 1024 }),
      req({ url: "https://www.pyqvault.com/store?_rsc=b", unpackedBytes: 4096 }),
      req({ url: "https://www.pyqvault.com/play?_rsc=a", unpackedBytes: 10240 }),
      req({ url: "https://www.pyqvault.com/_next/a.js", type: "Script", unpackedBytes: 99999 }),
    ]);
    expect(pages).toEqual([
      { path: "/play", requests: 1, unpackedKB: 10 },
      { path: "/store", requests: 2, unpackedKB: 5 },
    ]);
  });
});

describe("blockingTime", () => {
  it("counts only the part of each long task past 50 ms", () => {
    expect(blockingTime([40, 60, 250])).toBe(210);
    expect(blockingTime([])).toBe(0);
  });
});

const page = (body: string, head = "") =>
  `<!DOCTYPE html><html><head>${head}</head><body>${body}<script>self.__next_f.push([1,"data"])</script></body></html>`;

describe("seoView", () => {
  const head =
    '<title>Vectors &amp; Planes · PYQ Vault</title>' +
    '<meta content="Notes on vectors" name="description"/>' +
    '<meta property="og:title" content="Vectors"/>' +
    '<meta name="robots" content="index, follow"/>' +
    '<meta charSet="utf-8"/>' +
    '<link rel="canonical" href="https://www.pyqvault.com/notes/x"/>' +
    '<script src="/_next/static/chunks/a1.js" async=""></script>' +
    '<script type="application/ld+json">{"@type":"Article",  "name":"V"}</script>';
  const body =
    '<header><a href="/browse" class="x">Browse</a></header>' +
    '<main><h1>Vectors <span class="katex">a</span></h1><p>Two   lines\n here.</p>' +
    '<a href="/notes/y"><svg><path d="M0"/></svg>Next <b>part</b></a>' +
    '<h2 id="z">Dot product</h2><style>.a{color:red}</style></main>';
  const v = seoView(page(body, head));

  it("reads the title and every named meta, entities decoded", () => {
    expect(v.title).toBe("Vectors & Planes · PYQ Vault");
    expect(v.meta).toEqual({
      description: "Notes on vectors",
      "og:title": "Vectors",
      robots: "index, follow",
    });
    expect(v.canonical).toBe("https://www.pyqvault.com/notes/x");
  });

  it("keeps JSON-LD by meaning, not by spacing", () => {
    expect(v.jsonLd).toEqual(['{"@type":"Article","name":"V"}']);
  });

  it("lists headings and links in page order with their visible text", () => {
    expect(v.headings).toEqual(["h1: Vectors a", "h2: Dot product"]);
    expect(v.links).toEqual(["/browse | Browse", "/notes/y | Next part"]);
  });

  it("keeps visible text but drops scripts, styles, svg and the page data", () => {
    expect(v.text).toContain("Two lines here.");
    expect(v.text).not.toContain("color:red");
    expect(v.text).not.toContain("__next_f");
    expect(v.text).not.toContain("M0");
  });

  it("ignores script file names, which change on every build", () => {
    const other = seoView(page(body, head.replace("a1.js", "zz9.js")));
    expect(diffSeoViews(v, other)).toEqual([]);
  });
});

describe("diffSeoViews", () => {
  const base = seoView(page('<h1>A</h1><a href="/x">X</a><p>Hello world</p>', "<title>T</title>"));

  it("finds no difference between a page and itself", () => {
    expect(diffSeoViews(base, base)).toEqual([]);
  });

  it("names a changed title, a lost link and changed text", () => {
    const after = seoView(page("<h1>A</h1><p>Hello there</p>", "<title>T2</title>"));
    const d = diffSeoViews(base, after).join("\n");
    expect(d).toMatch(/title/);
    expect(d).toMatch(/links/);
    expect(d).toMatch(/\/x \| X/);
    expect(d).toMatch(/text/);
  });

  it("treats a link that gained only non-SEO attributes as unchanged", () => {
    const after = seoView(page('<h1>A</h1><a data-x="1" href="/x" class="q">X</a><p>Hello world</p>', "<title>T</title>"));
    expect(diffSeoViews(base, after)).toEqual([]);
  });

  it("treats two servers' own origin and build hashes as the same page", () => {
    const head = (origin: string, hash: string) =>
      `<title>T</title><meta property="og:image" content="${origin}/opengraph-image?${hash}"/><meta name="next-size-adjust" content=""/>` +
      `<link rel="canonical" href="https://www.pyqvault.com/x"/>`;
    const a = seoView(page('<h1>A</h1><a href="/x">X</a><p>Hello world</p>', head("https://www.pyqvault.com", "bd5f368b0dc9315c")), "https://www.pyqvault.com");
    const b = seoView(page('<h1>A</h1><a href="/x">X</a><p>Hello world</p>', head("http://localhost:3001", "fc0f63f68bd5d37a")), "http://localhost:3001");
    expect(diffSeoViews(a, b)).toEqual([]);
    expect(a.meta["og:image"]).toBe("{origin}/opengraph-image");
  });

  it("still catches a canonical that names the wrong site", () => {
    const a = seoView(page("<h1>A</h1>", '<link rel="canonical" href="https://www.pyqvault.com/x"/>'), "https://www.pyqvault.com");
    const b = seoView(page("<h1>A</h1>", '<link rel="canonical" href="https://www.pyqvault.com/y"/>'), "http://localhost:3001");
    expect(diffSeoViews(a, b).join("\n")).toMatch(/canonical/);
  });

  it("catches a nofollow added to a link", () => {
    const after = seoView(page('<h1>A</h1><a href="/x" rel="nofollow">X</a><p>Hello world</p>', "<title>T</title>"));
    expect(diffSeoViews(base, after).join("\n")).toMatch(/links/);
  });
});

const m = (path: string, sentKB: number, requests: number, blockingMs = 1000): Measurement => ({
  path,
  open: { requests, sentKB, unpackedKB: sentKB * 4, byKind: {} },
  scrolled: { requests, sentKB, unpackedKB: sentKB * 4, byKind: {} },
  prefetchOpen: [],
  prefetchScrolled: [],
  perf: { blockingMs, longTasks: 3, longestTaskMs: 200, lcpMs: 2000, cls: 0, elements: 500 },
});

describe("compareToBaseline", () => {
  it("passes a page within 10% of its baseline", () => {
    expect(compareToBaseline([m("/a", 1090, 84)], [m("/a", 1000, 80)])).toEqual([]);
  });

  it("names a page whose sent bytes or requests rose more than 10%", () => {
    const r = compareToBaseline([m("/a", 1200, 80), m("/b", 100, 100)], [m("/a", 1000, 80), m("/b", 100, 80)]);
    expect(r).toHaveLength(2);
    expect(r[0]).toMatch(/\/a/);
    expect(r[0]).toMatch(/sent/);
    expect(r[1]).toMatch(/\/b/);
    expect(r[1]).toMatch(/requests/);
  });

  it("does not hold blocking time to the ratchet, it is too noisy", () => {
    expect(compareToBaseline([m("/a", 1000, 80, 5000)], [m("/a", 1000, 80, 1000)])).toEqual([]);
  });

  it("ignores a page that has no baseline yet", () => {
    expect(compareToBaseline([m("/new", 5000, 500)], [m("/a", 1000, 80)])).toEqual([]);
  });
});

describe("parsePageWeightArgs", () => {
  it("defaults to the live site, the standard page set, a 4x slower processor and one run", () => {
    const a = parsePageWeightArgs([]);
    expect(a.base).toBe("https://www.pyqvault.com");
    expect(a.pages.length).toBeGreaterThanOrEqual(10);
    expect(a.pages).toContain("/notes/mh-hsc-12-maths/vectors/hscm-ve-triple");
    expect(a.cpu).toBe(4);
    expect(a.runs).toBe(1);
    expect(a.mode).toBe("weigh");
  });

  it("reads pages, base, cpu, runs and the modes", () => {
    const a = parsePageWeightArgs(["--pages=/,/pricing", "--base=http://localhost:3000/", "--cpu=6", "--runs=3", "--check"]);
    expect(a.pages).toEqual(["/", "/pricing"]);
    expect(a.base).toBe("http://localhost:3000");
    expect(a.cpu).toBe(6);
    expect(a.runs).toBe(3);
    expect(a.mode).toBe("check");
    expect(parsePageWeightArgs(["--save-baseline"]).mode).toBe("save-baseline");
  });

  it("needs both sides for an HTML comparison", () => {
    expect(() => parsePageWeightArgs(["--html-diff"])).toThrow(/--before/);
    const a = parsePageWeightArgs(["--html-diff", "--before=https://www.pyqvault.com", "--after=http://localhost:3000"]);
    expect(a.mode).toBe("html-diff");
    expect(a.before).toBe("https://www.pyqvault.com");
    expect(a.after).toBe("http://localhost:3000");
  });

  it("saves each page's server HTML to a folder, so two builds can be compared one server at a time", () => {
    const a = parsePageWeightArgs(["--save-html=out/main", "--base=http://localhost:3001"]);
    expect(a.mode).toBe("save-html");
    expect(a.saveHtml).toBe("out/main");
  });

  it("compares two saved folders as well as two servers", () => {
    const a = parsePageWeightArgs(["--html-diff", "--before=out/main", "--after=out/branch"]);
    expect(a.before).toBe("out/main");
    expect(isSavedFolder(a.before!)).toBe(true);
    expect(isSavedFolder("http://localhost:3001")).toBe(false);
  });

  it("refuses an unknown flag rather than ignoring it", () => {
    expect(() => parsePageWeightArgs(["--cpus=4"])).toThrow(/--cpus/);
  });
});
