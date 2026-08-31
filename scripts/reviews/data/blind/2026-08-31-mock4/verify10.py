"""Blind verification for qnum 47.

Q: Consider the proper subsets of {1,2,3,4}. How many of these proper
   subsets are superset of the set {3}?

Definitions used:
  - S is a PROPER SUBSET of U  <=>  S subset of U and S != U.
    (So the only subset of {1,2,3,4} excluded is {1,2,3,4} itself.
     The empty set IS a proper subset, but it cannot contain 3 anyway.)
  - S is a SUPERSET of {3}     <=>  {3} subset of S, i.e. 3 in S.
    (Ordinary "superset" allows equality, so S = {3} counts.)

Verified by exhaustive enumeration of all 2^4 = 16 subsets.
"""

from itertools import combinations

U = (1, 2, 3, 4)

all_subsets = []
for r in range(len(U) + 1):
    for c in combinations(U, r):
        all_subsets.append(frozenset(c))

assert len(all_subsets) == 16, len(all_subsets)

full = frozenset(U)
target = frozenset({3})

proper_subsets = [s for s in all_subsets if s != full]
supersets_of_target = [s for s in all_subsets if target <= s]
answer_sets = [s for s in proper_subsets if target <= s]


def show(s):
    return "{}" if not s else "{" + ",".join(str(x) for x in sorted(s)) + "}"


print("all subsets of U            :", len(all_subsets))
print("proper subsets of U         :", len(proper_subsets))
print("subsets containing 3        :", len(supersets_of_target))
print()
print("proper subsets that are supersets of {3}:")
for s in sorted(answer_sets, key=lambda x: (len(x), sorted(x))):
    print("   ", show(s))
print()
print("COUNT =", len(answer_sets))

# Cross-checks against closed forms.
# proper subsets containing 3 = (subsets containing 3) - (the full set)
assert len(supersets_of_target) == 2 ** 3 == 8
assert len(answer_sets) == 8 - 1 == 7
assert full in supersets_of_target and full not in answer_sets

# Alternative readings, to see which option letters they would produce.
proper_supersets = [s for s in proper_subsets if target < s]  # strict superset
print()
print("variant: PROPER superset of {3} (excludes {3} itself) =", len(proper_supersets))
strict_both = [s for s in all_subsets if target <= s]
print("variant: all supersets of {3}, incl. full set        =", len(strict_both))
print("variant: proper subsets of U, total                  =", len(proper_subsets))

# Option distinctness check: 5, 6, 7, 8 are four distinct integers.
options = {"A": 5, "B": 6, "C": 7, "D": 8}
assert len(set(options.values())) == 4, "duplicate option values"
print()
print("options distinct:", options)
match = [k for k, v in options.items() if v == len(answer_sets)]
print("matching option(s):", match)
