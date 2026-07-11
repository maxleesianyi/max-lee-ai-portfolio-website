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
          <div className="about-photo-placeholder" aria-label="About portrait placeholder">
            <div>
              <span>Portrait</span>
              <strong>Replace with your photo</strong>
            </div>
          </div>
          <dl className="about-facts">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="about-copy">
          <span className="eyebrow">{about.hero.eyebrow}</span>
          <h1>{about.hero.headline}</h1>
          <p className="about-intro">{about.hero.body}</p>
          <div className="about-narrative">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="about-lists">
            <div>
              <h3>Now</h3>
              <ul>
                {about.now.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Tools I reach for</h3>
              <ul className="tag-list tag-list--solid">
                {about.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
