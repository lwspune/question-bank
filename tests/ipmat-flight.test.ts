// Spec for the IPMAT flight-payload parser (scripts/ipmat/flight.ts).
//
// WHY THIS FILE EXISTS. afterboards.in serves its PYQ pages from a Next.js app,
// so the question records arrive as structured JSON inside the RSC flight
// payload rather than as rendered HTML. That is a better source than a scrape —
// but it has one trap that makes a BROKEN extractor look like a complete one.
//
// Long strings that repeat across rows (every Reading-Comprehension passage,
// most Data-Interpretation tables) are hoisted out of the record and replaced
// by a reference — the literal string "$3c". The hoisted text lives in a
// separate flight row. A naive extractor therefore returns every question, with
// every field present, and silently carries "$3c" where a 3,400-character
// passage should be. Measured on the live source: 112 of 670 Indore rows (17%),
// and they are the LARGEST fields in the corpus.
//
// The hoisted rows are byte-counted: `3c:T9d6,<2518 bytes of text>`. There is no
// separator afterwards — the next row's id begins at the very next byte. So:
//
//   * a line-oriented scan finds almost none of them (they are mid-line), and
//   * a parser that consumes `T<len>` as a count of CHARACTERS rather than
//     UTF-8 BYTES desynchronises on the first non-ASCII character and mangles
//     every row after it.
//
// The fixtures below are built so that each of those two mistakes FAILS a test
// rather than passing quietly. `smartQuotes` is the discriminating case for the
// byte/char confusion: its text is 6 characters but 8 bytes.
import { describe, it, expect } from "vitest";
import {
  flightBlob,
  parseFlightRows,
  extractQuestionList,
  isFlightRef,
  resolveFlightRefs,
  findNumberingGaps,
} from "../scripts/ipmat/flight";

/** Wrap flight-blob text in the <script> shape Next.js actually emits. */
function asHtml(...chunks: string[]): string {
  const pushes = chunks
    .map((c) => `<script>self.__next_f.push(${JSON.stringify([1, c])})</script>`)
    .join("");
  return `<html><head></head><body><div id="x">ignored</div>${pushes}</body></html>`;
}

describe("flightBlob", () => {
  it("concatenates the string payload of every push chunk", () => {
    expect(flightBlob(asHtml("abc", "def", "ghi"))).toBe("abcdefghi");
  });

  it("ignores pushes whose second element is not a string", () => {
    const html = `<script>self.__next_f.push([1,"keep"])</script><script>self.__next_f.push([2])</script>`;
    expect(flightBlob(html)).toBe("keep");
  });

  it("returns empty string for a page with no flight payload", () => {
    expect(flightBlob("<html><body>nothing here</body></html>")).toBe("");
  });
});

describe("parseFlightRows", () => {
  it("reads a single T-row keyed by its hex id", () => {
    const rows = parseFlightRows("3c:T5,hello\n");
    expect(rows.get("3c")).toBe("hello");
  });

  it("reads consecutive T-rows that are concatenated with NO separator", () => {
    // This is the real shape. A line-oriented scan sees one line and finds
    // only the first row; it would return 1 row instead of 3.
    const rows = parseFlightRows("3c:T3,aaa3d:T3,bbb3e:T3,ccc\n");
    expect(rows.get("3c")).toBe("aaa");
    expect(rows.get("3d")).toBe("bbb");
    expect(rows.get("3e")).toBe("ccc");
  });

  it("counts the T length in UTF-8 BYTES, not characters", () => {
    // "don’t" is 5 characters but 7 bytes — the right single quote is 3 bytes.
    // A char-counting parser consumes 5 chars ("don’t" minus 2 bytes of the
    // quote is not even a valid boundary), desynchronises, and loses "4f".
    const text = "don’t";
    const byteLen = Buffer.byteLength(text, "utf8");
    expect(byteLen).toBe(7);
    expect(text.length).toBe(5);

    const rows = parseFlightRows(`4e:T${byteLen.toString(16)},${text}4f:T2,ok\n`);
    expect(rows.get("4e")).toBe(text);
    expect(rows.get("4f")).toBe("ok");
  });

  it("keeps a T-row's own newlines instead of ending the row at them", () => {
    const text = "line one\n\nline two";
    const rows = parseFlightRows(
      `20:T${Buffer.byteLength(text, "utf8").toString(16)},${text}21:T2,zz\n`
    );
    expect(rows.get("20")).toBe(text);
    expect(rows.get("21")).toBe("zz");
  });

  it("reads a non-T row as the rest of its line", () => {
    const rows = parseFlightRows('1:"$Sreact.fragment"\n1a:[]\n');
    expect(rows.get("1")).toBe('"$Sreact.fragment"');
    expect(rows.get("1a")).toBe("[]");
  });

  it("does not treat a hex-looking substring inside a T-row's text as a new row", () => {
    const text = "see 3d:T9,xxxxxxxxx for detail";
    const rows = parseFlightRows(
      `3c:T${Buffer.byteLength(text, "utf8").toString(16)},${text}\n`
    );
    expect(rows.get("3c")).toBe(text);
    expect(rows.has("3d")).toBe(false);
  });
});

describe("extractQuestionList", () => {
  it("extracts the array that follows the questionList key", () => {
    const list = extractQuestionList('{"a":1,"questionList":[{"q":"one"},{"q":"two"}],"b":2}');
    expect(list).toEqual([{ q: "one" }, { q: "two" }]);
  });

  it("is not terminated by a bracket inside a string value", () => {
    // Real stems contain brackets: "the set {1, 2, ...}" and "[-1, 1]".
    const blob = '"questionList":[{"q":"interval [-1, 1] is closed"},{"q":"b"}]';
    const list = extractQuestionList(blob);
    expect(list).toHaveLength(2);
    expect((list![0] as { q: string }).q).toBe("interval [-1, 1] is closed");
  });

  it("is not terminated by an ESCAPED quote inside a string value", () => {
    const blob = '"questionList":[{"q":"he said \\"no\\" twice] here"}]';
    const list = extractQuestionList(blob);
    expect(list).toHaveLength(1);
    expect((list![0] as { q: string }).q).toBe('he said "no" twice] here');
  });

  it("handles nested arrays inside a record", () => {
    const blob = '"questionList":[{"tags":["a","b"],"q":"x"}]';
    expect(extractQuestionList(blob)).toEqual([{ tags: ["a", "b"], q: "x" }]);
  });

  it("returns null when the key is absent", () => {
    expect(extractQuestionList('{"other":[1,2]}')).toBeNull();
  });
});

describe("isFlightRef", () => {
  it("accepts a bare dollar + hex id", () => {
    expect(isFlightRef("$3c")).toBe(true);
    expect(isFlightRef("$4e")).toBe(true);
    expect(isFlightRef("$20")).toBe(true);
  });

  it("rejects real content that merely starts with a dollar", () => {
    // Their math convention is TeX dollars, so this distinction is load-bearing:
    // treating "$4e" as content loses a passage, and treating "$40$" as a
    // reference would delete a real stem.
    expect(isFlightRef("$40$")).toBe(false);
    expect(isFlightRef("$x + y$")).toBe(false);
    expect(isFlightRef("$$20 \\leq x$")).toBe(false);
    expect(isFlightRef("Rs. $500")).toBe(false);
    expect(isFlightRef("")).toBe(false);
  });

  it("rejects a non-hex id", () => {
    expect(isFlightRef("$zz")).toBe(false);
  });
});

describe("resolveFlightRefs", () => {
  const rows = new Map([
    ["3c", "A long passage about vaccination."],
    ["4e", "Order these five sentences."],
  ]);

  it("replaces a reference with the row it points at", () => {
    const { resolved, unresolved } = resolveFlightRefs(
      [{ questionNumber: 1, question: "Q one", comprehension: "$3c" }],
      rows
    );
    expect(resolved[0].comprehension).toBe("A long passage about vaccination.");
    expect(unresolved).toEqual([]);
  });

  it("resolves a reference in the question field too", () => {
    const { resolved } = resolveFlightRefs([{ questionNumber: 41, question: "$4e" }], rows);
    expect(resolved[0].question).toBe("Order these five sentences.");
  });

  it("leaves real content untouched", () => {
    const { resolved } = resolveFlightRefs(
      [{ questionNumber: 2, question: "find $x$", option1: "$$20 \\leq x$" }],
      rows
    );
    expect(resolved[0].question).toBe("find $x$");
    expect(resolved[0].option1).toBe("$$20 \\leq x$");
  });

  it("REPORTS a reference with no matching row instead of dropping it", () => {
    // Silently blanking it is how 17% of the corpus went missing unnoticed.
    const { resolved, unresolved } = resolveFlightRefs(
      [{ questionNumber: 7, question: "$ff" }],
      rows
    );
    expect(unresolved).toEqual([{ questionNumber: 7, field: "question", ref: "$ff" }]);
    expect(resolved[0].question).toBe("$ff");
  });
});

describe("findNumberingGaps", () => {
  it("returns nothing for a contiguous 1..N run", () => {
    expect(findNumberingGaps([1, 2, 3, 4, 5])).toEqual([]);
  });

  it("is order-insensitive", () => {
    expect(findNumberingGaps([3, 1, 5, 4, 2])).toEqual([]);
  });

  it("names every missing number", () => {
    expect(findNumberingGaps([1, 2, 5])).toEqual([3, 4]);
  });

  it("treats an empty section as no gaps rather than throwing", () => {
    expect(findNumberingGaps([])).toEqual([]);
  });

  it("reports a duplicate number as a gap at the tail", () => {
    // Two rows claiming Q3 means one row is mis-numbered, so the run is short.
    expect(findNumberingGaps([1, 2, 3, 3])).toEqual([4]);
  });
});

describe("end to end on a payload shaped like the real thing", () => {
  // A passage hoisted to row 3c, referenced by two questions, with a second
  // T-row packed immediately after it and no separator between them.
  const passage = "The dairy maid’s hand supplied the vaccine matter.";
  const parajumble = "Sequence the five sentences below.";
  const hex = (s: string) => Buffer.byteLength(s, "utf8").toString(16);

  const record = (n: number, extra: string) =>
    `{"_id":"id${n}","topic":"Verbal Ability","subTopic":"Reading Comprehension",` +
    `"difficulty":"Medium","questionNumber":${n},"correctAnswer":"2",${extra}}`;

  const blob =
    `1:"$Sreact.fragment"\n` +
    `0:{"questionList":[` +
    record(1, '"question":"What does the passage imply?","comprehension":"$3c"') +
    "," +
    record(2, '"question":"$3d","comprehension":"$3c"') +
    `]}\n` +
    `3c:T${hex(passage)},${passage}3d:T${hex(parajumble)},${parajumble}\n`;

  it("recovers both hoisted strings and leaves nothing unresolved", () => {
    const rows = parseFlightRows(blob);
    const list = extractQuestionList(blob);
    expect(list).toHaveLength(2);

    const { resolved, unresolved } = resolveFlightRefs(list as never[], rows);
    expect(unresolved).toEqual([]);
    expect(resolved[0].comprehension).toBe(passage);
    expect(resolved[1].comprehension).toBe(passage);
    expect(resolved[1].question).toBe(parajumble);
  });

  it("leaves no field still shaped like a reference", () => {
    const rows = parseFlightRows(blob);
    const { resolved } = resolveFlightRefs(extractQuestionList(blob) as never[], rows);
    const leftover = resolved.flatMap((r) =>
      Object.values(r).filter((v) => typeof v === "string" && isFlightRef(v))
    );
    expect(leftover).toEqual([]);
  });

  it("numbers the questions contiguously", () => {
    const { resolved } = resolveFlightRefs(
      extractQuestionList(blob) as never[],
      parseFlightRows(blob)
    );
    expect(findNumberingGaps(resolved.map((r) => r.questionNumber as number))).toEqual([]);
  });
});
