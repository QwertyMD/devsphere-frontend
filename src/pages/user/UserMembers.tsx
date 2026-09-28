import MemberUserCard from '@/components/user/MemberUserCard';
import PageHeader from '@/components/user/PageHeader';

const UserMembers = () => {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Members"
        title="Meet our people"
        description="The ones running workshops, reviewing PRs, and keeping the Discord alive."
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <MemberUserCard hideHeading showAll />
      </div>
    </div>
  );
};

export default UserMembers;
