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
          <p className="about-role">Majors Account Executive, Docusign</p>
          <button className="about-resume-button" type="button">Resume</button>
        </div>
        <div className="about-copy">
          <div className="about-page-intro">
            {about.story.intro.map((paragraph, index) => (
              <p className={index === 0 ? "about-page-lead" : undefined} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
