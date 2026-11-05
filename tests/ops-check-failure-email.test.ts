import { describe, it, expect } from "vitest";
import { extractFailures, buildCheckFailureEmail, MAX_LISTED } from "@/lib/ops/checkFailureEmail";

// The daily prod-contract check failed 8 days running (2026-10-28 to 11-04) and was cancelled
// 6 days before that, while GitHub's failure emails went unread. The owner chose email
// (TECH_DEBT_SPEC.md 1.2, 2026-11-05): one PYQ Vault email naming WHAT failed, sent only on failure.

const VITEST_LOG = [
  "\u001b[31m FAIL \u001b[39m tests/blog-mhtcet-2027-stats.test.ts > blog: MHT-CET 2027 dates post vs the live bank > matches the chapter table exactly, both ways",
  " FAIL  tests/blog-mhtcet-2027-stats.test.ts > blog: MHT-CET 2027 dates post vs the live bank > matches the chapter table exactly, both ways",
  "AssertionError: expected { …(80) } to deeply equal { …(80) }",
  " FAIL  tests/guide-mht-cet-chemistry-playbooks.test.ts > mht-cet-chemistry > the HARD counts the guide quotes still match the bank",
  " Test Files  2 failed | 39 passed (41)",
].join("\n");

describe("extractFailures", () => {
  it("lists each failing test once, without colour codes", () => {
    expect(extractFailures(VITEST_LOG)).toEqual([
      "tests/blog-mhtcet-2027-stats.test.ts > blog: MHT-CET 2027 dates post vs the live bank > matches the chapter table exactly, both ways",
      "tests/guide-mht-cet-chemistry-playbooks.test.ts > mht-cet-chemistry > the HARD counts the guide quotes still match the bank",
    ]);
  });

  it("returns nothing when the log names no failing test", () => {
    expect(extractFailures("all good\n Test Files  41 passed (41)")).toEqual([]);
  });
});

describe("buildCheckFailureEmail", () => {
  const base = {
    workflow: "Prod contract",
    runUrl: "https://github.com/lwspune/question-bank/actions/runs/1",
    date: "2026-11-05",
  };

  it("names the check, the failures and the run in the subject and body", () => {
    const email = buildCheckFailureEmail({ ...base, failures: extractFailures(VITEST_LOG) });
    expect(email.subject).toBe("PYQ Vault: the Prod contract check failed (2 tests), 2026-11-05");
    expect(email.text).toContain("tests/guide-mht-cet-chemistry-playbooks.test.ts");
    expect(email.text).toContain(base.runUrl);
    expect(email.html).toContain(`href="${base.runUrl}"`);
  });

  it("still sends a useful email when no test name could be read (a step failed before the tests)", () => {
    const email = buildCheckFailureEmail({ ...base, failures: [] });
    expect(email.subject).toBe("PYQ Vault: the Prod contract check failed, 2026-11-05");
    expect(email.text).toContain("Open the run");
  });

  it(`lists at most ${MAX_LISTED} failures and says how many more`, () => {
    const many = Array.from({ length: MAX_LISTED + 3 }, (_, i) => `tests/t${i}.test.ts > case`);
    const email = buildCheckFailureEmail({ ...base, failures: many });
    expect(email.text).toContain("tests/t0.test.ts > case");
    expect(email.text).not.toContain(`tests/t${MAX_LISTED}.test.ts`);
    expect(email.text).toContain("and 3 more");
  });

  it("escapes test names in the HTML body", () => {
    const email = buildCheckFailureEmail({ ...base, failures: ["tests/x.test.ts > <b>bold</b>"] });
    expect(email.html).toContain("&lt;b&gt;bold&lt;/b&gt;");
    expect(email.html).not.toContain("<b>bold</b>");
  });
});
