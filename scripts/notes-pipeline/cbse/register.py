"""Register one drafted CBSE Class 12 /notes chapter: index.ts, the NOTES_CHAPTERS entry, the
subject's routes when new, and its NCERT book position.

Usage (repo root): python scripts/notes-pipeline/cbse/register.py <subject> <slug>
  subject = physics | chemistry | maths

Wraps scripts/notes-pipeline/cds-gk/reg-from-data.py + register.py (2026-11-25, CBSE board notes),
so the page list is read from the drafted chapter.ts and cannot drift. Idempotent.
"""
import io, json, os, re, subprocess, sys

SUBJECTS = {
    # route suffix: (DB subject name, display, CONST stem, page-prefix stem)
    "physics": ("Physics", "CBSE Class 12 Physics", "CB_PH", "cbp"),
    "chemistry": ("Chemistry", "CBSE Class 12 Chemistry", "CB_CH", "cbc"),
    "maths": ("Mathematics", "CBSE Class 12 Maths", "CB_MA", "cbm"),
}

# NCERT Class XII (rationalised) chapter numbers: slug -> (code, chapter no, book chapter title).
CHAPTERS = {
    "physics": {
        "electric-charges-and-fields": ("ef", 1, "Electric Charges and Fields"),
        "electrostatic-potential-and-capacitance": ("ep", 2, "Electrostatic Potential and Capacitance"),
        "current-electricity": ("ce", 3, "Current Electricity"),
        "moving-charges-and-magnetism": ("mc", 4, "Moving Charges and Magnetism"),
        "magnetism-and-matter": ("mm", 5, "Magnetism and Matter"),
        "electromagnetic-induction": ("ei", 6, "Electromagnetic Induction"),
        "alternating-current": ("ac", 7, "Alternating Current"),
        "electromagnetic-waves": ("ew", 8, "Electromagnetic Waves"),
        "ray-optics-and-optical-instruments": ("ro", 9, "Ray Optics and Optical Instruments"),
        "wave-optics": ("wo", 10, "Wave Optics"),
        "dual-nature-of-radiation-and-matter": ("dn", 11, "Dual Nature of Radiation and Matter"),
        "atoms": ("at", 12, "Atoms"),
        "nuclei": ("nu", 13, "Nuclei"),
        "semiconductor-electronics": ("se", 14, "Semiconductor Electronics: Materials, Devices and Simple Circuits"),
    },
    "chemistry": {
        "solutions": ("so", 1, "Solutions"),
        "electrochemistry": ("ec", 2, "Electrochemistry"),
        "chemical-kinetics": ("ck", 3, "Chemical Kinetics"),
        "d-and-f-block-elements": ("df", 4, "The d- and f-Block Elements"),
        "coordination-compounds": ("cc", 5, "Coordination Compounds"),
        "haloalkanes-and-haloarenes": ("ha", 6, "Haloalkanes and Haloarenes"),
        "alcohols-phenols-and-ethers": ("ap", 7, "Alcohols, Phenols and Ethers"),
        "aldehydes-ketones-and-carboxylic-acids": ("ak", 8, "Aldehydes, Ketones and Carboxylic Acids"),
        "amines": ("am", 9, "Amines"),
        "biomolecules": ("bm", 10, "Biomolecules"),
    },
    "maths": {
        "relations-and-functions": ("rf", 1, "Relations and Functions"),
        "inverse-trigonometric-functions": ("it", 2, "Inverse Trigonometric Functions"),
        "matrices": ("mt", 3, "Matrices"),
        "determinants": ("dt", 4, "Determinants"),
        "continuity-and-differentiability": ("cd", 5, "Continuity and Differentiability"),
        "application-of-derivatives": ("ad", 6, "Application of Derivatives"),
        "integrals": ("in", 7, "Integrals"),
        "application-of-integrals": ("ai", 8, "Application of Integrals"),
        "differential-equations": ("de", 9, "Differential Equations"),
        "vector-algebra": ("va", 10, "Vector Algebra"),
        "three-dimensional-geometry": ("tg", 11, "Three Dimensional Geometry"),
        "linear-programming": ("lp", 12, "Linear Programming"),
        "probability": ("pr", 13, "Probability"),
    },
}

subj, slug = sys.argv[1], sys.argv[2]
db_subject, display, const_stem, pstem = SUBJECTS[subj]
code, no, book = CHAPTERS[subj][slug]
route = f"cbse-12-{subj}"
prefix, cprefix, const = f"{pstem}-{code}", f"{pstem}{code}", f"{const_stem}_{code.upper()}"

chapter_ts = io.open(os.path.join("src", "app", "notes", route, slug, "_data", "chapter.ts"), encoding="utf-8").read()
m = re.search(r'chapterName:\s*"([^"]+)"', chapter_ts)
chip = f"{m.group(1)} notes"

out = subprocess.run(
    [sys.executable, "scripts/notes-pipeline/cds-gk/reg-from-data.py", route, slug, db_subject, const, prefix,
     cprefix, chip, "--exam=CBSE Class 12"], capture_output=True, text=True, encoding="utf-8")
if out.returncode:
    sys.exit(out.stderr or out.stdout)
spec = json.loads(out.stdout)
spec["display"] = display
spec["blurb"] = (f"{len(spec['pages'])} pages, one per NCERT section (the DB subtopics kept as they are, in book order).\n"
                 "Order matches `subtopicOrder`.")
spec_path = os.path.join("generated-papers", f"_reg-{prefix}.json")
io.open(spec_path, "w", encoding="utf-8", newline="\n").write(json.dumps(spec, ensure_ascii=False, indent=1))
r = subprocess.run([sys.executable, "scripts/notes-pipeline/cds-gk/register.py", spec_path], capture_output=True, text=True, encoding="utf-8")
if r.returncode:
    sys.exit(r.stderr or r.stdout)
print(r.stdout.strip())

# Book position: one block per CBSE subject route, added after the mh-hsc-12-chemistry block.
p = os.path.join("src", "lib", "notes", "bookOrder.ts")
s = io.open(p, encoding="utf-8").read()
line = f'    {json.dumps(slug) if "-" in slug else slug}: {{ cls: 12, chapterNo: {no}, book: "NCERT XII {no} {book}" }},\n'
block_head = f'  "{route}": {{\n'
if block_head not in s:
    anchor = '  // JEE Mains Chemistry follows the rationalised NCERT books'
    s = s.replace(anchor, (f"  // CBSE Class 12 {db_subject} (board notes, 2026-11-25): the rationalised NCERT Class XII book.\n"
                           f"  // Add each chapter as it ships.\n" + block_head + "  },\n" + anchor), 1)
start = s.index(block_head) + len(block_head)
# The block's OWN closing line; the body may still be empty, so never search for "\n  },".
end = s.index("  },\n", start)
body = s[start:end]
if f"NCERT XII {no} " not in body:
    entries = [l for l in body.splitlines(keepends=True) if l.strip()] + [line]
    entries.sort(key=lambda l: int(re.search(r"chapterNo: (\d+)", l).group(1)))
    s = s[:start] + "".join(entries) + s[end:]
    io.open(p, "w", encoding="utf-8", newline="").write(s)
    print("book position", route, slug, no)
