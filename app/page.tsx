import { HomeExplorer } from "./components/HomeExplorer";
import { PageShell, SocialLinks } from "./components/PortfolioBlocks";
import { home, pages, projects, workStories } from "./data";

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
          <div className="hero-portrait">
            <div className="hero-portrait-outline" aria-hidden="true" />
            <img className="hero-portrait-primary" src="/max-lee-portrait.jpg" alt="Max Lee" />
          </div>
        </div>
      </section>

      <HomeExplorer
        about={pages.about}
        aiAtWork={pages.aiAtWork}
        personalProjects={pages.projects}
        explorer={home.explorer}
        experienceExplorer={home.experienceExplorer}
        workStories={workStories}
        projects={projects}
      />
    </PageShell>
  );
}
