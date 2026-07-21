import Link from "next/link";
import {
  navigation,
  site,
  type CaseStudySection,
  type Metric,
  type Project,
  type ToolTag,
  type WorkStory,
} from "../data";

function BrandMark() {
  const dotIndex = site.brandName.indexOf(".");

  if (dotIndex === -1) {
    return (
      <>
        <span className="brand-icon-crop" aria-hidden="true">
          <img src="/max-lee-mark.png" alt="" />
        </span>
        <span className="brand-wordmark">{site.brandName}</span>
      </>
    );
  }

  return (
    <>
      <span className="brand-icon-crop" aria-hidden="true">
        <img src="/max-lee-mark.png" alt="" />
      </span>
      <span className="brand-wordmark">
        {site.brandName.slice(0, dotIndex)}
        <span>.</span>
        {site.brandName.slice(dotIndex + 1)}
      </span>
    </>
  );
}

function SocialIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();

  if (normalized === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V9H7.1v11.45ZM22.23 0H1.76C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.76 24h20.47c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z" />
      </svg>
    );
  }

  if (normalized === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z" />
      </svg>
    );
  }

  return <span aria-hidden="true">{label.slice(0, 2)}</span>;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-links ${className}`} aria-label="Social links">
      {site.socialLinks.map((item) => (
        <a key={item.href} href={item.href} aria-label={item.label}>
          <SocialIcon label={item.label} />
        </a>
      ))}
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <BrandMark />
        </Link>
        <div className="nav-tabs">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
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
          <BrandMark />
        </Link>
        <p>{site.footerText}</p>
      </div>
      <div className="footer-links">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <a href={`mailto:${site.email}`}>Email</a>
        <SocialLinks />
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
  if (project.imageUrl) {
    return (
      <div className={`project-image-frame project-image-frame--${project.slug}`}>
        <img src={project.imageUrl} alt={`${project.title} app interface`} />
      </div>
    );
  }

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

export function ToolTagList({ tags, solid = false }: { tags: ToolTag[]; solid?: boolean }) {
  return (
    <ul className={`tag-list tool-tag-list ${solid ? "tag-list--solid" : ""}`}>
      {tags.map((tag) => (
        <li className="tool-tag" key={tag.name}>
          <img
            src={tag.logo}
            alt=""
            aria-hidden="true"
            style={tag.scale ? { transform: `scale(${tag.scale})` } : undefined}
          />
          <span>{tag.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`feature-row ${index % 2 ? "feature-row--reverse" : ""}`}>
      <Link href={`/projects/${project.slug}`} aria-label={`${project.title} case study`}>
        <ProjectVisual project={project} />
      </Link>
      <div className="feature-copy">
        <Link href={`/projects/${project.slug}`}>
          <h2>{project.title}</h2>
        </Link>
        {project.kicker ? (
          project.kickerUrl ? (
            <a
              className="project-build-week-link"
              href={project.kickerUrl}
              target="_blank"
              rel="noreferrer"
            >
              {project.kicker}
            </a>
          ) : (
            <p className="mono-note">{project.kicker}</p>
          )
        ) : null}
        <p>{project.summary}</p>
        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="feature-actions">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            Case study
          </Link>
          {project.externalUrl && project.externalLabel ? (
            <a className="text-link" href={project.externalUrl} target="_blank" rel="noreferrer">
              {project.externalLabel}
            </a>
          ) : null}
          {project.githubUrl ? (
            <a className="text-link project-github-link" href={project.githubUrl} target="_blank" rel="noreferrer">
              <SocialIcon label="GitHub" />
              {project.githubLabel ?? "GitHub"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function WorkFeature({ story, index }: { story: WorkStory; index: number }) {
  return (
    <article className={`feature-row ${index % 2 ? "feature-row--reverse" : ""}`}>
      <WorkVisual story={story} />
      <div className="feature-copy">
        <h2>{story.title}</h2>
        <p>{story.summary}</p>
        <ToolTagList tags={story.tags} />
        <div className="feature-actions">
          <Link className="text-link" href={`/ai-at-work/${story.slug}`}>
            Case Study
          </Link>
        </div>
      </div>
    </article>
  );
}

export function MetricRail({ metrics }: { metrics: Metric[] }) {
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

export function CaseStudySections({ sections }: { sections: CaseStudySection[] }) {
  return (
    <div className="case-sections">
      {sections.map((section) => (
        <section className="case-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.items ? (
            <ul className="case-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.blocks?.map((block) => (
            <div className="case-section-block" key={block.title}>
              <h3>{block.title}</h3>
              {block.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {block.items ? (
                <ul className="case-list">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {block.afterItems?.map((paragraph) => (
                <p className="case-after-list" key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
          {section.process ? (
            <p className="case-process" aria-label={section.process.join(" then ")}>
              {section.process.map((step, index) => (
                <span key={step}>
                  {index > 0 ? <b aria-hidden="true">→</b> : null}
                  {step}
                </span>
              ))}
            </p>
          ) : null}
        </section>
      ))}
    </div>
  );
}
