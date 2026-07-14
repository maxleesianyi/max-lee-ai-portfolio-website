import { PageShell, ProjectFeature } from "../components/PortfolioBlocks";
import { pages, projects } from "../data";

export const metadata = {
  title: pages.projects.metadata.title,
  description: pages.projects.metadata.description,
};

export default function ProjectsPage() {
  const { hero } = pages.projects;

  return (
    <PageShell>
      <section className="subpage-hero subpage-hero--wide subpage-hero--projects section-pad">
        <h1>
          {hero.headlineParts?.map((part, index) =>
            part.color ? (
              <span key={`${part.text}-${index}`} style={{ color: part.color }}>
                {part.text}
              </span>
            ) : (
              part.text
            ),
          ) ?? hero.headline}
        </h1>
        <p>{hero.body}</p>
      </section>
      <section className="section-pad feature-stack subpage-stack">
        {projects.map((project, index) => (
          <ProjectFeature key={project.slug} project={project} index={index} />
        ))}
      </section>
    </PageShell>
  );
}
