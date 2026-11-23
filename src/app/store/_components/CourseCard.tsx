import { ExternalLink, MonitorPlay } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { formatRupees } from "@/lib/billing/plans";
import { PARTNER_NAME, courseStatusLine, tapHref, type PartnerCourse } from "@/lib/partnerCourses/courses";

/**
 * A partner's online course on /store (trial, 2026-11-17). The button goes
 * through our own tap link (/api/partner-course/[id]), which counts the tap and
 * forwards to the partner's page in a new tab. A plain <a>, not next/link: the
 * target is a redirect off-site, so there is nothing to prefetch, and a
 * prefetch would hit the counter. rel="nofollow" keeps crawlers off it.
 * The card says plainly that the course is the partner's and opens their site.
 */
export default function CourseCard({ course, now }: { course: PartnerCourse; now: Date }) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="icon-tile grid h-9 w-9 shrink-0 place-items-center rounded-xl">
          <MonitorPlay className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-brand-accent">{courseStatusLine(course, now)}</p>
          <h3 className="mt-0.5 text-sm font-semibold">{course.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{course.blurb}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-auto sm:pt-4">
        <span className="text-sm font-semibold">{formatRupees(course.pricePaise)}</span>
        <a
          href={tapHref(course)}
          target="_blank"
          rel="nofollow noopener"
          className={buttonVariants({ size: "sm" })}
          aria-label={`View ${course.title} on ${PARTNER_NAME}'s site (opens in a new tab)`}
        >
          View course
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        From our partner {PARTNER_NAME}. Opens their site.
      </p>
    </article>
  );
}
