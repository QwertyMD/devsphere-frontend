import ProjectSection from '@/components/user/ProjectSection';
import PageHeader from '@/components/user/PageHeader';

const UserProjects = () => {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Projects"
        title="Built by the community"
        description="Real things, built after workshops and late-night calls. Filter by track and steal ideas."
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <ProjectSection hideHeading />
      </div>
    </div>
  );
};

export default UserProjects;
