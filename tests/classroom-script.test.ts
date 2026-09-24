/**
 * The classroom script (lib/education/classroomScript.ts) is the source; the
 * spec's appendix A is a MIRROR a human reads. This pins the two together so
 * the words a teacher copies from the roster card are the words the spec
 * promised — the same "one text, many surfaces" rule the loop follows.
 *
 * Whitespace is collapsed on both sides because the spec wraps prose at ~78
 * columns and the constants do not.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  MOCK_SCRIPT,
  BOARD_SCRIPT,
  INVITE_LINES,
  classroomScriptText,
} from "@/lib/education/classroomScript";

const SPEC = join(process.cwd(), "STUDENT_EDUCATION_SPEC.md");
const squash = (s: string) => s.replace(/\s+/g, " ").trim();

describe("classroom script", () => {
  it("has five mock lines, one board line and three invite lines, none empty", () => {
    expect(MOCK_SCRIPT).toHaveLength(5);
    expect(BOARD_SCRIPT).toHaveLength(1);
    expect(INVITE_LINES).toHaveLength(3);
    for (const s of [...MOCK_SCRIPT, ...BOARD_SCRIPT, ...INVITE_LINES]) {
      expect(s.trim().length).toBeGreaterThan(20);
    }
  });

  it("every mock and board line appears verbatim in the spec's appendix A", () => {
    const spec = squash(readFileSync(SPEC, "utf8"));
    const appendix = spec.slice(spec.indexOf("## Appendix A"));
    expect(appendix.length).toBeGreaterThan(100);
    for (const line of [...MOCK_SCRIPT, ...BOARD_SCRIPT]) {
      expect(appendix).toContain(squash(line));
    }
  });

  it("the clipboard text is numbered, carries the board variant, and ends with /start", () => {
    const text = classroomScriptText();
    MOCK_SCRIPT.forEach((s, i) => expect(text).toContain(`${i + 1}. ${s}`));
    expect(text).toContain(BOARD_SCRIPT[0]);
    expect(text.trim().endsWith("https://www.pyqvault.com/start")).toBe(true);
  });

  it("the invite lines name the loop's two actions without naming anyone", () => {
    const joined = INVITE_LINES.join(" ");
    expect(joined).toContain("Fix these mistakes");
    expect(joined).toContain("assigns");
    expect(joined).not.toMatch(/@/);
  });
});
