import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
require("dotenv").config({ path: ".env.local", override: true });
(async () => {
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const d = JSON.parse(fs.readFileSync("generated-papers/" + process.argv[2], "utf8"));
const want = process.argv.slice(3);
const ids = d.questions.filter((q: any) => want.includes(q.id.slice(0, 8))).map((q: any) => q.id);
const { data } = await sb.from("questions").select("id,numeric_answer").in("id", ids);
for (const r of data!) console.log(r.id.slice(0,8), r.numeric_answer);
})();
