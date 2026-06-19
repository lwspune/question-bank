-- RAG data infrastructure: the retrieval + augmentation substrate.
--
-- PYQ Vault is the content master. This migration lays down the regenerable,
-- additive layer that future AI products (first: nda-tracker's grounded doubt
-- tutor) consume at runtime via a service-role API — NEVER by pushing vectors
-- into the consumer's DB. Two halves of RAG:
--
--   AUGMENTATION  questions.plain_text  (LaTeX-stripped, embeddable + groundable)
--                 questions.solution_json (clean structured worked solution)
--   RETRIEVAL     public.embeddings + public.match_chunks()  (semantic search)
--
-- Everything here is DERIVED from canonical content and never replaces it.
-- Each derived field carries provenance (derived_model, derived_at, and the
-- existing questions.content_hash as the source fingerprint) so staleness is
-- detectable and the whole layer is regenerable from scratch.
--
-- Scope: PYQ only. The PUBLIC + question_kind='pyq' guard lives on the JOIN in
-- match_chunks(), never on the embeddings table itself.

-- ---------------------------------------------------------------------------
-- 0. pgvector. Supabase convention installs extensions into the `extensions`
--    schema (alongside pgcrypto, uuid-ossp, pg_stat_statements). So the vector
--    type is `extensions.vector` and the cosine operator is
--    OPERATOR(extensions.<=>) — both must be schema-qualified inside any
--    function that runs under `set search_path = ''`.
-- ---------------------------------------------------------------------------
create extension if not exists vector with schema extensions;

-- ---------------------------------------------------------------------------
-- 1. Augmentation layer — additive nullable columns on questions.
--    All nullable, no default: a row is "not yet derived" until the extraction
--    script fills it. This keeps every existing ingest path (Excel, sync, JEE,
--    practice) byte-identical and lets us backfill incrementally.
-- ---------------------------------------------------------------------------
alter table questions
  add column plain_text    text,
  add column solution_json jsonb,
  add column derived_model text,
  add column derived_at    timestamptz;

comment on column questions.plain_text is
  'LaTeX-stripped, render-free version of context+text, suitable as embedding input and as grounding context for an LLM. Derived from canonical content; regenerable. NULL = not yet derived.';
comment on column questions.solution_json is
  'Clean structured solution {approach, steps[], final_answer, option_matched}. Derived by an LLM from the canonical solution + options; option_matched is re-derived and cross-checked against options.is_correct as a free wrong-key audit. NULL = not yet derived.';
comment on column questions.derived_model is
  'Model id that produced plain_text/solution_json (provenance).';
comment on column questions.derived_at is
  'When plain_text/solution_json was last derived. Compare against last_edited_at / content_hash drift to detect staleness.';

-- ---------------------------------------------------------------------------
-- 2. Retrieval layer — generalized embeddings table.
--    Not a column on questions: model churn happens without touching canonical
--    tables, content can chunk 1:N (chunk_index), and a single retrieval path
--    serves heterogeneous content later (question_id NULL leaves room for a
--    notes-concept key without a schema change).
--    No vector index at this scale (~2,160 pyq rows): a flat scan is sub-ms with
--    perfect recall. IVFFlat/HNSW is deferred to ~100k+ rows, at which point a
--    per-model sized column or partial index gets decided.
-- ---------------------------------------------------------------------------
create table public.embeddings (
  id                  uuid primary key default gen_random_uuid(),
  question_id         uuid references public.questions(id) on delete cascade,
  embedding           extensions.vector,        -- unsized: model-agnostic (no index yet)
  model               text not null,            -- e.g. 'gte-small' (384), future 'voyage-3' (1024)
  source_content_hash text,                     -- fingerprint of the plain_text that was embedded
  chunk_index         integer not null default 0,
  created_at          timestamptz not null default now(),
  unique (question_id, model, chunk_index)      -- idempotent regeneration (upsert key)
);

comment on table public.embeddings is
  'Generalized vector store for semantic retrieval. One row per (content, model, chunk). question_id NULL is reserved for non-question content (e.g. notes concepts) added later. Access control is enforced by match_chunks() joining back to questions — never by RLS on this table alone.';

create index embeddings_question_id_idx on public.embeddings (question_id);

alter table public.embeddings enable row level security;

-- Read policy mirrors question_principle_tags (0023): a question's embedding is
-- visible exactly when the question is. Rows with question_id NULL are not
-- matched by either EXISTS, so they are service-role only — correct for now
-- (no such rows yet; the runtime retrieval API is service-role).
create policy embeddings_read_public_questions on public.embeddings
  for select to public
  using (
    exists (
      select 1 from public.questions q
      where q.id = embeddings.question_id
        and q.visibility = 'PUBLIC'::public.visibility
    )
  );

create policy embeddings_read_own_org_private on public.embeddings
  for select to authenticated
  using (
    exists (
      select 1 from public.questions q
      where q.id = embeddings.question_id
        and q.visibility = 'PRIVATE'::public.visibility
        and q.org_id = private.current_user_org_id()
    )
  );

-- Writes are service-role only (the generation script). No write policy → the
-- only writers are the service role (bypasses RLS) and admins below for their
-- own org, matching the principle/concept-tag tables.
create policy embeddings_admin_write on public.embeddings
  for all to authenticated
  using (
    private.current_user_is_admin() and exists (
      select 1 from public.questions q
      where q.id = embeddings.question_id
        and q.org_id = private.current_user_org_id()
    )
  )
  with check (
    private.current_user_is_admin() and exists (
      select 1 from public.questions q
      where q.id = embeddings.question_id
        and q.org_id = private.current_user_org_id()
    )
  );

-- ---------------------------------------------------------------------------
-- 3. Retrieval RPC — semantic search over PUBLIC pyq questions only.
--    The PUBLIC + pyq guard is on the JOIN, so it holds regardless of caller:
--    a service-role caller (the cross-app API) bypasses RLS, making this WHERE
--    the actual security boundary; an anon/authenticated PostgREST caller also
--    gets RLS on top. `security invoker` + `set search_path = ''` is the project
--    standard (advisor-clean; forces schema-qualified refs).
-- ---------------------------------------------------------------------------
create or replace function public.match_chunks(
  query_embedding extensions.vector,
  match_count     integer default 8,
  p_model         text    default null
)
returns table (
  question_id uuid,
  chunk_index integer,
  distance    double precision
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    e.question_id,
    e.chunk_index,
    (e.embedding OPERATOR(extensions.<=>) query_embedding) as distance
  from public.embeddings e
  join public.questions q on q.id = e.question_id
  where q.visibility = 'PUBLIC'::public.visibility
    and q.question_kind = 'pyq'::public.question_kind
    and (p_model is null or e.model = p_model)
    and e.embedding is not null
  order by e.embedding OPERATOR(extensions.<=>) query_embedding
  limit match_count
$$;

comment on function public.match_chunks(extensions.vector, integer, text) is
  'Cosine-nearest PUBLIC pyq chunks for a query embedding. Returns (question_id, chunk_index, distance) ordered nearest-first. The PUBLIC+pyq guard is the security boundary (holds even for service-role callers). Optionally filter to a single embedding model.';
