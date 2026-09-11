import { redirect } from "next/navigation";
import { DEFAULT_PLAN_KEY } from "@/lib/planner/registry";

/**
 * There is one plan today, so the index is a redirect rather than a picker
 * with a single card. When PCM is complete this becomes a real picker — the
 * same shape `/dashboard/syllabus` uses.
 */
export default function PlannerIndexPage() {
  redirect(`/dashboard/planner/${DEFAULT_PLAN_KEY}`);
}
