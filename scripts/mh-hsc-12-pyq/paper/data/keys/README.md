# Key derivations — committed evidence

No Maharashtra board paper ships an answer key, and none exists anywhere. Every
MCQ key in this corpus is therefore DERIVED, and the only thing standing behind
it is that two passes derived it independently and agreed.

That evidence belongs in the repo. The answers themselves end up in
`../<id>.questions.json`, but a bare letter records nothing about how much to
trust it — so each sitting keeps:

| file | what it is |
|---|---|
| `<id>.pass1-authoring.md` | the authoring pass's keys **and its working** |
| `<id>.pass2-blind.md` | the blind pass's keys and working — written from stem + options ONLY, with no sight of pass 1 |
| `<id>.reconciliation.txt` | the comparison, as `reconcile-keys.ts` printed it |

The ordering is the guarantee: `dump-blind.ts` refuses to build the blind input
once any answer exists, so pass 2 cannot have been a review of pass 1.

A disagreement here is the most valuable output the pipeline produces. It is the
only signal that a derived key might be wrong, and there is no key to fall back
on. Keep the losing pass's reasoning when one is adjudicated — the reason a
derivation went wrong is worth more than the corrected letter.
