# Dead taps: findings and plan

*Written 2026-10-04. Data: Clarity recordings from 2026-10-01 to 2026-10-03 (four pulls, real visitors only), plus the code paths behind each element. Status (2026-10-04): steps 1 and 2 of the plan BUILT (branch `perf/dead-taps`), going live with the next push; step 3, the re-check, is due about 3 days after that.*

A **dead tap** is Clarity's name for a tap after which nothing visible changes. Visitors then tap again, and sometimes rage-tap. They have become the most common complaint in the recordings.

## The numbers

| Element | Taps | Dead | Rate |
|---|---|---|---|
| Reveal buttons ("Show model answer", "Show solution", "Show answer", "Show options") | 698 | 74 | 10% |
| Question-card expand line (the "#12 → Physics → AC Circuits" row) | 320 | 48 | 15% |
| Site header (Bank · Guides · Notes · Mocks · Board) | 94 | 76 | most |

### Reveal buttons, by kind and by page

| Button | Taps | Dead |
|---|---|---|
| Show model answer (written answers) | 302 | 52 |
| Show solution | 233 | 9 |
| Show options (notes, guides) | 51 | 10 |
| Show answer | 71 | 3 |

| Page | Reveal taps | Dead |
|---|---|---|
| `/board` | 106 | **0** |
| `/browse` | 223 | 27 |
| `/questions` | 197 | 35 |
| `/notes` | 111 | 8 |

**The usual pattern:** a dead tap, then the same button works 1–2 seconds later (15 of 19 in the latest pull). Sometimes it's three dead taps and a rage burst.

## What is ruled out

1. **"The page isn't ready yet."** 44 of the 74 dead reveal taps came *after* a reveal had already worked on the same page. Many came minutes into the visit (19 at 1–5 minutes, 15 after more than 5 minutes). On the expand line, 21 of 48 came after 5 minutes. A page that isn't ready only loses early taps.
2. **Button size.** The board reader uses the identical small text button (`text-xs`, no padding), and it was dead 0 times in 106 taps.
3. **The tap handlers.** Reveal and expand are plain, instant state changes in `QuestionCard.tsx`, with no network call and nothing to wait for. The reveal meter also lets a tap through while sign-in is still loading.
4. **The reveal limit.** No session in these pulls reached it. The lock is shown before a tap anyway.

## The site header: explained, mostly harmless

- **Since 2026-10-03, the loading bar makes a tapped link ignore further taps** (`a[data-nav-pending] { pointer-events: none }` in `globals.css`). A second tap while the page loads falls through to the header behind it, and Clarity records that as dead.
- **Navigation did not get worse.** The share of header taps that never reached their page was 8% both before the loading bar (6 of 75) and after it (4 of 51); usually the session simply ended.
- **Two of the four recent misses were "Board",** whose pages rendered on every request at 0.4–1.6 s. They have been cached since the 2026-10-04 push.
- **Caution:** dead-tap totals are inflated from 2026-10-03 onwards. Compare like with like.

## Leading suspect for reveal and expand: slow work after the tap

Not proven. Clarity does not record timing.

- **Reveal on a question card, signed out.** A reveal writes the shared reveal list (`useRevealMeter`'s store), and **every card on the page redraws**: 25–50 heavy cards, each with save, present and cart buttons. Board pages hold one store at the top of the reader, and their question items are light. That fits "board 0 dead, cards 10%".
- **The KaTeX maths itself is cached** (`react-katex` memoises), so each card's redraw is moderate rather than huge. On a budget Android phone, 25–50 of them may still be long enough to look dead.
- **Expand** draws the options' maths for the first time. A long Chemistry or Physics stem means real work.
- **Notes "Show options"** is a different component that doesn't use the shared store, yet is dead 10 of 51 times. Something else may be at work there: page weight, or the general cost of a heavy notes page.
- **Background (not yet measured):** every page sends about 277 KB of compressed JavaScript, and the Supabase login library alone is 179 KB. That load lands on cheap phones (item 5a in the session notes).

## Plan (steps 1 and 2 built 2026-10-04: `SlowTapReporter` + `src/lib/analytics/slowTap.ts`; `useCardRevealMeter`)

1. **Measure, with a browser feature only (Event Timing API, no new package).**
   - For any tap that takes more than 200 ms to show a result, send one analytics event, `slow_tap`, with two details:
     - **kind:** reveal · expand · nav · option · other;
     - **phase + time bucket:** *waiting* (the phone was busy before our code ran), *working* (our code and the redraw) or *painting* (getting it on screen).
   - At most once per page per kind.
   - **Reading it:** mostly *working* means the suspect above is right; mostly *waiting* means page weight is the problem.
2. **Likely fix, tested against that measurement:** each card listens only to its own locked or unlocked state, not the whole reveal list, so one reveal redraws one card instead of all of them. It's a small change in `useRevealMeter`, written test-first.
3. **Re-check about 3 days after shipping:** Clarity's dead-tap rate per element, plus the `slow_tap` split.

## Open questions

- Does the header need a change? A second tap during loading is harmless, and the cure is faster pages, not different tap handling.
- If *waiting* dominates, the next step is cutting what every page runs on load. The Supabase client is the biggest single piece; the Supabase-client slimming idea from 2026-10-02 belongs there.

## How the numbers were made

- **Source:** Clarity's session list (timeline events with the tapped element's text). Saved pulls `recordings.json`, `rec2.json`, `rec_gap.json`, `rec3.json` sit in the session scratchpad, not the repo; recordings are not copied into the repo.
- **Element kind** comes from the tapped text: the reveal button labels; any text containing "→" (the card's breadcrumb, which is the expand button); header text starting "PYQ VaultBank…" or "BankGuides…".
- **"Worked within 10 s"** means a working tap on the same text within the next five events and 10 seconds.
- **Navigation success** means the next recorded page starts with the tapped link's section (`/browse`, `/guide`, `/notes`, `/mock`, `/board`).
