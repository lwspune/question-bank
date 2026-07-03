import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("mht-cet-chemistry");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="mht-cet-chemistry" />;
}
