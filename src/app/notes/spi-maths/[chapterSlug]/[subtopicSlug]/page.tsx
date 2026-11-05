import { makeSubtopicRoute } from "@/app/notes/_components/notesRoutes";

// Every spi-maths notes subtopic page, from one route file (TECH_DEBT_SPEC.md 2.1).
const route = makeSubtopicRoute("spi-maths");

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
