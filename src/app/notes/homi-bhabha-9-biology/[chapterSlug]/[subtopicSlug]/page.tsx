import { makeSubtopicRoute } from "@/app/notes/_components/notesRoutes";

// Every homi-bhabha-9-biology notes subtopic page, from one route file (TECH_DEBT_SPEC.md 2.1).
const route = makeSubtopicRoute("homi-bhabha-9-biology");

export const revalidate = 86400;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
