import { describe, it, expect } from "vitest";
import { decideRecrop } from "../scripts/solution-figures/recrop";

// liveVsOld: share of pixels that differ strongly between the LIVE image and a
// re-crop made the old way (watermark kept). oldVsNew: share that differ at all
// between the old-way and new-way (watermark removed) re-crops.
describe("decideRecrop", () => {
  it("replaces an image whose record reproduces it and whose crop the watermark crosses", () => {
    expect(decideRecrop({ liveVsOld: 0.002, oldVsNew: 0.04 })).toBe("replace");
  });

  it("leaves an image the watermark never crossed", () => {
    expect(decideRecrop({ liveVsOld: 0.001, oldVsNew: 0 })).toBe("clean");
  });

  it("leaves an image a previous run already replaced with the clean crop", () => {
    // Measured 2026-10-29: the 171 replaced on 10-19 score liveVsNew <= 0.0015.
    expect(decideRecrop({ liveVsOld: 0.002, oldVsNew: 0.04, liveVsNew: 0.0015 })).toBe("done");
  });

  it("still replaces when the live image differs from the clean crop", () => {
    expect(decideRecrop({ liveVsOld: 0.008, oldVsNew: 0.014, liveVsNew: 0.1 })).toBe("replace");
  });

  it("refuses to touch an image its record no longer reproduces (a hand-made or re-cropped one)", () => {
    expect(decideRecrop({ liveVsOld: 0.2, oldVsNew: 0.04 })).toBe("mismatch");
  });
});
