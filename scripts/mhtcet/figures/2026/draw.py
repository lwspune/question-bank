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


def _write(out, data):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "wb") as f:
        f.write(data)


def here(file):
    """The figures.py directory, where its PNGs belong."""
    return os.path.dirname(os.path.abspath(file))
