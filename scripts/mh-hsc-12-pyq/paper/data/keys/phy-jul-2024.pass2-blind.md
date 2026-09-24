# phy-jul-2024 — pass 2 (BLIND)
Derived from stem + options only. No sight of pass 1, the transcription, or the PDF.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | A | high | Same Z, different N is the definition of isotopes (isobars = same A, isotones = same N). |
| Q. 1(ii) | D | high | A surface molecule has unbalanced cohesive pull, so work was done to bring it up: maximum PE. |
| Q. 1(iii) | D | high | Perfect black body: absorbs all, transmits none and emits as a full radiator ⟹ e = 1, t = 0. |
| Q. 1(iv) | C | high | An LED is forward-biased; photons come from electron–hole recombination across the junction. |
| Q. 1(v) | A | high | At equal KE, λ = h/√(2mK) ∝ 1/√m, so the lightest particle (electron) has the longest λ. |
| Q. 1(vi) | C | high | The classical cyclotron accelerates positive ions (protons, deuterons, α); see Flags for the pedantic caveat. |
| Q. 1(vii) | B | high | L = R·(L/R) and L/R is a time constant ⟹ 1 H = 1 Ω·s (also 1 Wb/A = 1 V·s/A). |
| Q. 1(viii) | D | high | Stefan: E ∝ T⁴; (1200/600)⁴ = 2⁴ = 16 ⟹ 16 : 1. |
| Q. 1(ix) | B | high | Power factor = cos 45° = 1/√2 = 0.7071. |
| Q. 1(x) | B | high | Two nodes in a closed pipe = first overtone, L = 3λ/4, so f = 3f₁. |

## Working

### Q. 1(i) — nuclide families
- **Isotopes**: same atomic number Z (same protons), different mass number A ⟹ different neutron number N. e.g. ¹H, ²H, ³H. ✓ matches the stem exactly.
- Isobars: same A, different Z (e.g. ⁴⁰Ar, ⁴⁰Ca).
- Isotones: same N, different Z (e.g. ³⁶S, ³⁷Cl).
- Isomers: same Z *and* same A, differing only in nuclear excitation state (e.g. ⁹⁹Tc / ⁹⁹ᵐTc).

**Answer A.**

### Q. 1(ii) — potential energy of surface molecules
A molecule deep in the bulk is pulled equally in all directions by its neighbours; a molecule at the surface has neighbours only below, so the net cohesive force is inward. To move a molecule from the bulk to the surface, work must be done **against** that inward force, and that work is stored as potential energy. Hence surface molecules sit at the **maximum** potential energy — which is precisely why a liquid minimises its free surface area and why surface energy (= surface tension × area) is positive.

Kinetic energy is not the discriminator: KE is set by temperature and is the same on average everywhere in a liquid at thermal equilibrium (evaporative cooling is a *consequence* of high-KE molecules leaving, not a property of "surface molecules have max/min KE").
**Answer D.**

### Q. 1(iii) — black body coefficients
For any body, absorption + reflection + transmission coefficients sum to unity: a + r + t = 1.
A **perfectly black body** absorbs all incident radiation ⟹ a = 1, hence r = 0 and **t = 0**.
By Kirchhoff's law of radiation, emissivity equals absorptivity: **e = a = 1** (it is the perfect emitter too).

So e = 1, t = 0.
**Answer D.**

### Q. 1(iv) — LED emission mechanism
An LED is a heavily doped p–n junction operated in **forward** bias. Forward bias narrows the depletion region and injects minority carriers across the junction; electrons from the n-side and holes from the p-side **recombine** near the junction, and each recombination releases energy ≈ E_g as a photon (radiative recombination in a direct-bandgap material).

- (A) reverse bias — that is a photodiode / breakdown regime, no emission.
- (B) depletion region widens — happens in reverse bias, opposite of what an LED does.
- (D) junction becomes hot — heat is a loss, not the emission mechanism.

**Answer C.**

### Q. 1(v) — longest de Broglie wavelength at equal KE
p = √(2mK) and λ = h/p, so at fixed kinetic energy K:

λ = h/√(2mK) ∝ 1/√m

The longest λ belongs to the **smallest mass**.

| particle | mass (u, approx) | relative λ |
|---|---|---|
| **electron** | 1/1836 ≈ 5.4×10⁻⁴ | **largest** (≈43× the proton's) |
| proton | 1 | 1 |
| hydrogen atom | ≈1.008 | ≈1 |
| α-particle | ≈4 | ½ |

**Answer A.** (Proton and hydrogen atom are near-degenerate here — the H atom is marginally heavier by one electron mass — but both are ~43× shorter than the electron's, so the answer is not close.)

### Q. 1(vi) — what a cyclotron accelerates
A cyclotron accelerates charged particles by reversing the dee potential in step with the cyclotron frequency f = qB/2πm.

- (A) neutral particles — a neutral particle feels neither the electric field in the gap nor the magnetic force in the dees, so it cannot be accelerated or bent. Ruled out.
- (D) all types — excluded by (A).

Between (B) and (C): the standard Std-XII treatment is that the cyclotron accelerates **positively charged particles / positive ions** (protons, deuterons, α-particles), which is how the machine is invariably described and drawn. Electrons are explicitly excluded in the textbook because their small mass makes them relativistic almost immediately, so the fixed-frequency resonance condition breaks down (hence the betatron/synchrotron instead).
**Answer C.** See Flags for the caveat.

### Q. 1(vii) — the unit henry
From ε = −L(dI/dt):
1 H = 1 V·s / A.

Since 1 V/A = 1 Ω, this is 1 H = **1 Ω·s (ohm-second)**. ✓ (Equivalently, the L/R time constant of an RL circuit has units of seconds, so H/Ω = s.)

Checking the others:
- (A) watt = J/s — energy rate, not inductance.
- (C) dyne = 10⁻⁵ N — a CGS force unit, unrelated.
- (D) Wb/m² = tesla — that is magnetic flux *density*, not inductance. (Inductance is Wb/**A**, which is the near-miss this distractor is built on.)

**Answer B.**

### Q. 1(viii) — Stefan–Boltzmann ratio
Convert to kelvin first:
T₁ = 927 + 273 = 1200 K
T₂ = 327 + 273 = 600 K

Emissive power E = σT⁴ (for a perfect black body):

E₁/E₂ = (T₁/T₂)⁴ = (1200/600)⁴ = 2⁴ = **16** ⟹ **16 : 1**.

The distractors map the classic errors: 2:1 is forgetting the fourth power, 4:1 is using T², 8:1 is using T³. Also note that *failing to convert to kelvin* gives (927/327)⁴ ≈ 64, which is not an option — so the question does police the conversion.
**Answer D.**

### Q. 1(ix) — power factor at 45°
Power factor = cos φ, with φ = 45°:

cos 45° = 1/√2 = 0.70710678... ≈ **0.7071**

**Answer B.** (1.0 would be φ = 0, i.e. pure resistance / resonance; 0.6071 and 0.8081 correspond to no standard angle — they are decoys built by shifting the leading digit.)

### Q. 1(x) — closed pipe with two nodes
A pipe closed at one end has a **displacement node at the closed end** and an **antinode at the open end**. Permitted modes have L = (2n−1)λ/4, giving only odd harmonics.

| mode | L | nodes inside + at closed end | frequency |
|---|---|---|---|
| fundamental (n=1) | λ₁/4 | **1** (closed end only) | f₁ = v/4L |
| first overtone (n=2) | 3λ₂/4 | **2** (closed end + one at λ₂/2 from it) | 3f₁ |
| second overtone (n=3) | 5λ₃/4 | 3 | 5f₁ |

Counting nodes, each successive odd harmonic adds exactly one. **Two nodes ⟹ the first overtone ⟹ third harmonic ⟹ 3 × fundamental.**

Verification: for L = 3λ/4, λ = 4L/3, f = v/λ = 3v/4L = 3f₁ ✓. The node positions are x = 0 (closed end) and x = λ/2 = 2L/3, with antinodes at x = L/3 and x = L (open end) — two nodes, two antinodes. ✓

**Answer B.** Options (A) two times and (C) four times are even harmonics, which a closed pipe cannot produce at all — a useful internal consistency check. (D) five times is the *second* overtone, which has three nodes.

## Flags

1. **Q. 1(vi) — pedantically incomplete stem, answered by textbook convention.** A cyclotron accelerates *any* charged particle whose cyclotron frequency stays in resonance; negative ions (H⁻ cyclotrons are the standard design in modern medical isotope production) are accelerated perfectly well, which makes (B) defensible in isolation and makes (B)+(C) jointly true. The Std-XII framing is unambiguous, though — "used to accelerate positively charged particles such as protons, deuterons and α-particles" — and (D) "all types" is firmly wrong because neutral particles are excluded. Recorded as **C**, high, but noting the stem is a definitional-recall item, not a derivation.

2. **Q. 1(v) — two options are near-degenerate.** A proton (1.0073 u) and a hydrogen atom (1.0078 u) differ in mass by one electron mass, ≈0.05%, so their de Broglie wavelengths at equal KE differ by ≈0.03%. Options (B) and (D) are thus **effectively equivalent** — not algebraically identical, but indistinguishable to any reasoning this question can support. It is inert here because the answer is the electron, but it is a genuine distractor-quality defect worth recording: had the question asked for the *shortest* λ or ranked the middle pair, it would have had two correct answers.

3. **Q. 1(ii) — the option pair (A)/(C) is a false axis.** "Minimum/maximum kinetic energy" of surface molecules is not a defined property at thermal equilibrium (Maxwell–Boltzmann applies throughout the liquid), so both KE options are meaningless rather than merely wrong. Derived on the PE axis as printed.

4. **No no-correct-option cases and no unit defects on this paper.** Temperatures are correctly printed in ºC and correctly require conversion (Q. 1(viii)); the degree glyph is rendered as "º" (masculine ordinal) rather than "°" in Q. 1(viii) and Q. 1(ix) — cosmetic, but a transcription artefact worth normalising.

5. **Q. 1(iii) reads "coefficient of emission" where the textbook says "coefficient of emission (emissivity)".** No ambiguity — e = 1 either way for a perfect black body — but note that the stem gives no absorption/reflection coefficient, so the answer rests on Kirchhoff's law plus a + r + t = 1, both of which are Std-XII content.
