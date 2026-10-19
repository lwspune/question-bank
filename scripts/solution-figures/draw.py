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
                       {type: parametric, x: "cos(t)", y: "sin(t)", t: [a, b]}
                       ... each may carry label, style ("-", "--", ":"), color],
              fills: [{type: between, upper: expr, lower: expr, domain: [a, b]} | {type: polygon, points: [[x, y], ...]}],
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
  structure  {molecules: [{smiles, name}], per_row}
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
SAFE.update({"pi": math.pi, "e": math.e, "ln": np.log})
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
        elif t == "points":
            ax.plot(sr["x"], sr["y"], ls if sr.get("line", True) else "none", marker=sr.get("marker", "o"), color=color, lw=2, ms=5, label=lab)
            for x, y, txt in zip(sr["x"], sr["y"], sr.get("labels", [])):
                if txt:
                    ax.annotate(txt, (x, y), xytext=(5, 5), textcoords="offset points", fontsize=11)
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
        elif fl.get("type") == "polygon":
            ax.fill(*zip(*fl["points"]), color=fl.get("color", RAY), alpha=fl.get("alpha", 0.2), lw=0)
        else:
            raise ValueError(f"plot: unknown fill type {fl.get('type')!r}")
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
    if any(sr.get("label") for sr in s.get("series", [])) and s.get("legend", True):
        ax.legend(frameon=False, fontsize=10)
    finish(fig, out)


def draw_histogram(s, out):
    fig, ax = plt.subplots(figsize=s.get("size", [6, 4.2]))
    classes, freq = s["classes"], s["freq"]
    if len(classes) != len(freq):
        raise ValueError("histogram: classes and freq differ in length")
    for (lo, hi), f in zip(classes, freq):
        ax.bar(lo, f, width=hi - lo, align="edge", color="#bfdbfe", edgecolor=INK, lw=1.2)
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


def draw_structure(s, out):
    from rdkit import Chem
    from rdkit.Chem import Draw

    mols, legends = [], []
    for m in s["molecules"]:
        mol = Chem.MolFromSmiles(m["smiles"])
        if mol is None:
            raise ValueError(f"structure: RDKit cannot parse SMILES {m['smiles']!r}")
        mols.append(mol)
        legends.append(m.get("name", ""))
    opts = Draw.MolDrawOptions()
    opts.legendFontSize = 22
    opts.addStereoAnnotation = False
    img = Draw.MolsToGridImage(mols, molsPerRow=s.get("per_row", min(3, len(mols))), subImgSize=tuple(s.get("cell", [360, 300])), legends=legends, drawOptions=opts)
    img.save(out)


KINDS = {"plot": draw_plot, "histogram": draw_histogram, "bar": draw_bar, "pie": draw_pie, "geometry": draw_geometry, "ray": draw_ray, "circuit": draw_circuit, "structure": draw_structure}


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
