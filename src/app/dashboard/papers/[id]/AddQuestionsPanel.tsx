"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  searchQuestionsAction,
  listSubjectsAction,
  addQuestionAction,
  type SearchRow,
} from "../actions";
import type { PaperSection } from "@/lib/papers/types";

const SELECT_CLASS =
  "h-9 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const AUTO = "__auto__";

export default function AddQuestionsPanel({
  paperId,
  exams,
  sections,
  existingIds,
  onChanged,
}: {
  paperId: string;
  exams: { id: string; name: string }[];
  sections: PaperSection[];
  existingIds: Set<string>;
  onChanged: () => void;
}) {
  const [examId, setExamId] = useState<string>(exams[0]?.id ?? "");
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [subjectId, setSubjectId] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [q, setQ] = useState("");
  const [target, setTarget] = useState<string>(AUTO);
  const [page, setPage] = useState(1);

  const [rows, setRows] = useState<SearchRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<string>>(new Set());

  // Load subjects whenever the exam changes.
  useEffect(() => {
    if (!examId) {
      setSubjects([]);
      return;
    }
    let cancelled = false;
    listSubjectsAction(examId).then((res) => {
      if (cancelled) return;
      if (res.ok) setSubjects(res.subjects);
    });
    setSubjectId("");
    return () => {
      cancelled = true;
    };
  }, [examId]);

  async function runSearch(toPage = 1) {
    setLoading(true);
    setSearched(true);
    const res = await searchQuestionsAction({
      examId: examId || null,
      subjectId: subjectId || null,
      q,
      difficulty: (difficulty || null) as SearchRow["difficulty"] | null,
      kind: "all",
      page: toPage,
    });
    setLoading(false);
    if (res.ok) {
      setRows(res.rows);
      setTotalCount(res.totalCount);
      setPageSize(res.pageSize);
      setPage(toPage);
    } else {
      toast.error(res.error);
    }
  }

  async function onAdd(id: string) {
    setAdding(id);
    const res = await addQuestionAction(paperId, id, target === AUTO ? undefined : target);
    setAdding(null);
    if (res.ok) {
      setAdded((prev) => new Set(prev).add(id));
      const label = sections.find((s) => s.key === res.sectionKey)?.label ?? "Unassigned";
      toast.success(`Added to ${label}`);
      onChanged();
    } else {
      toast.error(res.error);
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Search className="h-4 w-4" aria-hidden /> Add questions
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Search the bank and add to this paper. By default each question files into
          the section matching its subject.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void runSearch(1);
          }}
          className="mt-3 space-y-2"
        >
          <div className="flex flex-wrap gap-2">
            <select
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className={SELECT_CLASS}
              aria-label="Exam"
            >
              <option value="">All exams</option>
              {exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className={SELECT_CLASS}
              aria-label="Subject"
              disabled={subjects.length === 0}
            >
              <option value="">All subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={SELECT_CLASS}
              aria-label="Difficulty"
            >
              <option value="">Any difficulty</option>
              <option value="EASY">Easy</option>
              <option value="MODERATE">Moderate</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search question text…"
              className="flex-1"
            />
            <Button type="submit" variant="outline" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Search className="h-4 w-4" aria-hidden />}
              Search
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Add to:</span>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className={SELECT_CLASS}
              aria-label="Target section"
            >
              <option value={AUTO}>Auto (by subject)</option>
              {sections.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="max-h-[28rem] overflow-y-auto">
        {!searched ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            Search to find questions to add.
          </p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No questions match. Try broadening the filters.
          </p>
        ) : (
          <ul className="divide-y">
            {rows.map((r) => {
              const inPaper = existingIds.has(r.id) || added.has(r.id);
              return (
                <li key={r.id} className="flex items-start gap-3 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm">{r.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {r.subject} · {r.chapter} ·{" "}
                      <span className="capitalize">{r.difficulty.toLowerCase()}</span>
                    </p>
                  </div>
                  <Button
                    variant={inPaper ? "ghost" : "outline"}
                    size="sm"
                    disabled={inPaper || adding === r.id}
                    onClick={() => onAdd(r.id)}
                    aria-label={inPaper ? "Already added" : "Add to paper"}
                    className={cn("shrink-0", inPaper && "text-emerald-600")}
                  >
                    {adding === r.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : inPaper ? (
                      <Check className="h-4 w-4" aria-hidden />
                    ) : (
                      <Plus className="h-4 w-4" aria-hidden />
                    )}
                    {inPaper ? "Added" : "Add"}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {searched && totalCount > pageSize && (
        <div className="flex items-center justify-between border-t p-3 text-xs text-muted-foreground">
          <span>
            Page {page} of {totalPages} · {totalCount} found
          </span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1 || loading}
              onClick={() => void runSearch(page - 1)}
            >
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages || loading}
              onClick={() => void runSearch(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
