-- Per-chapter profile for the /questions landing header: years covered,
-- number of distinct papers, and the difficulty split.
--
-- WHY. The landing page (`/questions/<exam>/<subject>/<chapter>`, ~317 pages)
-- stated exactly ONE fact a reader could quote: the question count. Everything
-- else an AI search engine or a student would lift from the first screen —
-- "2017 to 2026", "19 papers", "31 of them hard" — was in the bank and not on
-- the page. This aggregate is those facts, one row per chapter.
--
-- SHAPE. Scoped to ONE SUBJECT, exactly like get_chapter_last_added (0073) and
-- for the same reason: the landing index already loops per subject, and a
-- subject-scoped aggregate rides questions_filter_idx (visibility, exam_id,
-- subject_id, …) instead of walking every PUBLIC row in the bank. The 0072
-- bank-wide variant of last_added took 5.4 s and was cancelled intermittently
-- by the anon statement timeout; this one is called from the same per-subject
-- Promise.all and adds no round-trip.
--
-- "SITTINGS". A paper is identified by (pyq_year, pyq_month, pyq_note), which is
-- how every pipeline here labels a sitting ("2024 · May · 12th May Shift 2").
-- pyq_note is ONE column carrying either a sitting id or a source blurb
-- ("answers derived …", "Oswaal …"); publicPyqNote (src/lib/questions/
-- publicPyqNote.ts) publishes it only under 48 chars after stripping a
-- trailing [bracket], and `npm run audit:provenance` guards that gap. The same
-- rule is applied here, so a source blurb collapses to '' and cannot inflate
-- the paper count. A row with no pyq_year contributes nothing to the count.
--
-- Difficulty is NOT NULL (0001), so the three buckets always sum to the
-- chapter's count — tests/chapter-profile.test.ts asserts that against
-- get_chapter_facets, so the header can never print a split that does not add
-- up to the number beside it.

create or replace function public.get_chapter_profile(
  p_subject_id uuid,
  p_kind public.question_kind
)
returns table (
  chapter_id uuid,
  min_year int,
  max_year int,
  sittings int,
  easy_count int,
  moderate_count int,
  hard_count int
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    q.chapter_id,
    min(q.pyq_year)::int as min_year,
    max(q.pyq_year)::int as max_year,
    (count(distinct (
        q.pyq_year,
        coalesce(q.pyq_month, ''),
        case
          when length(regexp_replace(coalesce(q.pyq_note, ''), '\s*\[[^\]]*\]\s*$', '')) < 48
            then regexp_replace(coalesce(q.pyq_note, ''), '\s*\[[^\]]*\]\s*$', '')
          else ''
        end
      )) filter (where q.pyq_year is not null))::int as sittings,
    (count(*) filter (where q.difficulty = 'EASY'))::int     as easy_count,
    (count(*) filter (where q.difficulty = 'MODERATE'))::int as moderate_count,
    (count(*) filter (where q.difficulty = 'HARD'))::int     as hard_count
  from public.questions q
  where q.subject_id = p_subject_id
    and q.visibility = 'PUBLIC'
    and q.question_kind = p_kind
    and q.chapter_id is not null
  group by q.chapter_id;
$$;

comment on function public.get_chapter_profile(uuid, public.question_kind) is
  'Per-chapter years covered, distinct papers and difficulty split (PUBLIC rows of one subject). Feeds the quotable header on /questions/<exam>/<subject>/<chapter>.';

revoke execute on function public.get_chapter_profile(uuid, public.question_kind) from public;
grant execute on function public.get_chapter_profile(uuid, public.question_kind) to anon, authenticated, service_role;
