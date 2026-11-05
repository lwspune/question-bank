/** nda-polity playbook pages: the shared NDA playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeNdaPlaybookRoute } from "@/app/guide/_components/playbookRouteNda";
import { ROUTES } from "../../_data/nda-polity";
import { PLAYBOOKS } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const route = makeNdaPlaybookRoute({
  guidePath: "nda-polity",
  displayName: "NDA Polity",
  taxonomySubject: "Polity",
  routes: ROUTES,
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  afterLast: { href: "/guide/nda-polity/reference-tables", label: "Reference tables" },
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
