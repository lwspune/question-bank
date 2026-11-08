/**
 * Which maths lines on a review sheet are still too wide for a phone, by question.
 * The sheet's own fit script (lib/visuals/fitMath, run after the fonts load) marks
 * each such line with data-viz-over; this opens the sheet in headless Edge over the
 * DevTools protocol, waits for that, and prints the question id and the line's
 * index in the frame, so a long batch need not be bisected by hand.
 *
 *   npx tsx scripts/visuals/tools/over-lines.ts generated-papers/visuals/<batch>.html [...]
 *
 * Read-only. Needs Edge (or Chrome via EDGE=...). Exits 1 when any line is over.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const EDGE = process.env.EDGE ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FIND = `(() => {
  const out = [];
  document.querySelectorAll("[data-viz-over]").forEach((el) => {
    const sec = el.closest("section");
    const id = sec?.querySelector("h2 small")?.textContent?.split(" ")[0] ?? "?";
    const frame = el.closest("figure") ?? el.parentElement;
    const lines = [...(frame?.querySelectorAll("[data-viz-math]") ?? [])];
    out.push(id + " line " + lines.indexOf(el) + ": " + (el.textContent ?? "").replace(/\\s+/g, " ").slice(0, 90));
  });
  return [...new Set(out)];
})()`;

async function check(file: string): Promise<string[]> {
  const profile = mkdtempSync(join(tmpdir(), "over-lines-"));
  const proc = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  try {
    const portFile = join(profile, "DevToolsActivePort");
    for (let i = 0; i < 80 && !existsSync(portFile); i++) await sleep(250);
    const port = readFileSync(portFile, "utf8").split("\n")[0].trim();
    let pageWs = "";
    for (let i = 0; i < 40 && !pageWs; i++) {
      try {
        const list = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()) as { type: string; webSocketDebuggerUrl: string }[];
        pageWs = list.find((t) => t.type === "page")?.webSocketDebuggerUrl ?? "";
      } catch {
        /* not up yet */
      }
      if (!pageWs) await sleep(250);
    }
    const ws = new WebSocket(pageWs);
    await new Promise((r, j) => {
      ws.addEventListener("open", r);
      ws.addEventListener("error", j);
    });
    let id = 0;
    const pending = new Map<number, (m: { result?: { result?: { value?: unknown } } }) => void>();
    ws.addEventListener("message", (e) => {
      const m = JSON.parse(String(e.data));
      if (m.id && pending.has(m.id)) {
        pending.get(m.id)!(m);
        pending.delete(m.id);
      }
    });
    const send = (method: string, params: object = {}) =>
      new Promise<{ result?: { result?: { value?: unknown } } }>((r) => {
        const n = ++id;
        pending.set(n, r);
        ws.send(JSON.stringify({ id: n, method, params }));
      });
    const evaluate = async (expression: string) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
    await send("Emulation.setDeviceMetricsOverride", { width: 1100, height: 1200, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url: pathToFileURL(resolve(file)).href });
    // The fit script appends its verdict to the h1 once the fonts are in.
    for (let i = 0; i < 120; i++) {
      const done = await evaluate(`!!document.querySelector("h1 .bad, h1 small")`);
      if (done) break;
      await sleep(250);
    }
    const found = (await evaluate(FIND)) as string[];
    ws.close();
    return found ?? [];
  } finally {
    proc.kill();
    await sleep(800);
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {
      /* Edge may still hold a lock; the folder is in TEMP */
    }
  }
}

async function main() {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error("usage: over-lines.ts <sheet.html> ...");
    process.exit(2);
  }
  let total = 0;
  for (const f of files) {
    const found = await check(f);
    total += found.length;
    console.log(`${f}: ${found.length} line(s) too wide`);
    for (const line of found) console.log("  " + line);
  }
  process.exit(total ? 1 : 0);
}
main();
