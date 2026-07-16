import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CaseStudySections,
  PageShell,
  ProjectVisual,
} from "../../components/PortfolioBlocks";
import { projects, site } from "../../data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} - ${site.brandName}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const nextProject =
    projects.find((item) => item.slug === project.next) ??
    projects.find((item) => item.slug !== project.slug);

  return (
    <PageShell>
      <article className="case-study section-pad">
        <h1 className={project.titleLines ? "case-title-lines" : undefined}>
          {project.titleLines
            ? project.titleLines.map((line) => <span key={line}>{line}</span>)
            : project.title}
        </h1>
        <p className="case-lede">{project.summary}</p>
        <div className="case-build-stack">
          <span className="eyebrow">Built with</span>
          <ul className="tag-list case-tech-cards">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="case-visual">
          <ProjectVisual project={project} />
        </div>

        {project.caseStudySections ? (
          <CaseStudySections sections={project.caseStudySections} />
        ) : (
          <div className="case-body">
            <div className="case-narrative">
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside className="case-aside">
              <span className="eyebrow">Highlights</span>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <span className="eyebrow built-with">Built with</span>
              <ul className="tag-list tag-list--solid">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="role-note">{project.role}</p>
            </aside>
          </div>
        )}
      </article>
      {nextProject ? (
        <section className="next-project section-pad">
          <Link href={`/projects/${nextProject.slug}`}>
            <span>Next personal project</span>
            <strong>{nextProject.title}</strong>
          </Link>
        </section>
      ) : null}
    </PageShell>
  );
}
