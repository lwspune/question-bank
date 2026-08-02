// Run the PAGE'S OWN script against the PAGE'S OWN payload under a DOM stub.
//
// Reimplementing the filter in Python is what let an empty table ship: the
// reimplementation was right, the shipped code was not. Only executing the real
// emitted JS catches escaping damage (a regex literal losing its backslashes on
// the way through the TS template literal).
const fs = require("fs");
const path = process.argv[2] || "generated-papers/syllabus-map.html";
const html = fs.readFileSync(path, "utf8");
const blocks = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
const json = blocks.find((b) => /json/.test(b[1]))[2].trim();
const js = blocks.find((b) => !/json/.test(b[1]))[2];

const els = {};
const stub = (id) =>
  (els[id] ||= {
    id,
    value: "",
    checked: false,
    textContent: "",
    innerHTML: "",
    style: {},
    dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    addEventListener() {},
    setAttribute() {},
    getAttribute: () => null,
    appendChild() {},
    onclick: null,
    children: [],
    childNodes: [],
    parentNode: null,
    remove() {},
  });

global.document = {
  getElementById: stub,
  querySelector: () => stub("_q"),
  querySelectorAll: () => [],
  addEventListener() {},
  createElement: () => stub("_c"),
  body: stub("_body"),
  documentElement: stub("_html"),
};
global.window = global;
global.matchMedia = () => ({ matches: false, addEventListener() {} });
global.localStorage = { getItem: () => null, setItem() {} };
global.__PAYLOAD__ = json;

// Feed the payload in directly; the page reads it from a <script type=json> tag
// that the stub cannot serve.
const src = js.replace(
  /JSON\.parse\(\s*document\.getElementById\([^)]*\)\.(?:textContent|innerHTML)\s*\)/,
  "JSON.parse(__PAYLOAD__)",
);

// Report the throw but KEEP GOING. The page ends with a call to an undefined
// `redraw()` (present in HEAD, not introduced here), which throws on the last
// line — after both tables are already populated. Bailing out here would hide
// the row counts, which are the thing being checked.
let threw = null;
try {
  new Function(src)();
} catch (e) {
  threw = e.message;
}
if (threw) console.log("script threw (late):", threw);

const rowsIn = (id) => ((els[id] || {}).innerHTML || "").match(/<tr/g)?.length ?? 0;
const ncert = rowsIn("ncert");
const matrix = rowsIn("matrix");
const jee = rowsIn("jee");
console.log("ncert table rows :", ncert);
console.log("matrix table rows:", matrix);
console.log("jee table rows   :", jee);
console.log("ncount           :", (els["ncount"] || {}).textContent);
console.log("jcount           :", (els["jcount"] || {}).textContent);
console.log("count            :", (els["count"] || {}).textContent);

const jbody = ((els["jee"] || {}).innerHTML || "");
const jrows = jbody.match(/<tr>[\s\S]*?<\/tr>/g) || [];
console.log("\nfirst 3 JEE data rows:");
for (const r of jrows.slice(0, 3)) {
  console.log("  " + r.replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").trim().slice(0, 160));
}

const body = ((els["ncert"] || {}).innerHTML || "");
console.log("verified badges  :", (body.match(/verified/g) || []).length);
const dataRows = body.match(/<tr>[\s\S]*?<\/tr>/g) || [];
console.log("\nfirst 4 NCERT data rows:");
for (const r of dataRows.slice(0, 4)) {
  console.log("  " + r.replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ").trim().slice(0, 165));
}

let bad = 0;
if (!ncert) { console.log("\nFAIL: NCERT table is EMPTY"); bad = 1; }
if (!matrix) { console.log("FAIL: matrix table is EMPTY"); bad = 1; }
if (!jee) { console.log("FAIL: JEE table is EMPTY"); bad = 1; }
process.exit(bad);
