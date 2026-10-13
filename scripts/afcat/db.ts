// Service-role client + exam resolution for the AFCAT CLIs.
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_NAME } from "./config";

export function adminClient(): SupabaseClient {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

/** The AFCAT exam id. Throws if seed.ts has not created the row. */
export async function afcatExamId(client: SupabaseClient): Promise<string> {
  const { data, error } = await client.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (error) throw new Error(`exam lookup failed: ${error.message}`);
  if (!data) throw new Error(`exam "${EXAM_NAME}" does not exist — run scripts/afcat/seed.ts --apply first`);
  return data.id as string;
}
