import { CalendarDays, MapPin, Users } from 'lucide-react';
import type { EventResponse } from '@/types/event.types';
import { formatDate } from '@/utils/formatdate.utils';

interface EventUserCardProps {
  event: EventResponse;
}

const EventUserCard = ({ event }: EventUserCardProps) => {
  const schedule =
    event.eventSchedule?.length != null && event.eventSchedule.length > 0
      ? `${formatDate(event.eventSchedule[0].startDate)} – ${formatDate(
          event.eventSchedule[event.eventSchedule.length - 1].endDate
        )}`
      : 'Date TBD';

  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] hover:border-red-200">
      <div className="relative overflow-hidden p-3 pb-0">
        <img
          src={event.thumbnailUrl || 'https://placehold.co/600x400/b91c1c/white?text=Devsphere'}
          alt={event.name}
          loading="lazy"
          className="h-44 w-full rounded-xl object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
        <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur">
          <span
            className={
              event.status?.toLowerCase() === 'upcoming'
                ? 'h-1.5 w-1.5 rounded-full bg-emerald-400'
                : 'h-1.5 w-1.5 rounded-full bg-slate-300'
            }
          />
          {event.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="font-heading text-lg leading-snug font-bold text-slate-950">{event.name}</h3>
          <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">{event.description}</p>
        </div>

        <ul className="space-y-2 text-[13px] font-medium text-slate-600">
          <li className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-red-700" />
            {schedule}
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-red-700" />
            Biratnagar International College
          </li>
          <li className="flex items-center gap-2.5">
            <Users className="h-4 w-4 shrink-0 text-red-700" />
            50 attending
          </li>
        </ul>

        <button className="mt-auto w-full rounded-xl bg-slate-950 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-700">
          View details
        </button>
      </div>
    </article>
  );
};

export default EventUserCard;
