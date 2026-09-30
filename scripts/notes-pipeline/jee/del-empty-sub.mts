// usage: _del_empty_sub.mts <subtopic-uuid> [--apply] — delete a subtopic only if NO question (any visibility/kind) points at it
import { createClient } from "@supabase/supabase-js";
const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const id = process.argv[2];
const { count } = await c.from("questions").select("*", { count: "exact", head: true }).eq("subtopic_id", id);
console.log("rows pointing at it (any visibility/kind):", count);
if (count === 0 && process.argv.includes("--apply")) {
  const { error } = await c.from("subtopics").delete().eq("id", id);
  if (error) throw error;
  console.log("deleted");
}
