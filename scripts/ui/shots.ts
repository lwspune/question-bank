/**
 * Before/after screenshot sheet for a UI change (CLAUDE.md Conventions:
 * "UI changes ship with a before/after sheet").
 *
 *   npm run ui:shots -- --pages=/,/mock,/browse            # live site vs localhost:3000
 *   npm run ui:shots -- --pages=/pricing --dark --phone     # add dark mode, phone only
 *   npm run ui:shots -- --pages=/ --before=http://localhost:3001 --full --title="Hero"
 *
 *   A change that exists only on localhost has no live "before":
 *   npm run ui:shots -- --pages=/about --before=http://localhost:3000 --phase=before --out=generated-papers/ui-shots/about
 *   ...make the change...
 *   npm run ui:shots -- --pages=/about --phase=after --out=generated-papers/ui-shots/about
 *
 * Writes every capture plus sheet.html and sheet.png to
 * generated-papers/ui-shots/<timestamp>/ (or --out=). Start `npm run dev`
 * first when the after side is local.
 *
 * Drives the installed Edge over the DevTools protocol with Node's built-in
 * WebSocket, so there is no npm dependency (set EDGE to its path if it is not
 * the default). Two traps it exists to avoid: headless Edge will not size a
 * window below 500 px, so the phone is EMULATED (Emulation.setDeviceMetricsOverride),
 * never --window-size; and every run gets a fresh profile, because /browse's
 * anonymous reveal budget lives in browser storage and would carry over.
 *
 * What it cannot show: screens behind a click, and a REAL student's data.
 * `--as-student=<exam,...>` renders the signed-in view of a cached page (the
 * header and any island that reads /api/me/header) for a stand-in student;
 * pages that read the student's own rows still render anonymously. Say so
 * when handing the sheet over.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { parseShotArgs, planCaptures, sheetHtml, stubHeaderSession, VIEWPORTS, type Capture } from "./lib";

const EDGE = process.env.EDGE ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PHONE_UA =
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Cdp = {
  send: (method: string, params?: object) => Promise<Record<string, unknown>>;
  /** Browser-initiated events (no id), e.g. Fetch.requestPaused. */
  on: (method: string, fn: (params: Record<string, unknown>) => void) => void;
  close: () => void;
};

async function launch(profile: string): Promise<{ proc: ChildProcess; cdp: Cdp }> {
  if (!existsSync(EDGE)) throw new Error(`Edge not found at ${EDGE}; set EDGE to its path`);
  const proc = spawn(EDGE, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
    "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
  ], { stdio: "ignore" });
  // Port 0 = pick a free one; Edge writes it to DevToolsActivePort.
  const portFile = join(profile, "DevToolsActivePort");
  for (let i = 0; i < 80 && !existsSync(portFile); i++) await sleep(250);
  if (!existsSync(portFile)) throw new Error("Edge did not start (no DevToolsActivePort)");
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
  if (!pageWs) throw new Error("no page target in Edge");
  const ws = new WebSocket(pageWs);
  await new Promise((r, j) => { ws.addEventListener("open", r); ws.addEventListener("error", j); });
  let id = 0;
  const pending = new Map<number, (m: Record<string, unknown>) => void>();
  const listeners = new Map<string, ((p: Record<string, unknown>) => void)[]>();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(String(e.data));
    if (m.id && pending.has(m.id)) { pending.get(m.id)!(m); pending.delete(m.id); }
    else if (m.method) for (const fn of listeners.get(m.method) ?? []) fn(m.params ?? {});
  });
  const on = (method: string, fn: (p: Record<string, unknown>) => void) =>
    void listeners.set(method, [...(listeners.get(method) ?? []), fn]);
  const send = (method: string, params: object = {}) =>
    new Promise<Record<string, unknown>>((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  return { proc, cdp: { send, on, close: () => ws.close() } };
}

async function evaluate(cdp: Cdp, expression: string): Promise<unknown> {
  const res = (await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })) as {
    result?: { result?: { value?: unknown } };
  };
  return res.result?.result?.value;
}

async function capture(cdp: Cdp, c: Capture, waitMs: number, fullPage: boolean, dir: string) {
  const vp = VIEWPORTS[c.viewport];
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: vp.scale, mobile: vp.mobile });
  await cdp.send("Emulation.setUserAgentOverride", { userAgent: vp.mobile ? PHONE_UA : "" });
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: c.theme }] });
  await cdp.send("Page.navigate", { url: c.url });
  for (let i = 0; i < 240 && (await evaluate(cdp, "document.readyState")) !== "complete"; i++) await sleep(250);
  await sleep(waitMs);
  // The theme is a class on <html> (next-themes); set it outright so a stored
  // preference cannot override the run.
  await evaluate(cdp, `(() => { const h = document.documentElement; h.classList.toggle('dark', ${c.theme === "dark"}); h.style.colorScheme = '${c.theme}'; })()`);
  await sleep(400);
  let params: object = { format: "png" };
  if (fullPage) {
    const height = Math.min(6000, Number(await evaluate(cdp, "document.documentElement.scrollHeight")) || vp.height);
    params = { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: vp.width, height, scale: 1 } };
  }
  const shot = (await cdp.send("Page.captureScreenshot", params)) as { result?: { data?: string } };
  if (!shot.result?.data) throw new Error(`no screenshot for ${c.url}`);
  writeFileSync(join(dir, c.file), Buffer.from(shot.result.data, "base64"));
}

/**
 * `--as-student`: give each site a stand-in Supabase auth cookie (the client's
 * cheap "might be signed in" check) and answer /api/me/header in the browser
 * with a plain student who chose `exams`. Nothing reaches a server as that
 * student: the one identity request never leaves the browser, and the stand-in
 * cookie fails any server-side check, which then treats the page as anonymous.
 */
async function actAsStudent(cdp: Cdp, exams: string[], origins: string[]) {
  for (const url of origins) {
    await cdp.send("Network.setCookie", { name: "sb-stub-auth-token", value: "stub", url, path: "/" });
  }
  const body = Buffer.from(JSON.stringify(stubHeaderSession(exams))).toString("base64");
  cdp.on("Fetch.requestPaused", (p) => {
    void cdp.send("Fetch.fulfillRequest", {
      requestId: p.requestId,
      responseCode: 200,
      responseHeaders: [{ name: "content-type", value: "application/json" }],
      body,
    });
  });
  await cdp.send("Fetch.enable", { patterns: [{ urlPattern: "*/api/me/header*" }] });
}

async function main() {
  const args = parseShotArgs(process.argv.slice(2));
  const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
  const dir = resolve(args.out ?? join("generated-papers", "ui-shots", stamp));
  mkdirSync(dir, { recursive: true });
  const plan = planCaptures(args);
  const profile = mkdtempSync(join(tmpdir(), "ui-shots-"));
  const { proc, cdp } = await launch(profile);
  try {
    if (args.asStudent) await actAsStudent(cdp, args.asStudent, Object.values(args.targets));
    for (const c of plan) {
      if (args.phase !== "both" && c.target !== args.phase) continue;
      process.stdout.write(`${c.target.padEnd(6)} ${c.viewport.padEnd(7)} ${c.theme.padEnd(5)} ${c.url} ... `);
      await capture(cdp, c, args.waitMs, args.fullPage, dir);
      console.log("ok");
    }
    // The sheet needs both sides; a before-only run stops here.
    const missing = plan.filter((c) => !existsSync(join(dir, c.file)));
    if (missing.length) {
      console.log(`
${missing.length} capture(s) still to take (${missing[0].file} ...): run --phase=after with --out=${dir}`);
      return;
    }
    // The sheet: rendered by the same browser, photographed whole.
    const html = join(dir, "sheet.html");
    writeFileSync(html, sheetHtml(plan, { title: args.title }));
    const width = 48 + 2 * Math.max(...args.viewports.map((v) => VIEWPORTS[v].width)) + 24;
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: false });
    await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "light" }] });
    await cdp.send("Page.navigate", { url: "file:///" + html.replace(/\\/g, "/") });
    await sleep(1500);
    const height = Number(await evaluate(cdp, "document.documentElement.scrollHeight")) || 1000;
    const shot = (await cdp.send("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 },
    })) as { result?: { data?: string } };
    writeFileSync(join(dir, "sheet.png"), Buffer.from(shot.result!.data!, "base64"));
    console.log(`\nsheet: ${join(dir, "sheet.png")}`);
  } finally {
    cdp.close();
    proc.kill();
    await sleep(500);
    rmSync(profile, { recursive: true, force: true, maxRetries: 5 });
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
