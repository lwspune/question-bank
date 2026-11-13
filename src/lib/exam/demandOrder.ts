import type { ExamFamilyNode } from "./examFamily";

/**
 * The order exam cards are shown in on the homepage and the bare /browse page,
 * most-chosen first. A family card is named by its key, a single exam by slug.
 *
 * WHY NOT THE REGISTRY ORDER: that order is NDA first, from when NDA was most
 * of the bank. Sign-ups in the 30 days to 2026-11-02, by the exam they chose
 * (a family summed over its members): Maharashtra State Board 337, JEE Mains
 * 240, MHT-CET 238, CBSE 207, Worksheets 11+12 149, SSC CGL 134, MPSC 134,
 * NDA 91, NEET 78, CDS 59, UPSC 37, IPMAT 20, AFCAT 15, Foundation 14, SPI 2,
 * CISCE 1 (live since 10-30), UCEED (live 2026-11-03, no sign-ups yet), then IISER IAT (added 2026-11-08), then UGC NET (added 2026-11-10), then CLAT (added 2026-11-11), then RRB NTPC (added 2026-11-13). The one exception: Worksheets sits just after
 * NDA, not above it. It is an NDA maths course, and its generic name likely
 * draws board students who mean "Class 11-12 worksheets", so its count is not
 * clean demand.
 *
 * A dated snapshot, so re-measure it each season. The test fails when a card
 * appears or disappears without this list following.
 *
 * Pure. Spec: tests/exam-demand-order.test.ts.
 */
export const EXAM_DEMAND_ORDER: readonly string[] = [
  "Maharashtra State Board",
  "jee-mains",
  "mht-cet",
  "CBSE",
  "SSC CGL",
  "MPSC",
  "nda",
  "worksheets-11-12",
  "neet",
  "cds",
  "upsc-cse",
  "IPMAT",
  "CISCE",
  "afcat",
  "foundation-course",
  "spi",
  "uceed",
  "iiser-iat",
  "ugc-net",
  "clat",
  "rrb-ntpc",
];

function keyOf<T>(node: ExamFamilyNode<T>): string | undefined {
  return node.kind === "family" ? node.key : node.entry?.slug;
}

/** `nodes` reordered by EXAM_DEMAND_ORDER; unlisted nodes keep their order, last. */
export function sortByDemand<T>(nodes: readonly ExamFamilyNode<T>[]): ExamFamilyNode<T>[] {
  const rank = (n: ExamFamilyNode<T>) => {
    const i = EXAM_DEMAND_ORDER.indexOf(keyOf(n) ?? "");
    return i === -1 ? EXAM_DEMAND_ORDER.length : i;
  };
  return nodes
    .map((node, index) => ({ node, index }))
    .sort((a, b) => rank(a.node) - rank(b.node) || a.index - b.index)
    .map((x) => x.node);
}

/**
 * `nodes` with the card holding `slug` moved to the front: the visitor's chosen
 * exam (the `qb_exam` cookie), or the family card that has it as a class. No
 * choice, or an exam not on the page, leaves the order as it is.
 */
export function withChosenExamFirst<T extends { slug: string }>(
  nodes: readonly ExamFamilyNode<T>[],
  slug: string | null
): ExamFamilyNode<T>[] {
  if (!slug) return [...nodes];
  const holds = (n: ExamFamilyNode<T>) =>
    n.kind === "family" ? n.members.some((m) => m.item.slug === slug) : n.item.slug === slug;
  const i = nodes.findIndex(holds);
  if (i <= 0) return [...nodes];
  return [nodes[i], ...nodes.slice(0, i), ...nodes.slice(i + 1)];
}
