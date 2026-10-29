import { describe, it, expect } from "vitest";
import {
  INTL_ORIGIN,
  INTL_EXAMS,
  isIntlHost,
  isFormerIntlHost,
  intlExamOfPath,
  intlOriginFor,
  intlHostDecision,
  wwwHostDecision,
  canonicalFor,
  isIntlUrl,
} from "@/lib/sites/intl";
import { EXAM_REGISTRY, PYQVAULT_EXAMS } from "@/lib/exam/examContext";

// intl.pyqvault.com (2026-10-30, NICHE_SITES_SPEC.md "intl.pyqvault.com"):
// international exams live on their own host, and PYQ Vault's www host never
// shows them. These rules decide, per request, which host serves a path.

describe("which exams are international", () => {
  it("IMAT is the first international exam", () => {
    expect(INTL_EXAMS.map((e) => e.slug)).toContain("imat");
  });

  it("PYQ Vault's own list leaves every international exam out, and keeps the rest in order", () => {
    expect(PYQVAULT_EXAMS.some((e) => e.slug === "imat")).toBe(false);
    expect(PYQVAULT_EXAMS.map((e) => e.slug)).toEqual(
      EXAM_REGISTRY.filter((e) => e.site !== "intl").map((e) => e.slug)
    );
    expect(PYQVAULT_EXAMS.length + INTL_EXAMS.length).toBe(EXAM_REGISTRY.length);
  });
});

describe("isIntlHost", () => {
  it("knows the intl host, with or without a port, in any case", () => {
    expect(isIntlHost("intl.pyqvault.com")).toBe(true);
    expect(isIntlHost("INTL.pyqvault.com")).toBe(true);
    expect(isIntlHost("intl.localhost:3000")).toBe(true);
  });

  it("is false for www, the apex, previews, localhost and nothing", () => {
    expect(isIntlHost("www.pyqvault.com")).toBe(false);
    expect(isIntlHost("pyqvault.com")).toBe(false);
    expect(isIntlHost("question-bank-sage.vercel.app")).toBe(false);
    expect(isIntlHost("localhost:3000")).toBe(false);
    expect(isIntlHost(null)).toBe(false);
    expect(isIntlHost("")).toBe(false);
  });

  it("has no former hosts yet; the origin is the live intl host", () => {
    expect(INTL_ORIGIN).toBe("https://intl.pyqvault.com");
    expect(isFormerIntlHost("intl.pyqvault.com")).toBe(false);
  });
});

describe("intlExamOfPath", () => {
  it("names the exam for every URL family that serves IMAT", () => {
    for (const p of [
      "/exams/imat",
      "/notes/imat",
      "/notes/imat-biology",
      "/notes/imat-biology/cell-biology/imat-cb-membranes",
      "/notes/print/imat-physics/kinematics",
      "/formula/imat",
      "/formula/imat/biology/biomolecules-and-enzymes",
      "/mock/exam/imat",
      "/mock/exam/imat/past-papers",
      "/mock/imat-2023",
      "/mock/imat-practice-01/paper",
      "/questions/imat/biology/cell-biology",
    ]) {
      expect(intlExamOfPath(p), p).toBe("imat");
    }
  });

  it("is null for PYQ Vault paths, including look-alikes", () => {
    for (const p of [
      "/",
      "/notes",
      "/notes/nda-maths",
      "/exams/ipmat-indore",
      "/mock/exam/ipmat-indore",
      "/mock/nda-2024-i",
      "/mock/imatx",
      "/notes/imatrix",
      "/formula/imaths",
      "/questions/jee-mains/maths/matrices",
      "/browse",
    ]) {
      expect(intlExamOfPath(p), p).toBeNull();
    }
  });
});

describe("intlOriginFor", () => {
  it("sends production www (and the apex) to the intl origin", () => {
    expect(intlOriginFor("www.pyqvault.com")).toBe(INTL_ORIGIN);
    expect(intlOriginFor("pyqvault.com")).toBe(INTL_ORIGIN);
  });

  it("keeps local development local", () => {
    expect(intlOriginFor("localhost:3000")).toBe("http://intl.localhost:3000");
    expect(intlOriginFor("127.0.0.1:3000")).toBe("http://intl.localhost:3000");
  });

  it("has no intl twin for a preview host, so previews serve every page as-is", () => {
    expect(intlOriginFor("question-bank-git-x.vercel.app")).toBeNull();
  });
});

describe("wwwHostDecision (any host that is not intl)", () => {
  it("moves an IMAT page to intl permanently, keeping path and query", () => {
    expect(wwwHostDecision("www.pyqvault.com", "/notes/imat-biology", "?x=1")).toEqual({
      kind: "redirect",
      url: "https://intl.pyqvault.com/notes/imat-biology?x=1",
      permanent: true,
    });
  });

  it("moves the intl-only pages too", () => {
    expect(wwwHostDecision("www.pyqvault.com", "/intl", "")).toEqual({
      kind: "redirect",
      url: "https://intl.pyqvault.com/",
      permanent: true,
    });
  });

  it("leaves PYQ Vault pages alone", () => {
    expect(wwwHostDecision("www.pyqvault.com", "/notes/nda-maths", "")).toEqual({ kind: "next" });
    expect(wwwHostDecision("www.pyqvault.com", "/", "")).toEqual({ kind: "next" });
  });

  it("redirects to the local intl host in development", () => {
    expect(wwwHostDecision("localhost:3000", "/mock/imat-2023", "")).toEqual({
      kind: "redirect",
      url: "http://intl.localhost:3000/mock/imat-2023",
      permanent: true,
    });
  });

  it("serves IMAT pages as-is on a preview host", () => {
    expect(wwwHostDecision("question-bank-git-x.vercel.app", "/notes/imat", "")).toEqual({ kind: "next" });
  });
});

describe("intlHostDecision (the intl host)", () => {
  it("serves the intl home page at /", () => {
    expect(intlHostDecision("/", "")).toEqual({ kind: "rewrite", path: "/intl" });
  });

  it("serves its own sitemap and robots", () => {
    expect(intlHostDecision("/sitemap.xml", "")).toEqual({ kind: "rewrite", path: "/intl/sitemap.xml" });
    expect(intlHostDecision("/robots.txt", "")).toEqual({ kind: "rewrite", path: "/intl/robots.txt" });
  });

  it("serves international exam pages", () => {
    expect(intlHostDecision("/notes/imat-biology", "")).toEqual({ kind: "next" });
    expect(intlHostDecision("/mock/imat-2023", "")).toEqual({ kind: "next" });
  });

  it("serves the pages both hosts share: sign-in, pass, account, a mock attempt, legal, the bank", () => {
    for (const p of [
      "/login",
      "/signup",
      "/pricing",
      "/account",
      "/account/billing",
      "/mock/attempt/abc",
      "/browse",
      "/saved",
      "/terms",
      "/privacy",
      "/refunds",
      "/contact",
      "/unsubscribe",
      "/intl",
    ]) {
      expect(intlHostDecision(p, ""), p).toEqual({ kind: "next" });
    }
  });

  it("serves static files and Next's own assets", () => {
    for (const p of ["/icon.png", "/icons/mark-96.png", "/favicon.ico", "/manifest.webmanifest", "/_next/data/x.json"]) {
      expect(intlHostDecision(p, ""), p).toEqual({ kind: "next" });
    }
  });

  it("sends a section index to the exam's own page while there is one exam, keeping the query", () => {
    expect(INTL_EXAMS.length).toBe(1);
    expect(intlHostDecision("/notes", "")).toEqual({ kind: "redirect", url: "/notes/imat", permanent: false });
    expect(intlHostDecision("/mock", "?a=1")).toEqual({ kind: "redirect", url: "/mock/exam/imat?a=1", permanent: false });
    expect(intlHostDecision("/formula", "")).toEqual({ kind: "redirect", url: "/formula/imat", permanent: false });
    expect(intlHostDecision("/exams", "")).toEqual({ kind: "redirect", url: "/", permanent: false });
    expect(intlHostDecision("/questions", "")).toEqual({ kind: "redirect", url: "/", permanent: false });
  });

  it("sends a student's PYQ Vault home to the intl home, never to a signed-out www", () => {
    expect(intlHostDecision("/me", "")).toEqual({ kind: "redirect", url: "/", permanent: false });
    expect(intlHostDecision("/welcome", "?next=%2Fmock")).toEqual({ kind: "redirect", url: "/mock", permanent: false });
    expect(intlHostDecision("/welcome", "?next=https%3A%2F%2Fevil.example")).toEqual({
      kind: "redirect",
      url: "/",
      permanent: false,
    });
  });

  it("sends every PYQ Vault page to www permanently, so no Indian exam is ever shown on intl", () => {
    expect(intlHostDecision("/notes/nda-maths", "?q=1")).toEqual({
      kind: "redirect",
      url: "https://www.pyqvault.com/notes/nda-maths?q=1",
      permanent: true,
    });
    expect(intlHostDecision("/drill", "")).toEqual({
      kind: "redirect",
      url: "https://www.pyqvault.com/drill",
      permanent: true,
    });
  });
});

describe("canonicalFor", () => {
  it("makes an international page's canonical absolute on the intl origin", () => {
    expect(canonicalFor("/notes/imat-biology")).toBe("https://intl.pyqvault.com/notes/imat-biology");
  });

  it("leaves a PYQ Vault canonical relative, for metadataBase to resolve", () => {
    expect(canonicalFor("/notes/nda-maths")).toBe("/notes/nda-maths");
  });
});

describe("isIntlUrl (splits one sitemap into two)", () => {
  it("is true for an absolute or relative URL of an international page", () => {
    expect(isIntlUrl("https://www.pyqvault.com/notes/imat-biology")).toBe(true);
    expect(isIntlUrl("/mock/imat-2023")).toBe(true);
  });

  it("is false for PYQ Vault URLs", () => {
    expect(isIntlUrl("https://www.pyqvault.com/notes/nda-maths")).toBe(false);
    expect(isIntlUrl("https://www.pyqvault.com/")).toBe(false);
  });
});
