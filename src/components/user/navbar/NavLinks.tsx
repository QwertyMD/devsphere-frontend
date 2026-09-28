import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/hooks/useScrollSection';
import { navLinks } from './navbarData';
import { useScrollSectionContext } from '@/contexts/ScrollSectionContext';
import { cn } from '@/lib/utils';

interface NavLinksProps {
  onClick?: () => void;
  vertical?: boolean;
}

const NavLinks = ({ onClick, vertical = false }: NavLinksProps) => {
  const { activeSection } = useScrollSectionContext();
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (section: string) => {
    onClick?.();
    if (location.pathname !== '/') {
      navigate('/');
      requestAnimationFrame(() => {
        setTimeout(() => scrollToSection(section), 80);
      });
      return;
    }
    scrollToSection(section);
  };

  return (
    <>
      {navLinks.map(({ label, icon, section }) => {
        const active = activeSection === section && location.pathname === '/';
        return (
          <button
            key={section}
            onClick={() => goToSection(section)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group flex items-center gap-2 rounded-full px-5 py-2 text-[15px] font-semibold transition-all duration-200',
              vertical && 'w-full justify-start px-4 py-3',
              active
                ? 'bg-red-700/[0.08] text-red-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            )}
          >
            <span className={cn('text-base transition-transform group-hover:scale-110', active ? 'text-red-700' : 'text-slate-400 group-hover:text-slate-700')}>
              {icon}
            </span>
            {label}
          </button>
        );
      })}
    </>
  );
};

export default NavLinks;
