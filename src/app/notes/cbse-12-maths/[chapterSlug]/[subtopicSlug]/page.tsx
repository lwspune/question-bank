import { makeSubtopicRoute } from "@/app/notes/_components/notesRoutes";

// Every cbse-12-maths notes subtopic page, from one route file (TECH_DEBT_SPEC.md 2.1).
const route = makeSubtopicRoute("cbse-12-maths");

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
