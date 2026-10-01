"""Register one CDS General Knowledge /notes chapter.

Usage (repo root): python scripts/notes-pipeline/cds-gk/register.py <spec.json>

spec: {"route": "cds-chemistry", "subject": "Chemistry", "display": "CDS Chemistry",
       "slug": "acids-bases-salts", "const": "CDS_CH_ACIDS", "chip": "Acids, Bases and Salts notes",
       "prefix": "cdsch-ab", "cprefix": "cdschab", "blurb": "index.ts comment",
       "pages": [["cdsch-ab-theory", "theory", "CDS_CH_AB_THEORY_NOTE"], ...]}

Writes the chapter's _data/index.ts, its page.tsx and [subtopicSlug]/page.tsx, the subject
landing page.tsx when the route is new, and the NOTES_CHAPTERS entry (after the route's last
entry, else at the end). chapter.ts and the page files are authored by hand. Idempotent.
"""
import io, json, os, sys

ROOT = os.getcwd()
spec = json.load(io.open(sys.argv[1], encoding="utf-8"))
route, subject, display = spec["route"], spec["subject"], spec["display"]
slug, const = spec["slug"], spec["const"]
notes = os.path.join(ROOT, "src", "app", "notes")
d = os.path.join(notes, route, slug)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    io.open(path, "w", encoding="utf-8", newline="").write(text)


lines = ['import type { SubtopicNote } from "@/app/notes/_types";']
lines += [f'import {{ {e} }} from "./{f}";' for _, f, e in spec["pages"]]
lines += ["", f'export {{ {const}_CHAPTER }} from "./chapter";', "", "/**",
          f" * Slug → SubtopicNote map for /notes/{route}/{slug}/[subtopicSlug].", " *",
          " * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique",
          f" * across NOTES_CHAPTERS — hence `{spec['prefix']}-` here and `{spec['cprefix']}-` on concept slugs.", " *"]
lines += [f" * {l}" for l in spec["blurb"].split("\n")]
lines += [" */", f"export const {const}_NOTES: Record<string, SubtopicNote> = {{"]
lines += [f'  "{s}": {e},' for s, _, e in spec["pages"]]
lines += ["};", "", f"export const {const}_SLUGS = Object.keys({const}_NOTES);", ""]
write(os.path.join(d, "_data", "index.ts"), "\n".join(lines))

model = os.path.join(notes, "cds-maths", "trigonometry")
for rel in ["page.tsx", os.path.join("[subtopicSlug]", "page.tsx")]:
    tpl = io.open(os.path.join(model, rel), encoding="utf-8").read()
    write(os.path.join(d, rel), tpl.replace('getNotesChapterBySlug("cds-maths", "trigonometry")',
                                             f'getNotesChapterBySlug("{route}", "{slug}")'))

landing = os.path.join(notes, route, "page.tsx")
if not os.path.exists(landing):
    tpl = io.open(os.path.join(notes, "cds-maths", "page.tsx"), encoding="utf-8").read()
    write(landing, tpl.replace('"cds-maths"', f'"{route}"'))

p = os.path.join(ROOT, "src", "lib", "notes", "chapters.ts")
s = io.open(p, encoding="utf-8").read()
if f"{const}_CHAPTER," not in s:
    anchor = "\nexport type NotesChapterRegistration = {"
    imp = f'import {{\n  {const}_CHAPTER,\n  {const}_NOTES,\n  {const}_SLUGS,\n}} from "@/app/notes/{route}/{slug}/_data";'
    i = s.index(anchor)
    s = s[:i] + "\n" + imp + s[i:]
    entry = (f'\n  {{\n    examName: "CDS",\n    subjectName: "{subject}",\n    subjectRoute: "{route}",\n'
             f'    subjectDisplay: "{display}",\n    chapterSlug: "{slug}",\n    chipLabel: "{spec["chip"]}",\n'
             f'    chapter: {const}_CHAPTER,\n    notes: {const}_NOTES,\n    slugs: {const}_SLUGS,\n  }},')
    reg_end = s.rindex("\n];\n", 0, s.index("export function getNotesChapterBySlug"))
    marker = f'subjectRoute: "{route}",'
    last = s.rfind(marker, 0, reg_end)
    at = s.index("\n  },", last) + len("\n  },") if last != -1 else reg_end
    s = s[:at] + entry + s[at:]
    io.open(p, "w", encoding="utf-8", newline="").write(s)
print("registered", f"{route}/{slug}")
