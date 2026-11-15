-- 0257_plan_ends_on.sql — a pass can end on a fixed day; both IMAT passes end
-- after IMAT 2027 (owner, 2026-11-15; the free-papers half is 0256).
--
-- WHY: plans.ends_on: a pass that ends on a fixed day (India), not
--    duration_days from purchase. The order route stamps the end into the
--    Razorpay order notes (lib/billing/plans stampOrderNotes `endsAt`) and the
--    grant follows the notes, so editing the date never moves an open checkout.
--    Once the day is under a day away, a sale falls back to duration_days
--    (never a pass that is already over) and /dashboard/pricing warns. Both
--    IMAT passes end 31 Oct 2027, about a month after the expected sitting
--    (2026's was late September / early October; MUR has not announced 2027):
--    change it on /dashboard/pricing once the decree is out. Nobody held an
--    IMAT pass on 2026-11-15, so no existing pass needed moving.

alter table public.plans
  add column if not exists ends_on date;

comment on column public.plans.ends_on is
  'Every pass sold ends at the end of this day (India), not duration_days from purchase; once it is under a day away, sales fall back to duration_days. NULL = none. Stamped into the order notes as endsAt. 0257.';

-- Both IMAT passes (dollars, and rupees for India) end after IMAT 2027, and say so.
update public.plans
set ends_on = '2027-10-31',
    blurb = 'Practise without daily limits until IMAT 2027.',
    perks = array[
      'Unlimited answers in the question bank (free: {reveals} a day)',
      'Every IMAT mock, timed and scored like the real exam (free: IMAT 2023 and Practice Mock 1)',
      'Unlimited saved questions (free: {saves})',
      'PDF downloads: question papers with answer keys, whole past papers and chapter formula sheets'
    ],
    updated_at = now()
where scope = 'imat' and id in ('intl-pass-6m', 'imat-india-6m');
