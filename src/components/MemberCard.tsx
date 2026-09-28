import type { Member } from '@/types/member.types';
import { Instagram, Linkedin } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    member.name
  )}&background=b91c1c&color=fff&size=320&bold=true`;

  return (
    <article className="card-lift group flex flex-col items-center rounded-2xl border border-slate-200/90 bg-white px-6 py-8 text-center shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)] hover:border-red-200 hover:shadow-[0_28px_60px_-28px_rgba(185,28,28,0.35)]">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-1.5 rounded-2xl bg-red-700/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
        />
        <img
          src={member.avatarUrl ?? fallbackAvatar}
          alt={member.name}
          loading="lazy"
          className="relative h-32 w-32 rounded-2xl object-cover shadow-md transition-transform duration-500 group-hover:scale-[1.04] group-hover:-rotate-1"
        />
      </div>

      <h3 className="font-heading mt-5 text-lg leading-tight font-bold text-slate-950">
        {member.name}
      </h3>
      <p className="mt-1 text-[11px] font-bold tracking-[0.18em] text-red-700 uppercase">
        {member.role}
      </p>

      <div className="mt-5 flex items-center gap-2">
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-red-700 hover:text-red-700"
          >
            <Linkedin size={16} />
          </a>
        )}
        {member.discordUrl && (
          <a
            href={
              member.discordUrl.startsWith('http')
                ? member.discordUrl
                : `https://discord.com/users/${member.discordUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on Discord`}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-red-700 hover:text-red-700"
          >
            <FaDiscord size={16} />
          </a>
        )}
        {member.instagramUrl && (
          <a
            href={member.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on Instagram`}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-red-700 hover:text-red-700"
          >
            <Instagram size={16} />
          </a>
        )}
      </div>
    </article>
  );
};

export default MemberCard;
