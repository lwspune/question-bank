-- Blog and syllabus pages readout (experiment blog-posts, migration 0263,
-- src/lib/growth/registry.ts). Read-only; run each query on production by hand
-- at the check date. The window opens on the day the first database article
-- was published (query 0), not on the push date.
--
-- A signup "came from" an article when its first landing page was that
-- article (student_profiles.acq_landing). Search Console clicks on /blog and
-- /exams/*/syllabus pages are read by hand beside these numbers.

-- 0. When the window opened, and how many articles are live by kind.
select min(date_published) as window_opens,
       count(*) filter (where kind = 'news') as news,
       count(*) filter (where kind = 'data') as data,
       count(*) filter (where kind = 'evergreen') as evergreen
from public.articles
where status = 'published';

-- 1. Signups by the kind of article they landed on, against all signups in the
--    window. The three code posts (src/lib/blog/posts.ts) are listed by hand:
--    they are not rows in public.articles.
with win as (
  select coalesce(min(date_published), current_date)::timestamptz as opens
  from public.articles where status = 'published'
),
code_posts(slug, kind) as (
  values ('mht-cet-2027-december-attempt-moved-after-boards', 'news'),
         ('nda-2-2026-gat-paper-analysis', 'data'),
         ('nda-2-2026-maths-paper-analysis', 'data')
),
landed as (
  select p.user_id,
         case
           when p.acq_landing ~ '^/exams/[a-z0-9-]+/syllabus' then 'evergreen'
           when p.acq_landing like '/blog/%' then coalesce(
             (select a.kind from public.articles a where a.slug = split_part(split_part(p.acq_landing, '/', 3), '?', 1)),
             (select c.kind from code_posts c where c.slug = split_part(split_part(p.acq_landing, '/', 3), '?', 1)),
             'unknown post')
           when p.acq_landing like '/blog%' then 'blog index'
         end as kind
  from public.student_profiles p, win
  where p.created_at >= win.opens
)
select coalesce(kind, 'not an article') as landed_on,
       count(*) as signups,
       round(100.0 * count(*) / sum(count(*)) over (), 2) as share_pct
from landed
group by 1
order by signups desc;

-- 2. Per article: signups that landed on it, newest article first.
with win as (
  select coalesce(min(date_published), current_date)::timestamptz as opens
  from public.articles where status = 'published'
)
select a.kind, a.slug, a.date_published,
       count(p.user_id) as signups
from public.articles a
cross join win
left join public.student_profiles p
  on p.created_at >= win.opens
 and (
   (a.kind = 'evergreen' and p.acq_landing like '/exams/' || a.exam_slug || '/syllabus%')
   or (a.kind <> 'evergreen' and split_part(split_part(p.acq_landing, '/', 3), '?', 1) = a.slug
       and p.acq_landing like '/blog/%')
 )
where a.status = 'published'
group by a.kind, a.slug, a.date_published
order by a.date_published desc, a.slug;
