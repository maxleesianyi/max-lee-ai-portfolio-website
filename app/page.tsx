import Link from "next/link";
import { PageShell, ProjectFeature, WorkFeature } from "./components/PortfolioBlocks";
import { experience, home, projects, workStories } from "./data";

export default function Home() {
  const { hero, sections } = home;

  return (
    <PageShell>
      <section className="hero section-pad">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.headline}</h1>
          <p>{hero.body}</p>
          <div className="hero-actions">
            {hero.actions.map((action) => (
              <Link key={action.href} href={action.href}>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-photo-placeholder" aria-label="Portrait placeholder">
            <div>
              <span>Photo</span>
              <strong>Max Lee</strong>
            </div>
          </div>
          <div className="hero-proof" aria-label="Career highlights">
            {hero.proof.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section section-pad">
        <div className="about-visual">
          <div className="about-photo-placeholder" aria-label="About portrait placeholder">
            <div>
              <span>Portrait</span>
              <strong>Replace with your photo</strong>
            </div>
          </div>
          <dl className="about-facts">
            {home.about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="about-copy">
          <span className="eyebrow">{home.about.eyebrow}</span>
          <h2>{home.about.headline}</h2>
          <p className="about-intro">{home.about.intro}</p>
          <div className="about-narrative">
            {home.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="about-lists">
            <div>
              <h3>Now</h3>
              <ul>
                {home.about.now.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Tools I reach for</h3>
              <ul className="tag-list tag-list--solid">
                {home.about.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <span className="eyebrow">{sections.aiAtWork.eyebrow}</span>
          <h2>{sections.aiAtWork.headline}</h2>
          <Link href={sections.aiAtWork.href}>{sections.aiAtWork.linkLabel}</Link>
        </div>
        <div className="feature-stack">
          {workStories.slice(0, 2).map((story, index) => (
            <WorkFeature key={story.slug} story={story} index={index} />
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <span className="eyebrow">{sections.projects.eyebrow}</span>
          <h2>{sections.projects.headline}</h2>
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
