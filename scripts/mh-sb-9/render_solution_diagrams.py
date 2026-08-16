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
import os, json, math, re, sys, glob
import numpy as np
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
        self.w, self.h = W * SS, H * SS
        self.m = MARGIN * SS
        xr = list(spec["xr"]); yr = list(spec["yr"])
        # `equal_aspect` (physical-geometry figures): make the x and y scales equal so
        # a circle renders as a CIRCLE and a right angle looks square. px() maps xr/yr
        # to the drawable box independently, so without this a semicircular window
        # comes out an ellipse. Only ever EXPANDS a range (never crops the author's
        # intended view). Default OFF — the coordinate-plane chapters (LP, area
        # regions) deliberately use their own aspect and must not change.
        if spec.get("equal_aspect"):
            target = (self.w - 2 * self.m) / (self.h - 2 * self.m)   # required dx/dy
            dx = xr[1] - xr[0]; dy = yr[1] - yr[0]
            if dx / dy < target:
                need = dy * target; c = (xr[0] + xr[1]) / 2.0; xr = [c - need / 2, c + need / 2]
            else:
                need = dx / target; c = (yr[0] + yr[1]) / 2.0; yr = [c - need / 2, c + need / 2]
        self.xr = tuple(xr); self.yr = tuple(yr)
        self.img = Image.new("RGBA", (self.w, self.h), (255, 255, 255, 255))
        self.d = ImageDraw.Draw(self.img, "RGBA")
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

    # ── Curve support (Application of Definite Integration: area under / between
    #    curves). Expressions are Python in `x`, evaluated with numpy in scope.
    _SAFE = {"np": np, "sqrt": np.sqrt, "sin": np.sin, "cos": np.cos, "tan": np.tan,
             "log": np.log, "abs": np.abs, "pi": np.pi, "e": np.e}

    def _evalv(self, expr, xs):
        v = eval(expr, {"__builtins__": {}}, {**self._SAFE, "x": xs})
        return np.broadcast_to(np.asarray(v, dtype=float), np.shape(xs)).astype(float)

    def _polyline(self, pts, color, width):
        for i in range(len(pts) - 1):
            self.d.line([pts[i], pts[i + 1]], fill=color, width=width)

    def curve(self, cv):
        dom = cv["dom"]
        xs = np.linspace(dom[0], dom[1], 240)
        try:
            ys = self._evalv(cv["expr"], xs)
        except Exception as ex:
            print(f"  !! curve eval failed ({cv.get('expr')}): {ex}")
            return
        pts = [self.px(float(x), float(y)) for x, y in zip(xs, ys)]
        self._polyline(pts, cv.get("color", BLUE), 3 * SS)
        if cv.get("label"):
            tx, ty = pts[len(pts) * 3 // 4]
            self.d.text((tx + 4 * SS, ty + 2 * SS), cv["label"], font=self.fs, fill=cv.get("color", BLUE))

    def conic(self, c):
        # circle (a=b=r) or ellipse, drawn parametrically so the px transform's
        # unequal x/y scaling is respected (d.ellipse would distort it).
        # `t0`/`t1` (DEGREES, default 0..360) draw a partial ARC — a semicircular
        # window top, a dome, a sphere's visible profile.
        t0 = float(c.get("t0", 0.0)); t1 = float(c.get("t1", 360.0))
        th = np.linspace(math.radians(t0), math.radians(t1), 360)
        a = c.get("r", c.get("a")); b = c.get("r", c.get("b"))
        xs = c["cx"] + a * np.cos(th); ys = c["cy"] + b * np.sin(th)
        pts = [self.px(float(x), float(y)) for x, y in zip(xs, ys)]
        full = abs(t1 - t0) >= 359.9
        if c.get("close", full):
            pts = pts + [pts[0]]
        self._polyline(pts, c.get("color", BLUE), 3 * SS)
        if c.get("label"):
            tx, ty = self.px(c["cx"], c["cy"] + b)
            self.d.text((tx + 4 * SS, ty - 16 * SS), c["label"], font=self.fs, fill=c.get("color", BLUE))

    def shade_region(self, s):
        dom = s["dom"]
        xs = np.linspace(dom[0], dom[1], 240)
        try:
            his = self._evalv(s["hi"], xs); los = self._evalv(s["lo"], xs)
        except Exception as ex:
            print(f"  !! shade eval failed: {ex}")
            return
        top = [self.px(float(x), float(y)) for x, y in zip(xs, his)]
        bot = [self.px(float(x), float(y)) for x, y in zip(xs, los)]
        self.d.polygon(top + bot[::-1], fill=SHADE)

    # ── Finite-geometry support (Application of Derivatives: optimisation setups —
    #    cones, boxes, ladders, windows). Unlike `lines` (infinite, clipped to the
    #    viewport) these are SEGMENTS between two given points, which is what a
    #    physical figure is made of. Such figures also usually want `axes: false`.
    def segment(self, s):
        p = self.px(s["x1"], s["y1"]); q = self.px(s["x2"], s["y2"])
        color = s.get("color", BLUE)
        if s.get("dashed"):
            self._dashed(p, q, color, 3 * SS)
        else:
            self.d.line([p, q], fill=color, width=3 * SS)
        if s.get("label"):
            mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
            dx = s.get("dx", 6) * SS; dy = s.get("dy", -18) * SS
            self.d.text((mx + dx, my + dy), s["label"], font=self.fs, fill=color)

    def poly(self, pl):
        # An OUTLINED polygon/polyline (spec["polygon"] only shades — this draws edges).
        pts = [self.px(x, y) for x, y in pl["pts"]]
        if pl.get("close", True):
            pts = pts + [pts[0]]
        color = pl.get("color", BLUE)
        if pl.get("dashed"):
            for i in range(len(pts) - 1):
                self._dashed(pts[i], pts[i + 1], color, 3 * SS)
        else:
            self._polyline(pts, color, 3 * SS)

    def rightangle(self, ra):
        # Small square mark at `xy`, spanned by unit directions u and v.
        O = np.array([ra["x"], ra["y"]], dtype=float)
        u = np.array(ra["u"], dtype=float); v = np.array(ra["v"], dtype=float)
        u = u / np.linalg.norm(u); v = v / np.linalg.norm(v)
        s = float(ra.get("size", 0.22))
        pts = [self.px(*(O + u * s)), self.px(*(O + u * s + v * s)), self.px(*(O + v * s))]
        self._polyline(pts, ra.get("color", GRAY), 2 * SS)

    def point(self, p):
        x, y = self.px(p["x"], p["y"])
        r = 4 * SS
        self.d.ellipse([x - r, y - r, x + r, y + r], fill=(20, 20, 20))
        if p.get("label"):
            dx = p.get("dx", 8) * SS; dy = p.get("dy", -18) * SS
            self.d.text((x + dx, y + dy), p["label"], font=self.f, fill=(20, 20, 20))

    def caption(self):
        cap = self.spec.get("caption", "")
        if not cap:
            return
        x, y = 8 * SS, 8 * SS
        budget = self.w - 16 * SS
        # WRAP on word boundaries — the caption used to be drawn as one unwrapped
        # line, so a long one silently clipped at the right edge (one shipped
        # Linear-Programming diagram does exactly that). Short captions are
        # untouched: they stay a single line, byte-identical to before.
        words = cap.split()
        lines, cur = [], ""
        for w in words:
            trial = (cur + " " + w).strip()
            if cur and self.d.textlength(trial, font=self.fs) > budget:
                lines.append(cur); cur = w
            else:
                cur = trial
        if cur:
            lines.append(cur)
        lh = 16 * SS
        widest = max(self.d.textlength(t, font=self.fs) for t in lines)
        # opaque white pad so the caption stays readable over any line
        self.d.rectangle([x - 3 * SS, y - 2 * SS, x + widest + 3 * SS, y + lh * len(lines)],
                         fill=(255, 255, 255, 235))
        for i, t in enumerate(lines):
            self.d.text((x, y + i * lh), t, font=self.fs, fill=(60, 60, 60))

    def render(self):
        for s in self.spec.get("shade", []):   # shaded region under/between curves (drawn first)
            self.shade_region(s)
        if self.spec.get("polygon"):
            self.polygon(self.spec["polygon"])
        for pg in self.spec.get("shade_polys", []):   # extra shaded polygons (fill only)
            self.polygon(pg)
        if self.spec.get("feasible"):
            self.feasible(self.spec["feasible"])
        # `axes: false` for physical-geometry figures (a cone's axial section or a
        # ladder against a wall has no X/Y axes — drawing them is noise).
        if self.spec.get("axes", True):
            self.axes()
        for L in self.spec.get("lines", []):
            self.line(L)
        for s in self.spec.get("segments", []):
            self.segment(s)
        for pl in self.spec.get("polys", []):
            self.poly(pl)
        for cv in self.spec.get("curves", []):
            self.curve(cv)
        for c in self.spec.get("conics", []):
            self.conic(c)
        for p in self.spec.get("points", []):
            self.point(p)
        for ra in self.spec.get("rightangles", []):
            self.rightangle(ra)
        self.caption()
        return self.img.resize((W, H), Image.LANCZOS).convert("RGB")


# ── Statistics bar diagrams (Class-9 Ch.7) ──────────────────────────────────
# A SEPARATE canvas rather than a mode on `Canvas`, and that is deliberate: a bar
# diagram's x-axis is CATEGORICAL (a year, a family) while `Canvas.px()` assumes a
# numeric x. Shoehorning one in would mean inventing fake x-coordinates for every
# category and then hiding the real axis, so the two share the output contract
# (a W x H RGB image, supersampled SS x) and nothing else. `Canvas` is untouched,
# so every already-shipped chapter renders byte-identical.
#
# STACKED ONLY, because that is the whole of the chapter: a "sub-divided bar
# diagram" stacks raw values and a "percentage bar diagram" stacks values that
# sum to 100. There is no grouped/side-by-side variant in the book.
#
# Spec shape:
#   {"kind": "bars", "ref": ..., "caption": ..., "categories": [...],
#    "series": ["Wheat", "Jowar"],            # bottom-to-top within each stack
#    "values": [[30, 10], [35, 15], ...],     # per category, per series
#    "ymax": 100, "ytick": 10,                # y scale
#    "xlabel": "Year", "ylabel": "Production (Quintal)",
#    "scale": "On Y-axis 1 cm = 10%",         # the book always prints one
#    "value_labels": True}
BAR_FILLS = [
    (150, 195, 240),   # light blue
    (250, 200, 150),   # light orange
    (170, 220, 175),   # light green
    (215, 180, 235),   # light violet
    (245, 225, 150),   # light gold
]
BAR_EDGE = (40, 40, 40)


class BarCanvas:
    def __init__(self, spec):
        self.spec = spec
        self.w, self.h = W * SS, H * SS
        self.img = Image.new("RGBA", (self.w, self.h), (255, 255, 255, 255))
        self.d = ImageDraw.Draw(self.img, "RGBA")
        self.f = _font(15 * SS)
        self.fs = _font(13 * SS)
        self.ft = _font(11 * SS)
        # Plot box. Wider left gutter for the y tick labels + rotated axis title;
        # taller bottom gutter for the category labels and the x-axis title.
        self.left = 62 * SS
        self.right = self.w - 14 * SS
        self.top = 62 * SS          # room for the caption + legend strip
        self.bottom = self.h - 54 * SS

    def _y(self, v):
        ymax = float(self.spec.get("ymax") or 1.0)
        return self.bottom - (v / ymax) * (self.bottom - self.top)

    def _axes(self):
        ymax = float(self.spec.get("ymax") or 1.0)
        step = float(self.spec.get("ytick") or (ymax / 5.0))
        # horizontal gridlines + y tick labels
        v = 0.0
        while v <= ymax + 1e-9:
            y = self._y(v)
            if v > 0:
                self.d.line([(self.left, y), (self.right, y)], fill=(228, 228, 228), width=1 * SS)
            lbl = f"{v:g}"
            tw = self.d.textlength(lbl, font=self.ft)
            self.d.text((self.left - 6 * SS - tw, y - 7 * SS), lbl, font=self.ft, fill=AXIS)
            self.d.line([(self.left - 4 * SS, y), (self.left, y)], fill=AXIS, width=2 * SS)
            v += step
        self.d.line([(self.left, self.top - 6 * SS), (self.left, self.bottom)], fill=AXIS, width=2 * SS)
        self.d.line([(self.left, self.bottom), (self.right, self.bottom)], fill=AXIS, width=2 * SS)
        if self.spec.get("xlabel"):
            t = self.spec["xlabel"]
            tw = self.d.textlength(t, font=self.fs)
            self.d.text(((self.left + self.right) / 2 - tw / 2, self.bottom + 30 * SS),
                        t, font=self.fs, fill=AXIS)
        if self.spec.get("ylabel"):
            # Rotated on its own layer — Pillow cannot draw rotated text in place.
            t = self.spec["ylabel"]
            tw = int(self.d.textlength(t, font=self.fs)) + 4 * SS
            strip = Image.new("RGBA", (tw, 20 * SS), (255, 255, 255, 0))
            ImageDraw.Draw(strip).text((2 * SS, 2 * SS), t, font=self.fs, fill=AXIS)
            strip = strip.rotate(90, expand=True)
            self.img.paste(strip, (4 * SS, int((self.top + self.bottom) / 2 - strip.height / 2)), strip)

    def _legend(self):
        series = self.spec.get("series") or []
        if not series:
            return
        x = self.left
        y = self.top - 34 * SS
        sw = 16 * SS
        for i, name in enumerate(series):
            self.d.rectangle([x, y, x + sw, y + 12 * SS], fill=BAR_FILLS[i % len(BAR_FILLS)],
                             outline=BAR_EDGE, width=1 * SS)
            self.d.text((x + sw + 5 * SS, y - 1 * SS), name, font=self.ft, fill=AXIS)
            x += sw + 9 * SS + self.d.textlength(name, font=self.ft) + 16 * SS

    def _bars(self):
        cats = self.spec.get("categories") or []
        vals = self.spec.get("values") or []
        if not cats or not vals:
            return
        n = len(cats)
        span = (self.right - self.left) / n
        bw = span * float(self.spec.get("bar_width", 0.52))
        show_vals = self.spec.get("value_labels", True)
        for i, cat in enumerate(cats):
            cx = self.left + span * (i + 0.5)
            x0, x1 = cx - bw / 2, cx + bw / 2
            base = 0.0
            for j, v in enumerate(vals[i]):
                top, bot = self._y(base + v), self._y(base)
                self.d.rectangle([x0, top, x1, bot],
                                 fill=BAR_FILLS[j % len(BAR_FILLS)], outline=BAR_EDGE, width=2 * SS)
                if show_vals and (bot - top) > 15 * SS:
                    t = f"{v:g}"
                    tw = self.d.textlength(t, font=self.ft)
                    self.d.text((cx - tw / 2, (top + bot) / 2 - 7 * SS), t, font=self.ft, fill=(20, 20, 20))
                base += v
            tw = self.d.textlength(str(cat), font=self.ft)
            # Long category labels (a "2006-2007" year range) collide at 4+ bars,
            # so shrink to the bar's own span rather than overprinting a neighbour.
            fnt = self.ft if tw <= span - 4 * SS else _font(9 * SS)
            tw = self.d.textlength(str(cat), font=fnt)
            self.d.text((cx - tw / 2, self.bottom + 8 * SS), str(cat), font=fnt, fill=AXIS)

    def _caption(self):
        cap = self.spec.get("caption", "")
        if cap:
            self.d.text((8 * SS, 8 * SS), cap, font=self.fs, fill=(60, 60, 60))
        scale = self.spec.get("scale", "")
        if scale:
            tw = self.d.textlength(scale, font=self.ft)
            self.d.text((self.right - tw, 10 * SS), scale, font=self.ft, fill=(90, 90, 90))

    def render(self):
        self._caption()
        self._legend()
        self._axes()
        self._bars()
        return self.img.resize((W, H), Image.LANCZOS).convert("RGB")


def canvas_for(spec):
    """Pick the renderer for a spec. Dispatch is on a NEW `kind` key that no
    existing spec carries, so every shipped chapter keeps the `Canvas` path."""
    return BarCanvas(spec) if spec.get("kind") == "bars" else Canvas(spec)


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


def build_app_integration_specs():
    # Ch.5 Application of Definite Integration diagrams are DATA-DRIVEN: the
    # solving agents emit a per-question spec (curves as y=f(x), circles/ellipses,
    # and the shaded area region) to data/app-def-integration-12.diagram-specs.json.
    # Each entry: {ref, xr, yr, caption, curves:[{expr,dom,label,color}],
    #   conics:[{cx,cy,r|a,b,label,color}], lines:[{A,B,C,...}],
    #   shade:[{dom:[a,b], hi:"<expr>", lo:"<expr>"}], points:[{x,y,label}]}.
    p = os.path.join(HERE, "data", "app-def-integration-12.diagram-specs.json")
    if not os.path.exists(p):
        return []
    raw = json.load(open(p, encoding="utf-8"))
    col = lambda name: _COLORS.get(name, BLUE)
    specs = []
    for r in raw:
        spec = {"ref": r["ref"], "xr": tuple(r["xr"]), "yr": tuple(r["yr"]), "caption": r.get("caption", "")}
        if r.get("shade"):
            spec["shade"] = r["shade"]
        if r.get("curves"):
            spec["curves"] = [dict(expr=c["expr"], dom=c["dom"], label=c.get("label", ""), color=col(c.get("color", "blue"))) for c in r["curves"]]
        if r.get("conics"):
            spec["conics"] = [{**c, "color": col(c.get("color", "blue"))} for c in r["conics"]]
        if r.get("lines"):
            spec["lines"] = [ln(l["A"], l["B"], l["C"], l.get("label", ""), col(l.get("color", "blue")), l.get("dashed", False)) for l in r["lines"]]
        if r.get("points"):
            spec["points"] = [dict(x=pt["x"], y=pt["y"], label=pt.get("label", ""), dx=pt.get("dx", 8), dy=pt.get("dy", -18)) for pt in r["points"]]
        specs.append(spec)
    return specs


def build_app_derivatives_specs():
    # Ch.2 Application of Derivatives diagrams are DATA-DRIVEN. Unlike LP (feasible
    # regions) and App-of-Definite-Integration (area regions) — where the figure IS
    # the answer and lives on a coordinate plane — these are the physical SETUP of an
    # optimisation/related-rate problem: a cone's axial section, a box net, a ladder
    # on a wall, a semicircular window. So they lean on `segments` (finite, not the
    # infinite `lines`), arc `conics` (t0/t1), outlined `polys`, and `axes: false`.
    # Each entry: {ref, xr, yr, caption, axes?, segments:[{x1,y1,x2,y2,label,color,
    #   dashed,dx,dy}], polys:[{pts,color,close,dashed}], conics:[{cx,cy,r|a,b,t0,t1}],
    #   curves:[{expr,dom}], shade_polys:[[[x,y],..]], points:[{x,y,label,dx,dy}],
    #   rightangles:[{x,y,u,v,size}]}.
    # GOTCHA (bit an authoring agent): `polys` are drawn AFTER `segments` (see
    # Canvas.render), so a closed poly silently OVERDRAWS a coloured highlight
    # segment sharing that edge — the label then names a colour that isn't on
    # screen. To highlight individual edges, draw them all as `segments` and skip
    # the poly, rather than layering one over the other.
    # Globs part-files (`…diagram-specs.json` + `…diagram-specs.<group>.json`) so
    # parallel authoring agents can each own one without clobbering the others.
    parts = sorted(glob.glob(os.path.join(HERE, "data", "app-derivatives-12.diagram-specs*.json")))
    raw = []
    seen = set()
    for p in parts:
        for r in json.load(open(p, encoding="utf-8")):
            if r["ref"] in seen:
                raise SystemExit(f"duplicate diagram spec for ref {r['ref']!r} (in {os.path.basename(p)})")
            seen.add(r["ref"]); raw.append(r)
    if not raw:
        return []
    col = lambda name: _COLORS.get(name, BLUE)
    specs = []
    for r in raw:
        # equal_aspect defaults ON here: these are physical figures, so circles must
        # be circular and right angles square.
        spec = {"ref": r["ref"], "xr": tuple(r["xr"]), "yr": tuple(r["yr"]),
                "caption": r.get("caption", ""), "axes": r.get("axes", True),
                "equal_aspect": r.get("equal_aspect", True)}
        if r.get("segments"):
            spec["segments"] = [{**s, "color": col(s.get("color", "blue"))} for s in r["segments"]]
        if r.get("polys"):
            spec["polys"] = [{**pl, "color": col(pl.get("color", "blue"))} for pl in r["polys"]]
        if r.get("conics"):
            spec["conics"] = [{**c, "color": col(c.get("color", "blue"))} for c in r["conics"]]
        if r.get("curves"):
            spec["curves"] = [dict(expr=c["expr"], dom=c["dom"], label=c.get("label", ""), color=col(c.get("color", "blue"))) for c in r["curves"]]
        if r.get("shade_polys"):
            spec["shade_polys"] = [[tuple(pt) for pt in pg] for pg in r["shade_polys"]]
        if r.get("lines"):
            spec["lines"] = [ln(l["A"], l["B"], l["C"], l.get("label", ""), col(l.get("color", "blue")), l.get("dashed", False)) for l in r["lines"]]
        if r.get("points"):
            spec["points"] = [dict(x=pt["x"], y=pt["y"], label=pt.get("label", ""), dx=pt.get("dx", 8), dy=pt.get("dy", -18)) for pt in r["points"]]
        if r.get("rightangles"):
            spec["rightangles"] = r["rightangles"]
        specs.append(spec)
    return specs


def _construct_sum(base, ang_deg, total, names="ABC"):
    """Construction I: base BC, angle B, and AB + AC given.
    Returns the exact coordinates of every point the construction produces, so
    the drawing is TRUTHFUL rather than schematic - A really is on ray BT and
    really is equidistant from D and C, which is the whole point of the figure."""
    import math as m
    B = (0.0, 0.0); C = (base, 0.0)
    t = m.radians(ang_deg); u = (m.cos(t), m.sin(t))
    D = (total * u[0], total * u[1])
    # A on ray BD with AD = AC  =>  solve |su - D| = |su - C|
    uc = u[0] * C[0] + u[1] * C[1]
    sA = (total * total - base * base) / (2.0 * (total - uc))
    A = (sA * u[0], sA * u[1])
    M = ((D[0] + C[0]) / 2.0, (D[1] + C[1]) / 2.0)
    return {"B": B, "C": C, "D": D, "A": A, "M": M, "names": names}


def _construct_diff(base, ang_deg, diff, names="ABC"):
    """Construction II: base BC, angle B, and AB - AC given. D is taken on the
    OPPOSITE ray, which is the only structural difference from Construction I."""
    import math as m
    B = (0.0, 0.0); C = (base, 0.0)
    t = m.radians(ang_deg); u = (m.cos(t), m.sin(t))
    D = (-diff * u[0], -diff * u[1])          # opposite ray BS
    uc = u[0] * C[0] + u[1] * C[1]
    # A on ray BT with AD = AC, A at parameter s > 0 along u
    sA = (base * base - diff * diff) / (2.0 * (uc - diff))
    A = (sA * u[0], sA * u[1])
    M = ((D[0] + C[0]) / 2.0, (D[1] + C[1]) / 2.0)
    return {"B": B, "C": C, "D": D, "A": A, "M": M, "names": names}


def _construction_spec(ref, g, caption):
    """Turn a computed construction into a Canvas spec. Uses only primitives the
    physical-geometry mode already has - finite `segments`, `conics` as compass
    ARCS via t0/t1, labelled `points`, `equal_aspect` and `axes: false` - so NO
    new canvas is needed for a ruler-and-compass figure."""
    import math as m
    B, C, D, A, M = g["B"], g["C"], g["D"], g["A"], g["M"]
    nA, nB, nC = g["names"][0], g["names"][1], g["names"][2]
    seg = lambda p, q, **k: dict(x1=p[0], y1=p[1], x2=q[0], y2=q[1], **k)
    # perpendicular bisector of DC, drawn as a finite dashed segment through M
    dx, dy = C[0] - D[0], C[1] - D[1]
    L = m.hypot(dx, dy) or 1.0
    px_, py_ = -dy / L, dx / L
    half = 0.78 * L
    pb0 = (M[0] - px_ * half, M[1] - py_ * half)
    pb1 = (M[0] + px_ * half, M[1] + py_ * half)
    # The two compass arcs must visibly CROSS on the perpendicular bisector -
    # that crossing is what the construction step means. So take r > L/2, compute
    # where the two circles actually intersect, and draw each arc only over the
    # angular window that spans those two points.
    r_arc = 0.62 * L
    h = m.sqrt(max(r_arc * r_arc - (L / 2.0) ** 2, 1e-9))
    i1 = (M[0] + px_ * h, M[1] + py_ * h)
    i2 = (M[0] - px_ * h, M[1] - py_ * h)
    def _window(ctr):
        a1 = m.degrees(m.atan2(i1[1] - ctr[1], i1[0] - ctr[0]))
        a2 = m.degrees(m.atan2(i2[1] - ctr[1], i2[0] - ctr[0]))
        lo, hi = min(a1, a2), max(a1, a2)
        if hi - lo > 180:            # the window wraps through +/-180
            lo, hi = hi, lo + 360
        return lo - 14, hi + 14
    wD = _window(D); wC = _window(C)
    xs = [B[0], C[0], D[0], A[0], pb0[0], pb1[0]]
    ys = [B[1], C[1], D[1], A[1], pb0[1], pb1[1]]
    pad = 0.14 * max(max(xs) - min(xs), max(ys) - min(ys))
    return {
        "ref": ref, "caption": caption, "axes": False, "equal_aspect": True,
        "xr": [min(xs) - pad, max(xs) + pad], "yr": [min(ys) - pad, max(ys) + pad],
        "segments": [
            seg(B, C, color=AXIS),                     # the base
            seg(B, D, color=GRAY, dashed=True),        # the ray carrying D
            seg(D, C, color=GRAY, dashed=True),        # seg DC
            seg(pb0, pb1, color=RED, dashed=True),     # perpendicular bisector of DC
            seg(B, A, color=AXIS), seg(A, C, color=AXIS),   # the triangle
        ],
        "conics": [  # the two compass arcs that locate the perpendicular bisector
            {"cx": D[0], "cy": D[1], "r": r_arc, "t0": wD[0], "t1": wD[1], "color": GREEN},
            {"cx": C[0], "cy": C[1], "r": r_arc, "t0": wC[0], "t1": wC[1], "color": GREEN},
        ],
        "points": [
            {"x": B[0], "y": B[1], "label": nB, "dx": -16, "dy": 4},
            {"x": C[0], "y": C[1], "label": nC, "dx": 8, "dy": 4},
            {"x": A[0], "y": A[1], "label": nA, "dx": -6, "dy": -22},
            {"x": D[0], "y": D[1], "label": "D", "dx": 9, "dy": -20},
        ],
    }


def build_constructions_specs():
    """Class-9 Ch.4 Constructions of Triangles. The book prints NO answers for
    this chapter because every answer is a drawing, so these figures ARE the
    answers."""
    out = []
    # Practice set 4.1 - base, adjacent angle, SUM of the other two sides
    for ref, base, ang, tot, nm, cap in [
        ("Ex 4.1 Q1", 4.2, 40, 8.5, "PQR", "QR = 4.2 cm, angle Q = 40, PQ + PR = 8.5 cm"),
        ("Ex 4.1 Q2", 6.0, 50, 9.0, "XYZ", "YZ = 6 cm, angle Y = 50, XY + XZ = 9 cm"),
    ]:
        out.append(_construction_spec(ref, _construct_sum(base, ang, tot, nm), cap))
    # Practice set 4.2 - base, adjacent angle, DIFFERENCE of the other two sides
    for ref, base, ang, dif, nm, cap in [
        ("Ex 4.2 Q1", 7.4, 45, 2.7, "XYZ", "YZ = 7.4 cm, angle Y = 45, XY - XZ = 2.7 cm"),
    ]:
        out.append(_construction_spec(ref, _construct_diff(base, ang, dif, nm), cap))
    return out


def build_statistics_specs():
    """Class-9 Ch.7 Practice set 7.1 — the two DRAW-the-diagram questions.
    The book prints no answers for 7.1 (its answers are drawings), so these are
    the answer, and the percentages below are derived from the printed tables
    and rounded to the nearest integer as the questions instruct.
    Worth noting: in BOTH questions every rounded pair happens to sum to exactly
    100, so no bar needs a rounding fudge."""
    q1 = [(47, 9), (56, 13), (60, 16), (63, 18)]          # trucks, buses
    q1_years = ["2006-2007", "2007-2008", "2008-2009", "2009-2010"]
    q2 = [(14, 10), (15, 11), (17, 13), (20, 19)]         # permanent, temporary
    q2_years = ["2000-2001", "2001-2002", "2002-2003", "2003-2004"]

    def pct(rows):
        out = []
        for a, b in rows:
            t = a + b
            pa = round(a * 100.0 / t)
            out.append([pa, 100 - pa])   # complement, so each bar closes at 100
        return out

    return [
        # The p110 solved example is a FIGURE-READING question: the percentage bar
        # diagram carries all its data, so without it the five sub-parts are
        # unanswerable. Rendered rather than cropped — the printed figure is a
        # hatched graph-paper plot that crops illegibly, and the component
        # percentages come from the book's OWN printed solution on p111, so the
        # rendering is faithful by construction.
        # `value_labels` is OFF here ON PURPOSE: sub-part (i) asks the student to
        # READ the percentages off the diagram, and printing them inside the
        # segments would answer the question in the stem.
        {"kind": "bars", "ref": "Bar SolvedEx.1",
         "caption": "Percentage expenses of two families",
         "categories": ["Family A", "Family B"],
         "series": ["Food", "Clothes", "Education", "Electricity", "Others"],
         "values": [[60, 10, 10, 5, 15], [50, 15, 15, 10, 10]],
         "ymax": 100, "ytick": 10, "xlabel": "", "ylabel": "Expenses %",
         "scale": "On Y-axis 1 cm = 10%", "value_labels": False, "bar_width": 0.34,
         "manifest": False},
        {"kind": "bars", "ref": "Ex 7.1 Q1",
         "caption": "Percentage bar diagram - Trucks and Buses",
         "categories": q1_years, "series": ["Trucks", "Buses"], "values": pct(q1),
         "ymax": 100, "ytick": 10, "xlabel": "Year", "ylabel": "Percentage",
         "scale": "On Y-axis 1 cm = 10%"},
        {"kind": "bars", "ref": "Ex 7.1 Q2",
         "caption": "Sub-divided bar diagram - Permanent and Temporary roads",
         "categories": q2_years, "series": ["Permanent roads", "Temporary roads"],
         "values": [[a, b] for a, b in q2],
         "ymax": 40, "ytick": 5, "xlabel": "Year", "ylabel": "Length (Lakh km.)",
         "scale": "On Y-axis 1 cm = 5 lakh km."},
        {"kind": "bars", "ref": "Ex 7.1 Q2 percentage", "manifest": False,
         "caption": "Percentage bar diagram - Permanent and Temporary roads",
         "categories": q2_years, "series": ["Permanent roads", "Temporary roads"],
         "values": pct(q2),
         "ymax": 100, "ytick": 10, "xlabel": "Year", "ylabel": "Percentage",
         "scale": "On Y-axis 1 cm = 10%"},
    ]


# chapterId -> spec builder. Add an entry when a new chapter authors diagrams.
SPEC_BUILDERS = {
    "statistics-9": build_statistics_specs,
    "constructions-9": build_constructions_specs,
    "pair-lines-12": build_pair_lines_specs,
    "linear-prog-12": build_linear_prog_specs,
    "app-def-integration-12": build_app_integration_specs,
    "app-derivatives-12": build_app_derivatives_specs,
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
        img = canvas_for(spec).render()
        p = os.path.join(outdir, slug(spec["ref"]) + ".png")
        img.save(p)
        paths.append(p)
        # Anchor the manifest path to the REPO ROOT, not os.getcwd(). Using the cwd
        # makes the committed manifest depend on which directory you happened to run
        # from — a verification run from `scripts/` rewrote every path in the shipped
        # `pair-lines-12` manifest, dropping the leading `scripts/`, with no error.
        # The repo root reproduces the shipped values exactly and cannot drift.
        repo_root = os.path.dirname(os.path.dirname(HERE))
        # `manifest: False` renders the PNG but keeps it OUT of the solution-images
        # manifest — used for a figure that is attached as a QUESTION image instead
        # (via data/<id>.fig.json), and for an extra reference panel. Every ref that
        # DOES land here must match a committed question_number.
        if spec.get("manifest", True):
            manifest.append({"ref": spec["ref"], "png": os.path.relpath(p, repo_root).replace("\\", "/")})
    if paths:
        montage(paths).save(os.path.join(outdir, "_montage.png"))
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"rendered {len(specs)} diagrams -> {outdir}")
    print(f"montage -> {os.path.join(outdir, '_montage.png')}")
    print(f"manifest -> {manifest_path}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "pair-lines-12")
