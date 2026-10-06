/**
 * How the PDF printer learns that its browser is up, and what it says when the
 * browser is not.
 *
 * WHY (2026-10-07): every PDF download failed in production from 2026-10-06
 * with "browser did not start". The printer waited only for the
 * `DevToolsActivePort` file, which the installed Edge writes on Windows but the
 * headless shell Vercel runs announces on its error output instead
 * ("DevTools listening on ws://..."), the line Puppeteer reads. Its output was
 * thrown away, so the log could not say which, and a crash by signal (exit code
 * null) looked the same as a slow start.
 */
import { describe, it, expect } from "vitest";
import { devToolsPortFromOutput, browserStartFailure, appendTail } from "@/lib/export/pdf/browserStart";

describe("devToolsPortFromOutput", () => {
  it("reads the port from the headless shell's announcement", () => {
    const out =
      "[1007/012624.781:WARNING:sandbox_linux.cc(420)] something\n" +
      "\nDevTools listening on ws://127.0.0.1:41239/devtools/browser/0b3c4f2e-9a1d-4c55-8a7e-1f2d3c4b5a69\n";
    expect(devToolsPortFromOutput(out)).toBe("41239");
  });

  it("returns null until the line has arrived", () => {
    expect(devToolsPortFromOutput("")).toBeNull();
    expect(devToolsPortFromOutput("[WARNING] fontconfig: no fonts\n")).toBeNull();
  });

  it("does not take a port from a half-written line", () => {
    // A chunk can end mid-line; the port is only trusted once the path follows it.
    expect(devToolsPortFromOutput("DevTools listening on ws://127.0.0.1:412")).toBeNull();
  });
});

describe("browserStartFailure", () => {
  it("names an exit code", () => {
    expect(browserStartFailure({ exitCode: 1, signal: null, output: "" }).message).toBe(
      "browser exited (code 1)"
    );
  });

  it("names a crash by signal, which has no exit code", () => {
    expect(browserStartFailure({ exitCode: null, signal: "SIGTRAP", output: "" }).message).toBe(
      "browser crashed (SIGTRAP)"
    );
  });

  it("says it did not start when it is still running", () => {
    expect(browserStartFailure({ exitCode: null, signal: null, output: "" }).message).toBe(
      "browser did not start"
    );
  });

  it("carries the browser's last output so the log says why", () => {
    const err = browserStartFailure({
      exitCode: null,
      signal: "SIGSEGV",
      output: "line one\nerror while loading shared libraries: libnss3.so\n",
    });
    expect(err.message).toBe(
      "browser crashed (SIGSEGV): line one | error while loading shared libraries: libnss3.so"
    );
  });
});

describe("appendTail", () => {
  it("keeps the newest characters up to the limit", () => {
    expect(appendTail("abc", "defgh", 5)).toBe("defgh");
    expect(appendTail("ab", "cd", 10)).toBe("abcd");
  });
});
