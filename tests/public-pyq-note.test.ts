/**
 * `publicPyqNote` — the redaction that decides whether a question's
 * `pyq_note` may appear on an anonymous-facing surface.
 *
 * WHY IT EXISTS. `pyq_note` is one column doing two unrelated jobs, and only
 * one of them is fit to publish:
 *
 *  - a SITTING IDENTIFIER ("10th May Shift 1", "21 Jan 2026 Shift 1",
 *    "CDS (I) 2017 — English") — load-bearing for a student, because one
 *    MHT-CET month holds 14 distinct papers and the note is the only thing
 *    that says which one this question came from;
 *  - a SOURCE BLURB ("NDA GAT practice — Oswaal 10 Mock Test Papers, Mock
 *    Test 9", "… (Balbharati textbook, Part 2 Geometry)", "NDA Mathematics
 *    mock test 3 (LWS test series)") — which publishes the founding tenant's
 *    name, a third-party publisher's name, or our own derivation method to
 *    anonymous visitors on 317 indexed pages.
 *
 * WHY `question_kind` AND NOT A KEYWORD LIST. A denylist of publisher names
 * under-matches silently the first time a new corpus lands — this project has
 * paid for that failure mode before. Measured on the live bank instead
 * (2026-09-19, 72,206 PUBLIC rows): of 34,851 `pyq` rows, 9 name a source and
 * 0 say "practice"; of 37,355 `practice` rows, 22,019 name a source. The kind
 * axis already separates them, so the rule rides on structure, not on spelling.
 *
 * WHY A LENGTH CAP ON TOP. Two `pyq` classes are still narrative rather than
 * identifying: the CBSE-12 / MH-HSC-12 board notes and 9 Allen reprints. After
 * the bracket strip, `pyq` notes are either <= 38 chars (30,332 rows, every one
 * a sitting id) or >= 93 (4,519 rows, every one narrative) — NOTHING lands in
 * between. The cap sits mid-gap, so it is not knife-edge, and
 * `npm run audit:provenance` reports anything that ever lands in the gap.
 */
import { describe, it, expect } from "vitest";
import {
  MAX_PUBLIC_PYQ_NOTE_LEN,
  publicPyqNote,
} from "@/lib/questions/publicPyqNote";

describe("publicPyqNote", () => {
  describe("practice questions — the note never publishes", () => {
    // 37,355 PUBLIC rows. This single rule removes every Oswaal (1,396),
    // Balbharati (11,330) and LWS (7,359) mention from the public surfaces.
    it.each([
      ["NDA GAT practice — Oswaal 10 Mock Test Papers, Mock Test 9"],
      [
        "Maharashtra State Board (Class 9) — Triangles (Balbharati textbook, Part 2 Geometry)",
      ],
      ["NDA Mathematics mock test 3 (LWS test series)"],
      ["Cadetprep concept-practice worksheet — Circles"],
      ["CC Botany HT — ParikshaGruh 13159"],
      [
        'JEE Maths practice - Allen "Compound Angles" module exercise (Nurture course)',
      ],
    ])("drops %j", (note) => {
      expect(publicPyqNote(note, "practice")).toBeNull();
    });

    // `CC Botany HT — ParikshaGruh 13159` is 33 chars and
    // `CDS (I) 2017 — Elementary Mathematics` is 37, so the two populations
    // OVERLAP on length. Length alone cannot do this job; kind is required.
    it("drops a SHORT practice note that a length-only rule would publish", () => {
      const short = "CC Botany HT — ParikshaGruh 13159";
      expect(short.length).toBeLessThan(MAX_PUBLIC_PYQ_NOTE_LEN);
      expect(publicPyqNote(short, "practice")).toBeNull();
    });
  });

  describe("pyq questions — a sitting identifier publishes verbatim", () => {
    // Every one of these is drawn from the live bank's surviving set.
    it.each([
      ["10th May Shift 1"],
      ["21 Jan 2026 Shift 1"],
      ["14 June 2022"],
      ["19 April Shift II"],
      ["CDS (I) 2017 — Elementary Mathematics"],
      ["NEET (UG) 2023 — 07 May 2023"],
      ["Re-NEET (UG) 2024 — 23 Jun 2024"],
      ["2021 Compilation Paper 13"],
      ["NDA 1"],
      ["Paper 26"],
    ])("keeps %j", (note) => {
      expect(publicPyqNote(note, "pyq")).toBe(note);
    });
  });

  describe("pyq questions — a bracketed suffix is stripped", () => {
    // 2,280 CDS General Knowledge rows. The paragraph tells a student on a
    // public page that our answers are unofficial; the session label in front
    // of it is exactly what they need. It is structurally delimited, so one
    // rule removes it without touching the label.
    it("strips the CDS no-official-key disclosure and keeps the session", () => {
      expect(
        publicPyqNote(
          "CDS (II) 2025 — General Knowledge [No official answer key is published " +
            "for this paper. The answer and solution here were derived independently " +
            "by two blind passes and, where those disagreed, adjudicated by hand " +
            "against the printed page.]",
          "pyq"
        )
      ).toBe("CDS (II) 2025 — General Knowledge");
    });

    // The strip is anchored to the END. A bracket mid-note is part of the
    // label and must survive, or a future "Paper [Set A] Shift 2" loses its
    // middle.
    it("leaves a bracket that is not the trailing segment alone", () => {
      expect(publicPyqNote("Paper [Set A] Shift 2", "pyq")).toBe(
        "Paper [Set A] Shift 2"
      );
    });

    it("returns null when the bracket was the whole note", () => {
      expect(publicPyqNote("[derived by two blind passes]", "pyq")).toBeNull();
    });
  });

  describe("pyq questions — narrative is dropped by the length cap", () => {
    // 4,519 rows. These are genuine PYQs whose note is an ingestion narrative
    // rather than an identifier, so the kind axis cannot catch them.
    it.each([
      [
        "CBSE Class 12 Mathematics (041) board examination 2022, question paper 65/1/1. " +
          "Official CBSE question paper; answer cross-checked against CBSE's published " +
          "marking scheme for the same paper code.",
      ],
      [
        "Maharashtra HSC Class 12 Board PYQ — Rotational Dynamics (chapterwise " +
          "compilation, March 2016-February 2025; no 2021, exams cancelled)",
      ],
      [
        'JEE Main 2012 past-year question, as reprinted in Allen\'s "Compound Angles" ' +
          "module exercise. The booklet prints the year only - the session and shift " +
          "are not stated in the source.",
      ],
    ])("drops narrative over the cap", (note) => {
      expect(note.length).toBeGreaterThan(MAX_PUBLIC_PYQ_NOTE_LEN);
      expect(publicPyqNote(note, "pyq")).toBeNull();
    });

    it("measures the cap AFTER the bracket strip, not before", () => {
      // 237 chars raw, 32 once the disclosure is removed. Measuring first
      // would silently drop all 2,280 CDS GK sitting labels.
      const raw =
        "CDS (I) 2025 — General Knowledge [No official answer key is published for " +
        "this paper. The answer and solution here were derived independently by two " +
        "blind passes and, where those disagreed, adjudicated by hand against the " +
        "printed page.]";
      expect(raw.length).toBeGreaterThan(MAX_PUBLIC_PYQ_NOTE_LEN);
      expect(publicPyqNote(raw, "pyq")).toBe("CDS (I) 2025 — General Knowledge");
    });

    it("keeps a note sitting exactly on the cap", () => {
      const exact = "x".repeat(MAX_PUBLIC_PYQ_NOTE_LEN);
      expect(publicPyqNote(exact, "pyq")).toBe(exact);
      expect(publicPyqNote(exact + "x", "pyq")).toBeNull();
    });
  });

  describe("fails closed", () => {
    // An UNKNOWN kind must redact. The whole point is that a caller which has
    // not plumbed `question_kind` through cannot leak by omission — the quiet
    // default has to be the safe one, never the publishing one.
    it.each([[null], [undefined]])("drops when kind is %j", (kind) => {
      expect(publicPyqNote("10th May Shift 1", kind)).toBeNull();
    });

    it.each([[null], [undefined], [""], ["   "]])(
      "returns null for an absent note (%j)",
      (note) => {
        expect(publicPyqNote(note, "pyq")).toBeNull();
      }
    );

    it("trims surrounding whitespace rather than publishing it", () => {
      expect(publicPyqNote("  10th May Shift 1  ", "pyq")).toBe(
        "10th May Shift 1"
      );
    });
  });

  it("is idempotent — redacting an already-redacted note changes nothing", () => {
    // The value flows through the read layer once, but a caller re-deriving it
    // must not get a different answer the second time.
    const once = publicPyqNote("CDS (I) 2025 — General Knowledge [derived]", "pyq");
    expect(once).not.toBeNull();
    expect(publicPyqNote(once, "pyq")).toBe(once);
  });
});
