"use client";

import { useState } from "react";
import type { WorkStory } from "../data";

function ToolTags({ tags }: { tags: WorkStory["tags"] }) {
  return (
    <ul className="tag-list tool-tag-list">
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

function WorkflowCard({ story, onSelect }: { story: WorkStory; onSelect: () => void }) {
  return (
    <article className="ai-workflow-card">
      <button type="button" onClick={onSelect} aria-label={`Open ${story.title} case study`}>
        <span className="ai-workflow-card-title" role="heading" aria-level={2}>
          {story.title}
        </span>
        <span className="ai-workflow-card-description">{story.galleryDescription}</span>
        <ToolTags tags={story.tags} />
        <span className="ai-workflow-card-label">Case Study</span>
      </button>
    </article>
  );
}

function WorkflowRailCard({ story, onSelect }: { story: WorkStory; onSelect: () => void }) {
  return (
    <button type="button" className="ai-workflow-rail-card" onClick={onSelect}>
      <span>{story.title}</span>
      <small>{story.galleryDescription}</small>
    </button>
  );
}

export function AiWorkExplorer({ stories }: { stories: WorkStory[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = stories.find((story) => story.slug === selectedSlug);

  if (!selected) {
    return (
      <div className="ai-workflow-grid">
        {stories.map((story) => (
          <WorkflowCard key={story.slug} story={story} onSelect={() => setSelectedSlug(story.slug)} />
        ))}
      </div>
    );
  }

  const otherStories = stories.filter((story) => story.slug !== selected.slug);

  return (
    <div className="ai-workflow-explorer ai-workflow-explorer--expanded">
      <article className="ai-workflow-detail">
        <div className="ai-workflow-detail-topline">
          <span className="eyebrow">AI at Work</span>
          <button
            type="button"
            className="ai-workflow-close"
            onClick={() => setSelectedSlug(null)}
            aria-label="Close expanded case study"
            title="Close"
          >
            &times;
          </button>
        </div>
        <h2>{selected.title}</h2>
        <p className="ai-workflow-detail-lede">{selected.summary}</p>
        <ToolTags tags={selected.tags} />

        <div className="ai-workflow-metrics">
          {selected.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="ai-workflow-detail-copy">
          <section>
            <h3>Overview</h3>
            {selected.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section>
            <h3>Highlights</h3>
            <ul>
              {selected.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <aside className="ai-workflow-rail" aria-label="Other AI at Work case studies">
        {otherStories.map((story) => (
          <WorkflowRailCard key={story.slug} story={story} onSelect={() => setSelectedSlug(story.slug)} />
        ))}
      </aside>
    </div>
  );
}
