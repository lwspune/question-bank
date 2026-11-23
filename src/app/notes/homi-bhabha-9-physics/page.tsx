import NotesSubjectLanding, {
  buildSubjectMetadata,
} from "@/app/notes/_components/NotesSubjectLanding";

export const revalidate = 86400;

export const metadata = buildSubjectMetadata("homi-bhabha-9-physics");

export default function Page() {
  return <NotesSubjectLanding subjectRoute="homi-bhabha-9-physics" />;
}
