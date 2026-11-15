import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("ssc-cgl-tier-2-english");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="ssc-cgl-tier-2-english" />;
}
