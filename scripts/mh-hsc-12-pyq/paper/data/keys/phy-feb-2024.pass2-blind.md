# phy-feb-2024 — pass 2 (BLIND)
Derived from stem + options only. No sight of pass 1, the transcription, or the PDF.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | B | high | Disc about its central (symmetry) axis: I = MR^2/2. |
| Q. 1(ii) | D | high | Surface tension = force/length = N/m = kg s^-2, so [L^0 M^1 T^-2]. |
| Q. 1(iii) | B | high | Node to adjacent antinode is a quarter wavelength, so the conventional phase difference is 2*pi/lambda * lambda/4 = pi/2 rad (see flag on the strict standing-wave reading). |
| Q. 1(iv) | C | high | Work per unit positive charge carried from infinity to a point IS the definition of electric potential. |
| Q. 1(v) | A | high | An ammeter needs a low-resistance shunt in parallel with the galvanometer coil. |
| Q. 1(vi) | C | high | KE' = 2h*nu - phi = 2(h*nu - phi) + phi = 2*KE + phi, which exceeds twice the initial KE. |
| Q. 1(vii) | D | high | A cyclic process returns to the same state, so delta-U = 0 and the first law gives Q = W. |
| Q. 1(viii) | D | high | e = L*|dI/dt| = 20 * (40/0.1) = 20 * 400 = 8000 V. |
| Q. 1(ix) | A | high | Second's pendulum T = 2 s so omega = pi rad/s; v = omega*sqrt(A^2 - x^2) = pi*sqrt(100 - 36) = 8*pi cm/s. |
| Q. 1(x) | D | high | Band distance is proportional to order: x30 = 1.2 * (30/20) = 1.8 cm. |

## Working

### Q. 1(i) — MI of a disc
Uniform disc, mass M, radius R, axis through the centre and perpendicular to the plane
(the "central axis" of a disc in the Std-XII table).
Surface density sigma = M/(pi R^2). Take a ring of radius r, thickness dr:
dm = sigma * 2*pi*r*dr, dI = r^2 dm.
I = integral from 0 to R of sigma * 2*pi*r^3 dr = sigma * 2*pi * R^4/4 = (M/(pi R^2)) * pi R^4 / 2 = M R^2 / 2.
Checks against the option set: MR^2/4 is a diameter axis, MR^2 is a ring/hoop, 3MR^2/2 is a
ring about a tangent in its plane. **Answer B.**

### Q. 1(ii) — Dimensions of surface tension
T = force / length = [M L T^-2] / [L] = [M T^-2], i.e. [L^0 M^1 T^-2].
Cross-check by the energy route: T = surface energy / area = [M L^2 T^-2]/[L^2] = [M T^-2]. Same.
Only (D) has L^0. **Answer D.**

### Q. 1(iii) — Node to adjacent antinode
Spatial separation of a node and the neighbouring antinode is lambda/4.
Phase difference for that path difference = (2*pi/lambda) * (lambda/4) = pi/2 rad.
**Answer B.** (Strict standing-wave caveat recorded in Flags; no other option is defensible
under any reading, since the standing-wave answer would be 0, which is not offered.)

### Q. 1(iv) — Definition question
Electric potential at a point V = W/q0, the external work done in bringing a unit positive
test charge from infinity to that point against the field, quasi-statically.
Electric flux has units V*m; magnetic potential is not the quantity described; gravitational
potential is the mass analogue, not the charge one. **Answer C.**

### Q. 1(v) — Galvanometer to ammeter
An ammeter must (a) carry a large current and (b) have near-zero resistance so it does not
disturb the circuit. A shunt S in parallel with the galvanometer of resistance G diverts
most of the current: S = I_g G / (I - I_g), which is small. Series + large resistance is the
voltmeter conversion. **Answer A.**

### Q. 1(vi) — Photoelectric effect, frequency doubled
Einstein: KE_max = h*nu - phi, with phi > 0 the work function.
Initial: K1 = h*nu - phi.
Doubled frequency: K2 = h*(2*nu) - phi = 2*h*nu - 2*phi + phi = 2*K1 + phi.
Since phi > 0, K2 > 2*K1 strictly. (The question presupposes emission already occurs at nu,
so h*nu > phi and K1 > 0; doubling then certainly keeps emission going.)
Not equal, not exactly double, and not less than double. **Answer C.**

### Q. 1(vii) — Cyclic process
Internal energy is a state function; a cyclic process returns the system to its initial
state, so delta-U = 0 over the cycle.
First law: Q = delta-U + W = 0 + W, hence W = Q.
Option (A) delta-U = Q would force W = 0, false in general. (B) Q = 0 is adiabatic-cycle
special-casing, false in general (a heat engine cycle has Q_net = W_net /= 0). (C) W = 0 is
false for the same reason. **Answer D.**
Note: (A) is also *true in the degenerate case* only when both sides are zero; the general
statement asked for is (D).

### Q. 1(viii) — Self-induced e.m.f.
|dI| = 50 - 10 = 40 A, dt = 0.1 s, so |dI/dt| = 400 A/s.
|e| = L |dI/dt| = 20 H * 400 A/s = 8000 V.
(Signed value -8000 V; magnitude is what the options carry.)
Distractor check: 800 V would be L*dI/dt with dt = 1 s; 6000 V and 7000 V match nothing.
**Answer D.**

### Q. 1(ix) — Velocity of a second's pendulum bob
A second's pendulum has a period T = 2 s (one second per half-swing).
omega = 2*pi/T = pi rad/s.
SHM speed at displacement x: v = omega * sqrt(A^2 - x^2), with A = 10 cm, x = 6 cm.
sqrt(100 - 36) = sqrt(64) = 8 cm.
v = pi * 8 = 8*pi cm/s (about 25.1 cm/s).
Units are consistent because A and x are both in cm; no cm-to-m conversion is needed.
**Answer A.**

### Q. 1(x) — Biprism band position
In a biprism experiment the fringe width W = lambda*D/d_eff is fixed once the set-up is
fixed, and the distance of the n-th bright band from the central band is x_n = n*W.
So x_n is directly proportional to n.
x_20 = 20*W = 1.2 cm  =>  W = 0.06 cm.
x_30 = 30*W = 30*0.06 = 1.8 cm.
**Answer D.** (Cross-check: 1.2 * 30/20 = 1.8.)

## Flags

1. **Q. 1(iii) — conceptually loose stem, but only one defensible option.**
   In a true stationary wave y = 2A sin(kx) cos(omega*t), every particle between two adjacent
   nodes moves *in phase*: the temporal phase difference between a node and an adjacent
   antinode is 0 (and the node has zero amplitude, so its phase is arguably undefined). The
   value pi/2 comes from treating the quarter-wavelength *path* difference as a phase
   difference, which is the progressive-wave relation. The paper plainly wants that reading,
   and 0 is not on the option list, so B is the only answer the option set admits. Recorded
   as high on the letter, with this caveat on the physics.

2. **Q. 1(vii) — option (A) is not cleanly false, it is a weaker true statement in the
   special case.** For a cycle delta-U = 0 and Q = W; if additionally the cycle does no net
   work then Q = 0 = delta-U and (A), (B), (C) are all simultaneously true. The only
   statement true for *every* cyclic process is (D). No ambiguity in practice.

3. **Q. 1(vii) — transcription note acknowledged.** Options (B) and (C) read "Q = 0" and
   "W = 0"; I am told the printed page uses a capital letter O there. Either way the intended
   reading is zero, and it does not change the answer: both are false for a general cycle.

4. **No no-correct-option cases on this paper.** All ten stems have exactly one correct
   printed option under a straightforward reading.

5. **No algebraically equivalent option pairs.** Checked each set; the nearest thing is
   Q. 1(vii), covered in flag 2, where the relation between options is logical rather than
   algebraic.

6. **No degC/kelvin trap present.** Q. 1(vii) is the only thermodynamics item and carries no
   numerical temperature. No question on this paper needs a temperature conversion.

7. **Q. 1(i) — "central axis" read as the perpendicular symmetry axis.** For a disc this is
   the standard meaning and gives MR^2/2. Had it meant a central *diameter* the answer would
   be MR^2/4, which is option (A). The phrase "about its central axis" in the Balbharati
   MI table denotes the perpendicular axis, so B stands; noting it because (A) exists on the
   list precisely as that distractor.

8. **Q. 1(ix) — "second's pendulum" carries the period, which is the only place T enters.**
   If a reader took T = 1 s instead of 2 s the answer would be 16*pi cm/s, which is not on
   the list — the option set is consistent with T = 2 s, so the intended reading is confirmed
   by the options rather than assumed.
