import { redirect } from "next/navigation";
import { DEFAULT_SYLLABUS_SUBJECT } from "@/lib/syllabus/subjects";

/**
 * The map was a Chemistry-only singleton at this URL before it grew a subject
 * segment. Kept as a redirect rather than deleted: it is linked from /dashboard
 * and may be bookmarked, and a 404 on a working link is a worse answer than the
 * page it used to show.
 */
export default function SyllabusIndexRedirect() {
  redirect(`/dashboard/syllabus/${DEFAULT_SYLLABUS_SUBJECT}`);
}
