import { redirect } from "next/navigation";

/**
 * /guide is the cross-exam entry. Today we only have NDA guides (Maths +
 * English), so redirect to the NDA parent which lists both. When a second
 * exam ships (IPMAT, CUET, ...), this becomes a real exam picker.
 */
export default function GuideIndex() {
  redirect("/guide/nda");
}
