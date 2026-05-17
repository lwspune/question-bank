import { redirect } from "next/navigation";

/**
 * /notes currently has only one published chapter (NDA Maths Statistics).
 * Redirect there until a second chapter ships and we need a real index.
 */
export default function NotesIndex() {
  redirect("/notes/nda-maths/statistics");
}
