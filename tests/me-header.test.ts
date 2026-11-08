/**
 * The header above Home · Performance · Account (2026-11-08): greeting, the
 * student's exams, and the tab strip. Server-rendered (no jsdom in this repo),
 * so this pins the markup, not the tap.
 *
 *  - A two-exam student gets the exams as a FOCUS SWITCH: buttons with
 *    aria-pressed, plus "All".
 *  - A one-exam student keeps today's chip: a link to their exam, no "All".
 *  - The staff view shows the switch read only (no button can save as the
 *    student) and no student tab strip (the staff page has its own).
 */
import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MeHeader from "@/components/me/MeHeader";
import { resolveFocus } from "@/lib/me/focus";
import type { MeHeaderData } from "@/lib/me/header";

// The chips and the greeting are client components that take the router;
// rendering to markup needs only a stand-in.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: () => {}, refresh: () => {}, push: () => {} }),
  usePathname: () => "/me",
}));

const two: MeHeaderData = {
  greeting: "Good morning",
  name: "Rutuja",
  focus: resolveFocus({ targets: ["mht-cet", "jee-mains"], saved: null, recent: "mht-cet" }),
  examLinks: [
    { slug: "mht-cet", label: "MHT-CET", href: "/mock/exam/mht-cet" },
    { slug: "jee-mains", label: "JEE Mains", href: "/mock/exam/jee-mains" },
  ],
  suggestedExam: null,
};

const one: MeHeaderData = {
  ...two,
  focus: resolveFocus({ targets: ["mht-cet"], saved: null, recent: null }),
  examLinks: [{ slug: "mht-cet", label: "MHT-CET", href: "/mock/exam/mht-cet" }],
};

const render = (data: MeHeaderData, props: { active?: "home" | "review" | "progress"; readOnly?: boolean }) =>
  renderToStaticMarkup(createElement(MeHeader, { data, active: props.active, readOnly: props.readOnly ?? false }));

describe("MeHeader", () => {
  it("greets by name", () => {
    expect(render(two, { active: "home" })).toContain("Good morning, Rutuja");
  });

  it("gives a two-exam student a focus switch with All, the focus pressed", () => {
    const out = render(two, { active: "home" });
    expect(out).toContain("Focus");
    expect(out).toMatch(/<button[^>]*aria-pressed="true"[^>]*>MHT-CET<\/button>/);
    expect(out).toMatch(/<button[^>]*aria-pressed="false"[^>]*>JEE Mains<\/button>/);
    expect(out).toMatch(/<button[^>]*aria-pressed="false"[^>]*>All<\/button>/);
  });

  it("keeps a one-exam student's chip as a link, with no All", () => {
    const out = render(one, { active: "home" });
    expect(out).toContain('href="/mock/exam/mht-cet"');
    expect(out).not.toContain(">All<");
    expect(out).not.toContain("aria-pressed");
  });

  it("shows Home · Review · Progress with the open one marked, Account in the menu", () => {
    const out = render(two, { active: "progress" });
    expect(out).toContain('href="/me"');
    expect(out).toContain('href="/review"');
    expect(out).not.toMatch(/<nav[^>]*>.*href="\/account"/s);
    expect(out).toMatch(/<a[^>]*aria-current="page"[^>]*href="\/progress"|<a[^>]*href="\/progress"[^>]*aria-current="page"/);
    expect(out).not.toMatch(/aria-current="page"[^>]*href="\/me"/);
  });

  it("is read only in the staff view: no buttons, no student tabs", () => {
    const out = render(two, { readOnly: true });
    expect(out).not.toContain("<button");
    expect(out).toContain("MHT-CET");
    expect(out).not.toContain('href="/account"');
  });
});
