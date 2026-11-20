import { describe, expect, it } from "vitest";
import { SERIES, blockLength, fillBlanks } from "../src/app/notes/_components/visualizations/SscT2SeriesBlock";
import { GIVEN, MEANING, evaluate, leftToRight, rewrite } from "../src/app/notes/_components/visualizations/SscT2SignRewrite";
import { allRows, leftEnds, rowsAllowed, statementI, statementII } from "../src/app/notes/_components/visualizations/SscT2DsRow";
import { CHAIN, TREE, levelsAbove, linkSentence, links, parentWord } from "../src/app/notes/_components/visualizations/SscT2CodedRelations";
import { SENTENCE_1, SENTENCE_2, shared } from "../src/app/notes/_components/visualizations/SscT2SharedCode";
import { PAIR, THIRD, applySteps, letterAt, pos, shift, steps } from "../src/app/notes/_components/visualizations/SscT2LetterSteps";
import { PAIRS, breaks, square } from "../src/app/notes/_components/visualizations/SscT2OddPair";
import { NUMBER, matchingPlaces, sortDigits } from "../src/app/notes/_components/visualizations/SscT2DigitsInPlace";
import { COMMON, KINDS, ONION } from "../src/app/notes/_components/visualizations/SscT2CauseLinks";
import { SERIES_STEPS, arrowAngle, circleBlack, direction } from "../src/app/notes/_components/visualizations/SscT2FigureSeries";
import { DIGIT_BARS, hiddenIn, missingBars } from "../src/app/notes/_components/visualizations/SscT2SegmentDigits";
import { LADDER, rungOf } from "../src/app/notes/_components/visualizations/SscT2MemoryLadder";
import { NAMED, RANGE, cellName, rangeCells } from "../src/app/notes/_components/visualizations/SscT2ExcelRange";
import { TRANSFERS } from "../src/app/notes/_components/visualizations/SscT2UploadDownload";
import { LAYERS, dependsOn, layerOf } from "../src/app/notes/_components/visualizations/SscT2SoftwareLayers";
import { TOOLS, unaltered } from "../src/app/notes/_components/visualizations/SscT2SecurityTools";
import { deliver } from "../src/app/notes/_components/visualizations/SscT2HubSwitch";

describe("ssc-t2-series-block: a b _ d a _ c d _ b c d (ssc2rsese-blanks)", () => {
  it("a comes back after 4 letters, so the block is 4 long", () => {
    expect(SERIES.length).toBe(12);
    expect(blockLength(SERIES)).toBe(4);
  });
  it("the blanks read c, b, a, the concept's answer", () => {
    expect(fillBlanks(SERIES, 4)).toEqual(["c", "b", "a"]);
  });
  it("works on the self-check string too (block MATN gives T, A, N)", () => {
    const s = ["M", "A", "_", "N", "M", "_", "T", "N", "M", "A", "T", "_"];
    expect(blockLength(s)).toBe(4);
    expect(fillBlanks(s, 4)).toEqual(["T", "A", "N"]);
  });
});

describe("ssc-t2-sign-rewrite: 8 + 3 × 12 − 4 ÷ 2 (ssc2rmoop-symbol)", () => {
  it("each printed sign is replaced by its new meaning", () => {
    expect(MEANING).toEqual({ "+": "×", "×": "−", "−": "÷", "÷": "+" });
    expect(rewrite(GIVEN)).toEqual([8, "×", 3, "−", 12, "÷", 4, "+", 2]);
  });
  it("× and ÷ first: 24 − 3 + 2 = 23, the concept's answer", () => {
    expect(evaluate(rewrite(GIVEN))).toBe(23);
  });
  it("the trap, strictly left to right: (24 − 12) ÷ 4 + 2 = 5", () => {
    expect(leftToRight(rewrite(GIVEN))).toBe(5);
  });
  it("the trap's own line: 24 − 12 ÷ 4 is 21", () => {
    expect(evaluate([24, "−", 12, "÷", 4])).toBe(21);
  });
});

describe("ssc-t2-ds-row: who sits at the left end (ssc2rdsds-seating)", () => {
  it("there are 24 orders of four people", () => {
    expect(allRows()).toHaveLength(24);
  });
  it("I alone leaves P, R or S at the left end: not enough", () => {
    const rows = rowsAllowed(statementI);
    expect(rows).toHaveLength(6);
    expect(leftEnds(rows)).toEqual(["P", "R", "S"]);
  });
  it("II alone allows exactly P Q R S and S R P Q: not enough", () => {
    const rows = rowsAllowed(statementII);
    expect(rows).toEqual(["PQRS", "SRPQ"]);
    expect(leftEnds(rows)).toEqual(["P", "S"]);
  });
  it("together only S R P Q: S at the left end, both needed", () => {
    expect(rowsAllowed((r) => statementI(r) && statementII(r))).toEqual(["SRPQ"]);
  });
});

describe("ssc-t2-coded-relations: X % Y # Z & W (ssc2rbrre-coded)", () => {
  it("decodes into three links, in order", () => {
    expect(links(CHAIN).map(linkSentence)).toEqual(["X is Y's husband", "Y is Z's mother", "Z is W's brother"]);
  });
  it("genders come only from the relation words; W's is not given", () => {
    expect(TREE.X.gender).toBe("male");
    expect(TREE.Y.gender).toBe("female");
    expect(TREE.Z.gender).toBe("male");
    expect(TREE.W.gender).toBe("unknown");
  });
  it("X is one level above W and male: W's father, the concept's answer", () => {
    expect(levelsAbove("X", "W")).toBe(1);
    expect(levelsAbove("Y", "W")).toBe(1);
    expect(parentWord(TREE.X.gender)).toBe("father");
  });
});

describe("ssc-t2-shared-code: 'sweet' (ssc2rcdco-common)", () => {
  it("sweet is the only shared word and 'to' the only shared code", () => {
    expect(shared(SENTENCE_1.words, SENTENCE_2.words)).toEqual(["sweet"]);
    expect(shared(SENTENCE_1.codes, SENTENCE_2.codes)).toEqual(["to"]);
  });
});

describe("ssc-t2-letter-steps: ACE : BDF :: KMO : ? (ssc2ranan-letter)", () => {
  it("positions: A 1, C 3, E 5, K 11, M 13, O 15", () => {
    expect([..."ACEKMO"].map(pos)).toEqual([1, 3, 5, 11, 13, 15]);
  });
  it("the step under every letter is +1", () => {
    expect(steps(PAIR.a, PAIR.b)).toEqual([1, 1, 1]);
  });
  it("the same steps take KMO to LNP, the concept's answer", () => {
    expect(applySteps(THIRD, steps(PAIR.a, PAIR.b))).toBe("LNP");
  });
  it("wraps past Z: Z + 1 = A, A − 1 = Z", () => {
    expect(shift("Z", 1)).toBe("A");
    expect(shift("A", -1)).toBe("Z");
    expect(letterAt(26)).toBe("Z");
  });
});

describe("ssc-t2-odd-pair: 3 : 9, 5 : 25, 6 : 36, 7 : 48 (ssc2rclod-number)", () => {
  it("only 7 : 48 breaks the square rule, since 7² = 49", () => {
    expect(breaks(PAIRS, square)).toEqual([3]);
    expect(square(7)).toBe(49);
    expect(PAIRS[3]).toEqual([7, 48]);
  });
});

describe("ssc-t2-digits-in-place: 42715 in ascending order (ssc2ralwd-digit)", () => {
  it("sorts to 12457", () => {
    expect(sortDigits(NUMBER, "ascending")).toBe("12457");
  });
  it("only the 2 in the second place matches: one digit, the concept's answer", () => {
    expect(matchingPlaces(NUMBER, sortDigits(NUMBER, "ascending"))).toEqual([1]);
  });
  it("the self-check 63491 gives two, and 5321 descending gives four", () => {
    expect(matchingPlaces("63491", sortDigits("63491", "ascending"))).toHaveLength(2);
    expect(matchingPlaces("5321", sortDigits("5321", "descending"))).toHaveLength(4);
  });
});

describe("ssc-t2-cause-links: three ways two events link (ssc2rstlg-cause)", () => {
  it("draws the three kinds the concept names", () => {
    expect(KINDS).toEqual(["one causes the other", "common cause", "independent causes"]);
  });
  it("in the onion example II (the rain) is the cause and I (the price) the effect", () => {
    expect(ONION.cause.startsWith("II")).toBe(true);
    expect(ONION.effect.startsWith("I:")).toBe(true);
  });
  it("the common cause is the definition's flu outbreak, with two effects", () => {
    expect(COMMON.source).toBe("flu outbreak");
    expect(COMMON.effects).toHaveLength(2);
  });
});

describe("ssc-t2-figure-series: up, right, down, ? (ssc2rnvfg-series)", () => {
  it("has 3 to 7 steps, one per figure", () => {
    expect(SERIES_STEPS).toHaveLength(4);
  });
  it("the arrow turns 90° clockwise each step: up, right, down, left", () => {
    expect([0, 1, 2, 3].map(arrowAngle)).toEqual([0, 90, 180, 270]);
    expect([0, 1, 2, 3].map(direction)).toEqual(["up", "right", "down", "left"]);
  });
  it("the circle alternates white, black, white, so the fourth is black", () => {
    expect([0, 1, 2, 3].map(circleBlack)).toEqual([false, true, false, true]);
  });
});

describe("ssc-t2-segment-digits: is 7 hidden in 9 (ssc2reffg-embedded)", () => {
  it("7 is the top bar and the two right-hand bars", () => {
    expect([...DIGIT_BARS["7"]].sort()).toEqual(["a", "b", "c"]);
  });
  it("9 lights all of 7's bars and three more: yes, the concept's answer", () => {
    expect(hiddenIn("7", "9")).toBe(true);
    expect(DIGIT_BARS["9"].length - DIGIT_BARS["7"].length).toBe(3);
  });
  it("2 is not in 3: 3 does not light the lower-left bar", () => {
    expect(missingBars("2", "3")).toEqual(["e"]);
  });
  it("1 is in 4: both right-hand bars are lit in 4", () => {
    expect(hiddenIn("1", "4")).toBe(true);
  });
});

describe("ssc-t2-memory-ladder (ssc2chwhw-memory)", () => {
  it("fastest first: registers, cache, RAM, storage", () => {
    expect(LADDER.map((r) => r.name)).toEqual(["Registers", "Cache", "Main memory (RAM)", "Storage"]);
  });
  it("cache sits above (faster than) main memory", () => {
    expect(rungOf("Cache")).toBeLessThan(rungOf("Main memory"));
  });
  it("RAM forgets without power; storage keeps its data", () => {
    expect(LADDER[rungOf("Main memory")].power).toBe("forgets");
    expect(LADDER[rungOf("Storage")].power).toBe("keeps");
  });
});

describe("ssc-t2-excel-range (ssc2cmsof-excel)", () => {
  it("column letter then row number: B7", () => {
    expect(cellName(NAMED.col, NAMED.row)).toBe("B7");
    expect(cellName(2, 4)).toBe("C4");
  });
  it("B2:B5 is the four cells B2, B3, B4, B5", () => {
    expect(rangeCells(RANGE)).toEqual(["B2", "B3", "B4", "B5"]);
  });
});

describe("ssc-t2-upload-download (ssc2ciene-protocol)", () => {
  it("uploading goes machine to server; downloading server to machine", () => {
    expect(TRANSFERS[0]).toEqual({ name: "Uploading", from: "your machine", to: "server" });
    expect(TRANSFERS[1]).toEqual({ name: "Downloading", from: "server", to: "your machine" });
  });
});

describe("ssc-t2-software-layers (ssc2cosos-software)", () => {
  it("applications sit on system software, which runs the computer", () => {
    expect(LAYERS.map((l) => l.name)).toEqual(["Application software", "System software", "The computer itself"]);
    expect(dependsOn(0)).toBe("System software");
  });
  it("a browser is application software; the operating system is system software", () => {
    expect(layerOf("browser")).toBe(0);
    expect(layerOf("antivirus")).toBe(0);
    expect(layerOf("operating system")).toBe(1);
    expect(layerOf("utilities")).toBe(1);
  });
});

describe("ssc-t2-security-tools (ssc2ccssc-protect)", () => {
  it("the three tools in the concept's order", () => {
    expect(TOOLS.map((t) => t.tool)).toEqual(["Firewall", "Encryption in transit", "Hashing"]);
  });
  it("matching hashes mean unaltered data", () => {
    expect(unaltered("9f2c", "9f2c")).toBe(true);
    expect(unaltered("9f2c", "9f2d")).toBe(false);
  });
});

describe("ssc-t2-hub-switch (ssc2cnwnw-device)", () => {
  it("a hub sends A's data out of every other port", () => {
    expect(deliver("hub", "A", "D")).toEqual(["B", "C", "D"]);
  });
  it("a switch sends it only to D", () => {
    expect(deliver("switch", "A", "D")).toEqual(["D"]);
  });
});
