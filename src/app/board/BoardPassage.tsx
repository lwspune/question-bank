"use client";

/**
 * A board question's shared passage (case study, directions, a set's map or
 * table instruction), in the viewer's language where the board printed it in
 * Marathi too. An English-only passage renders exactly as a bare BlockText.
 * The wrapper's styling stays with each reader, which prints it differently.
 */
import BlockText from "@/components/math/BlockText";
import { BilingualStem } from "@/components/i18n/BilingualText";
import { hasMarathi } from "@/lib/i18n/bilingual";
import { asBilingual, type BoardQuestion } from "@/lib/board/query";

export default function BoardPassage({ q }: { q: BoardQuestion }) {
  if (!q.context) return null;
  if (!hasMarathi(q)) return <BlockText text={q.context} />;
  return <BilingualStem q={asBilingual(q)} field="context" />;
}
