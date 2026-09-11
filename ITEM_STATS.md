# Item statistics — vault side

**Status:** spec, nothing built. Written 2026-09-11.
**Counterpart:** `nda-tracker/ITEM_STATS.md` (their side, also spec-only) and
`nda-tracker/CROSS_APP_SYNC.md` (the question-payload contract that already shipped).
**Audience:** both repos. The tracker produces the export; the vault stores, pools and displays.

## The division of labour

**The tracker owns COHORT analytics. The bank owns ITEM properties.**

That line decides almost everything below, and it is the reason this spec pools where the
tracker's does not. In the tracker the user is a faculty member asking *how did my batch do*
— cohort context is the whole point, and their spec rightly rules out cross-institute pooling.
In the bank the user is asking *is this question any good*, and for that a broader, more
diverse sample is **less** biased, not more. A p-value measured on one institute's one batch
is the narrow number, not the true one.

So: per-sitting rows in, one pooled number out. Batch-level slicing is not rebuilt here.

## Measured base

Tracker figures are **theirs**, from `nda-tracker/ITEM_STATS.md` (measured 2026-09-11, not
verified from this repo — there is no connection to their database from here). Vault figures
were measured against production on 2026-09-11.

| | tracker | vault `/mock` |
|---|---|---|
| response rows | 1,247 | 48,985 |
| distinct questions with data | 1,435 | 7,284 |
| **questions at n≥20** | **1,259** | **50** |
| questions at n≥10 | — | 424 |
| mean n per question | ~50–100 (inferred from their totals) | **3.8** |
| **distractor beats the key, n≥20** | **122 of 553 — 22%** | **12 of 50 — 24%** |
| distractor beats the key, n≥10 | — | 57 of 424 — 13% |
| ratio ≥2 · ≥3 | 56 at ≥2 (n≥20) | 24 · 12 (n≥10) |
| key chosen by nobody | — | **3** |

The vault row is **after** the intake filters below and counts `attempted`, not `seen`. An
earlier reading of 172 at n≥20 was wrong: it counted rows including blanks.

**The base rate corroborates across populations — 22% against 24%.** Two independent
cohorts, one proctored and one self-serve online, agreeing that roughly a fifth of measured
items have a distractor outpulling the key. That suggests the phenomenon is a property of the
**items** — real traps plus real key errors — rather than an artifact of either channel, and it
is the strongest single argument for building the leads queue at all.

**Ask their side about the 553.** They report 122 of 553 for this, and separately 1,259 items
at n≥20. The denominators disagree and cannot be reconciled from this repo; the 22% above
assumes 553 is the right one.

**The asymmetry is the point.** The vault has 40× the raw volume and one-twenty-fifth the
usable items, because a classroom sitting concentrates 30–60 students on one 120-question
paper while the vault spreads 168 users across 192 mocks. Volume is not the currency; depth
per item is.

Two consequences worth stating plainly:

- **Vault-native data is not worth publishing on its own.** 50 items is nothing. It is worth
  *collecting* because pooled it adds n in the overlap zone, and because at a lower bar it
  gives lead-level signal on ~5,776 questions the tracker will never see.
- **Pooling is self-correcting.** Where both sources have data the tracker outweighs the vault
  roughly 20:1, so the institute's proctored signal dominates the weighted average without any
  precedence rule. An explicit "prefer the institute" rule would produce nearly the same
  headline number while discarding the extra n.

Overlap between the two is unmeasured — 1,736 questions appear in both an LWS paper and a vault
mock attempt, which is a proxy for it, not the number.

## The JSON contract

The tracker exports a JSON file; the vault ingests it through a CLI. **No endpoint on either
side** — the tracker is at 12/12 Vercel Hobby functions (their constraint, stated in their spec).

### Ask of the tracker: emit PER RECORD, not pooled

Their spec's pure core pools by `questionId` across exam records. The vault needs the
per-record grain instead, for four reasons:

1. **Reversible exclusion.** When a sitting turns out to be invalid, you subtract it. A pooled
   figure cannot be un-pooled — that is the `questions.attempt_stats` mistake (see below).
2. **Their own key-conflict case.** 3 questions are keyed differently across records today.
   Those records must be storable separately and excluded individually, not averaged.
3. **Exposure** (below) needs batch grain.
4. **They already have it.** Their discrimination rule is "compute the upper/lower split within
   each exam record and pool the counts" — so per-record counts exist internally. Emitting them
   is cheap.

Pooling then happens once, in the bank, where both sources meet.

### Shape

One object per `(questionId, examRecord)`:

| field | notes |
|---|---|
| `questionId` | the vault `questions.id` |
| `examId` | the tracker `exams.id` — becomes `source_ref` |
| `cohort` | batch label, free text, for exposure |
| `seen` | question number present in `responses` |
| `attempted` | `seen` minus verdict `0` |
| `correct` | verdict `1` |
| `choiceCounts` | `{A,B,C,D}` from `choices`, **attempted only** |
| `discTopCorrect` / `discTopN` | top 27% by exam total, within this record |
| `discBottomCorrect` / `discBottomN` | bottom 27%, within this record |
| `keyAtMeasurement` | `"A"`–`"D"` or `null` — `exams.questions[].answer` as displayed |
| `measuredAt` | when the results were filed |

Absent is `null`, not `""` — same rule as the question payload.

**Marks are Evalbee's.** `responses` is the authoritative verdict and must never be re-derived
from the key on either side. `choices` is what makes distractor analysis possible at all.

## Storage

### Not `questions.attempt_stats`

It exists (migration 0010), it is **empty** (0 of 75,915 rows), nothing reads it, and its merge
helper computes a weighted average — which is **irreversible**. One bad sitting cannot be taken
back out. It was built for the MHT_CET_AI sync, which has never landed a row. Leave it alone;
do not extend it.

### `question_item_stats`

One row per **(question_id, source, source_ref)**.

```
question_id            uuid   not null → questions(id) on delete cascade
source                 text   not null check in ('tracker','vault_mock')
source_ref             text   not null   -- tracker exams.id | vault mock_tests.id
org_id                 uuid   null → organizations(id)  -- null = the public vault population
cohort_label           text   null       -- batch; tracker only
seen, attempted, correct, skipped        int not null
choice_counts          jsonb  not null   -- {"A":n,"B":n,"C":n,"D":n}
disc_top_correct, disc_top_n             int null
disc_bottom_correct, disc_bottom_n       int null
key_at_measurement     text   null
measured_content_hash  text   not null
measured_at            timestamptz not null
unique (question_id, source, source_ref)
```

**Aggregate is a VIEW, never a write.** Rows go in at sitting grain; the single number is
computed at read time by a pure `aggregateItemStats(rows)`. This keeps "where did this number
come from" answerable and makes exclusion a delete rather than an arithmetic problem.

**`measured_content_hash` is load-bearing** — the same lesson as `question_reviews`
(migration 0074). Statistics describe the question **as it was**. This bank flips keys in place
(`apply-key-fixes.ts` re-stamps `content_hash`) and reshuffles option order in the Worksheets
pipeline; after either, a stored `{"B": 31}` is measuring a different question. Hash mismatch
means **stale**, and a stale row renders nothing rather than a wrong number.

`key_at_measurement` is the cheap companion: it detects both the tracker's cross-record key
conflicts and a post-hoc flip on our side.

**RLS.** Writes service-role only (the `platform_admins` / `entitlements` locked pattern).
Reads: org members **or** superadmin — superadmin is not an `org_members` row, so the policy
must admit both. Because the displayed number is global, the read policy needs no org filter;
lead the predicate with the cheap `current_user_org_id() is not null` guard so the anon path
exits early, and verify with `EXPLAIN` rather than assuming (migration 0082 turned a hot read
into a seq scan through an RLS predicate).

## Vault-native rollup — the intake filters

Abandonment is handled at **intake**, not display. Once these filters have run, a genuine
attempt is a genuine attempt whatever the channel, and pooling is legitimate.

1. `mock_attempts.submitted_at is not null`.
2. **First attempt only** per `(user_id, mock_id)` by `started_at`. 135 of 565 submitted
   attempts (24%) are retakes, and the review screen shows the answers — contaminated by
   construction.
3. **Engagement floor: answered / rows ≥ 0.20.** 28 submitted attempts answered *zero*
   questions; 43 answered under 20%. The floor is cheap — it drops 45 of 430 first attempts.
4. **`attempted` counts a filled answer only** (`selected_label` or `numeric_response`
   non-null). A blank row is not an attempt at the item.
5. **Exclude grace questions.** `PaperQuestionRow.grace` awards full marks to everyone
   regardless of response (officially dropped/bonus items) — everyone is "correct" by fiat, so
   the row is meaningless as evidence.
6. `source_ref` = `mock_id`, `org_id` = null, `key_at_measurement` and
   `measured_content_hash` read at rollup time.

### Numeric (NAT) items

**They get the chip.** A NAT row carries no options, so it contributes a p-value and no
distribution — the same number, no extra work. The expanded card renders *"numeric — no option
distribution"* rather than an empty block. There are 0 numeric responses today; the JEE mocks
shipped 2026-09-07.

**But a NAT p-value is NOT comparable to an MCQ p-value, and the two sit side by side on a
mixed JEE paper.** An MCQ has a ~25% guessing floor; a NAT has ~0%. A 30% NAT item is
substantially harder than a 30% MCQ item, and a reader scanning a paper will compare them.
Consequence: **if difficulty bands are ever revisited (see decision 4), they must be
per-format.** Do not derive one set of cuts across both.

## Metrics — what pools and what does not

| metric | pools? | |
|---|---|---|
| `pValue` = correct / **attempted** | **yes** | Not `correct / seen`. Mixing them makes an easy-but-avoided item read as hard — their rule, and it is what makes vault data usable at all. |
| `choiceCounts` | **yes** | A distractor that pulls in two independent populations is *stronger* evidence, not weaker. |
| `discrimination` | **yes**, as counts | Computed within a sitting, pooled across. A computation order, not a pooling objection. |
| `skipRate` | **NO** | MHT-CET mocks carry **zero negative marking** so skipping there is irrational; NDA costs −0.83. Online, 42% of answer rows are blank at 57.4% mean engagement. Pooling a deliberate skip under penalty with an abandoned browser tab gives a number that means nothing. Keep per-source or leave it off the card. |

**Minimum n.** n≥20 for a headline claim. Carry `n` on every row so the reader can discount;
nothing below threshold is silently dropped.

## Display

Staff only — `getPageIdentity()` already resolves `isStaff` at `browse/page.tsx:92`, before the
main `Promise.all`, so the gate costs no extra session read and carries no caching risk.

The fetch follows the established per-page pattern: a batched lookup over the 25 ids on the
page, alongside `getResourceTagsForQuestions`, skipped on the landing branch and on the anon
path, `.catch(() => new Map())` so failure degrades to no chip. Zero cost for anon and students.

**Collapsed card:** one chip — `42% · n=76`. No source label. `n` always visible; styled as
provisional below 20.

**Expanded card:**
- **choice distribution with the key marked** — `A 4 · B 31 · C 9 · D 2`. This is the review
  tool, and it is where a wrong-key lead becomes visible in place.
- per-source split, shown as **provenance**, not as two competing numbers.
- exposure (below).

**Renders nothing** when `measured_content_hash` disagrees with the question's current hash.

**Payload ceiling.** 25 questions × sittings-per-question rows, well under the PostgREST
1000-row cap today (35 tracker exams, growing). Past ~30 sittings on a single question, chunk
the fetch or move the aggregation into an RPC.

## Exposure — the one thing that stays cohort-scoped

"Your batch has already sat this" is org-scoped by nature, and it belongs here because *paper
building* is here. The per-batch no-repeat soft-warn already exists (`paper_questions` joined
to `papers.batch_id`) and today sees only vault-built papers; tracker `cohort_label` extends it
to everything the institute has actually conducted.

So one card carries a **global statistic and an org-scoped exposure flag**. That is not a
contradiction — exposure is a constraint on selection, not analytics.

## Leads

A ranked list of questions where a distractor was chosen by more students than the keyed
answer. Rank by `distractorCount / keyCount`; negative discrimination (the item rewards the
weaker half) is the strong secondary signal.

**Why this matters more than it sounds:** this bank has ~235 confirmed wrong-key flips, and the
2026-06-03 audit found the dominant class was the **stealth** wrong key — internally consistent
solution, plausible, simply wrong. `audit:keys` is blind to it by construction (it catches only
solution-contradicts-key, duplicate options, not-exactly-one-correct); blind re-derivation
catches it and costs an agent per question. **Response data is the first cheap detector this
project has had for that class.** It does not find the answer — it says where to spend the
expensive attention.

A distractor outpulling the key means one of three things and the data cannot separate them:
the key is wrong · the question is hard and the distractor is a well-built trap (what a good
PYQ does) · a systematic misconception worth teaching to. **Leads, never verdicts.**

### Thresholds — set from the measured distribution, not a convention

**Enter the queue at n≥10 with any distractor beating the key. Default the view to ratio ≥2.
Sort key-never-chosen to the top.**

- **Queue size is the real constraint, and it is what picks the cut.** Ratio ≥1 yields ~179 raw
  (their 122 + our 57, minus overlap) — a pile nobody works through. Ratio ≥2 yields ~80, about
  a week at 10–15 a day. Ship the ≥2 view with a toggle to see everything.
- **Below ratio 2 at n≈12 you are looking at 6 responses against 5.** That is noise. At ≥2 with
  n≥10 it is at least ~7 against 3.
- **Key-never-chosen is the sharpest signal in the data** — 10+ attempts and nobody picked the
  keyed answer, 3 such items today. Ratio is infinite, so the implementation must **sort these
  first rather than divide by zero**.
- A binomial test is the statistically correct narrowing device and is **deliberately not
  built**. These are leads; ratio with `n` on screen lets the reviewer discount honestly, and a
  p-value here would dress triage as inference.

- **Surface: a `/browse` filter over a bounded id set** (~179 today), the shape
  `Filters.extraIds` already supports. No new page — you land in the normal browse surface with
  the normal edit link and the distribution already on the card.
- A lower bar than a measurement is acceptable, since a lead is a pointer. That brings the
  vault's 424 items at n≥10 into play on questions the tracker never sees — 57 of them.
- **An adjudicated lead writes a `question_reviews` row** (migration 0074). A probe never
  writes `confirmed` — only a human adjudication does.
- Nothing re-grades anything, here or there.

## Decisions taken

1. **Aggregate across sources, one number per card.** The bank is a global app; the tracker
   owns cohort analytics. An earlier precedence design (prefer the institute's number, fall
   back to the vault's) was rejected: pooling is self-correcting by weight, precedence throws
   away n, and the displayed number would change when a new institute onboards for reasons
   invisible to the viewer.
2. **Cross-institute pooling is accepted.** Institute A's cohort informs institute B's card.
   Counts only — nothing identifying a student, batch or institute crosses. Moot today with one
   institute, decided now rather than at institute #2.
3. **Storage at sitting grain, display aggregated.** See above.
4. **No difficulty promotion.** `questions.difficulty` is a `/browse` filter, drives
   `selectByQuota` in every mock blueprint, and is quoted as %HARD in 11 shipped guides.
   Overwriting it from measurement would silently change which papers get built and invalidate
   shipped editorial. Measured difficulty is not stored as a band at all for now.
5. **Nothing student-facing.** A student learning that 88% of a cohort missed a question before
   attempting it is an anchor, not information. A post-attempt review screen is a legitimate
   future use and is not this.
6. **Per-record export, decided 2026-09-11.** The short-term case is convenience; the long-term
   case is the real one, and it is why this is a decision rather than a preference:
   - **The asymmetry of regret is total.** Pooled is derivable from per-record and never the
     reverse, and the fallback ("re-export from their raw results if we ever need it") assumes
     `exam_results` still exists years from now, unpruned. If they archive and we kept only
     balances, the evidence is gone from both sides at once.
   - **Tenancy exit.** When an institute leaves — or turns out to have filed a paper with a
     wrong printed key across all its batches — withdrawing its contribution from a global
     aggregate is a `DELETE` with the grain and impossible without it.
   - **Time series.** `measured_at` per sitting answers questions a pooled figure structurally
     cannot: is this item getting easier (leak? taught to?), did difficulty move after a
     syllabus revision. Free with the grain, permanently foreclosed without.
   - **It makes a key fix verifiable**, closing the loop this feature opens: queue flags →
     human fixes → the next sitting's rows show the jump, and with `measured_content_hash` you
     can state "30% before, 68% after".
   - **It is where the architecture is heading.** A shared-DB tracker rebuild is a stated
     direction on their side; in that world per-record is simply what you get, so the JSON
     export may be transitional and our storage grain should not be.

   **Not raw per-student rows**, deliberately. That is another institute's students' individual
   answers crossing an app boundary for no analytical gain counts cannot give. Per-record
   *aggregates* are both the right privacy line and exactly the grain the analysis needs.

   **Accepted cost:** the read path is 25 questions × sittings-per-question, which approaches
   the PostgREST 1000-row cap past ~30–40 sittings on one question (≤3 today). Deliberately not
   pre-built for — when a question crosses ~20 sittings, add a maintained aggregate on the
   weekly job. Keep the ledger, maintain a balance for reads.
7. **Refresh weekly, both sources, in the existing Monday `db:backup` slot.** Their results
   arrive at roughly one exam a week (1,247 result rows over 35 exams ≈ 36 students each), the
   display is advisory rather than transactional, and with no endpoint on either side "after
   each upload" is a human step regardless — so a fixed slot beats a trigger with nothing to
   hang off. One runbook line, one cadence. On-demand run stays as the escape hatch.

## Deliberately not in scope

- Re-grading, on either side. Ever.
- Auto-correcting a key from a lead.
- Rebuilding batch or per-student analytics — that is the tracker's.
- Difficulty bands (see decision 4).

## Open questions — none

**Per-record was decided 2026-09-11** (decision 6). Everything else is settled: cadence
(decision 7), lead thresholds and numeric items (their own sections above), and overlap
(below).

### Answered by the first ingest, blocks nothing

**True overlap between the two sources.** It needs a question-id join against their database,
which this repo cannot reach — but their export carries the `questionId`s, so run #1 answers it
for free. Deliberately not chased, because **neither answer changes the design**: high overlap
means pooling mostly adds `n` to items already measured; low overlap means the vault mainly
extends coverage. Both are fine. The recorded proxy is 1,736 questions appearing in both an LWS
paper and a vault mock attempt, which is not the number.
