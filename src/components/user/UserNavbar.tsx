import { Link } from 'react-router-dom';
import MobileMenu from './navbar/MobileMenu';
import NavLinks from './navbar/NavLinks';
import SocialLinks from './navbar/SocialLinks';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

const UserNavbar = () => {
  const scrolled = useScrolled(12);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-slate-200/80 bg-white shadow-[0_8px_30px_-18px_rgba(15,23,42,0.35)] md:bg-white/85 md:backdrop-blur-xl'
          : 'border-transparent bg-white'
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <Link to="/" aria-label="Devsphere home" className="flex shrink-0 items-center">
          <img
            src="/logo.png"
            alt="Devsphere logo"
            className={cn('w-auto transition-all duration-300', scrolled ? 'h-13' : 'h-16 md:h-18')}
          />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-slate-50/60 p-1 md:flex">
          <NavLinks />
        </div>

        <SocialLinks className="hidden md:flex" />
        <MobileMenu />
      </div>
    </nav>
  );
};

export default UserNavbar;
