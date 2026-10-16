-- 0161_v_cache_tokens.sql
--
-- V's prompt caching (2026-10-16): record the cached part of each AI answer's
-- input, so /dashboard/chat prices it right.
--
-- WHY. Every V answer re-reads about 2,900 tokens of fixed instructions (rules,
-- exams, pages, prices), twice when it searches chapters. Since 2026-10-16 that
-- fixed part is marked for Anthropic's 5-minute cache (lib/chat/anthropic.ts):
-- a re-read costs a tenth of the input price, a first read in a quiet spell a
-- quarter extra. The API then reports input in three parts, and tokens_in
-- (migration 0158) now holds only the full-price part. Without these two
-- columns the dashboard would undercount every first read and overcount
-- nothing, and nobody could check the cache is hitting.
--
-- cache_read_tokens:  input read from the cache (0.1x the input price).
-- cache_write_tokens: input written to the cache (1.25x the input price).
-- Both NULL on anything but an AI reply, as tokens_in/tokens_out are, and NULL
-- on AI rows written before this migration (their tokens_in is the whole input).
--
-- ACCESS unchanged: RLS on, zero policies.

alter table public.chat_interactions
  add column cache_read_tokens  integer check (cache_read_tokens is null or cache_read_tokens >= 0),
  add column cache_write_tokens integer check (cache_write_tokens is null or cache_write_tokens >= 0);

alter table public.chat_interactions
  add constraint chat_interactions_cache_tokens_ai_only check (
    -- coalesce: a NULL reply_source would make the left side NULL, and a CHECK passes on NULL.
    coalesce(reply_source, '') = 'ai' or (cache_read_tokens is null and cache_write_tokens is null)
  );
