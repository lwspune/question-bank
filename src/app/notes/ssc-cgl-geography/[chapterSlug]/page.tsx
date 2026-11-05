import { makeChapterRoute } from "@/app/notes/_components/notesRoutes";

// Every ssc-cgl-geography notes chapter, from one route file (TECH_DEBT_SPEC.md 2.1).
const route = makeChapterRoute("ssc-cgl-geography");

export const revalidate = 86400;
// Only the registered chapters exist, as when each had its own folder: any other slug matches
// no route and gets the full site 404 (a notFound() inside the page renders an error shell).
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
