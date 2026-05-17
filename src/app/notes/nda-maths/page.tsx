import { redirect } from "next/navigation";

/**
 * Statistics is the only NDA Maths chapter with published notes today.
 * Redirect /notes/nda-maths to it until a second chapter ships.
 */
export default function NdaMathsNotesIndex() {
  redirect("/notes/nda-maths/statistics");
}
