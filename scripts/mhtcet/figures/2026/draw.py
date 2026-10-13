"""Redraw helpers for MHT-CET 2026 figures.

The 2026 source PDFs carry a third party's watermarked artwork, so no source figure
is ever uploaded: every figure is redrawn from its content by a tool built for the
kind of figure, never by hand.

  structures  RDKit, from a SMILES string (the molecule is then checkable, not just drawn)
  circuits    schemdraw
  graphs      matplotlib

Each shift has figures/2026/<shiftId>/figures.py calling these helpers; it writes
qNNN.png (stem figure) and qNNN-A.png .. qNNN-D.png (option figures) beside itself,
which is where build-pdf-shift.ts and attach-images.ts look. Run:

    python scripts/mhtcet/figures/2026/<shiftId>/figures.py
"""
import math
import os

from rdkit import Chem
from rdkit.Geometry import Point3D
from rdkit.Chem import AllChem, rdAbbreviations, rdDepictor
from rdkit.Chem.Draw import rdMolDraw2D

rdDepictor.SetPreferCoordGen(True)


# Substituents written as condensed labels, the way MHT-CET papers and the Balbharati
# books print them (a ring carrying "CHO", not a bond to an O). Each line is
# "label SMARTS east-facing west-facing": a group pointing left is written from the bond
# end (OHC, HOOC), or the bond would appear to join at O or H.
CONDENSED = rdAbbreviations.ParseAbbreviations(
    "\n".join(
        [
            "COOH *C(=O)[OH] COOH HOOC",
            "CHO *[CH]=O CHO OHC",
            "CN *C#N CN NC",
            "NO2 *[N+](=O)[O-] NO<sub>2</sub> O<sub>2</sub>N",
            "CH2OH *[CH2][OH] CH<sub>2</sub>OH HOH<sub>2</sub>C",
            "COCH3 *C(=O)[CH3] COCH<sub>3</sub> H<sub>3</sub>COC",
            "OCH3 *O[CH3] OCH<sub>3</sub> H<sub>3</sub>CO",
        ]
    )
)


def _point_up(mol, atom):
    """Rotate the 2D depiction so `atom` sits straight above the centroid (the printed
    papers draw a ring with its first substituent at the top)."""
    conf = mol.GetConformer()
    n = mol.GetNumAtoms()
    # Rotate about the centre of the ring the atom hangs off, so the ring stays an upright
    # hexagon; a chain molecule falls back to the centre of all atoms.
    rings = [r for r in mol.GetRingInfo().AtomRings() if any(nb.GetIdx() in r for nb in mol.GetAtomWithIdx(atom).GetNeighbors()) or atom in r]
    centre = rings[0] if rings else range(n)
    cx = sum(conf.GetAtomPosition(i).x for i in centre) / len(centre)
    cy = sum(conf.GetAtomPosition(i).y for i in centre) / len(centre)
    p = conf.GetAtomPosition(atom)
    angle = math.pi / 2 - math.atan2(p.y - cy, p.x - cx)
    c, s = math.cos(angle), math.sin(angle)
    for i in range(n):
        q = conf.GetAtomPosition(i)
        x, y = q.x - cx, q.y - cy
        conf.SetAtomPosition(i, Point3D(x * c - y * s, x * s + y * c, 0))


def molecule(smiles, out, size=(360, 300), up=None, condensed=True):
    """Draw one structure from SMILES in black and white: Kekulé rings, methyl written CH3,
    common groups as condensed labels (CONDENSED). `up` = index of the SMILES atom to put at
    the top. Fails on a SMILES RDKit cannot parse."""
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError(f"bad SMILES: {smiles}")
    Chem.Kekulize(mol, clearAromaticFlags=True)
    AllChem.Compute2DCoords(mol)
    if up is not None:
        _point_up(mol, up)
    if condensed:
        # condensing keeps the surviving atoms' coordinates, so orientation is set first
        mol = rdAbbreviations.CondenseMolAbbreviations(mol, CONDENSED, maxCoverage=0.6)
    d = rdMolDraw2D.MolDraw2DCairo(*size)
    o = d.drawOptions()
    o.useBWAtomPalette()
    o.explicitMethyl = True
    o.bondLineWidth = 2
    o.minFontSize = 22
    o.maxFontSize = 26
    o.padding = 0.12
    o.addStereoAnnotation = False
    rdMolDraw2D.PrepareAndDrawMolecule(d, mol, kekulize=False)
    d.FinishDrawing()
    _write(out, d.GetDrawingText())


def _mol_image(smiles, up=None, size=(300, 260)):
    """RDKit drawing of one molecule as a PIL image (same style as molecule())."""
    import io
    import tempfile

    from PIL import Image

    tmp = os.path.join(tempfile.gettempdir(), f"_mol_{abs(hash((smiles, up, size)))}.png")
    molecule(smiles, tmp, size=size, up=up)
    with open(tmp, "rb") as f:
        return Image.open(io.BytesIO(f.read())).convert("RGB")


def scheme(out, parts, height=2.6):
    """A reaction scheme in one row. `parts` is a list of:
      ("mol", smiles[, up])          a structure drawn by RDKit
      ("arrow", above, below)        a reaction arrow with mathtext reagents ('' for none)
      ("text", mathtext)             a label such as '[A]'
    """
    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    plt.rcParams.update({"mathtext.fontset": "dejavusans"})
    widths = []
    for p in parts:
        widths.append(2.6 if p[0] == "mol" else 2.2 if p[0] == "arrow" else 0.9)
    fig = plt.figure(figsize=(sum(widths), height))
    x = 0.0
    total = sum(widths)
    for p, w in zip(parts, widths):
        ax = fig.add_axes([x / total, 0, w / total, 1])
        ax.axis("off")
        if p[0] == "mol":
            ax.imshow(_mol_image(p[1], p[2] if len(p) > 2 else None))
        elif p[0] == "arrow":
            ax.set_xlim(0, 1)
            ax.set_ylim(0, 1)
            ax.annotate("", xy=(0.95, 0.5), xytext=(0.05, 0.5), arrowprops=dict(arrowstyle="-|>", color="black", lw=1.6, mutation_scale=18))
            if p[1]:
                ax.text(0.5, 0.58, p[1], ha="center", va="bottom", fontsize=14)
            if p[2]:
                ax.text(0.5, 0.42, p[2], ha="center", va="top", fontsize=14)
        else:
            ax.set_xlim(0, 1)
            ax.set_ylim(0, 1)
            ax.text(0.5, 0.5, p[1], ha="center", va="center", fontsize=17)
        x += w
    os.makedirs(os.path.dirname(out), exist_ok=True)
    fig.savefig(out, dpi=150, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def circuit(out, build, fontsize=15):
    """Draw a circuit with schemdraw. `build(d, elm)` adds the elements to drawing `d`
    (`elm` is schemdraw.elements). Labels use matplotlib mathtext: '$C_2 = 2C$'."""
    import schemdraw
    import schemdraw.elements as elm

    schemdraw.use("matplotlib")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with schemdraw.Drawing(show=False) as d:
        d.config(fontsize=fontsize, lw=1.6, color="black", bgcolor="white", margin=0.3)
        build(d, elm)
        d.save(out, dpi=170)


def graph(out, build, size=(5.2, 3.6)):
    """Draw a graph with matplotlib. `build(ax, np)` draws on the axes; mathtext labels."""
    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import numpy as np

    plt.rcParams.update({"font.size": 12, "mathtext.fontset": "dejavusans"})
    os.makedirs(os.path.dirname(out), exist_ok=True)
    fig, ax = plt.subplots(figsize=size)
    build(ax, np)
    fig.savefig(out, dpi=170, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def axes_through_origin(ax):
    """Textbook axes: spines through the origin, no box, arrow-free plain lines."""
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_position("zero")
    ax.spines["bottom"].set_position("zero")


def _write(out, data):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "wb") as f:
        f.write(data)


def here(file):
    """The figures.py directory, where its PNGs belong."""
    return os.path.dirname(os.path.abspath(file))
