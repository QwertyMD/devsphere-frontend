import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowRight, CalendarDays } from 'lucide-react';
import InfiniteGallery from '@/components/gallery/InfiniteGallery';
import MemberUserCard from '@/components/user/MemberUserCard';
import ProjectSection from '@/components/user/ProjectSection';
import UpcomingEventUserCard from '@/components/user/UpcomingEventUserCard';
import FAQ from '@/components/user/FAQ';
import { scrollToSection, useScrollSection } from '@/hooks/useScrollSection';
import { useScrollSectionContext } from '@/contexts/ScrollSectionContext';

const SECTIONS = [
  { id: 'home', path: '' },
  { id: 'events', path: 'events' },
  { id: 'projects', path: 'projects' },
  { id: 'members', path: 'members' },
  { id: 'faq', path: '' },
];

const UserHome = () => {
  const { setActiveSection } = useScrollSectionContext();
  const [heroProgress, setHeroProgress] = useState(0);

  const handleSectionChange = useCallback(
    (id: string, path: string) => {
      setActiveSection(id);
      window.history.replaceState(null, '', path ? `/${path}` : '/');
    },
    [setActiveSection]
  );

  useScrollSection(SECTIONS, handleSectionChange);

  useEffect(() => {
    let raf = 0;
    const updateHeroProgress = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight || 1;
        setHeroProgress(Math.min(window.scrollY / (viewportHeight * 0.85), 1));
      });
    };
    updateHeroProgress();
    window.addEventListener('scroll', updateHeroProgress, { passive: true });
    window.addEventListener('resize', updateHeroProgress);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updateHeroProgress);
      window.removeEventListener('resize', updateHeroProgress);
    };
  }, []);

  const heroStyle = { '--hero-progress': heroProgress } as CSSProperties;

  return (
    <div>
      <section
        data-section-id="home"
        style={heroStyle}
        className="sticky top-0 z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white pt-28 pb-10 text-center"
      >
        <div aria-hidden className="grid-bg grid-bg-animated absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 [background:radial-gradient(52rem_30rem_at_50%_18%,rgba(185,28,28,0.10),transparent_62%),radial-gradient(40rem_26rem_at_50%_108%,rgba(15,23,42,0.10),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 [background:linear-gradient(to_bottom,transparent_55%,white_96%)]"
        />

        <img
          src="/rocket.svg"
          alt=""
          aria-hidden
          className="hero-motion-rocket hero-motion-rocket-left animate-float-slow absolute top-[10%] left-[4%] w-40 opacity-90 md:left-[8%] md:w-88"
        />
        <img
          src="/rocket.svg"
          alt=""
          aria-hidden
          className="hero-motion-rocket hero-motion-rocket-right animate-float-slower absolute right-[4%] bottom-[35%] w-48 opacity-90 md:right-[8%] md:w-[24rem]"
        />

        <div className="hero-motion-content relative px-6">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-700 shadow-sm backdrop-blur">
            Biratnagar International College
          </p>
          <h1 className="font-heading text-5xl leading-[1.04] font-bold tracking-tight text-balance md:text-7xl">
            <span className="text-red-700">Learn.</span>{' '}
            <span className="relative inline-block bg-red-700 px-4 text-white line-through decoration-[6px]">
              Code
            </span>
            <br />
            <span className="text-slate-950">Grow. </span>
            <span className="text-red-700">Together</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-slate-600 md:text-lg">
            Workshops, real projects, and people who review your code. Come curious, leave with
            something shipped.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection('events')}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-700 px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(185,28,28,0.6)] transition hover:-translate-y-0.5 hover:bg-red-800 active:translate-y-0 sm:w-auto"
            >
              <CalendarDays className="h-4 w-4" />
              See what's next
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="hero-motion-gallery relative mt-12 w-full md:mt-16">
          <InfiniteGallery />
        </div>

        <button
          onClick={() => scrollToSection('events')}
          aria-label="Scroll to events"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold tracking-widest text-slate-400 uppercase transition hover:text-red-700 md:inline-flex"
        >
          Scroll
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>

      <div style={heroStyle} className="hero-motion-panel relative z-10 bg-white">
        <div className="mx-auto max-w-6xl space-y-28 px-6 py-20 md:space-y-36 md:px-10 md:py-28">
          <section data-section-id="events" className="scroll-mt-24">
            <UpcomingEventUserCard />
          </section>
          <section data-section-id="projects" className="scroll-mt-24">
            <ProjectSection />
          </section>
          <section data-section-id="members" className="scroll-mt-24">
            <MemberUserCard />
          </section>
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
