import { socialLinks } from './navbarData';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {socialLinks.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid h-9 w-9 place-items-center rounded-full text-lg text-slate-500 transition hover:-translate-y-0.5 hover:bg-red-700/[0.08] hover:text-red-700"
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
