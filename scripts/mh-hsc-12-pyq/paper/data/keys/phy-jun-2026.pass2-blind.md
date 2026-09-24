# phy-jun-2026 — pass 2 (BLIND)
Derived from stem + options only. No sight of pass 1, the transcription, or the PDF.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | C | high | All mass of a ring sits at distance R from the central axis, so I = MR^2. |
| Q. 1(ii) | B | high | A monoatomic molecule has only 3 translational degrees of freedom. |
| Q. 1(iii) | A | high | Isochoric means dV = 0, so W = 0 and the first law reduces to Q = dU. |
| Q. 1(iv) | C | high | A cyclotron accelerates via the electric field between the dees; a neutron is uncharged. |
| Q. 1(v) | B | high | Purely reactive circuit: phase angle 90 degrees, cos(90) = 0. |
| Q. 1(vi) | D | high | NOR = OR followed by NOT, so Y is the complement of (A + B). |
| Q. 1(vii) | C | high | Series: 1/Ceq = n/C, so Ceq = C/n. |
| Q. 1(viii) | B | high | Brewster: n = tan(35 deg) = 0.70021, matching 0.7002 exactly (value is unphysical, see Flags). |
| Q. 1(ix) | D | high | Velocity gradient = dv/dx = 10 / 5 = 2 per second. |
| Q. 1(x) | A | high | v = f * lambda = 64 * 0.75 = 48 m/s. |

## Working

### Q. 1(i) — MI of a ring about its central axis

The central axis here is the axis through the centre, perpendicular to the plane of the ring.
Every mass element dm of a ring of radius R lies at exactly the same perpendicular distance R
from that axis, so the integral factorises:

    I = integral of r^2 dm = R^2 * integral of dm = M R^2

The distractors are the standard neighbours: MR^2/2 is a disc about its central axis (or a ring
about a diameter); (3/2) MR^2 is a ring about a tangent lying in its own plane; 2 MR^2 is a ring
about a tangent perpendicular to its plane. **Answer C.** Confidence high.

### Q. 1(ii) — degrees of freedom of a monoatomic gas

A monoatomic molecule is treated as a point mass. It can translate along x, y and z. It has no
rotational degree of freedom that carries energy (the moment of inertia about any axis through
a point atom is negligible) and no vibrational mode (a single atom has no bond to stretch).

    f = 3

The distractors are the diatomic values: 5 for a rigid diatomic (3 translation + 2 rotation) and
7 for a diatomic with its vibrational mode active at high temperature. The phrase "at a constant
temperature" in the stem adds nothing — f is temperature-independent for a monoatomic gas.
**Answer B.** Confidence high.

### Q. 1(iii) — first law for an isochoric process

First law: Q = dU + W, where W = integral of p dV.
Isochoric means the volume is constant, so dV = 0 throughout and W = 0. Hence

    Q = dU

Option C is the general first law, true for every process including this one, so it is not the
isochoric *form* being asked for. Option B (Q = 0) is the adiabatic condition. Option D is not a
standard form at all. **Answer A.** Confidence high. (See Flags item 4 for the mild ambiguity
between A and C.)

### Q. 1(iv) — what a cyclotron cannot accelerate

A cyclotron works by two mechanisms, both of which need a non-zero charge q:
  (a) a perpendicular magnetic field bends the particle into semicircles, F = q v B;
  (b) an alternating electric field across the dee gap does work on it, W = q V.

    proton:        q = +e   -> accelerated
    alpha particle: q = +2e  -> accelerated
    deuteron:      q = +e   -> accelerated
    neutron:       q = 0    -> neither bent nor accelerated

**Answer C.** Confidence high.

### Q. 1(v) — power factor of a purely inductive and capacitive circuit

Power factor = cos(phi), where phi is the phase angle between the applied voltage and the
current. In a pure inductor the current lags the voltage by 90 degrees; in a pure capacitor it
leads by 90 degrees. With only L and C present and no resistance, the impedance is purely
reactive, Z = j(X_L - X_C), so phi = +90 or -90 degrees and

    cos(phi) = cos(90 deg) = 0

Equivalently, power factor = R/Z with R = 0. The average power dissipated over a cycle is zero —
the standard "wattless current" result. **Answer B.** Confidence high.

Checked the alternative reading: if the circuit were at resonance, X_L = X_C, the net impedance
would be zero rather than resistive, so the "one" option is not reachable by any reading of a
resistance-free L-C circuit.

### Q. 1(vi) — Boolean equation for NOR

NOR is an OR gate followed by an inverter:

    Y = NOT(A OR B) = complement of (A + B)

Option A is AND, option B is OR, option C is NOT. **Answer D.** Confidence high.
De Morgan gives the equivalent form Y = Abar . Bbar, which is *not* among the options, so there
is no equivalent-option clash to flag here.

### Q. 1(vii) — n equal capacitors in series

For capacitors in series the reciprocals add:

    1/Ceq = 1/C + 1/C + ... (n terms) = n/C
    Ceq   = C/n

Option B (nC) is the parallel result. Option D (1/(nC)) is the reciprocal left un-inverted.
Option A (1/C) is dimensionally wrong for a capacitance. **Answer C.** Confidence high.

### Q. 1(viii) — refractive index from a polarising angle of 35 degrees

Brewster's law: n = tan(i_p), where i_p is the polarising (Brewster) angle.

    tan(35 deg) = 0.7002075...

Testing each distractor as a tangent, to see which angle the setter used:

    0.647   = tan(32.9 deg)
    0.7002  = tan(35.0 deg)   <-- exact match to the printed angle
    0.7133  = tan(35.5 deg)
    0.7265  = tan(36.0 deg)

Option B is the literal Brewster evaluation of the angle as printed, to four decimal places, with
no rounding slack. **Answer B.** Confidence high.

Physics caveat, recorded but deliberately not acted on: a refractive index of 0.7002 is less
than 1, which no ordinary optical material has. Brewster's angle for light entering a denser
medium is always greater than 45 degrees, so a polarising angle of 35 degrees is not physically
consistent with the stem's "refractive index of the material". Either the setter meant 55 degrees
(tan 55 = 1.428) or the angle is an internal one, making 0.7002 the rarer/denser relative index
whose reciprocal 1.428 is the material's true index. All four options are sub-1 tangent values,
which confirms the setter intended the plain n = tan(i_p) substitution. Solved as printed: B.

### Q. 1(ix) — velocity gradient between two liquid layers

Velocity gradient is the relative velocity between adjacent layers divided by the perpendicular
separation between them:

    dv/dx = 10 cm/s / 5 cm = 2 s^-1

The centimetres cancel, so no unit conversion is needed. Confirming in SI:
0.10 m/s / 0.05 m = 2 s^-1 — the same number, as it must be, since a velocity gradient has
dimensions of inverse time only. **Answer D.** Confidence high.

Printed defect: the unit is set as "S^-1" with a capital S (siemens, the unit of conductance)
where it should be a lower-case s (second). Present identically in all four options, so it does
not discriminate between them and does not affect the answer.

### Q. 1(x) — velocity of a wave on a string

    v = f * lambda = 64 Hz * 0.75 m = 48 m/s

**Answer A.** Confidence high.

Checked the one subtlety the word "stationary" could introduce: for a stationary wave, the
quoted wavelength and frequency are those of the two interfering progressive waves, so
v = f * lambda remains the correct relation (the standing pattern itself does not travel). The
stem gives the wavelength directly, not the node-to-node spacing, so no factor of 2 is involved.
Had the setter meant a node spacing of 0.75 m, the wavelength would be 1.5 m and the answer
96 m/s — which is not among the options, confirming the straightforward reading is the intended
and the only self-consistent one.

## Flags

1. **The dump header names the wrong subject.** The header of `blind-mcq.md` describes this as a
   Maharashtra HSC Class-12 **Mathematics & Statistics** board paper, while all ten questions are
   Physics. A boilerplate/template defect in the dump generator, not in the source paper. It did
   not affect any derivation, but it would mislead a reader of the dump.

2. **Q. 1(viii) — physically impossible refractive index.** All four options are less than 1.
   Brewster's law on the printed angle, n = tan(35 deg) = 0.7002, reproduces option B exactly, so
   the key itself is unambiguous — but no real optical material has n < 1 when the polarising
   angle is measured in the rarer medium, and a Brewster angle below 45 degrees is impossible for
   a denser material. Likely the setter meant 55 degrees. **Solved as printed -> B.** Recorded as
   a source defect, not repaired.

3. **Q. 1(ix) — unit printed as capital "S^-1".** Should be lower-case s^-1 (per second); capital
   S is the siemens. Appears in all four options, so it is cosmetic here.

4. **Q. 1(iii) — option C is not strictly false.** Q = dU + W is the general first law and holds
   for an isochoric process too, with W = 0. The stem asks for "the equation of the first law of
   thermodynamics for isochoric process", which by the usual convention means the *reduced* form,
   so A is intended and correct. A mild wording ambiguity, not a no-correct-option case, and not
   enough to lower confidence below high.

5. **No no-correct-option questions in this set, and no two options were equivalent** in any of
   the ten. Every derivation landed exactly on a printed option with no rounding slack: tan 35 =
   0.7002 to four places, 2 s^-1 exactly, 48 m/s exactly.

6. **All ten are single-step recall or substitution items** — six definition recall (i, ii, iii,
   iv, v, vi), one series formula (vii), three one-line substitutions (viii, ix, x). That is why
   every confidence here is high rather than hedged: there is no multi-step derivation anywhere
   in the set where an independent second pass could plausibly branch. If pass 1 disagrees on any
   of these, the disagreement is far more likely to be a transcription difference than a genuine
   derivation difference — check the printed stem first.
