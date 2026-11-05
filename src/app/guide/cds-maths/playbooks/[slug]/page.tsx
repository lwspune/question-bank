/** cds-maths playbook pages: the shared JEE/CDS playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeJeePlaybookRoute } from "@/app/guide/_components/playbookRouteJee";
import { ROUTES } from "../../_data/cds-maths";
import { PLAYBOOKS, type PlaybookBucket } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const STRAND_LABEL: Record<PlaybookBucket, string> = {
  cornerstone: "Cornerstone",
  quickwin: "Quick-Win",
  selective: "Selective",
};

const route = makeJeePlaybookRoute({
  guidePath: "cds-maths",
  displayName: "CDS Maths",
  exam: { taxonomyName: "CDS", crumbHref: "/guide/cds", crumbLabel: "CDS" },
  subject: { taxonomyName: "Mathematics", crumbLabel: "Mathematics" },
  sideNav: ROUTES.map((r) => ({ href: r.slug ? `/guide/cds-maths/${r.slug}` : "/guide/cds-maths", label: r.label })),
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  bucket: { word: "Strand", labels: STRAND_LABEL },
  stats: (p) => [
    { value: String(p.qCount), label: "Questions in the bank" },
    { value: p.qPerPaper.toFixed(2), label: "q/paper (21 papers)" },
    { value: `${p.pctHard}%`, label: "Tagged HARD" },
    { value: String(p.subtopics.length), label: `Subtopic${p.subtopics.length === 1 ? "" : "s"}` },
  ],
  afterLast: { href: "/guide/cds-maths/formulas", label: "Formulas" },
  notesUnit: "subtopic",
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
