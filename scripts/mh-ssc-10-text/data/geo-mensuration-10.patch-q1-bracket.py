# geo-mensuration-10: strengthen the Ex 7.4 Q1 errata bracket with the third
# piece of evidence (the figure's own proportions), measured off the rendered
# page rather than eyeballed. Editing `solution` only is content_hash-safe.
# Refuses unless the target text matches exactly once.
import io, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(HERE, "geo-mensuration-10.solutions-by-ref.json")

OLD = (
    "The stem and Fig. 7.43 both put the \\(45^\\circ\\) at B, and A is the centre, "
    "so the central angle \\(\\angle\\) BAC is \\(90^\\circ\\) and the segment is 28 sq.cm."
)
NEW = (
    "Three things agree that the \\(45^\\circ\\) belongs at B: the stem says \\(\\angle\\) ABC, "
    "the angle arc in Fig. 7.43 is drawn at B, and the figure is to scale \\(-\\) chord BC "
    "subtends about \\(95^\\circ\\) at the centre of the circle as drawn. Since A is the centre, "
    "AB and AC are radii and the central angle \\(\\angle\\) BAC is \\(90^\\circ\\), "
    "so the segment is 28 sq.cm."
)

d = json.load(io.open(P, encoding="utf-8"))
s = d["Ex 7.4 Q1"]
if s.count(OLD) != 1:
    sys.exit("refusing: target text matched %d times, expected exactly 1" % s.count(OLD))
if OLD == NEW:
    sys.exit("refusing: find == replace (a shell-mangled needle?)")
d["Ex 7.4 Q1"] = s.replace(OLD, NEW)
io.open(P, "w", encoding="utf-8", newline="\n").write(json.dumps(d, ensure_ascii=False, indent=2) + "\n")
print("patched. new bracket:\n")
print(d["Ex 7.4 Q1"].split("]")[0] + "]")
