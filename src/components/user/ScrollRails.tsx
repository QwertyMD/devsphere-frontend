import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/hooks/useScrollSection';
import { cn } from '@/lib/utils';

const STOPS = [
  { id: 'home', label: 'Top' },
  { id: 'events', label: 'Events' },
  { id: 'projects', label: 'Projects' },
  { id: 'members', label: 'Members' },
  { id: 'faq', label: 'FAQ' },
];

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

const ScrollRails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [railActive, setRailActive] = useState('home');

  const fillLeftRef = useRef<HTMLSpanElement>(null);
  const fillRightRef = useRef<HTMLSpanElement>(null);
  const rocketRef = useRef<HTMLImageElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const pctRightRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const ratiosRef = useRef<Record<string, number>>({ home: 0 });
  const activeRef = useRef('home');
  const lastDocRef = useRef(0);

  useEffect(() => {
    let raf = 0;

    const refreshRatios = (doc: number) => {
      const ratios: Record<string, number> = {};
      const entryLead = window.innerHeight * 0.4;
      for (const { id } of STOPS) {
        if (id === 'home') {
          ratios[id] = 0;
          continue;
        }
        const el = document.querySelector(`[data-section-id="${id}"]`);
        if (el && doc > 0) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          ratios[id] = clamp01((top - entryLead) / doc);
        }
      }
      ratiosRef.current = ratios;
      for (const { id } of STOPS) {
        const dot = stopsRef.current.get(id);
        if (dot && ratios[id] !== undefined) dot.style.top = `${ratios[id] * 100}%`;
      }
    };

    const update = () => {
      raf = 0;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      if (Math.abs(doc - lastDocRef.current) > 40) {
        lastDocRef.current = doc;
        refreshRatios(Math.max(doc, 1));
      }
      const progress = doc > 0 ? clamp01(window.scrollY / doc) : 0;

      const ratios = ratiosRef.current;
      let current = STOPS[0].id;
      for (const { id } of STOPS) {
        if (ratios[id] !== undefined && progress + 0.004 >= ratios[id]) current = id;
      }
      if (current !== activeRef.current) {
        activeRef.current = current;
        setRailActive(current);
      }

      if (fillLeftRef.current) fillLeftRef.current.style.transform = `scaleY(${progress})`;
      if (fillRightRef.current) fillRightRef.current.style.transform = `scaleY(${progress})`;
      if (rocketRef.current) rocketRef.current.style.top = `${progress * 100}%`;
      if (pctRef.current) pctRef.current.textContent = `${Math.round(progress * 100)}%`;
      if (pctRightRef.current) pctRightRef.current.textContent = `${Math.round(progress * 100)}%`;
      if (railRef.current) {
        railRef.current.style.opacity = window.scrollY > window.innerHeight * 0.4 ? '1' : '0';
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    lastDocRef.current = 0;
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [location.pathname]);

  const goTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(id), 140);
      return;
    }
    scrollToSection(id);
  };

  return (
    <div
      ref={railRef}
      className="pointer-events-none fixed inset-x-0 inset-y-0 z-30 hidden transition-opacity duration-500 xl:block"
      style={{ opacity: 0 }}
    >
      <div className="absolute top-1/2 left-7 flex -translate-y-1/2 flex-col items-center gap-4">
        <span className="font-mono text-xs font-bold tracking-widest text-slate-500">
          <span ref={pctRef}>0%</span>
        </span>
        <div className="relative h-72 w-0.5 rounded-full bg-slate-200">
          <span
            ref={fillLeftRef}
            className="absolute inset-0 origin-top rounded-full bg-red-700"
            style={{ transform: 'scaleY(0)' }}
          />
          {STOPS.map(({ id, label }) => {
            const active = railActive === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  if (el) stopsRef.current.set(id, el);
                  else stopsRef.current.delete(id);
                }}
                onClick={() => goTo(id)}
                aria-label={`Go to ${label}`}
                aria-current={active ? 'true' : undefined}
                className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 p-2"
                style={{ top: '0%', left: '50%' }}
              >
                <span
                  className={cn(
                    'block rounded-full transition-all duration-300',
                    active
                      ? 'h-3.5 w-3.5 bg-red-700 shadow-[0_0_0_5px_rgba(185,28,28,0.15)]'
                      : 'h-2 w-2 bg-slate-300 group-hover:scale-125 group-hover:bg-slate-500'
                  )}
                />
                <span className="pointer-events-none absolute top-1/2 left-7 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-slate-700 opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute top-1/2 right-7 flex -translate-y-1/2 flex-col items-center gap-4">
        <span className="font-mono text-xs font-bold tracking-widest text-slate-500">
          <span ref={pctRightRef}>0%</span>
        </span>
        <div className="relative h-72 w-0.5 rounded-full bg-slate-200">
          <span
            ref={fillRightRef}
            className="absolute inset-0 origin-top rounded-full bg-red-700"
            style={{ transform: 'scaleY(0)' }}
          />
          <img
            ref={rocketRef}
            src="/rocket.svg"
            alt=""
            aria-hidden
            className="absolute w-16 max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_8px_14px_rgba(185,28,28,0.45)]"
            style={{ top: '0%', left: '50%' }}
          />
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="pointer-events-auto grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:border-red-700"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M12 19V5m-7 7 7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScrollRails;
