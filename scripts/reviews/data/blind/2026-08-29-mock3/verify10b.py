"""Q6 follow-up: is option D genuinely identical to option C, or a brute-force artefact?

Algebraic route (De Morgan):
  D = (A' u B') - (A' n B')
    = (A n B)'  -  (A u B)'          [De Morgan, both terms]
    = (A n B)' n (A u B)             [S - T = S n T']
    = (A u B) - (A n B)              = option C
So the two are the same set, not merely equal on the tested universe.

Below: exhaustive check on |X|=4 restricted to NON-degenerate pairs (all four
Boolean atoms non-empty), so the agreement cannot be blamed on empty corners.
"""
from itertools import combinations

X = set(range(4))
subsets = [set(s) for r in range(5) for s in combinations(sorted(X), r)]
comp = lambda S: X - S

nondeg = 0
mismatch_CD = []
for A in subsets:
    for B in subsets:
        atoms = [A & B, A - B, B - A, X - (A | B)]
        if any(len(a) == 0 for a in atoms):
            continue                     # skip degenerate configurations
        nondeg += 1
        C_lhs = (A & comp(B)) | (comp(A) & B)
        optC = (A | B) - (A & B)
        optD = (comp(A) | comp(B)) - (comp(A) & comp(B))
        if not (C_lhs == optC == optD):
            mismatch_CD.append((sorted(A), sorted(B), sorted(C_lhs), sorted(optC), sorted(optD)))

print("non-degenerate (A,B) pairs tested:", nondeg)
print("pairs where C_def, optC, optD are NOT all equal:", len(mismatch_CD), mismatch_CD[:3])

# a named worked instance
A, B = {1, 2}, {2, 3}
Xn = {1, 2, 3, 4}
cn = lambda S: Xn - S
print()
print("worked instance  X={1,2,3,4}, A={1,2}, B={2,3}")
print("  C  = (A n B') u (A' n B) =", sorted((A & cn(B)) | (cn(A) & B)))
print("  optA =", sorted((A | cn(B)) - (A & cn(B))))
print("  optB =", sorted((cn(A) | B) - (cn(A) & B)))
print("  optC =", sorted((A | B) - (A & B)))
print("  optD =", sorted((cn(A) | cn(B)) - (cn(A) & cn(B))))

# discriminating point: a set element in A n B (must be EXCLUDED by the answer)
print()
print("discriminating elements (element 2 is in A n B, so must NOT be in the answer;")
print(" element 4 is outside A u B, so must NOT be in the answer either):")
for e in sorted(Xn):
    print(f"  {e}: inC={e in ((A & cn(B)) | (cn(A) & B))}"
          f"  optA={e in ((A | cn(B)) - (A & cn(B)))}"
          f"  optB={e in ((cn(A) | B) - (cn(A) & B))}"
          f"  optC={e in ((A | B) - (A & B))}"
          f"  optD={e in ((cn(A) | cn(B)) - (cn(A) & cn(B)))}")
