/**
 * /school-exams/class-N: the exams a child in Class N can sit (owner,
 * 2026-11-27: "all I have to select the class of student and I should get the
 * list"). One cached page per class, so a parent can be sent the link. Data:
 * lib/schoolExams/catalog.ts (hand-checked against each official site); the
 * next date of an exam we carry comes from the exam calendar (migration 0281).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { nextSitting } from "@/lib/exam/calendar";
import { loadExamCalendar } from "@/lib/exam/calendarQuery";
import { NTSE_NOTE, SCHOOL_EXAMS } from "@/lib/schoolExams/catalog";
import {
  SCHOOL_CLASSES,
  classHref,
  dateInWords,
  examsForClass,
  groupByKind,
  nextTestLine,
  ourExamLink,
  parseClassSlug,
  shortNames,
} from "@/lib/schoolExams/select";
import ClassPicker from "../_components/ClassPicker";
import ExamCard from "../_components/ExamCard";

export const revalidate = 86400;
export const dynamicParams = false;

type Params = { classSlug: string };

export function generateStaticParams(): Params[] {
  return SCHOOL_CLASSES.map((n) => ({ classSlug: classHref(n).split("/").pop()! }));
}

function titleFor(n: number): string {
  return `Exams for Class ${n} students`;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const n = parseClassSlug((await params).classSlug);
  if (n === null) return {};
  const names = shortNames(examsForClass(n));
  const title = `${titleFor(n)}: admission tests, scholarships and olympiads`;
  const description = names.length
    ? `What a Class ${n} child can sit this year: ${names.join(", ")}. Who can apply, when, and the official site for each.`
    : `No government admission test, scholarship or olympiad is sat in Class ${n}. See which classes they start in.`;
  return {
    title,
    description,
    alternates: { canonical: classHref(n) },
    openGraph: { title, description, type: "website" },
  };
}

const LINK = "rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function SchoolExamsClassPage({ params }: { params: Promise<Params> }) {
  const n = parseClassSlug((await params).classSlug);
  if (n === null) notFound();

  const groups = groupByKind(examsForClass(n));
  const calendar = await loadExamCalendar();
  const now = new Date();
  const firstClassWithExams = SCHOOL_CLASSES.find((c) => examsForClass(c).length > 0);
  const checked = SCHOOL_EXAMS.map((e) => e.checkedOn).sort()[0];

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link href="/school-exams" className={`inline-flex items-center gap-1 text-sm text-muted-foreground ${LINK}`}>
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
          All classes
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{titleFor(n)}</h1>
        <p className="mt-3 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground">
          Every admission test, government scholarship and science or maths competition a child
          can sit while in Class {n}, across India and in Maharashtra.
          {groups.some((g) => g.kind === "other") && " Last come a few well-known exams run by private institutes."}
        </p>

        <div className="mt-6">
          <ClassPicker current={n} />
        </div>

        {groups.length === 0 ? (
          <p className="mt-8 rounded-xl border bg-card p-5 text-sm leading-relaxed">
            No government admission test, scholarship or olympiad is sat in Class {n}. The first ones
            start in{" "}
            <Link href={classHref(firstClassWithExams ?? 4)} className={`font-medium text-brand-accent ${LINK}`}>
              Class {firstClassWithExams ?? 4}
            </Link>
            .
          </p>
        ) : (
          groups.map((g) => (
            <section key={g.kind} className="mt-10" aria-labelledby={`kind-${g.kind}`}>
              <h2 id={`kind-${g.kind}`} className="text-lg font-semibold tracking-tight sm:text-xl">
                {g.title}
              </h2>
              {g.note && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.note}</p>}
              <div className="mt-4 space-y-4">
                {g.exams.map((e) => (
                  <ExamCard
                    key={e.id}
                    exam={e}
                    ourLink={ourExamLink(e)}
                    nextLine={e.registrySlug ? nextTestLine(e, nextSitting(e.registrySlug, now, calendar)) : null}
                  />
                ))}
              </div>
            </section>
          ))
        )}

        <aside className="mt-10 space-y-2 rounded-xl border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
          <p className="flex gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              Dates and rules change every year. Always check the official site before applying. These
              were checked on each body&apos;s own site on {dateInWords(checked)}.
            </span>
          </p>
          <p className="pl-6">
            {NTSE_NOTE.text}{" "}
            <a href={NTSE_NOTE.sourceUrl} target="_blank" rel="noopener noreferrer" className={`text-brand-accent ${LINK}`}>
              NCERT
            </a>
          </p>
        </aside>
      </main>
      <Footer />
    </>
  );
}
