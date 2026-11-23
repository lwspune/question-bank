import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("mh-hsc-12-maths");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="mh-hsc-12-maths" />;
}
