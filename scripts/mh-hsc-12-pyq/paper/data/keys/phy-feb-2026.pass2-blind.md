# phy-feb-2026 — pass 2 (BLIND)
Derived from stem + options only. No sight of pass 1, the transcription, or the PDF.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | A | high | Volume is conserved, so n·4πr² = n^(1/3)·4πR² > 4πR²: coalescing strictly reduces total surface area. |
| Q. 1(ii) | A | high | Ideal gas assumes zero intermolecular force, so there is no intermolecular PE — energy is purely translational KE. |
| Q. 1(iii) | C | medium | Textbook convention (saturation current depends on intensity, not frequency); strict photon-flux physics gives "decreases" — see Flags. |
| Q. 1(iv) | D | high | Q = 0 defines an adiabatic process. |
| Q. 1(v) | C | high | T = 2π√(l cosθ/g); option C is 4π√(l cosθ/4g) = 4π·½√(l cosθ/g) = 2π√(l cosθ/g). |
| Q. 1(vi) | A | high | Rod rotating about one end in ⊥ field: e = ½Bωl². |
| Q. 1(vii) | B | high | λ ∝ 1/E, so λ₁:λ₂ = E₂:E₁ = 2.5:5 = 1:2. |
| Q. 1(viii) | B | high | Parallel SHMs, δ = π/3: A = √(2²+2²+2·2·2·cos60°) = √12 = 2√3. |
| Q. 1(ix) | B | high | V = M/I = 10/10⁶ = 10⁻⁵ m³; L = V/A = 10⁻⁵/2.5×10⁻⁴ = 0.04 m = 4 cm. |
| Q. 1(x) | C | high | tanφ = (X_L − X_C)/R, and X_L > X_C makes the numerator positive. |

## Working

### Q. 1(i) — coalescing droplets
Let n droplets of radius r merge into one drop of radius R. Volume is conserved:

n·(4/3)πr³ = (4/3)πR³ ⟹ R = n^(1/3) r

Total area before: A_before = n·4πr².
Area after: A_after = 4πR² = 4π n^(2/3) r².

A_before / A_after = n / n^(2/3) = n^(1/3) > 1 for n > 1.

So the total surface area **decreases** (this is exactly why coalescence releases energy: ΔE = T·ΔA < 0, and the drop warms).
**Answer A.**

### Q. 1(ii) — energy of ideal-gas molecules
The ideal-gas model postulates (a) point molecules of negligible volume and (b) **no intermolecular forces except during elastic collisions**. Potential energy is defined by an interaction potential; with no interaction there is no configurational PE. Hence the internal energy is purely kinetic: U = (f/2)nRT. (For a monatomic ideal gas, U = (3/2)nRT, all translational KE.)
**Answer A.** Options B and C both require an intermolecular potential, which the ideal-gas model forbids; D would mean zero internal energy.

### Q. 1(iii) — photocurrent vs frequency at constant intensity
Two defensible readings; I record the textbook one and flag the other.

*Textbook reading (what the board expects).* Standard Std-XII/NCERT presentation: photoelectric current is directly proportional to intensity and **independent of frequency** (the classic photocurrent-vs-collector-potential family of curves drawn for ν₁ < ν₂ < ν₃ at the *same intensity* is drawn with a **common saturation current**; only the stopping potential shifts). Under that convention, raising ν above ν₀ with intensity and potential fixed leaves the current unchanged ⟹ **remains same**.

*Strict reading.* Intensity I is energy per unit area per unit time. Photon flux N = I/(hν). Photocurrent i = e·η·N = e·η·I/(hν). With I fixed and ν increased, N falls, so i **decreases** as 1/ν (ignoring any rise in quantum efficiency η).

The stem pins "intensity and potential constant", so the arithmetic favours *decreases* (A). The board's own graph-based convention gives *remains same* (C). I take **C** at **medium** confidence because the question is a verbatim restatement of the textbook's "current is independent of frequency" line, but the disagreement is real and recorded in Flags.

### Q. 1(iv) — adiabatic
Isobaric: P constant. Isochoric: V constant. Isothermal: T constant (Q ≠ 0 in general). Adiabatic: **Q = 0**, no heat entering or leaving.
**Answer D.**

### Q. 1(v) — conical pendulum period
For a bob on a string of length l making semi-vertical angle θ, radius r = l sinθ, and the vertical/horizontal force balance gives

T_tension cosθ = mg,  T_tension sinθ = mω²r = mω² l sinθ
⟹ ω² = g/(l cosθ) ⟹ Period **T = 2π√(l cosθ / g)**.

Now test the options:
- (A) (1/2π)√(l cosθ/g) — right radical, wrong prefactor (off by 4π²).
- (B) (1/2π)√(l sinθ/g) — wrong radical and prefactor.
- (C) 4π√(l cosθ/(4g)) = 4π · (1/√4) · √(l cosθ/g) = 4π · ½ · √(l cosθ/g) = **2π√(l cosθ/g)** ✓
- (D) 4π√(l tanθ/g) — wrong.

The correct option is deliberately disguised by pulling a 4 inside the radical.
**Answer C.**

### Q. 1(vi) — rotating rod EMF
Element dx at distance x from the pivot moves with speed v = ωx. dε = Bv dx = Bωx dx.

ε = ∫₀^l Bωx dx = Bω l²/2 = **½Bωl²**.

(Equivalently: area swept per second = ½l²ω, and ε = B·dA/dt.)
**Answer A.**

### Q. 1(vii) — ratio of wavelengths
E = hc/λ ⟹ λ = hc/E, so λ ∝ 1/E.

λ₁ : λ₂ = (1/5) : (1/2.5) = 0.2 : 0.4 = **1 : 2**.

Numerically λ₁ = 1240/5 = 248 nm, λ₂ = 1240/2.5 = 496 nm — ratio 1:2.
**Answer B.** (Stem says "wavelengths of emitted radiation"; the only radiation with the stated energies is the *incident* radiation, so I read it as the incident photons. See Flags.)

### Q. 1(viii) — two parallel SHMs
For two collinear (parallel) SHMs of amplitudes a₁, a₂ and phase difference δ:

A = √(a₁² + a₂² + 2a₁a₂ cos δ)

a₁ = a₂ = 2, δ = π/3 ⟹ cos δ = ½.

A = √(4 + 4 + 2·2·2·½) = √(4 + 4 + 4) = √12 = **2√3 ≈ 3.464**.

Option C (4) would need δ = 0; option A (0) needs δ = π; option D (12) is A², the classic trap of forgetting the square root.
**Answer B.**

### Q. 1(ix) — length of a bar magnet from magnetisation
Intensity of magnetisation I_m = M_z / V, where M_z is magnetic (dipole) moment and V the volume.

V = M_z / I_m = 10 / 10⁶ = 1 × 10⁻⁵ m³.

For a bar of uniform cross-section A, V = A·L:

L = V/A = (1 × 10⁻⁵) / (2.5 × 10⁻⁴) = 4 × 10⁻² m = **4 cm**.

Cross-check: I_m = M_z/(A·L) = 10/(2.5×10⁻⁴ × 0.04) = 10/10⁻⁵ = 10⁶ A/m ✓.
**Answer B.**

### Q. 1(x) — phase angle in series LCR
tanφ = (X_L − X_C)/R with R > 0.

X_L > X_C ⟹ X_L − X_C > 0 ⟹ **tanφ > 0, i.e. positive** (inductive circuit, voltage leads current, 0 < φ < 90°).

Zero would need X_L = X_C (resonance); negative needs X_C > X_L; infinity needs R = 0.
**Answer C.**

## Flags

1. **Q. 1(iii) — genuine physics-vs-textbook conflict, the only sub-high answer on this paper.**
   As printed ("intensity and potential constant"), the strict answer is **(A) decreases**, because photon flux = I/(hν) falls as ν rises. The answer I record, **(C) remains same**, is the Std-XII textbook convention (photocurrent depends on intensity alone; the standard i–V family for ν₁<ν₂<ν₃ at equal intensity is drawn with one common saturation current). If pass 1 says A, this is a reasoned disagreement, not an arithmetic slip, and the adjudication should turn on which convention this bank keys to. Note the option set (decreases / becomes zero / remains same / increases) is the same boilerplate used in Q. 1(i), which tells us nothing either way.

2. **Q. 1(vii) — wording defect.** "the ratio of their wavelengths of **emitted** radiation". Photons *incident* on the surface have energies 5 eV and 2.5 eV; nothing is emitted as radiation here (photoelectrons are emitted, and their de Broglie wavelengths would need the work function, which is not given). Derived as the wavelengths of the two incident radiations ⟹ 1:2. If it were instead read as photoelectron de Broglie wavelengths, the answer is indeterminate from the data given (needs φ), so no option would be derivable — another reason the incident reading is the intended one.

3. **Q. 1(viii) — stem/notation mismatch.** The two motions are labelled *x* and *y*, which normally signals *perpendicular* SHMs (a Lissajous superposition, for which "amplitude of the resultant SHM" is not even well-defined and the path here would be an ellipse). The stem explicitly says "**two parallel S.H.M.s**", so I derived the collinear superposition: 2√3. Derived as printed; noting that the variable names contradict the word "parallel".

4. **Q. 1(v) — option written in disguised form.** The correct option is printed as 4π√(l cosθ/4g) rather than the standard 2π√(l cosθ/g). Not an error, but worth recording: a reader who pattern-matches on the standard form will conclude no option matches. The two are identical, not merely close.

5. **No no-correct-option cases and no algebraically-equivalent option pairs found on this paper.** Options (A) and (C) in Q. 1(v) are *not* equivalent (they differ by a factor 4π²), and (B)/(D) in Q. 1(viii) are not (2√3 ≈ 3.46 vs 12).

6. **No unit defects** of the "S^-1"/"m.k."/degC-for-K class appear in this paper's ten stems; units read correctly throughout (Am², m², A/m).
