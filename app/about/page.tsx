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
