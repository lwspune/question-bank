import { getNotesChapterBySlug } from "@/lib/notes/chapters";
import NotesChapterLanding, {
  buildChapterMetadata,
} from "@/app/notes/_components/NotesChapterLanding";

const CHAPTER = getNotesChapterBySlug("mht-cet-maths", "indefinite-integration")!;

export const revalidate = 3600;

export const metadata = buildChapterMetadata(CHAPTER);

export default function Page() {
  return <NotesChapterLanding chapter={CHAPTER} />;
}
