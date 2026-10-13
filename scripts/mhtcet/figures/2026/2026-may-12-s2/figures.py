"""Redrawn figures for MHT-CET 2026, 12 May Shift II. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, here  # noqa: E402

D = here(__file__)


# Q127: triangle network. Left side: bottom-left corner up to the apex through a 4 uF capacitor;
# right side: apex down to bottom-right through a 4 uF capacitor. A 2 uF capacitor joins the
# two sides just below their capacitors, and the 2 V cell runs along the base.
def q127(d, elm):
    BL, BR, AP = (0, 0), (6, 0), (3, 5.2)
    L1, R1 = (1.2, 2.08), (4.8, 2.08)
    d += elm.Line().at(BL).to(L1)
    d += elm.Capacitor().at(L1).to(AP).label(r"$4\,\mu F$", loc="top")
    d += elm.Capacitor().at(AP).to(R1).label(r"$4\,\mu F$", loc="top")
    d += elm.Line().at(R1).to(BR)
    d += elm.Line().at(L1).to((2.1, 2.08))
    d += elm.Capacitor().at((2.1, 2.08)).to((3.9, 2.08)).label(r"$2\,\mu F$", loc="bottom")
    d += elm.Line().at((3.9, 2.08)).to(R1)
    d += elm.Line().at(BL).to((2.3, 0))
    d += elm.BatteryCell().at((2.3, 0)).to((3.7, 0)).label("2 V", loc="bottom")
    d += elm.Line().at((3.7, 0)).to(BR)


circuit(f"{D}/q127.png", q127)


# Q138: series loop: inductor, capacitor and resistor along the top; a.c. source along the bottom.
def q138(d, elm):
    d += elm.Inductor2(loops=4).at((0, 3)).to((2.8, 3))
    d += elm.Capacitor().at((2.8, 3)).to((4.6, 3))
    d += elm.Resistor().at((4.6, 3)).to((7.4, 3))
    d += elm.Line().at((7.4, 3)).to((7.4, 0))
    d += elm.Line().at((7.4, 0)).to((4.3, 0))
    s = d.add(elm.SourceSin().at((4.3, 0)).left(1.2))
    d += elm.Line().at(s.end).to((0, 0))
    d += elm.Line().at((0, 0)).to((0, 3))
    d += elm.Label().at((3.7, 1.9)).label(r"$X_L = 200\,\Omega,\ X_C = 100\,\Omega,\ R = 100\,\Omega$", loc="center", ofst=0)
    d += elm.Label().at((3.7, -1.0)).label(r"$V_{rms} = 200\sqrt{2}\ V$", loc="center", ofst=0)


circuit(f"{D}/q138.png", q138)


# Q149: three parallel branches between two vertical wires: D1 (pointing left) + 30 ohm;
# D2 (pointing right) + 30 ohm; 3 V cell + 70 ohm along the bottom.
def q149(d, elm):
    d += elm.Diode().at((2.2, 4.0)).to((0, 4.0)).label("$D_1$", loc="top")
    d += elm.Resistor().at((2.2, 4.0)).to((5, 4.0)).label(r"$30\,\Omega$", loc="top")
    d += elm.Diode().at((0, 2.0)).to((2.2, 2.0)).label("$D_2$", loc="top")
    d += elm.Resistor().at((2.2, 2.0)).to((5, 2.0)).label(r"$30\,\Omega$", loc="top")
    d += elm.BatteryCell().at((0, 0)).to((2.2, 0)).label("3 V", loc="bottom")
    d += elm.Resistor().at((2.2, 0)).to((5, 0)).label(r"$70\,\Omega$", loc="top")
    d += elm.Line().at((0, 4.0)).to((0, 0))
    d += elm.Line().at((5, 4.0)).to((5, 0))


circuit(f"{D}/q149.png", q149)


# Q150: A and B into a NOR gate; B and A into a NAND gate; both outputs into an AND gate -> Y.
def q150(d, elm):
    from schemdraw import logic

    nor = d.add(logic.Nor().at((2.0, 3.0)).anchor("in1").right())
    nand = d.add(logic.Nand().at((2.0, 0.0)).anchor("in1").right())
    d.add(elm.Dot(open=True).at((0, nor.in1.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, nor.in1.y)).to(nor.in1))
    d.add(elm.Dot(open=True).at((0, 1.6)).label("$B$", loc="left"))
    d.add(elm.Line().at((0, 1.6)).to((1.0, 1.6)))
    d.add(elm.Dot().at((1.0, 1.6)))
    d.add(elm.Wire("|-").at((1.0, 1.6)).to(nor.in2))
    d.add(elm.Wire("|-").at((1.0, 1.6)).to(nand.in1))
    d.add(elm.Dot(open=True).at((0, nand.in2.y)).label("$A$", loc="left"))
    d.add(elm.Line().at((0, nand.in2.y)).to(nand.in2))
    andg = d.add(logic.And().at((6.0, 2.0)).anchor("in1").right())
    d.add(elm.Wire("-|").at(nor.out).to(andg.in1))
    d.add(elm.Wire("-|").at(nand.out).to(andg.in2))
    out = d.add(elm.Line().at(andg.out).right(0.8))
    d.add(elm.Dot(open=True).at(out.end).label("$Y$", loc="right"))


circuit(f"{D}/q150.png", q150)
