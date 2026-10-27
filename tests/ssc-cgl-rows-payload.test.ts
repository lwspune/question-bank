import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { commitPayload, parseCommitRows, type CommitRow } from "../scripts/ssc-cgl/rows";

// A shipped figure row whose picture is replaced (trim-stems.ts, refigure.ts) must take the
// content_hash a fresh commit of the new picture would get. commitPayload is that path with the
// picture BYTES given, so a tool never has to write a file to learn the hash.

const dir = mkdtempSync(join(tmpdir(), "ssc-rows-"));
const file = (name: string, bytes: string) => {
  const p = join(dir, name);
  writeFileSync(p, bytes);
  return p;
};

const row = (figures: CommitRow["figures"]): CommitRow =>
  ({
    sourceRow: 1,
    questionNumber: "7",
    subject: "Reasoning",
    chapter: "Venn Diagrams",
    subtopic: "Venn",
    question: "Select the Venn diagram that best illustrates the classes.",
    optionA: "[figure]",
    optionB: "[figure]",
    optionC: "[figure]",
    optionD: "[figure]",
    answer: "A",
    difficulty: "EASY",
    solution: "Both are sports.",
    flawed: false,
    figures,
  }) as unknown as CommitRow;

describe("commitPayload", () => {
  const opts = ["a", "b", "c", "d"].map((x) => file(`q007-${x}.png`, `option ${x}`));
  const r = row({ stem: null, options: opts });

  it("gives what parseCommitRows gives for the files' bytes", () => {
    const viaFiles = parseCommitRows([r]).parsed[0];
    const viaBytes = commitPayload(r, ["option a", "option b", "option c", "option d"].map((s) => Buffer.from(s)));
    expect(viaBytes).toEqual(viaFiles);
  });

  it("moves the hash when one picture changes, and only then", () => {
    const same = commitPayload(r, ["option a", "option b", "option c", "option d"].map((s) => Buffer.from(s)));
    const other = commitPayload(r, ["option a", "NEW b", "option c", "option d"].map((s) => Buffer.from(s)));
    expect(other.contentHash).not.toBe(same.contentHash);
  });

  it("refuses bytes that do not match the row's figure count", () => {
    expect(() => commitPayload(r, [Buffer.from("x")])).toThrow("1 picture(s) given, the row has 4");
  });
});
