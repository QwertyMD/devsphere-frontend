import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { scrollToSection } from '@/hooks/useScrollSection';

const SOCIALS = [
  { href: 'https://discord.com/', icon: FaDiscord, label: 'Discord' },
  { href: 'https://instagram.com/', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://linkedin.com/', icon: FaLinkedin, label: 'LinkedIn' },
];

const QUICK_LINKS = [
  { section: 'events', label: 'Events' },
  { section: 'projects', label: 'Projects' },
  { section: 'members', label: 'Members' },
];

const UserFooter = () => {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-12 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-4">
            <img src="/logo.png" alt="Devsphere logo" className="h-14 w-auto" />
            <p className="text-sm leading-relaxed text-slate-600">
              Join our Discord or follow us on Instagram to keep up with our latest work, events,
              and announcements.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-lg text-slate-600 transition hover:-translate-y-0.5 hover:border-red-700 hover:text-red-700"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links" className="space-y-4">
            <p className="font-heading text-sm font-bold tracking-widest text-red-700 uppercase">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm font-medium">
              {QUICK_LINKS.map(({ section, label }) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-slate-600 underline-offset-4 transition hover:text-slate-950 hover:underline"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="font-heading text-sm font-bold tracking-widest text-red-700 uppercase">
              Community
            </p>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('events')}
                  className="text-slate-600 underline-offset-4 transition hover:text-slate-950 hover:underline"
                >
                  How it works
                </button>
              </li>
              <li>
                <a
                  href="mailto:hello@devsphere.club"
                  className="text-slate-600 underline-offset-4 transition hover:text-slate-950 hover:underline"
                >
                  Get in touch
                </a>
              </li>
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-950 hover:text-slate-950"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 text-[13px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2025 Devsphere. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="transition hover:text-slate-950 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/" className="transition hover:text-slate-950 hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
