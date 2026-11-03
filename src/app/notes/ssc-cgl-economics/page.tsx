import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("ssc-cgl-economics");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="ssc-cgl-economics" />;
}
