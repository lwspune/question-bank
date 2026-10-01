#!/bin/sh
# usage: sh scripts/notes-pipeline/jee/apply-chapter.sh "<DB chapter name>" <code>
# applies _fix-jee-<code>.ts and the re-cut plan, deletes emptied subtopics, checks sync + dup hashes
set -e
cd "$(git rev-parse --show-toplevel)"
N="$1"; C="$2"
npx tsx scripts/notes-pipeline/jee/fix.ts generated-papers/_fix-jee-$C.ts --apply 2>&1 | grep -cE "resync .* ok" || true
npx tsx scripts/notes-pipeline/jee/dump.ts "$N" _jee_$C 2>&1 | tail -1
node scripts/notes-pipeline/jee/recut.js _jee_$C.json generated-papers/_plan-jee-$C.json generated-papers/_recut-jee-$C.json | tail -1
npx tsx scripts/notes-pipeline/jee/fix.ts generated-papers/_recut-jee-$C.json --apply 2>&1 | tail -1
npx tsx scripts/notes-pipeline/jee/dump.ts "$N" _jee_$C 2>&1 | tail -1
EMPTY=$(node -e "const d=require('./generated-papers/_jee_$C.json');const s=Object.fromEntries(d.subtopics.map(x=>[x.id,x.name]));const c={};d.questions.forEach(q=>c[s[q.subtopic_id]]=(c[s[q.subtopic_id]]||0)+1);console.error(Object.keys(c).length+' pages, '+d.questions.length+' rows');console.log(d.subtopics.filter(x=>!c[x.name]).map(x=>x.id).join(' '))")
for id in $EMPTY; do npx tsx --env-file=.env.local scripts/notes-pipeline/jee/del-empty-sub.mts $id --apply 2>&1 | tail -2 | tr '\n' ' '; echo; done
SYNC=$(npx tsx --env-file=.env.local scripts/notes-pipeline/jee/sync-classification.mts 2>&1 | grep "entries changed")
echo "$SYNC"
# After a clean apply the paper JSONs and the DB agree. A non-zero count means a step wrote the DB
# but not the JSONs (a re-cut pass that died mid-run looks exactly like this; the tail above hides
# its error) — re-run the recut fix with --apply until this reads 0, or the next resync undoes it.
case "$SYNC" in "entries changed 0 "*) ;; *) echo "WARNING: classification out of sync after apply — re-run: npx tsx scripts/notes-pipeline/jee/fix.ts generated-papers/_recut-jee-$C.json --apply" ;; esac
npx tsx --env-file=.env.local scripts/notes-pipeline/jee/duphash.mts _jee_$C.json | tail -1
