/** mht-cet-chemistry playbook pages: the shared MHT-CET playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeCetPlaybookRoute } from "@/app/guide/_components/playbookRouteCet";
import { ROUTES } from "../../_data/mht-cet-chemistry";
import { PLAYBOOKS, type PlaybookBucket } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const STRAND_LABEL: Record<PlaybookBucket, string> = {
  calculate: "Calculate",
  reactions: "Reactions",
  recall: "Recall",
};

const route = makeCetPlaybookRoute({
  guidePath: "mht-cet-chemistry",
  displayName: "MHT-CET Chemistry",
  subject: { taxonomyName: "Chemistry", crumbLabel: "Chemistry" },
  routes: ROUTES,
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  strandLabels: STRAND_LABEL,
  perPaperLabel: "q/paper (2025–26 papers)",
  afterLast: { href: "/guide/mht-cet-chemistry/reference", label: "Reference" },
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
