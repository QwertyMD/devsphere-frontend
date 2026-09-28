import Reveal from '@/components/user/Reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal
      className={cn('flex max-w-2xl flex-col gap-4', centered && 'mx-auto items-center text-center', className)}
    >
      <span className="inline-flex items-center gap-3">
        <span aria-hidden className="block h-px w-8 bg-red-700" />
        <span className="text-xs font-bold tracking-[0.22em] text-red-700 uppercase">{eyebrow}</span>
        {centered && <span aria-hidden className="block h-px w-8 bg-red-700" />}
      </span>
      <h2 className="font-heading text-3xl font-bold text-balance text-slate-900 md:text-4xl">
        {title}
      </h2>
      {description && <p className="leading-relaxed text-pretty text-slate-600">{description}</p>}
    </Reveal>
  );
}
