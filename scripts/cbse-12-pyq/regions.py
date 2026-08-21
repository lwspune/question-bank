"""Figure-region detection: cluster abutting image rects into whole figures.

The PDF producer SLICES a figure into horizontal strips (3 strips of 55pt in
one file, 7 of 24.5pt in another for the same diagram), so an embedded-image
extraction yields fragments, never the figure. Regions are therefore unioned
and the RENDERED page is cropped over the union.

Rects are plain (x0,y0,x1,y1) tuples on purpose: the first version used
fitz.Rect and `cluster |= rect`, whose __ior__ returns a NEW Rect, so the list
element was never updated and every rect that matched a cluster was silently
DROPPED. The symptom was a figure reading as fragments and two pages reading as
"no figure at all". Nothing about the output said "merge failed".
"""
MIN_W, MIN_H, GLUE = 50.0, 40.0, 4.0


def union(a, b):
    return (min(a[0], b[0]), min(a[1], b[1]), max(a[2], b[2]), max(a[3], b[3]))


def touches(a, b, glue):
    return not (a[2] + glue < b[0] or b[2] + glue < a[0]
                or a[3] + glue < b[1] or b[3] + glue < a[1])


def merge(rects, glue=GLUE):
    """Union every group of rects connected through `glue` proximity."""
    out = [tuple(r) for r in rects]
    changed = True
    while changed:
        changed = False
        for i in range(len(out)):
            for j in range(i + 1, len(out)):
                if touches(out[i], out[j], glue):
                    out[i] = union(out[i], out[j])
                    del out[j]
                    changed = True
                    break
            if changed:
                break
    return out


def big(rects, min_w=MIN_W, min_h=MIN_H):
    return [r for r in rects if r[2] - r[0] >= min_w and r[3] - r[1] >= min_h]


def _selftest():
    # 3 abutting strips -> ONE region. This is the case the first merge lost.
    strips = [(203.5, 147.1, 408.1, 202.3), (203.5, 202.0, 408.1, 257.2),
              (203.5, 256.8, 408.1, 303.6)]
    m = merge(strips)
    assert len(m) == 1, f"3 abutting strips merged to {len(m)} regions"
    assert abs(m[0][1] - 147.1) < 1e-6 and abs(m[0][3] - 303.6) < 1e-6, m[0]
    # nothing may be lost: total area covered must not shrink
    assert len(merge([(0, 0, 10, 10), (100, 100, 110, 110)])) == 2
    # 7 thin strips, each individually BELOW the height floor, form one figure
    thin = [(203.8, 193.0 + i * 24.4, 408.5, 217.4 + i * 24.4) for i in range(7)]
    assert len(big(merge(thin))) == 1, "thin strips must survive as one figure"
    assert big(thin) == [], "an individual thin strip must not pass on its own"
    print("regions selftest OK")


if __name__ == "__main__":
    _selftest()
