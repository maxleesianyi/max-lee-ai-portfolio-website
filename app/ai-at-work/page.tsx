import { AiWorkExplorer } from "../components/AiWorkExplorer";
import { PageShell } from "../components/PortfolioBlocks";
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
            <p>{hero.disclaimer}</p>
          </aside>
        </div>
      </section>
      <section className="section-pad subpage-stack ai-workflow-section">
        <AiWorkExplorer stories={workStories} />
      </section>
      <section className="section-pad human-judgement">
        <h2>Where Human Judgement Remains Essential</h2>
        <p>
          AI helps me research, organise information, and develop a stronger first draft. It does not replace the
          judgement, context, or accountability required in enterprise sales.
        </p>
        <div className="human-judgement-list">
          <article>
            <h3>I verify the evidence</h3>
            <p>
              For factual or time-sensitive outputs, I ask AI to provide sources and review the underlying material
              myself. I do not treat a confident answer as an accurate one without checking the evidence.
            </p>
          </article>
          <article>
            <h3>I test the strategy with people</h3>
            <p>
              AI can help me identify risks, questions, and possible approaches, but it does not have the full
              customer or organisational context. I validate important assumptions and strategies with my manager,
              solution consultants, and relevant cross-functional partners before acting.
            </p>
          </article>
          <article>
            <h3>I personalise every customer interaction</h3>
            <p>
              AI may help create an initial email or message, but I review and rewrite it using my own understanding
              of the customer, relationship, and situation. I do not send AI-generated communication without applying
              personal judgement and making it sound like me.
            </p>
          </article>
          <article>
            <h3>I remain accountable for the outcome</h3>
            <p>
              AI supports the process, but the final decision remains mine. I am responsible for what I recommend,
              what I communicate, and what action I take.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
