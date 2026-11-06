/**
 * Vercel Web Analytics must not count bots (2026-11-07).
 *
 * Crawlers that run the page's JavaScript fire Vercel's analytics script like a
 * visitor. Vercel's visitor count ran 1.7-2x Clarity's (which filters bots) on
 * 2026-10-18/19, and every event is billed. The filter drops an event before it
 * is sent when the browser says it is automated or names itself a crawler.
 *
 * This changes COUNTING only: no crawler is refused a page (AI search bots must
 * keep reaching every page, the owner's GEO rule).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isLikelyBot, dropBotEvent } from "@/lib/analytics/botFilter";

const PEOPLE = [
  // Android Chrome, the bulk of real traffic
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36",
  // iPhone Safari
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1",
  // Windows Edge
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0",
  // A Cubot phone: "bot" inside a real device name must not count as a crawler
  "Mozilla/5.0 (Linux; Android 11; Cubot P40 Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  // Instagram / WhatsApp in-app browsers
  "Mozilla/5.0 (Linux; Android 14; SM-A146B Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/141.0.0.0 Mobile Safari/537.36 Instagram 400.0.0.0",
];

const CRAWLERS = [
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  "Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; spider-feedback@bytedance.com)",
  "Mozilla/5.0 (compatible; crawler)",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.0.0 Safari/537.36",
  "Lightpanda/1.0",
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)",
  "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse",
];

describe("isLikelyBot", () => {
  it.each(PEOPLE)("counts a person: %s", (ua) => {
    expect(isLikelyBot(ua, false)).toBe(false);
  });

  it.each(CRAWLERS)("drops a crawler: %s", (ua) => {
    expect(isLikelyBot(ua, false)).toBe(true);
  });

  it("drops a browser that says it is automated, whatever it calls itself", () => {
    expect(isLikelyBot(PEOPLE[0], true)).toBe(true);
  });

  it("counts a browser that reports no user agent and no automation", () => {
    expect(isLikelyBot("", undefined)).toBe(false);
    expect(isLikelyBot(undefined, undefined)).toBe(false);
  });
});

describe("dropBotEvent", () => {
  const event = { type: "pageview" as const, url: "https://www.pyqvault.com/browse" };

  it("passes a person's event through unchanged", () => {
    expect(dropBotEvent(event, { userAgent: PEOPLE[0], webdriver: false })).toBe(event);
  });

  it("drops a bot's event (null tells Vercel not to send it)", () => {
    expect(dropBotEvent(event, { userAgent: CRAWLERS[0], webdriver: false })).toBeNull();
  });
});

describe("the site's analytics tag uses the filter", () => {
  const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

  it("layout mounts the filtered tag, not Vercel's bare one", () => {
    const layout = read("src", "app", "layout.tsx");
    expect(layout).not.toContain('from "@vercel/analytics/next"');
    expect(layout).toContain("<VercelAnalytics />");
  });

  it("the tag is a client island that passes beforeSend", () => {
    const island = read("src", "components", "analytics", "VercelAnalytics.tsx");
    expect(island.startsWith('"use client"')).toBe(true);
    expect(island).toMatch(/beforeSend=\{/);
    expect(island).toContain("dropBotEvent");
  });
});
