# Figure-reference triage brief

Contract for classifying rows reported by `npm run audit:figures` as
REFERENCES-NO-IMAGE. Every lane authors to THIS file, so the verdicts merge.

## What you are deciding

`audit:figures` flags a question whose stem appears to point at a figure it does
not carry. The probe's measured precision is ~70%: it is a detector, not a
verdict. Your job is to read each flagged row and say which of six things it
actually is.

**You are READ-ONLY.** Do not UPDATE, INSERT or DELETE anything. Do not attach
images. Do not edit any file outside your own output file.

## The six classes

| code | meaning | test |
|---|---|---|
| `MISS` | Genuinely needs a supplied figure. Unanswerable or materially degraded without it. | Could a strong student produce the intended answer from the text alone? If no → MISS. |
| `DRAWS` | Asks the STUDENT to produce a drawing. | "Draw a labelled diagram of…", "With the help of a circuit diagram, explain…", "Sketch the graph of…". No supplied figure is implied. |
| `CONCEPT` | A figure-word naming a CONCEPT, not a picture on the page. | "the energy-band diagram of n-type Si", "the graph of \(y=\sin x\)", "does not **figure** among the Five Principles" (verb). |
| `OPTIONS` | The OPTIONS are the figure. | "Which of the following graphs shows…". Check the options: if they carry real text descriptions it is `CONCEPT`/self-contained; if they are placeholders ("as printed", "see the attached figure") it is `OPTIONS`. |
| `SELFCONTAINED` | Mentions a figure but the stem supplies every value needed. | Common in transcriptions that inlined the figure's data: "…as in Fig 5.54(ii), where the marked angle between the two directed segments is 120°". |
| `DESCRIBED` | The figure was written out in prose on purpose. | Contains a `[Figure: …]` block. Answerable; not a defect. |

**The distinction that matters most is MISS vs DRAWS.** It is the one the probe
gets wrong most often, and it is the difference between "a student cannot answer
this" and "nothing is wrong".

## A set-member row needs its CONTEXT read

There is no `context_image_url` column. A case-study set stores the figure
reference on the shared `context`, and each member row's `text` can be a bare
fragment ("Equal", "Write the equation of the boundary line AC"). Judge such a
row on `text` + `context` together, and say in the note that it is a set member —
the repair differs (the figure has to be duplicated onto every member row).

## How to pull your rows

Use the Supabase MCP `execute_sql` (read-only), or `npx tsx`. The exact filter
the probe uses is in `scripts/lib/figureRefs.ts`; reproduce the population with:

```sql
select q.id, q.question_number, q.source_file, s.name subj,
       q.text, q.context, q.visibility::text,
       (select count(*) from options o where o.question_id = q.id) n_opts
from questions q
join exams e on e.id = q.exam_id
left join subjects s on s.id = q.subject_id
where e.name in (<YOUR EXAMS>)
  and q.image_url is null
order by q.source_file, q.question_number;
```

Then apply the rule from `scripts/lib/figureRefs.ts` (`referencesFigure`) rather
than inventing your own regex, so your population matches the probe's. The
simplest way is a short throwaway `npx tsx` script that imports that helper —
put it under your scratchpad, not in the repo.

## Output

Write **one JSON file** at the path your lane names, and nothing else:

```json
{
  "lane": "<your lane name>",
  "counted": { "MISS": 0, "DRAWS": 0, "CONCEPT": 0, "OPTIONS": 0, "SELFCONTAINED": 0, "DESCRIBED": 0 },
  "rows": [
    { "id": "<uuid>", "ref": "<source_file> <question_number>", "verdict": "MISS",
      "why": "one sentence, concrete — name the value or relation that is missing" }
  ]
}
```

Rules for `why`: one sentence, specific to the row. "Needs the figure" is not a
reason; "the stem gives no angle or side length — all three are printed in Fig.
3.37" is. For `DRAWS`, quote the imperative.

## Report back

Your final message must contain, in plain text:
1. the six counts,
2. the **MISS rate** as a fraction of the rows you read,
3. the **three most surprising misclassifications by the probe** (rows it flagged
   that are clearly not MISS), quoting the stem fragment that fooled it — these
   feed the next widening/narrowing of the rule and are the most valuable thing
   you produce,
4. any row you could not classify, and why.

Do not summarise the file back; name the counts and the findings.
