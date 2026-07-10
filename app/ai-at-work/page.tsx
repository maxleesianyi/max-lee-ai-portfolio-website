import { PageShell, WorkFeature } from "../components/PortfolioBlocks";
import { workStories } from "../data";

export const metadata = {
  title: "AI at Work - Max Lee",
  description: "How Max Lee uses AI in sales workflows and personal building.",
};

export default function AiAtWorkPage() {
  return (
    <PageShell>
      <section className="subpage-hero section-pad">
        <span className="eyebrow">AI at Work</span>
        <h1>AI as leverage inside real commercial work.</h1>
        <p>
          These are the places where Max has used AI to reduce research time,
          sharpen sales execution, learn faster, and build useful internal tools.
        </p>
      </section>
      <section className="section-pad feature-stack subpage-stack">
        {workStories.map((story, index) => (
          <WorkFeature key={story.slug} story={story} index={index} />
        ))}
      </section>
    </PageShell>
  );
}
