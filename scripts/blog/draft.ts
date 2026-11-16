/**
 * Save an article written by the /blog skill as a DRAFT (migration 0263).
 *
 *   npm run blog:draft -- --file=<article.md> [--apply] [--target=test]
 *
 * DRY RUN by default: checks the article (lib/blog/articleBody.ts
 * validateArticle, the same rules the database CHECKs) and prints what it would
 * write. `--apply` writes. `--target=test` writes to the test project.
 *
 * It NEVER publishes and never changes a live page:
 *   * a new slug        -> a new draft row
 *   * an existing draft -> overwritten in place
 *   * a PUBLISHED one   -> the edit goes into `pending`, and waits for the owner
 *                          to tap "Apply changes" at /dashboard/blog/<slug>
 * (lib/blog/catalog.ts planDraftWrite.)
 *
 * The file: a JSON header between two `---` lines, then the markdown body.
 * The format and every rule are in .claude/commands/blog.md.
 */
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { validateArticle, checkHref, parseArticleBody, LIMITS } from "../../src/lib/blog/articleBody";
import { parseArticleFile, planDraftWrite, type ExistingArticle } from "../../src/lib/blog/catalog";
import { articlePath } from "../../src/lib/blog/paths";

function flag(name: string): string | undefined {
  const hit = process.argv.slice(2).find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes("=") ? hit.slice(hit.indexOf("=") + 1) : "true";
}

const file = flag("file");
const apply = flag("apply") === "true";
const target = flag("target") ?? "prod";

if (!file || !["prod", "test"].includes(target)) {
  console.error("usage: npm run blog:draft -- --file=<article.md> [--apply] [--target=test]");
  process.exit(1);
}

config({ path: target === "test" ? ".env.test.local" : ".env.local", override: true });

async function main() {
  const parsed = parseArticleFile(readFileSync(file!, "utf8"));
  if (!parsed.ok) {
    console.error(`Cannot read ${file}: ${parsed.error}`);
    process.exit(1);
  }
  const article = parsed.article;

  const problems = validateArticle(article);
  if (problems.length > 0) {
    console.error(`${problems.length} problem(s), nothing written:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }

  // Advice, not refusals.
  const warnings: string[] = [];
  if (article.title.length > 60) warnings.push(`Title is ${article.title.length} characters; Google shows about 60.`);
  const blocks = parseArticleBody(article.body);
  const links = blocks.flatMap((b) =>
    b.kind === "p" || b.kind === "note"
      ? b.inlines
      : b.kind === "ul" || b.kind === "ol"
        ? b.items.flat()
        : b.kind === "table"
          ? [...b.headers.flat(), ...b.rows.flat(2)]
          : []
  );
  const internal = links.filter((l) => l.kind === "link" && !l.external).length;
  if (internal === 0) warnings.push("No link into the site (/mock, /question-papers, /notes...): add at least one.");
  const unofficial = article.sources.filter((s) => {
    const c = checkHref(s.url);
    return c.ok && !c.official;
  });
  if (unofficial.length > 0) warnings.push(`${unofficial.length} source(s) are not official sites: ${unofficial.map((s) => s.url).join(", ")}`);
  if (article.faq.length === 0) warnings.push("No FAQ: students search in questions; 3-6 usually help.");
  if (article.description.length < LIMITS.descriptionMax - 40) warnings.push("Description is short; up to 160 characters shows in search.");

  const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error(`Supabase settings missing for ${target}.`);
  const db = createClient(url, key, { auth: { persistSession: false } });

  const { data: existing, error } = await db
    .from("articles")
    .select("status, kind, exam_slug")
    .eq("slug", article.slug)
    .maybeSingle();
  if (error) throw new Error(`read: ${error.message}`);
  const write = planDraftWrite((existing as ExistingArticle | null) ?? null, article);

  console.log(`article  ${article.slug} (${article.kind}${article.examSlug ? `, ${article.examSlug}` : ""})`);
  console.log(`goes live at  ${articlePath(article)}`);
  console.log(`body  ${blocks.length} blocks, ${internal} link(s) into the site, ${article.faq.length} FAQ, ${article.sources.length} source(s)`);
  for (const w of warnings) console.log(`  warning: ${w}`);

  if (write.mode === "refuse") {
    console.error(write.reason);
    process.exit(1);
  }
  const what = {
    insert: "a NEW DRAFT",
    update: "an update to the DRAFT",
    pending: "a WAITING EDIT to the live article (live text untouched until Apply changes)",
  }[write.mode];
  console.log(`would write  ${what} on ${target}`);

  if (!apply) {
    console.log("dry run: nothing written. Add --apply to save.");
    return;
  }

  const values = { ...write.values, updated_at: new Date().toISOString() };
  const res =
    write.mode === "insert"
      ? await db.from("articles").insert(values)
      : await db.from("articles").update(values).eq("slug", article.slug);
  if (res.error) throw new Error(`write: ${res.error.message}`);

  const site = target === "test" ? "http://localhost:3000" : "https://www.pyqvault.com";
  console.log(`saved. Preview and publish: ${site}/dashboard/blog/${article.slug}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
