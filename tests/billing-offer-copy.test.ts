/**
 * The pass offer's wording (2026-10-25). On 25 Oct, 32 offers were shown and
 * one sold. The download boxes opened on a loss ("You've had your free paper")
 * and listed six perks as limits ("free: 20 a day"); the reveal wall carried no
 * price and its "Get pass" link, half hidden behind the V bubble, went to
 * /pricing. The boxes now say what the student gets, show three perks, and put
 * the rest on one line; the price carries a per-month figure.
 */
import { describe, it, expect } from "vitest";
import {
  offerTitle,
  offerLine,
  stripFreeNote,
  splitOfferPerks,
  otherBenefits,
  perMonthLine,
  offerPriceLine,
} from "@/lib/billing/offerCopy";

// The live perks on 25 Oct 2026, in their /dashboard/pricing order.
const PERKS = [
  "Unlimited answers in the question bank (free: 20 a day)",
  "All chapter tests and full mock tests (free: 5 and 3)",
  "Unlimited Fix your mistakes (free: 10 a day)",
  "Your projected score (free: 7 days)",
  "Unlimited saved questions (free: 20)",
  "PDF downloads: question papers with answer keys, whole past papers and chapter formula sheets",
];

describe("offerTitle", () => {
  it("names the selection on /browse", () => {
    expect(offerTitle("browse", 176)).toBe("Get these 176 questions as a PDF");
    expect(offerTitle("browse", 1)).toBe("Get this question as a PDF");
    expect(offerTitle("browse", 12345)).toBe("Get these 12,345 questions as a PDF");
  });

  it("names a paper on the paper boxes", () => {
    expect(offerTitle("mock")).toBe("Get this paper as a PDF");
    expect(offerTitle("board_paper")).toBe("Get this paper as a PDF");
  });

  it("names the Top 10, which the old title called past papers", () => {
    expect(offerTitle("top_pyqs")).toBe("Get the Top 10 PYQs as a PDF");
  });

  it("names the formula sheet and the homework", () => {
    expect(offerTitle("formula")).toBe("Get this formula sheet as a PDF");
    expect(offerTitle("homework")).toBe("Get this homework as a PDF");
  });
});

describe("offerLine", () => {
  it("says what a paper is for, in the singular for one paper", () => {
    expect(offerLine("mock")).toBe("Print it, sit it against the clock, then mark yourself with the answer key.");
    expect(offerLine("board_paper")).toBe(offerLine("mock"));
  });

  it("is plural for a selection of questions", () => {
    const plural = "Print them, sit them against the clock, then mark yourself with the answer key.";
    expect(offerLine("browse")).toBe(plural);
    expect(offerLine("top_pyqs")).toBe(plural);
    expect(offerLine("homework")).toBe(plural);
  });

  it("says what a formula sheet is for", () => {
    expect(offerLine("formula")).toBe("Every formula in this chapter on one A4 page, to print and revise from.");
  });
});

describe("stripFreeNote", () => {
  it("drops the trailing free allowance", () => {
    expect(stripFreeNote("Unlimited answers in the question bank (free: 20 a day)")).toBe(
      "Unlimited answers in the question bank"
    );
  });

  it("leaves a perk without one, and any other brackets, alone", () => {
    expect(stripFreeNote(PERKS[5])).toBe(PERKS[5]);
    expect(stripFreeNote("Mock tests (NDA and CDS)")).toBe("Mock tests (NDA and CDS)");
  });
});

describe("splitOfferPerks", () => {
  it("leads with downloads, shows three, and puts the rest on one line", () => {
    expect(splitOfferPerks(PERKS)).toEqual({
      main: [
        "PDF downloads: question papers with answer keys, whole past papers and chapter formula sheets",
        "Unlimited answers in the question bank",
        "All chapter tests and full mock tests",
      ],
      also: "Also: unlimited Fix your mistakes, your projected score, unlimited saved questions.",
    });
  });

  it("has no Also line when three or fewer perks are on sale", () => {
    expect(splitOfferPerks(PERKS.slice(0, 2))).toEqual({
      main: ["Unlimited answers in the question bank", "All chapter tests and full mock tests"],
      also: null,
    });
    expect(splitOfferPerks([])).toEqual({ main: [], also: null });
  });

  it("keeps the capital of an initialism in the Also line", () => {
    const { also } = splitOfferPerks(["a download", "b", "c", "PDF of every sheet"]);
    expect(also).toBe("Also: PDF of every sheet.");
  });
});

describe("otherBenefits", () => {
  it("lists every perk but the answers one, without the free notes, downloads first", () => {
    expect(otherBenefits(PERKS)).toEqual([
      "PDF downloads: question papers with answer keys, whole past papers and chapter formula sheets",
      "All chapter tests and full mock tests",
      "Unlimited Fix your mistakes",
      "Your projected score",
      "Unlimited saved questions",
    ]);
  });
});

describe("perMonthLine", () => {
  it("rounds the price over the months", () => {
    expect(perMonthLine({ price: "₹199", length: "6 months" })).toBe("about ₹33 a month");
    expect(perMonthLine({ price: "₹1,999", length: "1 year" })).toBe("about ₹167 a month");
    expect(perMonthLine({ price: "₹300", length: "90 days" })).toBe("about ₹100 a month");
  });

  it("works in dollars for the intl pass (0203)", () => {
    expect(perMonthLine({ price: "$19", length: "6 months" })).toBe("about $3 a month");
    expect(perMonthLine({ price: "$29.99", length: "6 months" })).toBe("about $5 a month");
  });

  it("says nothing where a month figure would mislead or cannot be read", () => {
    expect(perMonthLine({ price: "₹99", length: "30 days" })).toBeNull();
    expect(perMonthLine({ price: "₹499", length: "lifetime" })).toBeNull();
    expect(perMonthLine({ price: "free", length: "6 months" })).toBeNull();
  });
});

describe("offerPriceLine", () => {
  it("reads as a sentence", () => {
    expect(offerPriceLine({ price: "₹199", length: "6 months" })).toBe("₹199 for 6 months");
    expect(offerPriceLine({ price: "₹499", length: "lifetime" })).toBe("₹499 for life");
  });
});
