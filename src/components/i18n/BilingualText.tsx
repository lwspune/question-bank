"use client";

import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { cn } from "@/lib/utils";
import { altLangOf, optionVersions, solutionVersions, stemVersions, type AltLang, type Bilingual } from "@/lib/i18n/bilingual";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";
import LanguageSwitch from "./LanguageSwitch";

/**
 * Client islands that let a SERVER-rendered question list (the mock review)
 * follow the viewer's language choice without the server ever reading it.
 * An English-only question renders exactly as a bare BlockText would.
 */
export function BilingualStem({
  q,
  field,
  className,
}: {
  q: Bilingual;
  field: "text" | "context";
  className?: string;
}) {
  const [lang] = useQuestionLang(altLangOf(q));
  const versions = stemVersions(q, lang).filter((v) => (field === "text" ? v.text : v.context));
  if (!versions.length) return null;
  return (
    <div className={cn("space-y-2", className)}>
      {versions.map((v, i) => (
        <div key={v.lang} lang={v.lang} className={cn(i > 0 && "border-t border-dashed pt-2")}>
          <BlockText text={field === "text" ? v.text : v.context!} />
        </div>
      ))}
    </div>
  );
}

/** The solution in the viewer's language(s); English-only renders as a bare BlockText.
 *  `format` reshapes each version's text first (the board readers break it into
 *  one sentence per line). */
export function BilingualSolution({
  q,
  format,
}: {
  q: Pick<Bilingual, "translations"> & { solution: string | null };
  format?: (text: string) => string;
}) {
  const [lang] = useQuestionLang(altLangOf(q));
  const versions = solutionVersions(q, lang).map((v) => (format ? { ...v, text: format(v.text) } : v));
  if (!versions.length) return null;
  return (
    <div className="space-y-2">
      {versions.map((v, i) => (
        <div key={v.lang} lang={v.lang} className={cn(i > 0 && "border-t border-dashed pt-2")}>
          <BlockText text={v.text} solution />
        </div>
      ))}
    </div>
  );
}

export function BilingualOption({ q, opt }: { q: Bilingual; opt: Bilingual["options"][number] }) {
  const [lang] = useQuestionLang(altLangOf(q));
  return (
    <>
      {optionVersions(q, opt, lang).map((v, i) => (
        <div key={v.lang} lang={v.lang} className={cn(i > 0 && "text-xs text-muted-foreground")}>
          <KatexRenderer text={v.text} />
        </div>
      ))}
    </>
  );
}

/** The switch, wired to the shared preference — drop it anywhere. */
export function QuestionLangSwitch({ className, alt }: { className?: string; alt?: AltLang }) {
  const [lang, setLang] = useQuestionLang(alt);
  return <LanguageSwitch value={lang} onChange={setLang} alt={alt} className={className} />;
}
