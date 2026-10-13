"""Redrawn figures for MHT-CET 2026, 16 April Shift I. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here, molecules_row, switch_network  # noqa: E402

D = here(__file__)

# Q16: (I) phenol (II) benzyl alcohol (III) 3-ethylbenzyl alcohol (IV) 3-ethylphenol
molecules_row(
    f"{D}/q016.png",
    [
        ("Oc1ccccc1", 0, "(I)"),
        ("OCc1ccccc1", 1, "(II)"),
        ("OCc1cccc(CC)c1", 1, "(III)"),
        ("Oc1cccc(CC)c1", 0, "(IV)"),
    ],
)

# Q61: three parallel branches (S1 S2), (S1 S2'), (S1' S2); options are the simplified circuits.
switch_network(f"{D}/q061.png", [["$S_1$", "$S_2$"], ["$S_1$", "$S_2'$"], ["$S_1'$", "$S_2$"]])
switch_network(f"{D}/q061-A.png", [["$S_1$", "$S_2$"]])
switch_network(f"{D}/q061-B.png", [["$S_1$"], ["$S_2$"]])
switch_network(f"{D}/q061-C.png", [["$S_1$", "$S_2'$"]])
switch_network(f"{D}/q061-D.png", [["$S_1$"], ["$S_2'$"]])


# Q135: U-shaped circuit with a resistor on the left side, rod of length L closing it on the
# right, moving right with velocity V, in a field into the page (crosses).
def q135(ax, np):
    for x in np.arange(-0.4, 6.1, 1.1):
        for y in np.arange(-0.6, 3.7, 1.05):
            ax.text(x, y, r"$\times$", ha="center", va="center", fontsize=18, color="0.35")
    ax.plot([0.4, 4.1], [2.9, 2.9], color="black", lw=2)
    ax.plot([0.4, 4.1], [0.2, 0.2], color="black", lw=2)
    ys = np.linspace(0.9, 2.2, 9)
    xs = 0.4 + 0.15 * np.array([0, 1, -1, 1, -1, 1, -1, 1, 0])
    ax.plot([0.4, 0.4], [0.2, 0.9], color="black", lw=2)
    ax.plot(xs, ys, color="black", lw=2)
    ax.plot([0.4, 0.4], [2.2, 2.9], color="black", lw=2)
    ax.plot([4.1, 4.1], [0.2, 2.9], color="black", lw=3)
    ax.text(3.75, 1.55, "$L$", fontsize=17, ha="center", va="center")
    ax.annotate("", xy=(5.6, 1.55), xytext=(4.1, 1.55), arrowprops=dict(arrowstyle="-|>", color="black", lw=2, mutation_scale=22))
    ax.text(5.7, 1.55, r"$\vec{V}$", fontsize=17, va="center")
    ax.set_aspect("equal")
    ax.set_xlim(-0.8, 6.4)
    ax.set_ylim(-0.9, 3.9)
    ax.axis("off")


graph(f"{D}/q135.png", q135, size=(5.0, 3.4))


# Q145: four E-against-nu graphs. (A) line from O; (B) line starting on the E axis above O;
# (C) line starting on the nu axis to the right of O; (D) line falling to the nu axis.
def q145(ax, np):
    for i, lab in enumerate("ABCD"):
        x0 = i * 1.8
        ax.annotate("", xy=(x0 + 1.25, 0), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
        ax.annotate("", xy=(x0, 1.15), xytext=(x0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
        ax.text(x0 - 0.06, 1.1, "$E$", ha="right", fontsize=12)
        ax.text(x0 - 0.06, -0.08, "$0$", ha="right", va="top", fontsize=11)
        ax.text(x0 + 1.15, -0.08, r"$\nu$", fontsize=13, va="top")
        ax.text(x0 + 0.55, -0.25, f"({lab})", ha="center", va="top", fontsize=12)
    ax.plot([0, 0.95], [0, 0.95], color="black", lw=1.6)
    ax.plot([1.8, 2.8], [0.45, 1.05], color="black", lw=1.6)
    ax.plot([3.95, 4.75], [0, 0.85], color="black", lw=1.6)
    ax.plot([5.4, 6.3], [1.0, 0], color="black", lw=1.6)
    ax.set_xlim(-0.3, 6.8)
    ax.set_ylim(-0.55, 1.25)
    ax.set_aspect("equal")
    ax.axis("off")


graph(f"{D}/q145.png", q145, size=(6.6, 2.0))


# Q149: A, B -> NOR (output C) -> NOT -> Y
def q149(d, elm):
    from schemdraw import logic

    g1 = d.add(logic.Nor().at((1, 0)).anchor("in1").right())
    d.add(elm.Line().at((0, g1.in1.y)).to(g1.in1).label("$A$", loc="left"))
    d.add(elm.Line().at((0, g1.in2.y)).to(g1.in2).label("$B$", loc="left"))
    d.add(elm.Label().at(g1.out).label("$C$", loc="top", ofst=0.15))
    n1 = d.add(logic.Not().at(g1.out).right())
    out = d.add(elm.Line().at(n1.out).right(0.7))
    d.add(elm.Label().at(out.end).label("$Y$", loc="right", ofst=0.35))


circuit(f"{D}/q149.png", q149)
