import { redirect } from "next/navigation";

/**
 * /notes currently only houses NDA Maths chapter notes. Until a second exam's
 * notes ship, redirect to the NDA Maths chapter index landing (which lists
 * every published chapter).
 */
export default function NotesIndex() {
  redirect("/notes/nda-maths");
}
