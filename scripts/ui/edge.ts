/**
 * The installed Edge, driven over the DevTools protocol with Node's built-in
 * WebSocket (no npm dependency). Shared by `npm run ui:shots` and
 * `npm run audit:page-weight`. Set EDGE to its path if it is not the default.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const EDGE = process.env.EDGE ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
export const PHONE_UA =
  "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type Cdp = {
  send: (method: string, params?: object) => Promise<Record<string, unknown>>;
  /** Browser-initiated events (no id), e.g. Fetch.requestPaused. */
  on: (method: string, fn: (params: Record<string, unknown>) => void) => void;
  close: () => void;
};

export async function launch(profile: string): Promise<{ proc: ChildProcess; cdp: Cdp }> {
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

export async function evaluate(cdp: Cdp, expression: string): Promise<unknown> {
  const res = (await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })) as {
    result?: { result?: { value?: unknown } };
  };
  return res.result?.result?.value;
}
