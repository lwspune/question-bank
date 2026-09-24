# phy-jun-2025 — pass 2 (BLIND)
Derived from stem + options only. No sight of pass 1, the transcription, or the PDF.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | D | high | The perpendicular-axes theorem is defined only for a plane lamina; spherical/conical/cylindrical are 3-D. |
| Q. 1(ii) | B | high | Negative-x travel requires the phase (kx + ωt); (C)/(D) use y as the position variable, which is wrong for X-direction. |
| Q. 1(iii) | B | high | KE = q²B²R²_exit/2m ∝ R²_exit. |
| Q. 1(iv) | D | high | Sodium's work function (≈2.3 eV) lies inside the visible band; Zn/Cd/Mg all need UV (≈4–4.3 eV). |
| Q. 1(v) | C | high | γ = magnetic moment / orbital angular momentum = (evr/2)/(m_e vr) = e/2m_e. |
| Q. 1(vi) | B | high | h ∝ 1/r, so h₁:h₂ = r₂:r₁ = 0.6:0.3 = 2:1. |
| Q. 1(vii) | C | high | KVL (ΣV = 0 round a loop) is the statement that energy per unit charge is conserved; KCL is the charge one. |
| Q. 1(viii) | A | high | An ideal polariser passes the average of cos²θ over all θ = ½ of unpolarised intensity. |
| Q. 1(ix) | B | medium | Isochoric: T = ΔT/(ΔP/P) = 1/0.004 = 250 — but the answer is 250 **K**, printed as 250 °C. See Flags. |
| Q. 1(x) | A | high | E_photon = hc/λ = 4.97×10⁻¹⁹ J; n = 0.1/4.97×10⁻¹⁹ = 2.011×10¹⁷ per second. |

## Working

### Q. 1(i) — perpendicular axes theorem
The theorem states I_z = I_x + I_y, where the lamina lies in the x–y plane and z is normal to it. Its derivation uses r² = x² + y² for every mass element, which holds **only if every element has zero z-coordinate** — i.e. only for a plane lamina (a two-dimensional/laminar body). A sphere, cone or cylinder has mass distributed along z, so r² = x² + y² + z² and the theorem fails.
(The *parallel*-axes theorem, by contrast, applies to any body — that is the distractor logic here.)
**Answer D (Laminar).**

### Q. 1(ii) — wave travelling along −X
A progressive wave of the form y = a sin(kx − ωt) has a point of constant phase satisfying kx − ωt = const ⟹ x = (ω/k)t + const, so x *increases* with t: travel along +X.

For y = a sin(kx + ωt): kx + ωt = const ⟹ x = −(ω/k)t + const, so x *decreases* with t: travel along **−X**. ✓

Options (C) and (D) write the phase in terms of *y* (a sin(ky ∓ ωt)) — those describe waves propagating along the Y-axis, not the X-axis, so neither can answer a question about the X-direction regardless of sign.
**Answer B.**

### Q. 1(iii) — cyclotron exit kinetic energy
In the dees, the magnetic force supplies the centripetal force:

qvB = mv²/R ⟹ v = qBR/m

At the exit radius R_exit:

KE = ½mv² = ½m(qBR_exit/m)² = **q²B²R²_exit / (2m)**

With q, B, m fixed for a given machine, KE ∝ R²_exit.
**Answer B.**

### Q. 1(iv) — photoelectric effect with visible light
Visible photons span ≈1.77 eV (700 nm) to ≈3.10 eV (400 nm). The effect needs hν ≥ φ, i.e. φ ≲ 3.1 eV.

| metal | φ (eV) | visible enough? |
|---|---|---|
| Zinc | ≈4.3 | no (UV) |
| Cadmium | ≈4.1 | no (UV) |
| Magnesium | ≈3.7 | no (UV) |
| **Sodium** | **≈2.3** | **yes** — threshold λ₀ = 1240/2.3 ≈ 540 nm, inside the visible band |

Sodium (with potassium and caesium, the alkali metals) is the standard textbook example of a photosensitive metal responding to visible light.
**Answer D.**

### Q. 1(v) — gyromagnetic ratio of the electron
For an electron in a circular orbit of radius r with speed v:

- orbital magnetic moment M = I·A = (e/T)(πr²) = (ev/2πr)(πr²) = **evr/2**
- orbital angular momentum L = m_e v r

γ = M/L = (evr/2)/(m_e v r) = **e / (2m_e)** ≈ 8.8 × 10¹⁰ C/kg.

Option A is its reciprocal; B and D carry a spurious e².
**Answer C.**

### Q. 1(vi) — capillary rise ratio
Jurin's law: h = 2T cosθ / (rρg), so with the **same liquid** (same T, θ, ρ) and same g, h ∝ 1/r.

h₁/h₂ = r₂/r₁ = 0.6/0.3 = 2

⟹ h₁ : h₂ = **2 : 1** (the narrower 0.3 cm tube gives the larger rise).
**Answer B.** Option A is the inverted ratio; C/D would follow from h ∝ 1/r², which is wrong.

### Q. 1(vii) — Kirchhoff's Voltage Law
KVL: Σ(IR) + Σ(emf) = 0 round any closed loop. Multiply through by the charge q carried round the loop and it reads "net work done per circuit of the loop is zero", i.e. a charge returns to its starting potential — the potential is single-valued because the electrostatic field is conservative. That is **conservation of energy**.

By contrast Kirchhoff's *Current* Law (Σ I = 0 at a junction) is conservation of **charge**, which is the distractor (D).
**Answer C.**

### Q. 1(viii) — unpolarised light through one polariser
Unpolarised light is an incoherent mixture of all transmission-axis orientations θ uniformly distributed over 0–2π. Malus' law gives transmitted I = I₀cos²θ for each; averaging:

⟨cos²θ⟩ = (1/2π)∫₀^{2π} cos²θ dθ = **½**

So I_transmitted = I₀/2: the intensity is reduced to **one half**.
**Answer A.** (¼ would be two crossed-at-45° polarisers; ⅛ is three.)

### Q. 1(ix) — gas in a closed vessel
"Closed vessel" ⟹ constant volume ⟹ Gay-Lussac's law, P/T = constant (T in **kelvin**).

Differentiating: dP/P = dT/T.

Given dP/P = 0.4% = 0.004 for dT = 1 °C-interval = 1 K:

T = dT/(dP/P) = 1 / 0.004 = **250 K**

Checked exactly rather than differentially: P₂/P₁ = 1.004 = (T+1)/T ⟹ 0.004T = 1 ⟹ T = 250 K exactly. So the answer is 250 K, which is **−23 °C**.

The options are all printed in °C. **250 °C = 523 K**, which would give dP/P = 1/523 = 0.19%, not 0.4%. So *literally as printed*, **no option is correct** and the correct initial temperature is 250 K = −23 °C. The numeral 250 nevertheless appears as option B, and the overwhelmingly likely explanation is a unit misprint (K set as °C) rather than four wrong options. I therefore record **B** at **medium** confidence with the defect flagged, because the numeral is uniquely determined by the arithmetic.
**Answer B (flagged).**

### Q. 1(x) — number of incident photons
λ = 4000 Å = 4000 × 10⁻¹⁰ m = 4 × 10⁻⁷ m; P = 0.1 W.

Energy per photon:
E = hc/λ = (6.63 × 10⁻³⁴ × 3 × 10⁸)/(4 × 10⁻⁷)
 = (1.989 × 10⁻²⁵)/(4 × 10⁻⁷)
 = 4.9725 × 10⁻¹⁹ J

Number per second:
n = P/E = 0.1 / (4.9725 × 10⁻¹⁹) = **2.011 × 10¹⁷ s⁻¹**

Matches option A to all four printed digits (with h = 6.63 × 10⁻³⁴; using 6.626 gives 2.012 × 10¹⁷).
**Answer A.**

## Flags

1. **Q. 1(ix) — UNIT DEFECT, and strictly a no-correct-option question.** The arithmetic yields **250 K**; the options are labelled **°C**. Reading the options as printed, the correct value (250 K = −23 °C) matches none of 200/250/300/350 °C — and option B taken literally (250 °C = 523 K) predicts a 0.19% pressure rise, not 0.4%. This is exactly the "temperature in degC where the arithmetic yields kelvin" class. I record **B** because the numeral is unambiguous and all four options carry the same wrong unit (so the defect is in the unit label, not in the option values), but a reconciliation that prefers NONE here is defensible and I would not argue against it. Confidence deliberately held at medium for this reason.

2. **Q. 1(x) — the stem asks for a pure number but the answer is a rate.** "The number of incident photons is ___" has no time window stated; the computed quantity 2.011 × 10¹⁷ is photons **per second** (P/E has units s⁻¹). The options carry no units at all, so the omission is harmless for picking a letter, but the printed quantity is dimensionally a rate, not a count. Watch for the transcription reproducing a bare "2.011 × 10¹⁷" where "per second" belongs.

3. **Q. 1(ii) — two options are off-axis, not merely wrong-sign.** Options (C) a sin(ky − ωt) and (D) a sin(ky + ωt) describe propagation along ±Y, so the question effectively has only two live options (A and B). Not an error, but it halves the guessing space — worth noting if this bank tracks distractor quality.

4. **Q. 1(viii) — loose wording.** "How many times the intensity ... reduces" is answered by a *fraction* (½), i.e. the options give the transmitted/incident ratio, not a factor of reduction. Reading it as "reduces **by** a factor of" would also give 2 ⟹ still ½ among these options. Both readings land on A, so the ambiguity is inert here.

5. **No algebraically-equivalent option pairs** on this paper. Q. 1(v)'s options are genuinely distinct (e/2mₑ vs 2mₑ/e vs the e² variants), as are Q. 1(vi)'s ratios.

6. **Q. 1(iv) is the only stem resting on tabulated data rather than derivation** (work functions are not printed). Answer is secure because the Zn/Cd/Mg cluster all sit near 4 eV while Na sits near 2.3 eV — an order-of-magnitude-safe separation, not a close call.
