/**
 * V's window loads when it is needed (PAGE_WEIGHT_SPEC.md item 2, 2026-11-24).
 *
 * Every page sent V's whole window (29.6 KB compressed, 105.7 KB of code) to
 * every visitor, though few open V. The layout now mounts a small launcher
 * (ChatLauncher) that draws the same button and loads the window
 * (ChatWidget) on the first touch, on an Ask V event, or at once when
 * something already waits for the visitor (a signed-in session, an unread
 * reply, a practice test half built before sign-in).
 *
 * Source scans for the import graph (no jsdom here); the pure parts are
 * tested as functions; the button's markup is rendered on the server.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadWindowAtOnce, startFromEvent } from "../src/lib/chat/windowStart";
import { ASK_V_EVENT, ASK_V_TEXT_EVENT } from "../src/lib/chat/askVEvent";
import { PENDING_BUILD_KEY } from "../src/lib/chat/pendingBuild";
import VLauncher from "../src/components/chat/VLauncher";

const SRC = join(process.cwd(), "src");
const read = (p: string) => readFileSync(join(SRC, p), "utf8");

function resolveSpec(from: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith("./") || spec.startsWith("../")) base = join(from, "..", spec);
  else return null;
  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) if (existsSync(base + ext)) return base + ext;
  return null;
}

/** Static runtime imports (`import type` left out; a dynamic `import()` is not one). */
function staticImports(src: string): string[] {
  const out: string[] = [];
  for (const m of src.matchAll(/(?:^|\n)\s*(import|export)\s+(type\s+)?[^;]*?from\s+["']([^"']+)["']/g)) if (!m[2]) out.push(m[3]);
  for (const m of src.matchAll(/(?:^|\n)\s*import\s+["']([^"']+)["']/g)) out.push(m[1]);
  return out;
}

/** Every file under src/ the entry reaches through static imports, relative to src/. */
function reachedFrom(entry: string): Set<string> {
  const seen = new Set<string>();
  const stack = [join(SRC, entry)];
  while (stack.length) {
    const file = stack.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    for (const spec of staticImports(readFileSync(file, "utf8"))) {
      const next = resolveSpec(file, spec);
      if (next) stack.push(next);
    }
  }
  return new Set([...seen].map((f) => f.slice(SRC.length + 1).replace(/\\/g, "/")));
}

describe("loadWindowAtOnce: when the window cannot wait for a tap", () => {
  const none = { authCookie: false, storedUnread: 0, pendingBuild: false };

  it("waits for a signed-out visitor with nothing waiting", () => {
    expect(loadWindowAtOnce(none)).toBe(false);
  });

  it("loads at once for a signed-in visitor (the day card, gift and late answers need the window's logic)", () => {
    expect(loadWindowAtOnce({ ...none, authCookie: true })).toBe(true);
  });

  it("loads at once when a reply is unread (its count shows on the button)", () => {
    expect(loadWindowAtOnce({ ...none, storedUnread: 2 })).toBe(true);
  });

  it("loads at once when a practice test waits from before sign-in", () => {
    expect(loadWindowAtOnce({ ...none, pendingBuild: true })).toBe(true);
  });
});

describe("startFromEvent: an Ask V tap before the window has loaded", () => {
  const detail = { questionId: "11111111-1111-4111-8111-111111111111", chose: "B" };

  it("keeps an Ask V about a question", () => {
    expect(startFromEvent(ASK_V_EVENT, detail, 3)).toEqual({ kind: "ask", detail, seq: 3 });
  });

  it("keeps an Ask V with only a message (the stuck offer, Teach me)", () => {
    expect(startFromEvent(ASK_V_TEXT_EVENT, { message: "Teach me Vectors" }, 4)).toEqual({
      kind: "askText",
      message: "Teach me Vectors",
      seq: 4,
    });
  });

  it("drops a detail the window would drop", () => {
    expect(startFromEvent(ASK_V_TEXT_EVENT, { nope: 1 }, 5)).toBeNull();
    expect(startFromEvent(ASK_V_EVENT, "junk", 6)).toBeNull();
    expect(startFromEvent("some-other-event", { message: "x" }, 7)).toBeNull();
  });
});

describe("the launcher does not bring the window with it", () => {
  const reached = reachedFrom("components/chat/ChatLauncher.tsx");

  it("reaches none of the window's files", () => {
    for (const heavy of [
      "components/chat/ChatWidget.tsx",
      "components/chat/PracticeBuilder.tsx",
      "components/chat/VQuestionCard.tsx",
      "components/chat/MathText.tsx",
      "components/chat/VGiftCard.tsx",
      "components/chat/VCheckIn.tsx",
      "components/chat/VDayCard.tsx",
      "components/chat/VPlanCard.tsx",
      "components/chat/VReplyText.tsx",
    ]) {
      expect(reached.has(heavy), heavy).toBe(false);
    }
  });

  it("loads the window with a dynamic import", () => {
    expect(read("components/chat/ChatLauncher.tsx")).toMatch(/import\("\.\/ChatWidget"\)/);
  });

  it("is what the layout mounts", () => {
    const layout = read("app/layout.tsx");
    expect(layout).toMatch(/import ChatLauncher from "@\/components\/chat\/ChatLauncher"/);
    expect(layout).not.toMatch(/components\/chat\/ChatWidget/);
  });

  it("starts loading the window on the first touch, hover or focus of the button", () => {
    const launcher = read("components/chat/VLauncher.tsx");
    expect(launcher).toMatch(/onPointerEnter=\{onWarm\}/);
    expect(launcher).toMatch(/onTouchStart=\{onWarm\}/);
    expect(launcher).toMatch(/onFocus=\{onWarm\}/);
  });

  it("asks for V's switchable features with the page, as the window did, so a first tap shows every button", () => {
    // The before/after sheet caught it (2026-11-24): asked only on a touch, a phone's first open of V
    // came up without "Teach me a chapter", which waits for /api/chat/features.
    const shell = read("components/chat/ChatLauncher.tsx");
    const mount = shell.match(/useEffect\(\(\) => \{([^]*?)\n {2}\}, \[\]\);/)?.[1] ?? "";
    expect(mount).toMatch(/warmVFeatures\(\)/);
  });

  it("stops catching Ask V events once the window listens itself (no double send)", () => {
    const shell = read("components/chat/ChatLauncher.tsx");
    expect(shell).toMatch(/readyRef\.current\) return/);
  });
});

describe("the window acts on what the launcher caught", () => {
  const widget = read("components/chat/ChatWidget.tsx");

  it("takes the start and says when it listens", () => {
    expect(widget).toMatch(/export default function ChatWidget\(\{ start, onReady \}: ChatWidgetProps\)/);
  });

  it("acts only after the saved chat is read (a send needs the conversation id)", () => {
    expect(widget).toMatch(/if \(!start \|\| !conversationId \|\| handledStartRef\.current === start\.seq\) return/);
  });

  it("handles each kind of start", () => {
    expect(widget).toMatch(/case "open":\s*openChat\(\)/);
    expect(widget).toMatch(/case "ask":\s*onAskRef\.current\(start\.detail\)/);
    expect(widget).toMatch(/case "askText":\s*onAskTextRef\.current\(start\.message\)/);
  });

  it("draws the same button as the launcher", () => {
    expect(widget).toMatch(/<VLauncher\b/);
    expect(read("components/chat/ChatLauncher.tsx")).toMatch(/<VLauncher\b/);
  });

  it("reads the half-built test's key from one place", () => {
    expect(PENDING_BUILD_KEY).toBe("v-practice-builder");
    expect(read("components/chat/PracticeBuilder.tsx")).not.toMatch(/PENDING_BUILD_KEY = "/);
  });
});

describe("the button the server draws", () => {
  const html = renderToStaticMarkup(
    createElement(VLauncher, {
      open: false,
      label: "Chat with V",
      tucked: false,
      badge: null,
      aboveCart: false,
      onClick: () => {},
      onWarm: () => {},
    })
  );

  it("is today's closed button: round, V's face, no badge", () => {
    expect(html).toContain('class="chat-launcher-offset fixed right-4 z-50 print:hidden"');
    expect(html).toContain('aria-label="Chat with V"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toMatch(/class="relative ml-auto flex h-11 w-11 /);
    expect(html).not.toContain("translate-y-[160%]");
  });
});
