"""
Generate scripts/upsc/catalog.json — the HARD-validated subject/chapter/subtopic
catalog for UPSC CSE (Prelims) — from two halves that are deliberately kept apart.

    python scripts/upsc/seed-catalog.py           # report only, write nothing
    python scripts/upsc/seed-catalog.py --write   # (re)generate catalog.json

THE TWO HALVES

  DERIVED  — six Paper-1 subjects (Polity and Governance, Geography, History,
             Physics, Chemistry, Biology) are extracted from the LWS syllabus
             .docx files under C:\\Vilas\\LWS_Pune\\UPSC\\Paper_1. Those files are
             already at exactly the right grain: each numbered section is a
             chapter and each bullet's bolded lead-in (the text before its colon)
             is a subtopic. They are also visibly reverse-engineered from real
             UPSC PYQs — "Araghatta wheel", "Coriolis force" and other specifics
             in them appear verbatim in the 2025 booklet — so they describe what
             this paper actually asks, not a generic syllabus.

  AUTHORED — catalog-authored.json: the three Paper-1 subjects the .docx set does
             not cover (Economy, Environment and Ecology, Current Affairs and IR)
             and all five Paper-2 (CSAT) subjects, which have no .docx at all.

Keeping them apart is the point: the derived half can be re-derived from its
source, the authored half cannot — it has no source but that file. A single
merged blob would lose that distinction the moment someone hand-edits it.

ONE-SHOT, NOT A LIVE READ. catalog.json is COMMITTED and is the source of truth
from the moment it exists. A hard-validation catalog that silently changes
underneath an ingest is worthless. Re-running with --write after the pilot is a
taxonomy migration, not a refresh — treat it as one, and diff the result.

REQUIRES pandoc on PATH and the source .docx files present. Both are absent on
CI by design; this is a local one-shot, never part of a build.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = Path(r"C:/Vilas/LWS_Pune/UPSC/Paper_1")

# bank subject name -> syllabus .docx, relative to ROOT.
# NOTE "CSE_Greography_Syllabus.docx" is misspelled AT SOURCE. Reproduced verbatim
# because it is a path, not prose — do not "fix" it.
DERIVED_SOURCES = {
    "Polity and Governance": "01. Polity/00. CSE_Polity_Syllabus.docx",
    "Geography": "02. Geography/CSE_Greography_Syllabus.docx",
    "History": "03. History/CSE_History_Syllabus.docx",
    "Physics": "04. Physics/CSE_Physics_Syllabus.docx",
    "Chemistry": "05. Chemistry/CSE_Chemistry_Syllabus.docx",
    "Biology": "06. Biology/CSE_Biology_Syllabus.docx",
}

# Emission order. Paper 1 first (the nine agreed subjects), then Paper 2's five.
# Stable and human-meaningful: an unordered catalog produces a meaningless diff
# on every regeneration.
SUBJECT_ORDER = [
    "Polity and Governance",
    "History",
    "Geography",
    "Economy",
    "Environment and Ecology",
    "Physics",
    "Chemistry",
    "Biology",
    "Current Affairs and IR",
    "Comprehension",
    "Logical Reasoning and Analytical Ability",
    "General Mental Ability",
    "Basic Numeracy",
    "Data Interpretation and Data Sufficiency",
]

CHAPTER_RE = re.compile(r"^(\d+)\.\s+(.+?)\s*$")
BULLET_RE = re.compile(r"^-\s+(.+?)\s*$")

# A bullet head longer than this is a prose bullet that happens to contain a
# colon, not a subtopic label. Measured against the six real files: the longest
# genuine head is well under 60 characters.
MAX_SUBTOPIC_LEN = 70


def clean(s: str) -> str:
    """Normalise the smart punctuation Word emits. Subtopic names are matched by
    string equality at commit, so a curly apostrophe here becomes a taxonomy
    fragmentation later."""
    for a, b in (("\u2019", "'"), ("\u2018", "'"), ("\u201c", '"'),
                 ("\u201d", '"'), ("\u2013", "-"), ("\u2014", "-")):
        s = s.replace(a, b)
    return re.sub(r"\s+", " ", s).strip()


def extract(docx: Path) -> dict[str, list[str]]:
    if not docx.exists():
        raise SystemExit(f"missing source: {docx}")
    # --wrap=none is load-bearing: the default wraps a bullet across several
    # lines, which splits the head away from its own colon and silently drops
    # every subtopic whose label runs past the wrap column.
    proc = subprocess.run(
        ["pandoc", "-t", "plain", "--wrap=none", str(docx)],
        capture_output=True, text=True, encoding="utf-8",
    )
    if proc.returncode != 0:
        raise SystemExit(f"pandoc failed on {docx.name}: {proc.stderr.strip()}")

    chapters: dict[str, list[str]] = {}
    current: str | None = None
    for line in proc.stdout.splitlines():
        m = CHAPTER_RE.match(line.rstrip())
        if m:
            current = clean(m.group(2))
            chapters.setdefault(current, [])
            continue
        b = BULLET_RE.match(line.rstrip())
        if b and current:
            body = b.group(1)
            if ":" not in body:
                continue
            head = clean(body.split(":", 1)[0])
            if not head or len(head) > MAX_SUBTOPIC_LEN:
                continue
            if head not in chapters[current]:
                chapters[current].append(head)
    return chapters


def main() -> None:
    write = "--write" in sys.argv

    catalog: dict[str, dict[str, list[str]]] = {}

    for subject, rel in DERIVED_SOURCES.items():
        catalog[subject] = extract(ROOT / rel)

    authored = json.loads((HERE / "catalog-authored.json").read_text(encoding="utf-8"))
    for subject, chapters in authored.items():
        if subject.startswith("_"):
            continue
        if subject in catalog:
            raise SystemExit(
                f'"{subject}" is in BOTH halves. One of them has to go — a subject '
                f"with two sources has no source."
            )
        catalog[subject] = chapters

    # Refuse to emit anything we cannot order, in either direction. A subject
    # missing from SUBJECT_ORDER would be silently dropped from the output.
    missing = [s for s in SUBJECT_ORDER if s not in catalog]
    extra = [s for s in catalog if s not in SUBJECT_ORDER]
    if missing or extra:
        raise SystemExit(f"SUBJECT_ORDER disagrees with the data. missing={missing} extra={extra}")

    ordered = {s: catalog[s] for s in SUBJECT_ORDER}

    empty_ch = [(s, c) for s, ch in ordered.items() for c, v in ch.items() if not v]
    if empty_ch:
        raise SystemExit(f"chapters with no subtopics (a chapter that catches nothing): {empty_ch}")

    n_ch = sum(len(ch) for ch in ordered.values())
    n_st = sum(len(v) for ch in ordered.values() for v in ch.values())
    for s in SUBJECT_ORDER:
        ch = ordered[s]
        tag = "derived " if s in DERIVED_SOURCES else "authored"
        print(f"  [{tag}] {s:44s} {len(ch):2d} ch  {sum(len(v) for v in ch.values()):3d} st")
    print(f"\n{len(ordered)} subjects · {n_ch} chapters · {n_st} subtopics")

    if not write:
        print("\n[dry-run] pass --write to emit catalog.json. Nothing written.")
        return

    out = HERE / "catalog.json"
    out.write_text(json.dumps(ordered, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\nwrote {out}")


if __name__ == "__main__":
    main()
