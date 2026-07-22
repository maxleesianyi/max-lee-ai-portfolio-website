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
        <h2>Where human judgement remains</h2>
        <p>
          AI helps gather, structure, and draft information. I remain responsible for verifying account context,
          deciding the commercial strategy, and approving anything used with a customer.
        </p>
        <div className="human-judgement-list">
          <article>
            <h3>Approved tools only</h3>
            <p>Workflows stay within permitted enterprise systems and access controls.</p>
          </article>
          <article>
            <h3>Human review before action</h3>
            <p>AI output is treated as a draft or recommendation, not an autonomous decision.</p>
          </article>
          <article>
            <h3>Anonymised portfolio examples</h3>
            <p>Public demonstrations use fictional or reconstructed data.</p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
