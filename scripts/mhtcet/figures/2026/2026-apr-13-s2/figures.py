"""Redrawn figures for MHT-CET 2026, 13 April Shift II. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, graph, here  # noqa: E402

D = here(__file__)


# Q103: v (m/s) against t (s): +8 on 0-2, -4 on 2-4, +4 on 4-8, -4 on 8-10.
def q103(ax, np):
    t = [0, 0, 2, 2, 4, 4, 8, 8, 10, 10]
    v = [0, 8, 8, -4, -4, 4, 4, -4, -4, 0]
    ax.plot(t, v, color="black", lw=1.8)
    ax.set_xticks([2, 4, 6, 8, 10])
    ax.tick_params(axis="x", pad=-16)
    ax.set_yticks([-6, -4, -2, 0, 2, 4, 6, 8])
    ax.set_xlim(-0.3, 11)
    ax.set_ylim(-7, 9)
    ax.set_xlabel("time (s)")
    ax.set_ylabel(r"$v\ (\mathrm{m\,s^{-1}})$")
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_position("zero")
    ax.spines["left"].set_position("zero")
    ax.xaxis.set_label_coords(0.6, 0.12)


graph(f"{D}/q103.png", q103, size=(4.8, 3.8))


# Q126: two concentric half rings (upper semicircles) of radii R1 < R2 about O, each with
# linear charge density lambda (+ signs along them); radius arrows from O.
def q126(ax, np):
    th = np.linspace(0, np.pi, 200)
    for r, lab in ((1.0, r"$R_1$"), (1.6, r"$R_2$")):
        ax.plot(r * np.cos(th), r * np.sin(th), color="black", lw=1.8)
        for a in np.linspace(0.12, np.pi - 0.12, 9):
            ax.text((r + 0.11) * np.cos(a), (r + 0.11) * np.sin(a), "+", ha="center", va="center", fontsize=11)
        ax.text((r - 0.2) * np.cos(2.35), (r - 0.2) * np.sin(2.35), r"$\lambda$", fontsize=14, ha="center", va="center")
    for r, a, lab in ((1.0, 0.65, r"$R_1$"), (1.6, 1.0, r"$R_2$")):
        ax.annotate("", xy=(r * np.cos(a), r * np.sin(a)), xytext=(0, 0), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.2))
        ax.text(r * 0.55 * np.cos(a) - 0.3, r * 0.55 * np.sin(a) + 0.05, lab, fontsize=13)
    ax.plot([0], [0], "ko", ms=3)
    ax.text(0, -0.12, "$O$", ha="center", va="top", fontsize=13)
    ax.set_aspect("equal")
    ax.set_xlim(-1.9, 1.9)
    ax.set_ylim(-0.3, 1.9)
    ax.axis("off")


graph(f"{D}/q126.png", q126, size=(4.6, 2.8))


# Q130: bridge A-B 10 ohm, B-C 10 ohm, A-D 30 ohm, D-C 30 ohm, galvanometer G across B-D,
# 3 V battery from C back to A (current I drawn from it).
def q130(d, elm):
    A, B, C, Dn = (0, 0), (3, 3), (6, 0), (3, -3)
    d += elm.Resistor().at(A).to(B).label(r"$10\ \Omega$", loc="top")
    d += elm.Resistor().at(B).to(C).label(r"$10\ \Omega$", loc="top")
    d += elm.Resistor().at(A).to(Dn).label(r"$30\ \Omega$", loc="bottom")
    d += elm.Resistor().at(Dn).to(C).label(r"$30\ \Omega$", loc="bottom")
    g = d.add(elm.Source().at(B).down(6))
    d += elm.Label().at(g.center).label("$G$", loc="center", ofst=0)
    d += elm.Line().at(C).to((7.5, 0))
    d += elm.Line().at((7.5, 0)).to((7.5, -4.5))
    bat = d.add(elm.Battery().at((7.5, -4.5)).left(3).label(r"$3\ V$", loc="bottom"))
    d += elm.Line().at(bat.end).to((-1.5, -4.5))
    d += elm.Line().at((-1.5, -4.5)).to((-1.5, 0)).label("$I$", loc="left")
    d += elm.Arrow().at((-1.5, -1.6)).to((-1.5, -1.0))
    d += elm.Line().at((-1.5, 0)).to(A)
    for p, lab, loc in ((A, "A", "top"), (B, "B", "top"), (C, "C", "top"), (Dn, "D", "bottom")):
        d += elm.Dot().at(p).label(f"${lab}$", loc=loc)


circuit(f"{D}/q130.png", q130)


# Q141: double slit S1 (upper), S2 (lower); O on the screen on the central line; Q above O,
# P below O. Rays S1-P and S2-P; B is the foot of the perpendicular from S2 onto S1P.
def q141(ax, np):
    S1, S2, P = np.array([0.0, 0.6]), np.array([0.0, -0.6]), np.array([3.0, -1.1])
    ax.plot([-1.0, -1.0], [-1.0, -0.1], color="black", lw=4)
    ax.plot([-1.0, -1.0], [0.1, 1.0], color="black", lw=4)
    ax.text(-1.1, -1.25, "Slit", fontsize=12)
    for y0, y1 in ((0.75, 1.4), (-0.45, 0.45), (-1.4, -0.75)):
        ax.plot([0, 0], [y0, y1], color="black", lw=4)
    ax.plot([3.0, 3.0], [-1.6, 1.6], color="black", lw=1.5)
    ax.plot([-1.0, 3.0], [0, 0], color="black", lw=1, ls="--")
    ax.plot(*zip(S1, P), color="black", lw=1.2)
    ax.plot(*zip(S2, P), color="black", lw=1.2)
    u = (P - S1) / np.linalg.norm(P - S1)
    B = S1 + np.dot(S2 - S1, u) * u
    ax.plot(*zip(S2, B), color="black", lw=1.2)
    n = np.array([-u[1], u[0]])
    sq = 0.08
    ax.plot([B[0] - sq * u[0], B[0] - sq * u[0] - sq * n[0], B[0] - sq * n[0]], [B[1] - sq * u[1], B[1] - sq * u[1] - sq * n[1], B[1] - sq * n[1]], color="black", lw=0.8)
    for pt, lab, dx, dy in ((S1, "$S_1$", -0.32, 0.05), (S2, "$S_2$", -0.32, -0.15), (B, "$B$", -0.05, 0.12), (P, "$P$", 0.08, -0.12), ((3, 0), "$O$", 0.08, -0.05), ((3, 1.2), "$Q$", 0.08, 0)):
        ax.text(pt[0] + dx, pt[1] + dy, lab, fontsize=13)
    ax.plot([3], [1.2], "ko", ms=3)
    ax.set_aspect("equal")
    ax.set_xlim(-1.4, 3.5)
    ax.set_ylim(-1.7, 1.7)
    ax.axis("off")


graph(f"{D}/q141.png", q141, size=(4.6, 3.2))


# Q147: hydrogen levels n = 1, 2, 3; transition 1 from n = 3 to n = 1, transition 2 from
# n = 2 to n = 1 (downward arrows).
def q147(ax, np):
    for y, lab in ((0, "$n = 1$"), (2, "$n = 2$"), (3.2, "$n = 3$")):
        ax.plot([0, 4], [y, y], color="black", lw=1.6)
        ax.text(-0.15, y, lab, ha="right", va="center", fontsize=13)
    ax.annotate("", xy=(2.6, 0), xytext=(2.6, 3.2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.5))
    ax.annotate("", xy=(1.2, 0), xytext=(1.2, 2), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.5))
    ax.text(2.7, 1.0, "1", fontsize=14)
    ax.text(1.3, 1.0, "2", fontsize=14)
    ax.text(4.1, 2.6, "Excited states", fontsize=12, va="center")
    ax.text(4.1, 0, "Ground state", fontsize=12, va="center")
    ax.set_xlim(-1.3, 6.3)
    ax.set_ylim(-0.4, 3.6)
    ax.axis("off")


graph(f"{D}/q147.png", q147, size=(5.0, 2.8))
