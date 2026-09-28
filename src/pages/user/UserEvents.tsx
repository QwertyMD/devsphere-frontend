import { useEffect, useState } from 'react';
import EventUserCard from '@/components/user/EventUserCard';
import PageHeader from '@/components/user/PageHeader';
import Reveal from '@/components/user/Reveal';
import { getAllEvents } from '@/services/admin/eventServices';
import type { EventResponse } from '@/types/event.types';

const UserEvents = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAllEvents()
      .then((data) => mounted && setEvents(data ?? []))
      .catch(() => mounted && setEvents([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Events"
        title="Every event, in one place"
        description="Workshops, build nights, and demo days. Find the next one or revisit what you missed."
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-3">
                <div className="h-44 rounded-xl bg-slate-100" />
                <div className="space-y-3 p-3">
                  <div className="h-5 w-2/3 rounded bg-slate-100" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center">
            <p className="font-heading text-lg font-semibold text-slate-900">No events yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Check back soon — the next one is being planned.
            </p>
          </div>
        ) : (
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.id} delay={Math.min(i % 3, 2) * 80} className="h-full">
                <EventUserCard event={event} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEvents;
