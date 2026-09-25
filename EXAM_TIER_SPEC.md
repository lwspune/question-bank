# Exam tiers — a customised feed for signed-in students (spec, 2026-09-25)

What this document is: the implementation spec for showing a signed-in student
only the exams that fit their stage, while an anonymous visitor keeps seeing
everything. It is the source of truth for this work. Read it whole before
writing code. The engagement principles gate in CLAUDE.md applies: a feed that
narrows what a student sees is a mechanic, and it passes the gate only because
it removes noise for a stressed cohort, never because it withholds content.

The owner's decision (2026-09-25): three tiers — Class 9–10, Class 11–12 plus
droppers, Graduation. Signed-in students see their tier first. Anonymous
visitors see all exams, so SEO is untouched. A student can change the tier
at any time. New exams (SSC, MPSC, CAPF, UPSC) will arrive in the Graduation
tier, which is why the tier must be declared per exam in one place.

## 1. What already exists — do not rebuild it

| Thing | Where | Status |
|---|---|---|
| Target exams per student | `student_profiles.target_exams` (migration 0048) | 318 of 394 profiles have at least one; 137 have two or more |
| Stage per student | `student_profiles.stage`, enum in `src/lib/profile/onboarding.ts` | Only 139 of 394 set. The five values already collapse onto the three tiers |
| The exam registry | `EXAM_REGISTRY` in `src/lib/exam/examContext.ts` | Source of truth for every per-exam flag. 18 slugs today |
| Exam chips for the two profile forms | `buildExamChips` in `src/lib/profile/examChoices.ts` | Filters `noPublicContent` BEFORE grouping into board families. Keep that order |
| Viewer identity in the browser | `useViewerSession` → `GET /api/me/header` → `getHeaderSession` in `src/lib/auth.ts` | One fetch per page load, anon pays nothing. This is the transport for the tier |
| Active-exam cookie `qb_exam` | `src/lib/exam/examCookie.ts`, read in `HeaderBar.tsx` | Holds the FIRST target exam only. Stays as the anon-safe fallback |
| Signed-in home | `src/app/me/page.tsx` | Already `force-dynamic`, already reads the profile. Personalise here on the server |
| Index pages | `/mock`, `/notes`, `/guide`, `/board`, the `/browse` exam picker in `FilterBar.tsx` | ISR-cached, read NO identity on the server. Personalise here in the browser only |

Two facts from the live data that shape the rules below (measured 2026-09-25):

- **34 of 318 students with targets span two tiers.** 25 of them are CDS
  plus a Class 11–12 exam, almost always NDA — GAT English is shared and CDS
  is the NDA aspirant's plan B. 12 students who say Class 11, 12 or dropper
  target CDS; 7 who say college target a Class 11–12 exam.
- **255 profiles have no stage but 318 have target exams.** The tier must be
  derivable from targets, or two thirds of students get no feed.

Therefore: **the tier COLLAPSES the other tiers, it never deletes them, and a
student's chosen targets are always shown even when outside their tier.**

## 2. Non-goals

- No migration. No new column. Stage and target exams are the whole model.
- No RLS change and no server-side content filter. Content stays public.
- No change to the HTML an anonymous visitor receives on any cached page.
  The server render of every index page must stay byte-identical to today.
- No hiding of QUESTIONS on `/browse` by tier. Only the exam picker reorders.
- No writes derived from batch enrolment (a suggestion is phase 2, §7).
- No tour, no modal, no interstitial. The welcome screen keeps its two screens.

## 3. Data model (pure TS, no DB)

### 3.1 The tier enum and the registry field

In `src/lib/exam/examContext.ts`:

```ts
export type ExamTier = "school" | "senior" | "graduate";

export const EXAM_TIERS: readonly ExamTier[] = ["school", "senior", "graduate"];

export const TIER_LABELS: Record<ExamTier, string> = {
  school: "Class 9–10",
  senior: "Class 11–12 & droppers",
  graduate: "Graduation & after",
};
```

Add a REQUIRED `tier: ExamTier` to `ExamEntry`, with a doc comment saying it
is the exam's typical eligibility stage, one value, and that cross-tier
students are handled by the union rule in §3.3, not by a second tier here.

Assignments for the 18 entries:

| Tier | Slugs |
|---|---|
| school | `foundation-course`, `mh-sb-9`, `mh-ssc-10`, `cbse-10` |
| senior | `nda`, `mht-cet`, `jee-mains`, `neet`, `worksheets-11-12`, `cbse-11`, `cbse-12`, `isc-12`, `mh-sb-11`, `mh-hsc-12`, `ipmat-indore`, `ipmat-rohtak`, `jipmat` |
| graduate | `cds` |

Future SSC, MPSC, CAPF, UPSC entries declare `tier: "graduate"` on the same
line as their other flags. Because the field is required, TypeScript refuses
a new entry without one.

### 3.2 Stage → tier

In `src/lib/profile/onboarding.ts` (the stage enum already lives there):

```ts
export function tierOfStage(stage: Stage | null | undefined): ExamTier | null
// "class-9-10" → "school"
// "class-11" | "class-12" | "dropper" → "senior"
// "college" → "graduate"
// null/undefined → null
```

### 3.3 The feed resolver — new file `src/lib/exam/examFeed.ts`

Pure. No I/O. Takes the registry as an argument so tests can pass a synthetic
list (the `buildExamChips` precedent: asserting only against the real
registry passes vacuously).

```ts
export type FeedInput = {
  stage: Stage | null;
  targetExams: readonly ExamSlug[];   // already sanitised
};

export type ExamFeed = {
  /** null = nothing known; show everything in registry order. */
  tier: ExamTier | null;
  /** Shown first: target exams in their stored order, then the rest of the
   *  tier in registry order. Never contains a noPublicContent exam. */
  primary: ExamSlug[];
  /** Collapsed under "Other exams". Registry order. Never noPublicContent. */
  other: ExamSlug[];
};

export function resolveStudentTier(input: FeedInput, entries: readonly ExamEntry[]): ExamTier | null
export function resolveExamFeed(input: FeedInput, entries: readonly ExamEntry[]): ExamFeed
export const ANON_FEED: ExamFeed  // tier null, primary = all public exams in registry order, other = []
```

Rules for `resolveStudentTier`:

1. If `stage` is set, `tierOfStage(stage)` wins. A stated stage outranks an
   inferred one.
2. Else if `targetExams` is non-empty, the tier held by the MOST targets. On a
   tie, the tier of the FIRST target (the same "first is primary" rule
   `primaryExam` already uses).
3. Else null.

Rules for `resolveExamFeed`:

- `primary` = targets (stored order, unknown slugs dropped) followed by every
  other entry whose `tier` equals the resolved tier, in registry order.
  Deduplicated. `noPublicContent` entries excluded.
- `other` = every remaining public entry in registry order.
- Tier null → `primary` = targets first, then all public entries in registry
  order; `other` = []. With no targets either this equals `ANON_FEED`.

### 3.4 Chips for the two profile forms

In `src/lib/profile/examChoices.ts`:

```ts
export function examChipsForTier(
  tier: ExamTier | null,
  selected: readonly string[],
  entries: readonly ExamEntry[]
): { shown: ChipOption[]; hidden: ChipOption[] }
```

- `shown` = `buildExamChips(entries filtered to: tier matches OR slug is in selected)`.
- `hidden` = `buildExamChips(the rest)`.
- Tier null → everything in `shown`, `hidden` empty.
- Filter BEFORE grouping, for the reason recorded on `buildExamChips`: a
  board family left with one class in a tier (Maharashtra 9–10 in school,
  11–12 in senior) must degrade to a flat chip, not a one-option group. This
  is the existing rule 2 of `groupExamFamilies` doing its job.

### 3.5 Carry stage + targets to the browser

Extend `HeaderSession` in `src/lib/header-session.ts` with two additive
fields:

```ts
stage: Stage | null;
targetExams: ExamSlug[];
```

`getHeaderSession` in `src/lib/auth.ts` adds one own-row read of
`student_profiles` (`stage, target_exams`) to its existing `Promise.all`,
through the user's JWT (RLS own-row select, 0045). Sanitise with
`sanitizeTargetExams` and `isStage`. A failed read yields `null` / `[]`,
never a thrown error — the header must render regardless.

Cost: one extra small query per page load for signed-in users only. Anon is
short-circuited before any query, unchanged.

Add a client hook `src/lib/viewer/useExamFeed.ts`:

```ts
export function useExamFeed(): { loading: boolean; signedIn: boolean; feed: ExamFeed }
```

Built on `useViewerSession`. While loading, and for anon, it returns
`ANON_FEED`. That is the load-bearing property: the FIRST client render must
equal the server render (no hydration mismatch, identical to what anon sees),
and personalisation is applied after identity arrives — exactly how
`HeaderBar` applies the cookie.

## 4. Surfaces, in delivery order

### 4.1 `/welcome` screen 1 and `/account` — stage first, then the tier's exams

`src/app/welcome/ExamOnboarding.tsx` and `src/app/account/ProfileForm.tsx`.

- Reorder: the "Your stage" chips render ABOVE the "Target exam" chips.
- The exam chips come from `examChipsForTier(tierOfStage(stage), exams, EXAM_REGISTRY)`.
  `shown` renders as today. `hidden`, when non-empty, sits behind a
  disclosure button labelled "Show all exams" (`aria-expanded`, visible focus
  ring, lucide `ChevronDown`). Opening it appends the hidden chips below.
- Changing the stage re-filters live. A selected exam outside the new tier
  stays selected AND stays visible (it is in `selected`, so §3.4 keeps it).
- `initialExam` from the cookie stays pre-selected as today.
- Continue still needs at least one exam; Skip still stamps `onboarded_at`.
- Subtitle copy on `/welcome`: "Pick your stage, then your exam(s). We'll put
  your bank, notes and mocks front and centre. You can change this anytime."
- The API route `/api/profile/onboarding` and the profile PATCH are
  unchanged. Nothing new is stored.

### 4.2 `/me` — the exam-scoped home (server-side)

`src/app/me/page.tsx` already reads the profile through `getOnboardingState`;
add it to the existing `Promise.all` if it is not already there, and compute
`resolveExamFeed` on the server. No client island needed; the page is dynamic.

- **"Your exams" row** under the page header: one chip per target exam, in
  order, each linking to the best per-exam destination: `/mock/exam/<slug>`
  when the entry has `hasMocks`, else `resolveBankHref(examId)`. Trailing
  "Change" link to `/account`. Hidden when there are no targets.
- **No-target card** (replaces the row when `targetExams` is empty): one
  line, "Tell us your exam and this page will show only what you need", a
  single button to `/account`. Not a modal, not repeated elsewhere.
- **Mock card** CTA and empty-state href: `/mock/exam/<slug>` for the first
  target that has mocks, else `/mock` as today.
- **Notes card** CTA and empty-state href: `/notes/<slug>` when
  `getNotesExamGroup(slug)` is non-null for the first target that has notes,
  else `/notes` as today. The "coming soon" dead end that kept the Notes tab
  unpersonalised must not be reintroduced here.
- **Stage-drift nudge**: pure `needsStageNudge({ stage, now })` in
  `src/lib/profile/onboarding.ts` returns true from 1 April to 30 June when
  `stage` is `class-9-10`, `class-11` or `class-12`. Renders one line,
  "Still in {STAGE_LABELS[stage]}? Update your stage", linking to `/account`.
  Dismissal is a per-viewer `localStorage` key carrying the year, wrapped in
  try/catch, so it is a convenience, never state.

### 4.3 The four index pages — "Your exams" first, the rest collapsed (client island)

`/mock` (`src/app/mock/page.tsx`), `/notes` (`src/app/notes/page.tsx`),
`/guide` (`src/app/guide/page.tsx`), `/board` (`src/app/board/page.tsx`).

One shared client component, `src/components/exam/ExamFeedList.tsx`:

```ts
type FeedItem = { slug: ExamSlug; key: string };   // key = React key, slug = ordering key
<ExamFeedList items={FeedItem[]} renderItem={...}>  // NO — see below
```

Do NOT pass render functions or icon components from the server page into
the island: a function prop from a Server Component to a Client Component
compiles under `next dev` and throws under `next start` (Recurring pitfalls,
CLAUDE.md). Instead each page passes SERIALISABLE card data (strings,
numbers, hrefs, an icon NAME) and the island owns the card markup and an
icon-name → lucide map. The four pages' card shapes differ, so the island
takes a generic `cards: Array<{ slug: ExamSlug; ...serialisable }>` plus a
`variant` prop selecting the card renderer, or each page gets its own thin
island wrapping the shared ordering hook. Either is acceptable; the shared
part that MUST exist once is:

```ts
// src/lib/exam/examFeed.ts
export function splitByFeed<T>(items: readonly T[], slugOf: (t: T) => ExamSlug | null, feed: ExamFeed)
  : { primary: T[]; other: T[] }
// primary in feed.primary order; other in original order; slugOf null → primary (never drop an unknown)
```

Behaviour of the island:

- First render = the full list in server order (equals `ANON_FEED`, so the
  hydrated DOM matches the server HTML). After `useExamFeed` resolves for a
  signed-in student with a non-null tier: `primary` renders under an
  eyebrow "Your exams", `other` collapses under a disclosure button "Other
  exams (N)" (`aria-expanded`, visible focus ring). A "Change your exams"
  link to `/account` sits beside the eyebrow.
- Tier null (anon, loading, skipped onboarding with no targets): the list is
  exactly today's, no eyebrow, no disclosure.
- A family node (CBSE, Maharashtra State Board) is primary when ANY member
  is in `feed.primary`. Families are never split across the two groups.
- Cards keep every href they have today. Only order and grouping change.

The `/board` and `/guide` pages already build their lists from pure helpers
(`groupExamFamilies`, `getGuideExamGroups`); `/mock` from `buildMockExamCards`;
`/notes` from `getNotesExamGroups`. Keep those calls on the server and hand
their output (minus functions/components) to the island.

### 4.4 `/browse` exam picker

`src/app/browse/FilterBar.tsx` is already a client component. Use
`useExamFeed` there and order the exam `Select` as two `SelectGroup`s, "Your
exams" then "Other exams", when the tier is non-null; otherwise today's single
list. Family nodes follow the same any-member rule. The `examSelection` /
`resolveFamilySelection` logic is untouched — only the option order changes.

### 4.5 Nav shortcuts — Mocks and Notes tabs

`src/lib/exam/examNav.ts`, `src/lib/nav/mobileTabs.ts`, `HeaderBar.tsx`,
`AppHeader.tsx`, `PrimaryNav.tsx`.

- Add `mockHref` to `ExamNav`: `/mock/exam/<slug>` when the active exam has
  `hasMocks`, else `/mock`. `resolveMobileTabs` uses it instead of the
  `MOCK_TAB_HREF` constant.
- `notesHref` becomes `/notes/<slug>` ONLY when that exam has shipped notes.
  Pass the set of notes-bearing slugs from the server the way `examIds` is
  passed today (`AppHeader` computes `notesExamSlugs()` once; it is public
  and identical for everyone). Do NOT import `NOTES_CHAPTERS` into
  `HeaderBar` — it is a large editorial module and `HeaderBar` is in every
  page's client bundle.
- The active exam for the nav stays the `qb_exam` cookie (available at first
  paint, no fetch). It equals `targetExams[0]` by construction.

## 5. Tests — write these FIRST (TDD is mandatory)

Pure helpers get unit tests before implementation. Name the files after the
existing neighbours.

- `tests/exam-context.test.ts` (extend): every `EXAM_REGISTRY` entry has a
  `tier` in `EXAM_TIERS`; every tier has at least one public entry; the
  table in §3.1 is asserted slug by slug so a later edit is a deliberate
  change, not drift.
- `tests/profile-onboarding.test.ts` (extend): `tierOfStage` for all five
  stages and null; `needsStageNudge` at 31 March, 1 April, 30 June, 1 July,
  and for `dropper`/`college`/null (never nudged).
- `tests/exam-feed.test.ts` (new), against a SYNTHETIC registry:
  - stage wins over targets (stage college + target nda → graduate).
  - no stage: majority of targets; tie → first target's tier.
  - nothing known → `ANON_FEED`, and `ANON_FEED.other` is empty.
  - `primary` order = targets first in stored order, then tier in registry order.
  - a target outside the tier is in `primary`, not `other` (the CDS+NDA case).
  - `noPublicContent` never appears in either list.
  - `splitByFeed` keeps an item with `slugOf` null in `primary`, keeps `other` in input order.
- `tests/exam-choices.test.ts` (extend): `examChipsForTier` — a selected
  out-of-tier exam is in `shown`; Maharashtra 9–10 in `school` renders as
  flat chips (family of one degraded), CBSE 11+12 in `senior` renders as a
  group; tier null puts everything in `shown`.
- `tests/header-session.test.ts` (extend): the two new fields default to
  `null` / `[]` and `resolveHomeHref` is unchanged.
- `tests/exam-nav.test.ts` + `tests/mobile-tabs.test.ts` (extend):
  `mockHref` for an exam with and without mocks; `notesHref` is `/notes/<slug>`
  only when the slug is in the passed notes set, `/notes` otherwise.
- `tests/prodContractFiles.ts` — nothing new; the registry is static.

No jsdom here, so the islands' RENDER is not unit-testable. Their ordering
logic is `splitByFeed`, which is.

## 6. Verification before claiming done

- `npm run gate` green (typecheck → lint → docs:budget → notes:latex →
  notes:lint if touched → test → build).
- **Cache safety, from the artifacts, not from reasoning:** after `next build`,
  `find .next/server/app -name '*.html' | wc -l` must not drop below the
  pre-change count, and a grep of `.html` and `.rsc` files for an email,
  "Your exams", "Other exams" and `targetExams` must find nothing — the
  personalised strings may exist only in client-rendered output.
- Anonymous `curl` of `/mock`, `/notes`, `/guide`, `/board`, `/browse`
  returns 200 and the exam list in today's order.
- Behind sign-in there is NO headless proof of render. Say so, and hand the
  owner this checklist: `/welcome` on a fresh account (stage first, chips
  filter, "Show all exams" works, out-of-tier pick survives a stage change);
  `/account` same; `/me` shows the "Your exams" row and per-exam CTAs;
  each index page shows "Your exams" then a collapsed "Other exams (N)";
  a CDS+NDA profile sees both in "Your exams"; the phone tab bar's Mocks tab
  lands on the exam's catalogue; keyboard reaches and opens every disclosure.
- Prefetch check: every new `<Link>` to a dynamic route in a list gets
  `prefetch={false}` (the 2026-09-15 `/performance` outage class).

## 7. Phase 2 (not in this build)

- **Batch-derived suggestion:** a student with no targets who is enrolled in
  a batch with `batches.exam_id` sees that exam suggested on the `/me`
  no-target card. A suggestion, never a silent write.
- **Stage backfill:** the 255 stage-less profiles could be stamped with
  their derived tier's default stage. Declined for now: a derived value
  stored as a stated one is the "declared fact rots" pattern, and §3.3
  derives it at read time for free.
- **Per-tier home page for anon:** out of scope; the anonymous home is the
  SEO front door and shows everything by decision.

## 8. Delivery

Five branches, merged `--no-ff` in this order, each green on its own:

1. `feat/exam-tier-core` — §3 (registry field, `tierOfStage`, `examFeed.ts`,
   `examChipsForTier`, header payload, `useExamFeed`) with all §5 tests.
2. `feat/exam-tier-welcome` — §4.1.
3. `feat/exam-tier-me` — §4.2.
4. `feat/exam-tier-indexes` — §4.3 and §4.4.
5. `feat/exam-tier-nav` — §4.5.

Each branch's commit message follows conventional commits. After branch 5,
add one digest entry to the CLAUDE.md Decisions log (≤1.2 KB, long form in
DECISIONS_HISTORY.md), append the new files to ARCHITECTURE.md, and write the
tier column into the exam table in CLAUDE.md's header so the next exam's
author sees it beside the other flags.
