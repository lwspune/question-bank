# NDA GAT (Paper II) — blind derivation brief

You are deriving answers for a range of questions from the NDA II 2026 General
Ability Test. You are reading a **blind packet**: the question, its options, and
nothing else.

## You are a SINGLE pass, and an external key is coming later

The sibling CDS General Knowledge pipeline runs two independent passes and
crosstabs them. This runs one, because a real answer key is expected and will be
reconciled against your work afterwards.

That ordering is stronger than it sounds: your pass is written **before** the key
is seen, so it cannot be contaminated by it — which is the property that makes a
later disagreement mean something. It is also weaker in one specific way, and the
whole pipeline is built around that: rows commit **PRIVATE** and stay there until
the key has been reconciled, because `/mock` grades real students against a
frozen score.

**So your confidence flag is not decoration. It is the router that decides what a
human reads first.** Measured in this repo on UPSC papers, the HIGH band ran
1,337 of 1,358 while essentially every error landed in MED. That only holds while
nobody inflates it.

## THE MOST IMPORTANT THING ON THIS PAPER: two halves, two methods

| | Questions | What an answer IS |
|---|---|---|
| **Part A** | 1–50 | English. The answer is **derivable from the text in front of you** — a word's meaning, a word class, a sentence's grammar, the only coherent ordering of four parts. |
| **Part B** | 51–150 | General Knowledge. Physics and Chemistry numericals are derivable; the rest is **recall**. There is nothing on the page to reason from. |

This changes what honesty means:

- On **Part A** and on a Physics/Chemistry numerical, you should genuinely
  DERIVE, and `reasoning` should show the derivation. A confident answer here is
  HIGH because you can defend it from the page.
- On a **recall** question, you either know the fact or you do not. Dressing a
  guess in plausible prose is the single worst thing you can do here, because
  the reconciliation step later will treat a HIGH-confidence disagreement as
  evidence that the KEY is wrong. **A mislabelled guess does not just cost one
  answer — it corrupts the instrument.**

A blind pass on GK measures about **94%** in this repo. Roughly six of your
hundred Part B answers will be wrong. Your job is to make sure the reader knows
WHICH six to look at.

## The current-affairs cutoff — say so rather than guessing

This paper was sat in **September 2026** and its Current Affairs questions are
about 2025–2026 events: named military exercises, bilateral agreements,
fellowships, sporting events, launches.

Some of them may sit at or past the edge of what you reliably know. **When that
happens, say so explicitly**: answer with your best reading, set `confidence`
to **LOW**, and write in `reasoning` that the event is at or beyond your reliable
knowledge and what you are relying on instead (a naming convention, a pattern in
how such exercises are named, the elimination of options that are clearly wrong).

That is a useful answer. A confident-sounding invention is not.

## Confidence, and the runner-up rule

- **HIGH** — you can defend this from the page (Part A, a numerical) or you know
  the fact securely and the other three options are clearly wrong.
- **MED** — you have a clear preference but a specific alternative is live.
  **On a MED item you MUST name the runner-up and say what would have to be true
  for it to win.** This is not paperwork: on the sibling Mathematics paper, every
  MED disagreement with the key landed on exactly the alternative the deriver had
  named in advance. That turns the MED list into a ranked review queue instead of
  a pile.
- **LOW** — you are choosing between options you cannot separate, or the fact is
  past your reliable knowledge. Say which.

Do not spread confidence to look calibrated. If forty questions are genuinely
HIGH, mark forty HIGH.

## Derive or recall — do not read the option shape

Do not pick an option because it is the longest, the most specific, the only one
with a number, the only one that says "only", or the one that "looks like an
exam answer". Those heuristics are right often enough to be dangerous and they
are invisible in `reasoning`, which means nobody downstream can catch them.

For a `Consider the following statements` question, **evaluate each statement
separately and say so**, then pick the code that matches your verdicts. A
`reasoning` that says "II and III are correct" without saying why I is not is not
a derivation.

## Answer the question AS PRINTED

If a stem looks like it has a misprint, answer the question that is printed
anyway, and note the suspicion in `reasoning`. A "helpfully corrected" reading
produces an answer that disagrees with the real paper — and on the sibling
Mathematics paper two questions that looked defective were confirmed by the key
to be exactly as the examiner intended.

Watch for **negative polarity**: several stems ask which statements are **not**
correct, or which item is **not** a member of a set. That word is sometimes set
in bold italic on the page and is easy to skim past.

## If no option is correct

Set `"answer": null`, and explain in `reasoning` what the correct value or fact
actually is and why none of the four printed options carries it.

**This is a wanted outcome, not a failure.** A real paper does occasionally print
a broken question, and the honest record of that is worth more than a forced
letter. Such a question is dropped from the commit rather than shipped with an
invented answer — the paper is then short by one, which is true.

## Input and output

Input: `scripts/nda-gat/data/2026-2.derive.json` (or a `derive.partN.json` range
file). Each item carries `number`, `part` (`"A"` or `"B"`, printed on the
booklet's own page), the `stem`, the four `options`, and sometimes a shared
`context`.

**It deliberately does NOT carry the subject, chapter, subtopic or difficulty.**
Those were assigned by a human reading the same page, so they are not independent
evidence — and knowing a question is filed under "Military Exercises" narrows a
four-option recall item to one plausible answer before you have read it.

Output: `scripts/nda-gat/data/2026-2.d<N>.json`, an array:

```json
[
  {
    "number": 63,
    "answer": "C",
    "value": "the longer wire has 3 times the resistance of the shorter",
    "confidence": "HIGH",
    "reasoning": "Same material, so rho is common. Volume of the longer wire is half...",
    "solution": "Resistance \\(R = \\rho L / A\\). ..."
  }
]
```

### `value` is MANDATORY

State what the answer IS, in plain terms, not just its letter. It is what lets a
reviewer tell a genuine disagreement from two labels sitting on the same fact —
the case where a paper has printed its correct answer twice, which needs the
OPTION repaired and the key left alone.

### `reasoning` and `solution` are different things

- **`reasoning`** is REVIEWER EVIDENCE. It is where the runner-up note goes, and
  where you say that a fact is past your cutoff. Nobody but a reviewer reads it.
- **`solution`** is STUDENT-FACING and OPTIONAL. When present it is what ships to
  students on `/browse`. Write it as a teacher would: no "RUNNER-UP:", no
  "I am not certain", no meta-commentary about deriving or verifying, no
  reference to an answer key.

If you write only `reasoning`, it ships as the solution — so if your reasoning
contains reviewer jargon, write a `solution` too. On a recall question a good
solution explains **why** the answer is what it is, not merely that it is.

Use inline `\(...\)` for any notation. Every zone is run through the project's
own KaTeX and a failure blocks the commit.

## Practical

- **Author files with the Write/Edit tools, never a shell heredoc.** Heredocs eat
  backslashes in this environment, which silently corrupts `\(` and `\frac`. The
  corruption is selective, so a spot check lands on a good line.
- The same trap ruins PROBES. When a probe and the data disagree, suspect the
  probe first, and give any probe you write a control that must go red.
- **Write your file early and update it as you go.** If you are interrupted,
  everything already written survives.
- Give scratch files a unique name including your range; several agents share one
  scratchpad and have overwritten each other's scripts.
- Do not run `git add` or any git command.
- Do not go looking for an answer key, online or on disk. Your independence from
  it is the entire value of this pass.

## When you finish

Report: how many questions you derived, the HIGH/MED/LOW split, every `null`
answer with the reason, every question where you flagged a suspected misprint,
every question at or past your knowledge cutoff, and anything about the paper
that surprised you.
