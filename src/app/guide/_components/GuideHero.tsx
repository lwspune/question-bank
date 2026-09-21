import { cn } from "@/lib/utils";
import ExpandableProse from "./ExpandableProse";

type Props = {
  eyebrow?: string; // e.g. "NDA Mathematics Guide"
  title: string;
  subtitle?: string;
  /**
   * Collapse the subtitle behind a "Read more" (2 lines on a phone, 4 from the
   * `sm` breakpoint up).
   *
   * OPT-IN, deliberately — not a length heuristic inside this component. Some
   * 85 call sites render a one-line subtitle that a heuristic would leave alone
   * today and restyle the day someone lengthened it. Only the /notes chapter
   * hero passes it: its `intro` is the one long-form subtitle on the site, a
   * median 1,035 chars across the 85 shipped chapters.
   *
   * Requires the subtitle to be PLAIN TEXT — see ExpandableProse on why a clamp
   * must not sit over rendered math.
   */
  collapsibleSubtitle?: boolean;
  children?: React.ReactNode; // optional StatBlock or CTA row below the subtitle
  className?: string;
};

const SUBTITLE_CLASS =
  "mt-4 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground sm:text-lg";

export default function GuideHero({
  eyebrow,
  title,
  subtitle,
  collapsibleSubtitle,
  children,
  className,
}: Props) {
  return (
    <header className={cn("mb-10 sm:mb-12", className)}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {subtitle &&
        (collapsibleSubtitle ? (
          <ExpandableProse text={subtitle} className={SUBTITLE_CLASS} />
        ) : (
          <p className={SUBTITLE_CLASS}>{subtitle}</p>
        ))}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
