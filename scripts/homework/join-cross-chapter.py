"""Join cross-chapter repeats into a review's out/ files (main session, 2026-11-04).

    python scripts/homework/join-cross-chapter.py <reviewDir> <pairs.txt>

<pairs.txt> holds one accepted pair per line: two id prefixes (8+ hex chars),
each pair read and judged the SAME question asked again (same ask; numbers may
differ). Pairs are unioned: if either question already sits in a repeat, that
whole group joins (a group is never split). A resulting group whose questions
come from more than one chapter moves to out/zz-cross-chapter.json, since the
per-chapter validator accepts only its own chapter's ids; assemble.ts reads
every out/ file and refuses a question in two repeats. A brand-new group gets a
"TODO" label: write a real one before assembling (the label heads the group's
See all page).

Flags: each group's newest member (by shift) is changed=false, every other
member that came from another group or pair is changed=true.
"""
import glob, json, os, re, sys

MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def key(label):
    day, mon, year, s = re.match(r"^(?:(\d{1,2}) )?([A-Z][a-z]{2}) (\d{4}) S([12])$", label).groups()
    return ((int(year) * 12 + MON.index(mon)) * 32 + int(day or 0)) * 3 + int(s)


def main():
    review, pairs_path = sys.argv[1], sys.argv[2]
    out_dir = os.path.join(review, "out")
    shift, chapter = {}, {}
    for f in glob.glob(os.path.join(review, "evidence", "*.md")):
        name = os.path.basename(f)[:-3]
        for m in re.finditer(r"^### ([0-9a-f-]{36}) \| ([^|]+?) \|", open(f, encoding="utf-8").read(), re.M):
            shift[m.group(1)], chapter[m.group(1)] = m.group(2), name

    def full(p):
        hits = [i for i in shift if i.startswith(p)]
        assert len(hits) == 1, (p, hits)
        return hits[0]

    files = {os.path.basename(f)[:-5]: json.load(open(f, encoding="utf-8")) for f in glob.glob(os.path.join(out_dir, "*.json"))}
    zz = files.setdefault("zz-cross-chapter", {"chapter": "Cross-chapter", "repeats": [], "types": []})

    def group_of(qid):
        for d in files.values():
            for g in d["repeats"]:
                if any(m["id"] == qid for m in g["members"]):
                    return d, g
        return None, None

    for line in open(pairs_path, encoding="utf-8"):
        line = line.split("#")[0].strip()
        if not line:
            continue
        a, b = (full(p) for p in line.split()[:2])
        da, ga = group_of(a)
        db, gb = group_of(b)
        if ga is not None and gb is not None and ga is gb:
            continue
        if ga is None and gb is None:
            g = {"label": f"TODO {a[:8]} {b[:8]}", "members": [{"id": a, "changed": True}, {"id": b, "changed": True}]}
            zz["repeats"].append(g)
            continue
        if ga is None:  # b's group takes a
            gb["members"].append({"id": a, "changed": True})
            continue
        if gb is None:
            ga["members"].append({"id": b, "changed": True})
            continue
        # merge b's group into a's
        for m in gb["members"]:
            ga["members"].append({"id": m["id"], "changed": True})
        db["repeats"] = [g for g in db["repeats"] if g is not gb]

    # Re-flag and move multi-chapter groups out of chapter files.
    for name, d in list(files.items()):
        keep = []
        for g in d["repeats"]:
            newest = max(g["members"], key=lambda m: key(shift[m["id"]]))
            for m in g["members"]:
                m["changed"] = m["changed"] if m is not newest else False
            if name != "zz-cross-chapter" and len({chapter[m["id"]] for m in g["members"]}) > 1:
                zz["repeats"].append(g)
            else:
                keep.append(g)
        d["repeats"] = keep
    for name, d in files.items():
        json.dump(d, open(os.path.join(out_dir, name + ".json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    todo = [g for g in zz["repeats"] if g["label"].startswith("TODO")]
    print(f"cross-chapter repeats: {len(zz['repeats'])}; needing a label: {len(todo)}")
    for g in todo:
        print(" ", g["label"])


main()
