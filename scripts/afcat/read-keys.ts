// Fill a chapter's Group B (Errorless) keys into its transcriptions, AFTER the
// blind pass 1 is written. Reads data/<chapter>/<key>.keytext.json (set aside
// by extract-errorless.ts), parses each section's key and records the letter
// and stated value on every question, flagging a key whose value is not the
// text of the option its letter points at.
//
//   npx tsx scripts/afcat/read-keys.ts <chapterId> [--files=key1,key2]
//
// Pass --files when another sheet in the chapter has not had its blind pass yet.
//
// A section whose key is a picture has no key lines: transcribe it into the
// keytext file by hand (as "n. x) value" lines) and run this again.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, DATA } from "./config";
import { parseErrorlessKey, keyValueMatches, type SourceFile } from "./lib";
import { filesArg } from "./read";

const chapter = requireChapter(process.argv[2]);

const only = filesArg();
for (const file of chapter.files.filter((f) => f.group === "B" && (!only || only.includes(f.key)))) {
  const srcPath = join(DATA, chapter.id, `${file.key}.source.json`);
  const keyPath = join(DATA, chapter.id, `${file.key}.keytext.json`);
  if (!existsSync(srcPath) || !existsSync(keyPath)) {
    console.log(`${file.key}: not extracted yet`);
    continue;
  }
  const src: SourceFile = JSON.parse(readFileSync(srcPath, "utf8"));
  const blocks: { section: number; lines: string[] }[] = JSON.parse(readFileSync(keyPath, "utf8"));
  const keys = new Map<number, { letter: string; value: string }>();
  for (const b of blocks) for (const [q, k] of parseErrorlessKey(b.lines)) keys.set(b.section * 100 + q, k);

  let missing = 0;
  let mismatched = 0;
  for (const r of src.questions) {
    const k = keys.get(r.n);
    const flags = (r.flags ?? []).filter((f) => !f.startsWith("key "));
    if (!k) {
      r.key = null;
      flags.push("key missing in source");
      missing++;
    } else {
      r.key = k.letter;
      if (k.value) {
        r.keyValue = k.value;
        const opt = r.options["ABCD".indexOf(k.letter)];
        if (!keyValueMatches(k.value, opt)) {
          flags.push(`key letter ${k.letter} is "${opt}" but the key states "${k.value}"`);
          mismatched++;
        }
      }
    }
    if (flags.length) r.flags = flags;
    else delete r.flags;
  }
  writeFileSync(srcPath, JSON.stringify(src, null, 2) + "\n");
  console.log(`${file.key}: ${src.questions.length} q, ${keys.size} keys read, ${missing} missing, ${mismatched} key values that disagree with their option`);
}
