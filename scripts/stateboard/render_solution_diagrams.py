"""
Render authored coordinate-geometry SOLUTION diagrams for State Board
Pair-of-Straight-Lines subjective questions (the 20 flagged `diagramWouldHelp`
items). Deterministic Pillow drawing — no new dependency (Pillow already ships
with the figure pipelines). Each spec lists lines (as A x + B y + C = 0),
points, an optional shaded polygon, and axis ranges; the renderer clips lines to
the viewport, draws labelled axes with arrowheads, and supersamples 2x for
anti-aliasing.

  python scripts/stateboard/render_solution_diagrams.py         # render all → out dir + montage
  python scripts/stateboard/render_solution_diagrams.py --montage-only

Outputs:
  scripts/stateboard/out/solution-diagrams/<slug>.png   (one per spec)
  scripts/stateboard/out/solution-diagrams/_montage.png (verify sheet)
  scripts/stateboard/data/pair-lines-12.solution-images.json  (ref -> png manifest)
"""
import os, json, math, re, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
# Per-chapter output; select with `python render_solution_diagrams.py <chapterId>`.
# SPEC_BUILDERS is populated at the bottom (after the build_* functions are defined).

SS = 2                      # supersample factor
W, H = 520, 460            # final px
MARGIN = 44

BLUE = (30, 90, 200)
RED = (200, 50, 60)
GREEN = (30, 150, 90)
PURPLE = (140, 70, 190)
GRAY = (120, 120, 120)
AXIS = (40, 40, 40)
SHADE = (120, 170, 235, 70)

def _font(sz):
    for name in ("arial.ttf", "DejaVuSans.ttf", "Arial.ttf"):
        try:
            return ImageFont.truetype(name, sz)
        except Exception:
            continue
    return ImageFont.load_default()

def ln(A, B, C, label="", color=BLUE, dashed=False):
    return {"A": A, "B": B, "C": C, "label": label, "color": color, "dashed": dashed}

def slope_line(m, label="", color=BLUE, dashed=False):
    # y = m x  ->  m x - y = 0
    return ln(m, -1.0, 0.0, label, color, dashed)

def vline(k, label="", color=BLUE, dashed=False):
    return ln(1.0, 0.0, -k, label, color, dashed)

def hline(k, label="", color=BLUE, dashed=False):
    return ln(0.0, 1.0, -k, label, color, dashed)

def yint_line(m, b, label="", color=BLUE, dashed=False):
    # y = m x + b -> m x - y + b = 0
    return ln(m, -1.0, b, label, color, dashed)

def constraint(A, B, op, C, label="", color=BLUE, dashed=False):
    # A linear-programming constraint  A x + B y {op} C  (op is "<=" or ">=").
    return {"A": float(A), "B": float(B), "op": op, "C": float(C), "label": label, "color": color, "dashed": dashed}


class Canvas:
    def __init__(self, spec):
        self.spec = spec
        self.xr = spec["xr"]; self.yr = spec["yr"]
        self.w, self.h = W * SS, H * SS
        self.img = Image.new("RGBA", (self.w, self.h), (255, 255, 255, 255))
        self.d = ImageDraw.Draw(self.img, "RGBA")
        self.m = MARGIN * SS
        self.f = _font(15 * SS)
        self.fs = _font(13 * SS)

    def px(self, x, y):
        x0, x1 = self.xr; y0, y1 = self.yr
        px = self.m + (x - x0) / (x1 - x0) * (self.w - 2 * self.m)
        py = self.h - self.m - (y - y0) / (y1 - y0) * (self.h - 2 * self.m)
        return (px, py)

    def _border_pts(self, A, B, C):
        # intersections of A x + B y + C = 0 with the viewport rectangle
        x0, x1 = self.xr; y0, y1 = self.yr
        pts = []
        if abs(B) > 1e-9:
            for x in (x0, x1):
                y = -(A * x + C) / B
                if y0 - 1e-9 <= y <= y1 + 1e-9:
                    pts.append((x, y))
        if abs(A) > 1e-9:
            for y in (y0, y1):
                x = -(B * y + C) / A
                if x0 - 1e-9 <= x <= x1 + 1e-9:
                    pts.append((x, y))
        # dedup
        uniq = []
        for p in pts:
            if not any(abs(p[0] - q[0]) < 1e-6 and abs(p[1] - q[1]) < 1e-6 for q in uniq):
                uniq.append(p)
        return uniq[:2]

    def axes(self):
        x0, x1 = self.xr; y0, y1 = self.yr
        # X axis
        ax0 = self.px(x0, 0); ax1 = self.px(x1, 0)
        self.d.line([ax0, ax1], fill=AXIS, width=2 * SS)
        # Y axis
        ay0 = self.px(0, y0); ay1 = self.px(0, y1)
        self.d.line([ay0, ay1], fill=AXIS, width=2 * SS)
        # arrowheads
        a = 6 * SS
        self.d.polygon([ax1, (ax1[0] - a, ax1[1] - a * 0.6), (ax1[0] - a, ax1[1] + a * 0.6)], fill=AXIS)
        self.d.polygon([ay1, (ay1[0] - a * 0.6, ay1[1] + a), (ay1[0] + a * 0.6, ay1[1] + a)], fill=AXIS)
        self.d.text((ax1[0] - 14 * SS, ax1[1] + 6 * SS), "X", font=self.fs, fill=AXIS)
        self.d.text((ay1[0] + 6 * SS, ay1[1] + 2 * SS), "Y", font=self.fs, fill=AXIS)
        # origin tick label
        ox, oy = self.px(0, 0)
        self.d.text((ox - 16 * SS, oy + 4 * SS), "O", font=self.fs, fill=AXIS)

    def _dashed(self, p, q, color, width):
        px0, py0 = p; px1, py1 = q
        dist = math.hypot(px1 - px0, py1 - py0)
        if dist < 1e-6:
            return
        dash = 9 * SS; gap = 6 * SS; t = 0.0
        ux, uy = (px1 - px0) / dist, (py1 - py0) / dist
        while t < dist:
            s = min(t + dash, dist)
            self.d.line([(px0 + ux * t, py0 + uy * t), (px0 + ux * s, py0 + uy * s)], fill=color, width=width)
            t = s + gap

    def line(self, L):
        pts = self._border_pts(L["A"], L["B"], L["C"])
        if len(pts) < 2:
            return
        p, q = self.px(*pts[0]), self.px(*pts[1])
        if L["dashed"]:
            self._dashed(p, q, L["color"], 3 * SS)
        else:
            self.d.line([p, q], fill=L["color"], width=3 * SS)
        if L["label"]:
            # label near the endpoint that's higher on screen
            lx, ly = (pts[0] if p[1] < q[1] else pts[1])
            tx, ty = self.px(lx, ly)
            tw = self.d.textlength(L["label"], font=self.fs)
            # inset from the right/left border so the label never clips
            if tx + tw + 6 * SS > self.w:
                tx = tx - tw - 6 * SS
            elif tx < self.m:
                tx = self.m
            self.d.text((tx + 4 * SS, ty + 2 * SS), L["label"], font=self.fs, fill=L["color"])

    def polygon(self, poly):
        pts = [self.px(x, y) for x, y in poly]
        self.d.polygon(pts, fill=SHADE)

    # ── Feasible-region shading (Linear Programming): intersect half-planes.
    @staticmethod
    def _inside(x, y, A, B, op, C):
        v = A * x + B * y
        return v <= C + 1e-9 if op == "<=" else v >= C - 1e-9

    def _clip(self, poly, A, B, op, C):
        # Sutherland-Hodgman: clip polygon by the half-plane {A x + B y op C}.
        out = []
        n = len(poly)
        for i in range(n):
            cur = poly[i]; nxt = poly[(i + 1) % n]
            ci = self._inside(cur[0], cur[1], A, B, op, C)
            ni = self._inside(nxt[0], nxt[1], A, B, op, C)
            if ci:
                out.append(cur)
            if ci != ni:
                x1, y1 = cur; x2, y2 = nxt
                d1 = A * x1 + B * y1 - C; d2 = A * x2 + B * y2 - C
                t = d1 / (d1 - d2)
                out.append((x1 + t * (x2 - x1), y1 + t * (y2 - y1)))
        return out

    def feasible(self, constraints):
        # Start from the viewport rectangle, clip by each constraint -> feasible polygon
        # (bounded or clipped-unbounded), shade it, then draw each boundary line.
        x0, x1 = self.xr; y0, y1 = self.yr
        poly = [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
        for c in constraints:
            poly = self._clip(poly, c["A"], c["B"], c["op"], c["C"])
            if not poly:
                break
        if poly:
            self.polygon(poly)
        for c in constraints:
            # skip the non-negativity constraints (x>=0 / y>=0) — they coincide with the axes
            if (c["A"], c["B"], c["C"]) in ((1.0, 0.0, 0.0), (0.0, 1.0, 0.0)):
                continue
            self.line(ln(c["A"], c["B"], -c["C"], c.get("label", ""), c.get("color", BLUE), c.get("dashed", False)))

    def point(self, p):
        x, y = self.px(p["x"], p["y"])
        r = 4 * SS
        self.d.ellipse([x - r, y - r, x + r, y + r], fill=(20, 20, 20))
        if p.get("label"):
            dx = p.get("dx", 8) * SS; dy = p.get("dy", -18) * SS
            self.d.text((x + dx, y + dy), p["label"], font=self.f, fill=(20, 20, 20))

    def caption(self):
        cap = self.spec.get("caption", "")
        if cap:
            x, y = 8 * SS, 8 * SS
            tw = self.d.textlength(cap, font=self.fs)
            th = 16 * SS
            # opaque white pad so the caption stays readable over any line
            self.d.rectangle([x - 3 * SS, y - 2 * SS, x + tw + 3 * SS, y + th], fill=(255, 255, 255, 235))
            self.d.text((x, y), cap, font=self.fs, fill=(60, 60, 60))

    def render(self):
        if self.spec.get("polygon"):
            self.polygon(self.spec["polygon"])
        if self.spec.get("feasible"):
            self.feasible(self.spec["feasible"])
        self.axes()
        for L in self.spec.get("lines", []):
            self.line(L)
        for p in self.spec.get("points", []):
            self.point(p)
        self.caption()
        return self.img.resize((W, H), Image.LANCZOS).convert("RGB")


def slug(ref):
    return re.sub(r"[^A-Za-z0-9]+", "_", ref).strip("_")


def build_pair_lines_specs():
    r3 = math.sqrt(3)
    S = []
    # 1. 4.1 Q7 — origin pair y=±√3 x + base y=3, equilateral triangle
    S.append(dict(ref="4.1 Ex 4.1 Q.7", xr=(-4, 4), yr=(-1, 4.2),
        caption="y = 3 with the two origin lines (60° base angles)",
        lines=[slope_line(r3, "y=√3x", BLUE), slope_line(-r3, "y=-√3x", RED), hline(3, "y=3", GREEN)],
        polygon=[(0, 0), (r3, 3), (-r3, 3)],
        points=[dict(x=r3, y=3, label="A", dx=6, dy=-20), dict(x=-r3, y=3, label="B", dx=-24, dy=-20)]))
    # 2. 4.1 Q9 — bisectors of the coordinate axes
    S.append(dict(ref="4.1 Ex 4.1 Q.9", xr=(-4, 4), yr=(-4, 4),
        caption="Angle bisectors of the axes: y = x and y = -x",
        lines=[slope_line(1, "y=x", BLUE), slope_line(-1, "y=-x", RED)]))
    # 3. 4.2 Q4 i — pair 3x²-4√3xy+3y²=0 -> y=√3x, y=(1/√3)x, acute 30°
    S.append(dict(ref="4.2 Q4 i)", xr=(-4, 4), yr=(-3, 4),
        caption="3x² - 4√3xy + 3y² = 0 — acute angle 30°",
        lines=[slope_line(r3, "60°", BLUE), slope_line(1 / r3, "30°", RED)]))
    # 4. 4.2 Q4 iii — 2x²+7xy+3y²=0 -> y=-x/3, y=-2x, acute 45°
    S.append(dict(ref="4.2 Q4 iii)", xr=(-4, 4), yr=(-4, 4),
        caption="2x² + 7xy + 3y² = 0 — acute angle 45°",
        lines=[slope_line(-1 / 3, "y=-x/3", BLUE), slope_line(-2, "y=-2x", RED)]))
    # 5. 4.2 Q5 — base 3x+2y-11=0 + two origin lines at 30° to it
    #   m1=-1.5; lines at tan(atan(m1)±30)
    a1 = math.atan(-1.5)
    m_a = math.tan(a1 + math.radians(30)); m_b = math.tan(a1 - math.radians(30))
    S.append(dict(ref="4.2 Q5", xr=(-6, 8), yr=(-4, 8),
        caption="Two origin lines each at 30° to 3x + 2y - 11 = 0",
        lines=[ln(3, 2, -11, "3x+2y-11=0", GREEN, dashed=True),
               slope_line(m_a, "30°", BLUE), slope_line(m_b, "30°", RED)]))
    # 6. 4.2 Q7 — origin lines y=±x/√3 (60° with Y-axis)
    S.append(dict(ref="4.2 Q7", xr=(-4, 4), yr=(-3, 3),
        caption="Lines through O making 60° with the Y-axis",
        lines=[slope_line(1 / r3, "60°", BLUE), slope_line(-1 / r3, "60°", RED)]))
    # 7. 4.3 Q9 — rectangle x=1,x=6,y=4,y=10 + diagonals
    S.append(dict(ref="4.3 Q9", xr=(-1, 8), yr=(0, 12),
        caption="Sides x=1,6 & y=4,10; diagonals AC, BD",
        lines=[vline(1, "x=1", GRAY), vline(6, "x=6", GRAY), hline(4, "y=4", GRAY), hline(10, "y=10", GRAY),
               ln(6, -5, 14, "AC", BLUE), ln(6, 5, -56, "BD", RED)],
        points=[dict(x=1, y=4, label="A", dx=-22, dy=2), dict(x=6, y=4, label="B", dx=6, dy=2),
                dict(x=6, y=10, label="C", dx=6, dy=-18), dict(x=1, y=10, label="D", dx=-22, dy=-18)]))
    # 8. 4.3 Q10 — pair x²-4xy+y²=0 (m=2±√3) + line 2x+3y-1=0, triangle OAB + median OM
    m1 = 2 + r3; m2 = 2 - r3
    # A = m1 line ∩ 2x+3y=1 ; B = m2 line ∩
    ax = 1 / (2 + 3 * m1); ay = m1 * ax
    bx = 1 / (2 + 3 * m2); by = m2 * bx
    mx, my = (ax + bx) / 2, (ay + by) / 2
    S.append(dict(ref="4.3 Q10", xr=(-0.25, 0.75), yr=(-0.2, 0.65),
        caption="ΔOAB from x²-4xy+y²=0 & 2x+3y-1=0; median OM",
        lines=[slope_line(m1, "", BLUE), slope_line(m2, "", RED), ln(2, 3, -1, "2x+3y=1", GREEN),
               yint_line(my / mx, 0, "median", PURPLE, dashed=True)],
        points=[dict(x=ax, y=ay, label="A", dx=6, dy=-18), dict(x=bx, y=by, label="B", dx=6, dy=2),
                dict(x=mx, y=my, label="M", dx=6, dy=-6)]))
    # 9. 4.3 Q11 — x-y-1=0 & x+y-1=0 cross at (1,0)
    S.append(dict(ref="4.3 Q11", xr=(-3, 4), yr=(-3, 3),
        caption="x - y - 1 = 0 and x + y - 1 = 0 meet at (1, 0)",
        lines=[ln(1, -1, -1, "x-y-1=0", BLUE), ln(1, 1, -1, "x+y-1=0", RED)],
        points=[dict(x=1, y=0, label="(1, 0)", dx=6, dy=-20)]))
    # 10. Misc Q1(iv) — y=±√3x (60°,120°)
    S.append(dict(ref="Misc II Q.1 (iv)", xr=(-3, 3), yr=(-3, 3),
        caption="Origin lines at 60° and 120°",
        lines=[slope_line(r3, "60°", BLUE), slope_line(-r3, "120°", RED)]))
    # 11. Misc Q6 — pair x²+3xy+2y²=0 (m=-1,-1/2) + bisectors 3x²+2xy-3y²=0 (m=(1±√10)/3)
    b1 = (1 + math.sqrt(10)) / 3; b2 = (1 - math.sqrt(10)) / 3
    S.append(dict(ref="Misc II Q.6", xr=(-4, 4), yr=(-3, 3),
        caption="Pair (solid) x²+3xy+2y²=0 & its bisectors (dashed)",
        lines=[slope_line(-1, "y=-x", BLUE), slope_line(-0.5, "y=-x/2", BLUE),
               slope_line(b1, "bisector", PURPLE, dashed=True), slope_line(b2, "bisector", PURPLE, dashed=True)]))
    # 12. Misc Q7 — origin lines ±1/√3 + vertical x=3, equilateral
    S.append(dict(ref="Misc II Q.7", xr=(-1, 4), yr=(-3, 3),
        caption="Origin pair & x = 3 — equilateral triangle",
        lines=[slope_line(1 / r3, "", BLUE), slope_line(-1 / r3, "", RED), vline(3, "x=3", GREEN)],
        polygon=[(0, 0), (3, r3), (3, -r3)],
        points=[dict(x=3, y=r3, label="A", dx=6, dy=-18), dict(x=3, y=-r3, label="B", dx=6, dy=2)]))
    # 13. Misc Q8 — pair x²-4xy+y²=0 (m=2±√3) + x+y=10, equilateral
    ax8 = 10 / (1 + m1); ay8 = m1 * ax8
    bx8 = 10 / (1 + m2); by8 = m2 * bx8
    S.append(dict(ref="Misc II Q.8", xr=(-1, 10), yr=(-1, 10),
        caption="x²-4xy+y²=0 & x+y=10 — equilateral ΔOAB",
        lines=[slope_line(m1, "", BLUE), slope_line(m2, "", RED), ln(1, 1, -10, "x+y=10", GREEN)],
        polygon=[(0, 0), (ax8, ay8), (bx8, by8)],
        points=[dict(x=ax8, y=ay8, label="A", dx=6, dy=-18), dict(x=bx8, y=by8, label="B", dx=6, dy=2)]))
    # 14. Misc Q10 — pair 5x²+6xy-y²=0 (m=3±√14) + bisectors x²-2xy-y²=0 (m=-1±√2)
    p1 = 3 + math.sqrt(14); p2 = 3 - math.sqrt(14)
    c1 = -1 + math.sqrt(2); c2 = -1 - math.sqrt(2)
    S.append(dict(ref="Misc II Q.10", xr=(-4, 4), yr=(-4, 4),
        caption="Pair (solid) 5x²+6xy-y²=0 & bisectors (dashed)",
        lines=[slope_line(p1, "", BLUE), slope_line(p2, "", BLUE),
               slope_line(c1, "bisector", PURPLE, dashed=True), slope_line(c2, "bisector", PURPLE, dashed=True)]))
    # 15. Misc Q13(iii) — lines through (3,4): y=x+1, y=-2x+10
    S.append(dict(ref="Misc II Q.13 (iii)", xr=(-1, 6), yr=(-1, 9),
        caption="Pair through (3, 4); acute angle arctan 3",
        lines=[yint_line(1, 1, "y=x+1", BLUE), yint_line(-2, 10, "y=-2x+10", RED)],
        points=[dict(x=3, y=4, label="(3, 4)", dx=8, dy=-6)]))
    # 16. Misc Q14 — origin lines y=±x/√3 (60° with Y-axis)
    S.append(dict(ref="Misc II Q.14", xr=(-4, 4), yr=(-3, 3),
        caption="Origin lines making 60° with the Y-axis",
        lines=[slope_line(1 / r3, "60°", BLUE), slope_line(-1 / r3, "60°", RED)]))
    # 17. Misc Q16 — base x+y=0 + two lines at α (representative α=30°)
    ab = math.radians(135)
    ma = math.tan(ab + math.radians(30)); mb = math.tan(ab - math.radians(30))
    S.append(dict(ref="Misc II Q.16", xr=(-4, 4), yr=(-4, 4),
        caption="Origin pair each at angle α to x + y = 0 (α = 30° shown)",
        lines=[slope_line(-1, "x+y=0", GREEN, dashed=True), slope_line(ma, "α", BLUE), slope_line(mb, "α", RED)]))
    # 18. Misc Q17 — base 3x+4y+5=0 + pair (3x+4y)²-3(4x-3y)²=0
    s1 = -(3 - 4 * r3) / (4 + 3 * r3); s2 = -(3 + 4 * r3) / (4 - 3 * r3)
    S.append(dict(ref="Misc II Q.17", xr=(-4, 4), yr=(-4, 3),
        caption="3x+4y+5=0 with (3x+4y)²-3(4x-3y)²=0 — equilateral",
        lines=[ln(3, 4, 5, "3x+4y+5=0", GREEN), slope_line(s1, "", BLUE), slope_line(s2, "", RED)]))
    # 19. Misc Q18 — pair x²-4xy+y²=0 + x+y=√6, equilateral
    k = math.sqrt(6)
    ax18 = k / (1 + m1); ay18 = m1 * ax18
    bx18 = k / (1 + m2); by18 = m2 * bx18
    S.append(dict(ref="Misc II Q.18", xr=(-0.5, 3), yr=(-0.5, 3),
        caption="x²-4xy+y²=0 & x+y=√6 — equilateral ΔOAB",
        lines=[slope_line(m1, "", BLUE), slope_line(m2, "", RED), ln(1, 1, -k, "x+y=√6", GREEN)],
        polygon=[(0, 0), (ax18, ay18), (bx18, by18)],
        points=[dict(x=ax18, y=ay18, label="A", dx=6, dy=-18), dict(x=bx18, y=by18, label="B", dx=6, dy=2)]))
    # 20. Misc Q23 — general equilateral (representative: y=±√3x + base y=2)
    S.append(dict(ref="Misc II Q.23", xr=(-4, 4), yr=(-1, 4),
        caption="ax²+2hxy+by²=0 & lx+my=1 — equilateral (schematic)",
        lines=[slope_line(r3, "", BLUE), slope_line(-r3, "", RED), hline(2, "lx+my=1", GREEN)],
        polygon=[(0, 0), (2 / r3, 2), (-2 / r3, 2)],
        points=[dict(x=2 / r3, y=2, label="A", dx=6, dy=-18), dict(x=-2 / r3, y=2, label="B", dx=-22, dy=-18)]))
    return S


_COLORS = {"blue": BLUE, "red": RED, "green": GREEN, "purple": PURPLE, "gray": GRAY}

def build_linear_prog_specs():
    # Ch.7 Linear Programming diagrams are DATA-DRIVEN: the solving agents emit a
    # per-question JSON spec (they know each problem's exact constraints + corners)
    # to data/linear-prog-12.diagram-specs.json. Each entry:
    #   {ref, xr:[..], yr:[..], caption, constraints:[{A,B,op,C,label,color}],
    #    lines:[{A,B,C,label,color,dashed}], points:[{x,y,label,dx,dy}]}
    p = os.path.join(HERE, "data", "linear-prog-12.diagram-specs.json")
    if not os.path.exists(p):
        return []
    raw = json.load(open(p, encoding="utf-8"))
    specs = []
    for r in raw:
        spec = {"ref": r["ref"], "xr": tuple(r["xr"]), "yr": tuple(r["yr"]), "caption": r.get("caption", "")}
        col = lambda name: _COLORS.get(name, BLUE)
        if r.get("constraints"):
            spec["feasible"] = [constraint(c["A"], c["B"], c["op"], c["C"], c.get("label", ""), col(c.get("color", "blue")), c.get("dashed", False)) for c in r["constraints"]]
        if r.get("lines"):
            spec["lines"] = [ln(l["A"], l["B"], l["C"], l.get("label", ""), col(l.get("color", "blue")), l.get("dashed", False)) for l in r["lines"]]
        if r.get("points"):
            spec["points"] = [dict(x=pt["x"], y=pt["y"], label=pt.get("label", ""), dx=pt.get("dx", 8), dy=pt.get("dy", -18)) for pt in r["points"]]
        specs.append(spec)
    return specs


# chapterId -> spec builder. Add an entry when a new chapter authors diagrams.
SPEC_BUILDERS = {
    "pair-lines-12": build_pair_lines_specs,
    "linear-prog-12": build_linear_prog_specs,
}


def montage(paths):
    imgs = [Image.open(p) for p in paths]
    cols = 4
    rows = math.ceil(len(imgs) / cols)
    cell_w, cell_h = W, H
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), (255, 255, 255))
    for i, im in enumerate(imgs):
        r, c = divmod(i, cols)
        sheet.paste(im, (c * cell_w, r * cell_h))
    return sheet


def main(chapter):
    if chapter not in SPEC_BUILDERS:
        raise SystemExit(f"unknown chapter '{chapter}'. Known: {', '.join(SPEC_BUILDERS)}")
    outdir = os.path.join(HERE, "out", f"{chapter}-diagrams")
    manifest_path = os.path.join(HERE, "data", f"{chapter}.solution-images.json")
    os.makedirs(outdir, exist_ok=True)
    specs = SPEC_BUILDERS[chapter]()
    manifest = []
    paths = []
    for spec in specs:
        img = Canvas(spec).render()
        p = os.path.join(outdir, slug(spec["ref"]) + ".png")
        img.save(p)
        paths.append(p)
        manifest.append({"ref": spec["ref"], "png": os.path.relpath(p, os.getcwd()).replace("\\", "/")})
    if paths:
        montage(paths).save(os.path.join(outdir, "_montage.png"))
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"rendered {len(specs)} diagrams -> {outdir}")
    print(f"montage -> {os.path.join(outdir, '_montage.png')}")
    print(f"manifest -> {manifest_path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "pair-lines-12")
