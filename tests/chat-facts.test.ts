import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathsInReply } from "@/lib/chat/replyLinks";
import {
  buildExamFacts,
  buildPlanFacts,
  buildFreeFacts,
  NAV_FACTS,
  buildSystemPrompt,
  buildSystemTail,
  buildGuideFacts,
  GUIDE_FACTS,
  examFactFromEntry,
  buildNotesFacts,
  type ChatExamFact,
  type ChatPlanFact,
} from "@/lib/chat/facts";
import { GUIDE_CATALOG } from "@/lib/guide/guideCatalog";
import { ABUSE_REPLY } from "@/lib/chat/abuse";
import { NOT_UNDERSTOOD } from "@/lib/chat/understood";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { getNotesExamGroups } from "@/lib/notes/notesNav";

const EM_DASH = String.fromCharCode(0x2014);

describe("buildExamFacts", () => {
  const exams: ChatExamFact[] = [
    { slug: "nda", displayName: "NDA", tier: "senior", hasMocks: true, boardExam: false, practiceOnly: false, noPublicContent: false },
    { slug: "mh-ssc-10", displayName: "MH State Board Class 10", tier: "school", hasMocks: false, boardExam: true, practiceOnly: false, noPublicContent: false },
    { displayName: "Foundation Course", tier: "school", hasMocks: false, boardExam: false, practiceOnly: true, noPublicContent: false },
    { displayName: "Not Yet Live", tier: "graduate", hasMocks: false, boardExam: false, practiceOnly: false, noPublicContent: true },
  ];

  it("lists a live exam by its display name", () => {
    const facts = buildExamFacts(exams);
    expect(facts.some((f) => f.includes("NDA"))).toBe(true);
  });

  it("mentions mocks only for an exam that has them", () => {
    const facts = buildExamFacts(exams);
    const ndaLine = facts.find((f) => f.startsWith("NDA"));
    expect(ndaLine).toMatch(/mock/i);
    const boardLine = facts.find((f) => f.startsWith("MH State Board Class 10"));
    expect(boardLine).not.toMatch(/mock/i);
  });

  // 2026-10-18: a student asked for "all chapters" five times and V listed names every time, no link.
  it("gives each exam its page that lists every chapter, so V can link it for \"all\"", () => {
    const facts = buildExamFacts(exams);
    expect(facts.find((f) => f.startsWith("NDA"))).toContain("every chapter listed at /questions");
    expect(facts.find((f) => f.startsWith("MH State Board Class 10"))).toContain("every chapter listed at /exams/mh-ssc-10");
  });

  it("flags a board exam as pointing to /board", () => {
    const facts = buildExamFacts(exams);
    const boardLine = facts.find((f) => f.startsWith("MH State Board Class 10"));
    expect(boardLine).toContain("/board");
  });

  it("flags a practice-only exam as having no past-year papers", () => {
    const facts = buildExamFacts(exams);
    const line = facts.find((f) => f.startsWith("Foundation Course"));
    expect(line).toMatch(/practice/i);
  });

  it("says no past-year papers only when the exam really has none", () => {
    const facts = buildExamFacts([
      { displayName: "Foundation Course", tier: "school", hasMocks: false, boardExam: false, practiceOnly: true, hasPastYearQuestions: false, noPublicContent: false },
      { displayName: "CBSE Class 10", tier: "school", hasMocks: true, boardExam: true, practiceOnly: true, hasPastYearQuestions: true, noPublicContent: false },
      { displayName: "Unknown", tier: "school", hasMocks: false, boardExam: false, practiceOnly: true, noPublicContent: false },
    ]);
    expect(facts[0]).toContain("no past-year papers");
    expect(facts[1]).toContain("past-year board papers and textbook practice questions");
    expect(facts[1]).not.toContain("no past-year");
    // A failed count read must not produce the claim either way.
    expect(facts[2]).not.toContain("past-year");
  });

  it("EXCLUDES an exam with no public content — it must never be recommended", () => {
    const facts = buildExamFacts(exams);
    expect(facts.some((f) => f.includes("Not Yet Live"))).toBe(false);
  });

  // 2026-10-20: four students in five days asked for Hindi or Marathi questions and V said it was not sure.
  it("names the second language an exam's questions are printed in", () => {
    const facts = buildExamFacts([
      { displayName: "MPSC Group B & C", tier: "graduate", hasMocks: true, boardExam: false, practiceOnly: false, noPublicContent: false, secondLang: "mr" },
      { displayName: "SSC CGL", tier: "graduate", hasMocks: true, boardExam: false, practiceOnly: false, noPublicContent: false, secondLang: "hi" },
      { displayName: "NEET", tier: "senior", hasMocks: true, boardExam: false, practiceOnly: false, noPublicContent: false },
    ]);
    expect(facts[0]).toContain("questions in English and Marathi");
    expect(facts[1]).toContain("questions in English and Hindi");
    expect(facts[2]).not.toMatch(/Marathi|Hindi/);
  });
});

/**
 * V's exam facts come from EXAM_REGISTRY, so they follow every exam added or
 * changed, on every push (owner, 2026-10-20: "keep updating V's fact list as
 * exams get added"). This pins the derivation to the registry itself.
 */
describe("V's facts follow the exam registry", () => {
  const facts = buildExamFacts(EXAM_REGISTRY.map((e) => examFactFromEntry(e, null)));

  it("has one line for every exam with public content, and none for the rest", () => {
    for (const e of EXAM_REGISTRY) {
      const line = facts.find((f) => f.startsWith(`${e.displayName}:`));
      if (e.noPublicContent) expect(line, e.slug).toBeUndefined();
      else expect(line, e.slug).toBeDefined();
    }
  });

  it("names Marathi or Hindi exactly where the site prints a second language", () => {
    for (const e of EXAM_REGISTRY) {
      if (e.noPublicContent) continue;
      const line = facts.find((f) => f.startsWith(`${e.displayName}:`))!;
      const lang = examFactFromEntry(e, null).secondLang;
      expect(Boolean(lang), e.slug).toBe(e.bilingual === true);
      if (lang) expect(line, e.slug).toContain(`English and ${lang === "hi" ? "Hindi" : "Marathi"}`);
      else expect(line, e.slug).not.toMatch(/questions in English and/);
    }
  });

  it("tells V that other exams are English only, so it can say so plainly", () => {
    const p = buildSystemPrompt({ exams: facts, plans: [], bankTotal: 1, nav: NAV_FACTS });
    expect(p).toMatch(/English only/);
  });
});

describe("buildPlanFacts", () => {
  const plans: ChatPlanFact[] = [
    { label: "Student Mock Pass", amountPaise: 9900, durationDays: 182, scope: "mocks" },
    { label: "Teacher Pass", amountPaise: 49900, durationDays: 365, scope: "teacher" },
    { label: "Lifetime Pass", amountPaise: 199900, durationDays: null, scope: "teacher" },
  ];

  it("formats price in rupees", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("₹99"))).toBe(true);
  });

  it("formats a 182-day plan as 6 months", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("6 months"))).toBe(true);
  });

  it("formats a null duration as lifetime", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("lifetime"))).toBe(true);
  });

  it("names what scope each plan unlocks", () => {
    const facts = buildPlanFacts(plans);
    expect(facts.some((f) => f.includes("Teacher Pass") && /teacher/i.test(f))).toBe(true);
  });

  it("returns an empty list when nothing is on sale", () => {
    expect(buildPlanFacts([])).toEqual([]);
  });

  it("carries the pass's own perks, so V quotes what /pricing says", () => {
    const facts = buildPlanFacts([
      { label: "Premium Pass", amountPaise: 9900, durationDays: 182, scope: "mocks", perks: ["Unlimited mocks", "PDF downloads"] },
    ]);
    expect(facts[0]).toContain("Unlimited mocks");
    expect(facts[0]).toContain("PDF downloads");
  });
});

describe("buildFreeFacts", () => {
  it("states each free limit that is on", () => {
    const facts = buildFreeFacts({ reveals: 30, drill: 15, saves: 100, mocks: 3, chapterTests: 5, projectionDays: 7, papersPerDay: 1 });
    expect(facts.some((f) => f.includes("30") && /answer/i.test(f))).toBe(true);
    expect(facts.some((f) => f.includes("3") && /mock/i.test(f))).toBe(true);
  });

  it("calls a limit that is off unlimited, never a number", () => {
    const facts = buildFreeFacts({ reveals: null, drill: null, saves: null, mocks: null, chapterTests: null, projectionDays: null, papersPerDay: null });
    expect(facts.join(" ")).not.toMatch(/\bnull\b/);
    expect(facts.some((f) => /mock/i.test(f) && /unlimited|no limit/i.test(f))).toBe(true);
  });

  it("claims nothing when the limits could not be read", () => {
    expect(buildFreeFacts(null)).toEqual([]);
  });
});

describe("NAV_FACTS", () => {
  it("is a non-empty list of static route pointers", () => {
    expect(NAV_FACTS.length).toBeGreaterThan(0);
    expect(NAV_FACTS.some((f) => f.includes("/browse"))).toBe(true);
    expect(NAV_FACTS.some((f) => f.includes("/mock"))).toBe(true);
  });

  it("names the pages students asked V for", () => {
    const all = NAV_FACTS.join(" ");
    for (const path of ["/pricing", "/question-papers", "/board", "/guide", "/notes", "/signup"]) {
      expect(all).toContain(path);
    }
    expect(all).toContain("Build a practice test");
  });

  // 2026-10-21: a student whose ₹99 payment failed asked V how to contact us, and V said it had
  // no contact to share, then sent her to /pricing, which has none. /about has the contact form.
  it("names /about as the way to reach the team about payment or account problems", () => {
    const line = NAV_FACTS.find((f) => f.startsWith("/about:"));
    expect(line).toBeDefined();
    expect(line).toMatch(/contact/i);
    expect(line).toMatch(/payment/i);
  });

  it("names the student's own progress pages, so V can link them (2026-10-16)", () => {
    const all = NAV_FACTS.join(" ");
    expect(all).toContain("/performance");
    expect(all).toContain("/me/map");
  });

  it("names only pages that exist, since V links them (an /exams index never did)", () => {
    const paths = pathsInReply(NAV_FACTS.join(" "));
    expect(paths.length).toBeGreaterThan(5);
    for (const path of paths) {
      expect(existsSync(join(process.cwd(), "src/app", path, "page.tsx")), path).toBe(true);
    }
  });

  it("uses no em dashes, since V copies the style it is shown", () => {
    expect(NAV_FACTS.join(" ")).not.toContain(EM_DASH);
  });
});

// 2026-10-19: asked for NDA GAT weightage, V said "I don't have weightage data"; the guides have it.
/**
 * "where are NDA maths notes?" (owner, 2026-10-15; raised again 2026-10-20): V knew only /notes and
 * told the owner it could not find NDA Maths. One line per exam's notes hub, naming each subject's
 * page, built from the notes nav so a new notes subject reaches V without a code change.
 */
describe("buildNotesFacts", () => {
  const groups = getNotesExamGroups();
  const facts = buildNotesFacts(groups);

  it("gives each exam's notes hub and every subject's notes page", () => {
    const nda = facts.find((f) => f.startsWith("/notes/nda:"));
    expect(nda).toContain("NDA Maths at /notes/nda-maths");
    for (const g of groups) {
      const line = facts.find((f) => f.startsWith(`/notes/${g.slug}:`));
      expect(line, g.slug).toBeDefined();
      for (const s of g.subjects) expect(line, s.subjectRoute).toContain(`/notes/${s.subjectRoute}`);
    }
  });

  it("names only notes pages that exist", () => {
    // A subject's page is hand-written; an exam hub is the shared /notes/[examSlug] route.
    const hubs = new Set(groups.map((g) => `/notes/${g.slug}`));
    for (const path of pathsInReply(facts.join(" "))) {
      const page = hubs.has(path) ? "src/app/notes/[examSlug]/page.tsx" : join("src/app", path, "page.tsx");
      expect(existsSync(join(process.cwd(), page)), path).toBe(true);
    }
  });

  it("reaches the prompt with a rule to link them", () => {
    const p = buildSystemPrompt({ exams: [], plans: [], bankTotal: 1, nav: NAV_FACTS, notes: facts });
    expect(p).toContain("/notes/nda-maths");
    expect(p).toMatch(/notes.*NOTES below/i);
  });
});

describe("buildGuideFacts", () => {
  const catalog = {
    nda: [{ href: "/guide/nda-physics", exam: "NDA PART B Physics" }],
    "mht-cet": [{ href: "/guide/mht-cet-physics", exam: "MHT-CET Physics" }],
  };

  it("gives each subject guide one line, its page first", () => {
    expect(buildGuideFacts(catalog)).toEqual([
      "/guide/nda-physics: NDA PART B Physics, which chapters carry the most marks and what to do first.",
      "/guide/mht-cet-physics: MHT-CET Physics, which chapters carry the most marks and what to do first.",
    ]);
  });

  it("covers every guide in the catalogue, so a new guide reaches V without a code change", () => {
    const hrefs = Object.values(GUIDE_CATALOG).flatMap((cards) => (cards ?? []).map((c) => c.href));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(GUIDE_FACTS.some((line) => line.startsWith(`${href}: `))).toBe(true);
  });

  it("uses no em dashes, since V copies the style it is shown", () => {
    expect(GUIDE_FACTS.join(" ")).not.toContain(EM_DASH);
  });
});

describe("buildSystemPrompt", () => {
  const base = {
    exams: ["NDA: senior stage, has mocks."],
    plans: ["Teacher Pass: ₹499 for 1 year (unlocks teacher)."],
    bankTotal: 78774,
    nav: NAV_FACTS,
  };

  it("carries every fact category into the prompt", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("NDA: senior stage, has mocks.");
    expect(p).toContain("Teacher Pass: ₹499 for 1 year (unlocks teacher).");
    expect(p).toContain("78774");
    expect(p).toContain("/browse");
  });

  it("names the assistant V", () => {
    expect(buildSystemPrompt(base)).toContain("V");
  });

  it("instructs the model to answer only from the given facts", () => {
    const p = buildSystemPrompt(base).toLowerCase();
    expect(p).toMatch(/only|solely|strictly/);
  });

  it("instructs the model to refuse explaining a specific PYQ", () => {
    const p = buildSystemPrompt(base).toLowerCase();
    expect(p).toContain("explain");
  });

  it("tells V to use the chapter search and to link only pages it was given", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("find_chapters");
    expect(p.toLowerCase()).toMatch(/never (make up|invent)/);
  });

  // 2026-10-20 (owner): "20+" is right however exams are counted; the old button's "28" counted
  // every registry row, and the AI then told a student that number "was off".
  it("says 20+ exams, never an exact count", () => {
    expect(buildSystemPrompt(base)).toMatch(/20\+ exams/);
  });

  // 2026-10-20: "REMIND OF DOING Q 44 RETRY". V can name the question just opened and save it.
  it("sends 'this question', 'Q 44' and 'remind me' to the student's own recent questions and /saved", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("recent_questions");
    expect(p).toContain("save_question");
    expect(NAV_FACTS.join(" ")).toContain("/saved");
  });

  it("names the Plan my week button beside the test builder", () => {
    expect(NAV_FACTS.join("\n")).toContain("Plan my week");
  });

  it("gives abuse the same calm line the route uses, never an answer back (owner, 2026-10-20)", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain(ABUSE_REPLY);
    expect(p).toMatch(/abus/i);
  });

  it("covers what students actually typed: tests, future papers, buying, language", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("Build a practice test");
    expect(p).toMatch(/2027|future paper|upcoming paper/i);
    expect(p).toContain("/pricing");
    expect(p).toMatch(/Hindi|Hinglish/);
  });

  // 2026-10-21: "My 99 rupees for premium pass already gone". V took three replies to say anything
  // useful and never gave a way to reach us. Its first reply now gives the contact page and what to send.
  describe("payment problems", () => {
    const p = buildSystemPrompt(base);
    const rule = p.split("\n").find((l) => /paid|payment/i.test(l) && l.includes("/about")) ?? "";

    it("has a rule sending payment trouble to /about", () => {
      expect(rule).not.toBe("");
    });

    it("asks for the payment ID or UPI reference and the email they paid with", () => {
      expect(rule).toMatch(/payment ID/i);
      expect(rule).toMatch(/UPI/);
      expect(rule).toMatch(/email/i);
    });

    it("says a failed payment comes back from the bank on its own", () => {
      expect(rule).toMatch(/bank/i);
      expect(rule).toMatch(/working days/i);
    });

    it("does not ask which exam they study first", () => {
      expect(rule).toMatch(/not ask (which|what) exam/i);
    });

    it("treats a greeting on /pricing as about the pass, not as 'which exam?'", () => {
      const greeting = p.split("\n").find((l) => /greetings/i.test(l)) ?? "";
      expect(greeting).toContain("/pricing");
      expect(greeting).toMatch(/pass/i);
    });
  });

  it("states the free limits when given", () => {
    const p = buildSystemPrompt({ ...base, free: ["Answers: 30 a day free when signed in."] });
    expect(p).toContain("Answers: 30 a day free when signed in.");
  });

  it("keeps the page and the signed-out note out of the fixed instructions, which are cached", () => {
    const p = buildSystemPrompt(base);
    expect(p).not.toContain("The student is on the page");
    expect(p).not.toMatch(/only this one reply/i);
  });

  it("tells V it can see the earlier messages of this chat", () => {
    expect(buildSystemPrompt(base).toLowerCase()).toContain("earlier messages");
  });

  it("tells V we keep no chapter numbers, so it searches by the chapter's name", () => {
    const p = buildSystemPrompt(base);
    // Worded without "stored" since 2026-10-23: V repeats our words to students.
    expect(p).toMatch(/We do not keep chapter numbers/);
    expect(p).toContain("Electric Charges and Fields");
  });

  it("lists the subject guides and has V link the subject's own guide for strategy questions", () => {
    const p = buildSystemPrompt({ ...base, guides: ["/guide/nda-physics: NDA PART B Physics, which chapters carry the most marks and what to do first."] });
    expect(p).toMatch(/STRATEGY GUIDES\n\/guide\/nda-physics: NDA PART B Physics/);
    expect(p).toMatch(/subject's guide from STRATEGY GUIDES/);
    expect(p).toMatch(/never say you have no weightage/i);
  });

  // 2026-10-19 study-partner Phase 2: weightage comes from the bank's past papers, quoted not invented.
  it("has V read weightage from exam_strategy and quote only its numbers", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/1\. Answer ONLY from the facts below and from what the find_chapters, my_progress, exam_strategy and recent_questions tools return/);
    expect(p).toMatch(/2\. [^\n]*returned by find_chapters or exam_strategy/);
    expect(p).toMatch(/5a\. [^\n]*call exam_strategy/);
    expect(p).toMatch(/5a\. [^\n]*only the percentages it returns/);
    expect(p).toMatch(/5a\. [^\n]*past papers in our bank/);
  });

  // 2026-10-19 replay: V wrote "[Ray Optics](/questions/...)" once the tool gave it several pages.
  it("tells V to write a page as the bare path, never as a markdown link", () => {
    expect(buildSystemPrompt(base)).toMatch(/2\. [^\n]*never \[text\]\(path\)\. Use ONLY/);
  });

  // 2026-10-19 study-partner Phase 3: "plan my week" / "give a timetable" get a saved plan inside V.
  it("has V plan the week with plan_week and read it back with my_plan, while plans are switched on", () => {
    const p = buildSystemPrompt({ ...base, planEnabled: true });
    expect(p).toMatch(/8a\. [^\n]*(timetable|plan)[^\n]*call plan_week/);
    expect(p).toMatch(/8a\. [^\n]*exam date[^\n]*once/);
    expect(p).toMatch(/8a\. [^\n]*call my_plan/);
    expect(p).toMatch(/1\. Answer ONLY from the facts below and from what the find_chapters, my_progress, exam_strategy, recent_questions, plan_week and my_plan tools return/);
    expect(p).toMatch(/2\. [^\n]*returned by find_chapters, exam_strategy, plan_week or my_plan/);
  });

  // 2026-10-19 (migration 0170): the owner's switch. Off, V is told nothing about plans.
  it("says nothing of plans while they are switched off", () => {
    const p = buildSystemPrompt(base);
    expect(p).not.toContain("plan_week");
    expect(p).not.toContain("my_plan");
    expect(p).not.toMatch(/^8a\./m);
  });

  it("answers 'what comes in 2027' with the chapters asked every year", () => {
    expect(buildSystemPrompt(base)).toMatch(/5\. Nobody knows[^\n]*call exam_strategy[^\n]*asked in every one/);
  });

  // 2026-10-19 check: V told a student to pick two subtopics in the builder, which picks whole chapters.
  it("tells V the practice-test builder picks whole chapters, not subtopics", () => {
    expect(buildSystemPrompt(base)).toMatch(/whole chapters \(up to 5\), not subtopics/);
  });

  // 2026-10-19 study-partner Phase 1: with explanations on, V explains from the stored solution only.
  it("keeps the no-solving rule while explanations are off", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/you do not solve or explain questions/);
    expect(p).not.toContain("explain_question");
  });

  // Owner, 2026-10-20: a tap on Ask V already says what they want, so V explains without asking
  // "Want a hint or the full solution?", gives a hint only when asked, and shows the similar question
  // as a card rather than asking whether they want one.
  it("with explanations on, has V explain straight away from the stored solution, and never doubt the key", () => {
    const p = buildSystemPrompt({ ...base, explainEnabled: true });
    expect(p).not.toMatch(/you do not solve or explain questions/);
    expect(p).not.toMatch(/Want a hint or the full solution/);
    expect(p).toMatch(/hint only when they ask/i);
    expect(p).toMatch(/do not ask whether they want/i);
    expect(p).toMatch(/get_question/);
    expect(p).toMatch(/explain_question/);
    expect(p).toMatch(/Explain only from the solution it returns/);
    // 2026-10-23 (owner: "why not just soln?"): V repeated our word "stored" in 39 of 218 replies.
    expect(p).toMatch(/Call it "the solution" or "the answer", never "stored"/);
    expect(p).not.toMatch(/stored (solution|answer)/i);
    expect(p).toMatch(/Never work out your own answer/);
    expect(p).toMatch(/tap Report on the question/);
    expect(p).toMatch(/similar_question/);
    expect(p).toMatch(/find_question/);
    // 2026-10-21 (owner): "A similar question is below to try" was said after every explanation.
    expect(p).not.toMatch(/similar one is below to try/);
    expect(p).not.toMatch(/shown under your reply/);
    expect(p).toMatch(/Answer only what they asked/);
    expect(p).toMatch(/never offer one yourself/);
    // 2026-10-23: "Did you understand?" No sends NOT_UNDERSTOOD; the next explanation must be simpler, not the same.
    expect(p).toContain(`"${NOT_UNDERSTOOD}"`);
    expect(p).toMatch(/explain it again more simply/);
    expect(p).toMatch(/up to 8 short lines/);
    // The chat window draws \( ... \) as maths; a template string eats a single backslash.
    expect(p).toContain("Write maths inside \\( \\).");
  });

  // V_SPEC.md step 2 (owner, 2026-10-22): concepts are explained from our bank's model answers, then
  // our notes, and only then from V's own knowledge. No fixed opening line since 2026-10-23 (owner: it adds no value).
  it("with explanations on, has V explain a concept from explain_concept, its own knowledge only when that finds nothing", () => {
    const p = buildSystemPrompt({ ...base, explainEnabled: true });
    expect(p).toMatch(/7a\. Concepts/);
    expect(p).toMatch(/call explain_concept/);
    expect(p).toMatch(/If it says nothing matched, you may give a short general explanation/);
    expect(p).not.toMatch(/not from our question bank/i);
    expect(p).not.toMatch(/Start it exactly with/);
    expect(p).toMatch(/never solve a new numeric problem/i);
    expect(p).toMatch(/search failed/i);
    // Links and the facts-only rule name the tool, so its pages are usable.
    expect(p).toMatch(/returned by [^.]*explain_concept/);
    expect(p).toMatch(/rules 7 and 7a/);
    // Baseline run, 2026-10-22: a pasted written question went to find_question and found nothing;
    // "Coruscate" alone was answered as a greeting.
    expect(p).toMatch(/a written question without options/i);
    expect(p).toMatch(/If find_question finds nothing, call explain_concept/);
    // ... but "atoms" alone is a chapter to find, not a concept: the step 2 run listed three unrelated atom facts.
    expect(p).toMatch(/A single English word to define \("coruscate"\) is a concept \(rule 7a\)/);
    expect(p).toMatch(/a chapter or topic name alone \("atoms", "vectors"\) is a request for that chapter \(rule 3\)/);
  });

  it("with explanations off, has no concept rule and no own-knowledge permission", () => {
    const p = buildSystemPrompt(base);
    expect(p).not.toMatch(/explain_concept/);
    expect(p).not.toMatch(/general explanation/i);
  });

  // 2026-10-21 (owner): V said "I need to correct my earlier replies" about answers on ANOTHER question.
  it("tells V a remembered message may be about another question, and never to apologise for it", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/\[About question <id>\]/);
    expect(p).toMatch(/answer about the one named at the end unless they point back/i);
    expect(p).toMatch(/Never correct, take back or apologise for an earlier reply about another question/);
  });

  it("tells V a reply to an earlier message is about that message", () => {
    expect(buildSystemPrompt(base)).toMatch(/replying to an earlier exchange[^\n]*is about that exchange/i);
  });

  it("lets V take the exam from the student's profile, which is not a guess", () => {
    expect(buildSystemPrompt(base)).toMatch(/named it, the page shows it, or their profile lists it/);
  });

  // 2026-10-18: V guessed CBSE for "class 12th physics rotational dynamics" (a Maharashtra chapter) and said "not found".
  it("has V never guess the exam, and treat a class alone as no exam", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/never guess the exam/i);
    expect(p).toMatch(/a class alone \("class 12", "12th"\) is not an exam/i);
  });

  it("has V ask which exam, naming the ones found, when a chapter is in several", () => {
    const p = buildSystemPrompt(base);
    expect(p).toMatch(/ask which one they mean, naming those exams/i);
    expect(p).toMatch(/link nothing yet/i);
  });

  it("has V link the exam's every-chapter page when a student asks for all chapters", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("सगळे");
    expect(p).toMatch(/link that exam's every-chapter page/i);
  });

  it("has V list a subject's chapters by name when it knows the subject but not the chapter", () => {
    expect(buildSystemPrompt(base)).toMatch(/list the chapter names/i);
  });

  it("has V read a student's own results with my_progress, growth-first, never against other students", () => {
    const p = buildSystemPrompt(base);
    expect(p).toContain("my_progress");
    expect(p).toMatch(/what went well first/i);
    expect(p).toMatch(/never compare/i);
    expect(p).not.toMatch(/cannot see a student's own account, scores/i);
  });

  it("has V call my_progress for how many questions a student has answered, not only for scores", () => {
    expect(buildSystemPrompt(base)).toMatch(/how many questions they have answered/i);
  });

  it("has no em dashes of its own", () => {
    expect(buildSystemPrompt(base)).not.toContain(EM_DASH);
  });

  it("degrades gracefully with an empty plans list", () => {
    const p = buildSystemPrompt({ ...base, plans: [] });
    expect(p).not.toContain("undefined");
  });
});

describe("buildSystemTail", () => {
  it("tells V the page the student is on, when known", () => {
    expect(buildSystemTail({ page: "/questions/cbse-12/physics/atoms", signedIn: true })).toContain(
      "The student is on the page /questions/cbse-12/physics/atoms"
    );
    expect(buildSystemTail({ page: null, signedIn: true })).not.toContain("The student is on the page");
  });

  // 2026-10-18: a visitor's one question went on "Hii", and the rule made V guess instead of asking.
  it("tells a signed-out visitor's V it has one answer, and may ask back when unclear without using it up", () => {
    const t = buildSystemTail({ page: null, signedIn: false });
    expect(t).toMatch(/one answer/i);
    expect(t).toMatch(/ask one short question back and link nothing/i);
    expect(t).toMatch(/does not use up/i);
    expect(t).not.toMatch(/do not ask them anything back/i);
    expect(t).not.toMatch(/pick the most likely/i);
  });

  // 2026-10-18 replay: "PYQs ke answers 10th ke science part 2" got two chapters picked at random.
  it("has a signed-out visitor who names only a subject get the every-chapter page, not picked chapters", () => {
    expect(buildSystemTail({ page: null, signedIn: false })).toMatch(/subject but no chapter, link that exam's every-chapter page/i);
  });

  it("is empty for a signed-in student on no known page", () => {
    expect(buildSystemTail({ page: null, signedIn: true })).toBe("");
  });

  // 2026-10-19: "pe pyqs 2022 to 2026" on the Solid State page was searched as Physical Education.
  it("tells V the page's chapter and to assume it when the message names none", () => {
    const t = buildSystemTail({
      page: "/board/mh-hsc-12/chemistry/solid-state",
      signedIn: true,
      pageInfo: { examName: "MH HSC 12", subjectName: "Chemistry", chapterName: "Solid State" },
    });
    expect(t).toContain("Solid State (MH HSC 12, Chemistry)");
    expect(t).toMatch(/names no chapter or is unclear, they mean this chapter/i);
  });

  it("tells V the page's exam when the page is about one exam only", () => {
    const t = buildSystemTail({ page: "/exams/mh-ssc-10", signedIn: true, pageInfo: { examName: "MH SSC 10" } });
    expect(t).toMatch(/page is about MH SSC 10/);
    expect(t).not.toMatch(/they mean this chapter/i);
  });

  // 21 of the 27 signed-in students who typed to V had exams on their profile, and V asked anyway.
  it("tells V which question the student tapped Ask V on, and whether they answered it", () => {
    const id = "11111111-1111-4111-8111-111111111111";
    const fresh = buildSystemTail({ page: null, signedIn: true, question: { id, chose: null } });
    expect(fresh).toContain(`The student tapped Ask V on question ${id}.`);
    expect(fresh).toContain("They have not answered it yet.");
    expect(buildSystemTail({ page: null, signedIn: true, question: { id, chose: "C" } })).toContain("They picked (C).");
  });

  it("tells V the student's exams from their profile, page first, asking when more than one fits", () => {
    const t = buildSystemTail({ page: null, signedIn: true, profileExams: ["MHT-CET", "MH HSC 12"] });
    expect(t).toContain("Their exams, from their profile: MHT-CET, MH HSC 12.");
    expect(t).toMatch(/if more than one fits, ask which/i);
    expect(buildSystemTail({ page: null, signedIn: true, profileExams: [] })).toBe("");
  });

  it("has no em dashes of its own", () => {
    expect(buildSystemTail({ page: "/notes", signedIn: false })).not.toContain(EM_DASH);
  });
});
