import { describe, expect, it } from "vitest";
import { liftCurrencyOutOfMath } from "../scripts/afcat/lib";

describe("liftCurrencyOutOfMath", () => {
  it("moves a leading Rs. out of the math zone", () => {
    expect(liftCurrencyOutOfMath("\\(Rs. 900\\)")).toBe("Rs. \\(900\\)");
  });

  it("handles several zones in one stem", () => {
    expect(liftCurrencyOutOfMath("amounts to \\(Rs. 1350\\) in \\(5\\) years and to \\(Rs. 1620\\)")).toBe(
      "amounts to Rs. \\(1350\\) in \\(5\\) years and to Rs. \\(1620\\)",
    );
  });

  it("moves a leading rupee sign out too", () => {
    expect(liftCurrencyOutOfMath("sells at \\(₹240\\) each and \\(₹ 35\\) per kg")).toBe("sells at ₹\\(240\\) each and ₹\\(35\\) per kg");
  });

  it("drops an empty zone or a forced space left after Rs.", () => {
    expect(liftCurrencyOutOfMath("is Rs. \\(\\) \\(8500\\). If")).toBe("is Rs. \\(8500\\). If");
    expect(liftCurrencyOutOfMath("is Rs. \\(\\ 2500\\) and Rs. \\(\\ 3000\\)")).toBe("is Rs. \\(2500\\) and Rs. \\(3000\\)");
  });

  it("leaves Rs. written as text, and \\text{Rs. }, alone", () => {
    expect(liftCurrencyOutOfMath("Rs. \\(900\\)")).toBe("Rs. \\(900\\)");
    expect(liftCurrencyOutOfMath("\\( \\text{Rs. } 815 \\)")).toBe("\\( \\text{Rs. } 815 \\)");
  });
});
