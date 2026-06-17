import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import { GET as learnGET } from "@/app/go/learn/route";
import { GET as practiceGET } from "@/app/go/practice/route";

const sampleChapter = NOTES_CHAPTERS[0]; // Maths (Statistics)
const sampleSubtopicSlug = sampleChapter.slugs[0];
const sampleConceptSlug =
  sampleChapter.notes[sampleSubtopicSlug].concepts[0].slug;
const sampleSubtopicName = sampleChapter.notes[sampleSubtopicSlug].subtopicName;

// A non-Maths noted chapter (Physics/Chem/Bio/Geo) → corpus should be PYQ.
const nonMaths = NOTES_CHAPTERS.find((c) => c.subjectName !== "Mathematics")!;
const nonMathsSubtopicSlug = nonMaths.slugs[0];
const nonMathsSubtopicName =
  nonMaths.notes[nonMathsSubtopicSlug].subtopicName;

function makeReq(path: string): NextRequest {
  return new NextRequest(`http://localhost:3000${path}`);
}

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

describe("/go/learn (no DB)", () => {
  it("redirects a known subtopic+concept to the notes anchor", () => {
    const res = learnGET(
      makeReq(
        `/go/learn?subtopic=${sampleSubtopicSlug}&concept=${sampleConceptSlug}`
      )
    );
    expect(res.status).toBe(307);
    const loc = res.headers.get("location") ?? "";
    expect(loc).toContain(
      `/notes/${sampleChapter.subjectRoute}/${sampleChapter.chapterSlug}/${sampleSubtopicSlug}#${sampleConceptSlug}`
    );
  });

  it("falls back to the /notes index for an unknown subtopic", () => {
    const res = learnGET(makeReq("/go/learn?subtopic=not-real"));
    expect(res.status).toBe(307);
    expect(new URL(res.headers.get("location") ?? "").pathname).toBe("/notes");
  });

  it("resolves by DB name + chapter (the exam path)", () => {
    const res = learnGET(
      makeReq(
        `/go/learn?subtopic=${encodeURIComponent(sampleSubtopicName)}&chapter=${encodeURIComponent(sampleChapter.chapter.chapterName)}`
      )
    );
    expect(res.status).toBe(307);
    expect(res.headers.get("location") ?? "").toContain(
      `/notes/${sampleChapter.subjectRoute}/${sampleChapter.chapterSlug}/${sampleSubtopicSlug}`
    );
  });
});

describe.skipIf(!HAS_ENV)("/go/practice (DB-backed)", () => {
  it("redirects a known subtopic to a /browse practice filter", async () => {
    const res = await practiceGET(
      makeReq(`/go/practice?subtopic=${sampleSubtopicSlug}`)
    );
    expect(res.status).toBe(307);
    const loc = new URL(res.headers.get("location") ?? "");
    expect(loc.pathname).toBe("/browse");
    expect(loc.searchParams.get("kind")).toBe("practice");
    // examId/subjectId resolved from the live taxonomy.
    expect(loc.searchParams.get("examId")).toBeTruthy();
    expect(loc.searchParams.get("subjectId")).toBeTruthy();
  });

  it("falls back to generic practice browse for an unknown subtopic", async () => {
    const res = await practiceGET(makeReq("/go/practice?subtopic=not-real"));
    expect(res.status).toBe(307);
    const loc = new URL(res.headers.get("location") ?? "");
    expect(loc.pathname).toBe("/browse");
    expect(loc.searchParams.get("kind")).toBe("practice");
  });

  it("NAME mode: Maths subject resolves to the practice bank", async () => {
    const res = await practiceGET(
      makeReq(
        `/go/practice?exam=NDA&subject=Maths&chapter=${encodeURIComponent(sampleChapter.chapter.chapterName)}&subtopic=${encodeURIComponent(sampleSubtopicName)}`
      )
    );
    expect(res.status).toBe(307);
    const loc = new URL(res.headers.get("location") ?? "");
    expect(loc.pathname).toBe("/browse");
    expect(loc.searchParams.get("kind")).toBe("practice");
    expect(loc.searchParams.get("subtopicIds")).toBeTruthy();
  });

  it("NAME mode: a non-Maths subject resolves to the PYQ bank (no kind=practice)", async () => {
    const res = await practiceGET(
      makeReq(
        `/go/practice?exam=NDA&subject=${encodeURIComponent(nonMaths.subjectName)}&chapter=${encodeURIComponent(nonMaths.chapter.chapterName)}&subtopic=${encodeURIComponent(nonMathsSubtopicName)}`
      )
    );
    expect(res.status).toBe(307);
    const loc = new URL(res.headers.get("location") ?? "");
    expect(loc.pathname).toBe("/browse");
    expect(loc.searchParams.get("kind")).toBeNull(); // pyq default → omitted
    expect(loc.searchParams.get("subtopicIds")).toBeTruthy();
  });
});
