/**
 * Decide where subtopic section headings go in an exported Word document.
 *
 * Given an ordered list of subtopic labels (one per item — set-group or
 * question — already normalised by the caller so null/empty is folded to a
 * fallback like "Other"), return for each position the heading to emit BEFORE
 * that item, or `null` when the label is unchanged from the previous item.
 *
 * A heading prints only on CHANGE, so a contiguous run of one subtopic gets a
 * single heading. Because /browse now orders chapter-scoped questions by
 * subtopic teaching order, a chapter export yields one clean heading per
 * subtopic; in cart/mixed order a label can recur if its items aren't
 * contiguous (intended — grouping makes no contiguity assumption).
 */
export function headingsOnChange(labels: string[]): (string | null)[] {
  const out: (string | null)[] = [];
  let prev: string | null = null;
  for (const label of labels) {
    out.push(label === prev ? null : label);
    prev = label;
  }
  return out;
}
