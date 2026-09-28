import { Link } from 'react-router-dom';
import SectionHeading from '@/components/user/SectionHeading';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-white pt-32 pb-12 md:pt-36">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(40rem_20rem_at_50%_0%,rgba(185,28,28,0.09),transparent_65%),linear-gradient(to_bottom,transparent_60%,white)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <p className="mb-6 text-[13px] font-semibold text-slate-400">
          <Link to="/" className="transition hover:text-red-700 hover:underline">
            Home
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-slate-700">{eyebrow}</span>
        </p>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </div>
    </div>
  );
}
