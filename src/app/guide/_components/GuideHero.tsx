import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string; // e.g. "NDA Mathematics Guide"
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // optional StatBlock or CTA row below the subtitle
  className?: string;
};

export default function GuideHero({
  eyebrow,
  title,
  subtitle,
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
      {subtitle && (
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
