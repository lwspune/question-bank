/** nda-history playbook pages: the shared NDA playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeNdaPlaybookRoute } from "@/app/guide/_components/playbookRouteNda";
import { ROUTES } from "../../_data/nda-history";
import { PLAYBOOKS } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const route = makeNdaPlaybookRoute({
  guidePath: "nda-history",
  displayName: "NDA History",
  taxonomySubject: "History",
  routes: ROUTES,
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  afterLast: { href: "/guide/nda-history/timeline-and-pairs", label: "Timeline & pairs" },
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
