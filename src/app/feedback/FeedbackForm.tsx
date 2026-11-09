"use client";

import { useRouter } from "next/navigation";
import { FeatureCard } from "@/app/me/FeedbackCards";

/** /feedback's form: the shared card, refreshing the page after a send so the
 *  new suggestion appears in "Your suggestions" straight away. */
export default function FeedbackForm() {
  const router = useRouter();
  return <FeatureCard defaultOpen onSent={() => router.refresh()} />;
}
