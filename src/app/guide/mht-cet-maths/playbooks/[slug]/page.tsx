/** mht-cet-maths playbook pages: the shared MHT-CET playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeCetPlaybookRoute } from "@/app/guide/_components/playbookRouteCet";
import { ROUTES } from "../../_data/mht-cet-maths";
import { PLAYBOOKS, type PlaybookBucket } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const STRAND_LABEL: Record<PlaybookBucket, string> = {
  cornerstone: "Cornerstone",
  quickwin: "Quick-Win",
  longtail: "Long Tail",
};

const route = makeCetPlaybookRoute({
  guidePath: "mht-cet-maths",
  displayName: "MHT-CET Maths",
  subject: { taxonomyName: "Maths", crumbLabel: "Mathematics" },
  routes: ROUTES,
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  strandLabels: STRAND_LABEL,
  perPaperLabel: "q/paper (2025–26 shifts)",
  afterLast: { href: "/guide/mht-cet-maths/formulas", label: "Formulas" },
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
