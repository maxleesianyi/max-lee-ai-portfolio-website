import { ExperienceExplorer } from "./components/ExperienceExplorer";
import { HomeExplorer } from "./components/HomeExplorer";
import { PageShell, SocialLinks } from "./components/PortfolioBlocks";
import { experience, home, pages, projects, workStories } from "./data";

export default function Home() {
  const { hero } = home;
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
          <SocialLinks className="social-links--hero" />
        </div>
        <div className="hero-side">
          <div className="hero-photo-stack" aria-label="Portrait gallery placeholder">
            <div className="hero-photo-card hero-photo-card--two" aria-hidden="true" />
            <div className="hero-photo-card hero-photo-card--one" aria-hidden="true" />
            <div className="hero-photo-card hero-photo-card--default" aria-hidden="true" />
            <div className="hero-photo-phase hero-photo-phase--one" aria-hidden="true" />
            <div className="hero-photo-phase hero-photo-phase--two" aria-hidden="true" />
            <div className="hero-photo-phase hero-photo-phase--three" aria-hidden="true" />
            <div className="hero-photo-caption">
              <span>Portrait gallery</span>
              <strong>Max Lee</strong>
            </div>
          </div>
        </div>
      </section>

      <HomeExplorer
        about={pages.about}
        aiAtWork={pages.aiAtWork}
        personalProjects={pages.projects}
        explorer={home.explorer}
        workStories={workStories}
        projects={projects}
      />

      <ExperienceExplorer content={home.experienceExplorer} experience={experience} />
    </PageShell>
  );
}
