# Suggestions

A running list of actionable improvements surfaced during /update-docs runs.
Each item is outside the scope of the work that surfaced it. Strike through when done.

---

## 2026-06-08

### Consolidate the per-subject notes pages into a dynamic `[subjectRoute]` route

The cross-exam-hub work (2026-06-08) made `/notes` and the per-exam hubs (`/notes/<examSlug>`) derive from the `NOTES_CHAPTERS` registry — but the per-**subject** index pages (`/notes/nda-maths/page.tsx`, `nda-physics`, `mht-cet-maths`, `nda-biology`) are still hand-written near-identical files. Adding a new subject still requires cloning one (and forgetting it 404s the subject hub — that bit us on NDA Biology this session).

**Why:** the boilerplate is ~130 lines duplicated 4× and growing per subject; a single dynamic `[subjectRoute]/page.tsx` (validate the route against `getNotesChaptersForSubject`, `notFound()` otherwise) would make a new subject *zero-page* — just a registry entry + the chapter wrappers. It mirrors exactly what `[examSlug]` already does one level up. The concrete folders would need to go (or the dynamic route shadowed correctly), so it's a real refactor, not a 5-minute change.

**How to apply:** create `src/app/notes/[subjectRoute]/page.tsx` rendering from `getNotesChaptersForSubject(params.subjectRoute)` + `getNotesTaxonomy`; delete the 4 concrete subject `page.tsx` files; confirm the dynamic `[examSlug]` and `[subjectRoute]` siblings don't collide (exam slugs `nda`/`mht-cet`/`jee-mains` vs subject routes `nda-maths`/… — they differ, but Next.js disallows two *differently-named* dynamic segments at one level, so this needs verifying — may require a single `[slug]` that branches exam-vs-subject). Keep the chapter + `[subtopicSlug]` route files as-is.

### Browser smoke-test the NDA Biology chapter + the new notes hubs

The 6 Human Physiology SVG diagrams (heart, eye, nephron, reflex arc, lung volumes, alveolus) and the new `/notes`, `/notes/nda`, `/notes/jee-mains` (coming-soon) pages were shipped on a green `prepush` (build + tests) but never eyeballed in a browser.

**Why:** the diagrams are hand-rolled SVG with absolute coordinates — they compile fine but can render visually off (overlap, clipping, dark-mode contrast). The "verify in a browser before claiming done" rule in [[notes-self-sufficient-template]] hasn't been satisfied for this chapter.

**How to apply:** `npm run dev`, open `/notes/nda/human-physiology/hp-circulation` (heart), `…/hp-nervous` (eye + reflex arc), `…/hp-respiration` (lung volumes + alveolus), `…/hp-excretion-reproduction` (nephron) in light + dark; plus `/notes`, `/notes/nda`, `/notes/jee-mains`. Fix any coordinate/contrast issues.

### Regenerate the ARCHITECTURE.md visualization-batch enumeration from `npm run stats`

ARCHITECTURE.md's `visualizations/` line now shows the correct **95** count but its per-batch enumeration only lists batches through Electricity & Magnetism + Binomial Distribution + the new Human Physiology 6 — it skips the Functions/Differentiation/Limits/AoD/Trig/Lines/P&C/Complex diagram batches that landed 2026-06-06/07.

**Why:** the list reads as authoritative but is incomplete; someone counting from it gets the wrong total. Low urgency (the count is right; `npm run stats` is the source of truth), but the prose drift is the kind that compounds.

**How to apply:** either trim the enumeration to "see `npm run stats` / the `_data` dirs for the per-chapter list" (preferred — stop hand-maintaining it), or backfill the missing batches in one pass.
