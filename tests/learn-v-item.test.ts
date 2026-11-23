import { describe, expect, it } from "vitest";
import { parseSessionAttempts, SESSION_MAX } from "@/lib/learn/vItem";

const A = "11111111-1111-4111-8111-111111111111";
const B = "22222222-2222-4222-8222-222222222222";

describe("parseSessionAttempts: the answers given in V's Your turn card, sent back for the next question", () => {
  it("reads id:1 (right) and id:0 (wrong), oldest first", () => {
    expect(parseSessionAttempts(`${A}:0,${B}:1`)).toEqual([
      { itemId: A, correct: false },
      { itemId: B, correct: true },
    ]);
  });

  it("drops anything that is not an id and a 0 or 1, and nothing at all is none", () => {
    expect(parseSessionAttempts(`${A}:2,nope:1,${B}:1`)).toEqual([{ itemId: B, correct: true }]);
    expect(parseSessionAttempts(null)).toEqual([]);
    expect(parseSessionAttempts("")).toEqual([]);
  });

  it("keeps only the latest few, so a long session cannot grow the request", () => {
    const many = Array.from({ length: SESSION_MAX + 5 }, () => `${A}:1`).join(",");
    expect(parseSessionAttempts(many)).toHaveLength(SESSION_MAX);
  });
});
