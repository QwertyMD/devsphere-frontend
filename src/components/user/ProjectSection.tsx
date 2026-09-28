import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Cpu, ExternalLink, GitBranch, Monitor, Package, Smartphone } from 'lucide-react';
import { formatDate } from '@/utils/formatdate.utils';
import { getAllProjects } from '@/services/admin/projectServices';
import type { ProjectResponse, Tag } from '@/types/project.types';
import SectionHeading from '@/components/user/SectionHeading';
import Reveal from '@/components/user/Reveal';
import { cn } from '@/lib/utils';

const FILTERS = [
  { label: 'All', tag: 'all', icon: Package },
  { label: 'Web', tag: 'Web', icon: Monitor },
  { label: 'Mobile', tag: 'Mobile', icon: Smartphone },
  { label: 'AI/ML', tag: 'AI/ML', icon: Cpu },
];

function ProjectSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4">
      <div className="h-44 rounded-xl bg-slate-100" />
      <div className="space-y-3 px-1 py-5">
        <div className="h-6 w-2/3 rounded bg-slate-100" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-slate-100" />
          <div className="h-6 w-16 rounded-full bg-slate-100" />
        </div>
        <div className="h-10 w-full rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

const tagName = (tag: Tag | string) => (typeof tag === 'string' ? tag : tag.name);

const ProjectSection = ({ hideHeading = false }: { hideHeading?: boolean }) => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        if (mounted) setProjects(data ?? []);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((project) => (project.tags ?? []).some((t) => tagName(t) === activeFilter)),
    [projects, activeFilter]
  );

  return (
    <div>
      {!hideHeading && (
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Projects"
          title="Built by the community"
          description="Real things, built after workshops and late-night calls. Filter by track and steal ideas."
        />
        <Reveal delay={100}>
          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex flex-wrap gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1.5"
          >
            {FILTERS.map(({ label, tag, icon: Icon }) => {
              const active = activeFilter === tag;
              return (
                <button
                  key={tag}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tag)}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                    active
                      ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:bg-white/70 hover:text-slate-800'
                  )}
                >
                  <Icon className={cn('h-4 w-4', active ? 'text-red-700' : 'text-slate-400')} />
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
      )}

      <div className={hideHeading ? '' : 'mt-10'}>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-8 py-12 text-center">
            <p className="font-semibold text-red-800">Couldn't load projects</p>
            <p className="mt-1 text-sm text-red-700/80">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-14 text-center">
            <p className="font-heading text-lg font-semibold text-slate-900">
              Nothing in this track yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Try another filter, or be the first to ship something here.
            </p>
          </div>
        ) : (
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i % 3, 2) * 90} className="h-full">
                <article className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_18px_45px_-28px_rgba(15,23,42,0.4)] hover:border-red-200 hover:shadow-[0_28px_60px_-28px_rgba(185,28,28,0.4)]">
                  <div className="relative overflow-hidden p-3 pb-0">
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.name}
                        loading="lazy"
                        className="h-48 w-full rounded-xl object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid-bg flex h-48 w-full items-center justify-center rounded-xl bg-slate-50 text-sm font-semibold text-slate-400">
                        No preview yet
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <h3 className="font-heading text-lg leading-snug font-bold text-slate-950">
                      {project.name}
                    </h3>

                    {(project.techStacks?.length ?? 0) > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.techStacks.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-red-700/[0.07] px-2.5 py-1 text-xs font-bold text-red-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(project.createdAt)}
                    </p>

                    {(project.contributors?.length ?? 0) > 0 && (
                      <div className="mt-4 flex items-center">
                        <div className="flex -space-x-2.5">
                          {project.contributors.slice(0, 4).map((c) => (
                            <span
                              key={c.id}
                              title={c.name}
                              className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-sm"
                            >
                              {c.avatarUrl ? (
                                <img
                                  src={c.avatarUrl}
                                  alt={c.name}
                                  loading="lazy"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="grid h-full w-full place-items-center text-[10px] font-bold text-slate-500">
                                  {c.name.charAt(0)}
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                        <span className="ml-2.5 text-xs text-slate-500">
                          by {project.contributors[0].name}
                          {project.contributors.length > 1 && ` +${project.contributors.length - 1}`}
                        </span>
                      </div>
                    )}

                    <div className="mt-5 flex gap-2.5 pt-1">
                      <a
                        href={project.githubLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                      >
                        <GitBranch className="h-4 w-4" />
                        Code
                      </a>
                      <a
                        href={project.demoLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live demo`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-950"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSection;
