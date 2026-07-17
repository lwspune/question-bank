# UI Suggestions — PYQ Vault

> Handoff doc from a full-codebase UI review (2026-07-16). Each item is concrete, with file:line anchors verified against the code at review time (re-verify before editing — lines drift).
>
> **Context for the implementer:** the PRIMARY audience is students on mobile phones (360–430px, often flaky networks). Weight every decision mobile-first. The design system is shadcn + Tailwind with an indigo brand layer (`--brand`/`--brand-accent` in `globals.css`), serif (`Source Serif 4`) for question/teaching content vs sans (Inter) for chrome, `font-mono tabular-nums` for numerics. These conventions are load-bearing — extend them, never replace them.
>
> **Process:** per the project's global rules, present a plan and get confirmation before writing code; TDD any pure logic; `npm run prepush` must pass; smoke-test dynamic (`ƒ`) routes in a real browser (the build gate does not exercise them — see "Recurring pitfalls" in CLAUDE.md).

---

## Verdict (one paragraph)

Foundations are strong: disciplined tokens, semantic content hues (amber traps / sky self-check / violet practice / emerald checkpoints — **off-limits to change**, per CLAUDE.md), dark-mode pairs everywhere, above-average ARIA. The gaps are mobile ergonomics (touch targets, unlabeled nav, hover-only affordances), feedback states (autosave, pending transitions, skeletons), and two flat high-emotion moments (mock submit/result, homepage). No redesign needed — targeted fixes.

---

## Tier 1 — Mobile-critical (do these first)

### 1.1 Touch targets ≥ 44px on `<sm` screens
Sub-44px interactive elements cluster exactly where phone users tap most:
- Filter sheet segments (Kind/Difficulty) ~30px — `src/components/browse/FilterBar.tsx:143, 325`
- Year chips ~26px (`:282`), PresetChips ~26px (`:448`), checkbox rows ~20px (`:510-519`)
- Bookmark button `h-8 w-8` beside a `h-10` cart button in the same row — `src/components/browse/BookmarkButton.tsx:10-11` vs `QuestionCard.tsx:450`
- Mock palette cells `h-8` — `src/app/mock/[slug]/attempt/[attemptId]/MockRunner.tsx:387`
- /board "Show answer" is a bare `text-xs` text link (the most-tapped control on that page) — `src/app/board/BoardReader.tsx:255-261`
- Report trigger ~16px tall — `ReportQuestionDialog.tsx:108-114`
- Cart remove button `p-1` ~24px — `CartPill.tsx:359-366`

**Fix:** the precedent already exists — CartToggle deliberately uses `h-10 min-w-[44px]` on phones (`QuestionCard.tsx:450`). Apply it as a rule: a shared class (or a `size="touch"` Button variant) giving ≥44px hit area below `sm`. Visual size can stay compact; use padding/pseudo-element to extend the hit area where needed.

### 1.2 Labeled bottom nav on mobile
`src/components/PrimaryNav.tsx:86-87` hides all tab labels below `sm`, so phones show 5–6 unlabeled icons (Compass/BookOpen/NotebookPen/Timer/Library/FileText). Those glyphs are not self-explanatory.

**Fix (preferred):** a labeled bottom tab bar on `<sm` — icon + ~10px label, `env(safe-area-inset-bottom)` padding (precedent: `CartPill.tsx:141-143`), max 5 destinations, keep the top header for brand/exam-pill/theme/account. Watch z-index vs the floating CartPill and BackToNotes pills — they'd need to sit above the bar.
**Fix (cheap interim):** show tiny labels under the icons instead of `hidden sm:inline`.
Also fix the ≤340px squeeze: the header row has no overflow handling and the ExamPill renders the full exam name untruncated (`ExamPill.tsx:41-43`) — add `truncate max-w-[N]` on the pill label.

### 1.3 MockRunner — three exam-room gaps
File: `src/app/mock/[slug]/attempt/[attemptId]/MockRunner.tsx`
1. **Submit confirmation.** One tap on the always-visible header Submit (`:225-228`) irrevocably ends a 150-min exam. Add a confirm dialog showing the already-computed `counts` (`:181-191`): "12 unanswered · 3 flagged · Submit?". Every real CBT shell does this.
2. **Autosave visibility.** `saveRow` (`:68-91`) is fire-and-forget with a swallowed catch; on a dead connection a student gets zero signal. Add a small header indicator: "Saved ✓ / Saving… / Offline — will retry", and consider flushing the *backlog* (not just the current question) at submit (`:111-116`).
3. **Mobile palette → `ui/sheet`.** The hand-rolled overlay (`:406-419`) has no focus trap, no Escape, no scroll lock, no `role="dialog"`, no animation — `src/components/ui/sheet.tsx` provides all of it. While there: group palette cells by `sectionKey` for GAT (English 1–50 / GK 51–150 — the field is already on every question, `:376`), and raise cell size per 1.1.

Also: the 5-minute low-timer state is color-only (`:194, :207`, `aria-live="off"`) — add a one-shot toast + SR announcement at the threshold (WCAG 1.4.1). And label the cryptic marks chip `+2.5 / -0.83` (`:239-241`).

### 1.4 Hover-only affordances invisible on touch
- "Open →" reveal on homepage & /nda cards: `opacity-0 group-hover:opacity-100` — `src/app/page.tsx:263`, `src/app/nda/page.tsx:267`
- Zoom badge on board images — `BoardReader.tsx:308`

**Fix:** visible by default below `sm`, hover-reveal above: `opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-focus-within:opacity-100`.

### 1.5 Contain inline math overflow in /notes prose
`FormulaBlock.tsx:35` correctly wraps display math in `overflow-x-auto [&_.katex]:max-w-full`, but these do NOT: concept intuition/definition (`ConceptUnitCard.tsx:722-734`), worked-example steps (`WorkedExampleAuthored.tsx:48-59`, `SelfCheckCard.tsx:44-50`), PYQ solution (`WorkedExampleCard.tsx:183`). A wide `\(...\)` blows out the card at 360px — this is the project's own documented mobile gotcha (`min-w-0 overflow-x-auto`). Apply the same containment wrapper.

---

## Tier 2 — Interaction & feedback states

### 2.1 One `SegmentedControl` primitive; focus rings everywhere
The segmented-toggle pattern is hand-rolled 4× with drift: FilterBar kind (`:133`) + difficulty (`:311`), DownloadDialog `ModeButton` (`:176`), CartPill `SortButton` (`:175`) — none carry `focus-visible:ring`. The same focus gap covers ~10 notes controls (`SelfCheckCard.tsx:34-41`, `PracticeSet.tsx:58-66`, `CheckpointSelfScore.tsx:62-76`, `NotesProgressControls.tsx:78-116`, `WorkedExampleCard.tsx:86-99, 150-163`, viz buttons), dashboard `ActionCard` (`dashboard/page.tsx:329-332`), and the board reveal (`BoardReader.tsx:255`). Build one `SegmentedControl` in `ui/`, and define one shared focus-class constant (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — already the app's idiom) applied to every hand-rolled control. Satisfies the repo's own stated a11y rule and fixes 1.1 for the segments in the same pass.

### 2.2 /browse pending + skeleton
- Filter changes dim only the sidebar (`FilterBar.tsx:374`); the results list stays fully interactive/opaque during the URL transition — users double-fire filters and read stale counts. Dim the list + `aria-busy` during `startTransition`.
- `src/app/browse/loading.tsx:38-57` skeleton mirrors the RETIRED single-row card layout (and omits the bookmark button); the real card (`QuestionCard.tsx:151-227`) is two stacked rows. Rebuild the skeleton to match — kills the visible reflow.
- CartPill loading is a bare "Loading…" text line that height-jumps (`CartPill.tsx:200-202`) — use a small skeleton.

### 2.3 Mock result page: growth-framed, not a bare score
File: `src/app/mock/attempt/[attemptId]/result/page.tsx`. Currently a centered score + mono section rows + ALL questions eagerly rendered (150 KaTeX cards for GAT, `:131-136`). Violates the project's own engagement gate ("never a bare score"). Concretely:
1. Verdict headline naming best + worst section ("Strong on English — Geometry cost you 18 marks") — data already in `summary.sectionScores` (`:93-108`).
2. Per-section bars with accuracy % (add a `ui/progress` or reuse the ByExamBreakdown bar pattern, `dashboard/page.tsx:385-422`).
3. **"Review mistakes (N)" filter, default wrong-only**, with per-section jump; lazy-render the rest.
4. Prior-attempt comparison on retakes (attempt history already exists).
5. Surface `timeSpentSecs` (collected per-question in the runner, never shown).

### 2.4 Add missing `ui/` primitives instead of styling around them
- `checkbox` — retires OS-blue natives in `FilterBar.tsx:515-519`, `DownloadDialog.tsx:216-231`, `ProfileForm.tsx:211-236`, `MobileGate.tsx:94-101`
- `table` — three hand-copied admin tables (`dashboard/mocks`, `dashboard/students`, `dashboard/mocks/[slug]`); also fix the `overflow-hidden` (clips on narrow screens, `mocks/page.tsx:37`) vs `overflow-x-auto` inconsistency
- `tooltip` — un-cryptifies "C / W / S" (`mocks/[slug]/page.tsx:112`) and the marks chip
- `progress` — result-page bars, profile completion meter

### 2.5 Small state fixes
- **BUG:** signed-in students get the anon Report dialog — `src/app/browse/page.tsx:309` passes `isLoggedIn={!!member}` (org staff only); should be the existing `isSignedIn` (defined ~line 64). One line.
- ExamPill: no pending spinner during `router.refresh()` (`ExamPill.tsx:41`) — looks dead on slow connections; stale doc comment says `qb:exam`, code uses `qb_exam` (`:11` vs `:27`).
- Download busy state is text-only ("Generating…", `DownloadDialog.tsx:273-292`) — add a spinner; don't mutate the Cancel button's label (`:254`).
- `aria-expanded` on the notes/board reveal buttons; `aria-busy` on pending regions.

---

## Tier 3 — Visual polish & system tightening

### 3.1 Type scale: consolidate, and un-shrink the teaching content
- **Worked-example solution steps — the core teaching content — render `text-sm text-muted-foreground`** (small AND grey): `WorkedExampleAuthored.tsx:50`, `SelfCheckCard.tsx:44`, PYQ solutions `WorkedExampleCard.tsx:168`. Raise to `text-base text-foreground` serif.
- Off-scale sizes sprawl: `text-[11px]`, `text-[13px]`, `text-[15px]` across browse/notes/board (e.g. `QuestionCard.tsx:217, 412`, `CartPill.tsx:349-355`, `ChapterRevisionSheet.tsx` almost entirely 11px). Consolidate to the Tailwind scale (`text-xs`/`text-sm`/`text-base`); reserve the smallest tier for true metadata.

### 3.2 Buttons: stop hand-rolling
Link-buttons bypass `Button asChild` with four different geometries: `page.tsx:166, 174, 284`, `nda/page.tsx:157, 165, 289`, `pricing/page.tsx:84`, `account/page.tsx:103`. The pricing CTA slot even changes color by auth state (brand indigo `PricingClient.tsx:111` vs hand-rolled near-black `pricing/page.tsx:84-86`). Route all through `Button` — free geometry consistency and focus rings.

### 3.3 One accent story on marketing chrome
Card icon chips/links on homepage/nda/pricing/account use `text-primary` while header/pill/meter use `text-brand-accent` (e.g. `page.tsx:205` vs `AppHeader.tsx:43`). Per the repo's own convention (brand on chrome the eye lands on), exam-card icons and pricing accents should be brand. Also normalize: `rounded-lg` vs `rounded-xl` on sibling surfaces; `bg-muted/15|/20|/30` → pick at most two tints. **Do NOT touch the /notes//guide content hues** (amber/sky/violet/emerald/indigo — protected by CLAUDE.md).

### 3.4 Homepage: one visual anchor + honest copy
`src/app/page.tsx` is three identical card grids — organized but flat. Cheap, high-impact:
1. Soft indigo radial/gradient behind the hero.
2. **One live interactive question card above the fold** ("Try one — tap an option") — the product IS the demo; QuestionCard's reveal interaction already exists.
3. Social-proof strip: live question count already renders (`:155-157`); add mocks-taken / papers-downloaded once available.
4. Copy: hero says "Free to browse, no sign-up" (`:149`) but downloads require sign-in — align to "Browse free · sign in to download". Same stale claim on `/nda` (`nda/page.tsx:142` + metadata `:32`), which also ships hardcoded drifted counts (`GUIDE_PREVIEWS` qCounts `:53-62`, metadata "4,800+" vs ~8,259 live) — derive from live stats or drop the numbers.
5. The eyebrow "PYQ Vault" (`:147`) duplicates the header wordmark directly above it — use the slot for a positioning line.

### 3.5 Notes: momentum + monotony
- **PrevNextNav on subtopic pages** — the component exists and is used on ~30 /guide pages, never on /notes; order data is in `chapter.chapter.subtopicOrder`. A student finishing subtopic 3 of 6 currently dead-ends.
- Per-concept **PYQ-count chip** on ConceptUnitCard headers — breaks the N-identical-supercards monotony with meaning (weight data already exists in ConceptWeightTable).
- Reveal interactions swap instantly — add a 150–200ms height/opacity transition (the browse card already has the `grid-rows` trick to copy, `QuestionCard.tsx:249-260`).
- Breadcrumb omits the Notes-hub level — a subtopic page can't navigate to `/notes/<examSlug>`.

### 3.6 Board reader: long-chapter navigation
`BoardReader.tsx` renders every question eagerly with all groups open (Differentiation = 363 q on one route). Add: sticky section jump-list (data = `section_group`), collapse-all / default-collapsed past the first group, lazy render below the fold. Raise the reveal control per 1.1.

### 3.7 Footer + auth pages
- Footer (`src/components/Footer.tsx`) is a flat 13-link NDA dump: add `/privacy` (mobile numbers are collected — it belongs here), `/pricing`, `/mock`, `/board`; group into columns; fix stale "free for teachers" (`:12-13`) and the pre-rebrand mailto subject "Question Bank" (`:101`).
- Login BrandPanel still says "A focused tool for teachers" (`login/page.tsx:186-192`) — product is student-first; unify the two copy-pasted BrandPanels (login vs signup) into one shared component with current copy.
- Brand mark on auth pages is not a link and there's no AppHeader — no way back to the site (`login:63-68, 176-179`).
- No forgot-password path is even acknowledged (`login:87-146`) — backend flow is a known deferred item; at minimum add a "contact us" line so wrong-password users aren't dead-ended.

---

## Protect list — do NOT regress

- Cart count-pulse + pill-in micro-interaction chain (`CartPill.tsx:71-74, 152-156`)
- Click-to-reveal self-testing with emerald/red verdicts + reset-on-collapse (`QuestionCard.tsx:79-129, 294-316`)
- SetBanner passage grouping (`QuestionList.tsx:110-135`)
- KaTeX overflow discipline on /browse (collapsed `line-clamp-2` ↔ expanded `overflow-x-auto` swap — a documented gotcha, `QuestionCard.tsx:216-219`)
- Mobile filter sheet staged-apply architecture (`MobileFilters.tsx:48-72, 115-127`)
- PracticeGate no-flash skeleton (`PracticeGate.tsx:39-50`)
- Refresh-resistant mock timer derived from `expiresAt` (`MockRunner.tsx:139-146`)
- Serif/sans/mono typography split; semantic content hues; dark-mode class pairs; `tabular-nums` on counts
- Native `<details>` disclosures in server components (`ChapterRevisionSheet`, `ConceptWeightTable`)

## Suggested sprint order (mobile-first)

1. **Sprint A (mobile-critical):** 1.1 touch targets, 1.2 bottom nav, 1.3 MockRunner (all three), 1.4 hover affordances, 1.5 math overflow, 2.5 Report bug
2. **Sprint B (feedback):** 2.1 SegmentedControl + focus rings, 2.2 pending/skeleton, 2.3 result page
3. **Sprint C (polish):** 2.4 primitives, 3.1–3.7

Each sprint: plan → confirm → TDD pure logic → implement → `npm run prepush` → browser smoke on real 360px viewport (dynamic routes especially).
