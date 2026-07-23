import { PageShell } from "../components/PortfolioBlocks";
import { pages } from "../data";

export const metadata = {
  title: pages.about.metadata.title,
  description: pages.about.metadata.description,
};

export default function AboutPage() {
  const about = pages.about;

  return (
    <PageShell>
      <section className="about-section about-page section-pad">
        <div className="about-visual">
          <div className="hero-portrait about-portrait">
            <div className="hero-portrait-outline" aria-hidden="true" />
            <img className="hero-portrait-primary" src="/max-lee-portrait.jpg" alt="Max Lee" />
            <span className="hero-portrait-name" aria-hidden="true">Max Lee</span>
          </div>
          <button className="about-resume-button" type="button">Resume</button>
        </div>
        <div className="about-copy">
          <div className="about-page-intro">
            {about.story.intro.map((paragraph, index) => (
              <p className={index === 0 ? "about-page-lead" : undefined} key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="about-metrics">
            {about.story.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="about-thread">
            <p>{about.story.thread.quote}</p>
            <cite>{about.story.thread.title}</cite>
          </blockquote>
        </div>
      </section>

      <section className="about-story section-pad">
        <header className="about-story-heading">
          <p>{about.story.journey.label}</p>
          <h2>{about.story.journey.title}</h2>
          <span>{about.story.journey.body}</span>
        </header>
        <ol className="about-timeline">
          {about.story.journey.chapters.map((chapter) => (
            <li key={chapter.number}>
              <span className="about-timeline-number">{chapter.number}</span>
              <div>
                <p>{chapter.label}</p>
                <h3>{chapter.title}</h3>
                <span>{chapter.body}</span>
              </div>
            </li>
          ))}
        </ol>

        <section className="about-content-section">
          <header className="about-story-heading">
            <p>{about.story.strengths.label}</p>
            <h2>{about.story.strengths.title}</h2>
          </header>
          <div className="about-strengths">
            {about.story.strengths.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-content-section about-reading-section">
          <header className="about-story-heading">
            <p>{about.story.whyAi.label}</p>
            <h2>{about.story.whyAi.title}</h2>
          </header>
          <div className="about-reading-copy">
            {about.story.whyAi.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="about-content-section about-outside-work">
          <header className="about-story-heading">
            <p>{about.story.outsideWork.label}</p>
            <h2>{about.story.outsideWork.title}</h2>
          </header>
          <p>{about.story.outsideWork.body}</p>
          <ul className="about-outside-tags">
            {about.story.outsideWork.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </section>

        <footer className="about-closing">
          <p>{about.story.closing.label}</p>
          <span>{about.story.closing.body}</span>
        </footer>
      </section>
    </PageShell>
  );
}
