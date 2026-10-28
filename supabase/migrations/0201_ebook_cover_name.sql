-- 0201_ebook_cover_name.sql -- the buyer's name on an ebook's cover.
--
-- Why: the owner asked for personalisation (2026-10-28). The MHT-CET books' new covers carry a
-- line "This copy belongs to", and the download writes the buyer's name on it (lib/ebooks/stamp).
-- The default is the account's name, but an account name is not always the student's (a parent's
-- account buying for a child), so the buyer may change it.
--
--  * ebooks.name_plate: this book's CURRENT master has a name line on its cover. Written by the
--    build (scripts/ebooks/build.ts --apply) in the same update that records the file version, so
--    the flag always describes the file it sits beside. The board books stay false until their
--    covers are printed again; a cover without the line is never written on.
--  * ebook_purchases.print_name: the name the buyer chose; null = use the account's name. Written
--    by the service role only (PUT /api/ebooks/<slug>/name, after the buyer's own read of the
--    purchase), like every other column on this table.
--  * ebook_purchases.stamped_name: the name the cached stamped copy carries, so a changed name
--    makes a fresh copy on the next download (lib/ebooks/download), as a new master version does.
--
-- The CHECK mirrors validatePrintName in src/lib/ebooks/coverName.ts: 1-40 characters, Latin
-- letters (the cover's font draws nothing else), spaces, apostrophes, hyphens, and a dot only at
-- the end of an initial or title. Nobody had bought a book when this was written, so no row is
-- affected.

alter table public.ebooks
  add column name_plate boolean not null default false;

alter table public.ebook_purchases
  add column print_name text
    check (
      print_name is null
      or (
        char_length(print_name) between 1 and 40
        and print_name ~ '^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ ''-]|\.(?=\s|$))*$'
      )
    ),
  add column stamped_name text;

comment on column public.ebooks.name_plate is
  'The current master''s cover has a line for the buyer''s name (migration 0201). Set by the build with the file version.';
comment on column public.ebook_purchases.print_name is
  'The name the buyer chose for the cover; null = the account''s name (migration 0201). Service role writes only.';
comment on column public.ebook_purchases.stamped_name is
  'The name the cached stamped copy (stamped_path) carries; a different name re-stamps (migration 0201).';
