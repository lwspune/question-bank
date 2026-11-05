import { makeSubtopicRoute } from "@/app/notes/_components/notesRoutes";

// Every ssc-cgl-economics notes subtopic page, from one route file (TECH_DEBT_SPEC.md 2.1).
const route = makeSubtopicRoute("ssc-cgl-economics");

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
