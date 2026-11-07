/**
 * Stop or restart the board path from /account (MENTOR_SPEC.md D7). Stopping
 * returns /me to normal; restarting is the /me start card again, and keeps
 * every chapter already done, because done comes from work. Server-rendered.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PathSettingsCard from "@/app/account/PathSettingsCard";

const render = (props: Parameters<typeof PathSettingsCard>[0]) => renderToStaticMarkup(createElement(PathSettingsCard, props));

describe("the /account path card", () => {
  it("names the active path and offers to stop it", () => {
    const out = render({ active: { exam: "cbse-12", subjects: ["physics", "chemistry", "mathematics"], dailyMinutes: 55 }, stopped: false });
    expect(out).toContain("CBSE Class 12 boards");
    expect(out).toContain("Physics, Chemistry and Maths");
    expect(out).toContain("about 55 minutes a day");
    expect(out).toContain("Stop the path");
    expect(out).toContain("Chapters you finish stay done");
  });

  it("after a stop, points back to /me to start again", () => {
    const out = render({ active: null, stopped: true });
    expect(out).toContain('href="/me"');
    expect(out).toContain("Start it again");
  });

  it("is not there for a student who never started one", () => {
    expect(render({ active: null, stopped: false })).toBe("");
  });
});
