import { useEffect, useState } from 'react';
import { getAllMembers } from '@/services/admin/memberServices';
import type { Member } from '@/types/member.types';
import MemberCard from '@/components/MemberCard';
import SectionHeading from '@/components/user/SectionHeading';
import Reveal from '@/components/user/Reveal';

function MemberSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-8">
      <div className="h-32 w-32 rounded-2xl bg-slate-100" />
      <div className="mt-5 h-5 w-2/3 rounded bg-slate-100" />
      <div className="mt-2 h-4 w-1/3 rounded bg-slate-100" />
    </div>
  );
}

const MemberUserCard = ({ hideHeading = false, showAll = false }: { hideHeading?: boolean; showAll?: boolean }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        if (mounted) setMembers(data.filter((m) => m.status === 'ACTIVE'));
      } catch {
        if (mounted) setMembers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMembers();
    return () => {
      mounted = false;
    };
  }, []);

  const visible = showAll ? members : members.slice(0, 8);

  return (
    <div>
      {!hideHeading && (
        <SectionHeading
          eyebrow="Team"
          title="Meet our people"
          description="The ones running workshops, reviewing PRs, and keeping the Discord alive."
        />
      )}

      {loading ? (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <MemberSkeleton key={i} />
          ))}
        </div>
      ) : members.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center">
          <p className="font-heading text-lg font-semibold text-slate-900">No members to show yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            We're updating the roster. Check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((member, i) => (
            <Reveal key={member.id} delay={Math.min(i % 4, 3) * 80} className="h-full">
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberUserCard;
