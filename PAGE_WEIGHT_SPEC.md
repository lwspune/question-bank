# Page weight spec

**Status: PLAN, nothing built. Awaiting the owner's OK per item.** Written 2026-11-24.

**Goal:** make pages lighter for a student on a budget phone, with **no visible
change to any student screen and no change to what a search engine reads.**

Every number below was measured on 2026-11-24 against the live site. None is an
estimate unless it says so.

---

## 1. What a student's phone does today

Measured in headless Edge as a **signed-out phone** (390 px wide, mobile user
agent, processor slowed 4 times to stand in for a mid-range Android phone, empty
cache). "Sent" is the compressed download. "Unpacked" is what the phone has to
read after unpacking.

| | Notes page (HSC Vectors, Triple products) | Plain page (`/pricing`) |
|---|---|---|
| Sent, page open, no scrolling | **1,143 KB** in 88 requests | 1,051 KB in 80 requests |
| Unpacked, page open | 4,428 KB | 3,315 KB |
| Sent, after scrolling to the foot | **1,599 KB** in 155 requests | 1,079 KB |
| Unpacked, after scrolling to the foot | **6,991 KB** | 3,403 KB |
| Time the page is frozen while loading (total blocking time) | **2.8 s** (36 freezes, longest 0.6 s) | 0.4 s |
| Largest content shown at | 2.2 s | 1.8 s |
| Elements on the page | 10,753 | 312 |
| Layout shift | 0.001 | 0.001 |

Where the sent bytes go, notes page, page open:

| Part | Sent | Unpacked | Files |
|---|---|---|---|
| Scripts | 642 KB | 1,988 KB | 43 |
| Fonts | 178 KB | 176 KB | 6 |
| Other pages fetched in advance | 145 KB | 1,213 KB | 24 |
| Images | 61 KB | 60 KB | 4 |
| The page itself (HTML) | 48 KB | 757 KB | 1 |
| Styles | 38 KB | 205 KB | 4 |

### What the numbers say

1. **Every page costs about 1 MB before it shows anything of its own.** `/pricing`,
   a page with 312 elements, downloads 1,051 KB. So the weight is the shared
   shell (scripts, fonts, pages fetched in advance), not the notes.
2. **The notes page's own problem is the freeze, not the download.** It adds
   only about 90 KB of download over `/pricing`, but it freezes the phone for
   2.8 s against 0.4 s. That is 10,753 elements being wired up, 134 equations
   being worked out a second time, and KaTeX (81 KB sent, 270 KB unpacked).
3. **Scrolling to the foot of a notes page fetches 57 more pages in advance:**
   +416 KB sent, +2.5 MB unpacked. The footer links cause it: `/questions`
   alone is 902 KB unpacked, `/formula` 292 KB, plus every exam's notes hub.
4. **The largest script files on every page:**

   | File holds | Sent | Unpacked | On every page? |
   |---|---|---|---|
   | KaTeX | 81 KB | 270 KB | Maths pages only |
   | React | 71 KB | 223 KB | Yes, needed |
   | Supabase sign-in library | 61 KB | 228 KB | Yes, even signed out |
   | Next router | 44 KB | 157 KB | Yes, needed |
   | Payment code mixed with Next code | 34 KB | 100 KB | Yes |
   | V's chat window and practice builder | 30 KB | 103 KB | Yes, before V is opened |
   | Clarity (third party) | 25 KB | 72 KB | Yes |
   | Avatar menu and its popover | 24 KB | 68 KB | Yes, needed |

5. **The HTML of the notes page is 757 KB unpacked, and 481 KB of it (64%) is
   finished maths.** Inside that: 180 KB of arrow drawings (251 identical copies
   of the arrow over a vector), 88 KB of inline styles, 88 KB of class names,
   52 KB of the hidden screen-reader copy. It compresses to 48 KB, so the cost
   is in reading and laying out, not in downloading.

### Corrections to the first analysis (same day)

- "580 KB per notes page" counted only the page and the scripts named in its
  HTML. Fonts, images, scripts loaded later and pages fetched in advance bring
  the true figure to 1,143 KB.
- "Each header link is fetched twice" was a misreading. Next 16 asks for a small
  route outline first, then the page. That is by design. The real double fetches
  are `/browse` (99 KB, twice) and sibling subtopic pages (125 KB, twice).
- "Payment code is 100 KB" and "V is 140 KB" were both overstated. See the table
  above.

---

### Baseline, all page types (2026-11-24, item 0's first run)

`npm run audit:page-weight -- --save-baseline`, live site, one run per page.
Saved in `scripts/perf/page-weight-baseline.json`.

| Page | Sent at open | Sent scrolled | Unpacked scrolled | Requests open / scrolled | Blocking | Elements |
|---|---|---|---|---|---|---|
| `/` | 1,083 | 1,930 | 8,375 | 82 / 202 | 1.0 s | 2,288 |
| `/browse` | 966 | 966 | 3,209 | 94 / 99 | 0.3 s | 717 |
| `/questions/nda/mathematics/3d-geometry` | 1,158 | 1,958 | 9,701 | 96 / 172 | 1.2 s | 15,257 |
| `/mock` | 1,065 | 1,653 | 6,751 | 86 / 168 | 0.3 s | 872 |
| `/notes` | 1,122 | 1,952 | 8,464 | 98 / 253 | 0.3 s | 963 |
| `/notes/nda` | 1,173 | 1,548 | 6,539 | 97 / 150 | 0.2 s | 1,004 |
| notes chapter (HSC Vectors) | 1,278 | 1,811 | 8,038 | 99 / 160 | 0.4 s | 5,661 |
| notes subtopic (Triple products) | 1,143 | 1,599 | 6,992 | 88 / 154 | 1.3 s | 10,753 |
| board chapter (HSC Vectors) | 1,146 | 1,147 | 7,330 | 54 / 56 | **3.5 s** | **72,850** |
| question paper (CBSE 10 Maths 2022) | **2,854** | 3,240 | 7,750 | 90 / 148 | 0.3 s | 1,758 |
| `/guide/nda-maths` | 1,140 | 1,544 | 6,378 | 92 / 169 | 0.2 s | 1,908 |
| blog article | 1,024 | 1,401 | 5,703 | 82 / 137 | 0.2 s | 776 |
| `/pricing` | 1,052 | 1,080 | 3,407 | 81 / 89 | 0.3 s | 312 |
| `/store` | 1,111 | 1,823 | 7,999 | 82 / 174 | 0.3 s | 1,730 |

What the full run adds to section 1:

- **Scrolling to the foot adds 400 to 850 KB sent on 11 of 14 pages.** On the
  homepage it fetches 85 more pages. This is item 1's target, and it is
  site-wide, not a notes problem.
- **The board chapter is the heaviest page measured:** 72,850 elements, its
  HTML 5.2 MB unpacked (278 KB sent), 3.5 s of freeze. A board chapter prints
  every question with its full model answer on one page.
- **The question paper sends 2.85 MB, of which 1.8 MB is images.** Two figures
  (`cbse-10-pyq/5f965fae14ac.png`, `b1d399023ef8.png`) are 808 KB each, and
  question figures are not marked to load only when scrolled near.
- **Blocking time is noisy.** Triple products read 2.8 s in the first run and
  1.3 s here. Compare blocking time only as the median of `--runs=3` or more.
  Sent bytes and request counts are stable from run to run.

---

## 2. The two rules every item must pass

The owner's condition: **no impact on students' screens, no impact on SEO.**
Each item below is accepted only when both proofs pass. If either fails, the
item is dropped or reworked, never shipped with an exception.

### Rule A. Search engines read exactly what they read today

Proof, run for every page type an item touches (list in section 5):

- The server HTML before and after is compared after removing only the things
  allowed to differ: script file names, and the embedded page data block.
- Must be identical: `<title>`, meta description, canonical link, robots meta,
  every JSON-LD block, every heading, all visible text, and **the full list of
  links (`href` and link text) in order**.
- `sitemap.xml` and `robots.txt` are not touched by any item.
- No content moves from the server HTML to "loads later in the browser". Any
  item that would do that is out of scope.

Why this is enough: turning off advance fetching changes how a link behaves when
tapped, not the `<a href>` in the HTML. Loading V's window later changes nothing
in the HTML, because the window is not in the HTML today.

### Rule B. A student sees the same screen

Proof:

- `npm run ui:shots` before (live) and after (local), phone and desktop, on
  every touched page type. The sheets must show no difference.
- Layout shift stays at 0.001 and the largest content is not shown later than
  today, both from the measuring tool in item 0.
- Anything behind a tap (V's window opening, a footer link opening) cannot be
  captured headless. Those are listed per item for the owner to check on a phone
  before the merge.

The one thing that is allowed to change, and is stated per item: **a tap that
was instant because the page had been fetched in advance may take a moment
longer.** Each item says how that is kept small.

---

## 3. Work items, in order

Each item is its own branch, with its own measurement before and after, its own
before/after sheet, and the owner's OK before merging. Tests are written first.

### Item 0. A measuring tool: `npm run audit:page-weight`

**Why first:** every later item needs a before and an after from the same tool.
The numbers in this spec came from a throwaway script.

- `scripts/perf/pageWeight.ts`, built on the browser launcher `ui:shots`
  already has (headless Edge over the DevTools protocol, no new package).
- For each page type: signed-out phone, 4 times slower processor, empty cache.
  Reports sent and unpacked bytes by part, requests, pages fetched in advance
  (at open and after scrolling to the foot), blocking time, largest-content
  time, layout shift, element count.
- `-- --base=<url>` so live and a local build can be compared;
  `-- --html-diff` runs the Rule A comparison.
- Pure core (grouping requests, the HTML comparison) in `scripts/lib/`, with
  unit tests. The browser run itself is local only, like
  `audit:formula-sheets`. Not in the push gate: it needs Edge and reads the live
  site.
- Deletes its temporary browser profile after each run (the `ui-shots` leftover
  rule applies).
- Writes the report to `generated-papers/page-weight/`. The first run is saved
  as the baseline in `scripts/perf/page-weight-baseline.json`.

Risk: none. It reads, never writes.

### Item 1. Stop fetching pages nobody asked for

**The problem:** 24 pages fetched in advance when a page opens (145 KB sent),
81 after scrolling a notes page to the foot (561 KB sent, 3.7 MB unpacked).

**The change:** a small link wrapper, `QuietLink`, that does not fetch in
advance when the link scrolls into view, and starts fetching the moment a
finger touches the link or a mouse moves over it. This is the pattern Next's
own documentation gives for this case.

| Where | Links | Change |
|---|---|---|
| Footer (`PyqVaultFooter`, `IntlFooter`) | about 35 | `QuietLink` |
| Header icons (Store, Visuals, Play) | 3 | `QuietLink` |
| Notes page's link to itself | 1 | `QuietLink` |
| Phone tab bar, desktop main tabs | 5 | **No change.** These are the taps that should feel instant |
| Sibling subtopic links (previous, next) | 2 to 6 | No change until the double fetch below is understood |

**Two things to find out, not fix blind:**

- Why `/browse` and the sibling subtopic pages are each fetched twice in full.
  The likely cause is that they are built on request, so the outline request
  returns the whole page. If so, the fix is on those routes, not on the links.
- Whether `/questions` needs 902 KB of page data. That is a page problem of its
  own and stays out of this item.

**Expected gain** (to be confirmed by item 0): on a notes page scrolled to the
foot, about 400 KB less sent and about 2.5 MB less unpacked; on every page at
open, about 25 KB less sent and about 260 KB less unpacked.

**Rule A:** the wrapper renders the same `<a href>` with the same text and
attributes. The HTML comparison must show zero differences.

**Rule B:** no pixel changes. What changes: a first tap on a footer link or a
header icon waits for the page, as it does on any site. These pages are cached
copies served from Mumbai, and the fetch starts on touch, about 100 ms before
the tap completes. Owner checks on a phone: tap Store, Visuals, Play and three
footer links.

**Tests first:** `QuietLink` renders an identical anchor; passes `prefetch`
off until touched; a source test, like `dashboard-students-no-prefetch`, that
the footer and header icons use it.

**Undo:** swap `QuietLink` back to `Link`. One commit.

**Result (2026-11-24, merged and pushed in `be1453e5e`):**

- Built: `src/components/QuietLink.tsx`, used by both footers and the Store,
  Visuals and Play buttons; `GuideSideNav` no longer fetches the page it is
  on. The study tabs are unchanged. Tests: `tests/quiet-link.test.ts`.
- **Rule A passed:** fetched as Google's phone crawler, all 14 page types read
  the same with and without item 1 (`--html-diff` over two `--save-html`
  folders, one dev server at a time). Positive check: the branch pages name
  `QuietLink` 14 of 14, main's 0 of 14, so each side served its own code.
- **Rule B passed:** before/after sheets (header and footer, phone and
  desktop, `/pricing` and a notes subtopic) show no difference.
- **Measured live after the push (12:45 UTC):** the 14 pages, scrolled to the
  foot on a phone, sent 23.7 MB before and 18.0 MB after (-24%); pages fetched
  in advance fell 8.2 MB to 3.6 MB (-55%); /notes 1,952 KB to 1,066 KB. Two
  pages read higher, both because the BASELINE under-counted: on the board
  chapter (3.5 s of blocking) and /browse, its advance fetches had started
  but not finished (0 KB) when the run read them. What is still fetched in
  advance is body links (Home's exam cards, /store's book cards, /browse's
  link to the /questions index, 902 KB unpacked: a later candidate).
- **Correction (found in item 2):** the Rule A check above read /browse and
  the board chapter as EMPTY on both dev servers, so "the same" there proved
  nothing (see item 2's result). Item 1's markup claim rests on
  `tests/quiet-link.test.ts`, which renders a QuietLink and a Link to the
  same HTML; live (item 1) and item 2's branch read the same on all 14 pages
  with the fixed tool.
- What the comparison had to learn on the way, now built into the tool:
  React streams slow sections late depending on timing, and Next streams the
  title into the body for ordinary browsers but not for crawlers. Comparing
  as Google, with streamed sections put back, is what makes two loads of the
  same page read the same.

### Item 2. Load V's chat window when it is opened

**The problem:** V's window, practice builder, gift and check-in code (30 KB
sent, 103 KB unpacked) load and run on every page, for every visitor, though
only some open V.

**The change:** split `ChatWidget` in two. The round V button, its badge and
the small logic that decides whether V has something to say stay as they are.
The window itself loads the first time it is needed: on the first touch of the
button (so it is arriving while the finger lifts), or when V opens by itself
(the gift, the stuck offer, a "Teach me" button).

**Expected gain:** up to 30 KB sent and 103 KB unpacked off every page, and
less work during the load freeze. The share that must stay with the button is
not yet measured, so the real figure will be lower.

**Rule A:** V's window is not in the server HTML today. The HTML comparison
must show zero differences.

**Rule B:** the button looks and sits exactly as now. What changes: the very
first open of V in a visit may take a moment longer on a slow network. The
window frame shows at once with a loading state, so the tap never looks
ignored. Owner checks on a phone: open V; trigger the stuck offer; tap a
"Teach me" button; open V on the intl site.

**Tests first:** the button renders without importing the window module (a
source test on the import graph); each entry point that opens V loads the
window; `npm run v:eval` before merging, as V_SPEC.md requires for any change
to V.

**Undo:** one commit.

**Result (2026-11-24, branch `perf/lazy-v-window`, awaiting the owner's OK):**

- Built: the layout mounts `ChatLauncher` (the button, V's celebration
  bubble, the scroll tuck, and a catch for Ask V events). `ChatWidget`, the
  window, is now its own chunk. The button is one component, `VLauncher`,
  drawn by both, so it cannot drift. The window loads on the first touch,
  hover or focus of the button; on an Ask V or Teach me event (handed on to
  the window once it listens); and AT ONCE for a signed-in visitor, an unread
  reply, or a test half built before sign-in (`lib/chat/windowStart.ts`):
  those buttons carry badges only the window's logic can decide. So the
  saving is for signed-out visitors: first visits and search traffic.
- Size on live before the change: V's chunk is 29.6 KB sent, 105.7 KB of
  code, on every page. Measure the real saving after the push with `--check`.
- **Kept as it was:** V's switchable buttons ("Teach me a chapter") wait for
  `/api/chat/features`; the launcher asks for it with the page, as the window
  did. The before/after sheet caught a phone tap opening V without that
  button when it was asked only on touch.
- **Rule A passed:** live (= main) against the branch on a dev server, as
  Google's phone crawler: 14 of 14 the same, /browse and the board chapter
  read in full.
- **Rule B passed:** sheets of the closed button (/notes, /browse, phone and
  desktop) and of V opened by a tap (phone and desktop) match live. A first
  tap on a slow network shows the window's frame with a loading state.
- Checked in a headless phone browser, V's write calls stubbed: no window
  code before a touch; a touch loads it and the tap opens V; an Ask V and a
  Teach me sent before it loaded each reach V with their message; an unread
  reply loads it at once with its badge; a signed-in cookie loads it at
  once; a waiting test opens V on the builder.
- What the comparison had to learn, now built into the tool: React pairs each
  streamed section with its place by SCRIPT (`$RC("B:x","S:n")`,
  `$RS("S:n","P:y")`), not by number; the old tool paired by number and read
  a dev /browse (45 sections, most of them segments) as an empty page. And a
  local server prints the live address in `og:url`, so that address counts
  as the server's own origin.

### Item 3. Measure, then decide: payment code and the sign-in library

Two shared files that may not need to be on every page. **No change is
proposed until each is measured.**

- **Payment code (34 KB sent, in a mixed file).** `CheckoutReturnBar` sits in
  the header and imports the checkout code so it can finish a payment a student
  returned from. Measure how much of the file is ours. If it is over 10 KB
  sent, load it only when the browser holds an unfinished order.
- **Supabase sign-in library (61 KB sent).** It loads for signed-out visitors
  too, who are most search arrivals. `hasAuthCookie` already exists. Find out
  which shell components import the library, and whether a signed-out visitor
  can go without it until they tap Sign in.

Both touch sign-in and payment, so each gets its own plan and the owner's OK
after the measurement. The payment return path (0283) must keep working: its
tests are the gate.

### Item 4. The notes freeze: prototype and measure before deciding

**The problem:** 2.8 s of freeze on a notes page against 0.4 s on a plain page.

**What is known:** the server already sends every equation finished. The
browser then downloads KaTeX and works each one out again, because the notes
use the browser maths component. `StaticMath` (2026-10-16) is the server-only
component built for exactly this after the print handout froze a phone for
52 s, and with its `mathml` option on, its output is byte-identical to the
browser component (`tests/static-math.test.ts`).

**What is not known, and why this is a prototype:**

- How much of the 2.8 s is maths and how much is wiring up 10,753 elements.
  Not measured.
- Three notes parts run in the browser and use the maths component themselves
  (`PracticeSet`, `SelfCheckCard`, `WorkedExampleAuthored`). While any of them
  is on the page, KaTeX still downloads.
- Server-drawn maths is sent twice: once in the HTML and once in the embedded
  page data. That could add about 430 KB unpacked to each notes page and to
  each notes page fetched in advance.

**The prototype:** on a branch, switch only the server-rendered notes parts
(`ConceptUnitCard`, `FormulaBlock`, `TrapCallout`, `ReferenceTableBlock`,
`SubtopicSummary`) to `StaticMath` with `mathml` on. Measure five notes pages
with item 0 before and after. **This needs one local production build, which
loads the production database, so it is run only when the owner says so.**

**Decide from the numbers:** ship only if blocking time falls by a third or
more and sent bytes do not rise by more than 10%. Otherwise record the result
and stop.

**Rule A:** output is byte-identical with `mathml` on, so headings, text and
the screen-reader copy are unchanged. The HTML comparison must show zero
differences outside the page data block.

**Rule B:** identical markup means identical pixels. Sheets on five notes
pages, light and dark.

### Item 5. Question figures: load when near, and the oversized files (found in the baseline)

- **Load when near.** Add `loading="lazy"` and `decoding="async"` to question
  and solution figures below the first screen. The `<img src>` and `alt` stay in
  the HTML, so search engines read the same page, and an image loads before it
  scrolls into view. Rule B: the sheet must show the same page, and the image
  must have its width and height set, so nothing shifts when it arrives.
- **The oversized files.** List every stored figure over 200 KB
  (`question-images` bucket) with its question. A re-compression keeps the
  same pixels (a lossless PNG pass), so the figure looks identical. This
  rewrites stored files, so it needs the owner's OK and a backup first, and
  is planned on its own.

### Item 6. The board chapter page (found in the baseline)

72,850 elements and 3.5 s of freeze. Not designed here. It needs its own
look at how the reader renders a chapter's answers, under the same two rules.
The answers are in the server HTML today, which search engines read, so any
change must keep them there.

### Declined

- **Drawing the vector arrow once and reusing it.** 251 copies are 156 KB
  unpacked but compress to almost nothing, and removing them saves about 500
  of 10,753 elements. It means rewriting KaTeX's output, which risks the look
  of every vector. Not worth it.
- **Fonts (178 KB sent).** Dropping or shrinking a font changes how text looks.
  Out of scope under the "no change to the screen" rule.
- **Clarity (25 KB sent).** A product decision about analytics, not a
  page-weight fix. The owner's call.

---

## 4. Targets

Targets, not promises. Each is checked with item 0 after the item ships.

| Measure (signed-out phone, notes page) | Today | After items 1 and 2 | After item 4, if it ships |
|---|---|---|---|
| Sent, page open | 1,143 KB | about 1,090 KB | to be measured |
| Sent, scrolled to the foot | 1,599 KB | about 1,150 KB | to be measured |
| Unpacked, scrolled to the foot | 6,991 KB | about 4,300 KB | to be measured |
| Blocking time | 2.8 s | a little lower, not measured | under 1.9 s |
| Layout shift | 0.001 | 0.001 | 0.001 |
| Largest content shown at | 2.2 s | no later | no later |

After the last item, add a ratchet: `audit:page-weight -- --check` fails when a
page type's sent bytes or requests rise more than 10% over the saved baseline.
Run by hand before a push that touches the shell, not in the gate.

---

## 5. Page types every proof covers

One real page of each, phone and desktop:

`/` · `/browse` · `/questions/<exam>/<subject>/<chapter>` · `/mock` ·
`/notes` · `/notes/<exam>` · a notes chapter · a notes subtopic with heavy
maths (`/notes/mh-hsc-12-maths/vectors/hscm-ve-triple`) · `/board` chapter ·
`/question-papers` paper · `/guide` page · `/blog` article · `/pricing` ·
`/store` · the intl home page.

---

## 6. What could not be measured

- **A signed-in student.** All phone runs were signed out. A signed-in student
  loads more (their own data, the avatar menu's links). `ui:shots` can act as a
  student; item 0 should reuse that.
- **A real budget phone.** "4 times slower" is the standard stand-in, not a
  measurement of a real device. The real freeze may be longer.
- **A slow network.** Runs used a fast connection, so times understate what a
  student on mobile data sees. Sent bytes do not depend on this.
