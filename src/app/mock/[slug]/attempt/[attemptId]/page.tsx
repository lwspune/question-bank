import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getRunnerState, MockError } from "@/lib/mocks/service";
import MockRunner from "./MockRunner";

export const metadata: Metadata = { robots: { index: false } };

type Params = { slug: string; attemptId: string };

export default async function MockAttemptPage({ params }: { params: Params }) {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=/mock/${params.slug}`);

  const db = createSupabaseServerClient();
  let state;
  try {
    state = await getRunnerState(db, user.id, params.attemptId);
  } catch (e) {
    if (e instanceof MockError && e.status === 404) redirect(`/mock/${params.slug}`);
    throw e;
  }

  // A finished attempt goes straight to its result — the runner is for live ones.
  if (state.attempt.status !== "in_progress") {
    redirect(`/mock/attempt/${params.attemptId}/result`);
  }

  return <MockRunner state={state} supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!} />;
}
