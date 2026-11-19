import { describe, it, expect } from "vitest";
import { pairsToTable } from "../scripts/lib/pairTable";
import { parseTableBlocks } from "../src/components/math/parseTableBlocks";

describe("pairsToTable", () => {
  it("makes the first pair line the header when it carries no item label", () => {
    const t = "Consider the following pairs:\nBooks | Authors\nI. Dayabhaga | Jimutavahana\nII. Lilavati | Bhaskaracharya\n\nHow many pairs are correctly matched?";
    expect(pairsToTable(t)).toBe(
      "Consider the following pairs:\n\n| Books | Authors |\n|---|---|\n| I. Dayabhaga | Jimutavahana |\n| II. Lilavati | Bhaskaracharya |\n\nHow many pairs are correctly matched?"
    );
  });

  it("adds the given header when every pair line is an item", () => {
    const t = "Match List-I with List-II:\nA. Operation Kaveri | I. Israel\nB. Operation Ganga | II. Sudan\n\nCode:";
    expect(pairsToTable(t, ["List-I", "List-II"])).toBe(
      "Match List-I with List-II:\n\n| List-I | List-II |\n|---|---|\n| A. Operation Kaveri | I. Israel |\n| B. Operation Ganga | II. Sudan |\n\nCode:"
    );
  });

  it("refuses a header-less list when no header is given", () => {
    expect(() => pairsToTable("Pairs:\nI. a | b\nII. c | d")).toThrow(/no header/);
  });

  it("keeps math in the cells and produces a block the renderer parses as a table", () => {
    const t = String.raw`Consider:` + "\n" + String.raw`I. \(\text{Fe} + 2\text{HCl}\) | Fe is reductant` + "\n" + String.raw`II. \(\text{Zn}\) | Cu is reduced`;
    const out = pairsToTable(t, ["Reaction", "Property"]);
    expect(out).toContain(String.raw`| I. \(\text{Fe} + 2\text{HCl}\) | Fe is reductant |`);
    const table = parseTableBlocks(out).find((b) => b.kind === "table");
    expect(table && table.kind === "table" ? table.headers : null).toEqual(["Reaction", "Property"]);
  });
});
