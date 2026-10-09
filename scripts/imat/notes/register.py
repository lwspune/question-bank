"""Register IMAT notes chapter folders in src/lib/sites/imat/notes/registry.ts.

    python scripts/imat/notes/register.py <subject>/<folder>:<EXPORT_PREFIX> [...]
    e.g. python scripts/imat/notes/register.py biology/genetics:IMAT_BIO_GEN

Adds the import and the entry (under the subject's comment, created if
missing). Idempotent: a folder already registered is skipped.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
REGISTRY = ROOT / "src" / "lib" / "sites" / "imat" / "notes" / "registry.ts"
ROUTE = {
    "biology": "imat-biology",
    "chemistry": "imat-chemistry",
    "physics": "imat-physics",
    "maths": "imat-maths",
    "logic": "imat-logic",
    "reading": "imat-reading",
}
ORDER = list(ROUTE)


def main(args: list[str]) -> None:
    src = REGISTRY.read_text(encoding="utf8")
    for arg in args:
        path, prefix = arg.split(":")
        subject, folder = path.split("/")
        if f'from "./{path}"' in src:
            print(f"skip {path}: already registered")
            continue
        imp = (
            f"import {{\n  {prefix}_CHAPTER,\n  {prefix}_NOTES,\n  {prefix}_SLUGS,\n}} from \"./{path}\";\n"
        )
        # Imports go after the last existing chapter import.
        last = list(re.finditer(r'\} from "\./[a-z]+/[a-z0-9-]+";\n', src))
        at = last[-1].end() if last else src.index("\nfunction entry(")
        src = src[:at] + imp + src[at:]

        line = f'  entry("{ROUTE[subject]}", "{folder}", {prefix}_CHAPTER, {prefix}_NOTES, {prefix}_SLUGS),\n'
        header = f"  // {subject.capitalize()}\n"
        start = src.index("export const IMAT_NOTES_CHAPTERS")
        end = src.index("];", start)
        body = src[start:end]
        if header in body:
            # Append after the subject's last entry.
            h = start + body.index(header)
            nxt = re.search(r"\n  // [A-Z]", src[h + 1 : end])
            insert_at = h + 1 + nxt.start() + 1 if nxt else end
        else:
            # New subject block, placed in subject order.
            later = [s for s in ORDER[ORDER.index(subject) + 1 :] if f"  // {s.capitalize()}\n" in body]
            insert_at = start + body.index(f"  // {later[0].capitalize()}\n") if later else end
            line = header + line
        src = src[:insert_at] + line + src[insert_at:]
        print(f"registered {path}")
    REGISTRY.write_text(src, encoding="utf8", newline="\n")


if __name__ == "__main__":
    main(sys.argv[1:])
