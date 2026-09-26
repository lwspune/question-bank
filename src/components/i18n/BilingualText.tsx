"use client";

import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { cn } from "@/lib/utils";
import { optionVersions, solutionVersions, stemVersions, type Bilingual } from "@/lib/i18n/bilingual";
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
  const [lang] = useQuestionLang();
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

/** The solution in the viewer's language(s); English-only renders as a bare BlockText. */
export function BilingualSolution({ q }: { q: Pick<Bilingual, "translations"> & { solution: string | null } }) {
  const [lang] = useQuestionLang();
  const versions = solutionVersions(q, lang);
  if (!versions.length) return null;
  return (
    <div className="space-y-2">
      {versions.map((v, i) => (
        <div key={v.lang} lang={v.lang} className={cn(i > 0 && "border-t border-dashed pt-2")}>
          <BlockText text={v.text} />
        </div>
      ))}
    </div>
  );
}

export function BilingualOption({ q, opt }: { q: Bilingual; opt: Bilingual["options"][number] }) {
  const [lang] = useQuestionLang();
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
export function QuestionLangSwitch({ className }: { className?: string }) {
  const [lang, setLang] = useQuestionLang();
  return <LanguageSwitch value={lang} onChange={setLang} className={className} />;
}
