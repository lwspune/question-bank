import { getNotesChapterBySlug } from "@/lib/notes/chapters";
import NotesChapterLanding, {
  buildChapterMetadata,
} from "@/app/notes/_components/NotesChapterLanding";

const CHAPTER = getNotesChapterBySlug("jee-mains-physics", "dual-nature")!;

export const revalidate = 86400;

export const metadata = buildChapterMetadata(CHAPTER);

export default function Page() {
  return <NotesChapterLanding chapter={CHAPTER} />;
}
