import Link from "next/link";
import { PageShell, ProjectFeature, SocialLinks, WorkFeature } from "./components/PortfolioBlocks";
import { experience, home, projects, workStories } from "./data";

export default function Home() {
  const { hero, sections } = home;
  const headlineLines =
    hero.headlineLines && hero.headlineLines.length > 0 ? hero.headlineLines : [hero.headline];

  return (
    <PageShell>
      <section className="hero section-pad">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>
            {headlineLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p>{hero.body}</p>
          <div className="hero-actions">
            {hero.actions.map((action) => (
              <Link key={action.href} href={action.href}>
                {action.label}
              </Link>
            ))}
          </div>
          <SocialLinks className="social-links--hero" />
        </div>
        <div className="hero-side">
          <div className="hero-photo-placeholder" aria-label="Portrait placeholder">
            <div>
              <span>Photo</span>
              <strong>Max Lee</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad home-showcase home-showcase--first">
        <div className="section-heading">
          <h2>
            <span>{sections.aiAtWork.accent}</span>{" "}
            {sections.aiAtWork.headline}
          </h2>
          <Link href={sections.aiAtWork.href}>{sections.aiAtWork.linkLabel}</Link>
        </div>
        <div className="feature-stack">
          {workStories.slice(0, 2).map((story, index) => (
            <WorkFeature key={story.slug} story={story} index={index} />
          ))}
        </div>
      </section>

      <section className="section-pad home-showcase">
        <div className="section-heading">
          <h2>
            <span>{sections.projects.accent}</span>{" "}
            {sections.projects.headline}
          </h2>
          <Link href={sections.projects.href}>{sections.projects.linkLabel}</Link>
        </div>
        <div className="feature-stack">
          {projects.map((project, index) => (
            <ProjectFeature key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="section-pad experience-section">
        <div className="section-heading">
          <span className="eyebrow">{sections.experience.eyebrow}</span>
          <h2>{sections.experience.headline}</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`}>
              <div>
                <h3>{item.role}</h3>
                <p>
                  {item.company} - {item.period}
                </p>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
