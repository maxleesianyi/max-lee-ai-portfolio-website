import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CaseStudySections,
  MetricRail,
  PageShell,
  ToolTagList,
  WorkVisual,
} from "../../components/PortfolioBlocks";
import { site, workStories } from "../../data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return workStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const story = workStories.find((item) => item.slug === slug);

  if (!story) {
    return {};
  }

  return {
    title: `${story.title} - ${site.brandName}`,
    description: story.summary,
  };
}

export default async function WorkStoryCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const story = workStories.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  const nextStory =
    workStories.find((item) => item.slug !== story.slug) ??
    workStories[0];

  return (
    <PageShell>
      <article className="case-study section-pad">
        <h1>{story.title}</h1>
        <p className="case-lede">{story.summary}</p>
        <MetricRail metrics={story.metrics} />
        <div className="case-visual">
          <WorkVisual story={story} />
        </div>

        {story.caseStudySections ? (
          <CaseStudySections sections={story.caseStudySections} />
        ) : (
          <div className="case-body">
            <div className="case-narrative">
              {story.details.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside className="case-aside">
              <span className="eyebrow">Highlights</span>
              <ul>
                {story.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <span className="eyebrow built-with">AI solutions used</span>
              <ToolTagList tags={story.tags} solid />
              <p className="role-note">A fuller walkthrough is coming soon.</p>
            </aside>
          </div>
        )}
      </article>
      {nextStory ? (
        <section className="next-project section-pad">
          <Link href={`/ai-at-work/${nextStory.slug}`}>
            <span>Next AI-at-work case study</span>
            <strong>{nextStory.title}</strong>
          </Link>
        </section>
      ) : null}
    </PageShell>
  );
}
