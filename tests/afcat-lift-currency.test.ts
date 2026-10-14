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

  it("leaves Rs. written as text, and \\text{Rs. }, alone", () => {
    expect(liftCurrencyOutOfMath("Rs. \\(900\\)")).toBe("Rs. \\(900\\)");
    expect(liftCurrencyOutOfMath("\\( \\text{Rs. } 815 \\)")).toBe("\\( \\text{Rs. } 815 \\)");
  });
});
