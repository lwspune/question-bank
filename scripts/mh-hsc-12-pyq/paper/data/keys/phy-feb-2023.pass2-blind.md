# phy-feb-2023 — pass 2 (BLIND)
Derived from stem + options only. No sight of pass 1, the transcription, or the PDF.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | C | high | Mean free path λ = 1/(√2·π·n·d²); only C has both the √2 and the d². |
| Q. 1(ii) | B | high | First law is the energy-conservation statement (ΔQ = ΔU + W). |
| Q. 1(iii) | C | high | Y = complement of (A+B) = NOT(OR) = NOR. |
| Q. 1(iv) | D | high | Frequency is fixed by the source; v and λ change with medium, amplitude changes on transmission. |
| Q. 1(v) | C | high | Plane ⊥ B ⇒ B along the coil normal ⇒ Φ = NBA = 100×1×1 = 100 Wb. |
| Q. 1(vi) | A | high | Complete wetting is the limiting case θ = 0. |
| Q. 1(vii) | C | high | LED light comes from electron–hole recombination across the junction in forward bias. |
| Q. 1(viii) | A | high | Transformer core must be magnetically soft: low coercivity and low retentivity ⇒ thin hysteresis loop, small loss. |
| Q. 1(ix) | D | high | eV₀ = KE_max = 2 eV ⇒ V₀ = 2.0 V. |
| Q. 1(x) | B | high | r ∝ n²; r₈/r₄ = 64/16 = 4. |

## Working

### Q. 1(i) — mean free path
Kinetic-theory result, collision-cylinder argument with the relative-speed (√2) correction:

  λ = 1 / (√2 · π · d² · n)

where n = molecules per unit volume, d = molecular diameter. The collision cross-section is πd², the swept volume per unit path is πd²·(√2 v̄)·t, and dividing distance by number of collisions gives the expression above.

Dimensional screen of the four options (λ must be a length, [n] = L⁻³, [d] = L):
- (A) √(2/(πnd)) → √(1/L⁻²) = L. Dimensionally a length, but the algebraic form (square root of the whole thing, d to the first power) matches no kinetic-theory result.
- (B) 1/(2πnd²) → L. Dimensionally fine; this is the *uncorrected* form with 2 in place of √2 — the classic distractor.
- (C) 1/(√2 π n d²) → L. Exactly the standard result.
- (D) 1/(√2 π n d) → 1/(L⁻³·L) = L². **Not a length** — dimensionally impossible.

Answer **C**.

### Q. 1(ii) — first law
ΔQ = ΔU + W is the statement that heat supplied is accounted for entirely as internal-energy change plus work done — i.e. conservation of **energy**. Momentum, mass and velocity conservation are separate (and "conservation of velocity" is not a law at all).

Answer **B**.

### Q. 1(iii) — Boolean expression
Y = A‾+‾B‾ (bar over the whole sum). A + B is OR; the overbar inverts it. NOT(OR) = **NOR**.
Truth table check: A=0,B=0 → A+B=0 → Y=1; every other input pair gives Y=0. That is the NOR table.
(NAND would be Y = overline(A·B); AND/OR carry no bar.)

Answer **C**.

### Q. 1(iv) — invariant property across a boundary
At a boundary the wave oscillation is driven by the incident wave, so the number of cycles arriving per second must equal the number leaving per second — otherwise energy would pile up at the interface. Hence **frequency** is unchanged. Speed changes as v = c/µ, and since v = fλ with f fixed, λ changes by the same factor. Amplitude changes because energy splits between reflected and transmitted waves.

Answer **D**.

### Q. 1(v) — flux through a coil
Φ = N·B·A·cos θ, θ = angle between B and the coil's **normal**.

"Plane perpendicular to the magnetic field" ⇒ the field is along the normal to the plane ⇒ θ = 0 ⇒ cos θ = 1.

  Φ = 100 × 1 T × 1 m² × 1 = **100 Wb**

Answer **C**. (The 50 Wb and 200 Wb options correspond to no physical configuration here — 200 Wb has no route at all; they are pure filler.)

### Q. 1(vi) — angle of contact for complete wetting
The contact angle runs 0 ≤ θ ≤ π. Ranges:
- θ = 0: complete/perfect wetting (liquid spreads over the whole surface)
- 0 < θ < π/2: partial wetting, concave meniscus, liquid rises (water–clean glass)
- θ = π/2: neutral, flat meniscus (water–silver)
- π/2 < θ < π: non-wetting, convex meniscus, liquid depresses (mercury–glass)

"Completely wets" is the θ = 0 limit.

Answer **A**.

### Q. 1(vii) — LED emission mechanism
An LED is operated in **forward** bias, which narrows the depletion region and injects minority carriers across the junction. Each electron falling from the conduction band into a hole in the valence band releases energy hν ≈ E_g as a photon. So the light originates in **recombination of holes and electrons**.
Eliminations: (A) reverse bias gives no injection (that is a photodiode's mode); (B) a widened depletion region is the reverse-bias condition; (D) heating gives incoherent thermal radiation, not the junction's characteristic colour.

Answer **C**.

### Q. 1(viii) — soft iron transformer core
Energy dissipated per cycle in a magnetic core = area of the B–H hysteresis loop. A transformer core is magnetised and demagnetised 2f times per second (100 times/s at 50 Hz), so the loop must be as thin as possible. That requires:
- **low coercivity** (small reverse H needed to demagnetise ⇒ narrow loop), and
- **low retentivity** (little B left at H = 0 ⇒ short loop),

together with high permeability so the flux is carried in the core. Soft iron is the textbook soft-magnetic material with exactly this profile; high coercivity + high retentivity (option C) describes a *hard* magnetic material such as steel or alnico, used for permanent magnets, and would waste energy as hysteresis heat in a core.

Answer **A**.

### Q. 1(ix) — stopping potential
The stopping potential is defined by e·V₀ = KE_max.

  KE_max = 2 eV = 2 × (1.6×10⁻¹⁹ C × 1 V) = 3.2×10⁻¹⁹ J
  V₀ = KE_max/e = (3.2×10⁻¹⁹ J)/(1.6×10⁻¹⁹ C) = 2.0 V

The numerical convenience of the electron-volt: KE_max in eV equals V₀ in volts.

Answer **D**.

### Q. 1(x) — Bohr radius scaling
Bohr's model: rₙ = (ε₀ n² h²)/(π m Z e²), i.e. rₙ ∝ n²/Z. For hydrogen Z = 1, so rₙ ∝ n².

  r₈/r₄ = 8²/4² = 64/16 = **4**

Answer **B**.
(Sanity check with numbers: r₄ = 0.529 Å × 16 = 8.46 Å; r₈ = 0.529 Å × 64 = 33.86 Å; ratio 4.00.)

## Flags

**No no-matching-option cases.** All ten stems have exactly one correct option as printed.

**No algebraically-equivalent option pairs.** Checked Q. 1(i) specifically (the only question with symbolic options): 1/(2πnd²) and 1/(√2 πnd²) differ by a factor √2/2 ≈ 0.707, so B and C are genuinely distinct, not two spellings of one value.

1. **Q. 1(i), option (A) looks MANGLED, not merely wrong.** It is printed as √(2/(πnd)) — a square root wrapped around the whole expression, with d to the first power. No kinetic-theory derivation produces that shape. The natural board distractor for this stem is √2/(πnd²) (the √2 misplaced into the numerator), which re-typesets into exactly this if the √2 is pulled inside a radical spanning the fraction and the d² exponent is dropped. Given the collegedunia provenance, I read (A) as a reproduction artefact of the printed paper rather than a board-authored distractor. It does not affect the answer — (C) is unambiguously correct either way.

2. **Q. 1(i), option (D) is dimensionally impossible.** 1/(√2 πnd) has dimension L² ([n]=L⁻³, [d]=L), not length. Probably the same dropped-exponent artefact as (A) — the intended distractor was almost certainly 1/(√2 πnd²)-adjacent. Again does not change the answer, but two of four options in one question carrying a lost d² exponent is a pattern worth recording: it suggests the reproduction lost superscripts in this stem.

3. **Q. 1(v), stem wording is the standard ambiguity trap, resolved by convention.** "Plane perpendicular to the magnetic field" is read here as *the field is normal to the plane* (⇒ maximum flux, 100 Wb). The competing reading — "the plane lies along the field", i.e. the coil edge-on — gives Φ = 0, which is not an option. Since 0 Wb is absent and 100 Wb is present, the intended reading is the conventional one; the option set itself disambiguates. Derived as printed on the conventional reading. High confidence.

4. **Q. 1(x), "more than ... by a factor of" is loose but unambiguous in effect.** Read strictly as a *difference*, r₈ − r₄ = 48 a₀ = 3 r₄, which would make the answer "3" — not an option. Read as a *ratio* (the ordinary meaning of "by a factor of"), r₈/r₄ = 4, which is option B. The absent 3 confirms the ratio reading. Derived as the ratio.

5. **Q. 1(ii), the blank ends "conservation of _______" and option (D) is "velocity".** There is no conservation-of-velocity law; this is a filler distractor, not a defect. Noted only because a reader might suspect "momentum" was meant to appear twice.

6. **No units, symbols or numerals appear corrupted elsewhere.** Checked specifically for capital-O-for-zero, degC-vs-K substitutions and lost exponents outside Q. 1(i): Q. 1(v) carries "1 m²" and "1 T" correctly, Q. 1(ix) carries "2eV" (missing space only), Q. 1(x) carries no numerals in its options beyond the bare factors. The reproduction damage, if my reading of flags 1–2 is right, is confined to Q. 1(i).
