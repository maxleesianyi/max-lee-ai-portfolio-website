import Link from "next/link";
import { PageShell, ProjectFeature, WorkFeature } from "./components/PortfolioBlocks";
import { experience, projects, workStories } from "./data";

export default function Home() {
  return (
    <PageShell>
      <section className="hero section-pad">
        <div className="hero-copy">
          <span className="eyebrow">Account Executive - Singapore</span>
          <h1>I sell complex software, and I use AI to make the work sharper.</h1>
          <p>
            I am Max Lee Sian Yi, a Docusign AE promoted four times in five years.
            I pair MEDDPICC discipline with practical AI workflows, from account
            research at work to private tools I build after hours.
          </p>
          <div className="hero-actions">
            <Link href="/ai-at-work">AI at Work</Link>
            <Link href="/projects">Projects</Link>
          </div>
        </div>
        <div className="hero-proof" aria-label="Career highlights">
          <div>
            <strong>4x</strong>
            <span>promoted in 5 years at Docusign</span>
          </div>
          <div>
            <strong>$3M</strong>
            <span>largest commercial territory in Asia</span>
          </div>
          <div>
            <strong>55%</strong>
            <span>less account research time using AI</span>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <span className="eyebrow">AI at work</span>
          <h2>Practical AI workflows tied to measurable sales outcomes.</h2>
          <Link href="/ai-at-work">All AI at Work</Link>
        </div>
        <div className="feature-stack">
          {workStories.slice(0, 2).map((story, index) => (
            <WorkFeature key={story.slug} story={story} index={index} />
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <span className="eyebrow">Projects</span>
          <h2>Tools built around real workflows, not portfolio filler.</h2>
          <Link href="/projects">All Projects</Link>
        </div>
        <div className="feature-stack">
          {projects.map((project, index) => (
            <ProjectFeature key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="section-pad experience-section">
        <div className="section-heading">
          <span className="eyebrow">Experience</span>
          <h2>Commercial path</h2>
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
