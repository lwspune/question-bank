"""Wire one agent-built /notes diagram: VisualizationSlug union, ConceptUnitCard import + case,
and visualizationSlug on the concept. Idempotent; refuses if an anchor is missing.
usage (repo root): python scripts/notes-pipeline/afcat/wire-diagram.py <slug> <Component> <chapter-folder> <concept-slug>
e.g. python scripts/notes-pipeline/afcat/wire-diagram.py af-clock-angle AfClockAngle clock afcl-angle-formula"""
import glob, io, os, sys

slug, comp, folder, concept = sys.argv[1:5]
root = os.getcwd()


def rw(path, fn):
    s = io.open(path, encoding="utf-8", newline="").read()
    t = fn(s, "\r\n" if "\r\n" in s else "\n")
    if t != s:
        io.open(path, "w", encoding="utf-8", newline="").write(t)


def union(s, nl):
    if f'| "{slug}"' in s:
        return s
    anchor = "export type VisualizationSlug ="
    i = s.index(anchor) + len(anchor)
    return s[:i] + nl + f'  | "{slug}"' + s[i:]


def card(s, nl):
    if f'from "./visualizations/{comp}"' not in s:
        anchor = 'import RatioBarModel from "./visualizations/RatioBarModel";'
        assert anchor in s, "import anchor missing"
        s = s.replace(anchor, anchor + nl + f'import {comp} from "./visualizations/{comp}";')
    if f'case "{slug}":' not in s:
        anchor = '    case "ratio-bar-model":' + nl + "      return <RatioBarModel />;"
        assert anchor in s, "case anchor missing"
        s = s.replace(anchor, anchor + nl + f'    case "{slug}":' + nl + f"      return <{comp} />;")
    return s


def concept_file(s, nl):
    a = f'slug: "{concept}",'
    if a not in s or f'visualizationSlug: "{slug}"' in s:
        return s
    i = s.index(a)
    indent = s[s.rindex("\n", 0, i) + 1 : i]
    return s.replace(a, a + nl + f'{indent}visualizationSlug: "{slug}",', 1)


assert os.path.exists(os.path.join(root, "src/app/notes/_components/visualizations", comp + ".tsx")), comp
rw(os.path.join(root, "src/app/notes/_types.ts"), union)
rw(os.path.join(root, "src/app/notes/_components/ConceptUnitCard.tsx"), card)
hits = [f for f in glob.glob(os.path.join(root, "src/app/notes/afcat-maths", folder, "_data", "*.ts"))
        if f'slug: "{concept}",' in io.open(f, encoding="utf-8").read()]
assert len(hits) == 1, f"concept {concept}: {len(hits)} files"
rw(hits[0], concept_file)
print(f"wired {slug} -> {comp} on {concept}")
