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
      <section className="subpage-hero section-pad">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1>{hero.headline}</h1>
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
