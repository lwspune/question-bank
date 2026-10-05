import { describe, it, expect } from "vitest";
import { vPlacement } from "@/lib/chat/placement";

const empty = { hydrated: true, count: 0 };

describe("vPlacement", () => {
  it("shows V unlifted on an ordinary page", () => {
    expect(vPlacement("/notes/nda", empty)).toEqual({ hidden: false, aboveCart: false });
    expect(vPlacement("/", empty)).toEqual({ hidden: false, aboveCart: false });
  });

  it("hides V in the timed mock runner", () => {
    expect(vPlacement("/mock/nda-2024-i-maths/attempt/abc-123", empty).hidden).toBe(true);
    expect(vPlacement("/mock/nda-2024-i-maths/attempt/abc-123/", empty).hidden).toBe(true);
  });

  it("keeps V on the mock catalogue, instructions and result pages", () => {
    expect(vPlacement("/mock", empty).hidden).toBe(false);
    expect(vPlacement("/mock/nda-2024-i-maths", empty).hidden).toBe(false);
    expect(vPlacement("/mock/attempt/abc-123/result", empty).hidden).toBe(false);
  });

  it("hides V on /welcome, the sign-up step (it covered the exam chips on a phone)", () => {
    expect(vPlacement("/welcome", empty).hidden).toBe(true);
    expect(vPlacement("/welcomes", empty).hidden).toBe(false);
  });

  it("hides V on /drill, whose bottom bar it would cover", () => {
    expect(vPlacement("/drill", empty).hidden).toBe(true);
    expect(vPlacement("/drill/anything", empty).hidden).toBe(true);
    expect(vPlacement("/drillings", empty).hidden).toBe(false); // prefix, not substring
  });

  it("lifts V above the cart pill on /browse only while the pill shows", () => {
    expect(vPlacement("/browse", { hydrated: true, count: 3 }).aboveCart).toBe(true);
    expect(vPlacement("/browse", { hydrated: true, count: 0 }).aboveCart).toBe(false);
    // CartPill renders nothing until the cart hydrates, so V must not jump early.
    expect(vPlacement("/browse", { hydrated: false, count: 3 }).aboveCart).toBe(false);
  });

  it("does not lift V off /browse, where no cart pill is mounted", () => {
    expect(vPlacement("/notes/nda", { hydrated: true, count: 3 }).aboveCart).toBe(false);
  });
});
