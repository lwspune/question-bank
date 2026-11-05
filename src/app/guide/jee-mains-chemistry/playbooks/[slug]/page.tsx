/** jee-mains-chemistry playbook pages: the shared JEE/CDS playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeJeePlaybookRoute } from "@/app/guide/_components/playbookRouteJee";
import { RECENT } from "../../_data/jee-mains-chemistry";
import { jeeChemGuideSideNav } from "../../_data/nav";
import { PLAYBOOKS, type PlaybookBucket } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const BUCKET_LABEL: Record<PlaybookBucket, string> = {
  calculate: "Calculate",
  reactions: "Reactions",
  structure: "Structure and recall",
};

const route = makeJeePlaybookRoute({
  guidePath: "jee-mains-chemistry",
  displayName: "JEE Mains Chemistry",
  exam: { taxonomyName: "JEE Mains", crumbHref: "/guide/jee-mains", crumbLabel: "JEE Mains" },
  subject: { taxonomyName: "Chemistry", crumbLabel: "Chemistry" },
  sideNav: jeeChemGuideSideNav(),
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  bucket: { word: "Strand", labels: BUCKET_LABEL },
  stats: (p) => [
    { value: String(p.qCount), label: "Questions in the bank" },
    { value: p.recentPerPaper.toFixed(2), label: `q/paper in ${RECENT.label}` },
    { value: `${p.pctCalc}%`, label: "Calculation" },
    { value: String(p.subtopics.length), label: `Notes page${p.subtopics.length === 1 ? "" : "s"}` },
  ],
  afterLast: { href: "/guide/jee-mains-chemistry/reference", label: "Reference" },
  notesUnit: "page",
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
