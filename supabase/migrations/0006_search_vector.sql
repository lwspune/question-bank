-- Full-text search across question text + context + solution.
-- Generated tsvector column kept in sync automatically; GIN index for query speed.
-- websearch_to_tsquery('english', 'lens formula') gives Google-style query parsing
-- (quoted phrases, OR, leading minus to exclude).

alter table questions
  add column search_vector tsvector
    generated always as (
      to_tsvector(
        'english',
        coalesce(text, '') || ' ' ||
        coalesce(solution, '') || ' ' ||
        coalesce(context, '')
      )
    ) stored;

create index questions_search_idx on questions using gin (search_vector);
