# JEE notes pipeline tools

The tools behind the JEE Mains Maths /notes chapters. The method (prep agents, draft agents, what the
main session checks) is in NOTES_WORKFLOW.md §0b; this file only says what each tool does.

Run everything from the repo root. Working data — chapter dumps, fix specs, re-cut plans, tag specs —
goes in `generated-papers/`, which is gitignored. Each tool reads `.env.local` for the Supabase keys.

| Tool | What it does | Writes to the DB? |
|---|---|---|
| `dump.ts "<chapter>" <outName>` | Dumps a chapter's PUBLIC rows to `generated-papers/<outName>.json` (adds `.json` itself). | No |
| `read.js` / `list.js <dump.json> [subtopic] [len]` | Print rows from a dump, whole or as one-line stems. | No |
| `qnat.ts <dump.json> <idprefix...>` | Prints the stored numeric answer for the given rows. | No |
| `src.py <dump.json> <idprefix> [--soln]` | Shows a row's block in its SOURCE docx (and solution doc). `JEE_PYQ_ROOT` overrides the source folder. | No |
| `fix.ts <spec> [--apply]` | Applies a fix spec (stems, options, keys, solutions, subtopics) through `scripts/jee/papers/*.json` + `resync`, so a re-sync cannot undo it. Dry run by default. | With `--apply` |
| `recut.js <dump.json> <plan.json> <out-spec.json>` | Turns a re-cut plan into a fix spec for `fix.ts`. | No |
| `del-empty-sub.mts <id> [--apply]` | Deletes a subtopic that holds no rows. | With `--apply` |
| `sync-classification.mts [--apply]` | Checks the paper JSONs' classifications match the DB. | With `--apply` |
| `duphash.mts <dump.json>` | Checks a chapter for duplicate content hashes. | No |
| `tag-chapter.ts <spec.json> [--dry]` | Writes concept tags from a tag spec. **Applies by default.** | Yes |
| `apply-chapter.sh "<chapter>" <code>` | Runs the data half for one chapter: fix spec, re-cut, empty-subtopic delete, sync + dup checks. | Yes |
| `register.py <slug> <CONST> "<Chip>" <AFTER_CONST>` | Adds a chapter to `src/lib/notes/chapters.ts`. | No |
| `probe.sh <slug> <intro-filter>` | notes:lint, notes:arc, notes:intro, the registry tests and the intro-count contract for one chapter. | No |

A fix spec written as `.ts` should import its type from here:
`import type { Spec } from "../scripts/notes-pipeline/jee/fix";`
