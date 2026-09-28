import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLinks';
import SocialLinks from './SocialLinks';
import { cn } from '@/lib/utils';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex md:hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="rounded-full p-2.5 text-slate-800 transition hover:bg-slate-100 active:scale-95"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div
        className={cn(
          'absolute inset-x-0 top-full z-40 max-h-[70dvh] origin-top overflow-y-auto rounded-b-2xl shadow-[0_28px_44px_-16px_rgba(15,23,42,0.35)] transition-all duration-300',
          isOpen ? 'visible scale-y-100 opacity-100' : 'invisible scale-y-95 opacity-0'
        )}
      >
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-4 py-4">
          <NavLinks vertical onClick={() => setIsOpen(false)} />
          <div className="mt-2 border-t border-slate-100 px-4 py-4">
            <SocialLinks />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
