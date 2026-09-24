# phy-feb-2025 — pass 2 (BLIND)
Derived from stem + options only. No sight of pass 1, the transcription, or the PDF.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | A | high | Transitivity of thermal equilibrium is the verbatim statement of the zeroth law (it is what makes temperature definable). |
| Q. 1(ii) | D | high | P + ½ρv² + ρgh = constant is energy per unit volume; Bernoulli is conservation of energy for streamline flow. |
| Q. 1(iii) | C | medium | Of wood/iron/glass/copper only glass transmits radiation at all; but glass is athermanous to IR — see Flags. |
| Q. 1(iv) | C | high | V = kq/r, so V ∝ 1/r (it is the *field* that goes as 1/r²). |
| Q. 1(v) | D | high | r = R(E/V − 1) = R(l₁ − l₂)/l₂, positive because E > V on load. |
| Q. 1(vi) | B | high | λ = h/√(2mK) ∝ 1/√m at equal KE, so the lightest particle (electron) wins. |
| Q. 1(vii) | B | high | AND is the only gate here whose output is 1 for inputs (1,1); XOR/NAND/NOR all give 0. |
| Q. 1(viii) | D | high | P = τω = 2 × 2π = 4π W. |
| Q. 1(ix) | A | high | 2 loops in 2 m ⟹ λ = 2 m; node-to-adjacent-antinode = λ/4 = 0.5 m. |
| Q. 1(x) | D | high | Nₛ = Nₚ(Vₛ/Vₚ) = 1000 × (880/220) = 1000 × 4 = 4000. |

## Working

### Q. 1(i) — transitivity of thermal equilibrium
The quoted sentence ("if A is in thermal equilibrium with C, and B is in thermal equilibrium with C, then A is in thermal equilibrium with B") is the standard statement of the **zeroth law of thermodynamics**. Its significance is that it makes thermal equilibrium an equivalence relation, which is what licenses assigning a single-valued state function — temperature — to every system, and hence what makes a thermometer (the "third system") meaningful.

- First law: ΔQ = ΔU + W — conservation of energy.
- Second law: entropy / direction of spontaneous heat flow (Kelvin–Planck, Clausius statements).
- "Carnot's law" is not a law of thermodynamics at all; Carnot's *theorem* concerns maximum engine efficiency.

**Answer A.**

### Q. 1(ii) — what Bernoulli's theorem conserves
For steady, incompressible, non-viscous, streamline flow:

P + ½ρv² + ρgh = constant along a streamline

Every term has dimensions of energy per unit volume (J/m³ = Pa): P is pressure energy density, ½ρv² kinetic energy density, ρgh potential energy density. The theorem is derived by applying the **work–energy theorem** to a fluid element, so the conserved quantity is **energy** (per unit volume / per unit mass).

- Linear momentum and angular momentum are not what the relation asserts to be constant (momentum flux changes wherever the pipe narrows).
- Mass conservation is the *separate* continuity equation A₁v₁ = A₂v₂ — the standard distractor here, and worth noting that mass conservation is used as an *input* to Bernoulli, not its statement.

**Answer D.**

### Q. 1(iii) — diathermanous substance
A **diathermanous** substance transmits (rather than absorbs) heat/radiant energy incident on it; an **athermanous** substance absorbs it. With a + r + t = 1, diathermanous means t → 1.

Taking the options:
- **wood** — opaque, t = 0. Athermanous.
- **iron** — opaque metal, t = 0. Athermanous.
- **copper** — opaque metal, t = 0. Athermanous.
- **glass** — the only option that transmits radiant energy at all: it is transparent across the visible and near-IR.

So by elimination the intended answer is **glass**.

The honest caveat: the textbook treatment of glass is split. Glass transmits visible and short-wavelength IR but is strongly *absorbing* in the thermal IR (λ ≳ 4 μm) — which is exactly the greenhouse-effect mechanism taught in the same chapter, and on that basis several standard lists put glass among the **athermanous** substances alongside water vapour and wood, reserving *diathermanous* for quartz, rock salt and sodium chloride. If this bank keys to that list, the question has **no correct option**. I record **C** at **medium** confidence because three of four options are unarguably opaque and a board would not knowingly set a four-wrong-option MCQ, but this is the weakest answer on the paper and the flag below states the alternative.

**Answer C (flagged).**

### Q. 1(iv) — potential vs distance from a point charge
V = (1/4πε₀)·q/r ⟹ **V ∝ 1/r**.

Contrast E = (1/4πε₀)·q/r² ∝ 1/r², which is option D and the intended trap — the stem asks about potential, not field. (Consistency check: E = −dV/dr = +kq/r² ✓, the derivative drops the exponent by one as it must.)

**Answer C.**

### Q. 1(v) — internal resistance by potentiometer
Standard experiment: balance the cell's emf E against length l₁ with the external resistance box open, then close the key so the cell drives current through R and balance its terminal p.d. V against length l₂. Since l ∝ potential difference:

E/V = l₁/l₂

For a cell of emf E and internal resistance r driving R:
V = E·R/(R + r) ⟹ E/V = (R + r)/R = 1 + r/R

⟹ r/R = E/V − 1 ⟹ **r = R(E/V − 1) = R(l₁ − l₂)/l₂**

Sanity check on sign: on load V < E, so E/V > 1 and r > 0 ✓.

Testing the distractors: (A) R(V/E − 1) and (C) R(1 − V/E) invert the ratio — (A) is negative, (C) is positive but equals r·R/(R+r)·(1/R)·R, i.e. wrong magnitude; (B) R(1 − E/V) is the negative of the correct expression. Only (D) is both positive and correct.

**Answer D.**

### Q. 1(vi) — longest de Broglie wavelength at equal KE
p = √(2mK), λ = h/p = h/√(2mK) ∝ 1/√m at fixed K.

Masses: electron 5.5 × 10⁻⁴ u ≪ proton 1.007 u ≈ hydrogen atom 1.008 u < α-particle 4.0 u.

Smallest mass ⟹ longest wavelength ⟹ **electron** (λ_e/λ_p = √(m_p/m_e) = √1836 ≈ 42.8).

**Answer B.** (Note the option ORDER differs from the July-2024 paper's identical question — there the electron was (A), here it is (B). Flagged below, because a positional slip is the exact failure mode this pairing invites.)

### Q. 1(vii) — gate with high output only when both inputs high
Truth table at inputs (1,1):

| gate | output at (1,1) |
|---|---|
| X-OR (A ⊕ B) | 1 ⊕ 1 = **0** |
| **AND (A·B)** | 1 · 1 = **1** ✓ |
| NAND (A·B)' | (1)' = **0** |
| NOR (A+B)' | (1)' = **0** |

Only AND gives a high output for both inputs high.

Strictly the stem says "produces high output **when** its both inputs are high", which AND satisfies uniquely among these four; note that OR also gives 1 at (1,1), but OR is not an option, so no ambiguity arises. (If the stem is read as "**only** when both are high", AND is still the unique answer.)

**Answer B.**

### Q. 1(viii) — power of a fan at constant torque
Rotational power:

P = τ·ω = 2 N·m × 2π rad/s = **4π W** ≈ 12.57 W

**Answer D.** Options A/B/C would need τω = π, 2π, 3π, i.e. torques of 0.5, 1 and 1.5 N·m respectively. Units check: N·m × s⁻¹ = J/s = W ✓ (rad is dimensionless).

### Q. 1(ix) — node-to-antinode distance on a string
A string fixed at both ends vibrating with **p loops** (p-th harmonic) satisfies L = p·(λ/2).

p = 2, L = 2 m ⟹ 2 = 2·(λ/2) ⟹ **λ = 2 m**

Within a stationary wave, nodes are λ/2 apart, antinodes are λ/2 apart, and **a node and the adjacent antinode are λ/4 apart**:

λ/4 = 2/4 = **0.5 m**

Picture check: nodes at x = 0, 1, 2 m; antinodes at x = 0.5, 1.5 m; separation 0.5 m ✓. Option B (1.0 m) is the node-to-node distance, the intended trap.

**Answer A.**

### Q. 1(x) — transformer turns ratio
For an ideal transformer, Vₛ/Vₚ = Nₛ/Nₚ.

Nₛ = Nₚ · (Vₛ/Vₚ) = 1000 × (880/220) = 1000 × 4 = **4000 turns**

Consistency: 880 > 220 makes it a step-up transformer, so Nₛ must exceed Nₚ ✓ — which already eliminates option A (1000, equal) as well as any answer below 1000.

**Answer D.**

## Flags

1. **Q. 1(iii) — possible no-correct-option, and the only sub-high answer on this paper.** Whether **glass** counts as diathermanous depends on which list the source keys to. Physically glass transmits visible and near-IR (⟹ diathermanous, option C) but absorbs thermal IR strongly (⟹ athermanous, which is how it is usually classified when the *greenhouse effect* is being taught in this same chapter, with quartz / rock salt / sodium chloride given as the diathermanous examples). Under the second list **none of wood, iron, glass, copper is diathermanous** and the item has no correct option. I record C because three options are unarguably opaque; if pass 1 says NONE, the disagreement is definitional and should be adjudicated against the prescribed textbook's own example list, not re-derived.

2. **Q. 1(vi) duplicates July-2024's Q. 1(v) verbatim but with the options REORDERED.** Same stem ("An electron, a proton, an α-particle and a hydrogen atom... longest de Broglie wavelength"), different option order: here electron is **(B)**, in phy-jul-2024 electron is **(A)**. Any key produced by pattern-matching a remembered letter rather than re-reading the options will be wrong on one of the two. Worth a cross-paper consistency check at reconciliation.

3. **Q. 1(vi) — two options are effectively equivalent.** Proton (1.0073 u) and hydrogen atom (1.0078 u) differ by one electron mass, so their de Broglie wavelengths at equal KE differ by ~0.03% — indistinguishable by any reasoning this question supports. Inert here (the answer is the electron), but a genuine distractor defect: the question could not have asked for the *shortest-but-one* wavelength.

4. **Q. 1(vii) — "when" vs "only when".** As printed, "produces high output when its both inputs are high" is also satisfied by OR. OR is not among the options, so AND is unique and the looseness is inert. Recording it because the same stem with an OR distractor would be defective.

5. **Q. 1(ii) — "Energy" is unqualified.** Bernoulli conserves energy *per unit volume along a streamline* for ideal flow, not total energy in any general sense. No other option is defensible, so this is a phrasing note, not a defect.

6. **No unit defects on this paper.** Torque in N m, angular speed in rad/s, voltages in V, lengths in m all read correctly; Q. 1(viii)'s answer of 4π W is exact rather than an approximation, so no rounding ambiguity arises.
