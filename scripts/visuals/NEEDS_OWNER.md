# Questions I could not fix (owner to decide)

Found during the animated-solutions work. A wrong SOLUTION is corrected in place
as found (`npm run visuals:fix-solutions`, batches in `solution-fixes/`). What
lands here is what that tool cannot or should not do: a wrong KEY, a wrong or
incomplete STEM, or a question that cannot be answered as printed. Keys and stems
are the owner's call (keys: raise, never flip). Each row stays until it is
settled; settled rows move to the bottom with the date and what was done.

| Question | Exam · chapter | Problem | What would fix it |
|---|---|---|---|
| `f62c1b5d` | JEE Mains · Conic Sections | **Key looks wrong.** The normal at (8/√5, 12/5) to the hyperbola with e = 5/4 is 8√5x + 15y = 100, so λ − β = 85; the stored key is 51 and the stored solution itself works out to 85. | Change the numeric key 51 → 85 (check the official paper first). |
| `daa77f89` | JEE Mains · Conic Sections | **Stem typo.** Prints L₁ = 4x + 3y − 2, which gives 3511/325; with 4x + 3y + 2 (what the solution openly uses) the keyed 11 follows. | Fix the stem sign. Changes content_hash: needs a hash-safe repair. |
| `f3eb2b0b` | JEE Mains · Conic Sections | **Stem inconsistent.** A(sec θ, 2 tan θ) is not on 2x² − y² = 2 for any θ ≠ 0; the solution uses the points as given to reach the key 36. | Recover the original paper's wording. |
| `38cf6990` | JEE Mains · Conic Sections | **Stem underdetermined.** The two lines meet at a point that depends on k; the centre (1, 2) holds only for k = −1, which the stem never fixes. Key 18 matches k = −1. | Recover the original wording (likely fixes k). |
| `009b24ef` | MHT-CET · Circle | **Key choice.** The official key 16 counts k with radius² ≤ 0; requiring a real circle gives 10, not offered. The solution already says so openly. | Decide: keep the official key (current) or mark the question flawed. |
| `e6b79ce5` | JEE Mains · Conic Sections | **Stem typo.** A stray "+ x" in the stem; the solution reads the intended equation. | Remove the stray term (hash-safe repair). |
| `fb0d6184` | JEE Mains · Conic Sections | **Stem typo.** "b²" printed where y² is meant; the solution reads it as y². | Correct the stem (hash-safe repair). |

## Settled

(none yet)
