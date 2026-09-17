# Search Console — manual Request-Indexing worklist

Generated 2026-09-17 from the live sitemap. **1280 URLs**, after withholding 41 (/formula — no browser pass yet, and the 192 thin mock leaves).

Regenerate with `npm run seo:worklist`.

## How to use this

Open **Search Console → URL Inspection** (the search bar across the top of the
page). Copy a URL from the day's block below, paste it in, press Enter, wait for
the live check, then click **Request Indexing**.

Google offers no bulk submission — one page at a time is the whole manual lever.
Budget about **5–7 minutes for a day's ten**. The quota is roughly 10–12 per
property per day and resets daily; GSC says plainly when you hit it, so stop
there and pick up tomorrow.

**Track by day number, not by ticking rows.** Submission is not indexing — that
lands days later and is read in the Pages report, never here.

**Bulk submission exists, just not for Google.** `npm run seo:indexnow -- --apply`
pushes every URL to Bing, Yandex, Naver and Seznam in one request. Google does
not participate in IndexNow, which is why this hand-worked list exists at all.

## Why this order

Ranked by **winnability, not content depth**. At domain-authority zero a JEE or
NEET page cannot outrank Allen or Physics Wallah whatever is on it, while an NDA
or CDS page competes today — so exam weight outranks question count, and count
only breaks ties within an exam. Pages answering a query Search Console has
actually recorded get a bonus. **Do not re-sort by question count**; see
`src/lib/seo/indexingPriority.ts` and its spec.

Day 1 is the hubs — they pass authority to everything beneath them.

### Day 1

```
https://www.pyqvault.com
https://www.pyqvault.com/about
https://www.pyqvault.com/blog
https://www.pyqvault.com/browse
https://www.pyqvault.com/guide
https://www.pyqvault.com/mock
https://www.pyqvault.com/nda
https://www.pyqvault.com/notes
https://www.pyqvault.com/questions
https://www.pyqvault.com/guide/nda-english
```

### Day 2

```
https://www.pyqvault.com/guide/nda-biology/strategy
https://www.pyqvault.com/guide/nda-chemistry/strategy
https://www.pyqvault.com/guide/nda-english/playbooks
https://www.pyqvault.com/guide/nda-english/strategy
https://www.pyqvault.com/guide/nda-english/traps
https://www.pyqvault.com/guide/nda-english/trends
https://www.pyqvault.com/guide/nda-english/vocab-families
https://www.pyqvault.com/guide/nda-geography/strategy
https://www.pyqvault.com/guide/nda-history/strategy
https://www.pyqvault.com/guide/nda-maths/strategy
```

### Day 3

```
https://www.pyqvault.com/guide/nda-physics/strategy
https://www.pyqvault.com/guide/nda-polity/strategy
https://www.pyqvault.com/guide/nda
https://www.pyqvault.com/guide/nda-biology
https://www.pyqvault.com/guide/nda-chemistry
https://www.pyqvault.com/guide/nda-current-affairs
https://www.pyqvault.com/guide/nda-economics
https://www.pyqvault.com/guide/nda-geography
https://www.pyqvault.com/guide/nda-history
https://www.pyqvault.com/guide/nda-maths
```

### Day 4

```
https://www.pyqvault.com/guide/nda-physics
https://www.pyqvault.com/guide/nda-polity
https://www.pyqvault.com/notes/nda
https://www.pyqvault.com/notes/nda-biology
https://www.pyqvault.com/notes/nda-chemistry
https://www.pyqvault.com/notes/nda-geography
https://www.pyqvault.com/notes/nda-maths
https://www.pyqvault.com/notes/nda-physics
https://www.pyqvault.com/guide/nda-biology/playbooks
https://www.pyqvault.com/guide/nda-biology/reference-tables
```

### Day 5

```
https://www.pyqvault.com/guide/nda-biology/traps
https://www.pyqvault.com/guide/nda-biology/trends
https://www.pyqvault.com/guide/nda-chemistry/common-compounds
https://www.pyqvault.com/guide/nda-chemistry/playbooks
https://www.pyqvault.com/guide/nda-chemistry/traps
https://www.pyqvault.com/guide/nda-chemistry/trends
https://www.pyqvault.com/guide/nda-geography/playbooks
https://www.pyqvault.com/guide/nda-geography/reference-tables
https://www.pyqvault.com/guide/nda-geography/traps
https://www.pyqvault.com/guide/nda-geography/trends
```

### Day 6

```
https://www.pyqvault.com/guide/nda-history/playbooks
https://www.pyqvault.com/guide/nda-history/timeline-and-pairs
https://www.pyqvault.com/guide/nda-history/traps
https://www.pyqvault.com/guide/nda-history/trends
https://www.pyqvault.com/guide/nda-maths/compound-tricks
https://www.pyqvault.com/guide/nda-maths/principles
https://www.pyqvault.com/guide/nda-maths/traps
https://www.pyqvault.com/guide/nda-maths/trends
https://www.pyqvault.com/guide/nda-physics/formulas
https://www.pyqvault.com/guide/nda-physics/ncert-map
```

### Day 7

```
https://www.pyqvault.com/guide/nda-physics/playbooks
https://www.pyqvault.com/guide/nda-physics/traps
https://www.pyqvault.com/guide/nda-physics/trends
https://www.pyqvault.com/guide/nda-polity/playbooks
https://www.pyqvault.com/guide/nda-polity/reference-tables
https://www.pyqvault.com/guide/nda-polity/traps
https://www.pyqvault.com/guide/nda-polity/trends
https://www.pyqvault.com/notes/nda-biology/biochemistry
https://www.pyqvault.com/notes/nda-biology/biodiversity-and-classification
https://www.pyqvault.com/notes/nda-biology/cell-biology
```

### Day 8

```
https://www.pyqvault.com/notes/nda-biology/ecology-and-environment
https://www.pyqvault.com/notes/nda-biology/genetics-and-evolution
https://www.pyqvault.com/notes/nda-biology/human-physiology
https://www.pyqvault.com/notes/nda-biology/microbiology-and-disease
https://www.pyqvault.com/notes/nda-biology/plant-biology
https://www.pyqvault.com/notes/nda-biology/reproduction
https://www.pyqvault.com/notes/nda-chemistry/acids-bases-salts
https://www.pyqvault.com/notes/nda-chemistry/atomic-structure
https://www.pyqvault.com/notes/nda-chemistry/carbon-and-its-compounds
https://www.pyqvault.com/notes/nda-chemistry/chemical-bonding
```

### Day 9

```
https://www.pyqvault.com/notes/nda-chemistry/chemical-reactions
https://www.pyqvault.com/notes/nda-chemistry/everyday-life
https://www.pyqvault.com/notes/nda-chemistry/hydrogen-water
https://www.pyqvault.com/notes/nda-chemistry/industrial-chemistry
https://www.pyqvault.com/notes/nda-chemistry/matter-states
https://www.pyqvault.com/notes/nda-chemistry/metals-non-metals
https://www.pyqvault.com/notes/nda-chemistry/mole-concept
https://www.pyqvault.com/notes/nda-geography/climatology
https://www.pyqvault.com/notes/nda-geography/earth-in-space
https://www.pyqvault.com/notes/nda-geography/earths-structure
```

### Day 10

```
https://www.pyqvault.com/notes/nda-geography/indian-geography-economy
https://www.pyqvault.com/notes/nda-geography/indian-geography-physical
https://www.pyqvault.com/notes/nda-geography/oceanography
https://www.pyqvault.com/notes/nda-geography/world-human-geography
https://www.pyqvault.com/notes/nda-maths/3d-geometry
https://www.pyqvault.com/notes/nda-maths/application-of-derivatives
https://www.pyqvault.com/notes/nda-maths/applications-of-integration
https://www.pyqvault.com/notes/nda-maths/binary-numbers
https://www.pyqvault.com/notes/nda-maths/binomial-distribution
https://www.pyqvault.com/notes/nda-maths/binomial-theorem
```

### Day 11

```
https://www.pyqvault.com/notes/nda-maths/circles
https://www.pyqvault.com/notes/nda-maths/complex-numbers
https://www.pyqvault.com/notes/nda-maths/conics
https://www.pyqvault.com/notes/nda-maths/definite-integration
https://www.pyqvault.com/notes/nda-maths/differential-equations
https://www.pyqvault.com/notes/nda-maths/differentiation
https://www.pyqvault.com/notes/nda-maths/functions
https://www.pyqvault.com/notes/nda-maths/height-distance
https://www.pyqvault.com/notes/nda-maths/indefinite-integration
https://www.pyqvault.com/notes/nda-maths/inverse-trigonometry
```

### Day 12

```
https://www.pyqvault.com/notes/nda-maths/limits-continuity
https://www.pyqvault.com/notes/nda-maths/lines
https://www.pyqvault.com/notes/nda-maths/logarithms
https://www.pyqvault.com/notes/nda-maths/matrices-determinants
https://www.pyqvault.com/notes/nda-maths/permutation-combination
https://www.pyqvault.com/notes/nda-maths/probability
https://www.pyqvault.com/notes/nda-maths/properties-of-triangle
https://www.pyqvault.com/notes/nda-maths/quadratic-equations
https://www.pyqvault.com/notes/nda-maths/sequence-series
https://www.pyqvault.com/notes/nda-maths/sets-relations
```

### Day 13

```
https://www.pyqvault.com/notes/nda-maths/statistics
https://www.pyqvault.com/notes/nda-maths/trigonometric-equations
https://www.pyqvault.com/notes/nda-maths/trigonometric-identities
https://www.pyqvault.com/notes/nda-maths/vectors
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism
https://www.pyqvault.com/notes/nda-physics/fluid-mechanics
https://www.pyqvault.com/notes/nda-physics/gravitation
https://www.pyqvault.com/notes/nda-physics/heat-thermodynamics
https://www.pyqvault.com/notes/nda-physics/kinematics
https://www.pyqvault.com/notes/nda-physics/laws-of-motion
```

### Day 14

```
https://www.pyqvault.com/notes/nda-physics/light-optics
https://www.pyqvault.com/notes/nda-physics/modern-physics
https://www.pyqvault.com/notes/nda-physics/oscillations-waves
https://www.pyqvault.com/notes/nda-physics/sound
https://www.pyqvault.com/notes/nda-physics/units-measurement-dimensions
https://www.pyqvault.com/notes/nda-physics/work-energy-power
https://www.pyqvault.com/questions/nda/english/vocabulary
https://www.pyqvault.com/questions/nda/english/grammar
https://www.pyqvault.com/questions/nda/mathematics/matrices-determinants
https://www.pyqvault.com/questions/nda/mathematics/trigonometric-identities
```

### Day 15

```
https://www.pyqvault.com/questions/nda/mathematics/probability
https://www.pyqvault.com/questions/nda/english/spotting-errors
https://www.pyqvault.com/blog/nda-2-2026-gat-paper-analysis
https://www.pyqvault.com/blog/nda-2-2026-maths-paper-analysis
https://www.pyqvault.com/guide/nda-english/playbooks/cloze-test
https://www.pyqvault.com/guide/nda-english/playbooks/errors-articles-pronouns-and-mixed
https://www.pyqvault.com/guide/nda-english/playbooks/errors-sentence-improvement
https://www.pyqvault.com/guide/nda-english/playbooks/errors-subject-verb-agreement
https://www.pyqvault.com/guide/nda-english/playbooks/errors-tense-and-verb-form
https://www.pyqvault.com/guide/nda-english/playbooks/errors-word-choice-prepositions-punctuation
```

### Day 16

```
https://www.pyqvault.com/guide/nda-english/playbooks/fill-in-the-blanks
https://www.pyqvault.com/guide/nda-english/playbooks/grammar-discourse-markers-and-connectors
https://www.pyqvault.com/guide/nda-english/playbooks/grammar-rules-bundle
https://www.pyqvault.com/guide/nda-english/playbooks/grammar-sentence-completion
https://www.pyqvault.com/guide/nda-english/playbooks/idioms-and-phrases
https://www.pyqvault.com/guide/nda-english/playbooks/reading-comprehension
https://www.pyqvault.com/guide/nda-english/playbooks/sentence-rearrangement
https://www.pyqvault.com/guide/nda-english/playbooks/vocab-antonyms
https://www.pyqvault.com/guide/nda-english/playbooks/vocab-confusables-and-definitions
https://www.pyqvault.com/guide/nda-english/playbooks/vocab-synonyms
```

### Day 17

```
https://www.pyqvault.com/questions/nda/english/sentence-rearrangement
https://www.pyqvault.com/questions/nda/mathematics/permutation-combination
https://www.pyqvault.com/questions/nda/mathematics/sequence-series
https://www.pyqvault.com/questions/nda/english/idioms-and-phrases
https://www.pyqvault.com/questions/nda/mathematics/inverse-trigonometry
https://www.pyqvault.com/notes/cds
https://www.pyqvault.com/notes/cds-maths
https://www.pyqvault.com/questions/nda/english/fill-in-the-blanks
https://www.pyqvault.com/questions/nda/english/reading-comprehension
https://www.pyqvault.com/questions/nda/mathematics/trigonometric-equations
```

### Day 18

```
https://www.pyqvault.com/questions/nda/english/cloze-test
https://www.pyqvault.com/notes/cds-maths/number-system
https://www.pyqvault.com/questions/cds/english/grammar
https://www.pyqvault.com/questions/cds/english/vocabulary
https://www.pyqvault.com/questions/nda/mathematics/statistics
https://www.pyqvault.com/questions/nda/mathematics/vectors
https://www.pyqvault.com/questions/cds/english/sentence-rearrangement
https://www.pyqvault.com/questions/nda/mathematics/limits-continuity
https://www.pyqvault.com/questions/nda/mathematics/lines
https://www.pyqvault.com/questions/nda/mathematics/application-of-derivatives
```

### Day 19

```
https://www.pyqvault.com/guide/nda-biology/playbooks/biochemistry
https://www.pyqvault.com/guide/nda-biology/playbooks/biodiversity-and-classification
https://www.pyqvault.com/guide/nda-biology/playbooks/cell-biology
https://www.pyqvault.com/guide/nda-biology/playbooks/ecology-and-environment
https://www.pyqvault.com/guide/nda-biology/playbooks/genetics-and-evolution
https://www.pyqvault.com/guide/nda-biology/playbooks/human-physiology
https://www.pyqvault.com/guide/nda-biology/playbooks/microbiology-and-disease
https://www.pyqvault.com/guide/nda-biology/playbooks/plant-biology
https://www.pyqvault.com/guide/nda-biology/playbooks/reproduction
https://www.pyqvault.com/guide/nda-chemistry/playbooks/acids-bases-and-salts
```

### Day 20

```
https://www.pyqvault.com/guide/nda-chemistry/playbooks/atomic-structure-and-periodic-classification
https://www.pyqvault.com/guide/nda-chemistry/playbooks/carbon-and-its-compounds
https://www.pyqvault.com/guide/nda-chemistry/playbooks/chemical-bonding
https://www.pyqvault.com/guide/nda-chemistry/playbooks/chemical-reactions
https://www.pyqvault.com/guide/nda-chemistry/playbooks/chemistry-in-everyday-life
https://www.pyqvault.com/guide/nda-chemistry/playbooks/hydrogen-and-water
https://www.pyqvault.com/guide/nda-chemistry/playbooks/industrial-and-applied-chemistry
https://www.pyqvault.com/guide/nda-chemistry/playbooks/matter-and-its-states
https://www.pyqvault.com/guide/nda-chemistry/playbooks/metals-and-non-metals
https://www.pyqvault.com/guide/nda-chemistry/playbooks/mole-concept-and-stoichiometry
```

### Day 21

```
https://www.pyqvault.com/guide/nda-chemistry/playbooks/practical-chemistry
https://www.pyqvault.com/guide/nda-geography/playbooks/climatology-atmosphere-weather
https://www.pyqvault.com/guide/nda-geography/playbooks/earth-in-space-maps
https://www.pyqvault.com/guide/nda-geography/playbooks/earths-structure-landforms
https://www.pyqvault.com/guide/nda-geography/playbooks/indian-geography-economy
https://www.pyqvault.com/guide/nda-geography/playbooks/indian-geography-physical
https://www.pyqvault.com/guide/nda-geography/playbooks/oceanography
https://www.pyqvault.com/guide/nda-geography/playbooks/world-and-human-geography
https://www.pyqvault.com/guide/nda-history/playbooks/ancient-india
https://www.pyqvault.com/guide/nda-history/playbooks/medieval-india
```

### Day 22

```
https://www.pyqvault.com/guide/nda-history/playbooks/modern-india
https://www.pyqvault.com/guide/nda-history/playbooks/world-history
https://www.pyqvault.com/guide/nda-maths/principles/am-gm-mean-inequalities
https://www.pyqvault.com/guide/nda-maths/principles/ap-three-term
https://www.pyqvault.com/guide/nda-maths/principles/binomial-coefficient-identities
https://www.pyqvault.com/guide/nda-maths/principles/compound-angle
https://www.pyqvault.com/guide/nda-maths/principles/cube-roots-of-unity
https://www.pyqvault.com/guide/nda-maths/principles/double-angle
https://www.pyqvault.com/guide/nda-maths/principles/greatest-integer-function
https://www.pyqvault.com/guide/nda-maths/principles/inclusion-exclusion
```

### Day 23

```
https://www.pyqvault.com/guide/nda-maths/principles/modulus-absolute-value
https://www.pyqvault.com/guide/nda-maths/principles/piecewise-defined-functions
https://www.pyqvault.com/guide/nda-maths/principles/sine-cosine-rules
https://www.pyqvault.com/guide/nda-maths/principles/vieta-symmetric-roots
https://www.pyqvault.com/guide/nda-physics/playbooks/astronomy-and-space
https://www.pyqvault.com/guide/nda-physics/playbooks/electricity-and-magnetism
https://www.pyqvault.com/guide/nda-physics/playbooks/energy-sources
https://www.pyqvault.com/guide/nda-physics/playbooks/fluid-mechanics-and-properties-of-matter
https://www.pyqvault.com/guide/nda-physics/playbooks/gravitation
https://www.pyqvault.com/guide/nda-physics/playbooks/heat-and-thermodynamics
```

### Day 24

```
https://www.pyqvault.com/guide/nda-physics/playbooks/kinematics-and-motion
https://www.pyqvault.com/guide/nda-physics/playbooks/laws-of-motion-and-forces
https://www.pyqvault.com/guide/nda-physics/playbooks/light-and-optics
https://www.pyqvault.com/guide/nda-physics/playbooks/modern-physics
https://www.pyqvault.com/guide/nda-physics/playbooks/oscillations-and-waves
https://www.pyqvault.com/guide/nda-physics/playbooks/sound
https://www.pyqvault.com/guide/nda-physics/playbooks/units-measurement-and-dimensions
https://www.pyqvault.com/guide/nda-physics/playbooks/work-energy-and-power
https://www.pyqvault.com/guide/nda-polity/playbooks/fundamental-rights-dpsp-local
https://www.pyqvault.com/guide/nda-polity/playbooks/government-structure
```

### Day 25

```
https://www.pyqvault.com/guide/nda-polity/playbooks/indian-constitution
https://www.pyqvault.com/guide/nda-polity/playbooks/world-polity
https://www.pyqvault.com/questions/nda/mathematics/functions
https://www.pyqvault.com/questions/nda/mathematics/3d-geometry
https://www.pyqvault.com/questions/nda/geography/climatology-atmosphere-and-weather
https://www.pyqvault.com/questions/nda/mathematics/differentiation
https://www.pyqvault.com/questions/nda/history/modern-india
https://www.pyqvault.com/questions/nda/mathematics/differential-equations
https://www.pyqvault.com/questions/cds/english/spotting-errors
https://www.pyqvault.com/questions/nda/mathematics/definite-integration
```

### Day 26

```
https://www.pyqvault.com/questions/nda/mathematics/complex-numbers
https://www.pyqvault.com/questions/cds/english/reading-comprehension
https://www.pyqvault.com/questions/nda/geography/earth-s-structure-landforms-and-geological-time
https://www.pyqvault.com/questions/nda/mathematics/sets-relations
https://www.pyqvault.com/questions/nda/mathematics/conics
https://www.pyqvault.com/questions/nda/physics/electricity-and-magnetism
https://www.pyqvault.com/questions/nda/mathematics/quadratic-equations
https://www.pyqvault.com/questions/nda/physics/light-and-optics
https://www.pyqvault.com/questions/cds/mathematics/trigonometric-ratios-and-identities
https://www.pyqvault.com/questions/nda/geography/indian-geography-physical-features
```

### Day 27

```
https://www.pyqvault.com/questions/nda/mathematics/binomial-theorem
https://www.pyqvault.com/questions/cds/english/cloze-test
https://www.pyqvault.com/questions/nda/mathematics/indefinite-integration
https://www.pyqvault.com/questions/nda/mathematics/circles
https://www.pyqvault.com/questions/nda/mathematics/properties-of-triangle
https://www.pyqvault.com/questions/cds/english/idioms-and-phrases
https://www.pyqvault.com/questions/nda/biology/human-physiology
https://www.pyqvault.com/questions/nda/history/ancient-india
https://www.pyqvault.com/questions/nda/geography/indian-geography-economy-resources-and-transport
https://www.pyqvault.com/questions/nda/polity/government-structure-parliament-judiciary-and-constitutional-bodies
```

### Day 28

```
https://www.pyqvault.com/questions/nda/mathematics/applications-of-integration
https://www.pyqvault.com/questions/nda/chemistry/acids-bases-and-salts
https://www.pyqvault.com/questions/nda/chemistry/carbon-and-its-compounds
https://www.pyqvault.com/mock/exam/nda
https://www.pyqvault.com/mock/exam/nda/past-papers
https://www.pyqvault.com/mock/exam/nda/practice
https://www.pyqvault.com/questions/nda/history/medieval-india
https://www.pyqvault.com/questions/nda/mathematics/binomial-distribution
https://www.pyqvault.com/questions/nda/geography/world-and-human-geography
https://www.pyqvault.com/questions/nda/chemistry/atomic-structure-and-periodic-classification
```

### Day 29

```
https://www.pyqvault.com/guide/mht-cet-maths/strategy
https://www.pyqvault.com/questions/nda/biology/cell-biology
https://www.pyqvault.com/questions/nda/current-affairs/government-schemes-policy-and-governance
https://www.pyqvault.com/questions/nda/geography/oceanography
https://www.pyqvault.com/questions/nda/physics/heat-and-thermodynamics
https://www.pyqvault.com/questions/nda/current-affairs/defence-and-military-exercises
https://www.pyqvault.com/questions/nda/physics/laws-of-motion-and-forces
https://www.pyqvault.com/questions/nda/mathematics/logarithms
https://www.pyqvault.com/questions/nda/chemistry/matter-and-its-states
https://www.pyqvault.com/questions/nda/chemistry/chemical-reactions
```

### Day 30

```
https://www.pyqvault.com/questions/nda/current-affairs/international-affairs-and-relations
https://www.pyqvault.com/questions/nda/current-affairs/science-and-technology
https://www.pyqvault.com/questions/nda/mathematics/height-distance
https://www.pyqvault.com/questions/nda/physics/modern-physics
https://www.pyqvault.com/questions/nda/biology/plant-biology
https://www.pyqvault.com/questions/nda/polity/indian-constitution-making-foundation-and-amendments
https://www.pyqvault.com/questions/nda/chemistry/metals-and-non-metals
https://www.pyqvault.com/questions/nda/physics/sound
https://www.pyqvault.com/questions/nda/biology/microbiology-and-disease
https://www.pyqvault.com/questions/nda/geography/earth-in-space-maps-and-coordinates
```

### Day 31

```
https://www.pyqvault.com/questions/nda/physics/kinematics-and-motion
https://www.pyqvault.com/questions/nda/current-affairs/national-events-persons-and-india-general-knowledge
https://www.pyqvault.com/questions/nda/history/world-history
https://www.pyqvault.com/questions/nda/chemistry/industrial-and-applied-chemistry
https://www.pyqvault.com/questions/nda/physics/fluid-mechanics-and-properties-of-matter
https://www.pyqvault.com/questions/nda/physics/work-energy-and-power
https://www.pyqvault.com/questions/nda/polity/fundamental-rights-dpsp-and-local-governance
https://www.pyqvault.com/questions/nda/current-affairs/sports
https://www.pyqvault.com/questions/nda/physics/gravitation
https://www.pyqvault.com/questions/nda/current-affairs/awards-honours-books-and-culture
```

### Day 32

```
https://www.pyqvault.com/questions/nda/economics/indian-economy
https://www.pyqvault.com/questions/cds/english/fill-in-the-blanks
https://www.pyqvault.com/guide/mht-cet
https://www.pyqvault.com/guide/mht-cet-maths
https://www.pyqvault.com/notes/mht-cet
https://www.pyqvault.com/notes/mht-cet-chemistry
https://www.pyqvault.com/notes/mht-cet-maths
https://www.pyqvault.com/questions/nda/biology/reproduction
https://www.pyqvault.com/questions/nda/polity/world-polity-democracy-and-international-relations
https://www.pyqvault.com/questions/cds/mathematics/sequence-and-series
```

### Day 33

```
https://www.pyqvault.com/questions/cds/mathematics/number-system
https://www.pyqvault.com/questions/cds/mathematics/mensuration-2d
https://www.pyqvault.com/questions/cds/history/modern-india
https://www.pyqvault.com/questions/cds/mathematics/mensuration-3d
https://www.pyqvault.com/notes/mht-cet-chemistry/chemical-bonding
https://www.pyqvault.com/notes/mht-cet-chemistry/ionic-equilibria
https://www.pyqvault.com/notes/mht-cet-chemistry/some-basic-concepts
https://www.pyqvault.com/notes/mht-cet-chemistry/states-of-matter
https://www.pyqvault.com/notes/mht-cet-chemistry/structure-of-atom
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative
```

### Day 34

```
https://www.pyqvault.com/notes/mht-cet-maths/binomial-distribution
https://www.pyqvault.com/notes/mht-cet-maths/differential-equations
https://www.pyqvault.com/notes/mht-cet-maths/differentiation
https://www.pyqvault.com/notes/mht-cet-maths/indefinite-integration
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane
https://www.pyqvault.com/notes/mht-cet-maths/probability-distribution
https://www.pyqvault.com/notes/mht-cet-maths/vectors
https://www.pyqvault.com/questions/cds/mathematics/triangles
https://www.pyqvault.com/questions/cds/polity/government-structure-parliament-judiciary-and-constitutional-bodies
https://www.pyqvault.com/questions/cds/history/ancient-india
```

### Day 35

```
https://www.pyqvault.com/questions/cds/geography/indian-geography-physical-features
https://www.pyqvault.com/questions/cds/history/medieval-india
https://www.pyqvault.com/mock/exam/cds
https://www.pyqvault.com/mock/exam/cds/past-papers
https://www.pyqvault.com/questions/cds/mathematics/algebraic-identities-and-simplification
https://www.pyqvault.com/guide/mht-cet-maths/formulas
https://www.pyqvault.com/guide/mht-cet-maths/playbooks
https://www.pyqvault.com/guide/mht-cet-maths/traps
https://www.pyqvault.com/guide/mht-cet-maths/trends
https://www.pyqvault.com/questions/cds/geography/indian-geography-economy-resources-and-transport
```

### Day 36

```
https://www.pyqvault.com/questions/cds/mathematics/quadratic-equations
https://www.pyqvault.com/questions/cds/current-affairs/government-schemes-policy-and-governance
https://www.pyqvault.com/questions/cds/mathematics/surds-indices-and-simplification
https://www.pyqvault.com/questions/cds/polity/indian-constitution-making-foundation-and-amendments
https://www.pyqvault.com/questions/cds/mathematics/polynomials
https://www.pyqvault.com/questions/cds/mathematics/statistics
https://www.pyqvault.com/questions/cds/economics/national-income-growth-and-development-indicators
https://www.pyqvault.com/questions/cds/mathematics/ratio-proportion-and-variation
https://www.pyqvault.com/questions/cds/current-affairs/defence-and-military-exercises
https://www.pyqvault.com/questions/cds/mathematics/time-speed-and-distance
```

### Day 37

```
https://www.pyqvault.com/questions/cds/economics/money-banking-and-public-finance
https://www.pyqvault.com/questions/cds/polity/fundamental-rights-dpsp-and-local-governance
https://www.pyqvault.com/questions/cds/mathematics/circles
https://www.pyqvault.com/questions/cds/current-affairs/international-affairs-and-relations
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/determinants-and-matrices
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/permutations-and-combinations
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/probability-distribution
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/trigonometric-functions
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/trigonometry-i
https://www.pyqvault.com/questions/cds/geography/world-and-human-geography
```

### Day 38

```
https://www.pyqvault.com/questions/cds/geography/earth-s-structure-landforms-and-geological-time
https://www.pyqvault.com/questions/cds/geography/climatology-atmosphere-and-weather
https://www.pyqvault.com/questions/cds/mathematics/data-interpretation
https://www.pyqvault.com/questions/cds/polity/world-polity-democracy-and-international-relations
https://www.pyqvault.com/questions/cds/mathematics/percentage-profit-and-loss
https://www.pyqvault.com/questions/cds/mathematics/quadrilaterals
https://www.pyqvault.com/questions/cds/mathematics/time-and-work
https://www.pyqvault.com/questions/cds/mathematics/averages
https://www.pyqvault.com/questions/cds/biology/human-physiology
https://www.pyqvault.com/questions/cds/current-affairs/awards-honours-books-and-culture
```

### Day 39

```
https://www.pyqvault.com/questions/cds/physics/light-and-optics
https://www.pyqvault.com/questions/cds/mathematics/linear-equations
https://www.pyqvault.com/questions/cds/physics/electricity-and-magnetism
https://www.pyqvault.com/questions/cds/mathematics/heights-and-distances
https://www.pyqvault.com/questions/cds/current-affairs/environment-ecology-and-energy
https://www.pyqvault.com/questions/cds/biology/cell-biology
https://www.pyqvault.com/questions/cds/current-affairs/sports
https://www.pyqvault.com/questions/cds/chemistry/acids-bases-and-salts
https://www.pyqvault.com/questions/mht-cet/maths/trigonometric-functions
https://www.pyqvault.com/questions/cds/mathematics/simple-and-compound-interest
```

### Day 40

```
https://www.pyqvault.com/questions/cds/economics/microeconomics-demand-supply-and-market-structure
https://www.pyqvault.com/questions/cds/mathematics/logarithms
https://www.pyqvault.com/questions/cds/biology/plant-biology
https://www.pyqvault.com/questions/cds/economics/indian-economy
https://www.pyqvault.com/questions/cds/current-affairs/science-and-technology
https://www.pyqvault.com/questions/cds/chemistry/atomic-structure-and-periodic-classification
https://www.pyqvault.com/questions/cds/current-affairs/national-events-persons-and-india-general-knowledge
https://www.pyqvault.com/questions/cds/mathematics/sets
https://www.pyqvault.com/questions/mht-cet/maths/probability-distribution
https://www.pyqvault.com/questions/cds/mathematics/lines-angles-and-polygons
```

### Day 41

```
https://www.pyqvault.com/questions/cds/chemistry/metals-and-non-metals
https://www.pyqvault.com/questions/cds/biology/biodiversity-and-classification
https://www.pyqvault.com/questions/cds/chemistry/carbon-and-its-compounds
https://www.pyqvault.com/questions/cds/geography/oceanography
https://www.pyqvault.com/questions/cds/biology/ecology-and-environment
https://www.pyqvault.com/questions/cds/chemistry/matter-and-its-states
https://www.pyqvault.com/questions/cds/geography/earth-in-space-maps-and-coordinates
https://www.pyqvault.com/questions/cds/physics/electronics-and-computer-fundamentals
https://www.pyqvault.com/questions/mht-cet/maths/trigonometry-i
https://www.pyqvault.com/questions/cds/biology/microbiology-and-disease
```

### Day 42

```
https://www.pyqvault.com/questions/cds/chemistry/chemical-reactions
https://www.pyqvault.com/questions/cds/physics/kinematics-and-motion
https://www.pyqvault.com/questions/cds/physics/sound
https://www.pyqvault.com/questions/cds/history/world-history
https://www.pyqvault.com/questions/mht-cet/maths/determinants-and-matrices
https://www.pyqvault.com/questions/mht-cet/maths/permutations-and-combinations
https://www.pyqvault.com/questions/mht-cet/maths/trigonometry-ii
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/applications-of-definite-integral
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/applications-of-derivative
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/binomial-distribution
```

### Day 43

```
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/circle
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/complex-numbers
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/definite-integration
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/differential-equations
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/differentiation
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/indefinite-integration
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/limits
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/line-and-plane
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/linear-programming
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/mathematical-logic
```

### Day 44

```
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/pair-of-straight-lines
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/straight-line
https://www.pyqvault.com/guide/mht-cet-maths/playbooks/vectors
https://www.pyqvault.com/questions/mht-cet/maths/vectors
https://www.pyqvault.com/questions/mht-cet/maths/line-and-plane
https://www.pyqvault.com/questions/mht-cet/maths/applications-of-derivative
https://www.pyqvault.com/questions/mht-cet/physics/electrostatics
https://www.pyqvault.com/questions/mht-cet/maths/indefinite-integration
https://www.pyqvault.com/questions/mht-cet/maths/differential-equations
https://www.pyqvault.com/questions/mht-cet/maths/differentiation
```

### Day 45

```
https://www.pyqvault.com/questions/mht-cet/chemistry/solutions-and-colligative-properties
https://www.pyqvault.com/questions/mht-cet/physics/ac-circuits
https://www.pyqvault.com/questions/mht-cet/chemistry/chemical-kinetics
https://www.pyqvault.com/questions/mht-cet/physics/rotational-dynamics
https://www.pyqvault.com/questions/mht-cet/chemistry/solid-state
https://www.pyqvault.com/questions/mht-cet/physics/semiconductor-devices
https://www.pyqvault.com/questions/mht-cet/chemistry/alcohols-phenols-and-ethers
https://www.pyqvault.com/questions/mht-cet/physics/wave-optics
https://www.pyqvault.com/questions/mht-cet/chemistry/electrochemistry
https://www.pyqvault.com/questions/mht-cet/physics/mechanical-properties-of-fluids
```

### Day 46

```
https://www.pyqvault.com/questions/mht-cet/physics/superposition-of-waves
https://www.pyqvault.com/questions/mht-cet/chemistry/chemical-thermodynamics-and-energetics
https://www.pyqvault.com/questions/mht-cet/chemistry/ionic-equilibria
https://www.pyqvault.com/questions/mht-cet/physics/electromagnetic-induction
https://www.pyqvault.com/questions/mht-cet/chemistry/some-basic-concepts-of-chemistry
https://www.pyqvault.com/questions/mht-cet/physics/oscillations
https://www.pyqvault.com/questions/mht-cet/chemistry/aldehydes-ketones-and-carboxylic-acids
https://www.pyqvault.com/questions/mht-cet/physics/magnetic-fields-due-to-electric-current
https://www.pyqvault.com/mock/exam/mht-cet
https://www.pyqvault.com/mock/exam/mht-cet/past-papers
```

### Day 47

```
https://www.pyqvault.com/questions/mht-cet/chemistry/coordination-compounds
https://www.pyqvault.com/questions/mht-cet/maths/limits
https://www.pyqvault.com/questions/mht-cet/physics/current-electricity
https://www.pyqvault.com/questions/mht-cet/chemistry/biomolecules
https://www.pyqvault.com/questions/mht-cet/physics/structure-of-atoms-and-nuclei
https://www.pyqvault.com/questions/mht-cet/physics/thermal-properties-of-matter
https://www.pyqvault.com/questions/mht-cet/chemistry/introduction-to-polymer-chemistry
https://www.pyqvault.com/questions/mht-cet/maths/mathematical-logic
https://www.pyqvault.com/questions/mht-cet/physics/dual-nature-of-radiation-and-matter
https://www.pyqvault.com/questions/mht-cet/chemistry/amines
```

### Day 48

```
https://www.pyqvault.com/questions/mht-cet/physics/kinetic-theory-of-gases
https://www.pyqvault.com/questions/mht-cet/physics/thermodynamics
https://www.pyqvault.com/questions/mht-cet/physics/gravitation
https://www.pyqvault.com/questions/mht-cet/chemistry/halogen-derivatives-of-alkanes
https://www.pyqvault.com/questions/mht-cet/physics/optics-ray
https://www.pyqvault.com/questions/mht-cet/chemistry/transition-and-inner-transition-elements
https://www.pyqvault.com/questions/mht-cet/maths/definite-integration
https://www.pyqvault.com/questions/mht-cet/chemistry/structure-of-atom
https://www.pyqvault.com/questions/mht-cet/chemistry/chemical-bonding-and-molecular-structure
https://www.pyqvault.com/questions/mht-cet/maths/binomial-distribution
```

### Day 49

```
https://www.pyqvault.com/questions/mht-cet/physics/motion-in-a-plane
https://www.pyqvault.com/questions/mht-cet/chemistry/elements-of-group-16-17-and-18
https://www.pyqvault.com/questions/mht-cet/physics/sound
https://www.pyqvault.com/questions/mht-cet/chemistry/redox-reactions
https://www.pyqvault.com/questions/mht-cet/physics/laws-of-motion
https://www.pyqvault.com/questions/mht-cet/maths/applications-of-definite-integral
https://www.pyqvault.com/questions/mht-cet/maths/circle
https://www.pyqvault.com/questions/mht-cet/maths/complex-numbers
https://www.pyqvault.com/questions/mht-cet/maths/linear-programming
https://www.pyqvault.com/questions/mht-cet/maths/straight-line
```

### Day 50

```
https://www.pyqvault.com/questions/mht-cet/maths/pair-of-straight-lines
https://www.pyqvault.com/questions/mht-cet/maths/sets-relations-and-functions
https://www.pyqvault.com/questions/mht-cet/chemistry/surface-chemistry
https://www.pyqvault.com/questions/mht-cet/chemistry/basic-principles-of-organic-chemistry
https://www.pyqvault.com/questions/mht-cet/chemistry/elements-of-group-1-and-2
https://www.pyqvault.com/questions/mht-cet/chemistry/modern-periodic-table
https://www.pyqvault.com/questions/mht-cet/chemistry/alkenes
https://www.pyqvault.com/questions/mht-cet/chemistry/aromatic-compounds
https://www.pyqvault.com/questions/mht-cet/chemistry/alkanes
https://www.pyqvault.com/questions/mht-cet/physics/magnetic-materials
```

### Day 51

```
https://www.pyqvault.com/questions/mht-cet/chemistry/green-chemistry-and-nanochemistry
https://www.pyqvault.com/questions/mht-cet/chemistry/states-of-matter
https://www.pyqvault.com/questions/mht-cet/maths/measures-of-dispersion
https://www.pyqvault.com/questions/mht-cet/maths/conic-sections
https://www.pyqvault.com/questions/mht-cet/physics/units-and-measurement
https://www.pyqvault.com/notes/nda-biology/biochemistry/biochem-food-spoilage
https://www.pyqvault.com/notes/nda-biology/biochemistry/biochem-protein-structure
https://www.pyqvault.com/notes/nda-biology/biochemistry/biochem-respiration-fermentation
https://www.pyqvault.com/notes/nda-biology/biodiversity-and-classification/biodiv-animal-kingdom
https://www.pyqvault.com/notes/nda-biology/biodiversity-and-classification/biodiv-fungi
```

### Day 52

```
https://www.pyqvault.com/notes/nda-biology/biodiversity-and-classification/biodiv-plant-kingdom
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-division-replication
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-microscopy
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-organelles
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-osmosis-tonicity
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-prokaryotic-eukaryotic
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-respiration-atp
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-structure-fundamentals
https://www.pyqvault.com/notes/nda-biology/cell-biology/cell-wall-and-membrane
https://www.pyqvault.com/notes/nda-biology/ecology-and-environment/eco-ecosystems
```

### Day 53

```
https://www.pyqvault.com/notes/nda-biology/ecology-and-environment/eco-environment-biodiversity
https://www.pyqvault.com/notes/nda-biology/genetics-and-evolution/gen-evolution
https://www.pyqvault.com/notes/nda-biology/genetics-and-evolution/gen-heredity-dna
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-circulation
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-digestion
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-endocrine
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-excretion-reproduction
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-immune
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-nervous
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-nutrition
```

### Day 54

```
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-respiration
https://www.pyqvault.com/notes/nda-biology/human-physiology/hp-tissues
https://www.pyqvault.com/notes/nda-biology/microbiology-and-disease/micro-antibiotics-discovery
https://www.pyqvault.com/notes/nda-biology/microbiology-and-disease/micro-disease-vectors-malaria
https://www.pyqvault.com/notes/nda-biology/microbiology-and-disease/micro-pathogens-and-diseases
https://www.pyqvault.com/notes/nda-biology/plant-biology/plant-photosynthesis
https://www.pyqvault.com/notes/nda-biology/plant-biology/plant-processes
https://www.pyqvault.com/notes/nda-biology/plant-biology/plant-seed-fruit-embryo
https://www.pyqvault.com/notes/nda-biology/plant-biology/plant-tissues-meristems
https://www.pyqvault.com/notes/nda-biology/plant-biology/plant-vegetative-propagation
```

### Day 55

```
https://www.pyqvault.com/notes/nda-biology/reproduction/repro-angiosperm
https://www.pyqvault.com/notes/nda-biology/reproduction/repro-animal-human
https://www.pyqvault.com/notes/nda-biology/reproduction/repro-genetic-principles
https://www.pyqvault.com/notes/nda-biology/reproduction/repro-meiosis-plants
https://www.pyqvault.com/notes/nda-chemistry/acids-bases-salts/acid-acid-base-theory
https://www.pyqvault.com/notes/nda-chemistry/acids-bases-salts/acid-common-acids
https://www.pyqvault.com/notes/nda-chemistry/acids-bases-salts/acid-ph-scale
https://www.pyqvault.com/notes/nda-chemistry/acids-bases-salts/acid-salts
https://www.pyqvault.com/notes/nda-chemistry/acids-bases-salts/acid-water-of-crystallization
https://www.pyqvault.com/notes/nda-chemistry/atomic-structure/atom-electron-config
```

### Day 56

```
https://www.pyqvault.com/notes/nda-chemistry/atomic-structure/atom-isotopes
https://www.pyqvault.com/notes/nda-chemistry/atomic-structure/atom-models
https://www.pyqvault.com/notes/nda-chemistry/atomic-structure/atom-particles
https://www.pyqvault.com/notes/nda-chemistry/atomic-structure/atom-periodic-trends
https://www.pyqvault.com/notes/nda-chemistry/carbon-and-its-compounds/carb-allotropes
https://www.pyqvault.com/notes/nda-chemistry/carbon-and-its-compounds/carb-catenation
https://www.pyqvault.com/notes/nda-chemistry/carbon-and-its-compounds/carb-common-compounds
https://www.pyqvault.com/notes/nda-chemistry/carbon-and-its-compounds/carb-functional-groups
https://www.pyqvault.com/notes/nda-chemistry/carbon-and-its-compounds/carb-hydrocarbons
https://www.pyqvault.com/notes/nda-chemistry/carbon-and-its-compounds/carb-soaps
```

### Day 57

```
https://www.pyqvault.com/notes/nda-chemistry/chemical-bonding/bond-counting
https://www.pyqvault.com/notes/nda-chemistry/chemical-bonding/bond-ionic-covalent
https://www.pyqvault.com/notes/nda-chemistry/chemical-bonding/bond-valency-formula
https://www.pyqvault.com/notes/nda-chemistry/chemical-reactions/rxn-decomposition
https://www.pyqvault.com/notes/nda-chemistry/chemical-reactions/rxn-physical-chemical
https://www.pyqvault.com/notes/nda-chemistry/chemical-reactions/rxn-redox
https://www.pyqvault.com/notes/nda-chemistry/chemical-reactions/rxn-specific
https://www.pyqvault.com/notes/nda-chemistry/chemical-reactions/rxn-thermochemistry
https://www.pyqvault.com/notes/nda-chemistry/chemical-reactions/rxn-types
https://www.pyqvault.com/notes/nda-chemistry/everyday-life/life-common-chemicals
```

### Day 58

```
https://www.pyqvault.com/notes/nda-chemistry/everyday-life/life-medicines
https://www.pyqvault.com/notes/nda-chemistry/hydrogen-water/hyd-hardness-of-water
https://www.pyqvault.com/notes/nda-chemistry/hydrogen-water/hyd-properties-of-hydrogen
https://www.pyqvault.com/notes/nda-chemistry/hydrogen-water/hyd-properties-of-water
https://www.pyqvault.com/notes/nda-chemistry/industrial-chemistry/ind-alloys
https://www.pyqvault.com/notes/nda-chemistry/industrial-chemistry/ind-cement-glass
https://www.pyqvault.com/notes/nda-chemistry/industrial-chemistry/ind-fertilizers
https://www.pyqvault.com/notes/nda-chemistry/industrial-chemistry/ind-gases
https://www.pyqvault.com/notes/nda-chemistry/industrial-chemistry/ind-paints
https://www.pyqvault.com/notes/nda-chemistry/matter-states/matt-changes
```

### Day 59

```
https://www.pyqvault.com/notes/nda-chemistry/matter-states/matt-colloids
https://www.pyqvault.com/notes/nda-chemistry/matter-states/matt-mixtures
https://www.pyqvault.com/notes/nda-chemistry/matter-states/matt-separation
https://www.pyqvault.com/notes/nda-chemistry/matter-states/matt-states
https://www.pyqvault.com/notes/nda-chemistry/metals-non-metals/met-alloys
https://www.pyqvault.com/notes/nda-chemistry/metals-non-metals/met-corrosion
https://www.pyqvault.com/notes/nda-chemistry/metals-non-metals/met-extraction
https://www.pyqvault.com/notes/nda-chemistry/metals-non-metals/met-reactivity-series
https://www.pyqvault.com/notes/nda-chemistry/mole-concept/mole-molar-calculations
https://www.pyqvault.com/notes/nda-chemistry/mole-concept/mole-stoichiometry-laws
```

### Day 60

```
https://www.pyqvault.com/notes/nda-geography/climatology/clim-climate-zones
https://www.pyqvault.com/notes/nda-geography/climatology/clim-cyclones
https://www.pyqvault.com/notes/nda-geography/climatology/clim-humidity
https://www.pyqvault.com/notes/nda-geography/climatology/clim-insolation
https://www.pyqvault.com/notes/nda-geography/climatology/clim-layers
https://www.pyqvault.com/notes/nda-geography/climatology/clim-pressure-winds
https://www.pyqvault.com/notes/nda-geography/earth-in-space/eis-latitude-longitude-grid
https://www.pyqvault.com/notes/nda-geography/earth-in-space/eis-maps-gps
https://www.pyqvault.com/notes/nda-geography/earth-in-space/eis-planets-solar-system
https://www.pyqvault.com/notes/nda-geography/earth-in-space/eis-shape-rotation-motion
```

### Day 61

```
https://www.pyqvault.com/notes/nda-geography/earth-in-space/eis-time-zones-idl
https://www.pyqvault.com/notes/nda-geography/earths-structure/esl-earthquakes-seismic
https://www.pyqvault.com/notes/nda-geography/earths-structure/esl-interior-plate-tectonics
https://www.pyqvault.com/notes/nda-geography/earths-structure/esl-landforms-mass-movements
https://www.pyqvault.com/notes/nda-geography/earths-structure/esl-rocks-minerals-time
https://www.pyqvault.com/notes/nda-geography/earths-structure/esl-soils
https://www.pyqvault.com/notes/nda-geography/earths-structure/esl-volcanoes-igneous
https://www.pyqvault.com/notes/nda-geography/earths-structure/esl-weathering-denudation
https://www.pyqvault.com/notes/nda-geography/indian-geography-economy/ige-agriculture-crops-soils
https://www.pyqvault.com/notes/nda-geography/indian-geography-economy/ige-economic-sectors-schemes
```

### Day 62

```
https://www.pyqvault.com/notes/nda-geography/indian-geography-economy/ige-energy-industries
https://www.pyqvault.com/notes/nda-geography/indian-geography-economy/ige-highways-railways-transport
https://www.pyqvault.com/notes/nda-geography/indian-geography-economy/ige-minerals-mining
https://www.pyqvault.com/notes/nda-geography/indian-geography-economy/ige-ports-maritime
https://www.pyqvault.com/notes/nda-geography/indian-geography-physical/igp-forests-natural-vegetation
https://www.pyqvault.com/notes/nda-geography/indian-geography-physical/igp-location-extent-frontiers
https://www.pyqvault.com/notes/nda-geography/indian-geography-physical/igp-mountains-plateaus-plains
https://www.pyqvault.com/notes/nda-geography/indian-geography-physical/igp-rivers-lakes-water-bodies
https://www.pyqvault.com/notes/nda-geography/indian-geography-physical/igp-soils-climate-agriculture
https://www.pyqvault.com/notes/nda-geography/indian-geography-physical/igp-states-and-islands
```

### Day 63

```
https://www.pyqvault.com/notes/nda-geography/oceanography/ocn-currents
https://www.pyqvault.com/notes/nda-geography/oceanography/ocn-marine-ecosystems
https://www.pyqvault.com/notes/nda-geography/oceanography/ocn-tides-movements
https://www.pyqvault.com/notes/nda-geography/oceanography/ocn-waves-seafloor
https://www.pyqvault.com/notes/nda-geography/world-human-geography/whg-coordinates-time
https://www.pyqvault.com/notes/nda-geography/world-human-geography/whg-megacities-population
https://www.pyqvault.com/notes/nda-geography/world-human-geography/whg-rivers-canals-water
https://www.pyqvault.com/notes/nda-maths/3d-geometry/coordinates-distance-section
https://www.pyqvault.com/notes/nda-maths/3d-geometry/direction-cosines-ratios
https://www.pyqvault.com/notes/nda-maths/3d-geometry/plane-3d
```

### Day 64

```
https://www.pyqvault.com/notes/nda-maths/3d-geometry/sphere-3d
https://www.pyqvault.com/notes/nda-maths/3d-geometry/straight-line-3d
https://www.pyqvault.com/notes/nda-maths/application-of-derivatives/aod-monotonicity-extrema
https://www.pyqvault.com/notes/nda-maths/application-of-derivatives/aod-optimisation
https://www.pyqvault.com/notes/nda-maths/application-of-derivatives/aod-tangents
https://www.pyqvault.com/notes/nda-maths/applications-of-integration/aoi-area-between-curves
https://www.pyqvault.com/notes/nda-maths/applications-of-integration/aoi-area-bounded-by-curve
https://www.pyqvault.com/notes/nda-maths/binary-numbers/bin-arithmetic
https://www.pyqvault.com/notes/nda-maths/binary-numbers/bin-representation-number-theory
https://www.pyqvault.com/notes/nda-maths/binary-numbers/bin-to-decimal-conversion
```

### Day 65

```
https://www.pyqvault.com/notes/nda-maths/binomial-distribution/bd-computing-probabilities
https://www.pyqvault.com/notes/nda-maths/binomial-distribution/bd-mean-variance
https://www.pyqvault.com/notes/nda-maths/binomial-theorem/bt-coefficient-sums
https://www.pyqvault.com/notes/nda-maths/binomial-theorem/bt-coefficients-terms
https://www.pyqvault.com/notes/nda-maths/binomial-theorem/bt-integer-fractional-parts
https://www.pyqvault.com/notes/nda-maths/binomial-theorem/bt-remainders-divisibility
https://www.pyqvault.com/notes/nda-maths/circles/circ-equation-centre-radius
https://www.pyqvault.com/notes/nda-maths/circles/circ-inscribed-tangents-segments
https://www.pyqvault.com/notes/nda-maths/circles/circ-through-points-concyclicity
https://www.pyqvault.com/notes/nda-maths/complex-numbers/cn-cube-roots-unity
```

### Day 66

```
https://www.pyqvault.com/notes/nda-maths/complex-numbers/cn-modulus-argument
https://www.pyqvault.com/notes/nda-maths/complex-numbers/cn-powers-roots
https://www.pyqvault.com/notes/nda-maths/conics/conics-ellipse
https://www.pyqvault.com/notes/nda-maths/conics/conics-hyperbola
https://www.pyqvault.com/notes/nda-maths/conics/conics-identification
https://www.pyqvault.com/notes/nda-maths/conics/conics-parabola
https://www.pyqvault.com/notes/nda-maths/definite-integration/defint-area
https://www.pyqvault.com/notes/nda-maths/definite-integration/defint-ftc
https://www.pyqvault.com/notes/nda-maths/definite-integration/defint-function-conditions
https://www.pyqvault.com/notes/nda-maths/definite-integration/defint-piecewise
```

### Day 67

```
https://www.pyqvault.com/notes/nda-maths/definite-integration/defint-properties
https://www.pyqvault.com/notes/nda-maths/differential-equations/defeq-formation
https://www.pyqvault.com/notes/nda-maths/differential-equations/defeq-order-degree
https://www.pyqvault.com/notes/nda-maths/differential-equations/defeq-solving
https://www.pyqvault.com/notes/nda-maths/differentiation/diff-core-techniques
https://www.pyqvault.com/notes/nda-maths/differentiation/diff-differentiability
https://www.pyqvault.com/notes/nda-maths/differentiation/diff-parametric-implicit-higher
https://www.pyqvault.com/notes/nda-maths/functions/funcs-composition-inverse
https://www.pyqvault.com/notes/nda-maths/functions/funcs-definition-classification
https://www.pyqvault.com/notes/nda-maths/functions/funcs-domain-range-properties
```

### Day 68

```
https://www.pyqvault.com/notes/nda-maths/functions/funcs-functional-equations
https://www.pyqvault.com/notes/nda-maths/functions/funcs-greatest-integer
https://www.pyqvault.com/notes/nda-maths/height-distance/hd-angles-of-elevation
https://www.pyqvault.com/notes/nda-maths/height-distance/hd-shadows-and-special
https://www.pyqvault.com/notes/nda-maths/indefinite-integration/ii-by-parts
https://www.pyqvault.com/notes/nda-maths/indefinite-integration/ii-partial-fractions
https://www.pyqvault.com/notes/nda-maths/indefinite-integration/ii-standard-forms
https://www.pyqvault.com/notes/nda-maths/indefinite-integration/ii-substitution
https://www.pyqvault.com/notes/nda-maths/inverse-trigonometry/it-composite-evaluation
https://www.pyqvault.com/notes/nda-maths/inverse-trigonometry/it-identities-properties
```

### Day 69

```
https://www.pyqvault.com/notes/nda-maths/inverse-trigonometry/it-solving-equations
https://www.pyqvault.com/notes/nda-maths/limits-continuity/lim-continuity
https://www.pyqvault.com/notes/nda-maths/limits-continuity/lim-evaluation
https://www.pyqvault.com/notes/nda-maths/limits-continuity/lim-one-sided-special
https://www.pyqvault.com/notes/nda-maths/lines/lines-angle-parallel-perp
https://www.pyqvault.com/notes/nda-maths/lines/lines-distance-section-locus
https://www.pyqvault.com/notes/nda-maths/lines/lines-equation-slope
https://www.pyqvault.com/notes/nda-maths/lines/lines-triangles-polygons
https://www.pyqvault.com/notes/nda-maths/logarithms/log-identities-change-of-base-sums
https://www.pyqvault.com/notes/nda-maths/logarithms/log-solving-equations-applications
```

### Day 70

```
https://www.pyqvault.com/notes/nda-maths/matrices-determinants/cofactors-adjoint-inverse
https://www.pyqvault.com/notes/nda-maths/matrices-determinants/determinants-evaluation-properties
https://www.pyqvault.com/notes/nda-maths/matrices-determinants/linear-systems
https://www.pyqvault.com/notes/nda-maths/matrices-determinants/matrix-operations
https://www.pyqvault.com/notes/nda-maths/matrices-determinants/special-determinants
https://www.pyqvault.com/notes/nda-maths/matrices-determinants/special-matrices
https://www.pyqvault.com/notes/nda-maths/permutation-combination/pc-arrangements
https://www.pyqvault.com/notes/nda-maths/permutation-combination/pc-combinations
https://www.pyqvault.com/notes/nda-maths/permutation-combination/pc-factorials-coefficients
https://www.pyqvault.com/notes/nda-maths/permutation-combination/pc-forming-numbers
```

### Day 71

```
https://www.pyqvault.com/notes/nda-maths/permutation-combination/pc-geometric-counting
https://www.pyqvault.com/notes/nda-maths/probability/bounds-on-probability
https://www.pyqvault.com/notes/nda-maths/probability/classical-probability-counting
https://www.pyqvault.com/notes/nda-maths/probability/conditional-probability-bayes
https://www.pyqvault.com/notes/nda-maths/probability/event-algebra-addition-rule
https://www.pyqvault.com/notes/nda-maths/probability/independent-events
https://www.pyqvault.com/notes/nda-maths/properties-of-triangle/pt-incircle-polygons
https://www.pyqvault.com/notes/nda-maths/properties-of-triangle/pt-sine-cosine-rules
https://www.pyqvault.com/notes/nda-maths/properties-of-triangle/pt-triangle-identities
https://www.pyqvault.com/notes/nda-maths/quadratic-equations/qe-nature-of-roots
```

### Day 72

```
https://www.pyqvault.com/notes/nda-maths/quadratic-equations/qe-special-quadratics
https://www.pyqvault.com/notes/nda-maths/quadratic-equations/qe-vieta-relations
https://www.pyqvault.com/notes/nda-maths/sequence-series/seq-arithmetic-progressions
https://www.pyqvault.com/notes/nda-maths/sequence-series/seq-geometric-progressions
https://www.pyqvault.com/notes/nda-maths/sequence-series/seq-harmonic-means
https://www.pyqvault.com/notes/nda-maths/sequence-series/seq-interrelating-progressions
https://www.pyqvault.com/notes/nda-maths/sequence-series/seq-special-series
https://www.pyqvault.com/notes/nda-maths/sets-relations/sets-counting
https://www.pyqvault.com/notes/nda-maths/sets-relations/sets-operations
https://www.pyqvault.com/notes/nda-maths/sets-relations/sets-relations
```

### Day 73

```
https://www.pyqvault.com/notes/nda-maths/statistics/central-tendency
https://www.pyqvault.com/notes/nda-maths/statistics/dispersion
https://www.pyqvault.com/notes/nda-maths/statistics/frequency-distributions
https://www.pyqvault.com/notes/nda-maths/statistics/regression-correlation
https://www.pyqvault.com/notes/nda-maths/trigonometric-equations/te-general-solutions
https://www.pyqvault.com/notes/nda-maths/trigonometric-equations/te-simultaneous-systems
https://www.pyqvault.com/notes/nda-maths/trigonometric-equations/te-specific-forms
https://www.pyqvault.com/notes/nda-maths/trigonometric-identities/trig-compound-angle
https://www.pyqvault.com/notes/nda-maths/trigonometric-identities/trig-max-min
https://www.pyqvault.com/notes/nda-maths/trigonometric-identities/trig-multiple-half-angle
```

### Day 74

```
https://www.pyqvault.com/notes/nda-maths/trigonometric-identities/trig-product-sum
https://www.pyqvault.com/notes/nda-maths/trigonometric-identities/trig-values-quadrants
https://www.pyqvault.com/notes/nda-maths/vectors/cross-product-triple-product
https://www.pyqvault.com/notes/nda-maths/vectors/dot-product-angle
https://www.pyqvault.com/notes/nda-maths/vectors/magnitude-components-projection
https://www.pyqvault.com/notes/nda-maths/vectors/position-vectors-section
https://www.pyqvault.com/notes/nda-maths/vectors/vector-geometry
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-cells-and-kirchhoff
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-current-and-ohms-law
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-electrical-devices
```

### Day 75

```
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-electrostatics
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-magnetic-force
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-magnetism-and-effects
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-power-and-energy
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-resistance-and-resistivity
https://www.pyqvault.com/notes/nda-physics/electricity-and-magnetism/em-resistor-combinations
https://www.pyqvault.com/notes/nda-physics/fluid-mechanics/flu-buoyancy-density-flotation
https://www.pyqvault.com/notes/nda-physics/fluid-mechanics/flu-pressure-surface-tension
https://www.pyqvault.com/notes/nda-physics/gravitation/grav-field-and-potential
https://www.pyqvault.com/notes/nda-physics/gravitation/grav-newtons-law
```

### Day 76

```
https://www.pyqvault.com/notes/nda-physics/gravitation/grav-orbits-kepler-escape
https://www.pyqvault.com/notes/nda-physics/heat-thermodynamics/ht-heat-calorimetry-specific-heat
https://www.pyqvault.com/notes/nda-physics/heat-thermodynamics/ht-phase-change-and-boiling
https://www.pyqvault.com/notes/nda-physics/heat-thermodynamics/ht-temperature-and-thermometry
https://www.pyqvault.com/notes/nda-physics/heat-thermodynamics/ht-thermodynamic-processes
https://www.pyqvault.com/notes/nda-physics/kinematics/kin-circular
https://www.pyqvault.com/notes/nda-physics/kinematics/kin-equations-and-graphs
https://www.pyqvault.com/notes/nda-physics/kinematics/kin-foundations
https://www.pyqvault.com/notes/nda-physics/kinematics/kin-projectile
https://www.pyqvault.com/notes/nda-physics/laws-of-motion/lmf-conservation-and-collisions
```

### Day 77

```
https://www.pyqvault.com/notes/nda-physics/laws-of-motion/lmf-friction
https://www.pyqvault.com/notes/nda-physics/laws-of-motion/lmf-momentum-and-impulse
https://www.pyqvault.com/notes/nda-physics/laws-of-motion/lmf-newtons-laws
https://www.pyqvault.com/notes/nda-physics/laws-of-motion/lmf-types-of-forces
https://www.pyqvault.com/notes/nda-physics/light-optics/opt-eye-and-instruments
https://www.pyqvault.com/notes/nda-physics/light-optics/opt-lenses-and-lens-formula
https://www.pyqvault.com/notes/nda-physics/light-optics/opt-light-phenomena-and-spectrum
https://www.pyqvault.com/notes/nda-physics/light-optics/opt-prisms-and-dispersion
https://www.pyqvault.com/notes/nda-physics/light-optics/opt-reflection-and-mirrors
https://www.pyqvault.com/notes/nda-physics/light-optics/opt-refraction-and-tir
```

### Day 78

```
https://www.pyqvault.com/notes/nda-physics/modern-physics/mod-atomic-structure
https://www.pyqvault.com/notes/nda-physics/modern-physics/mod-nuclear-physics
https://www.pyqvault.com/notes/nda-physics/modern-physics/mod-photoelectric-effect
https://www.pyqvault.com/notes/nda-physics/modern-physics/mod-quantum-and-modern-em
https://www.pyqvault.com/notes/nda-physics/modern-physics/mod-scientific-acronyms
https://www.pyqvault.com/notes/nda-physics/modern-physics/mod-scientists-and-discoveries
https://www.pyqvault.com/notes/nda-physics/oscillations-waves/osc-shm-and-waves
https://www.pyqvault.com/notes/nda-physics/oscillations-waves/osc-simple-pendulum
https://www.pyqvault.com/notes/nda-physics/sound/applications
https://www.pyqvault.com/notes/nda-physics/sound/foundations
```

### Day 79

```
https://www.pyqvault.com/notes/nda-physics/sound/sound-behaviours
https://www.pyqvault.com/notes/nda-physics/sound/wave-equation-and-bands
https://www.pyqvault.com/notes/nda-physics/units-measurement-dimensions/umd-units-and-dimensions
https://www.pyqvault.com/notes/nda-physics/work-energy-power/wep-energy-and-conservation
https://www.pyqvault.com/notes/nda-physics/work-energy-power/wep-simple-machines
https://www.pyqvault.com/notes/nda-physics/work-energy-power/wep-work-and-work-done
https://www.pyqvault.com/notes/nda-physics/work-energy-power/wep-work-energy-theorem-and-power
https://www.pyqvault.com/quiz/nda-maths-matrices-determinants-computation-6
https://www.pyqvault.com/quiz/nda-maths-matrices-determinants-formula-1
https://www.pyqvault.com/quiz/nda-probability
```

### Day 80

```
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-congruences
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-divisibility-rules
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-factorisation
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-factors-divisors
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-foundations
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-hcf-lcm-applications
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-hcf-lcm-laws
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-place-value
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-primes
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-rational-irrational
```

### Day 81

```
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-squares-cubes
https://www.pyqvault.com/notes/cds-maths/number-system/cds-ns-unit-digit
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/probability-distributions
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/trigonometric-functions
https://www.pyqvault.com/questions/mh-ssc-10/algebra/probability
https://www.pyqvault.com/questions/mh-ssc-10/geometry/trigonometry
https://www.pyqvault.com/quiz/nda-maths-vectors-computation-1
https://www.pyqvault.com/questions/mh-sb-11/mathematics/determinants-and-matrices
https://www.pyqvault.com/questions/mh-sb-11/mathematics/permutations-and-combination
https://www.pyqvault.com/questions/mh-sb-11/mathematics/probability
```

### Day 82

```
https://www.pyqvault.com/questions/mh-sb-11/mathematics/sequences-and-series
https://www.pyqvault.com/questions/mh-sb-11/mathematics/trigonometry-i
https://www.pyqvault.com/questions/mh-sb-11/mathematics/trigonometry-ii
https://www.pyqvault.com/questions/mh-sb-9/mathematics/trigonometry
https://www.pyqvault.com/notes/mht-cet-chemistry/chemical-bonding/cetcb-hybridization
https://www.pyqvault.com/notes/mht-cet-chemistry/chemical-bonding/cetcb-ionic-covalent-lewis
https://www.pyqvault.com/notes/mht-cet-chemistry/chemical-bonding/cetcb-mot-bond-order
https://www.pyqvault.com/notes/mht-cet-chemistry/chemical-bonding/cetcb-polarity-imf
https://www.pyqvault.com/notes/mht-cet-chemistry/chemical-bonding/cetcb-vsepr-geometry
https://www.pyqvault.com/notes/mht-cet-chemistry/ionic-equilibria/cetie-acid-base-theories
```

### Day 83

```
https://www.pyqvault.com/notes/mht-cet-chemistry/ionic-equilibria/cetie-buffers
https://www.pyqvault.com/notes/mht-cet-chemistry/ionic-equilibria/cetie-ka-kb-dissociation
https://www.pyqvault.com/notes/mht-cet-chemistry/ionic-equilibria/cetie-ph-poh-kw
https://www.pyqvault.com/notes/mht-cet-chemistry/ionic-equilibria/cetie-salt-hydrolysis
https://www.pyqvault.com/notes/mht-cet-chemistry/ionic-equilibria/cetie-solubility-product
https://www.pyqvault.com/notes/mht-cet-chemistry/some-basic-concepts/cetsbcc-laws-of-combination
https://www.pyqvault.com/notes/mht-cet-chemistry/some-basic-concepts/cetsbcc-mole-interconversions
https://www.pyqvault.com/notes/mht-cet-chemistry/some-basic-concepts/cetsbcc-si-units
https://www.pyqvault.com/notes/mht-cet-chemistry/some-basic-concepts/cetsbcc-stoichiometry-concentration
https://www.pyqvault.com/notes/mht-cet-chemistry/states-of-matter/cetsom-dalton-ktg
```

### Day 84

```
https://www.pyqvault.com/notes/mht-cet-chemistry/states-of-matter/cetsom-gas-laws
https://www.pyqvault.com/notes/mht-cet-chemistry/structure-of-atom/cetsoa-bohr-model
https://www.pyqvault.com/notes/mht-cet-chemistry/structure-of-atom/cetsoa-electronic-configuration
https://www.pyqvault.com/notes/mht-cet-chemistry/structure-of-atom/cetsoa-em-radiation
https://www.pyqvault.com/notes/mht-cet-chemistry/structure-of-atom/cetsoa-hydrogen-spectrum
https://www.pyqvault.com/notes/mht-cet-chemistry/structure-of-atom/cetsoa-quantum-model
https://www.pyqvault.com/notes/mht-cet-chemistry/structure-of-atom/cetsoa-subatomic-particles
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative/angle-between-curves
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative/approximations
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative/increasing-decreasing
```

### Day 85

```
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative/maxima-minima
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative/rate-of-change
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative/rolle-mvt
https://www.pyqvault.com/notes/mht-cet-maths/applications-of-derivative/tangents-normals
https://www.pyqvault.com/notes/mht-cet-maths/binomial-distribution/binomial-mean-variance
https://www.pyqvault.com/notes/mht-cet-maths/binomial-distribution/binomial-parameter-estimation
https://www.pyqvault.com/notes/mht-cet-maths/binomial-distribution/binomial-setting-pmf
https://www.pyqvault.com/notes/mht-cet-maths/binomial-distribution/computing-binomial-probabilities
https://www.pyqvault.com/notes/mht-cet-maths/differential-equations/growth-decay-models
https://www.pyqvault.com/notes/mht-cet-maths/differential-equations/homogeneous-reducible
```

### Day 86

```
https://www.pyqvault.com/notes/mht-cet-maths/differential-equations/linear-integrating-factor
https://www.pyqvault.com/notes/mht-cet-maths/differential-equations/newtons-law-cooling
https://www.pyqvault.com/notes/mht-cet-maths/differential-equations/order-degree-formation
https://www.pyqvault.com/notes/mht-cet-maths/differential-equations/variable-separable
https://www.pyqvault.com/notes/mht-cet-maths/differentiation/derivative-wrt
https://www.pyqvault.com/notes/mht-cet-maths/differentiation/foundations-chain
https://www.pyqvault.com/notes/mht-cet-maths/differentiation/implicit-special
https://www.pyqvault.com/notes/mht-cet-maths/differentiation/inverse-functions
https://www.pyqvault.com/notes/mht-cet-maths/differentiation/logarithmic
https://www.pyqvault.com/notes/mht-cet-maths/differentiation/parametric-higher
```

### Day 87

```
https://www.pyqvault.com/notes/mht-cet-maths/indefinite-integration/fundamentals
https://www.pyqvault.com/notes/mht-cet-maths/indefinite-integration/integration-by-parts
https://www.pyqvault.com/notes/mht-cet-maths/indefinite-integration/rational-and-partial-fractions
https://www.pyqvault.com/notes/mht-cet-maths/indefinite-integration/substitution
https://www.pyqvault.com/notes/mht-cet-maths/indefinite-integration/trigonometric-integrals-powers
https://www.pyqvault.com/notes/mht-cet-maths/indefinite-integration/trigonometric-integrals-rational
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane/angles-conditions
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane/distances-3d
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane/foot-image-projection
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane/intersection-coplanarity-skew
```

### Day 88

```
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane/line-equation
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane/plane-equation
https://www.pyqvault.com/notes/mht-cet-maths/line-and-plane/tetrahedron-geometry
https://www.pyqvault.com/notes/mht-cet-maths/probability-distribution/classical-probability-odds
https://www.pyqvault.com/notes/mht-cet-maths/probability-distribution/conditional-independence-bayes
https://www.pyqvault.com/notes/mht-cet-maths/probability-distribution/discrete-random-variables
https://www.pyqvault.com/notes/mht-cet-maths/probability-distribution/expectation-variance-sd
https://www.pyqvault.com/notes/mht-cet-maths/vectors/cross-product
https://www.pyqvault.com/notes/mht-cet-maths/vectors/dot-product
https://www.pyqvault.com/notes/mht-cet-maths/vectors/linear-combinations-coplanarity
```

### Day 89

```
https://www.pyqvault.com/notes/mht-cet-maths/vectors/magnitude-unit-vectors
https://www.pyqvault.com/notes/mht-cet-maths/vectors/scalar-triple-product
https://www.pyqvault.com/notes/mht-cet-maths/vectors/section-formula-geometry
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/alcohols-phenols-and-ethers
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/aldehydes-ketones-and-carboxylic-acids
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/amines
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/biomolecules
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/chemical-kinetics
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/chemical-thermodynamics
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/coordination-compounds
```

### Day 90

```
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/electrochemistry
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/elements-of-groups-16-17-and-18
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/halogen-derivatives
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/introduction-to-polymer-chemistry
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/solutions
https://www.pyqvault.com/questions/mh-hsc-12/chemistry/transition-and-inner-transition-elements
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/application-of-derivatives
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/binomial-distribution
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/differential-equations
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/differentiation
```

### Day 91

```
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/indefinite-integration
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/line-and-planes
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/mathematical-logic
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/pair-of-straight-lines
https://www.pyqvault.com/questions/mh-hsc-12/mathematics/vectors
https://www.pyqvault.com/questions/mh-hsc-12/physics/current-electricity
https://www.pyqvault.com/questions/mh-hsc-12/physics/dual-nature-of-radiation-and-matter
https://www.pyqvault.com/questions/mh-hsc-12/physics/electromagnetic-induction
https://www.pyqvault.com/questions/mh-hsc-12/physics/electrostatics
https://www.pyqvault.com/questions/mh-hsc-12/physics/kinetic-theory-of-gases-and-radiation
```

### Day 92

```
https://www.pyqvault.com/questions/mh-hsc-12/physics/magnetic-fields-due-to-electric-current
https://www.pyqvault.com/questions/mh-hsc-12/physics/magnetic-materials
https://www.pyqvault.com/questions/mh-hsc-12/physics/mechanical-properties-of-fluids
https://www.pyqvault.com/questions/mh-hsc-12/physics/oscillations
https://www.pyqvault.com/questions/mh-hsc-12/physics/rotational-dynamics
https://www.pyqvault.com/questions/mh-hsc-12/physics/semiconductor-devices
https://www.pyqvault.com/questions/mh-hsc-12/physics/structure-of-atoms-and-nuclei
https://www.pyqvault.com/questions/mh-hsc-12/physics/superposition-of-waves
https://www.pyqvault.com/questions/mh-hsc-12/physics/thermodynamics
https://www.pyqvault.com/questions/mh-hsc-12/physics/wave-optics
```

### Day 93

```
https://www.pyqvault.com/questions/mh-ssc-10/algebra/arithmetic-progression
https://www.pyqvault.com/questions/mh-ssc-10/algebra/financial-planning
https://www.pyqvault.com/questions/mh-ssc-10/algebra/linear-equations-in-two-variables
https://www.pyqvault.com/questions/mh-ssc-10/algebra/quadratic-equations
https://www.pyqvault.com/questions/mh-ssc-10/algebra/statistics
https://www.pyqvault.com/questions/mh-ssc-10/geography/economy-and-occupations
https://www.pyqvault.com/questions/mh-ssc-10/geography/location-and-extent
https://www.pyqvault.com/questions/mh-ssc-10/geography/natural-vegetation-and-wildlife
https://www.pyqvault.com/questions/mh-ssc-10/geography/physiography-and-drainage
https://www.pyqvault.com/questions/mh-ssc-10/geography/population
```

### Day 94

```
https://www.pyqvault.com/questions/mh-ssc-10/geography/tourism-transport-and-communication
https://www.pyqvault.com/questions/mh-ssc-10/geometry/circle
https://www.pyqvault.com/questions/mh-ssc-10/geometry/co-ordinate-geometry
https://www.pyqvault.com/questions/mh-ssc-10/geometry/geometric-constructions
https://www.pyqvault.com/questions/mh-ssc-10/geometry/mensuration
https://www.pyqvault.com/questions/mh-ssc-10/geometry/pythagoras-theorem
https://www.pyqvault.com/questions/mh-ssc-10/geometry/similarity
https://www.pyqvault.com/questions/mh-ssc-10/history/heritage-management
https://www.pyqvault.com/questions/mh-ssc-10/history/sports-and-history
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/carbon-compounds
```

### Day 95

```
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/chemical-reactions-and-equations
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/effects-of-electric-current
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/gravitation
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/heat
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/lenses
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/metallurgy
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/periodic-classification-of-elements
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/refraction-of-light
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-i/space-missions
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/animal-classification
```

### Day 96

```
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/cell-biology-and-biotechnology
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/disaster-management
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/environmental-management
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/heredity-and-evolution
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/introduction-to-microbiology
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/life-processes-in-living-organisms-part-1
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/life-processes-in-living-organisms-part-2
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/metallurgy
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/social-health
https://www.pyqvault.com/questions/mh-ssc-10/science-and-technology-ii/towards-green-energy
```

### Day 97

```
https://www.pyqvault.com/questions/foundation-course/chemistry/acids-bases-and-salts
https://www.pyqvault.com/questions/foundation-course/physics/light-reflection-and-refraction
https://www.pyqvault.com/questions/foundation-course/chemistry/chemical-reactions-and-equations
https://www.pyqvault.com/questions/foundation-course/biology/life-processes
https://www.pyqvault.com/questions/foundation-course/biology/tissues
https://www.pyqvault.com/questions/foundation-course/physics/work-and-energy
https://www.pyqvault.com/questions/foundation-course/physics/sound
https://www.pyqvault.com/questions/foundation-course/biology/how-do-organisms-reproduce
https://www.pyqvault.com/questions/foundation-course/chemistry/metals-and-non-metals
https://www.pyqvault.com/questions/foundation-course/physics/gravitation
```

### Day 98

```
https://www.pyqvault.com/questions/foundation-course/chemistry/matter-in-our-surroundings
https://www.pyqvault.com/questions/foundation-course/biology/the-fundamental-unit-of-life
https://www.pyqvault.com/questions/foundation-course/chemistry/structure-of-the-atom
https://www.pyqvault.com/questions/foundation-course/chemistry/carbon-and-its-compounds
https://www.pyqvault.com/questions/foundation-course/biology/control-and-coordination
https://www.pyqvault.com/questions/foundation-course/biology/our-environment
https://www.pyqvault.com/questions/foundation-course/physics/force-and-laws-of-motion
https://www.pyqvault.com/questions/foundation-course/physics/magnetic-effects-of-electric-current
https://www.pyqvault.com/questions/foundation-course/physics/electricity
https://www.pyqvault.com/questions/foundation-course/chemistry/is-matter-around-us-pure
```

### Day 99

```
https://www.pyqvault.com/questions/foundation-course/physics/motion
https://www.pyqvault.com/questions/foundation-course/physics/the-human-eye-and-the-colourful-world
https://www.pyqvault.com/questions/foundation-course/chemistry/atoms-and-molecules
https://www.pyqvault.com/questions/foundation-course/biology/heredity-and-evolution
https://www.pyqvault.com/questions/mh-sb-11/chemistry/adsorption-and-colloids
https://www.pyqvault.com/questions/mh-sb-11/chemistry/basic-principles-of-organic-chemistry
https://www.pyqvault.com/questions/mh-sb-11/chemistry/chemical-bonding
https://www.pyqvault.com/questions/mh-sb-11/chemistry/chemical-equilibrium
https://www.pyqvault.com/questions/mh-sb-11/chemistry/chemistry-in-everyday-life
https://www.pyqvault.com/questions/mh-sb-11/chemistry/elements-of-group-1-and-2
```

### Day 100

```
https://www.pyqvault.com/questions/mh-sb-11/chemistry/elements-of-group-13-14-and-15
https://www.pyqvault.com/questions/mh-sb-11/chemistry/hydrocarbons
https://www.pyqvault.com/questions/mh-sb-11/chemistry/introduction-to-analytical-chemistry
https://www.pyqvault.com/questions/mh-sb-11/chemistry/modern-periodic-table
https://www.pyqvault.com/questions/mh-sb-11/chemistry/nuclear-chemistry-and-radioactivity
https://www.pyqvault.com/questions/mh-sb-11/chemistry/redox-reactions
https://www.pyqvault.com/questions/mh-sb-11/chemistry/some-analytical-techniques
https://www.pyqvault.com/questions/mh-sb-11/chemistry/some-basic-concepts-of-chemistry
https://www.pyqvault.com/questions/mh-sb-11/chemistry/states-of-matter
https://www.pyqvault.com/questions/mh-sb-11/chemistry/structure-of-atom
```

### Day 101

```
https://www.pyqvault.com/questions/mh-sb-11/mathematics/angle-and-its-measurement
https://www.pyqvault.com/questions/mh-sb-11/mathematics/binomial-theorem
https://www.pyqvault.com/questions/mh-sb-11/mathematics/circle
https://www.pyqvault.com/questions/mh-sb-11/mathematics/complex-numbers
https://www.pyqvault.com/questions/mh-sb-11/mathematics/conic-sections
https://www.pyqvault.com/questions/mh-sb-11/mathematics/continuity
https://www.pyqvault.com/questions/mh-sb-11/mathematics/differentiation
https://www.pyqvault.com/questions/mh-sb-11/mathematics/functions
https://www.pyqvault.com/questions/mh-sb-11/mathematics/limits
https://www.pyqvault.com/questions/mh-sb-11/mathematics/measures-of-dispersion
```

### Day 102

```
https://www.pyqvault.com/questions/mh-sb-11/mathematics/sets-and-relations
https://www.pyqvault.com/questions/mh-sb-11/mathematics/straight-line
https://www.pyqvault.com/questions/mh-sb-11/physics/electric-current-through-conductors
https://www.pyqvault.com/questions/mh-sb-11/physics/electromagnetic-waves-and-communication-system
https://www.pyqvault.com/questions/mh-sb-11/physics/electrostatics
https://www.pyqvault.com/questions/mh-sb-11/physics/gravitation
https://www.pyqvault.com/questions/mh-sb-11/physics/laws-of-motion
https://www.pyqvault.com/questions/mh-sb-11/physics/magnetism
https://www.pyqvault.com/questions/mh-sb-11/physics/mathematical-methods
https://www.pyqvault.com/questions/mh-sb-11/physics/mechanical-properties-of-solids
```

### Day 103

```
https://www.pyqvault.com/questions/mh-sb-11/physics/motion-in-a-plane
https://www.pyqvault.com/questions/mh-sb-11/physics/optics
https://www.pyqvault.com/questions/mh-sb-11/physics/semiconductors
https://www.pyqvault.com/questions/mh-sb-11/physics/sound
https://www.pyqvault.com/questions/mh-sb-11/physics/thermal-properties-of-matter
https://www.pyqvault.com/questions/mh-sb-11/physics/units-and-measurements
https://www.pyqvault.com/questions/mh-sb-9/geography/distributional-maps
https://www.pyqvault.com/questions/mh-sb-9/geography/endogenetic-movements
https://www.pyqvault.com/questions/mh-sb-9/geography/exogenetic-processes-part-1
https://www.pyqvault.com/questions/mh-sb-9/geography/exogenetic-processes-part-2
```

### Day 104

```
https://www.pyqvault.com/questions/mh-sb-9/geography/international-date-line
https://www.pyqvault.com/questions/mh-sb-9/geography/precipitation
https://www.pyqvault.com/questions/mh-sb-9/geography/the-properties-of-sea-water
https://www.pyqvault.com/questions/mh-sb-9/geography/tourism
https://www.pyqvault.com/questions/mh-sb-9/geography/trade
https://www.pyqvault.com/questions/mh-sb-9/geography/urbanisation
https://www.pyqvault.com/questions/mh-sb-9/history/education
https://www.pyqvault.com/questions/mh-sb-9/history/science-and-technology
https://www.pyqvault.com/questions/mh-sb-9/mathematics/basic-concepts-in-geometry
https://www.pyqvault.com/questions/mh-sb-9/mathematics/circle
```

### Day 105

```
https://www.pyqvault.com/questions/mh-sb-9/mathematics/co-ordinate-geometry
https://www.pyqvault.com/questions/mh-sb-9/mathematics/constructions-of-triangles
https://www.pyqvault.com/questions/mh-sb-9/mathematics/financial-planning
https://www.pyqvault.com/questions/mh-sb-9/mathematics/linear-equations-in-two-variables
https://www.pyqvault.com/questions/mh-sb-9/mathematics/parallel-lines
https://www.pyqvault.com/questions/mh-sb-9/mathematics/polynomials
https://www.pyqvault.com/questions/mh-sb-9/mathematics/quadrilaterals
https://www.pyqvault.com/questions/mh-sb-9/mathematics/ratio-and-proportion
https://www.pyqvault.com/questions/mh-sb-9/mathematics/real-numbers
https://www.pyqvault.com/questions/mh-sb-9/mathematics/sets
```

### Day 106

```
https://www.pyqvault.com/questions/mh-sb-9/mathematics/statistics
https://www.pyqvault.com/questions/mh-sb-9/mathematics/surface-area-and-volume
https://www.pyqvault.com/questions/mh-sb-9/mathematics/triangles
https://www.pyqvault.com/questions/mh-sb-9/political-science/the-united-nations
https://www.pyqvault.com/questions/cbse-11/mathematics/permutations-and-combinations
https://www.pyqvault.com/questions/cbse-11/mathematics/probability
https://www.pyqvault.com/questions/cbse-11/mathematics/sequences-and-series
https://www.pyqvault.com/questions/cbse-11/mathematics/trigonometric-functions
https://www.pyqvault.com/questions/cbse-12/mathematics/determinants
https://www.pyqvault.com/questions/cbse-12/mathematics/inverse-trigonometric-functions
```

### Day 107

```
https://www.pyqvault.com/questions/cbse-12/mathematics/matrices
https://www.pyqvault.com/questions/cbse-12/mathematics/probability
https://www.pyqvault.com/notes/jee-mains
https://www.pyqvault.com/notes/jee-mains-maths
https://www.pyqvault.com/notes/jee-mains-maths/matrices
https://www.pyqvault.com/questions/jee-mains/maths/trigonometric-identities
https://www.pyqvault.com/questions/jee-mains/maths/sequences-and-series
https://www.pyqvault.com/questions/jee-mains/maths/permutations-and-combinations
https://www.pyqvault.com/questions/jee-mains/maths/probability
https://www.pyqvault.com/questions/jee-mains/maths/determinants
```

### Day 108

```
https://www.pyqvault.com/questions/jee-mains/maths/matrices
https://www.pyqvault.com/questions/jee-mains/maths/inverse-trigonometric-functions
https://www.pyqvault.com/questions/jee-mains/maths/trigonometric-equations
https://www.pyqvault.com/questions/cbse-10/mathematics/real-numbers
https://www.pyqvault.com/questions/cbse-11/chemistry/chemical-bonding-and-molecular-structure
https://www.pyqvault.com/questions/cbse-11/chemistry/classification-of-elements-and-periodicity-in-properties
https://www.pyqvault.com/questions/cbse-11/chemistry/equilibrium
https://www.pyqvault.com/questions/cbse-11/chemistry/hydrocarbons
https://www.pyqvault.com/questions/cbse-11/chemistry/organic-chemistry-some-basic-principles-and-techniques
https://www.pyqvault.com/questions/cbse-11/chemistry/redox-reactions
```

### Day 109

```
https://www.pyqvault.com/questions/cbse-11/chemistry/some-basic-concepts-of-chemistry
https://www.pyqvault.com/questions/cbse-11/chemistry/structure-of-atom
https://www.pyqvault.com/questions/cbse-11/chemistry/thermodynamics
https://www.pyqvault.com/questions/cbse-11/mathematics/binomial-theorem
https://www.pyqvault.com/questions/cbse-11/mathematics/complex-numbers-and-quadratic-equations
https://www.pyqvault.com/questions/cbse-11/mathematics/conic-sections
https://www.pyqvault.com/questions/cbse-11/mathematics/introduction-to-three-dimensional-geometry
https://www.pyqvault.com/questions/cbse-11/mathematics/limits-and-derivatives
https://www.pyqvault.com/questions/cbse-11/mathematics/linear-inequalities
https://www.pyqvault.com/questions/cbse-11/mathematics/relations-and-functions
```

### Day 110

```
https://www.pyqvault.com/questions/cbse-11/mathematics/sets
https://www.pyqvault.com/questions/cbse-11/mathematics/statistics
https://www.pyqvault.com/questions/cbse-11/mathematics/straight-lines
https://www.pyqvault.com/questions/cbse-11/physics/gravitation
https://www.pyqvault.com/questions/cbse-11/physics/kinetic-theory
https://www.pyqvault.com/questions/cbse-11/physics/laws-of-motion
https://www.pyqvault.com/questions/cbse-11/physics/mechanical-properties-of-fluids
https://www.pyqvault.com/questions/cbse-11/physics/mechanical-properties-of-solids
https://www.pyqvault.com/questions/cbse-11/physics/motion-in-a-plane
https://www.pyqvault.com/questions/cbse-11/physics/motion-in-a-straight-line
```

### Day 111

```
https://www.pyqvault.com/questions/cbse-11/physics/oscillations
https://www.pyqvault.com/questions/cbse-11/physics/system-of-particles-and-rotational-motion
https://www.pyqvault.com/questions/cbse-11/physics/thermal-properties-of-matter
https://www.pyqvault.com/questions/cbse-11/physics/units-and-measurement
https://www.pyqvault.com/questions/cbse-11/physics/waves
https://www.pyqvault.com/questions/cbse-11/physics/work-energy-and-power
https://www.pyqvault.com/questions/cbse-12/mathematics/application-of-derivatives
https://www.pyqvault.com/questions/cbse-12/mathematics/application-of-integrals
https://www.pyqvault.com/questions/cbse-12/mathematics/continuity-and-differentiability
https://www.pyqvault.com/questions/cbse-12/mathematics/differential-equations
```

### Day 112

```
https://www.pyqvault.com/questions/cbse-12/mathematics/integrals
https://www.pyqvault.com/questions/cbse-12/mathematics/linear-programming
https://www.pyqvault.com/questions/cbse-12/mathematics/relations-and-functions
https://www.pyqvault.com/questions/cbse-12/mathematics/three-dimensional-geometry
https://www.pyqvault.com/questions/cbse-12/mathematics/vector-algebra
https://www.pyqvault.com/questions/jee-mains/maths/conic-sections
https://www.pyqvault.com/questions/jee-mains/maths/three-dimensional-geometry
https://www.pyqvault.com/questions/jee-mains/physics/electrostatics
https://www.pyqvault.com/questions/jee-mains/chemistry/organic-chemistry-some-basic-principles-and-techniques
https://www.pyqvault.com/questions/jee-mains/physics/current-electricity
```

### Day 113

```
https://www.pyqvault.com/questions/jee-mains/chemistry/coordination-compounds
https://www.pyqvault.com/questions/jee-mains/chemistry/the-d-and-f-block-elements
https://www.pyqvault.com/questions/jee-mains/chemistry/some-basic-concepts-of-chemistry
https://www.pyqvault.com/questions/jee-mains/maths/relations-and-functions
https://www.pyqvault.com/questions/jee-mains/maths/definite-integration
https://www.pyqvault.com/questions/jee-mains/physics/units-and-measurements
https://www.pyqvault.com/questions/jee-mains/chemistry/the-p-block-elements
https://www.pyqvault.com/questions/jee-mains/maths/vector-algebra
https://www.pyqvault.com/questions/jee-mains/maths/differential-equations
https://www.pyqvault.com/questions/jee-mains/chemistry/chemical-bonding-and-molecular-structure
```

### Day 114

```
https://www.pyqvault.com/questions/jee-mains/physics/moving-charges-and-magnetism
https://www.pyqvault.com/questions/jee-mains/physics/ray-optics
https://www.pyqvault.com/questions/jee-mains/physics/system-of-particles-and-rotational-motion
https://www.pyqvault.com/questions/jee-mains/chemistry/aldehydes-ketones-and-carboxylic-acids
https://www.pyqvault.com/questions/jee-mains/chemistry/hydrocarbons
https://www.pyqvault.com/questions/jee-mains/maths/binomial-theorem
https://www.pyqvault.com/questions/jee-mains/chemistry/amines
https://www.pyqvault.com/questions/jee-mains/physics/motion-in-a-plane
https://www.pyqvault.com/questions/jee-mains/physics/semiconductor-electronics
https://www.pyqvault.com/questions/jee-mains/maths/complex-numbers
```

### Day 115

```
https://www.pyqvault.com/questions/jee-mains/maths/application-of-derivatives
https://www.pyqvault.com/questions/jee-mains/maths/limits-and-continuity
https://www.pyqvault.com/questions/jee-mains/chemistry/biomolecules
https://www.pyqvault.com/questions/jee-mains/chemistry/equilibrium
https://www.pyqvault.com/questions/jee-mains/physics/dual-nature-of-radiation-and-matter
https://www.pyqvault.com/questions/jee-mains/chemistry/structure-of-atom
https://www.pyqvault.com/questions/jee-mains/chemistry/chemical-thermodynamics
https://www.pyqvault.com/questions/jee-mains/physics/gravitation
https://www.pyqvault.com/questions/jee-mains/chemistry/chemical-kinetics
https://www.pyqvault.com/questions/jee-mains/chemistry/electrochemistry
```

### Day 116

```
https://www.pyqvault.com/questions/jee-mains/physics/thermodynamics
https://www.pyqvault.com/questions/jee-mains/physics/work-energy-and-power
https://www.pyqvault.com/questions/jee-mains/physics/oscillations
https://www.pyqvault.com/questions/jee-mains/maths/quadratic-equations
https://www.pyqvault.com/questions/jee-mains/physics/wave-optics
https://www.pyqvault.com/questions/jee-mains/chemistry/classification-of-elements-and-periodicity
https://www.pyqvault.com/questions/jee-mains/maths/application-of-integrals
https://www.pyqvault.com/questions/neet/chemistry/thermodynamics
https://www.pyqvault.com/questions/neet/chemistry/the-d-and-f-block-elements
https://www.pyqvault.com/questions/neet/botany/respiration-in-plants
```

### Day 117

```
https://www.pyqvault.com/questions/neet/physics/ray-optics-and-optical-instruments
https://www.pyqvault.com/questions/jee-mains/physics/alternating-current
https://www.pyqvault.com/questions/jee-mains/physics/mechanical-properties-of-fluids
https://www.pyqvault.com/questions/jee-mains/maths/straight-lines
https://www.pyqvault.com/questions/jee-mains/chemistry/solutions
https://www.pyqvault.com/questions/jee-mains/physics/kinetic-theory
https://www.pyqvault.com/questions/jee-mains/physics/electromagnetic-waves
https://www.pyqvault.com/questions/jee-mains/physics/motion-in-a-straight-line
https://www.pyqvault.com/questions/jee-mains/chemistry/alcohols-phenols-and-ethers
https://www.pyqvault.com/questions/jee-mains/physics/laws-of-motion
```

### Day 118

```
https://www.pyqvault.com/mock/exam/jee-mains
https://www.pyqvault.com/mock/exam/jee-mains/past-papers
https://www.pyqvault.com/mock/exam/neet
https://www.pyqvault.com/mock/exam/neet/past-papers
https://www.pyqvault.com/questions/neet/physics/system-of-particles-and-rotational-motion
https://www.pyqvault.com/questions/jee-mains/physics/nuclei
https://www.pyqvault.com/questions/neet/botany/plant-kingdom
https://www.pyqvault.com/questions/jee-mains/chemistry/haloalkanes-and-haloarenes
https://www.pyqvault.com/questions/jee-mains/physics/atoms
https://www.pyqvault.com/questions/jee-mains/physics/electromagnetic-induction
```

### Day 119

```
https://www.pyqvault.com/questions/jee-mains/chemistry/the-s-block-elements
https://www.pyqvault.com/questions/jee-mains/maths/statistics
https://www.pyqvault.com/questions/jee-mains/physics/waves
https://www.pyqvault.com/questions/neet/zoology/biotechnology-principles-and-processes
https://www.pyqvault.com/questions/jee-mains/physics/mechanical-properties-of-solids
https://www.pyqvault.com/questions/jee-mains/maths/differentiation
https://www.pyqvault.com/questions/jee-mains/chemistry/general-principles-and-processes-of-isolation-of-elements
https://www.pyqvault.com/questions/neet/botany/cell-the-unit-of-life
https://www.pyqvault.com/questions/neet/botany/photosynthesis-in-higher-plants
https://www.pyqvault.com/questions/neet/zoology/reproductive-health
```

### Day 120

```
https://www.pyqvault.com/questions/jee-mains/maths/mathematical-reasoning
https://www.pyqvault.com/questions/jee-mains/physics/thermal-properties-of-matter
https://www.pyqvault.com/questions/jee-mains/chemistry/environmental-chemistry
https://www.pyqvault.com/questions/jee-mains/chemistry/hydrogen
https://www.pyqvault.com/questions/jee-mains/chemistry/surface-chemistry
https://www.pyqvault.com/questions/neet/physics/units-and-measurements
https://www.pyqvault.com/questions/jee-mains/physics/communication-systems
https://www.pyqvault.com/questions/neet/botany/molecular-basis-of-inheritance
https://www.pyqvault.com/questions/neet/zoology/biotechnology-and-its-applications
https://www.pyqvault.com/questions/jee-mains/chemistry/chemistry-in-everyday-life
```

### Day 121

```
https://www.pyqvault.com/questions/neet/chemistry/coordination-compounds
https://www.pyqvault.com/questions/jee-mains/chemistry/organic-reaction-mechanisms
https://www.pyqvault.com/questions/neet/zoology/structural-organisation-in-animals
https://www.pyqvault.com/questions/neet/chemistry/chemical-bonding-and-molecular-structure
https://www.pyqvault.com/questions/jee-mains/chemistry/polymers
https://www.pyqvault.com/questions/jee-mains/maths/indefinite-integration
https://www.pyqvault.com/questions/jee-mains/physics/magnetism-and-matter
https://www.pyqvault.com/questions/neet/botany/plant-growth-and-development
https://www.pyqvault.com/questions/neet/chemistry/solutions
https://www.pyqvault.com/questions/neet/zoology/animal-kingdom
```

### Day 122

```
https://www.pyqvault.com/questions/neet/botany/principles-of-inheritance-and-variation
https://www.pyqvault.com/questions/neet/chemistry/chemical-kinetics
https://www.pyqvault.com/questions/neet/zoology/chemical-coordination-and-integration
https://www.pyqvault.com/questions/neet/zoology/human-reproduction
https://www.pyqvault.com/questions/neet/botany/morphology-of-flowering-plants
https://www.pyqvault.com/questions/neet/botany/cell-cycle-and-cell-division
https://www.pyqvault.com/questions/neet/chemistry/structure-of-atom
https://www.pyqvault.com/questions/neet/physics/current-electricity
https://www.pyqvault.com/questions/neet/zoology/human-health-and-disease
https://www.pyqvault.com/questions/neet/botany/sexual-reproduction-in-flowering-plants
```

### Day 123

```
https://www.pyqvault.com/questions/neet/chemistry/the-p-block-elements
https://www.pyqvault.com/questions/jee-mains/chemistry/solid-state
https://www.pyqvault.com/questions/neet/zoology/evolution
https://www.pyqvault.com/questions/neet/botany/anatomy-of-flowering-plants
https://www.pyqvault.com/questions/neet/chemistry/hydrocarbons
https://www.pyqvault.com/questions/neet/physics/electrostatic-potential-and-capacitance
https://www.pyqvault.com/questions/neet/chemistry/aldehydes-ketones-and-carboxylic-acids
https://www.pyqvault.com/questions/neet/physics/semiconductor-electronics
https://www.pyqvault.com/questions/neet/botany/biodiversity-and-conservation
https://www.pyqvault.com/questions/neet/botany/organisms-and-populations
```

### Day 124

```
https://www.pyqvault.com/questions/neet/physics/gravitation
https://www.pyqvault.com/questions/neet/botany/ecosystem
https://www.pyqvault.com/questions/neet/chemistry/equilibrium
https://www.pyqvault.com/questions/neet/chemistry/organic-chemistry-some-basic-principles-and-techniques
https://www.pyqvault.com/questions/neet/zoology/body-fluids-and-circulation
https://www.pyqvault.com/questions/neet/chemistry/amines
https://www.pyqvault.com/questions/neet/physics/alternating-current
https://www.pyqvault.com/questions/neet/physics/moving-charges-and-magnetism
https://www.pyqvault.com/questions/neet/zoology/breathing-and-exchange-of-gases
https://www.pyqvault.com/questions/neet/zoology/locomotion-and-movement
```

### Day 125

```
https://www.pyqvault.com/questions/neet/physics/dual-nature-of-radiation-and-matter
https://www.pyqvault.com/questions/neet/chemistry/electrochemistry
https://www.pyqvault.com/questions/neet/physics/electromagnetic-waves
https://www.pyqvault.com/questions/neet/physics/oscillations
https://www.pyqvault.com/questions/jee-mains/maths/height-distance
https://www.pyqvault.com/notes/jee-mains-maths/matrices/jee-adjoint-inverse
https://www.pyqvault.com/notes/jee-mains-maths/matrices/jee-matrix-algebra
https://www.pyqvault.com/notes/jee-mains-maths/matrices/jee-matrix-powers
https://www.pyqvault.com/notes/jee-mains-maths/matrices/jee-symmetric-orthogonal
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/inverse-trigonometry
```

### Day 126

```
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/matrices-and-determinants
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/permutations-and-combinations
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/probability
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/sequence-and-series
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/trigonometric-identities
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/3d-geometry
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/angle-and-measurement
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/applications-of-derivatives
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/binary-numbers
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/binomial-theorem
```

### Day 127

```
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/circles
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/complex-numbers
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/conics
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/definite-integration
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/derivatives
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/differential-equations
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/functions
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/height-and-distance
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/indefinite-integration
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/inequalities
```

### Day 128

```
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/limits
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/logarithms
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/properties-of-triangle
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/quadratic-equations
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/sets-and-relations
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/statistics
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/straight-lines
https://www.pyqvault.com/questions/worksheets-11-12/mathematics/vectors
https://www.pyqvault.com/privacy
https://www.pyqvault.com/request-access
```
