"""
Render authored SOLUTION diagrams for NCERT (CBSE Class 12) textbook questions.
Deterministic Pillow drawing — no new dependency. Ported from
scripts/stateboard/render_solution_diagrams.py, whose Canvas + primitives are
kept VERBATIM (they are the tested core); only the spec-BUILDER layer differs.

Which NCERT chapters need one, and why — this was decided per chapter, not by
default. A diagram is built where the figure carries the answer:
  - Application of Integrals : the shaded area region IS the answer.
  - Linear Programming       : the feasible region IS the method.
Every other Class 12 Maths chapter ships without one. Two questions in Vector
Algebra reference a printed figure; those are CROPPED from the book by
attach-images.ts (a question figure, `image_url`) — a different channel from
this one (`solution_image_url`, migration 0042), and they must not be confused.

  python scripts/ncert/render_solution_diagrams.py <chapterId>

Outputs:
  scripts/ncert/out/<chapterId>-diagrams/<slug>.png    (one per spec)
  scripts/ncert/out/<chapterId>-diagrams/_montage.png  (the verify sheet — LOOK AT IT)
  scripts/ncert/data/<chapterId>.solution-images.json  (ref -> png manifest,
                                                        read by attach-solution-image.ts)

The montage is not optional. Geometry that is self-consistent can still be
WRONG (a region shaded on the far side of a curve, a corner point off its own
constraint line), and no assertion in this file can see it.
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


def slug(ref):
    return re.sub(r"[^A-Za-z0-9]+", "_", ref).strip("_")


_COLORS = {"blue": BLUE, "red": RED, "green": GREEN, "purple": PURPLE, "gray": GRAY}


def build_specs(chapter):
    """Load a chapter's authored diagram specs from data/<chapter>.diagram-specs*.json.

    ONE data-driven loader for every chapter. The State Board copy this was ported
    from grew THREE near-identical loaders (feasible regions, area regions,
    physical setups) that differed only in which optional keys they forwarded — so
    a spec key silently did nothing if authored against the wrong one. Here every
    key is optional and every key is forwarded, so a chapter uses exactly the
    primitives it needs and an unsupported key is a typo, not a silent no-op.

    Entry shape (all optional except ref/xr/yr):
      {ref, xr:[x0,x1], yr:[y0,y1], caption, axes (default true),
       equal_aspect (default FALSE — these are coordinate plots, not physical
         figures; turn it on only when a circle must render circular),
       constraints:[{A,B,op,C,label,color,dashed}]   -> the shaded feasible region
       lines:[{A,B,C,label,color,dashed}]            -> INFINITE, clipped to the viewport
       segments:[{x1,y1,x2,y2,label,color,dashed,dx,dy}] -> FINITE
       curves:[{expr,dom:[a,b],label,color}]         -> y = f(x)
       conics:[{cx,cy,r|a,b,t0,t1,label,color,close}]
       shade:[{dom:[a,b], hi:"<expr>", lo:"<expr>"}] -> area between two curves
       shade_polys:[[[x,y],...]]                     -> extra fill-only polygons
       polygon:[[x,y],...]                           -> one shaded polygon
       polys:[{pts,color,close,dashed}]              -> outlined polygons
       points:[{x,y,label,dx,dy}]
       rightangles:[{x,y,u,v,size}]}

    GOTCHA inherited from the State Board run: `polys` are drawn AFTER `segments`,
    so a closed poly OVERDRAWS a coloured highlight segment sharing that edge and
    the label then names a colour that is not on screen. Draw the edges as
    `segments` and skip the poly.

    Globs part-files so parallel authoring agents can each own one without
    clobbering the others; a ref authored twice is a hard error, never a
    last-writer-wins merge.
    """
    parts = sorted(glob.glob(os.path.join(HERE, "data", chapter + ".diagram-specs*.json")))
    raw, seen = [], set()
    for p in parts:
        for r in json.load(open(p, encoding="utf-8")):
            if r["ref"] in seen:
                raise SystemExit("duplicate diagram spec for ref %r (in %s)" % (r["ref"], os.path.basename(p)))
            seen.add(r["ref"]); raw.append(r)
    if not raw:
        return []
    col = lambda name: _COLORS.get(name, BLUE)
    specs = []
    for r in raw:
        spec = {"ref": r["ref"], "xr": tuple(r["xr"]), "yr": tuple(r["yr"]),
                "caption": r.get("caption", ""), "axes": r.get("axes", True),
                "equal_aspect": r.get("equal_aspect", False)}
        if r.get("constraints"):
            spec["feasible"] = [constraint(c["A"], c["B"], c["op"], c["C"], c.get("label", ""),
                                           col(c.get("color", "blue")), c.get("dashed", False))
                                for c in r["constraints"]]
        if r.get("lines"):
            spec["lines"] = [ln(l["A"], l["B"], l["C"], l.get("label", ""),
                                col(l.get("color", "blue")), l.get("dashed", False)) for l in r["lines"]]
        if r.get("segments"):
            spec["segments"] = [{**s, "color": col(s.get("color", "blue"))} for s in r["segments"]]
        if r.get("polys"):
            spec["polys"] = [{**pl, "color": col(pl.get("color", "blue"))} for pl in r["polys"]]
        if r.get("conics"):
            spec["conics"] = [{**c, "color": col(c.get("color", "blue"))} for c in r["conics"]]
        if r.get("curves"):
            spec["curves"] = [dict(expr=c["expr"], dom=c["dom"], label=c.get("label", ""),
                                   color=col(c.get("color", "blue"))) for c in r["curves"]]
        if r.get("shade"):
            spec["shade"] = r["shade"]
        if r.get("shade_polys"):
            spec["shade_polys"] = [[tuple(pt) for pt in pg] for pg in r["shade_polys"]]
        if r.get("polygon"):
            spec["polygon"] = [tuple(pt) for pt in r["polygon"]]
        if r.get("points"):
            spec["points"] = [dict(x=pt["x"], y=pt["y"], label=pt.get("label", ""),
                                   dx=pt.get("dx", 8), dy=pt.get("dy", -18)) for pt in r["points"]]
        if r.get("rightangles"):
            spec["rightangles"] = r["rightangles"]
        specs.append(spec)
    return specs


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
    outdir = os.path.join(HERE, "out", chapter + "-diagrams")
    manifest_path = os.path.join(HERE, "data", chapter + ".solution-images.json")
    specs = build_specs(chapter)
    if not specs:
        raise SystemExit(
            "no specs for %r — expected data/%s.diagram-specs*.json.\n"
            "(An empty render would write an EMPTY manifest and attach-solution-image\n"
            " would then report 'manifest is empty' one step later, which is a confusing\n"
            " place to learn the specs were never authored.)" % (chapter, chapter))
    os.makedirs(outdir, exist_ok=True)
    manifest, paths = [], []
    for spec in specs:
        img = Canvas(spec).render()
        p = os.path.join(outdir, slug(spec["ref"]) + ".png")
        img.save(p)
        paths.append(p)
        manifest.append({"ref": spec["ref"], "png": os.path.relpath(p, os.getcwd()).replace("\\", "/")})
    montage(paths).save(os.path.join(outdir, "_montage.png"))
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print("rendered %d diagrams -> %s" % (len(specs), outdir))
    print("montage  -> %s   <- EYEBALL THIS BEFORE ATTACHING" % os.path.join(outdir, "_montage.png"))
    print("manifest -> %s" % manifest_path)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("usage: python scripts/ncert/render_solution_diagrams.py <chapterId>")
    main(sys.argv[1])
