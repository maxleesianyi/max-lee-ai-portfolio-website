import Link from "next/link";
import type { Project, WorkStory } from "../data";

export function Header() {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/">
          max<span>.</span>lee
        </Link>
        <div className="nav-tabs">
          <Link href="/ai-at-work">AI at Work</Link>
          <Link href="/projects">Projects</Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="brand" href="/">
          max<span>.</span>lee
        </Link>
        <p>Account Executive in Singapore, building with AI at work and after hours.</p>
      </div>
      <div className="footer-links">
        <Link href="/ai-at-work">AI at Work</Link>
        <Link href="/projects">Projects</Link>
        <a href="mailto:leesianyi@gmail.com">Email</a>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export function BrowserFrame({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`browser-frame browser-frame--${accent}`}>
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <small>{title}</small>
      </div>
      <div className="browser-canvas">{children}</div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <BrowserFrame title={project.slug.replaceAll("-", ".")} accent={project.accent}>
      <div className="mock-dashboard">
        <div className="mock-sidebar">
          <span />
          <span />
          <span />
        </div>
        <div className="mock-main">
          <div className="mock-kicker">{project.status}</div>
          <h3>{project.title}</h3>
          <div className="mock-bars">
            <span />
            <span />
            <span />
          </div>
          <div className="mock-grid">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <small>{metric.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function WorkVisual({ story }: { story: WorkStory }) {
  return (
    <BrowserFrame title={story.slug.replaceAll("-", ".")} accent={story.accent}>
      <div className="mock-research">
        <div>
          <span className="mock-kicker">{story.eyebrow}</span>
          <h3>{story.title}</h3>
          <p>{story.summary}</p>
        </div>
        <div className="mock-grid">
          {story.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <small>{metric.label}</small>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`feature-row ${index % 2 ? "feature-row--reverse" : ""}`}>
      <Link href={`/projects/${project.slug}`} aria-label={`${project.title} case study`}>
        <ProjectVisual project={project} />
      </Link>
      <div className="feature-copy">
        <div className="meta-line">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.year}</span>
          <span>{project.status}</span>
        </div>
        <Link href={`/projects/${project.slug}`}>
          <h2>{project.title}</h2>
        </Link>
        <p className="mono-note">{project.kicker}</p>
        <p>{project.summary}</p>
        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Link className="text-link" href={`/projects/${project.slug}`}>
          Case study
        </Link>
      </div>
    </article>
  );
}

export function WorkFeature({ story, index }: { story: WorkStory; index: number }) {
  return (
    <article className={`feature-row ${index % 2 ? "feature-row--reverse" : ""}`}>
      <WorkVisual story={story} />
      <div className="feature-copy">
        <div className="meta-line">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{story.year}</span>
          <span>{story.eyebrow}</span>
        </div>
        <h2>{story.title}</h2>
        <p>{story.summary}</p>
        <ul className="tag-list">
          {story.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function MetricRail({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <div className="metric-rail">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}
