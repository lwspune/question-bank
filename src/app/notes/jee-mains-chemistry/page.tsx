import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("jee-mains-chemistry");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="jee-mains-chemistry" />;
}
