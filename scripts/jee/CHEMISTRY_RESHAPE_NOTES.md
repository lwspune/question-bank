# JEE Chemistry — taxonomy reshape ledger

Running notes for the taxonomy reshape that follows the Chemistry ingest.

**Why this file exists.** The agreed approach is *let agents auto-create subtopics
now, reshape at the end* — the alternative (seeding a full taxonomy up front)
would have blocked the ingest on a review round. The cost of that choice is
drift, and drift is only cheap to fix if it is written down as it happens rather
than reverse-engineered from a finished bank.

The reference taxonomies are the **cleaned MHT-CET Chemistry** (30 chapters,
~120 subtopics, same Class 11-12 depth — the primary reference) and **NDA
Chemistry** (12 chapters, Class-10 depth — weaker, use only when MHT-CET has
nothing). Both are injected into the agent handout by `taxonomy-handout.ts`.

**Important:** taxonomy is per-exam. The goal is STRUCTURAL parity and shared
subtopic *wording*, not renaming JEE chapters to match a sibling. JEE's
"Equilibrium" is MHT-CET's "Ionic Equilibria"; JEE's "The p-Block Elements"
spans two MHT-CET chapters. Do not "fix" those.

---

## Resolved during ingest

Duplicates created by different agents in the same wave, merged to the MHT-CET
wording as soon as they were spotted (2026-08-01, wave 1):

| Merged | Into |
|---|---|
| `Arrhenius Equation and Activation Energy` + `Arrhenius Equation and Temperature Dependence` | `Temperature Dependence, Arrhenius and Collision Theory` |
| `First Law and Work of Expansion` + `Work in Thermodynamic Processes (First Law)` | `First Law of Thermodynamics, Internal Energy and Work` |
| `Rate of Reaction and Rate Expressions (stoichiometric rate relations)` | `Rate of Reaction, Stoichiometry and Average Rate` |

The sibling reference was added to the handout *because* of these — two agents
independently coined different names for the same topic within one wave.

---

## Open questions for the reshape

### 1. No `Redox Reactions` chapter
JEE Chemistry has no Redox chapter; MHT-CET has one with three subtopics
(`Balancing Redox Reactions...`, `Oxidation Number Calculation...`,
`Reducing/Oxidizing Agents and Acidic/Basic Oxides`), and it is a standard NCERT
Class 11 chapter.

Probed at 435 questions: only 8 stems mention redox at all, and most sit
CORRECTLY in their current chapters (redox within Electrochemistry, within
metallurgy, within hydrogen chemistry). A `redox` keyword hit is not evidence a
question belongs in a Redox chapter.

**Decision: deferred.** Re-probe once the corpus is complete — at ~3,400
questions a dedicated chapter is likely warranted, but creating it mid-ingest
would file identical questions inconsistently across waves.

Two independent agents have now raised it unprompted (2026-apr02-s1 Q36 on
dichromate as an oxidising agent, filed under d-/f-Block; 2026-jan24-s1 Q50 on
balancing an acidified-dichromate redox, same placeholder). Both borrowed
MHT-CET subtopic wording (`Reducing/Oxidizing Agents and Acidic/Basic Oxides`,
`Balancing Redox Reactions and Oxidized/Reduced Species`) under a JEE chapter
that is not really about redox. When the reshape runs, those two subtopic names
are the seed for the new chapter.

### 1b. No `States of Matter` chapter
Same shape as the Redox gap, and now with three independent votes:

- 2026-jan28-s2 Q116 — latent heat at a phase change, filed under
  `Chemical Thermodynamics :: Heat Capacity and Calorimetry`
- 2026-apr07 Q34 — Dalton's law / partial pressures, filed under
  `Some Basic Concepts of Chemistry :: Mole Concept and Stoichiometry`
- 2023-apr12 Q58 — rms vs most-probable speed, filed to the SAME place as
  apr07 Q34 for consistency

MHT-CET carries `States of Matter :: Gas Laws and Ideal Gas Equation |
Real Gases, Dalton's Law and KTG`, and it is a standard NCERT Class 11 chapter.

**Decision: deferred, same reasoning as Redox.** Creating a chapter mid-ingest
files identical content inconsistently — the three questions above already went
to two different chapters. When the reshape runs, the MHT-CET chapter and
subtopic names are the seed, and these three rows are the first residents.

A guard now exists: `promote-gaps.ts` refuses to promote any classification
whose CHAPTER is absent from the live-DB handout, because `commit.ts`
auto-creates whatever chapter it is handed and would otherwise grow the spine
silently. (Its first implementation was itself a no-op — it split the handout on
the phrase "SIBLING REFERENCE", which also appears in the instructions ABOVE the
chapter list, so the parse yielded an empty set and passed everything. It now
bounds the section explicitly and throws if it parses zero chapters.)

### 2. Thin chapters inherited from the legacy 260
These were auto-created from only 260 legacy-2021 questions and are still the
weakest part of the spine. Growing, but check them at reshape time:

- `Alcohols, Phenols and Ethers` — has `Ethers` and `Phenols` but **no Alcohols
  subtopic at all**. Now the single most-cited gap: four separate agents hit it
  (jan24-s1 Q40, jan24-s2 Q41, jan28-s2 Q31, apr05-s1 Q42) and each had to file
  an alcohol question under `Phenols` or `Ethers`. MHT-CET splits the chapter six
  ways; borrowing `Chemical Reactions of Alcohols and Acidity`,
  `Classification of Alcohols and Phenols` and
  `Physical Properties of Alcohols, Phenols and Ethers` would close it.
- `Haloalkanes and Haloarenes` — only `Nucleophilic Substitution`. MHT-CET splits
  this five ways (preparation / SN1-SN2 / elimination / polyhalogen / physical).
- `Solutions` — was `Colligative Properties` alone; Henry's and Raoult's added
  during ingest.
- `Organic Chemistry - Some Basic Principles and Techniques` — no nomenclature
  and no electronic-effects subtopic; MHT-CET has both.

### 3. Near-synonyms to review (not yet merged)
- `Entropy and Spontaneity` (legacy) vs `Gibbs Free Energy` (new). MHT-CET splits
  as `Entropy and Second Law` + `Gibbs Free Energy and Spontaneity`. Both JEE
  names are pre-existing/shipped — reshape, do not touch mid-ingest.
- `Aromatic Amines` vs `Aromatic Amines and EAS` (both legacy, same chapter).

### 4. Chapter-name convention
JEE uses `Organic Chemistry - Some Basic Principles and Techniques` with a
hyphen. This is the one chapter name that breaks the `Name - justification`
parsing in `promote-gaps.ts`, which is why that helper splits on `" :: "` before
`" - "`. Worth normalising at reshape time.

---

## Method to reuse

The JEE **Maths** taxonomy reshape (24 -> 27 chapters, 2026-07-24) is the
precedent: three-way compare against the cleaned NDA and MHT-CET taxonomies,
reclassify with the standard SQL pattern (create targets -> reparent subtopics
AND their questions' `chapter_id` -> delete empties), then verify
questions-preserved / 0-empty / 0-chapter-mismatch / 0-null-subtopic.

Blast radius for JEE Chemistry is small: no `/guide`, no `/notes`, no mocks and
no concept tags reference it — the only surface is the `/browse` filter list.
