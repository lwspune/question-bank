/** nda-physics playbook pages: the shared NDA playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeNdaPlaybookRoute } from "@/app/guide/_components/playbookRouteNda";
import { ROUTES } from "../../_data/nda-physics";
import { PLAYBOOKS } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const route = makeNdaPlaybookRoute({
  guidePath: "nda-physics",
  displayName: "NDA Physics",
  taxonomySubject: "Physics",
  routes: ROUTES,
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  afterLast: { href: "/guide/nda-physics/formulas", label: "Formula compendium" },
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
