"""Draw a solution figure from a SPEC: the question's own data, rendered exactly.

    python scripts/solution-figures/draw.py --preview <spec.json> <out.png>   one figure, for an agent to look at
    python scripts/solution-figures/draw.py --batch <jobs.json>                {"outdir", "jobs": [{"ref", "spec"}]} -> prints {ref: png}

The owner allowed figures COMPUTED from a question's data (graphs, charts,
constructions, circuits, ray diagrams for given distances) and RENDERED
chemistry structures, and declined hand-drawn illustrations (2026-10-19). So
every kind here takes numbers and computes the drawing; nothing is sketched.

KINDS (each spec is {"kind": ..., ...}):

  plot       functions, data points, lines, fills, labels on axes
             {xlim, ylim, xlabel, ylabel, axes: "origin"|"box", grid, equal,
              series: [{type: function, expr: "x**2", domain: [a, b]} |
                       {type: points, x: [...], y: [...], line, marker, labels: [...]} |
                       {type: line, through: [[x1, y1], [x2, y2]]} | {type: vline, x} | {type: hline, y} |
                       {type: segment, from: [x, y], to: [x, y], arrow} |
                       {type: parametric, x: "cos(t)", y: "sin(t)", t: [a, b]} |
                       {type: function_y, expr: "y**2/4", range: [c, d]} (a sideways curve x = f(y))
                       ... each may carry label, style ("-", "--", ":"), color],
              fills: [{type: between, upper: expr, lower: expr, domain: [a, b]} |
                      {type: betweenx, left: expr in y, right: expr in y, range: [c, d]} | {type: polygon, points: [[x, y], ...]}],
              a fill may carry its own area (expr), checked alone: two regions R1 and R2 each get theirs
              legend: "below" puts the legend under the plot; ticks: "clean" = fewer ticks, "20" not "20.0", no "0"
              check: {area: number or expr ("2/3*(4*pi-3*sqrt(3))"), tol}: the shaded area is measured
                     and the figure REFUSED unless it matches (relative tol, default 0.005). Fills must
                     not overlap, or the overlap counts twice. Expressions may use minimum, maximum, sign, abs.
              labels: [{text, at: [x, y], ha, va}], marks: [{at: [x, y], label}]}
  histogram  {classes: [[lo, hi], ...], freq: [...], xlabel, ylabel, polygon}
  bar        {labels: [...], values: [...], xlabel, ylabel}
  pie        {labels: [...], values: [...], show: "angle"|"percent"}   (angles computed: value/total x 360)
  geometry   {points: {A: [x, y]}, offsets: {A: [dx, dy]}, segments: [["A", "B", {style, arrow}]],
              lines: [["A", "B"]] (extended), circles: [{center, r} | {center, through}],
              arcs: [{center, r, from, to}] (degrees), angles: [{vertex, from, to, label, right}],
              measures: [{from, to, text}], hide: ["O"]}
  ray        {element: "convex-lens"|"concave-lens"|"concave-mirror"|"convex-mirror", f, u, h}
             f = focal length (magnitude), u = object distance (magnitude, object on the left).
             The image is COMPUTED (lens: 1/v - 1/u = 1/f; mirror: 1/v + 1/u = 1/f, Cartesian
             signs), and the standard rays are drawn to it; a virtual image's rays are dashed.
  circuit    {elements: [{el: "Battery"|"Resistor"|"Line"|"Lamp"|"Switch"|"Ammeter"|"Voltmeter"|
              "Capacitor"|"Inductor"|"Diode"|"Dot"|"Ground"|"Source", d: "up"|"down"|"left"|"right",
              l, label, label_loc, at: "<saved name>", to: "<saved name>", save: "<name>", reverse}]}
  structure  {molecules: [{smiles, name, full}], per_row} (at most 2 a row, so names read on a phone);
             full: true draws EVERY atom (C and H too) on a grid, NCERT's Class 10 structural formula
  map        {region: "brazil" | "world" (+ extent [lon0, lat0, lon1, lat1], home: ISO3), lakes: [name], areas_at: [{at, w, h}], states: {name: colour}, areas: [{name, color, hatch}], rivers: [{name}],
              places: [{name | at: [lon, lat], marker}], parallels: [{lat}], labels: [{text, at}],
              index: [{symbol: "fill"|"line"|"point", text, color}]}   real Natural Earth boundaries
             (geo/brazil.json, geo/world.json); a frame that would show India is REFUSED until an official outline is supplied
  bookmap    {base: "india_balbharati", places: [{name | at, text, marker, ring}], parallels: [{lat, text}],
              features: [{name, text, color, hatch}]}   the answer marked on the BOOK's own map
             (geo/india_balbharati.json: the page + a fitted lon/lat->pixel map); India's outline is never drawn
  complex    {items: [{geometry: "oct"|"sq", metal, ligands: {pos: label}, chelates: [[pos, pos, "en"]], label, group}],
              mirror_pairs: [[i, j]], per_row}   octahedron positions 1 top, 6 bottom, 2 left, 4 right,
             3 front, 5 back; square corners 1-4 (1-3, 2-4 trans). Refuses an empty or doubled position, a
             chelate across trans positions, two drawings of one molecule in a group, a fake mirror pair
  field      {xlim, ylim, charges: [{q, at, label}] | loop: {a, current}, equipotentials: [V...], lines, labels, marks}
             field lines COMPUTED (Coulomb 1/r^2; a current loop's diametral section by Biot-Savart,
             current > 0 anticlockwise seen from above); equipotentials dashed at the V values given
  curve3d    {x, y, z: "expr in t", t: [a, b], arrows: [{from, to, label}], view: [elev, azim], aspect}
  stack      {panels: [spec, ...], captions: ["(i) ...", ...]}   panels one above another, any kind
             but stack; for two graphs with different axes or two separate circuits
"""
import json
import math
import os
import sys

import matplotlib
import matplotlib.ticker

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402

INK = "#111111"
RAY = "#1d4ed8"
ACCENT = "#c2410c"
SAFE = {k: getattr(np, k) for k in ("sin", "cos", "tan", "exp", "log", "log10", "sqrt", "abs", "arcsin", "arccos", "arctan", "sinh", "cosh", "tanh", "floor", "ceil")}
SAFE.update({"pi": math.pi, "e": math.e, "ln": np.log, "minimum": np.minimum, "maximum": np.maximum, "sign": np.sign})
DPI = 200


def ev(expr, **vars_):
    """Evaluate a maths expression with numpy and no builtins."""
    return eval(expr, {"__builtins__": {}}, {**SAFE, **vars_})  # noqa: S307 (spec authored in the repo)


def finish(fig, out):
    fig.savefig(out, dpi=DPI, bbox_inches="tight", pad_inches=0.12, facecolor="white")
    plt.close(fig)


def style_of(s):
    return {"-": "-", "--": "--", ":": ":", "-.": "-."}.get(s.get("style", "-"), "-")


def origin_axes(ax, xlabel, ylabel):
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.spines["left"].set_position("zero")
    ax.spines["bottom"].set_position("zero")
    ax.plot(1, 0, ">", color=INK, transform=ax.get_yaxis_transform(), clip_on=False, ms=6)
    ax.plot(0, 1, "^", color=INK, transform=ax.get_xaxis_transform(), clip_on=False, ms=6)
    if xlabel:
        ax.annotate(xlabel, xy=(1, 0), xycoords=("axes fraction", "data"), xytext=(4, -4), textcoords="offset points", ha="left", va="top", fontsize=12)
    if ylabel:
        ax.annotate(ylabel, xy=(0, 1), xycoords=("data", "axes fraction"), xytext=(6, 2), textcoords="offset points", ha="left", va="bottom", fontsize=12)


def plot_points(ax, sr, color, ls, lab):
    ax.plot(sr["x"], sr["y"], linestyle=ls if sr.get("line", True) else "None", marker=sr.get("marker", "o"), color=color, lw=2, ms=5, label=lab)
    for x, y, txt in zip(sr["x"], sr["y"], sr.get("labels", [])):
        if txt:
            ax.annotate(txt, (x, y), xytext=(5, 5), textcoords="offset points", fontsize=11)


def draw_plot(s, out):
    fig, ax = plt.subplots(figsize=s.get("size", [6, 4.2]))
    xlim, ylim = s.get("xlim"), s.get("ylim")
    for sr in s.get("series", []):
        t, color, ls, lab = sr.get("type"), sr.get("color", RAY), style_of(sr), sr.get("label")
        if t == "function":
            a, b = sr["domain"]
            x = np.linspace(a, b, 800)
            with np.errstate(all="ignore"):
                y = ev(sr["expr"], x=x) * np.ones_like(x)
            ax.plot(x, y, ls, color=color, lw=sr.get("width", 2), label=lab)
        elif t == "parametric":
            a, b = sr["t"]
            tt = np.linspace(a, b, 800)
            ax.plot(ev(sr["x"], t=tt) * np.ones_like(tt), ev(sr["y"], t=tt) * np.ones_like(tt), ls, color=color, lw=2, label=lab)
        elif t == "function_y":
            c, d = sr["range"]
            y = np.linspace(c, d, 800)
            with np.errstate(all="ignore"):
                x = ev(sr["expr"], y=y) * np.ones_like(y)
            ax.plot(x, y, ls, color=color, lw=sr.get("width", 2), label=lab)
        elif t == "points":
            plot_points(ax, sr, color, ls, lab)
        elif t == "line":
            (x1, y1), (x2, y2) = sr["through"]
            ax.axline((x1, y1), (x2, y2), linestyle=ls, color=color, lw=1.8, label=lab)
        elif t == "vline":
            ax.axvline(sr["x"], linestyle=ls, color=color, lw=1.5, label=lab)
        elif t == "hline":
            ax.axhline(sr["y"], linestyle=ls, color=color, lw=1.5, label=lab)
        elif t == "segment":
            (x1, y1), (x2, y2) = sr["from"], sr["to"]
            if sr.get("arrow"):
                ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops={"arrowstyle": "-|>", "color": color, "lw": 1.6, "linestyle": ls})
            else:
                ax.plot([x1, x2], [y1, y2], ls, color=color, lw=1.6, label=lab)
        else:
            raise ValueError(f"plot: unknown series type {t!r}")
    for fl in s.get("fills", []):
        if fl.get("type") == "between":
            a, b = fl["domain"]
            x = np.linspace(a, b, 800)
            ax.fill_between(x, ev(fl["lower"], x=x) * np.ones_like(x), ev(fl["upper"], x=x) * np.ones_like(x), color=fl.get("color", RAY), alpha=fl.get("alpha", 0.2), lw=0)
        elif fl.get("type") == "betweenx":
            c, d = fl["range"]
            y = np.linspace(c, d, 800)
            ax.fill_betweenx(y, ev(fl["left"], y=y) * np.ones_like(y), ev(fl["right"], y=y) * np.ones_like(y), color=fl.get("color", RAY), alpha=fl.get("alpha", 0.2), lw=0)
        elif fl.get("type") == "polygon":
            ax.fill(*zip(*fl["points"]), color=fl.get("color", RAY), alpha=fl.get("alpha", 0.2), lw=0)
        else:
            raise ValueError(f"plot: unknown fill type {fl.get('type')!r}")
    info = None
    tol = s.get("check", {}).get("tol", 0.005)
    for i, fl in enumerate(s.get("fills", [])):
        if "area" in fl:
            got, want = fill_area(fl), float(ev(str(fl["area"])))
            if not math.isfinite(got) or abs(got - want) > tol * max(abs(want), 1e-9):
                plt.close(fig)
                raise ValueError(f"plot: fill {i + 1} shades area {got:.6g}, not the answer's {want:.6g}")
    if "check" in s:
        area = shaded_area(s)
        want = float(ev(str(s["check"]["area"])))
        if not math.isfinite(area) or abs(area - want) > tol * max(abs(want), 1e-9):
            plt.close(fig)
            raise ValueError(f"plot: shaded area {area:.6g} does not match the answer's {want:.6g}")
        info = {"area": area}
    for m in s.get("marks", []):
        ax.plot(*m["at"], "o", color=ACCENT, ms=5, zorder=5)
        if m.get("label"):
            ax.annotate(m["label"], m["at"], xytext=m.get("offset", [6, 6]), textcoords="offset points", fontsize=11)
    for lb in s.get("labels", []):
        ax.text(*lb["at"], lb["text"], fontsize=lb.get("size", 11), ha=lb.get("ha", "left"), va=lb.get("va", "bottom"), color=lb.get("color", INK))
    if xlim:
        ax.set_xlim(*xlim)
    if ylim:
        ax.set_ylim(*ylim)
    if s.get("equal"):
        ax.set_aspect("equal", adjustable="box")
    if s.get("axes", "origin") == "origin":
        origin_axes(ax, s.get("xlabel"), s.get("ylabel"))
    else:
        ax.set_xlabel(s.get("xlabel", ""))
        ax.set_ylabel(s.get("ylabel", ""))
    if s.get("grid"):
        ax.grid(True, color="#dddddd", lw=0.6)
    if "xticks" in s:
        ax.set_xticks(s["xticks"])
    if "yticks" in s:
        ax.set_yticks(s["yticks"])
    if s.get("ticks") == "clean":
        for axis in (ax.xaxis, ax.yaxis):
            axis.set_major_locator(matplotlib.ticker.MaxNLocator(nbins=6, steps=[1, 2, 2.5, 5, 10]))
            axis.set_major_formatter(matplotlib.ticker.FuncFormatter(clean_tick))
    if any(sr.get("label") for sr in s.get("series", [])) and s.get("legend", True):
        if s.get("legend") == "below":
            ax.legend(frameon=False, fontsize=10, loc="upper center", bbox_to_anchor=(0.5, -0.07), ncol=2)
        else:
            ax.legend(frameon=False, fontsize=10)
    finish(fig, out)
    return info


def clean_tick(v, _pos):
    """A tick label without a trailing .0, and none at 0 (the axes cross there and labels crowd it)."""
    return "" if abs(v) < 1e-12 else f"{v:g}".replace("-", "−")


AREA_SAMPLES = 200001


def fill_area(fl):
    """The area one fill shades: |upper - lower| integrated finely (trapezoids), a polygon by the shoelace rule."""
    t = fl.get("type")
    if t == "between":
        a, b = fl["domain"]
        x = np.linspace(a, b, AREA_SAMPLES)
        with np.errstate(all="ignore"):
            h = np.abs(ev(fl["upper"], x=x) * np.ones_like(x) - ev(fl["lower"], x=x) * np.ones_like(x))
        return float(np.trapezoid(h, x))
    if t == "betweenx":
        c, d = fl["range"]
        y = np.linspace(c, d, AREA_SAMPLES)
        with np.errstate(all="ignore"):
            w = np.abs(ev(fl["right"], y=y) * np.ones_like(y) - ev(fl["left"], y=y) * np.ones_like(y))
        return float(np.trapezoid(w, y))
    if t == "polygon":
        pts = fl["points"]
        return abs(sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(pts, pts[1:] + pts[:1]))) / 2
    raise ValueError(f"plot: unknown fill type {t!r}")


def shaded_area(s):
    """The area a plot spec shades, all fills together. Overlapping fills count twice."""
    return sum(fill_area(fl) for fl in s.get("fills", []))


def histogram_axes(s):
    fig, ax = plt.subplots(figsize=s.get("size", [6, 4.2]))
    classes, freq = s["classes"], s["freq"]
    if len(classes) != len(freq):
        raise ValueError("histogram: classes and freq differ in length")
    for (lo, hi), f in zip(classes, freq):
        ax.bar(lo, f, width=hi - lo, align="edge", color="#bfdbfe", edgecolor=INK, lw=1.2)
        ax.annotate(f"{f:g}", ((lo + hi) / 2, f), xytext=(0, 4), textcoords="offset points", ha="center", va="bottom", fontsize=11)
    if s.get("polygon"):
        mids = [(lo + hi) / 2 for lo, hi in classes]
        w0, w1 = classes[0][1] - classes[0][0], classes[-1][1] - classes[-1][0]
        ax.plot([mids[0] - w0] + mids + [mids[-1] + w1], [0] + list(freq) + [0], "-o", color=ACCENT, lw=1.8, ms=4)
    ax.set_xticks(sorted({c for pair in classes for c in pair}))
    ax.yaxis.set_major_locator(matplotlib.ticker.MaxNLocator(integer=True))
    ax.set_xlabel(s.get("xlabel", ""))
    ax.set_ylabel(s.get("ylabel", ""))
    ax.grid(axis="y", color="#e5e5e5", lw=0.6)
    ax.set_axisbelow(True)
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    ax.margins(y=0.12)
    return fig, ax


def draw_histogram(s, out):
    fig, _ = histogram_axes(s)
    finish(fig, out)


def draw_bar(s, out):
    fig, ax = plt.subplots(figsize=s.get("size", [6, 4.2]))
    ax.bar(s["labels"], s["values"], color="#bfdbfe", edgecolor=INK, lw=1.2, width=s.get("width", 0.6))
    if all(float(v).is_integer() for v in s["values"]):
        ax.yaxis.set_major_locator(matplotlib.ticker.MaxNLocator(integer=True))
    ax.set_xlabel(s.get("xlabel", ""))
    ax.set_ylabel(s.get("ylabel", ""))
    ax.grid(axis="y", color="#e5e5e5", lw=0.6)
    ax.set_axisbelow(True)
    for side in ("top", "right"):
        ax.spines[side].set_visible(False)
    finish(fig, out)


def draw_pie(s, out):
    vals = s["values"]
    total = float(sum(vals))
    show = s.get("show", "angle")
    texts = []
    for lab, v in zip(s["labels"], vals):
        if show == "percent":
            texts.append(f"{lab}\n{100 * v / total:.1f}%")
        else:
            ang = 360 * v / total
            texts.append(f"{lab}\n{ang:.0f}°" if abs(ang - round(ang)) < 1e-6 else f"{lab}\n{ang:.1f}°")
    fig, ax = plt.subplots(figsize=s.get("size", [5.2, 5.2]))
    colors = ["#bfdbfe", "#fde68a", "#bbf7d0", "#fecaca", "#ddd6fe", "#fed7aa", "#a5f3fc", "#e5e7eb"]
    ax.pie(vals, labels=texts, startangle=90, counterclock=False, colors=colors[: len(vals)], wedgeprops={"edgecolor": INK, "linewidth": 1}, textprops={"fontsize": 11})
    ax.set_aspect("equal")
    finish(fig, out)


def draw_geometry(s, out):
    P = {k: np.array(v, dtype=float) for k, v in s["points"].items()}
    fig, ax = plt.subplots(figsize=s.get("size", [6, 5]))
    for seg in s.get("segments", []):
        a, b = P[seg[0]], P[seg[1]]
        o = seg[2] if len(seg) > 2 else {}
        if o.get("arrow"):
            ax.annotate("", xy=b, xytext=a, arrowprops={"arrowstyle": "-|>", "color": INK, "lw": 1.4})
        else:
            ax.plot([a[0], b[0]], [a[1], b[1]], style_of(o), color=o.get("color", INK), lw=1.5)
    for ln in s.get("lines", []):
        ax.axline(P[ln[0]], P[ln[1]], color=INK, lw=1.2, linestyle=style_of(ln[2] if len(ln) > 2 else {}))
    for c in s.get("circles", []):
        ctr = P[c["center"]]
        r = c["r"] if "r" in c else float(np.linalg.norm(P[c["through"]] - ctr))
        ax.add_patch(plt.Circle(ctr, r, fill=False, color=c.get("color", INK), lw=1.4, linestyle=style_of(c)))
    for a in s.get("arcs", []):
        ctr = P[a["center"]]
        th = np.radians(np.linspace(a["from"], a["to"], 120))
        ax.plot(ctr[0] + a["r"] * np.cos(th), ctr[1] + a["r"] * np.sin(th), color=a.get("color", "#6b7280"), lw=1.1)
    for an in s.get("angles", []):
        v, p1, p2 = P[an["vertex"]], P[an["from"]], P[an["to"]]
        a1, a2 = math.degrees(math.atan2(*(p1 - v)[::-1])), math.degrees(math.atan2(*(p2 - v)[::-1]))
        span = (a2 - a1) % 360
        if span > 180:
            a1, a2, span = a2, a1, 360 - span
        rad = an.get("r", 0.12 * min(np.linalg.norm(p1 - v), np.linalg.norm(p2 - v)))
        if an.get("right"):
            u1, u2 = (p1 - v) / np.linalg.norm(p1 - v) * rad, (p2 - v) / np.linalg.norm(p2 - v) * rad
            sq = np.array([v + u1, v + u1 + u2, v + u2])
            ax.plot(sq[:, 0], sq[:, 1], color=INK, lw=1)
        else:
            th = np.radians(np.linspace(a1, a1 + span, 60))
            ax.plot(v[0] + rad * np.cos(th), v[1] + rad * np.sin(th), color=INK, lw=1)
        if an.get("label"):
            mid = math.radians(a1 + span / 2)
            ax.text(v[0] + 1.7 * rad * math.cos(mid), v[1] + 1.7 * rad * math.sin(mid), an["label"], ha="center", va="center", fontsize=11)
    for m in s.get("measures", []):
        a, b = P[m["from"]], P[m["to"]]
        mid, d = (a + b) / 2, b - a
        n = np.array([-d[1], d[0]]) / (np.linalg.norm(d) or 1)
        off = m.get("offset", 0.06 * max(np.linalg.norm(d), 1e-9))
        ax.text(*(mid + n * off), m["text"], ha="center", va="center", fontsize=11, color=ACCENT)
    hide = set(s.get("hide", []))
    offsets = s.get("offsets", {})
    for k, p in P.items():
        if k in hide:
            continue
        ax.plot(*p, "o", color=INK, ms=3)
        dx, dy = offsets.get(k, [6, 6])
        ax.annotate(k, p, xytext=(dx, dy), textcoords="offset points", fontsize=13)
    ax.set_aspect("equal")
    ax.autoscale_view()
    ax.margins(0.12)
    ax.axis("off")
    finish(fig, out)


def lens_image(f_c, u_c):
    """Lens: 1/v - 1/u = 1/f (Cartesian). None for an object at the focus."""
    inv = 1 / f_c + 1 / u_c
    return None if abs(inv) < 1e-12 else 1 / inv


def mirror_image(f_c, u_c):
    """Mirror: 1/v + 1/u = 1/f (Cartesian). None for an object at the focus."""
    inv = 1 / f_c - 1 / u_c
    return None if abs(inv) < 1e-12 else 1 / inv


def draw_ray(s, out):
    el, f, u, h = s["element"], float(s["f"]), float(s["u"]), float(s.get("h", 1.0))
    if f <= 0 or u <= 0:
        raise ValueError("ray: f and u are magnitudes (positive); the object is on the left")
    lens = "lens" in el
    if el not in ("convex-lens", "concave-lens", "concave-mirror", "convex-mirror"):
        raise ValueError(f"ray: unknown element {el!r}")
    u_c = -u
    f_c = {"convex-lens": f, "concave-lens": -f, "concave-mirror": -f, "convex-mirror": f}[el]
    v = lens_image(f_c, u_c) if lens else mirror_image(f_c, u_c)
    m = None if v is None else (v / u_c if lens else -v / u_c)
    hi = None if m is None else m * h
    real = v is not None and ((v > 0) if lens else (v < 0))

    span = max(2.4 * f, u * 1.15, abs(v) * 1.15 if v is not None and abs(v) < 8 * f else 0)
    fig, ax = plt.subplots(figsize=s.get("size", [7.5, 3.8]))
    ax.axhline(0, color=INK, lw=1)
    top = max(h, abs(hi) if hi is not None and abs(hi) < 6 * h else h) * 1.45
    # The element at x = 0.
    if lens:
        bulge = 0.06 * span * (1 if el == "convex-lens" else -1)
        yy = np.linspace(-top * 0.9, top * 0.9, 50)
        edge = bulge * (1 - (yy / (top * 0.9)) ** 2)
        ax.fill_betweenx(yy, -edge if bulge > 0 else -0.04 * span + edge * -1, edge if bulge > 0 else 0.04 * span - edge * -1, color="#bfdbfe", alpha=0.8)
        ax.plot([0, 0], [-top * 0.9, top * 0.9], color="#60a5fa", lw=0.8)
        marks = {"F₁": -f, "F₂": f, "2F₁": -2 * f, "2F₂": 2 * f}
        ax.text(0.01 * span, -0.12 * top, "O", fontsize=11)
    else:
        yy = np.linspace(-top * 0.9, top * 0.9, 50)
        # A concave mirror facing an object on its left bends its ends TOWARDS the
        # object (the pole is its rightmost point), a convex one away from it.
        bend = -1 if el == "concave-mirror" else 1
        sag = 0.04 * span * (yy / (top * 0.9)) ** 2 * bend
        ax.plot(sag, yy, color=INK, lw=2.4)
        hatch = 0.015 * span
        for y in np.linspace(-top * 0.85, top * 0.85, 14):
            sx = 0.04 * span * (y / (top * 0.9)) ** 2 * bend
            ax.plot([sx, sx + hatch], [y, y - hatch * 1.4], color=INK, lw=0.8)
        side = -1 if el == "concave-mirror" else 1
        marks = {"F": side * f, "C": side * 2 * f}
        ax.text(0.01 * span, -0.12 * top, "P", fontsize=11)
    on_image = v is not None and abs(v) < 8 * f
    for name, x in marks.items():
        if abs(x) <= span * 1.05:
            ax.plot(x, 0, "o", color=INK, ms=3.5)
            # Where the image foot lands on a marked point, both names share one label.
            if on_image and abs(x - v) < 0.04 * span:
                name = f"{name} = B′"
            ax.text(x, -0.12 * top, name, ha="center", va="top", fontsize=11)
    # Object.
    ax.annotate("", xy=(-u, h), xytext=(-u, 0), arrowprops={"arrowstyle": "-|>", "color": ACCENT, "lw": 2})
    ax.text(-u, h * 1.06, "A", ha="center", va="bottom", fontsize=11)
    ax.text(-u, -0.12 * top, "B", ha="center", va="top", fontsize=11)
    A = np.array([-u, h])
    far = span * 1.1

    def seg(p, q, dashed=False, arrow=False):
        if arrow:
            mid = (np.array(p) + np.array(q)) / 2
            ax.annotate("", xy=mid, xytext=p, arrowprops={"arrowstyle": "-|>", "color": RAY, "lw": 1.5})
        ax.plot([p[0], q[0]], [p[1], q[1]], "--" if dashed else "-", color=RAY, lw=1.5)

    def extend(p, d, length):
        d = np.array(d, dtype=float)
        return np.array(p) + d / np.linalg.norm(d) * length

    if lens:
        # Ray 1: parallel to the axis, then through (or away from) the focus.
        M = np.array([0.0, h])
        seg(A, M, arrow=True)
        d1 = np.array([f_c, -h]) if f_c > 0 else np.array([-f_c, h])
        seg(M, extend(M, d1, far))
        if not real and v is not None:
            seg(M, (v, hi) if f_c < 0 else extend(M, -d1, abs(v) + 0.2 * f), dashed=True)
        # Ray 2: through the optical centre, undeviated.
        d2 = np.array([u, -h])
        seg(A, (0, 0), arrow=True)
        seg((0, 0), extend((0, 0), d2, far))
        if not real and v is not None:
            seg((0, 0), (v, hi), dashed=True)
    else:
        # Ray 1: parallel to the axis, reflected through (or as if from) the focus.
        M = np.array([0.0, h])
        seg(A, M, arrow=True)
        Fx = -f if el == "concave-mirror" else f
        d1 = np.array([Fx, -h])
        if el == "concave-mirror":
            seg(M, extend(M, d1, far))
        else:
            seg(M, extend(M, -d1, far))
            seg(M, (Fx, 0), dashed=True)
        # Ray 2: to the pole, reflected symmetrically about the axis.
        seg(A, (0, 0), arrow=True)
        seg((0, 0), extend((0, 0), [-u, -h], far))
        if not real and v is not None:
            seg((0, 0), (v, hi), dashed=True)
            if el == "concave-mirror":
                seg(M, (v, hi), dashed=True)
    if v is not None and abs(v) < 8 * f:
        ax.annotate("", xy=(v, hi), xytext=(v, 0), arrowprops={"arrowstyle": "-|>", "color": ACCENT, "lw": 2, "linestyle": "-" if real else "--"})
        ax.text(v, hi + (0.06 * top if hi > 0 else -0.06 * top), "A′", ha="center", va="bottom" if hi > 0 else "top", fontsize=11)
        if not any(abs(x - v) < 0.04 * span for x in marks.values()):
            ax.text(v, 0.06 * top if hi < 0 else -0.12 * top, "B′", ha="center", va="bottom" if hi < 0 else "top", fontsize=11)
    left = min(-u, -2.2 * f, v if v is not None and abs(v) < 8 * f else 0) - 0.15 * span
    right = max(2.2 * f if lens or el == "convex-mirror" else 0.3 * f, v if v is not None and abs(v) < 8 * f else 0) + 0.15 * span
    ax.set_xlim(left, right)
    lim = max(top, abs(hi) * 1.3 if hi is not None and abs(v) < 8 * f else top)
    ax.set_ylim(-lim, lim)
    ax.axis("off")
    finish(fig, out)
    return {"v": v, "m": m, "real": real}


def draw_circuit(s, out):
    import schemdraw
    import schemdraw.elements as elm

    names = {"Battery": elm.Battery, "Cell": elm.BatteryCell, "Resistor": elm.Resistor, "Line": elm.Line, "Lamp": elm.Lamp,
             "Switch": elm.Switch, "Ammeter": elm.MeterA, "Voltmeter": elm.MeterV, "Galvanometer": elm.MeterArrow,
             "Capacitor": elm.Capacitor, "Inductor": elm.Inductor2, "Diode": elm.Diode, "Dot": elm.Dot, "Ground": elm.Ground,
             "Source": elm.SourceSin, "Rheostat": elm.Potentiometer, "Key": elm.Switch}
    saved = {}
    with schemdraw.Drawing(show=False) as d:
        d.config(fontsize=13, unit=2.5)
        for e in s["elements"]:
            cls = names.get(e["el"])
            if cls is None:
                raise ValueError(f"circuit: unknown element {e['el']!r}")
            el = cls()
            if "at" in e:
                el = el.at(saved[e["at"]])
            if "d" in e:
                el = getattr(el, e["d"])()
            if "to" in e:
                el = el.to(saved[e["to"]])
            elif "l" in e:
                el = el.length(e["l"])
            if e.get("reverse"):
                el = el.reverse()
            if "label" in e:
                el = el.label(e["label"], loc=e.get("label_loc", "top"))
            d.add(el)
            if "save" in e:
                saved[e["save"]] = el.end
            if "save_start" in e:
                saved[e["save_start"]] = el.start
        d.save(out, dpi=DPI)


def charge_field(charges, X, Y):
    """E (as 1/r^2 point charges) and V (as 1/r) on a grid, in units where k = 1."""
    ex, ey, v = np.zeros_like(X, dtype=float), np.zeros_like(X, dtype=float), np.zeros_like(X, dtype=float)
    for c in charges:
        dx, dy = X - c["at"][0], Y - c["at"][1]
        r = np.sqrt(dx * dx + dy * dy)
        with np.errstate(all="ignore"):
            ex += c["q"] * dx / r ** 3
            ey += c["q"] * dy / r ** 3
            v += c["q"] / r
    return ex, ey, v


def loop_field(a, current, X, Z, n=400):
    """B of a circular loop of radius a in the plane z = 0, centred on the origin,
    on its diametral section y = 0 (Biot-Savart summed over n elements).
    current > 0 runs anticlockwise seen from above (+z)."""
    phi = np.linspace(0, 2 * np.pi, n, endpoint=False)
    dphi = 2 * np.pi / n
    bx, bz = np.zeros_like(X, dtype=float), np.zeros_like(X, dtype=float)
    for p in phi:
        sx, sy = a * np.cos(p), a * np.sin(p)            # source point
        lx, ly = -a * np.sin(p) * dphi, a * np.cos(p) * dphi  # dl
        rx, ry, rz = X - sx, -sy, Z                     # field point (X, 0, Z) minus source
        r3 = (rx * rx + ry * ry + rz * rz) ** 1.5
        with np.errstate(all="ignore"):
            # dl x r with dl = (lx, ly, 0)
            bx += current * (ly * rz) / r3
            bz += current * (lx * ry - ly * rx) / r3
    return bx, bz


# Octahedron: 1 top, 6 bottom; 2 left, 4 right; 3 front, 5 back (x right, y back, z up).
OCT_POS = {"1": (0, 0, 1), "6": (0, 0, -1), "2": (-1, 0, 0), "4": (1, 0, 0), "3": (0, -1, 0), "5": (0, 1, 0)}
SQ_POS = {"1": (-1, 1), "2": (1, 1), "3": (1, -1), "4": (-1, -1)}  # corners; 1-3 and 2-4 are trans


def _oct_rotations():
    rz = lambda v: (-v[1], v[0], v[2])
    rx = lambda v: (v[0], -v[2], v[1])
    key = {v: k for k, v in OCT_POS.items()}
    perms, frontier = {tuple(sorted(OCT_POS))}, [{k: k for k in OCT_POS}]
    seen = {tuple(sorted(frontier[0].items()))}
    out = []
    while frontier:
        p = frontier.pop()
        out.append(p)
        for r in (rz, rx):
            q = {k: key[r(OCT_POS[v])] for k, v in p.items()}
            t = tuple(sorted(q.items()))
            if t not in seen:
                seen.add(t)
                frontier.append(q)
    return out


OCT_ROTATIONS = _oct_rotations()


def check_complex(c, geometry="oct"):
    """Refuse an impossible arrangement: every position filled once, chelates on cis edges only."""
    pos = OCT_POS if geometry == "oct" else SQ_POS
    used = list(c.get("ligands", {})) + [p for ch in c.get("chelates", []) for p in ch[:2]]
    if sorted(used) != sorted(pos):
        raise ValueError(f"complex: positions {sorted(used)} do not fill {sorted(pos)} exactly once")
    for a, b, *_ in c.get("chelates", []):
        if sum(x * y for x, y in zip(pos[a], pos[b])) != 0:
            raise ValueError(f"complex: a chelate cannot span trans positions {a} and {b}")


def _signature(c, perm):
    lig = tuple(sorted((perm[p], l) for p, l in c.get("ligands", {}).items()))
    ch = tuple(sorted((tuple(sorted((perm[a], perm[b]))), name) for a, b, name in c.get("chelates", [])))
    return lig, ch


def same_complex(a, b):
    """Are two octahedral arrangements one molecule (some rotation maps a onto b)?"""
    target = _signature(b, {k: k for k in OCT_POS})
    return any(_signature(a, r) == target for r in OCT_ROTATIONS)


def mirror_complex(c):
    """Reflection through the plane x = 0: left and right swap."""
    m = {"2": "4", "4": "2", "1": "1", "6": "6", "3": "3", "5": "5"}
    return {**c, "ligands": {m[p]: l for p, l in c.get("ligands", {}).items()},
            "chelates": [[m[a], m[b], n] for a, b, n in c.get("chelates", [])]}


GRID = {"R": (1, 0), "L": (-1, 0), "U": (0, 1), "D": (0, -1)}


def full_layout(smiles):
    """Every atom of an acyclic molecule on a square grid, the way NCERT draws a
    full structural formula: the longest heavy-atom chain across, hydrogens and
    short groups above, below and at the ends, a branch two units out."""
    from rdkit import Chem

    mol = Chem.AddHs(Chem.MolFromSmiles(smiles))
    if mol.GetRingInfo().NumRings():
        raise ValueError(f"full structure: {smiles} has a ring")
    heavy = [a.GetIdx() for a in mol.GetAtoms() if a.GetAtomicNum() > 1]
    nbr = {a.GetIdx(): [n.GetIdx() for n in a.GetNeighbors()] for a in mol.GetAtoms()}

    def farthest_to(start, end):
        """The heavy-atom path from start to end (a tree, so it is unique)."""
        seen, order = {start: None}, [start]
        for a in order:
            for n in nbr[a]:
                if n not in seen and mol.GetAtomWithIdx(n).GetAtomicNum() > 1:
                    seen[n] = a
                    order.append(n)
        path = []
        while end is not None:
            path.append(end)
            end = seen[end]
        return path

    # Longest heavy-atom path; on a tie the one with more carbons, so propanone's
    # chain is C-C-C with the oxygen above, not C-C-O with a methyl branch.
    paths = [farthest_to(h, t) for h in heavy for t in heavy]
    # Then the one whose ends carry more atoms (the acid's O-H, not its =O), and
    # read left to right from a carbon.
    chain = max(paths, key=lambda p: (len(p), sum(mol.GetAtomWithIdx(a).GetAtomicNum() == 6 for a in p),
                                      sum(mol.GetAtomWithIdx(a).GetDegree() for a in p)))
    if mol.GetAtomWithIdx(chain[0]).GetAtomicNum() != 6 and mol.GetAtomWithIdx(chain[-1]).GetAtomicNum() == 6:
        chain = chain[::-1]
    xy = {a: (i, 0) for i, a in enumerate(chain)}
    taken = set(xy.values())

    def put(atom, pos):
        if pos in taken:
            raise ValueError(f"full structure: {smiles} crowds at {pos}")
        xy[atom] = pos
        taken.add(pos)

    def grow(atom, dirs, came_from):
        rest = [n for n in nbr[atom] if n not in xy]
        rest.sort(key=lambda n: mol.GetAtomWithIdx(n).GetAtomicNum() == 1)  # heavy first
        if len(rest) > len(dirs):
            raise ValueError(f"full structure: {smiles} atom {atom} has too many groups")
        x, y = xy[atom]
        for n, d in zip(rest, dirs):
            dx, dy = GRID[d]
            far = mol.GetAtomWithIdx(n).GetAtomicNum() > 1 and mol.GetAtomWithIdx(n).GetDegree() > 1 and came_from is None
            put(n, (x + dx * (2 if far else 1), y + dy * (2 if far else 1)))
            back = {"R": "L", "L": "R", "U": "D", "D": "U"}[d]
            grow(n, [d] + [e for e in ("U", "D", "L", "R") if e not in (d, back)], atom)

    for i, a in enumerate(chain):
        ends = (["L"] if i == 0 else []) + (["R"] if i == len(chain) - 1 else [])
        # An end oxygen or nitrogen carries its hydrogen straight on (C-O-H);
        # an end carbon fills above and below first, as NCERT draws CH3.
        hetero = mol.GetAtomWithIdx(a).GetAtomicNum() != 6
        grow(a, ends + ["U", "D"] if hetero else ["U", "D"] + ends, None)
    return mol, xy


def full_structure_mol(smiles):
    """The molecule with its grid coordinates as the conformer and every carbon
    labelled, ready for RDKit to draw."""
    from rdkit import Chem
    from rdkit.Geometry import Point3D

    mol, xy = full_layout(smiles)
    conf = Chem.Conformer(mol.GetNumAtoms())
    for i, (x, y) in xy.items():
        conf.SetAtomPosition(i, Point3D(float(x), float(y), 0.0))
    mol.RemoveAllConformers()
    mol.AddConformer(conf, assignId=True)
    for a in mol.GetAtoms():
        if a.GetAtomicNum() == 6:
            a.SetProp("atomLabel", "C")
    return mol


def structure_per_row(n, asked):
    """At most two molecules a row: the figure shows ~350 px wide on a phone."""
    return max(1, min(asked or 2, 2, n))


def draw_structure(s, out):
    from rdkit import Chem
    from rdkit.Chem import Draw

    mols, legends = [], []
    for m in s["molecules"]:
        mol = full_structure_mol(m["smiles"]) if m.get("full") else Chem.MolFromSmiles(m["smiles"])
        if mol is None:
            raise ValueError(f"structure: RDKit cannot parse SMILES {m['smiles']!r}")
        mols.append(mol)
        legends.append(m.get("name", ""))
    opts = Draw.MolDrawOptions()
    opts.legendFontSize = 22
    opts.addStereoAnnotation = False
    full = any(m.get("full") for m in s["molecules"])
    if full:
        opts.baseFontSize = 0.9
    # A full structural formula is wide and every letter must read: one a row.
    per_row = 1 if full else structure_per_row(len(mols), s.get("per_row"))
    img = Draw.MolsToGridImage(mols, molsPerRow=per_row, subImgSize=(560, 300) if full else (400, 320), legends=legends, drawOptions=opts)
    img.save(out)


def draw_stack(s, out):
    """Panels one above another, each under an optional caption: two graphs with
    different axes, or a series and a parallel circuit, read at phone width."""
    import tempfile
    from PIL import Image

    panels, caps = s["panels"], s.get("captions", [])
    imgs = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, p in enumerate(panels):
            if p.get("kind") == "stack":
                raise ValueError("stack: panels cannot themselves be stacks")
            if i < len(caps) and caps[i]:
                fig = plt.figure(figsize=(0.1, 0.1))
                fig.text(0, 0, caps[i], fontsize=13, color=INK)
                cp = os.path.join(tmp, f"c{i}.png")
                fig.savefig(cp, dpi=DPI, bbox_inches="tight", pad_inches=0.08, facecolor="white")
                plt.close(fig)
                imgs.append(Image.open(cp).convert("RGB"))
            pp = os.path.join(tmp, f"p{i}.png")
            draw(p, pp)
            imgs.append(Image.open(pp).convert("RGB"))
        gap = 24
        w = max(im.width for im in imgs)
        h = sum(im.height for im in imgs) + gap * (len(panels) - 1)
        sheet = Image.new("RGB", (w, h), "white")
        y, k = 0, 0
        for i in range(len(panels)):
            if i < len(caps) and caps[i]:
                sheet.paste(imgs[k], (0, y)); y += imgs[k].height; k += 1
            sheet.paste(imgs[k], ((w - imgs[k].width) // 2, y)); y += imgs[k].height + gap; k += 1
        sheet.save(out)
    return {"panels": len(panels)}


def draw_field(s, out):
    """Field lines COMPUTED from the sources (Coulomb point charges, or a current
    loop's diametral section by Biot-Savart), with dashed equipotentials."""
    fig, ax = plt.subplots(figsize=s.get("size", [5.6, 5]))
    (x0, x1), (y0, y1) = s["xlim"], s["ylim"]
    X, Y = np.meshgrid(np.linspace(x0, x1, 300), np.linspace(y0, y1, 300))
    span = min(x1 - x0, y1 - y0)
    seeds = []
    if "charges" in s:
        ex, ey, v = charge_field(s["charges"], X, Y)
        sources = [c for c in s["charges"] if c["q"] > 0] or s["charges"]
        for c in sources:
            n = s.get("lines", 16)
            for k in range(n):
                th = 2 * np.pi * (k + 0.5) / n
                seeds.append([c["at"][0] + 0.04 * span * np.cos(th), c["at"][1] + 0.04 * span * np.sin(th)])
        u, w = ex, ey
        if s.get("equipotentials"):
            ax.contour(X, Y, v, levels=sorted(s["equipotentials"]), colors="#6b7280", linestyles="--", linewidths=1)
    else:
        lp = s["loop"]
        u, w = loop_field(lp["a"], lp.get("current", 1), X, Y)
        a = lp["a"]
        for xs in np.linspace(-0.6 * a, 0.6 * a, 5):
            seeds.append([xs, 0.0])
        for xs in (1.45 * a, 1.9 * a, 2.5 * a):
            seeds += [[xs, 0.0], [-xs, 0.0]]
    with np.errstate(all="ignore"):
        mag = np.hypot(u, w)
        u, w = u / mag, w / mag  # direction only: spacing, not speed, shows strength
    ax.streamplot(X, Y, np.nan_to_num(u), np.nan_to_num(w), start_points=np.array(seeds), broken_streamlines=False,
                  color=RAY, linewidth=1.3, arrowsize=1.3, integration_direction="both" if "loop" in s else "forward")
    if "charges" in s:
        for c in s["charges"]:
            ax.plot(*c["at"], "o", ms=16, color="#c2410c" if c["q"] > 0 else "#1d4ed8", zorder=5)
            ax.text(*c["at"], "+" if c["q"] > 0 else "−", color="white", ha="center", va="center", fontsize=14, fontweight="bold", zorder=6)
            if c.get("label"):
                ax.annotate(c["label"], c["at"], xytext=(0, -20), textcoords="offset points", ha="center", va="top", fontsize=12)
    else:
        a, cur = s["loop"]["a"], s["loop"].get("current", 1)
        # anticlockwise from above: at x = +a the current runs away from the viewer (into the page)
        for x, into in ((a, cur > 0), (-a, cur <= 0)):
            ax.plot(x, 0, "o", ms=16, mfc="white", mec=INK, mew=1.5, zorder=5)
            ax.plot(x, 0, "x" if into else ".", ms=10 if into else 8, color=INK, mew=2, zorder=6)
        ax.plot([-1.0 * a, a], [0, 0], color="#9ca3af", lw=1, ls=":", zorder=1)
    box = {"boxstyle": "round,pad=0.2", "fc": "white", "ec": "none", "alpha": 0.9}
    for lb in s.get("labels", []):
        ax.text(*lb["at"], lb["text"], fontsize=lb.get("size", 11), ha=lb.get("ha", "center"), va=lb.get("va", "center"), color=lb.get("color", INK), bbox=box, zorder=8)
    for m in s.get("marks", []):
        ax.plot(*m["at"], "o", ms=5, color=ACCENT, zorder=7)
        ax.annotate(m["label"], m["at"], xytext=m.get("offset", [6, 6]), textcoords="offset points", fontsize=11, bbox=box, zorder=8,
                    arrowprops={"arrowstyle": "-", "color": ACCENT, "lw": 1} if m.get("leader") else None)
    ax.set_xlim(x0, x1)
    ax.set_ylim(y0, y1)
    ax.set_aspect("equal")
    ax.axis("off")
    finish(fig, out)


def draw_curve3d(s, out):
    """A parametric space curve (a helix, a spiral) with labelled direction arrows."""
    from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

    fig = plt.figure(figsize=s.get("size", [5, 5.5]))
    ax = fig.add_subplot(111, projection="3d")
    a, b = s["t"]
    t = np.linspace(a, b, 2000)
    ax.plot(ev(s["x"], t=t) * np.ones_like(t), ev(s["y"], t=t) * np.ones_like(t), ev(s["z"], t=t) * np.ones_like(t), color=RAY, lw=1.8)
    for ar in s.get("arrows", []):
        (fx, fy, fz), (tx, ty, tz) = ar["from"], ar["to"]
        ax.quiver(fx, fy, fz, tx - fx, ty - fy, tz - fz, color=ar.get("color", INK), arrow_length_ratio=0.08, lw=1.5)
        if ar.get("label"):
            ax.text(tx, ty, tz, "  " + ar["label"], fontsize=13, color=ar.get("color", INK))
    ax.view_init(*s.get("view", [18, -60]))
    ax.set_box_aspect(s.get("aspect", [1, 1, 1.6]))
    ax.set_axis_off()
    finish(fig, out)


def _draw_one_complex(ax, c):
    geo = c.get("geometry", "oct")
    if geo == "oct":
        proj = {k: (x + 0.62 * y, z + 0.40 * y) for k, (x, y, z) in OCT_POS.items()}
        back = {"5"}
        for a in OCT_POS:  # octahedron edges: every cis pair
            for b in OCT_POS:
                if a < b and sum(u * v for u, v in zip(OCT_POS[a], OCT_POS[b])) == 0:
                    (x1, y1), (x2, y2) = proj[a], proj[b]
                    ax.plot([x1, x2], [y1, y2], color="#cbd5e1", lw=1, ls="--" if back & {a, b} else "-", zorder=1)
    else:
        proj = {k: (0.8 * x, 0.8 * y) for k, (x, y) in SQ_POS.items()}
        back = set()
        ring = ["1", "2", "3", "4", "1"]
        ax.plot([proj[k][0] for k in ring], [proj[k][1] for k in ring], color="#cbd5e1", lw=1, zorder=1)
    for k, (x, y) in proj.items():
        ax.plot([0, x], [0, y], color=INK, lw=1.6, ls="--" if k in back else "-", zorder=2)
    box = {"boxstyle": "round,pad=0.15", "fc": "white", "ec": "none"}
    ax.text(0, 0, c.get("metal", "M"), ha="center", va="center", fontsize=13, fontweight="bold", bbox=box, zorder=4)
    for k, lab in c.get("ligands", {}).items():
        x, y = proj[k]
        ax.text(1.32 * x, 1.32 * y, lab, ha="center", va="center", fontsize=12, bbox=box, zorder=4)
    for a, b, name in c.get("chelates", []):
        (x1, y1), (x2, y2) = proj[a], proj[b]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        n = math.hypot(mx, my) or 1
        cx, cy = mx + 0.55 * mx / n, my + 0.55 * my / n  # bulge away from the metal
        t = np.linspace(0, 1, 60)
        bx = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t ** 2 * x2
        by = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t ** 2 * y2
        ax.plot(bx, by, color=RAY, lw=2.2, zorder=3)
        for x, y in ((x1, y1), (x2, y2)):
            ax.plot(x, y, "o", ms=5, color=RAY, zorder=3)
        ax.text(mx + 0.82 * mx / n, my + 0.82 * my / n, name, ha="center", va="center", fontsize=11, color=RAY, bbox=box, zorder=4)
    if c.get("label"):
        ax.text(0, -1.9, c["label"], ha="center", va="top", fontsize=12)
    ax.set_xlim(-1.9, 1.9)
    ax.set_ylim(-2.35, 1.75)
    ax.set_aspect("equal")
    ax.axis("off")


def draw_complex(s, out):
    """Isomers of coordination complexes on an octahedron (positions 1 top, 6
    bottom, 2 left, 4 right, 3 front, 5 back) or a square (corners 1-4), with
    chelates as arcs on cis edges. Refuses two drawings of one molecule, and a
    declared mirror pair that a rotation would superimpose."""
    items = s["items"]
    for c in items:
        check_complex(c, c.get("geometry", "oct"))
    octs = [i for i, c in enumerate(items) if c.get("geometry", "oct") == "oct"]
    for i in octs:
        for j in octs:
            if i < j and items[i].get("group") == items[j].get("group") and same_complex(items[i], items[j]):
                raise ValueError(f"complex: drawings {i} and {j} are the same molecule")
    for i, j in s.get("mirror_pairs", []):
        if same_complex(items[i], items[j]) or not same_complex(mirror_complex(items[i]), items[j]):
            raise ValueError(f"complex: drawings {i} and {j} are not a pair of non-superimposable mirror images")
    per_row = min(s.get("per_row", 2), 2, len(items))
    rows = math.ceil(len(items) / per_row)
    fig, axes = plt.subplots(rows, per_row, figsize=(2.9 * per_row, 3.1 * rows), squeeze=False)
    for k, ax in enumerate(axes.flat):
        if k < len(items):
            _draw_one_complex(ax, items[k])
        else:
            ax.axis("off")
    finish(fig, out)
    return {"items": len(items)}


GEO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "geo")
_GEO = {}


def load_geo(region):
    """Map data cut from Natural Earth by geo/build_<region>.py. Only Brazil
    exists: India waits for an official Survey of India outline (owner, 2026-10-19)."""
    if region not in _GEO:
        _GEO[region] = json.load(open(os.path.join(GEO_DIR, region + ".json"), encoding="utf-8"))
    return _GEO[region]


def in_ring(pt, ring):
    x, y = pt
    inside = False
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        if (y1 > y) != (y2 > y) and x < x1 + (y - y1) * (x2 - x1) / (y2 - y1):
            inside = not inside
    return inside


def in_any(pt, rings):
    return any(in_ring(pt, r) for r in rings)


MAP_EXTENT = {"brazil": (-74.5, -34.5, -33.5, 6.0)}
# India and its claimed northern territory, with a margin: no frame may touch it.
INDIA_BOX = (66.0, 5.0, 99.0, 38.0)


def extent_shows_india(extent):
    x0, y0, x1, y1 = extent
    a0, b0, a1, b1 = INDIA_BOX
    return x0 < a1 and x1 > a0 and y0 < b1 and y1 > b0


def draw_map(s, out):
    """An outline map drawn from real boundaries (geo/<region>.json): states,
    highlighted states and natural regions shaded, rivers, places, parallels,
    and the INDEX (legend) a board answer is asked to give."""
    from matplotlib.patches import Polygon as Poly, PathPatch, Rectangle
    from matplotlib.path import Path

    region = s.get("region", "brazil")
    x0, y0, x1, y1 = s["extent"] if "extent" in s else MAP_EXTENT[region]
    if extent_shows_india((x0, y0, x1, y1)):
        raise ValueError("map: this frame would show India, whose official outline is not yet supplied")
    geo = load_geo(region)
    fig, ax = plt.subplots(figsize=s.get("size", [5.6, 5.8]))
    ax.set_facecolor("#e0f2fe")  # sea
    home_code = s.get("home", "BRA" if region == "brazil" else None)
    home = geo["countries"].get(home_code, []) if home_code else []
    for code, rings in geo["countries"].items():
        if code == home_code:
            continue
        for r in rings:
            ax.add_patch(Poly(r, closed=True, fc="#f1f5f9", ec="#94a3b8", lw=0.6, zorder=1.5))
    handles = []
    hl = s.get("states", {})
    if region != "brazil":
        # Under the neighbours (zorder 1 < 1.5) so an enclave such as Lesotho shows through.
        for r in home:
            ax.add_patch(Poly(r, closed=True, fc="white", ec="#94a3b8", lw=0.5, zorder=1))
    for name, rings in geo.get("states", {}).items():
        for r in rings:
            ax.add_patch(Poly(r, closed=True, fc=hl.get(name, "white"), ec="#94a3b8", lw=0.5, zorder=2))
    clip_verts, clip_codes = [], []
    for r in home:
        clip_verts += r + [r[0]]
        clip_codes += [Path.MOVETO] + [Path.LINETO] * (len(r) - 1) + [Path.CLOSEPOLY]
    if clip_verts:
        clip = PathPatch(Path(clip_verts, clip_codes), transform=ax.transData, fc="none", ec=INK, lw=1.4, zorder=6)
        ax.add_patch(clip)
    else:  # no home country: nothing to clip regions to
        clip = Rectangle((x0, y0), x1 - x0, y1 - y0, transform=ax.transData, fill=False, lw=0)
        ax.add_patch(clip)
    from matplotlib.patches import Rectangle
    for a in s.get("areas", []):
        if "state" in a:  # part of a state south of a parallel (the Pampas of Rio Grande do Sul)
            band = Rectangle((x0 - 5, y0 - 5), x1 - x0 + 10, a["south_of"] - y0 + 5, transform=ax.transData)
            for r in geo["states"][a["state"]]:
                p = Poly(r, closed=True, fc=a.get("color", "#fde68a"), ec="none", alpha=0.85, hatch=a.get("hatch"), zorder=3)
                ax.add_patch(p)
                p.set_clip_path(band)
            continue
        for r in geo["areas"][a["name"]]:
            p = Poly(r, closed=True, fc=a.get("color", "#fde68a"), ec="none", alpha=0.85, hatch=a.get("hatch"), zorder=3)
            ax.add_patch(p)
            p.set_clip_path(clip)
    for lk in s.get("lakes", []):
        for r in geo["lakes"][lk]:
            ax.add_patch(Poly(r, closed=True, fc="#bae6fd", ec="#0369a1", lw=0.6, zorder=4))
    for rv in s.get("rivers", []):
        for ln in geo["rivers"][rv["name"]]:
            xs, ys = zip(*ln)
            ax.plot(xs, ys, color="#1d4ed8", lw=rv.get("width", 1.6), zorder=4, solid_capstyle="round")
    for ln in s.get("parallels", []):
        ax.plot([x0, x1], [ln["lat"], ln["lat"]], color=ACCENT, lw=1.2, ls="--", zorder=5)
    for pl in s.get("places", []):
        at = pl.get("at") or geo["places"][pl["name"]]
        ax.plot(*at, pl.get("marker", "o"), ms=pl.get("ms", 7), color=pl.get("color", "#b91c1c"), mec="white", mew=0.8, zorder=7)
    for ar in s.get("areas_at", []):  # a shaded patch around named places (an industrial region)
        from matplotlib.patches import Ellipse
        cx, cy = ar["at"]
        ax.add_patch(Ellipse((cx, cy), ar["w"], ar["h"], angle=ar.get("angle", 0), fc=ar.get("color", "#f97316"), ec=ar.get("edge", "#9a3412"),
                             alpha=0.55, hatch=ar.get("hatch"), lw=1, zorder=6))
    box = {"boxstyle": "round,pad=0.2", "fc": "white", "ec": "none", "alpha": 0.85}
    for lb in s.get("labels", []):
        ax.text(*lb["at"], lb["text"], fontsize=lb.get("size", 10), ha=lb.get("ha", "center"), va=lb.get("va", "center"),
                color=lb.get("color", INK), style=lb.get("style", "normal"), bbox=box, zorder=8)
    from matplotlib.lines import Line2D
    from matplotlib.patches import Patch
    for it in s.get("index", []):
        if it["symbol"] == "fill":
            handles.append(Patch(fc=it["color"], ec="#94a3b8", hatch=it.get("hatch"), label=it["text"]))
        elif it["symbol"] == "line":
            handles.append(Line2D([], [], color=it.get("color", "#1d4ed8"), lw=2, ls=it.get("ls", "-"), label=it["text"]))
        else:
            handles.append(Line2D([], [], marker=it.get("marker", "o"), color="none", mfc=it.get("color", "#b91c1c"), mec="white", ms=it.get("ms", 8), label=it["text"]))
    if handles:
        # Below the map, never over it: an index box once hid the very marker it explained.
        ax.legend(handles=handles, title="Index", loc="upper center", bbox_to_anchor=(0.5, -0.01), fontsize=10, title_fontsize=10, frameon=True)
    ax.set_xlim(x0, x1)
    ax.set_ylim(y0, y1)
    ax.set_aspect(1.03)
    ax.set_xticks([])
    ax.set_yticks([])
    for sp in ax.spines.values():
        sp.set_color("#94a3b8")
    finish(fig, out)


def bookmap_xy(bm, lon, lat):
    """lon/lat -> pixel on the book's map, by the fitted quadratic (geo/build_india_balbharati.py)."""
    f = np.array([1.0, lon, lat, lon * lon, lon * lat, lat * lat])
    return float(f @ np.array(bm["cx"])), float(f @ np.array(bm["cy"]))


def draw_bookmap(s, out):
    """The answer marked on a book's own map (India: Balbharati's political map,
    so India's outline is the official one). Nothing of the outline is drawn:
    only places, a parallel, a river or a range, from their real coordinates."""
    sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib", "figures"))
    from crop_answer_figs import render
    from matplotlib.patches import Polygon as Poly, Circle
    from matplotlib.lines import Line2D
    from matplotlib.patches import Patch

    bm = load_geo(s.get("base", "india_balbharati"))
    img = render(bm["pdf"], bm["page"], bm["bbox"])
    w, h = img.size
    fig, ax = plt.subplots(figsize=s.get("size", [5.6, 6.3]))
    ax.imshow(img, extent=(0, w, h, 0), zorder=0)
    xy = lambda lon, lat: bookmap_xy(bm, lon, lat)
    handles = []
    for it in s.get("features", []):
        f = bm["features"][it["name"]]
        col = it.get("color", "#dc2626")
        if f["type"] == "line":
            for ln in f["coords"]:
                pts = [xy(lo, la) for lo, la in ln]
                ax.plot(*zip(*pts), color=col, lw=it.get("width", 3.2), solid_capstyle="round", zorder=5)
            handles.append(Line2D([], [], color=col, lw=3, label=it["text"]))
        else:
            for r in f["coords"]:
                ax.add_patch(Poly([xy(lo, la) for lo, la in r], closed=True, fc=col, ec=it.get("edge", "#7f1d1d"), alpha=0.6,
                                  hatch=it.get("hatch"), lw=1.2, zorder=5))
            handles.append(Patch(fc=col, ec=it.get("edge", "#7f1d1d"), alpha=0.6, hatch=it.get("hatch"), label=it["text"]))
    for pa in s.get("parallels", []):
        lons = np.linspace(66, 100, 120)
        pts = [xy(lo, pa["lat"]) for lo in lons]
        ax.plot(*zip(*pts), color=pa.get("color", "#dc2626"), lw=2.6, ls="--", zorder=5)
        handles.append(Line2D([], [], color=pa.get("color", "#dc2626"), lw=2.6, ls="--", label=pa["text"]))
    for pl in s.get("places", []):
        lon, lat = pl.get("at") or bm["places"][pl["name"]]
        x, y = xy(lon, lat)
        if pl.get("ring"):
            ax.add_patch(Circle((x, y), pl["ring"], fill=False, ec=pl.get("color", "#dc2626"), lw=3, zorder=6))
        else:
            ax.plot(x, y, pl.get("marker", "o"), ms=pl.get("ms", 11), color=pl.get("color", "#dc2626"), mec="white", mew=1.5, zorder=6)
        handles.append(Line2D([], [], marker="o" if pl.get("ring") else pl.get("marker", "o"), color="none",
                              mfc="none" if pl.get("ring") else pl.get("color", "#dc2626"), mec=pl.get("color", "#dc2626"),
                              mew=2 if pl.get("ring") else 1, ms=10, label=pl["text"]))
    ax.legend(handles=handles, title="Index", loc="upper center", bbox_to_anchor=(0.5, -0.01), fontsize=10, title_fontsize=10, frameon=True)
    ax.set_xlim(0, w)
    ax.set_ylim(h, 0)
    ax.axis("off")
    finish(fig, out)


KINDS = {"bookmap": draw_bookmap, "map": draw_map, "complex": draw_complex, "field": draw_field, "curve3d": draw_curve3d, "stack": draw_stack, "plot": draw_plot, "histogram": draw_histogram, "bar": draw_bar, "pie": draw_pie, "geometry": draw_geometry, "ray": draw_ray, "circuit": draw_circuit, "structure": draw_structure}


def draw(spec, out):
    fn = KINDS.get(spec.get("kind"))
    if fn is None:
        raise ValueError(f"unknown kind {spec.get('kind')!r}; known: {sorted(KINDS)}")
    return fn(spec, out)


def selftest():
    def close(a, b):
        return abs(a - b) < 1e-9

    # Hand-worked textbook cases, Cartesian signs (object at u < 0).
    v = lens_image(10, -15)
    assert close(v, 30) and close(v / -15, -2), "convex lens f=10, u=15: v=+30, m=-2"
    v = lens_image(-15, -10)
    assert close(v, -6) and close(v / -10, 0.6), "concave lens f=15, u=10: v=-6, m=0.6"
    v = mirror_image(-15, -10)
    assert close(v, 30) and close(-v / -10, 3), "concave mirror f=15, u=10: v=+30 (behind), m=+3"
    v = mirror_image(-12, -18)
    assert close(v, -36) and close(-v / -18, -2), "concave mirror f=12, u=18: v=-36, m=-2"
    v = mirror_image(20, -30)
    assert close(v, 12) and close(-v / -30, 0.4), "convex mirror f=20, u=30: v=+12, m=0.4"
    assert lens_image(10, -10) is None and mirror_image(-10, -10) is None, "object at F: image at infinity"

    # Data points with "line": false stay unjoined (a fitted line is drawn separately).
    fig, ax = plt.subplots()
    plot_points(ax, {"x": [1, 2, 3], "y": [1, 4, 9], "line": False}, RAY, "-", None)
    assert ax.lines[-1].get_linestyle() == "None", "points with line: false must not be joined"
    plot_points(ax, {"x": [1, 2, 3], "y": [1, 4, 9]}, RAY, "-", None)
    assert ax.lines[-1].get_linestyle() == "-", "points are joined by default"
    plt.close(fig)

    # Every histogram bar carries its frequency, so a height between gridlines can still be read.
    fig, ax = histogram_axes({"classes": [[0, 30], [30, 60]], "freq": [54, 68]})
    assert {t.get_text() for t in ax.texts} >= {"54", "68"}, "histogram bars are labelled with their frequencies"
    plt.close(fig)

    # A stack puts its panels one above another (phone width), each under its caption.
    import tempfile
    from PIL import Image
    with tempfile.TemporaryDirectory() as tmp:
        p1, p2, ps = (os.path.join(tmp, n) for n in ("a.png", "b.png", "s.png"))
        line = {"kind": "plot", "series": [{"type": "line", "through": [[0, 0], [1, 1]]}]}
        draw(line, p1)
        draw(dict(line, size=[4, 3]), p2)
        info = draw({"kind": "stack", "panels": [line, dict(line, size=[4, 3])], "captions": ["(i) first", "(ii) second"]}, ps)
        a, b, st = (Image.open(x).size for x in (p1, p2, ps))
        assert info["panels"] == 2, "stack reports its panel count"
        assert st[0] == max(a[0], b[0]), "stack is as wide as its widest panel"
        assert st[1] > a[1] + b[1], "stack is taller than its panels together (captions)"

    # Full structural formulas (Class 10): every atom on a square grid, every
    # bond straight across or up (a branch reaches out two units, as NCERT draws
    # it, so its hydrogens clear the chain's), no two atoms on one point.
    mol, xy = full_layout("CCCC(=O)O")
    oh = [a for a in mol.GetAtoms() if a.GetAtomicNum() == 8 and a.GetTotalNumHs(includeNeighbors=True) == 1][0]
    assert xy[oh.GetIdx()][1] == 0, "butanoic acid: the O-H oxygen ends the chain"
    mol, xy = full_layout("CC(C)=O")
    assert sorted(xy[a.GetIdx()][1] for a in mol.GetAtoms() if a.GetAtomicNum() == 6) == [0, 0, 0], "propanone: the three carbons form the chain"
    for smi in ("CCCC", "CC(C)CC", "CC(C)(C)C", "CC(C)=O", "C=O", "CCO", "CC(=O)O", "C=CCC", "CC=CC", "CCCCCCl", "CCCC(=O)O"):
        mol, xy = full_layout(smi)
        assert len(set(xy.values())) == mol.GetNumAtoms(), f"{smi}: two atoms share a point"
        for b in mol.GetBonds():
            (x1, y1), (x2, y2) = xy[b.GetBeginAtomIdx()], xy[b.GetEndAtomIdx()]
            assert (x1 == x2 or y1 == y2) and abs(x1 - x2) + abs(y1 - y2) in (1, 2), f"{smi}: bond {b.GetIdx()} is not straight"
            if abs(x1 - x2) + abs(y1 - y2) == 2:
                assert ((x1 + x2) // 2, (y1 + y2) // 2) not in xy.values(), f"{smi}: a long bond runs through an atom"

    # Field kind: the physics it draws from, checked at three textbook points.
    gx, gy = np.meshgrid(np.array([0.0]), np.array([0.0]))
    ex, ey, _ = charge_field([{"q": 1, "at": [-1, 0]}, {"q": 1, "at": [1, 0]}], gx, gy)
    assert abs(ex[0, 0]) < 1e-9 and abs(ey[0, 0]) < 1e-9, "two equal charges: no field at the midpoint"
    _, _, v = charge_field([{"q": 1, "at": [-1, 0]}, {"q": -1, "at": [1, 0]}], np.array([[0.0, 0.0]]), np.array([[0.5, 3.0]]))
    assert np.all(np.abs(v) < 1e-9), "dipole: zero potential on the perpendicular bisector"
    bx, bz = loop_field(1.0, 1.0, np.array([[0.0]]), np.array([[0.0]]))
    assert abs(bx[0, 0]) < 1e-9 and bz[0, 0] > 0, "anticlockwise loop (seen from above): field at the centre points up"

    # Complex isomers: the rotation group decides what is the same molecule.
    assert len(OCT_ROTATIONS) == 24, "the octahedron has 24 rotations"
    cis_en = {"ligands": {"1": "Cl", "2": "Cl"}, "chelates": [["3", "6", "en"], ["4", "5", "en"]]}
    trans_en = {"ligands": {"1": "Cl", "6": "Cl"}, "chelates": [["2", "3", "en"], ["4", "5", "en"]]}
    tris = {"chelates": [["1", "2", "en"], ["3", "6", "en"], ["4", "5", "en"]]}
    assert not same_complex(cis_en, mirror_complex(cis_en)), "cis-[M(en)2Cl2]: mirror image is a different molecule (chiral)"
    assert same_complex(trans_en, mirror_complex(trans_en)), "trans-[M(en)2Cl2]: mirror image is the same molecule"
    assert not same_complex(tris, mirror_complex(tris)), "[M(en)3]: chiral"
    assert not same_complex(cis_en, trans_en), "cis and trans are different"
    try:
        check_complex({"ligands": {"1": "Cl", "2": "Cl", "3": "Cl"}, "chelates": [["4", "6", "en"]]})
        raise AssertionError("an octahedron with a position left empty must be refused")
    except ValueError:
        pass
    try:
        check_complex({"ligands": {"1": "Cl"}, "chelates": [["2", "4", "en"], ["3", "5", "en"]]})
        raise AssertionError("a chelate across trans positions must be refused")
    except ValueError:
        pass

    # Map data: each named place falls inside the state it belongs to.
    geo = load_geo("brazil")
    for place, state in (("Manaus", "Amazonas"), ("Brasília", "Distrito Federal"), ("Rio Grande", "Rio Grande do Sul"), ("Rio de Janeiro", "Rio de Janeiro")):
        assert in_any(geo["places"][place], geo["states"][state]), f"{place} must fall inside {state}"
    par = geo["rivers"]["Paraguay"][0]
    assert max(par[0][1], par[-1][1]) > -16 and min(par[0][1], par[-1][1]) < -26, "the Paraguay runs from Mato Grosso to the Parana confluence"
    assert in_any([-49.5, -0.9], geo["areas"]["Ilha de Marajó"]), "Marajo lies at the Amazon mouth"

    # World regional maps: never a frame that shows India (owner, 2026-10-19:
    # India waits for an official Survey of India outline), and every named
    # city falls inside its own country.
    assert not extent_shows_india((125, 28, 148, 46)), "Japan frame shows no India"
    assert extent_shows_india((60, 0, 100, 40)) and extent_shows_india((40, -10, 80, 30)), "frames touching India are caught"
    try:
        draw_map({"kind": "map", "region": "world", "extent": [50, 0, 90, 30]}, os.devnull)
        raise AssertionError("a world map framing India must be refused")
    except ValueError:
        pass
    world = load_geo("world")
    for place, iso in (("Tokyo", "JPN"), ("Osaka", "JPN"), ("Sydney", "AUS"), ("Johannesburg", "ZAF"), ("Essen", "DEU")):
        assert in_any(world["places"][place], world["countries"][iso]), f"{place} must fall inside {iso}"

    # Book map (Balbharati's India political map): the fitted lon/lat -> pixel
    # map lands on the places the book itself prints, and stays honest about it.
    bm = load_geo("india_balbharati")
    assert bm["rms_px"] < 4, "the book's graticule fit is tight"
    for name, (lon, lat, px, py) in bm["controls"].items():
        x, y = bookmap_xy(bm, lon, lat)
        assert abs(x - px) < 12 and abs(y - py) < 12, f"{name} lands on the book's own mark"

    # Region-between-curves figures (2026-10-24): the shaded area is measured and
    # checked against the answer, so a wrong region cannot ship. Hand-worked cases.
    def area_of(fills):
        return shaded_area({"kind": "plot", "fills": fills})
    assert abs(area_of([{"type": "between", "upper": "x", "lower": "x**2", "domain": [0, 1]}]) - 1 / 6) < 1e-6, "between y=x and y=x^2: 1/6"
    assert abs(area_of([{"type": "between", "upper": "minimum(8-x**2, 7)", "lower": "x**2", "domain": [-2, 2]}]) - 20) < 1e-4, "x^2 <= y <= 8-x^2, y <= 7: 20 (JEE 8 Apr 2023)"
    lens = [{"type": "between", "upper": "sqrt(4-x**2)", "lower": "2-sqrt(4-x**2)", "domain": [-math.sqrt(3), math.sqrt(3)]}]
    assert abs(area_of(lens) - 2 / 3 * (4 * math.pi - 3 * math.sqrt(3))) < 1e-4, "two circles of radius 2, centres 2 apart: (2/3)(4pi - 3sqrt3)"
    assert abs(area_of([{"type": "betweenx", "left": "y**2", "right": "1", "range": [-1, 1]}]) - 4 / 3) < 1e-6, "between x=y^2 and x=1: 4/3"
    assert abs(area_of([{"type": "polygon", "points": [[0, 0], [2, 0], [0, 3]]}]) - 3) < 1e-9, "triangle (0,0),(2,0),(0,3): 3"
    assert abs(area_of([{"type": "between", "upper": "abs(x)", "lower": "0", "domain": [-1, 1]}]) - 1) < 1e-6, "under |x| on [-1, 1]: 1"
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "a.png")
        spec = {"kind": "plot", "series": [{"type": "function_y", "expr": "y**2", "range": [-1, 1]}, {"type": "vline", "x": 1}],
                "fills": [{"type": "betweenx", "left": "y**2", "right": "1", "range": [-1, 1]}], "check": {"area": "4/3"}}
        assert abs(draw(spec, out)["area"] - 4 / 3) < 1e-6, "a checked figure reports its shaded area"
        try:
            draw(dict(spec, check={"area": 2}), out)
            raise AssertionError("a shaded area that misses the answer must be refused")
        except ValueError as e:
            assert "area" in str(e)
        # Phone-width layout (owner review, 2026-10-24): ticks read "20", not "20.0", and the
        # origin's "0" is left off, where it sat on the point labels; the legend goes below.
        assert clean_tick(20.0, None) == "20" and clean_tick(2.5, None) == "2.5" and clean_tick(0.0, None) == "", "clean ticks"
        assert clean_tick(-2.0, None) == "−2", "a negative tick carries a real minus sign"
        draw(dict(spec, legend="below", ticks="clean"), out)
        # Two regions (R1 and R2): each fill can carry its own area, checked on its own.
        two = {"kind": "plot", "fills": [
            {"type": "between", "upper": "sqrt(x)", "lower": "2*x", "domain": [0, 0.25], "area": "1/48"},
            {"type": "between", "upper": "minimum(sqrt(x), 2*x)", "lower": "x**3", "domain": [0, 1], "area": "19/48"}]}
        draw(two, out)
        try:
            draw({"kind": "plot", "fills": [dict(two["fills"][0], area="1/24"), two["fills"][1]]}, out)
            raise AssertionError("one region whose area misses must be refused")
        except ValueError as e:
            assert "area" in str(e)

    # Structure grids stay two to a row at most, so names stay legible on a phone.
    assert structure_per_row(8, 4) == 2 and structure_per_row(8, None) == 2, "8 molecules: two per row"
    assert structure_per_row(1, None) == 1 and structure_per_row(3, 1) == 1, "one molecule, or one asked: one per row"
    print("selftest ok")


def main():
    a = sys.argv[1:]
    if a[:1] == ["--selftest"]:
        selftest()
        return
    if a[:1] == ["--preview"]:
        info = draw(json.load(open(a[1], encoding="utf-8")), a[2])
        print(json.dumps({"png": a[2], **(info or {})}))
    elif a[:1] == ["--batch"]:
        job = json.load(open(a[1], encoding="utf-8"))
        os.makedirs(job["outdir"], exist_ok=True)
        out = {}
        for j in job["jobs"]:
            path = os.path.join(job["outdir"], "ans-" + j["ref"].replace("-", "_") + ".png")
            draw(j["spec"], path)
            out[j["ref"]] = path
        print(json.dumps(out))
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
