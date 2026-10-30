import { describe, it, expect } from "vitest";
import { notesExamSideNav } from "@/lib/notes/notesNav";

// The exam list beside a /notes/<exam> hub. On www it lists PYQ Vault's exams;
// on an international exam's hub (intl.pyqvault.com) only international ones,
// and "All exams" is the intl home (2026-10-30).

describe("notesExamSideNav", () => {
  it("lists PYQ Vault's exams on a www hub, never an international one", () => {
    const nav = notesExamSideNav("nda");
    expect(nav[0]).toEqual({ href: "/notes", label: "All exams" });
    expect(nav.some((l) => l.href === "/notes/nda")).toBe(true);
    expect(nav.some((l) => l.href === "/notes/imat")).toBe(false);
  });

  it("lists only international exams on an intl hub, with the intl home as All exams", () => {
    expect(notesExamSideNav("imat")).toEqual([
      { href: "/", label: "All exams" },
      { href: "/notes/imat", label: "IMAT" },
    ]);
  });
});
