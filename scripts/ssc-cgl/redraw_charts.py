"""Charts redrawn from the numbers SSC printed on them, where the scanned chart's labels are too
small to read on a phone (the owner's one exception to "no drawn figures": a chart computed from
the question's own data). Every value below is read off SSC's chart and checked to sum to its whole
(100% or 360 degrees); slice order and colours follow SSC's chart, so the picture is the same chart.

    python -P scripts/ssc-cgl/redraw_charts.py <outDir>        # writes <outDir>/<shift>/qNNN.png

Then refigure.ts <shift> <n> --from=<outDir>/<shift> puts each on its live row.

Sized for the site: a stem picture is shown at most 256 px tall, so each chart is laid out for a
2.56 in tall canvas and saved at 200 dpi (512 px), sharp on a phone's 2x screen.
"""
import math
import os
import sys

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

DPI = 200
H = 2.56

# shift, number, kind, title, [(label, value, colour)], whole
CHARTS = [
    ("t1-2023-07-21-s3", 69, "pie", None, "%", [
        ("T.N", 9, "#2F5597"), ("A.P", 25, "#C0392B"), ("M.P", 20, "#7DAA3A"), ("Delhi", 8, "#6A3D8F"),
        ("Goa", 12, "#2E9DB7"), ("Bihar", 11, "#E67E22"), ("U.P", 15, "#8EA9DB")], 100),
    ("t1-2023-07-17-s2", 53, "pie", None, "%", [
        ("A", 40, "#4472C4"), ("B", 15, "#ED7D31"), ("C", 8, "#A5A5A5"), ("D", 25, "#FFC000"), ("E", 12, "#5B9BD5")], 100),
    ("t1-2024-09-18-s2", 61, "pie", None, "°", [
        ("Cricket", 100, "#1F8AC0"), ("Swimming", 60, "#ED7D31"), ("Badminton", 45, "#EE82EE"), ("Tennis", 65, "#FFC000"),
        ("Soccer", 35, "#1DE9B6"), ("Rugby", 25, "#4FC3F7"), ("Hockey", 30, "#B23C8F")], 360),
    ("t1-2024-09-24-s3", 59, "pie", "Expenditure in thousands", "%", [
        ("Dance", 5, "#4472C4"), ("Music", 6, "#ED7D31"), ("Guitar", 34, "#A5A5A5"), ("Keyboard", 22, "#FFC000"),
        ("Drama", 14, "#5B9BD5"), ("Drawing", 19, "#70AD47")], 100),
    ("t1-2024-09-12-s3", 65, "bar", "Percentage Distribution of Total Expenditure of a Company", "", [
        ("Infrastructure", 20, "#7F7F7F"), ("Transport", 12.5, "#7F7F7F"), ("Advertisement", 15, "#7F7F7F"), ("Taxes", 10, "#7F7F7F"),
        ("R&D", 5, "#7F7F7F"), ("Salary", 20, "#7F7F7F"), ("Interest on Loans", 17.5, "#7F7F7F")], 100),
]


def num(v):
    return f"{v:g}"


def pie(ax, rows, unit):
    vals = [v for _, v, _ in rows]
    wedges, _ = ax.pie(vals, colors=[c for _, _, c in rows], startangle=90, counterclock=False,
                       wedgeprops={"edgecolor": "white", "linewidth": 1})
    total = sum(vals)

    for w, (label, v, _) in zip(wedges, rows):
        mid = math.radians((w.theta1 + w.theta2) / 2)
        small = v / total < 0.07
        r = 1.22 if small else 0.66
        x, y = r * math.cos(mid), r * math.sin(mid)
        # Dark text on a pale slice or outside the pie, white text on a dark slice.
        r_, g_, b_ = w.get_facecolor()[:3]
        dark = 0.299 * r_ + 0.587 * g_ + 0.114 * b_ < 0.55
        ax.text(x, y, f"{label}\n{num(v)}{unit}", ha="center", va="center", fontsize=7.5, fontweight="bold",
                color="white" if dark and not small else "black")
    ax.set_aspect("equal")


def bar(ax, rows):
    labels = [l for l, _, _ in rows]
    vals = [v for _, v, _ in rows]
    bars = ax.bar(range(len(rows)), vals, color=[c for _, _, c in rows], width=0.6)
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + 0.4, num(v), ha="center", va="bottom", fontsize=7)
    ax.set_xticks(range(len(rows)), [l.replace(" on ", "\non ").replace("Advertisement", "Advertise-\nment").replace("Infrastructure", "Infra-\nstructure") for l in labels], fontsize=6.5)
    ax.set_ylim(0, 25)
    ax.set_yticks(range(0, 26, 5))
    ax.tick_params(axis="y", labelsize=7)
    ax.set_ylabel("Percent Spent", fontsize=7)
    ax.spines[["top", "right"]].set_visible(False)


def main():
    out = sys.argv[1]
    for shift, n, kind, title, unit, rows, whole in CHARTS:
        total = sum(v for _, v, _ in rows)
        if abs(total - whole) > 1e-9:
            sys.exit(f"{shift} Q{n}: values sum to {total}, not {whole}")
        width = 3.2 if kind == "pie" else 4.2
        fig, ax = plt.subplots(figsize=(width, H), dpi=DPI)
        if kind == "pie":
            pie(ax, rows, unit)
        else:
            bar(ax, rows)
        if title:
            fig.suptitle(title, fontsize=7.5, fontweight="bold")
        fig.tight_layout(pad=0.4)
        d = os.path.join(out, shift)
        os.makedirs(d, exist_ok=True)
        fig.savefig(os.path.join(d, f"q{n:03d}.png"), dpi=DPI, facecolor="white")
        plt.close(fig)
        print(f"{shift} Q{n}: {len(rows)} values, sum {num(total)}")


if __name__ == "__main__":
    main()
