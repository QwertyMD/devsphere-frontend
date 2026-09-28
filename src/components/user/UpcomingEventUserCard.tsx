import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { getAllEvents } from '@/services/admin/eventServices';
import type { EventResponse } from '@/types/event.types';
import { getEventDurationText, getEventScheduleText } from '@/utils/event.utils';
import SectionHeading from '@/components/user/SectionHeading';
import Reveal from '@/components/user/Reveal';

function EventSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:flex-row">
      <div className="h-64 bg-slate-100 md:h-auto md:w-2/5" />
      <div className="flex-1 space-y-4 p-8">
        <div className="h-8 w-2/3 rounded bg-slate-100" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-5/6 rounded bg-slate-100" />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="h-20 rounded-xl bg-slate-100" />
          <div className="h-20 rounded-xl bg-slate-100" />
          <div className="h-20 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

const UpcomingEventUserCard = () => {
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUpcoming = async () => {
      try {
        const allEvents = await getAllEvents();
        const upcoming = allEvents.filter((e) => e.status?.toLowerCase() === 'upcoming');
        if (mounted) setEvent(upcoming[0] ?? null);
      } catch {
        if (mounted) setEvent(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUpcoming();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <SectionHeading
        eyebrow="Events"
        title="What's happening next"
        description="One spotlight event at a time. Show up, build something, meet the people behind the commits."
      />

      <Reveal delay={120} className="mt-8">
        {loading ? (
          <EventSkeleton />
        ) : !event ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center">
            <p className="font-heading text-lg font-semibold text-slate-900">
              No upcoming events right now
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              We're probably planning the next one. Check back soon or follow us to get notified
              first.
            </p>
          </div>
        ) : (
          <article className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] hover:shadow-[0_32px_70px_-28px_rgba(185,28,28,0.35)] md:flex-row">
            <div className="relative overflow-hidden md:w-2/5">
              <img
                src={
                  event.thumbnailUrl ||
                  'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'
                }
                alt={event.name}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-full md:min-h-[26rem]"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-red-700 shadow backdrop-blur">
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-red-700" />
                {event.status}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-8 p-7 md:p-10">
              <div className="space-y-5">
                <h3 className="font-heading max-w-xl text-2xl leading-tight font-bold text-balance text-slate-950 md:text-4xl">
                  {event.name}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-600 line-clamp-3 md:text-base">
                  {event.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      icon: <CalendarDays className="h-4 w-4 text-red-700" />,
                      label: 'Schedule',
                      value: getEventScheduleText(event.eventSchedule),
                    },
                    {
                      icon: <MapPin className="h-4 w-4 text-red-700" />,
                      label: 'Venue',
                      value: 'BIC, Biratnagar',
                    },
                    {
                      icon: <Users className="h-4 w-4 text-red-700" />,
                      label: 'Audience',
                      value: '150+ registered',
                    },
                  ].map((meta) => (
                    <div
                      key={meta.label}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-red-200 hover:bg-red-50/50"
                    >
                      <p className="mb-1.5 flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase">
                        {meta.icon}
                        <span className="text-slate-500">{meta.label}</span>
                      </p>
                      <p className="line-clamp-2 text-sm font-medium text-slate-800">{meta.value}</p>
                    </div>
                  ))}
                </div>

                <p className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3.5 py-1.5 text-xs font-semibold text-white">
                  <Clock className="h-3.5 w-3.5" />
                  {getEventDurationText(event.eventSchedule)}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-8 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(185,28,28,0.6)] transition hover:-translate-y-0.5 hover:bg-red-800 active:translate-y-0">
                  Register now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
                <p className="text-center text-xs text-slate-500 sm:text-left">
                  Free for students · Seats fill fast
                </p>
              </div>
            </div>
          </article>
        )}
      </Reveal>
    </div>
  );
};

export default UpcomingEventUserCard;
