"""Verify hand-authored NCERT Std XII top-level section titles against the PDFs.

The automated passes cannot recover these: the Std XII books set headings with a
layered drop-shadow (each phrase painted 2-4 times), NCERT numbers its exercise
questions with the same N.M scheme, and headings wrap mid-word. Every automated
attempt produced either exercise text or one-word fragments.

So the titles below are hand-authored — and this script exists so that none of
them is TAKEN ON TRUST. For each, it searches the chapter PDF for the title with
whitespace and hyphenation relaxed. FOUND means those words really are printed in
that chapter; MISSING means do not use it.

Usage:  python scripts/syllabus/verify_toplevel_xii.py
"""
import os
import re

import fitz

ROOT = "C:/Vilas/LWS_Pune/NDA_Subjects_Content/Subjects/NCERT/Books/12th/Chemistry"

TITLES = {
    1: [
        (1, "Types of Solutions"),
        (2, "Expressing Concentration of Solutions"),
        (3, "Solubility"),
        (4, "Vapour Pressure of Liquid Solutions"),
        (5, "Ideal and Non-ideal Solutions"),
        (6, "Colligative Properties and Determination of Molar Mass"),
        (7, "Abnormal Molar Masses"),
    ],
    2: [
        (1, "Electrochemical Cells"),
        (2, "Galvanic Cells"),
        (3, "Nernst Equation"),
        (4, "Conductance of Electrolytic Solutions"),
        (5, "Electrolytic Cells and Electrolysis"),
        (6, "Batteries"),
        (7, "Fuel Cells"),
        (8, "Corrosion"),
    ],
    3: [
        (1, "Rate of a Chemical Reaction"),
        (2, "Factors Influencing Rate of a Reaction"),
        (3, "Integrated Rate Equations"),
        (4, "Pseudo First Order Reaction"),
        (5, "Temperature Dependence of the Rate of a Reaction"),
        (6, "Collision Theory of Chemical Reactions"),
    ],
    4: [
        (1, "Position in the Periodic Table"),
        (2, "Electronic Configurations of the d-Block Elements"),
        (3, "General Properties of the Transition Elements"),
        (4, "Some Important Compounds of Transition Elements"),
        (5, "The Lanthanoids"),
        (6, "The Actinoids"),
        (7, "Some Applications of d- and f-Block Elements"),
    ],
    5: [
        (1, "Werner's Theory of Coordination Compounds"),
        (2, "Definitions of Some Important Terms Pertaining to Coordination Compounds"),
        (3, "Nomenclature of Coordination Compounds"),
        (4, "Isomerism in Coordination Compounds"),
        (5, "Bonding in Coordination Compounds"),
        (6, "Bonding in Metal Carbonyls"),
        (7, "Importance and Applications of Coordination Compounds"),
    ],
    6: [
        (1, "Classification"),
        (2, "Nomenclature"),
        (3, "Nature of C-X Bond"),
        (4, "Methods of Preparation of Haloalkanes"),
        (5, "Preparation of Haloarenes"),
        (6, "Physical Properties"),
        (7, "Chemical Reactions"),
        (8, "Polyhalogen Compounds"),
    ],
    7: [
        (1, "Classification"),
        (2, "Nomenclature"),
        (3, "Structures of Functional Groups"),
        (4, "Alcohols and Phenols"),
        (5, "Some Commercially Important Alcohols"),
        (6, "Ethers"),
    ],
    8: [
        (1, "Nomenclature and Structure of Carbonyl Group"),
        (2, "Preparation of Aldehydes and Ketones"),
        (3, "Physical Properties"),
        (4, "Chemical Reactions"),
        (5, "Uses of Aldehydes and Ketones"),
        (6, "Nomenclature and Structure of Carboxyl Group"),
        (7, "Methods of Preparation of Carboxylic Acids"),
        (8, "Physical Properties"),
        (9, "Chemical Reactions"),
        (10, "Uses of Carboxylic Acids"),
    ],
    9: [
        (1, "Structure of Amines"),
        (2, "Classification"),
        (3, "Nomenclature"),
        (4, "Preparation of Amines"),
        (5, "Physical Properties"),
        (6, "Chemical Reactions"),
        (7, "Method of Preparation of Diazonium Salts"),
        (8, "Physical Properties"),
        (9, "Chemical Reactions"),
        (10, "Importance of Diazonium Salts in Synthesis of Aromatic Compounds"),
    ],
    10: [
        (1, "Carbohydrates"),
        (2, "Proteins"),
        (3, "Enzymes"),
        (4, "Vitamins"),
        (5, "Nucleic Acids"),
        (6, "Hormones"),
    ],
}


def chapter_text():
    out = {}
    for part in sorted(os.listdir(ROOT)):
        pdir = os.path.join(ROOT, part)
        if not os.path.isdir(pdir):
            continue
        for f in sorted(os.listdir(pdir)):
            m = re.match(r"(\d+)\. (.+)\.pdf$", f)
            if not m:
                continue
            doc = fitz.open(os.path.join(pdir, f))
            out[int(m.group(1))] = (
                m.group(2),
                " ".join(doc[i].get_text() for i in range(doc.page_count)),
            )
            doc.close()
    return out


def found(title, text):
    """Whitespace- and hyphen-insensitive, case-insensitive search."""
    pat = r"\s*".join(re.escape(w) for w in re.split(r"[\s-]+", title) if w)
    return re.search(pat.replace(r"\'", "['\u2019]"), text, re.I) is not None


def main():
    texts = chapter_text()
    miss = 0
    for chap in sorted(TITLES):
        name, text = texts[chap]
        print(f"\n=== Ch{chap} {name} ===")
        for n, title in TITLES[chap]:
            ok = found(title, text)
            miss += 0 if ok else 1
            print(f"  {'OK  ' if ok else 'MISS'} {chap}.{n:<3} {title}")
    print(f"\n{miss} title(s) NOT found in their chapter — do not use those.")


if __name__ == "__main__":
    main()
