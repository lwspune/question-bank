import { describe, it, expect } from "vitest";
import { zeroCountClaims } from "../scripts/lib/liveCountsCheck";

// The live pages as they were served on 2026-10-08, cut to the lines that matter.
const BROKEN_HOME = `<ul aria-label="What is in the bank"><li><span class="text-cyan-200">0</span> past-year questions</li><li><span class="text-cyan-200">0</span> textbook and practice</li></ul>`;
const BROKEN_BROWSE = `<dl><div><dt>public questions</dt><dd>0</dd></div></dl><p>0 public questions to browse,</p>`;

describe("zeroCountClaims — the live site must never say the bank is empty", () => {
  it("flags the homepage hero printing 0 past-year and 0 practice", () => {
    const found = zeroCountClaims(BROKEN_HOME);
    expect(found).toContain("0 past-year questions");
    expect(found).toContain("0 textbook and practice");
  });

  it("flags /browse printing 0 public questions", () => {
    expect(zeroCountClaims(BROKEN_BROWSE)).toContain("0 public questions");
  });

  it("passes real totals, including ones that END in 0", () => {
    const ok = `<span>5,130</span> past-year questions <span>10</span> textbook and practice <p>87,620 public questions</p>`;
    expect(zeroCountClaims(ok)).toEqual([]);
  });

  it("passes a page where the counts are left out entirely", () => {
    expect(zeroCountClaims(`<li>25 exams · free to browse</li>`)).toEqual([]);
  });

  it("ignores scripts, where the same words can sit in serialised data", () => {
    const html = `<script>self.__next_f.push("0 past-year questions")</script><p>5,130 past-year questions</p>`;
    expect(zeroCountClaims(html)).toEqual([]);
  });
});
