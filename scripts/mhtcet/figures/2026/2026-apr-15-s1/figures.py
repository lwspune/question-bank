"""Redrawn figures for MHT-CET 2026, 15 April Shift I. See ../draw.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from draw import circuit, here, molecule  # noqa: E402

D = here(__file__)

# Q39: the final product C of phenol -> (CCl4, aq NaOH) -> A -> NaOH -> B -> H3O+ -> C.
# (A) salicylaldehyde  (B) salicylic acid  (C) catechol  (D) o-cresol
molecule("Oc1ccccc1C=O", f"{D}/q039-A.png", up=0)
molecule("OC(=O)c1ccccc1O", f"{D}/q039-B.png", up=1)
molecule("Oc1ccccc1O", f"{D}/q039-C.png", up=0)
molecule("Oc1ccccc1C", f"{D}/q039-D.png", up=0)


# Q128: C2 = 2C on the top edge, C3 = 3C down the left side and C1 = 1C down the right side
# (so C3, C2, C1 are in series between the two middle nodes), C4 = 4C directly across those
# nodes, and the battery V on the bottom edge across the same two nodes.
def q128(d, elm):
    d += elm.Capacitor().at((0, 4)).to((5, 4)).label("$C_2 = 2C$", loc="bottom")
    d += elm.Capacitor().at((0, 4)).to((0, 2)).label("$C_3 = 3C$", loc="top")
    d += elm.Capacitor().at((5, 4)).to((5, 2)).label("$C_1 = 1C$", loc="bottom")
    d += elm.Capacitor().at((0, 2)).to((5, 2)).label("$C_4 = 4C$", loc="top")
    d += elm.Line().at((0, 2)).to((0, 0))
    d += elm.Line().at((5, 2)).to((5, 0))
    d += elm.Battery().at((0, 0)).to((5, 0)).label("$V$", loc="bottom")
    d += elm.Dot().at((0, 2))
    d += elm.Dot().at((5, 2))


circuit(f"{D}/q128.png", q128)
