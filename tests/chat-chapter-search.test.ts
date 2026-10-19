/**
 * V's find_chapters tool (2026-10-15): the chapter pages a student's typed
 * request points at, searched over the cached /questions landing list.
 */
import { describe, it, expect } from "vitest";
import { searchChapters, findChapters, formatChapterHits, type ChapterSearchRow } from "@/lib/chat/chapterSearch";

function row(examSlug: string, examName: string, subjectName: string, chapterName: string, questionCount = 50): ChapterSearchRow {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    examSlug,
    examName,
    subjectSlug: slug(subjectName),
    subjectName,
    chapterSlug: slug(chapterName),
    chapterName,
    questionCount,
    practiceOnly: false,
  };
}

const ROWS: ChapterSearchRow[] = [
  row("cbse-12", "CBSE Class 12", "Physics", "Atoms", 120),
  row("cbse-12", "CBSE Class 12", "Physics", "Nuclei", 90),
  row("neet", "NEET", "Physics", "Atoms", 40),
  row("neet", "NEET", "Physics", "Laws of Motion", 200),
  row("jee-mains", "JEE Mains", "Physics", "Laws of Motion", 300),
  row("mht-cet", "MHT-CET", "Mathematics", "Binomial Distribution", 80),
  row("mh-ssc-10", "MH State Board Class 10", "Science 2", "Heredity and Evolution", 60),
  row("mh-ssc-10", "MH State Board Class 10", "Science 2", "Life Processes in Living Organisms Part 1", 70),
];

// Real names, for the searches students made on 2026-10-16 that came back empty.
const REAL: ChapterSearchRow[] = [
  row("mh-ssc-10", "Maharashtra State Board Class 10", "Science and Technology II", "Introduction to Microbiology", 51),
  row("mh-ssc-10", "Maharashtra State Board Class 10", "Science and Technology II", "Heredity and Evolution", 60),
  row("mh-ssc-10", "Maharashtra State Board Class 10", "Science and Technology I", "Gravitation", 70),
  row("nda", "NDA", "Mathematics", "Matrices and Determinants", 300),
  row("nda", "NDA", "Mathematics", "Probability", 250),
  row("nda", "NDA", "Physics", "Sound", 90),
  ...[
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "Current Electricity",
    "Moving Charges and Magnetism",
    "Magnetism and Matter",
    "Electromagnetic Induction",
    "Alternating Current",
    "Electromagnetic Waves",
    "Ray Optics and Optical Instruments",
    "Wave Optics",
    "Dual Nature of Radiation and Matter",
    "Atoms",
    "Nuclei",
    "Semiconductor Electronics",
  ].map((name, i) => row("cbse-12", "CBSE Class 12", "Physics", name, 300 - i * 10)),
];

describe("searchChapters", () => {
  it("finds a chapter by its name", () => {
    const hits = searchChapters(ROWS, { query: "binomial distribution" });
    expect(hits[0].chapterName).toBe("Binomial Distribution");
  });

  it("narrows to the exam when one is given", () => {
    const hits = searchChapters(ROWS, { query: "atoms", exam: "cbse 12" });
    expect(hits.map((h) => h.examSlug)).toEqual(["cbse-12"]);
  });

  it("matches the exam by slug as well as by name", () => {
    const hits = searchChapters(ROWS, { query: "laws of motion", exam: "neet" });
    expect(hits.map((h) => h.examSlug)).toEqual(["neet"]);
  });

  it("ignores an exam that matches nothing rather than returning nothing", () => {
    const hits = searchChapters(ROWS, { query: "atoms", exam: "clat" });
    expect(hits.length).toBe(2);
  });

  it("puts the bigger chapter first when two match equally", () => {
    const hits = searchChapters(ROWS, { query: "laws of motion" });
    expect(hits.map((h) => h.examSlug)).toEqual(["jee-mains", "neet"]);
  });

  it("lists a subject's chapters when the query names only the subject", () => {
    const hits = searchChapters(ROWS, { query: "science 2", exam: "mh-ssc-10" });
    expect(hits.length).toBe(2);
  });

  it("matches a word start, so a short form of a word still finds it", () => {
    const hits = searchChapters(ROWS, { query: "binomial dist" });
    expect(hits[0].chapterName).toBe("Binomial Distribution");
  });

  it("returns nothing for a query with no real words", () => {
    expect(searchChapters(ROWS, { query: "  ?? " })).toEqual([]);
  });

  it("returns nothing when no chapter matches", () => {
    expect(searchChapters(ROWS, { query: "photosynthesis" })).toEqual([]);
  });

  it("caps the number of results", () => {
    const many = Array.from({ length: 40 }, (_, i) => row("nda", "NDA", "Mathematics", `Matrices ${i}`));
    expect(searchChapters(many, { query: "matrices" }).length).toBe(20);
  });
});

describe("searchChapters: what students typed (2026-10-16)", () => {
  it("reads a plain number as the roman numeral in a subject name (science 2 = Science and Technology II)", () => {
    const hits = searchChapters(REAL, { query: "introduction to microbiology science 2", exam: "MH SSC 10" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Introduction to Microbiology"]);
  });

  // 2026-10-18 replay: "science part 2" kept "part" as a word, so only chapters named "... Part 1/2" came back.
  it("reads \"science part 2\" as the subject, every chapter of it", () => {
    const hits = searchChapters(REAL, { query: "science part 2", exam: "mh-ssc-10" });
    expect(hits.map((h) => h.chapterName).sort()).toEqual(["Heredity and Evolution", "Introduction to Microbiology"]);
  });

  it("still finds a chapter whose own name has a part number", () => {
    const hits = searchChapters(ROWS, { query: "life processes part 1" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Life Processes in Living Organisms Part 1"]);
  });

  it("does not let Science and Technology I answer for II", () => {
    const hits = searchChapters(REAL, { query: "science 2", exam: "mh-ssc-10" });
    expect(hits.map((h) => h.subjectName)).toEqual(["Science and Technology II", "Science and Technology II"]);
  });

  it("knows maths means Mathematics", () => {
    const hits = searchChapters(REAL, { query: "maths", exam: "NDA" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Matrices and Determinants", "Probability"]);
  });

  it("ignores filler words such as chapter numbers, imp and questions", () => {
    const hits = searchChapters(REAL, {
      query: "imp questions chapter 7 introduction to microbiology",
      exam: "MH SSC 10",
    });
    expect(hits.map((h) => h.chapterName)).toEqual(["Introduction to Microbiology"]);
  });

  it("lets a query name the exam's class without failing the search", () => {
    const hits = searchChapters(REAL, { query: "class 12 physics electric charges" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Electric Charges and Fields"]);
  });

  it("lists a whole subject's chapters, so V can pick chapter 1 by name", () => {
    const hits = searchChapters(REAL, { query: "physics", exam: "CBSE Class 12" });
    expect(hits.length).toBe(14);
    expect(hits.map((h) => h.chapterName)).toContain("Electric Charges and Fields");
  });

  it("still needs a chapter or subject word: an exam alone finds nothing", () => {
    expect(searchChapters(REAL, { query: "class 12" })).toEqual([]);
  });
});

describe("formatChapterHits", () => {
  it("gives each chapter one line with its page address", () => {
    const text = formatChapterHits(searchChapters(ROWS, { query: "atoms", exam: "cbse-12" }));
    expect(text).toContain("CBSE Class 12");
    expect(text).toContain("Atoms");
    expect(text).toContain("/questions/cbse-12/physics/atoms");
  });

  it("says plainly when nothing was found", () => {
    expect(formatChapterHits([])).toMatch(/no chapter/i);
  });

  it("names the exam and subject once, not on every chapter line (the model pays per token)", () => {
    const text = formatChapterHits(searchChapters(REAL, { query: "physics", exam: "CBSE Class 12" }));
    expect(text.match(/CBSE Class 12/g)).toHaveLength(1);
    expect(text.split("\n")).toHaveLength(15); // one header + 14 chapters
    expect(text).toContain("Electric Charges and Fields (300 q) /questions/cbse-12/physics/electric-charges-and-fields");
  });

  it("gives each exam and subject its own header when the hits span several", () => {
    const text = formatChapterHits(searchChapters(ROWS, { query: "laws of motion" }));
    expect(text).toBe(
      [
        "JEE Mains | Physics",
        "- Laws of Motion (300 q) /questions/jee-mains/physics/laws-of-motion",
        "NEET | Physics",
        "- Laws of Motion (200 q) /questions/neet/physics/laws-of-motion",
      ].join("\n")
    );
  });

  it("marks a textbook-practice chapter", () => {
    const practice = { ...REAL[0], practiceOnly: true };
    expect(formatChapterHits([practice])).toContain("(51 q, textbook practice)");
  });
});

// 2026-10-18: a student asked for "class 12th physics, rotational dynamics". V guessed CBSE,
// the search looked in CBSE alone and V said "not found", though Maharashtra HSC 12 has it.
describe("findChapters: when the exam V passed has no such chapter", () => {
  const ROWS_18: ChapterSearchRow[] = [
    row("cbse-12", "CBSE Class 12", "Physics", "Electric Charges and Fields", 81),
    row("mh-hsc-12", "Maharashtra HSC Class 12", "Physics", "Rotational Dynamics", 56),
    row("mht-cet", "MHT-CET", "Physics", "Rotational Dynamics", 204),
  ];

  it("looks in every exam and says the named one had nothing", () => {
    const r = findChapters(ROWS_18, { query: "rotational dynamics", exam: "CBSE Class 12" });
    expect(r.missedExam).toBe("CBSE Class 12");
    expect(r.hits.map((h) => h.examSlug)).toEqual(["mht-cet", "mh-hsc-12"]);
  });

  it("keeps to the named exam when it has the chapter", () => {
    const r = findChapters(ROWS_18, { query: "rotational dynamics", exam: "Maharashtra HSC Class 12" });
    expect(r.missedExam).toBeNull();
    expect(r.hits.map((h) => h.examSlug)).toEqual(["mh-hsc-12"]);
  });

  it("claims no miss when no exam was named, or the name matched no exam", () => {
    expect(findChapters(ROWS_18, { query: "rotational dynamics" }).missedExam).toBeNull();
    expect(findChapters(ROWS_18, { query: "rotational dynamics", exam: "semester 1" }).missedExam).toBeNull();
  });

  it("claims no miss when nothing matches anywhere either", () => {
    expect(findChapters(ROWS_18, { query: "photosynthesis", exam: "CBSE Class 12" })).toEqual({ hits: [], missedExam: null });
  });

  it("tells V the named exam had nothing before listing where the chapter is", () => {
    const r = findChapters(ROWS_18, { query: "rotational dynamics", exam: "CBSE Class 12" });
    const text = formatChapterHits(r.hits, { missedExam: r.missedExam });
    expect(text.split("\n")[0]).toBe("Nothing matched in CBSE Class 12. It is in these other exams:");
    expect(text).toContain("/questions/mh-hsc-12/physics/rotational-dynamics");
  });
});

// 2026-10-19 study-partner Phase 0: four of seventeen chapter asks got a false "not found".
describe("searchChapters: subtopic names", () => {
  const withSubs = (r: ChapterSearchRow, subtopicNames: string[]): ChapterSearchRow => ({ ...r, subtopicNames });
  const ROWS_19: ChapterSearchRow[] = [
    withSubs(row("ssc-cgl", "SSC CGL", "General Awareness: Economy", "Money, Banking and Public Finance", 72), [
      "Union Budget and Fiscal Policy",
      "Taxation and Public Finance",
      "Inflation and Monetary Policy",
    ]),
    withSubs(row("ssc-cgl", "SSC CGL", "General Awareness: Economy", "Basic Concepts of Economics", 40), ["Demand and Supply"]),
    withSubs(row("mh-hsc-12", "Maharashtra HSC Class 12", "Physics", "Rotational Dynamics", 56), [
      "Moment of Inertia and Radius of Gyration",
      "Rolling Motion",
    ]),
    withSubs(row("mht-cet", "MHT-CET", "Physics", "Rotational Dynamics", 204), ["Moment of Inertia and Radius of Gyration"]),
    withSubs(row("neet", "NEET", "Physics", "Laws of Motion", 200), ["Newton's Second Law"]),
    withSubs(row("neet", "NEET", "Physics", "Work, Energy and Power", 300), ["Work Done by the Laws of Motion"]),
  ];

  // "I want to attempt only budget and taxation pyqs test which was asked in ssc exams"
  it("finds a chapter by the subtopics inside it", () => {
    const hits = searchChapters(ROWS_19, { query: "budget and taxation", exam: "SSC" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Money, Banking and Public Finance"]);
  });

  it("tells V which subtopics matched, on the chapter's line", () => {
    const text = formatChapterHits(searchChapters(ROWS_19, { query: "budget and taxation", exam: "SSC" }));
    expect(text).toContain(
      "- Money, Banking and Public Finance (72 q) /questions/ssc-cgl/general-awareness-economy/money-banking-and-public-finance [has: Union Budget and Fiscal Policy, Taxation and Public Finance]"
    );
  });

  // "Chapter number first rotational dynamics class 12th subject physics ... moment of insertia and radius of gyration"
  it("lets a chapter word and a subtopic phrase find the chapter together", () => {
    const hits = searchChapters(ROWS_19, { query: "rotational dynamics moment of inertia" });
    expect(hits.map((h) => h.examSlug)).toEqual(["mht-cet", "mh-hsc-12"]);
  });

  it("ranks a chapter named for the words above one that only has them in a subtopic", () => {
    const hits = searchChapters(ROWS_19, { query: "laws of motion" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Laws of Motion", "Work, Energy and Power"]);
  });

  it("marks no subtopic when the chapter's own name matched", () => {
    expect(formatChapterHits(searchChapters(ROWS_19, { query: "rotational dynamics", exam: "MHT-CET" }))).not.toContain("[has:");
  });
});

describe("searchChapters: a whole sentence", () => {
  // 2026-10-16, after V was told "MH SSC 10". Every word had to match, and "semester" never would.
  it("finds a chapter whose whole name is in the sentence when no chapter has every word", () => {
    const hits = searchChapters(REAL, {
      query: "I want imp question for my 1st semester exam related to chapter 7 introduction to microbiology science 2",
      exam: "MH SSC 10",
    });
    expect(hits.map((h) => h.chapterName)).toEqual(["Introduction to Microbiology"]);
  });

  it("still finds nothing in a sentence that names no chapter", () => {
    expect(searchChapters(REAL, { query: "how do I study for the exam in less time" })).toEqual([]);
  });

  it("does not fall back when the words already found chapters", () => {
    const hits = searchChapters(REAL, { query: "atoms", exam: "CBSE Class 12" });
    expect(hits.map((h) => h.chapterName)).toEqual(["Atoms"]);
  });
});
