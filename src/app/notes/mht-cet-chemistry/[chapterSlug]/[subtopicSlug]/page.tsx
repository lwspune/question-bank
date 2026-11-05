import { makeSubtopicRoute } from "@/app/notes/_components/notesRoutes";

// Every mht-cet-chemistry notes subtopic page, from one route file (TECH_DEBT_SPEC.md 2.1).
const route = makeSubtopicRoute("mht-cet-chemistry");

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
