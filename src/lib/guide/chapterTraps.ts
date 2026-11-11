/**
 * A chapter's "how it catches students" for the Review tab (2026-11-11): the
 * playbook's trigger line and its traps, from the strategy guides, keyed by
 * (exam, subject, chapter) through the same lookup as the /browse playbook chip.
 *
 * SERVER-SIDE ONLY: it imports every chapter-keyed guide's playbook details, so
 * a client component importing it would ship them all. The page passes the
 * plain result to src/app/review/ChapterTraps.
 *
 * The traps are the guides' own text, live on the playbook pages, but not yet
 * independently checked (owner, 2026-11-11: ship now, validate later; the
 * SUGGESTIONS.md backfill ledger holds the job). Spec: tests/chapter-traps.test.ts.
 */
import { chapterPlaybook } from "@/lib/links/questionResources";
import { PLAYBOOK_DETAILS as NDA_PHYSICS } from "@/app/guide/nda-physics/_data/playbook-details";
import { PLAYBOOK_DETAILS as NDA_CHEMISTRY } from "@/app/guide/nda-chemistry/_data/playbook-details";
import { PLAYBOOK_DETAILS as NDA_BIOLOGY } from "@/app/guide/nda-biology/_data/playbook-details";
import { PLAYBOOK_DETAILS as NDA_GEOGRAPHY } from "@/app/guide/nda-geography/_data/playbook-details";
import { PLAYBOOK_DETAILS as NDA_HISTORY } from "@/app/guide/nda-history/_data/playbook-details";
import { PLAYBOOK_DETAILS as NDA_POLITY } from "@/app/guide/nda-polity/_data/playbook-details";
import { PLAYBOOK_DETAILS as MHT_CET_MATHS } from "@/app/guide/mht-cet-maths/_data/playbook-details";
import { PLAYBOOK_DETAILS as MHT_CET_PHYSICS } from "@/app/guide/mht-cet-physics/_data/playbook-details";
import { PLAYBOOK_DETAILS as MHT_CET_CHEMISTRY } from "@/app/guide/mht-cet-chemistry/_data/playbook-details";
import { PLAYBOOK_DETAILS as CDS_MATHS } from "@/app/guide/cds-maths/_data/playbook-details";
import { PLAYBOOK_DETAILS as JEE_MAINS_MATHS } from "@/app/guide/jee-mains-maths/_data/playbook-details";
import { PLAYBOOK_DETAILS as JEE_MAINS_CHEMISTRY } from "@/app/guide/jee-mains-chemistry/_data/playbook-details";
import { PLAYBOOK_DETAILS as JEE_MAINS_PHYSICS } from "@/app/guide/jee-mains-physics/_data/playbook-details";

type Detail = { trigger: string; traps: { name: string; description: string }[] };

const DETAILS: Record<string, Record<string, Detail>> = {
  "nda-physics": NDA_PHYSICS,
  "nda-chemistry": NDA_CHEMISTRY,
  "nda-biology": NDA_BIOLOGY,
  "nda-geography": NDA_GEOGRAPHY,
  "nda-history": NDA_HISTORY,
  "nda-polity": NDA_POLITY,
  "mht-cet-maths": MHT_CET_MATHS,
  "mht-cet-physics": MHT_CET_PHYSICS,
  "mht-cet-chemistry": MHT_CET_CHEMISTRY,
  "cds-maths": CDS_MATHS,
  "jee-mains-maths": JEE_MAINS_MATHS,
  "jee-mains-chemistry": JEE_MAINS_CHEMISTRY,
  "jee-mains-physics": JEE_MAINS_PHYSICS,
};

export type ChapterTraps = {
  trigger: string;
  traps: { name: string; description: string }[];
  playbook: { href: string; label: string };
};

export function getChapterTraps(input: { examName: string; subjectName: string; chapterName: string }): ChapterTraps | null {
  const p = chapterPlaybook(input.examName, input.subjectName, input.chapterName);
  if (!p) return null;
  const d = DETAILS[p.guideSlug]?.[p.slug];
  if (!d || d.traps.length === 0) return null;
  return {
    trigger: d.trigger,
    traps: d.traps.map((t) => ({ name: t.name, description: t.description })),
    playbook: { href: `/guide/${p.guideSlug}/playbooks/${p.slug}`, label: `${p.name} playbook` },
  };
}
