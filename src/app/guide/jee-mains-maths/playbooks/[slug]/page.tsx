/** jee-mains-maths playbook pages: the shared JEE/CDS playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeJeePlaybookRoute } from "@/app/guide/_components/playbookRouteJee";
import { RECENT } from "../../_data/jee-mains-maths";
import { jeeGuideSideNav } from "../../_data/nav";
import { PLAYBOOKS, type PlaybookBucket } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const BUCKET_LABEL: Record<PlaybookBucket, string> = {
  cornerstone: "Cornerstone",
  core: "Core",
  longtail: "Long tail",
};

const route = makeJeePlaybookRoute({
  guidePath: "jee-mains-maths",
  displayName: "JEE Mains Maths",
  exam: { taxonomyName: "JEE Mains", crumbHref: "/guide/jee-mains", crumbLabel: "JEE Mains" },
  subject: { taxonomyName: "Maths", crumbLabel: "Mathematics" },
  sideNav: jeeGuideSideNav(),
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  bucket: { word: "Tier", labels: BUCKET_LABEL },
  stats: (p) => [
    { value: String(p.qCount), label: "Questions in the bank" },
    { value: p.recentPerPaper.toFixed(2), label: `q/paper in ${RECENT.label}` },
    { value: `${p.pctNumeric}%`, label: "Numeric answer" },
    { value: String(p.subtopics.length), label: `Notes page${p.subtopics.length === 1 ? "" : "s"}` },
  ],
  afterLast: { href: "/guide/jee-mains-maths/formulas", label: "Formulas" },
  notesUnit: "page",
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
