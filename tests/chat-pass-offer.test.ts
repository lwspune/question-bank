/**
 * The Premium Pass offer under V's reply when the day's free answers are used
 * (2026-10-28). The server sends it with the reply; the chat window and V's
 * question card read it back through parseVPassOffer, so anything malformed
 * shows no offer rather than a broken one. Pure core src/lib/chat/passOffer.ts.
 */
import { describe, it, expect } from "vitest";
import { parseVPassOffer } from "@/lib/chat/passOffer";

const PASS = {
  planId: "11111111-1111-4111-8111-111111111111",
  label: "Premium Pass",
  price: "₹199",
  length: "6 months",
  urlKey: "premium",
  perks: ["Unlimited answers", "PDF downloads"],
};

describe("parseVPassOffer", () => {
  it("reads the day's limit and the pass on sale", () => {
    expect(parseVPassOffer({ limit: 20, pass: PASS })).toEqual({ limit: 20, pass: PASS });
  });

  it("keeps the limit when no pass is on sale, so the window falls back to the /pricing link", () => {
    expect(parseVPassOffer({ limit: 20, pass: null })).toEqual({ limit: 20, pass: null });
    expect(parseVPassOffer({ limit: 20 })).toEqual({ limit: 20, pass: null });
  });

  it("drops a pass with a missing or wrong field rather than show half an offer", () => {
    expect(parseVPassOffer({ limit: 20, pass: { ...PASS, planId: 7 } })).toEqual({ limit: 20, pass: null });
    expect(parseVPassOffer({ limit: 20, pass: { ...PASS, perks: "all" } })).toEqual({ limit: 20, pass: null });
    expect(parseVPassOffer({ limit: 20, pass: { ...PASS, perks: [1] } })).toEqual({ limit: 20, pass: null });
  });

  it("is no offer at all without a sensible limit", () => {
    expect(parseVPassOffer(undefined)).toBeNull();
    expect(parseVPassOffer(null)).toBeNull();
    expect(parseVPassOffer({ pass: PASS })).toBeNull();
    expect(parseVPassOffer({ limit: 0, pass: PASS })).toBeNull();
    expect(parseVPassOffer({ limit: "20", pass: PASS })).toBeNull();
    expect(parseVPassOffer({ limit: 2.5, pass: PASS })).toBeNull();
  });
});
