"use client";

/**
 * Active-paper context for /browse. When the URL carries ?paper=<id> and the
 * viewer is an org member, the page mounts this provider with the paper's data;
 * the QuestionCard "Add" button then targets the paper instead of the local
 * cart. When inactive (no ?paper=), the provider renders children with a null
 * context and the card keeps its normal cart behaviour — so anon and ordinary
 * browse traffic is completely unaffected.
 */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner";
import { addQuestionAction, removeQuestionAction } from "@/app/dashboard/papers/actions";

export type ActivePaperInit = {
  paperId: string;
  title: string;
  initialIds: string[];
};

type ActivePaperValue = {
  paperId: string;
  title: string;
  count: number;
  has: (id: string) => boolean;
  isPending: (id: string) => boolean;
  toggle: (id: string) => void;
};

const ActivePaperContext = createContext<ActivePaperValue | null>(null);

export function useActivePaper(): ActivePaperValue | null {
  return useContext(ActivePaperContext);
}

export function ActivePaperProvider({
  paper,
  children,
}: {
  paper: ActivePaperInit | null;
  children: ReactNode;
}) {
  if (!paper) return <>{children}</>;
  return <ActivePaperInner paper={paper}>{children}</ActivePaperInner>;
}

function ActivePaperInner({
  paper,
  children,
}: {
  paper: ActivePaperInit;
  children: ReactNode;
}) {
  const [ids, setIds] = useState<Set<string>>(() => new Set(paper.initialIds));
  const [pending, setPending] = useState<Set<string>>(() => new Set());

  const has = useCallback((id: string) => ids.has(id), [ids]);
  const isPending = useCallback((id: string) => pending.has(id), [pending]);

  const toggle = useCallback(
    async (id: string) => {
      if (pending.has(id)) return;
      const adding = !ids.has(id);
      setPending((p) => new Set(p).add(id));
      const res = adding
        ? await addQuestionAction(paper.paperId, id)
        : await removeQuestionAction(paper.paperId, id);
      setPending((p) => {
        const n = new Set(p);
        n.delete(id);
        return n;
      });
      if (res.ok) {
        setIds((s) => {
          const n = new Set(s);
          if (adding) n.add(id);
          else n.delete(id);
          return n;
        });
        toast.success(adding ? "Added to paper" : "Removed from paper");
      } else {
        toast.error(res.error);
      }
    },
    [ids, pending, paper.paperId]
  );

  return (
    <ActivePaperContext.Provider
      value={{ paperId: paper.paperId, title: paper.title, count: ids.size, has, isPending, toggle }}
    >
      {children}
    </ActivePaperContext.Provider>
  );
}

/** Banner shown at the top of /browse while building a paper. */
export function ActivePaperBanner() {
  const paper = useActivePaper();
  if (!paper) return null;
  return (
    <div className="-mx-4 mb-4 border-b border-brand-accent/30 bg-brand-accent/10 px-4 py-2 sm:-mx-6 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1">
        <FileText className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <span className="text-sm">
          Adding to <span className="font-semibold">{paper.title}</span>
        </span>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {paper.count} in paper
        </span>
        <Link
          href={`/dashboard/papers/${paper.paperId}`}
          className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline"
        >
          Back to paper
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
