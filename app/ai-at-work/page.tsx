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
      <section className="subpage-hero section-pad">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1>{hero.headline}</h1>
        <p>{hero.body}</p>
      </section>
      <section className="section-pad feature-stack subpage-stack">
        {workStories.map((story, index) => (
          <WorkFeature key={story.slug} story={story} index={index} />
        ))}
      </section>
    </PageShell>
  );
}
