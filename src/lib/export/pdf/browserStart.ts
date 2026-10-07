/**
 * Pure helpers for starting the PDF printer's browser (see ./printPdf.ts).
 *
 * WHY (2026-10-07): from 2026-10-06 every PDF download failed in production
 * with "browser did not start". The printer waited only for the
 * `DevToolsActivePort` file, which Edge writes on Windows; the headless shell
 * that runs on Vercel announces its port on its error output instead, the
 * "DevTools listening on" line Puppeteer reads. The browser's output was thrown
 * away, so the log could not tell that apart from a crash. The printer now
 * reads the output, and a failure carries the browser's last lines.
 */

const LISTENING = /DevTools listening on ws:\/\/[^\s/]+:(\d+)\//;

/** The DevTools port from the browser's output, or null until the line arrives. */
export function devToolsPortFromOutput(output: string): string | null {
  return LISTENING.exec(output)?.[1] ?? null;
}

/** Keeps the newest `max` characters of the browser's output. */
export function appendTail(prev: string, chunk: string, max: number): string {
  const all = prev + chunk;
  return all.length > max ? all.slice(all.length - max) : all;
}

/**
 * The error for a browser that never became reachable. A crash by signal has
 * no exit code, so it is named separately; otherwise it would read as a slow
 * start.
 */
export function browserStartFailure(state: {
  exitCode: number | null;
  signal: string | null;
  output: string;
}): Error {
  const what =
    state.exitCode !== null
      ? `browser exited (code ${state.exitCode})`
      : state.signal
        ? `browser crashed (${state.signal})`
        : "browser did not start";
  const lines = state.output
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(-6);
  return new Error(lines.length > 0 ? `${what}: ${lines.join(" | ")}` : what);
}

/**
 * The flags the printer starts its browser with: the platform's own first
 * (the headless shell's, or Edge's), then ours, then a blank page.
 *
 * `--disable-dev-shm-usage` (2026-10-07): Vercel's functions have no /dev/shm,
 * and Chrome keeps shared memory there by default, so every print died with
 * "Creating shared memory in /dev/shm ... failed" (SIGTRAP). The flag moves it
 * to the temp folder. Puppeteer adds it by default; a raw spawn must say it.
 */
export function printBrowserArgs(platformArgs: string[], profile: string): string[] {
  return [
    ...platformArgs,
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--no-first-run",
    "--hide-scrollbars",
    "--remote-debugging-port=0",
    "--allow-file-access-from-files",
    `--user-data-dir=${profile}`,
    "about:blank",
  ];
}
