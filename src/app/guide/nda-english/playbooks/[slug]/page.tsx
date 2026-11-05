/** nda-english playbook pages: the shared NDA playbook route (TECH_DEBT_SPEC.md 3.1). */
import { makeNdaPlaybookRoute } from "@/app/guide/_components/playbookRouteNda";
import { ROUTES } from "../../_data/nda-english";
import { PLAYBOOKS } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

const route = makeNdaPlaybookRoute({
  guidePath: "nda-english",
  displayName: "NDA English",
  taxonomySubject: "English",
  routes: ROUTES,
  playbooks: PLAYBOOKS,
  details: PLAYBOOK_DETAILS,
  afterLast: { href: "/guide/nda-english/vocab-families", label: "Vocab Families" },
  wording: "question-type",
});

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
