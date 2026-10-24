import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("cds-geography");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="cds-geography" />;
}
