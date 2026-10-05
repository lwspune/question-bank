/**
 * Print an HTML page to PDF with a headless Chromium.
 *
 * Talks to the browser over the DevTools protocol with Node's built-in
 * WebSocket (the way scripts/ui/shots.ts drives Edge), so the only package
 * this needs is the browser itself: `@sparticuz/chromium` on Vercel (Linux),
 * the installed Edge on a Windows machine, or `PDF_BROWSER` if set.
 *
 * The page is written to a temp file and opened as `file://`, because its
 * fonts and KaTeX stylesheet are linked from disk (./assets.ts). Printing
 * waits for `document.fonts.ready`: a page printed before its faces load comes
 * out in a fallback font, with no error.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const WINDOWS_BROWSERS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

const TIMEOUT_MS = 45_000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function browser(): Promise<{ path: string; args: string[] }> {
  if (process.env.PDF_BROWSER) return { path: process.env.PDF_BROWSER, args: ["--headless=new"] };
  if (process.platform === "linux") {
    const chromium = (await import("@sparticuz/chromium")).default;
    return { path: await chromium.executablePath(), args: chromium.args };
  }
  const found = WINDOWS_BROWSERS.find((p) => existsSync(p));
  if (!found) throw new Error("No Chromium browser found for PDF printing; set PDF_BROWSER");
  return { path: found, args: ["--headless=new"] };
}

type Cdp = {
  send: (method: string, params?: object) => Promise<Record<string, unknown>>;
  close: () => void;
};

async function connect(profile: string, proc: ChildProcess): Promise<Cdp> {
  const portFile = join(profile, "DevToolsActivePort");
  for (let i = 0; i < 120 && !existsSync(portFile); i++) {
    if (proc.exitCode !== null) throw new Error(`browser exited (${proc.exitCode})`);
    await sleep(100);
  }
  if (!existsSync(portFile)) throw new Error("browser did not start");
  const port = readFileSync(portFile, "utf8").split("\n")[0].trim();
  let pageWs = "";
  for (let i = 0; i < 50 && !pageWs; i++) {
    try {
      const list = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()) as {
        type: string;
        webSocketDebuggerUrl: string;
      }[];
      pageWs = list.find((t) => t.type === "page")?.webSocketDebuggerUrl ?? "";
    } catch {
      /* not listening yet */
    }
    if (!pageWs) await sleep(100);
  }
  if (!pageWs) throw new Error("no page target");
  const ws = new WebSocket(pageWs);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });
  let id = 0;
  const pending = new Map<number, (m: Record<string, unknown>) => void>();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(String(e.data));
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)!(m);
      pending.delete(m.id);
    }
  });
  const send = (method: string, params: object = {}) =>
    new Promise<Record<string, unknown>>((resolve) => {
      const n = ++id;
      pending.set(n, resolve);
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  return { send, close: () => ws.close() };
}

async function evaluate(cdp: Cdp, expression: string): Promise<unknown> {
  const res = (await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })) as {
    result?: { result?: { value?: unknown } };
  };
  return res.result?.result?.value;
}

/**
 * One print at a time per server instance. A Vercel instance can serve several
 * requests at once, and each print starts a whole Chromium (hundreds of MB):
 * two side by side could exhaust the instance's memory and fail both. Queued,
 * the second student waits a couple of seconds instead.
 */
let queue: Promise<unknown> = Promise.resolve();

export function printPdf(html: string): Promise<Buffer> {
  const job = queue.then(() => printOnce(html));
  queue = job.catch(() => undefined);
  return job;
}

async function printOnce(html: string): Promise<Buffer> {
  const dir = mkdtempSync(join(tmpdir(), "pv-pdf-"));
  const profile = join(dir, "profile");
  const file = join(dir, "page.html");
  writeFileSync(file, html, "utf8");
  const { path, args } = await browser();
  const proc = spawn(
    path,
    [...args, "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--remote-debugging-port=0",
      "--allow-file-access-from-files", `--user-data-dir=${profile}`, "about:blank"],
    { stdio: "ignore" }
  );
  let cdp: Cdp | null = null;
  let timer: NodeJS.Timeout | undefined;
  try {
    const work = (async () => {
      cdp = await connect(profile, proc);
      await cdp.send("Page.navigate", { url: pathToFileURL(file).href });
      for (let i = 0; i < 300 && (await evaluate(cdp, "document.readyState")) !== "complete"; i++) await sleep(50);
      await evaluate(cdp, "document.fonts.ready.then(() => true)");
      const res = (await cdp.send("Page.printToPDF", {
        printBackground: true,
        preferCSSPageSize: true,
      })) as { result?: { data?: string }; error?: { message?: string } };
      if (!res.result?.data) throw new Error(`printToPDF failed: ${res.error?.message ?? "no data"}`);
      return Buffer.from(res.result.data, "base64");
    })();
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error("PDF printing timed out")), TIMEOUT_MS);
    });
    return await Promise.race([work, timeout]);
  } finally {
    clearTimeout(timer);
    (cdp as Cdp | null)?.close();
    proc.kill();
    // The browser may hold its profile open for a moment after the kill.
    for (let i = 0; i < 10; i++) {
      try {
        rmSync(dir, { recursive: true, force: true });
        break;
      } catch {
        await sleep(100);
      }
    }
  }
}
