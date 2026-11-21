import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("mh-scholarship-4-intelligence");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="mh-scholarship-4-intelligence" />;
}
