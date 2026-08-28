"""geo-trigonometry-10 — numeric verification of EVERY printed identity.

An identity chapter's core risk is that a corrupted identity still READS like an
identity. So every "prove that" item printed in Practice set 6.1 Q6 and Problem
set 6 Q5 is evaluated at several deliberately awkward angles (never 0, 30, 45,
60, 90 -- where a wrong and a right form routinely agree by coincidence).

PASS  = |LHS - RHS| < 1e-9 at EVERY sample point.
FAIL  = disagreement at some sample -> the printed form is not an identity, and
        the near-variant that DOES pass everywhere is the evidence for the fix.
"""
from mpmath import mp, mpf, sin, cos, tan, sqrt

mp.dps = 40

# Awkward angles in radians. 0.31, 0.73, 1.19 as instructed, plus more, all
# strictly inside (0, pi/2) so every ratio is defined and positive.
ANGLES = [mpf("0.31"), mpf("0.73"), mpf("1.19"), mpf("0.17"), mpf("0.95"),
          mpf("1.41"), mpf("0.5"), mpf("1.05")]


def ratios(t):
    s, c = sin(t), cos(t)
    return dict(s=s, c=c, t=s / c, cot=c / s, sec=1 / c, csc=1 / s)


IDENTITIES = [
    # --- Practice set 6.1 Q.6 ---
    ("Ex 6.1 Q.6 (1)", "sin^2/cos + cos = sec",
     lambda r: r['s'] ** 2 / r['c'] + r['c'], lambda r: r['sec']),
    ("Ex 6.1 Q.6 (2)", "cos^2(1+tan^2) = 1",
     lambda r: r['c'] ** 2 * (1 + r['t'] ** 2), lambda r: mpf(1)),
    ("Ex 6.1 Q.6 (3)", "sqrt((1-sin)/(1+sin)) = sec - tan",
     lambda r: sqrt((1 - r['s']) / (1 + r['s'])), lambda r: r['sec'] - r['t']),
    ("Ex 6.1 Q.6 (4)", "(sec-cos)(cot+tan) = tan sec",
     lambda r: (r['sec'] - r['c']) * (r['cot'] + r['t']), lambda r: r['t'] * r['sec']),
    ("Ex 6.1 Q.6 (5)", "cot + tan = cosec sec",
     lambda r: r['cot'] + r['t'], lambda r: r['csc'] * r['sec']),
    ("Ex 6.1 Q.6 (6)", "1/(sec-tan) = sec + tan",
     lambda r: 1 / (r['sec'] - r['t']), lambda r: r['sec'] + r['t']),
    ("Ex 6.1 Q.6 (7)", "sin^4 - cos^4 = 1 - 2cos^2",
     lambda r: r['s'] ** 4 - r['c'] ** 4, lambda r: 1 - 2 * r['c'] ** 2),
    ("Ex 6.1 Q.6 (8)", "sec + tan = cos/(1-sin)",
     lambda r: r['sec'] + r['t'], lambda r: r['c'] / (1 - r['s'])),
    # (9) is conditional (tan + 1/tan = 2) -- handled separately below.
    ("Ex 6.1 Q.6 (10)", "tanA/(1+tan^2A)^2 + cotA/(1+cot^2A)^2 = sinA cosA",
     lambda r: r['t'] / (1 + r['t'] ** 2) ** 2 + r['cot'] / (1 + r['cot'] ** 2) ** 2,
     lambda r: r['s'] * r['c']),
    ("Ex 6.1 Q.6 (11)", "sec^4A(1 - sin^4A) - 2tan^2A = 1",
     lambda r: r['sec'] ** 4 * (1 - r['s'] ** 4) - 2 * r['t'] ** 2, lambda r: mpf(1)),
    ("Ex 6.1 Q.6 (12)", "tan/(sec-1) = (tan+sec+1)/(tan+sec-1)",
     lambda r: r['t'] / (r['sec'] - 1),
     lambda r: (r['t'] + r['sec'] + 1) / (r['t'] + r['sec'] - 1)),

    # --- Problem set 6 Q.5 ---
    ("PS6 Q.5 (1)", "sec(1-sin)(sec+tan) = 1",
     lambda r: r['sec'] * (1 - r['s']) * (r['sec'] + r['t']), lambda r: mpf(1)),
    ("PS6 Q.5 (2)", "(sec+tan)(1-sin) = cos",
     lambda r: (r['sec'] + r['t']) * (1 - r['s']), lambda r: r['c']),
    ("PS6 Q.5 (3)", "sec^2 + cosec^2 = sec^2 x cosec^2",
     lambda r: r['sec'] ** 2 + r['csc'] ** 2, lambda r: r['sec'] ** 2 * r['csc'] ** 2),
    ("PS6 Q.5 (4)", "cot^2 - tan^2 = cosec^2 - sec^2",
     lambda r: r['cot'] ** 2 - r['t'] ** 2, lambda r: r['csc'] ** 2 - r['sec'] ** 2),
    ("PS6 Q.5 (5)", "tan^4 + tan^2 = sec^4 - sec^2",
     lambda r: r['t'] ** 4 + r['t'] ** 2, lambda r: r['sec'] ** 4 - r['sec'] ** 2),
    ("PS6 Q.5 (6)", "1/(1-sin) + 1/(1+sin) = 2 sec^2",
     lambda r: 1 / (1 - r['s']) + 1 / (1 + r['s']), lambda r: 2 * r['sec'] ** 2),
    ("PS6 Q.5 (7)", "sec^6 - tan^6 = 1 + 3 sec^2 tan^2",
     lambda r: r['sec'] ** 6 - r['t'] ** 6, lambda r: 1 + 3 * r['sec'] ** 2 * r['t'] ** 2),
    ("PS6 Q.5 (8)", "tan/(sec+1) = (sec-1)/tan",
     lambda r: r['t'] / (r['sec'] + 1), lambda r: (r['sec'] - 1) / r['t']),
    ("PS6 Q.5 (9)", "(tan^3 - 1)/(tan - 1) = sec^2 + tan",
     lambda r: (r['t'] ** 3 - 1) / (r['t'] - 1), lambda r: r['sec'] ** 2 + r['t']),
    ("PS6 Q.5 (10)", "(sin-cos+1)/(sin+cos-1) = 1/(sec-tan)",
     lambda r: (r['s'] - r['c'] + 1) / (r['s'] + r['c'] - 1),
     lambda r: 1 / (r['sec'] - r['t'])),
]

TOL = mpf("1e-30")
failures = []
for ref, desc, lhs, rhs in IDENTITIES:
    worst = mpf(0)
    bad = []
    for a in ANGLES:
        r = ratios(a)
        try:
            d = abs(lhs(r) - rhs(r))
        except ZeroDivisionError:
            bad.append((a, "div0"))
            continue
        worst = max(worst, d)
        if d > TOL:
            bad.append((a, d))
    status = "PASS" if not bad else "FAIL"
    if bad:
        failures.append(ref)
    print(f"{status}  {ref:<18} {desc:<50} max|LHS-RHS| = {mp.nstr(worst, 5)}")
    for a, d in bad:
        print(f"        theta={a}  diff={d}")

# --- Ex 6.1 Q.6 (9): conditional, not an identity -------------------------
# tan + 1/tan = 2  =>  tan = 1 (theta = 45 deg) is the ONLY real solution.
# Then tan^2 + 1/tan^2 = 1 + 1 = 2.  Verify by squaring, and also directly.
t = mpf(1)
lhs9 = t ** 2 + 1 / t ** 2
print(f"\nEx 6.1 Q.6 (9)  conditional: tan+1/tan=2 forces tan=1; "
      f"tan^2+1/tan^2 = {mp.nstr(lhs9, 10)}  -> {'PASS' if abs(lhs9 - 2) < TOL else 'FAIL'}")
# and the algebraic route, which does not need tan=1:
for k in [mpf("0.4"), mpf("2.5"), mpf("7")]:
    # (t + 1/t)^2 = t^2 + 1/t^2 + 2, so if t+1/t = u then t^2+1/t^2 = u^2-2.
    u = k + 1 / k
    print(f"   check (t+1/t)^2 - 2 == t^2+1/t^2 at t={k}: "
          f"{mp.nstr(u**2 - 2 - (k**2 + 1/k**2), 5)}")

print(f"\n{len(IDENTITIES)} unconditional identities checked at {len(ANGLES)} angles each; "
      f"{len(failures)} FAILED: {failures or 'none'}")
