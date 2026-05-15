import { redirect } from "next/navigation";

/**
 * /guide currently has only one published guide. Redirect there until a
 * second guide ships and we need a real index.
 */
export default function GuideIndex() {
  redirect("/guide/nda-maths");
}
