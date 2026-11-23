/**
 * V on www when a visitor asks for an exam abroad (2026-11-23). On 22 Nov two
 * signed-out visitors asked www's V for Türkiye's YÖS and the Global Korea
 * Scholarship. V knew only Indian exams: it offered NDA, MHT-CET, JEE and NEET,
 * sent them to /browse to look for an exam it had just said we lack, said
 * "Sorry, I didn't catch that" to a Korean hello, and asked "which exam or
 * chapter?" three times. Our international exams live on intl.pyqvault.com,
 * and www's V was never told that site exists.
 *
 * V eval cases: ed4e5834 (Hello), 14a4e393 (Aneyo), 520f176b (Korean GKS),
 * f0a108b0 + 941aa38b (YÖS).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathsInReply } from "@/lib/chat/replyLinks";
import { buildAbroadFacts, buildSystemPrompt, INTL_NAV_FACTS, NAV_FACTS } from "@/lib/chat/facts";
import { intlExamOfPath, LIVE_INTL_EXAMS } from "@/lib/sites/intl";

const abroad = buildAbroadFacts(LIVE_INTL_EXAMS);

const wwwPrompt = buildSystemPrompt({
  exams: ["NDA: senior stage."],
  plans: [],
  bankTotal: 1,
  nav: NAV_FACTS,
  abroad,
  explainEnabled: true,
});

const intlPrompt = buildSystemPrompt({
  site: "intl",
  exams: ["IMAT: senior stage."],
  plans: [],
  bankTotal: 1,
  nav: INTL_NAV_FACTS,
  explainEnabled: true,
});

describe("the international exams, as www's V is told them", () => {
  it("gives one line per live intl exam, each naming the exam and its page", () => {
    expect(abroad).toHaveLength(LIVE_INTL_EXAMS.length);
    for (const e of LIVE_INTL_EXAMS) {
      expect(abroad.some((l) => l.startsWith(`${e.displayName} (`) && l.includes(`/exams/${e.slug}`))).toBe(true);
    }
  });

  it("links only pages that www sends on to intl, so a tap lands on the exam", () => {
    const paths = abroad.flatMap((l) => pathsInReply(l));
    expect(paths.length).toBeGreaterThan(0);
    for (const p of paths) expect(intlExamOfPath(p), p).not.toBeNull();
  });

  it("refuses an intl exam with no description, so a new one cannot reach V unexplained", () => {
    expect(() => buildAbroadFacts([{ slug: "new-exam", displayName: "New" } as never])).toThrow(/new-exam/);
  });

  it("are links V may use: context.ts adds them to the allowed paths", () => {
    const src = readFileSync(join(process.cwd(), "src/lib/chat/context.ts"), "utf8");
    expect(src).toMatch(/pathsInReply\(\[[^\]]*\.\.\.abroad[^\]]*\]/);
  });
});

describe("what www's V is told", () => {
  it("names the international site and lists its exams", () => {
    expect(wwwPrompt).toMatch(/intl\.pyqvault\.com/);
    for (const l of abroad) expect(wwwPrompt).toContain(l);
  });

  it("says plainly an exam is not here, adds the international site unless it is Indian, and nothing else", () => {
    expect(wwwPrompt).toMatch(/not on PYQ Vault yet/);
    expect(wwwPrompt).toMatch(/unless it is an Indian exam, say that our international entrance exams are on our international site/);
    expect(wwwPrompt).toMatch(/never send them to \/browse to look for it/i);
    expect(wwwPrompt).toMatch(/add no other exam and no question back/i);
  });

  it("treats an unknown name they ask whether we have as an exam, never asking what it means", () => {
    expect(wwwPrompt).toMatch(/do you have X\\?"; never ask what it means/);
  });

  it("treats a greeting in any language as a greeting and answers other languages in English", () => {
    expect(wwwPrompt).toMatch(/greeting in any language/i);
    expect(wwwPrompt).toMatch(/any other language.*simple English/i);
  });

  it("never asks which exam twice in a row", () => {
    expect(wwwPrompt).toMatch(/already asked which exam/i);
  });
});

describe("what intl's V is told", () => {
  it("gets no list of international exams pointing at itself", () => {
    expect(intlPrompt).not.toMatch(/INTERNATIONAL EXAMS/);
  });

  it("still says plainly when an exam is not here and never sends them to /browse for it", () => {
    expect(intlPrompt).toMatch(/never send them to \/browse to look for it/i);
  });

  it("also never asks which exam twice in a row", () => {
    expect(intlPrompt).toMatch(/already asked which exam/i);
  });
});
