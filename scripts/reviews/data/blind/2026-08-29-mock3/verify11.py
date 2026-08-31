"""Blind verification for batch11 (NDA Maths mock 3).

Exact arithmetic only: itertools/frozenset for sets, sympy for matrices,
Fraction for the sphere/plane geometry.
"""

from fractions import Fraction
from itertools import chain, combinations

import sympy as sp


def powerset(universe):
    s = list(universe)
    return [frozenset(c) for r in range(len(s) + 1) for c in combinations(s, r)]


# ---------------------------------------------------------------- Q3
print("=" * 60)
print("Q3  which relation is NOT correct")
print("=" * 60)

U = {1, 2, 3, 4}  # 4 elements -> every Boolean atom of A,B,C is realisable
subsets = powerset(U)

relations = {
    "A": lambda A, B, C: (A | (A & B)) == (A | B),
    "B": lambda A, B, C: (A & (A | B)) == A,
    "C": lambda A, B, C: ((A & B) | C) == ((A | C) & (B | C)),
    "D": lambda A, B, C: ((A | B) & C) == ((A & C) | (B & C)),
}

# truth-vector of each relation over every (A,B,C) triple
triples = [(A, B, C) for A in subsets for B in subsets for C in subsets]
print(f"triples tested: {len(triples)}")

vectors = {}
for label, rel in relations.items():
    vec = tuple(rel(A, B, C) for A, B, C in triples)
    vectors[label] = vec
    always = all(vec)
    n_fail = sum(1 for v in vec if not v)
    print(f"  option {label}: identity holds always = {always}   counterexamples = {n_fail}")

# discriminating counterexample for whichever fails
for label, rel in relations.items():
    for A, B, C in triples:
        if not rel(A, B, C):
            print(f"  -> {label} FAILS at A={set(A)} B={set(B)} C={set(C)}")
            if label == "A":
                print(f"     A u (A n B) = {set(A | (A & B))}   vs   A u B = {set(A | B)}")
            break

# pairwise equivalence of the four STATEMENTS (guard against two options
# denoting the same claim, the De Morgan trap)
print("  pairwise statement equivalence:")
labels = list(relations)
for i in range(len(labels)):
    for j in range(i + 1, len(labels)):
        li, lj = labels[i], labels[j]
        print(f"    {li} == {lj} ? {vectors[li] == vectors[lj]}")

# also: are C and D the same *set expression* pair? test the two sides separately
print("  sanity: distributive laws are genuine identities (both directions):")
print("   ", all(((A & B) | C) == ((A | C) & (B | C)) for A, B, C in triples))
print("   ", all(((A | B) & C) == ((A & C) | (B & C)) for A, B, C in triples))


# ---------------------------------------------------------------- Q5
print()
print("=" * 60)
print("Q5  non-empty proper subsets of {1,2,3}")
print("=" * 60)
S = frozenset({1, 2, 3})
allsub = powerset(S)
proper_nonempty = [x for x in allsub if x and x != S]
print(f"  total subsets        = {len(allsub)}")
print(f"  non-empty proper     = {len(proper_nonempty)}")
print(f"  they are: {[sorted(x) for x in sorted(proper_nonempty, key=lambda z: (len(z), sorted(z)))]}")
print("  option values: A=8 B=7 C=6 D=5")


# ---------------------------------------------------------------- Q27
print()
print("=" * 60)
print("Q27  A^2 = A, B = I - A, evaluate AB + BA + I - (I-A)^2")
print("=" * 60)

# symbolic proof with a non-commutative symbol obeying A^2 = A
n = 3
I = sp.eye(n)

# several idempotent matrices, including non-symmetric and non-diagonal ones
candidates = [
    sp.eye(n),
    sp.zeros(n, n),
    sp.diag(1, 0, 1),
    sp.Matrix([[1, 1, 0], [0, 0, 0], [0, 0, 1]]),   # idempotent, non-symmetric
    sp.Matrix([[2, -1, 0], [2, -1, 0], [0, 0, 1]]),  # idempotent, non-diagonal
    sp.Matrix([[0, 0, 0], [1, 1, 3], [0, 0, 0]]),    # idempotent
]

opt = {"A": lambda A: A, "B": lambda A: 2 * A, "C": lambda A: -A, "D": lambda A: I - A}
matches = {k: True for k in opt}

for A in candidates:
    assert sp.simplify(A * A - A) == sp.zeros(n, n), f"not idempotent: {A}"
    B = I - A
    expr = sp.simplify(A * B + B * A + I - (I - A) ** 2)
    print(f"  A =\n{A}\n  expr =\n{expr}\n")
    for k, f in opt.items():
        if sp.simplify(expr - f(A)) != sp.zeros(n, n):
            matches[k] = False

print(f"  options matching for EVERY idempotent A tested: {[k for k, v in matches.items() if v]}")

# symbolic (basis-free) expansion
Asym = sp.Symbol("A", commutative=False)
Isym = sp.Symbol("I", commutative=False)
raw = sp.expand(Asym * (Isym - Asym) + (Isym - Asym) * Asym + Isym - (Isym - Asym) * (Isym - Asym))
print(f"  raw non-commutative expansion (before A^2->A, I*X->X): {raw}")
print("  by hand: AB = A - A^2 = 0 ; BA = A - A^2 = 0 ; (I-A)^2 = I - 2A + A^2 = I - A")
print("           => 0 + 0 + I - (I - A) = A")


# ---------------------------------------------------------------- Q111
print()
print("=" * 60)
print("Q111  plane 2x-2y+z+12=0 touching sphere x^2+y^2+z^2-2x-4y+2z-3=0")
print("=" * 60)

# sphere: centre (1,2,-1), r^2 = 1+4+1+3
cx, cy, cz = Fraction(1), Fraction(2), Fraction(-1)
r2 = Fraction(1 + 4 + 1 + 3)
print(f"  centre = ({cx}, {cy}, {cz})   r^2 = {r2}   r = {sp.sqrt(r2)}")

nvec = (Fraction(2), Fraction(-2), Fraction(1))
d = Fraction(12)
val_at_centre = nvec[0] * cx + nvec[1] * cy + nvec[2] * cz + d
nnorm2 = sum(c * c for c in nvec)
print(f"  plane value at centre = {val_at_centre};  |n|^2 = {nnorm2}, |n| = {sp.sqrt(nnorm2)}")
dist2 = val_at_centre**2 / nnorm2
print(f"  distance^2 from centre to plane = {dist2}  (equals r^2? {dist2 == r2})  -> tangency")

# foot of perpendicular = centre - (value/|n|^2) * n
t = val_at_centre / nnorm2
foot = (cx - t * nvec[0], cy - t * nvec[1], cz - t * nvec[2])
print(f"  point of contact (foot of perpendicular) = {foot}")


def on_plane(p):
    return nvec[0] * p[0] + nvec[1] * p[1] + nvec[2] * p[2] + d


def on_sphere(p):
    x, y, z = p
    return x * x + y * y + z * z - 2 * x - 4 * y + 2 * z - 3


opts111 = {
    "A": (Fraction(1), Fraction(-4), Fraction(-2)),
    "B": (Fraction(-1), Fraction(4), Fraction(-2)),
    "C": (Fraction(-1), Fraction(-4), Fraction(2)),
    "D": (Fraction(1), Fraction(4), Fraction(-2)),
}
for k, p in opts111.items():
    print(
        f"  option {k} {tuple(int(v) for v in p)}: plane residual = {on_plane(p)}, "
        f"sphere residual = {on_sphere(p)}, both zero = {on_plane(p) == 0 and on_sphere(p) == 0}"
    )
print(f"  foot matches option: {[k for k, p in opts111.items() if p == foot]}")
