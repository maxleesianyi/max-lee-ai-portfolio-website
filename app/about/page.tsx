import { PageShell } from "../components/PortfolioBlocks";
import { pages } from "../data";

type IntroParagraph = {
  text?: string;
  prefix?: string;
  suffix?: string;
  link?: {
    label: string;
    href: string;
  };
};

export const metadata = {
  title: pages.about.metadata.title,
  description: pages.about.metadata.description,
};

export default function AboutPage() {
  const about = pages.about;
  const intro = about.story.intro as IntroParagraph[];

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
            {intro.map((paragraph) => (
              <p key={paragraph.text ?? paragraph.link?.href}>
                {paragraph.text ?? (
                  <>
                    {paragraph.prefix}
                    <a href={paragraph.link?.href} target="_blank" rel="noreferrer">
                      {paragraph.link?.label}
                    </a>
                    {paragraph.suffix}
                  </>
                )}
              </p>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
