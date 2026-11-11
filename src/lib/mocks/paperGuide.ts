/**
 * The strategy guide a mock paper links to from "Before you start"
 * (lib/mocks/beforeYouStart.ts). The card itself carries only what the
 * paper's marking proves; planning advice lives in the guide, one tap away.
 *
 * Keyed by (exam slug, blueprint code) because one exam's papers differ: NDA
 * Maths has its own guide, the GAT paper spans the nine NDA subject guides.
 * Spec: tests/mock-paper-guide.test.ts (every href is a real page).
 */

export type PaperGuide = { examSlug: string; paperCode: string; href: string; label: string };

export const PAPER_GUIDES: readonly PaperGuide[] = [
  { examSlug: "jee-mains", paperCode: "paper-1", href: "/guide/jee-mains", label: "JEE Main strategy guides" },
  { examSlug: "mht-cet", paperCode: "maths", href: "/guide/mht-cet-maths/strategy", label: "MHT-CET Maths strategy" },
  { examSlug: "mht-cet", paperCode: "phy-chem", href: "/guide/mht-cet", label: "MHT-CET strategy guides" },
  { examSlug: "nda", paperCode: "maths", href: "/guide/nda-maths/strategy", label: "NDA Maths strategy" },
  { examSlug: "nda", paperCode: "gat", href: "/guide/nda", label: "NDA strategy guides" },
  { examSlug: "cds", paperCode: "maths", href: "/guide/cds-maths/strategy", label: "CDS Maths strategy" },
];

export function paperGuideLink(examSlug: string | null | undefined, paperCode: string): { href: string; label: string } | null {
  if (!examSlug) return null;
  const hit = PAPER_GUIDES.find((g) => g.examSlug === examSlug && g.paperCode === paperCode);
  return hit ? { href: hit.href, label: hit.label } : null;
}
