"""Build the solution-diagram specs for MH State Board Std XII Physics Ch.16.

Two questions in the Exercises ask the student to DRAW a circuit -
  Ex Q.3  "Draw the circuit diagram of a half wave rectifier..."
  Ex Q.5  "Draw a neat diagram of a full wave rectifier..."
- so for these the ANSWER IS THE DRAWING and they get a solution_image
(migration 0042), the same call Linear Programming made for its feasible regions.

Every coordinate is COMPUTED here rather than hand-typed into the JSON, so the
geometry can be audited (see the asserts at the bottom) instead of eyeballed.
Output: scripts/stateboard/data/semiconductor-devices-12-phy.diagram-specs.json
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "data", "semiconductor-devices-12-phy.diagram-specs.json")

BLUE = "blue"
RED = "red"
BLACK = "black"
GRAY = "gray"

WIRE = BLACK


def seg(x1, y1, x2, y2, color=WIRE, **kw):
    d = dict(x1=x1, y1=y1, x2=x2, y2=y2, color=color)
    d.update(kw)
    return d


def wire_path(pts, color=WIRE):
    """A chain of finite segments through the given points."""
    return [seg(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], color)
            for i in range(len(pts) - 1)]


def coil(x, y0, y1, n, r, side):
    """A transformer winding: n half-circle bumps stacked on the vertical x = const.

    side=+1 bulges right, side=-1 bulges left.  Returned as conic ARCS, which the
    renderer draws parametrically so the px transform is respected.
    """
    h = (y1 - y0) / n
    arcs = []
    for i in range(n):
        cy = y0 + h * (i + 0.5)
        t0, t1 = (-90.0, 90.0) if side > 0 else (90.0, 270.0)
        arcs.append(dict(cx=x, cy=cy, a=r, b=h / 2.0, t0=t0, t1=t1, color=BLUE, close=False))
    return arcs


def zigzag_v(x, ytop, ybot, n=6, w=0.20, color=BLUE):
    """A vertical resistor drawn as a zigzag polyline between two y values."""
    pts = [[x, ytop]]
    h = (ytop - ybot) / n
    for i in range(n):
        side = 1 if i % 2 == 0 else -1
        pts.append([x + side * w, ytop - h * (i + 0.5)])
    pts.append([x, ybot])
    return dict(pts=pts, color=color, close=False)


def diode_right(xa, y, L=0.62, hh=0.26, color=BLUE):
    """A diode symbol conducting to the RIGHT: filled triangle + cathode bar.

    Returns (fill_polygon, outline_poly, bar_segment, lead_in, lead_out_x).
    """
    tri = [[xa, y + hh], [xa, y - hh], [xa + L, y]]
    bar = seg(xa + L, y + hh, xa + L, y - hh, color)
    return tri, dict(pts=tri, color=color, close=True), bar, xa, xa + L


def sine_in_circle(cx, cy, r):
    """The AC-source squiggle: a small sine drawn as a polyline inside the circle."""
    import math
    pts = []
    for i in range(41):
        t = -1.0 + 2.0 * i / 40.0            # -1 .. 1
        pts.append([cx + t * r * 0.72, cy + 0.42 * r * math.sin(math.pi * t)])
    return dict(pts=pts, color=BLUE, close=False)


# ─────────────────────────── Ex Q.3 — half wave rectifier ───────────────────────────
def half_wave():
    S, P, T = [], [], []          # segments, polys, texts
    shade = []

    y_top, y_bot = 5.20, 1.40     # secondary rails
    x_src = 0.85
    x_pri, x_sec = 2.45, 3.35     # winding verticals
    x_core_a, x_core_b = 2.78, 3.02

    # AC source
    S += [dict(cx=x_src, cy=3.30, r=0.42, color=BLUE, close=True)]   # handled as conic below
    conics = [dict(cx=x_src, cy=3.30, a=0.42, b=0.42, color=BLUE, close=True)]
    S = []
    P.append(sine_in_circle(x_src, 3.30, 0.42))

    # source -> primary
    S += wire_path([(x_src, 3.72), (x_src, 5.60), (x_pri, 5.60), (x_pri, 5.20)])
    S += wire_path([(x_src, 2.88), (x_src, 1.00), (x_pri, 1.00), (x_pri, 1.40)])

    # windings + core
    conics += coil(x_pri, 1.40, 5.20, 5, 0.30, -1)
    conics += coil(x_sec, y_bot, y_top, 5, 0.30, +1)
    S += [seg(x_core_a, 1.20, x_core_a, 5.40, GRAY), seg(x_core_b, 1.20, x_core_b, 5.40, GRAY)]

    # A -> diode -> X
    x_d = 5.05
    tri, out, bar, lead_in, lead_out = diode_right(x_d, y_top)
    shade.append(tri)
    P.append(out)
    S.append(bar)
    S += wire_path([(x_sec, y_top), (lead_in, y_top)])
    x_X = 8.35
    S += wire_path([(lead_out, y_top), (x_X, y_top)])

    # load resistor between X and Y
    y_rt, y_rb = 4.35, 2.35
    S += wire_path([(x_X, y_top), (x_X, y_rt)])
    P.append(zigzag_v(x_X, y_rt, y_rb))
    S += wire_path([(x_X, y_rb), (x_X, y_bot), (x_sec, y_bot)])

    # Every label carries an explicit pixel offset: a label drawn ON a wire or on
    # the diode body is struck through by it (the Oscillations lesson).
    T += [
        dict(x=-1.25, y=3.15, text="AC input", small=True, dy=2),
        dict(x=1.15, y=6.15, text="Transformer", small=True, dy=2),
        dict(x=x_sec + 0.14, y=y_top, text="A", dy=-34),
        dict(x=x_sec + 0.14, y=y_bot, text="B", dy=6),
        dict(x=x_X + 0.12, y=y_top, text="X", dy=-34),
        dict(x=x_X + 0.12, y=y_bot, text="Y", dy=6),
        dict(x=x_d + 0.16, y=y_top, text="D", dy=-38),
        dict(x=x_X + 0.32, y=3.45, text="RL", dy=0),
    ]
    return dict(
        ref="Ex Q.3",
        caption="Half wave rectifier: one diode conducts on alternate positive half cycles.",
        xr=(-1.35, 9.80), yr=(0.55, 6.45),
        axes=False, equal_aspect=True,
        segments=S, polys=P, conics=conics, shade_polys=shade, texts=T,
    )


# ─────────────────────────── Ex Q.5 — full wave rectifier ───────────────────────────
def full_wave():
    S, P, T = [], [], []
    shade = []

    y_A, y_B, y_CT = 5.30, 1.30, 3.30
    x_pri, x_sec = 2.30, 3.20
    x_core_a, x_core_b = 2.63, 2.87
    x_src = 0.80

    conics = [dict(cx=x_src, cy=y_CT, a=0.42, b=0.42, color=BLUE, close=True)]
    P.append(sine_in_circle(x_src, y_CT, 0.42))
    S += wire_path([(x_src, y_CT + 0.42), (x_src, 5.75), (x_pri, 5.75), (x_pri, 5.30)])
    S += wire_path([(x_src, y_CT - 0.42), (x_src, 0.85), (x_pri, 0.85), (x_pri, 1.30)])

    conics += coil(x_pri, 1.30, 5.30, 5, 0.28, -1)
    # secondary drawn as two halves so the centre tap sits between them
    conics += coil(x_sec, y_CT, y_A, 3, 0.28, +1)
    conics += coil(x_sec, y_B, y_CT, 3, 0.28, +1)
    S += [seg(x_core_a, 1.10, x_core_a, 5.50, GRAY), seg(x_core_b, 1.10, x_core_b, 5.50, GRAY)]

    x_d, x_join = 5.05, 8.60
    # D1 on the top rail
    tri1, out1, bar1, in1, out1x = diode_right(x_d, y_A)
    shade.append(tri1); P.append(out1); S.append(bar1)
    S += wire_path([(x_sec, y_A), (in1, y_A)])
    S += wire_path([(out1x, y_A), (x_join, y_A), (x_join, y_CT)])
    # D2 on the bottom rail
    tri2, out2, bar2, in2, out2x = diode_right(x_d, y_B)
    shade.append(tri2); P.append(out2); S.append(bar2)
    S += wire_path([(x_sec, y_B), (in2, y_B)])
    S += wire_path([(out2x, y_B), (x_join, y_B), (x_join, y_CT)])

    # X -> load -> bottom rail -> centre tap
    x_load, y_rail = 9.75, 0.05
    y_rt, y_rb = 2.75, 1.15
    S += wire_path([(x_join, y_CT), (x_load, y_CT), (x_load, y_rt)])
    P.append(zigzag_v(x_load, y_rt, y_rb))
    S += wire_path([(x_load, y_rb), (x_load, y_rail), (3.85, y_rail), (3.85, y_CT), (x_sec, y_CT)])

    T += [
        dict(x=-1.30, y=3.15, text="AC input", small=True, dy=2),
        dict(x=0.05, y=6.50, text="Centre-tap transformer", small=True, dy=2),
        dict(x=x_sec + 0.14, y=y_A, text="A", dy=-26),
        dict(x=x_sec + 0.14, y=y_B, text="B", dy=6),
        dict(x=x_sec + 0.42, y=y_CT, text="Centre tap", small=True, dy=-20),
        dict(x=x_d + 0.14, y=y_A, text="D1", dy=-38),
        dict(x=x_d + 0.14, y=y_B, text="D2", dy=-38),
        dict(x=x_join + 0.14, y=y_CT, text="X", dy=-34),
        dict(x=x_load + 0.30, y=2.05, text="RL", dy=0),
        dict(x=6.05, y=y_rail, text="Output taken across RL", small=True, dy=8),
    ]
    return dict(
        ref="Ex Q.5",
        caption="Full wave rectifier: D1 conducts on the positive half cycle, D2 on the negative.",
        xr=(-1.40, 11.20), yr=(-0.60, 6.80),
        axes=False, equal_aspect=True,
        segments=S, polys=P, conics=conics, shade_polys=shade, texts=T,
    )


def audit(specs):
    """Geometry audit from the spec data itself, not from looking at the PNG."""
    ok = True
    for sp in specs:
        xr, yr = sp["xr"], sp["yr"]
        for s in sp["segments"]:
            for (x, y) in [(s["x1"], s["y1"]), (s["x2"], s["y2"])]:
                if not (xr[0] <= x <= xr[1] and yr[0] <= y <= yr[1]):
                    print(f"  !! {sp['ref']}: segment endpoint ({x},{y}) outside viewport"); ok = False
        for p in sp["polys"] + [dict(pts=t) for t in sp["shade_polys"]]:
            for (x, y) in p["pts"]:
                if not (xr[0] - 1e-9 <= x <= xr[1] + 1e-9 and yr[0] - 1e-9 <= y <= yr[1] + 1e-9):
                    print(f"  !! {sp['ref']}: poly point ({x},{y}) outside viewport"); ok = False
        for t in sp["texts"]:
            if not (xr[0] <= t["x"] <= xr[1] and yr[0] <= t["y"] <= yr[1]):
                print(f"  !! {sp['ref']}: label '{t['text']}' at ({t['x']},{t['y']}) outside viewport"); ok = False
        # every diode triangle must have its apex to the RIGHT of its two base
        # vertices, i.e. it must point in the conduction direction
        for tri in sp["shade_polys"]:
            xs = [p[0] for p in tri]
            if not (tri[2][0] > tri[0][0] and abs(tri[0][0] - tri[1][0]) < 1e-9):
                print(f"  !! {sp['ref']}: diode triangle does not point right: {tri}"); ok = False
        # the circuit must be CLOSED: every wire endpoint must be shared with at
        # least one other wire endpoint (no dangling lead).
        from collections import Counter
        c = Counter()
        for s in sp["segments"]:
            if s.get("color") == GRAY:
                continue          # the transformer CORE touches no wire, by design
            c[(round(s["x1"], 6), round(s["y1"], 6))] += 1
            c[(round(s["x2"], 6), round(s["y2"], 6))] += 1
        dangling = [k for k, v in c.items() if v == 1]
        # a dangling endpoint is legitimate only where a wire meets a coil arc, a
        # diode bar or a resistor zigzag; collect those anchor points.
        anchors = set()
        for p in sp["polys"]:
            anchors.add((round(p["pts"][0][0], 6), round(p["pts"][0][1], 6)))
            anchors.add((round(p["pts"][-1][0], 6), round(p["pts"][-1][1], 6)))
        for tri in sp["shade_polys"]:
            anchors.add((round(tri[0][0], 6), round(tri[0][1], 6)))
            anchors.add((round(tri[1][0], 6), round(tri[1][1], 6)))
            anchors.add((round(tri[2][0], 6), round(tri[2][1], 6)))
        for cn in sp["conics"]:
            b = cn.get("b") or cn.get("r")
            if b:
                anchors.add((round(cn["cx"], 6), round(cn["cy"] - b, 6)))
                anchors.add((round(cn["cx"], 6), round(cn["cy"] + b, 6)))
        # a diode's cathode BAR ends free, and the anode wire meets the middle of
        # the triangle's base - both are component terminals, not dangling wire
        for tri in sp["shade_polys"]:
            xa, hi = tri[0][0], tri[0][1]
            lo = tri[1][1]
            apex_x = tri[2][0]
            anchors.add((round(apex_x, 6), round(hi, 6)))
            anchors.add((round(apex_x, 6), round(lo, 6)))
            anchors.add((round(xa, 6), round((hi + lo) / 2.0, 6)))
        stray = [d for d in dangling if d not in anchors]
        if stray:
            print(f"  !! {sp['ref']}: {len(stray)} dangling wire end(s) not on a component: {stray}")
            ok = False
    return ok


specs = [half_wave(), full_wave()]
print("audit:", "PASS" if audit(specs) else "FAIL")
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(specs, f, indent=2, ensure_ascii=False)
print("wrote", OUT, f"({len(specs)} specs)")
