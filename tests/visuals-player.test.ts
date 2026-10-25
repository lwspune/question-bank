/**
 * The animated-solution player (owner, 2026-10-25): the first run plays by
 * itself when the picture comes into view, so the control only ever offers to
 * play it AGAIN. Server-rendered here (no jsdom in this repo): this pins the
 * markup the student sees before any effect runs.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AnimatedSolution from "@/components/visuals/AnimatedSolution";
import { QUAD_SOLUTION, QUAD_VISUAL } from "./fixtures/visuals";

const html = () => renderToStaticMarkup(createElement(AnimatedSolution, { visual: QUAD_VISUAL, solution: QUAD_SOLUTION }));

describe("AnimatedSolution", () => {
  it("labels its control Play again, never a first-time Play", () => {
    const out = html();
    expect(out).toContain("Play again");
    expect(out).not.toMatch(/>Play</);
  });

  it("starts from the beginning, so the automatic first run has something to play", () => {
    expect(html()).toContain("Step 1 of 3");
  });
});
