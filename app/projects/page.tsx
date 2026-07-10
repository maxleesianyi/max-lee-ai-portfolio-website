import { PageShell, ProjectFeature } from "../components/PortfolioBlocks";
import { projects } from "../data";

export const metadata = {
  title: "Projects - Max Lee",
  description: "AI and workflow projects built by Max Lee.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <section className="subpage-hero section-pad">
        <span className="eyebrow">Projects</span>
        <h1>Tools built end to end around real workflows.</h1>
        <p>
          A small set of focused builds: private AI practice, household operations,
          and the systems needed to make them usable.
        </p>
      </section>
      <section className="section-pad feature-stack subpage-stack">
        {projects.map((project, index) => (
          <ProjectFeature key={project.slug} project={project} index={index} />
        ))}
      </section>
    </PageShell>
  );
}
