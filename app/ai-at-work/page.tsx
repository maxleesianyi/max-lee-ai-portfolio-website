import { PageShell, WorkFeature } from "../components/PortfolioBlocks";
import { pages, workStories } from "../data";

export const metadata = {
  title: pages.aiAtWork.metadata.title,
  description: pages.aiAtWork.metadata.description,
};

export default function AiAtWorkPage() {
  const { hero } = pages.aiAtWork;

  return (
    <PageShell>
      <section className="subpage-hero subpage-hero--wide subpage-hero--ai-at-work section-pad">
        <h1>
          {hero.headlineParts?.map((part, index) =>
            part.color ? (
              <span key={`${part.text}-${index}`} style={{ color: part.color }}>
                {part.text}
              </span>
            ) : (
              part.text
            ),
          ) ?? hero.headline}
        </h1>
        <div className="subpage-hero-footer">
          <p>{hero.body}</p>
          <aside className="ai-use-disclaimer" tabIndex={0} aria-label="A note on responsible AI use">
            <strong>A note on responsible AI use</strong>
            <p>
              All examples shown here were developed within Docusign&apos;s approved tools, access controls,
              and data-governance policies. Some workflows are therefore intentionally limited without
              external integrations, AI agents, or access to restricted systems.
            </p>
          </aside>
        </div>
      </section>
      <section className="section-pad feature-stack subpage-stack">
        {workStories.map((story, index) => (
          <WorkFeature key={story.slug} story={story} index={index} />
        ))}
      </section>
    </PageShell>
  );
}
