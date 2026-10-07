/**
 * Fill Vercel's locked ("Sensitive") settings before a GitHub build.
 *
 * `vercel pull` cannot read a Sensitive variable and writes the placeholder
 * `[SENSITIVE]` in its place (11 of them on 2026-10-07). A build that reads one
 * fails ("Invalid supabaseUrl") or, worse, bakes the placeholder into a page.
 * So a placeholder is replaced by GitHub's own copy of that secret when one
 * exists. A real value Vercel did provide is never overwritten: Vercel stays
 * the source of truth for anything it will share.
 *
 * Only settings the BUILD reads block it: everything `NEXT_PUBLIC_*` (inlined
 * into the site) and the service key the prerender reads with. Runtime-only
 * secrets (payments, email) may stay locked, because Vercel supplies them to
 * the live functions itself. The workflow's last guard fails the deploy if the
 * placeholder appears anywhere in the built output, so a wrong guess here can
 * never reach a visitor.
 */
export const SENSITIVE_PLACEHOLDER = "[SENSITIVE]";

const READ_AT_BUILD = new Set(["SUPABASE_SERVICE_ROLE_KEY"]);

function readAtBuild(name: string): boolean {
  return name.startsWith("NEXT_PUBLIC_") || READ_AT_BUILD.has(name);
}

function quote(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
}

export type FillResult = {
  text: string;
  /** Locked settings replaced from GitHub's copies. */
  filled: string[];
  /** Locked settings with no GitHub copy. */
  stillLocked: string[];
  /** The subset of `stillLocked` the build reads: the build must not run. */
  blocking: string[];
};

export function fillLockedSettings(
  envText: string,
  githubCopies: Record<string, string | undefined>
): FillResult {
  const filled: string[] = [];
  const stillLocked: string[] = [];
  const lines = envText.split("\n").map((line) => {
    const m = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line.replace(/\r$/, ""));
    if (!m) return line;
    const [, name, raw] = m;
    const value = raw.replace(/^"(.*)"$/, "$1");
    if (value !== SENSITIVE_PLACEHOLDER) return line;
    const copy = githubCopies[name];
    if (copy) {
      filled.push(name);
      return `${name}=${quote(copy)}`;
    }
    stillLocked.push(name);
    return line;
  });
  return {
    text: lines.join("\n"),
    filled,
    stillLocked,
    blocking: stillLocked.filter(readAtBuild),
  };
}
