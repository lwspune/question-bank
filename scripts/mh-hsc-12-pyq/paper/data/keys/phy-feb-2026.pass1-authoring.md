# phy-feb-2026 — pass 1 (authoring)

Maharashtra HSC Class 12, Physics (J-137), 16 February 2026. No official key
exists and none ever will. Options were read off the rendered page, never the
text layer.

| ref | answer | confidence | reasoning |
|---|---|---|---|
| Q. 1(i) | A | high | coalescing conserves volume; surface area scales as \(n^{1/3}\) of the total, so it falls |
| Q. 1(ii) | A | high | an ideal gas has no intermolecular forces, hence no potential energy |
| Q. 1(iii) | C | medium | textbook convention: photocurrent is set by intensity, not frequency — see the flag |
| Q. 1(iv) | D | high | no heat exchanged is the definition of adiabatic |
| Q. 1(v) | C | high | \(4\pi\sqrt{l\cos\theta/4g}\) IS \(2\pi\sqrt{l\cos\theta/g}\) — the standard result in disguise |
| Q. 1(vi) | A | high | a rod pivoted at one end sweeps \(\tfrac12 l^2\) per radian, so \(e=\tfrac12 B\omega l^2\) |
| Q. 1(vii) | B | high | \(\lambda \propto 1/E\), so \(\lambda_1:\lambda_2 = 2.5:5 = 1:2\) |
| Q. 1(viii) | B | high | \(A=\sqrt{a_1^2+a_2^2+2a_1a_2\cos\delta} = \sqrt{12} = 2\sqrt{3}\) |
| Q. 1(ix) | B | high | \(V=M/M_z=10^{-5}\ \text{m}^3\); \(L=V/A=0.04\) m = 4 cm |
| Q. 1(x) | C | high | \(\tan\phi=(X_L-X_C)/R > 0\) when \(X_L>X_C\) |

## Working

**Q. 1(i) — A.** \(n\) droplets of radius \(r\) merging into one of radius \(R\)
conserve volume: \(nr^3=R^3\). Total area before is \(4\pi n r^2\), after is
\(4\pi R^2 = 4\pi n^{2/3} r^2\). Since \(n^{2/3} < n\) for \(n>1\), the area
decreases — which is why the process releases energy and happens spontaneously.

**Q. 1(ii) — A.** The ideal-gas model assumes point molecules with no
interaction except elastic collision. Potential energy requires an
intermolecular force, so the internal energy is purely kinetic.

**Q. 1(iii) — C.** *See the flag — this is the one item on the paper where
strict physics and the prescribed textbook part company.* Std-XII teaches that
photocurrent is determined by intensity (number of photons striking per second)
and that the \(i\)–\(V\) curves for different frequencies at the same intensity
share one saturation current. On that reading the current **remains same**.

**Q. 1(iv) — D.** Adiabatic is defined by \(Q=0\). Isobaric fixes \(p\),
isochoric fixes \(V\), isothermal fixes \(T\) — all three exchange heat.

**Q. 1(v) — C.** For a conical pendulum \(T = 2\pi\sqrt{\dfrac{l\cos\theta}{g}}\).
None of the options is written that way, but
\(4\pi\sqrt{\dfrac{l\cos\theta}{4g}} = 4\pi\cdot\tfrac12\sqrt{\dfrac{l\cos\theta}{g}}
= 2\pi\sqrt{\dfrac{l\cos\theta}{g}}\). Option (c) is the correct result with the
2 moved inside the radical. A reader pattern-matching the remembered form will
conclude nothing matches, which is exactly the trap.

**Q. 1(vi) — A.** An element \(dx\) at radius \(x\) moves at \(\omega x\), so
\(de = B\omega x\,dx\) and \(e = B\omega \int_0^l x\,dx = \tfrac12 B\omega l^2\).

**Q. 1(vii) — B.** \(E = hc/\lambda\) gives \(\lambda \propto 1/E\). For 5 eV and
2.5 eV, \(\lambda_1:\lambda_2 = 1/5 : 1/2.5 = 1:2\).

**Q. 1(viii) — B.** Two parallel SHMs of equal amplitude 2 with phase difference
\(\pi/3\): \(A = \sqrt{2^2+2^2+2(2)(2)\cos 60^\circ} = \sqrt{4+4+4} = \sqrt{12}
= 2\sqrt{3}\). Option (d) 12 is the forgot-the-root trap.

**Q. 1(ix) — B.** Intensity of magnetisation \(M_z = M/V\), so
\(V = 10/10^6 = 10^{-5}\ \text{m}^3\). With \(V = A\ell\),
\(\ell = 10^{-5}/(2.5\times10^{-4}) = 0.04\) m = 4 cm.

**Q. 1(x) — C.** \(\tan\phi = \dfrac{X_L - X_C}{R}\). With \(X_L > X_C\) the
numerator is positive and \(R>0\), so \(\tan\phi\) is positive (the circuit is
inductive and the current lags).

## Flags

- **Q. 1(iii) is a physics-vs-textbook conflict, not an arithmetic one.** Raising
  the frequency at *constant intensity* reduces the photon flux \(I/h\nu\), so on
  strict physics the photocurrent **decreases** (A). The Std-XII treatment
  presents photocurrent as intensity-determined and draws one common saturation
  current for \(\nu_1<\nu_2<\nu_3\) at equal intensity, giving **remains same**
  (C). Answered C on the prescribed convention, confidence medium.
- **Q. 1(v): the correct option is printed in disguised algebraic form.** Not an
  error, but worth recording — the distractor set punishes recognition rather
  than derivation.
- No no-correct-option items and no genuinely equivalent option pairs.
