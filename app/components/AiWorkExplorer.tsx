"use client";

import { useState } from "react";
import type { ToolTag, WorkStory } from "../data";

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

function PipelineToolCard({ tag, children }: { tag?: ToolTag; children: string }) {
  return (
    <article className="pipeline-tool-card" aria-label={tag?.name}>
      <div>
        {tag ? <img src={tag.logo} alt="" aria-hidden="true" style={tag.scale ? { transform: `scale(${tag.scale})` } : undefined} /> : null}
      </div>
      <p>{children}</p>
    </article>
  );
}

function PipelineGenerationWorkflow({ tools }: { tools: ToolTag[] }) {
  const tool = (name: string) => tools.find((item) => item.name === name);

  return (
    <div className="pipeline-workflow">
      <section className="pipeline-phase pipeline-phase--before">
        <div className="pipeline-phase-heading">
          <span>Before AI</span>
        </div>
        <div className="pipeline-before-flow">
          <article className="pipeline-before-card">
            <h3>Account tiering</h3>
            <p>Piece together CRM data, product usage, LinkedIn research, company news, and customer stories to decide where to focus.</p>
          </article>
          <article className="pipeline-before-card">
            <h3>Stakeholder mapping</h3>
            <p>Search LinkedIn and ZoomInfo manually to identify the right people across each account.</p>
          </article>
          <article className="pipeline-before-card">
            <h3>Outreach planning</h3>
            <p>Write every outreach sequence from scratch, with limited time left to tailor the message.</p>
          </article>
        </div>
      </section>

      <section className="pipeline-phase pipeline-phase--after">
        <div className="pipeline-phase-heading">
          <span>After AI</span>
        </div>
        <div className="pipeline-after-flow">
          <div className="pipeline-tool-stack">
            <PipelineToolCard tag={tool("Slackbot")}>Analyses the book of business to understand purchased SKUs, product usage, growth opportunities, existing footprint, and whitespace.</PipelineToolCard>
            <PipelineToolCard tag={tool("Glean")}>Surfaces relevant industry use cases, customer success stories, and ICPs.</PipelineToolCard>
            <PipelineToolCard tag={tool("Gemini")}>Signal detection for organizational changes, financial events, performance indicators, and stakeholder identification.</PipelineToolCard>
          </div>
          <article className="pipeline-after-output" aria-label="Gemini">
            <div>
              {tool("Gemini") ? <img src={tool("Gemini")?.logo} alt="" aria-hidden="true" /> : null}
            </div>
            <p>Creates persona-tailored outreach sequences across email, LinkedIn, and cold calling.</p>
          </article>
        </div>
      </section>
    </div>
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
  const isPipelineGeneration = selected.slug === "ai-research-at-docusign";

  return (
    <div className="ai-workflow-explorer ai-workflow-explorer--expanded">
      <article className="ai-workflow-detail">
        <div className="ai-workflow-detail-topline">
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

        {isPipelineGeneration ? (
          <PipelineGenerationWorkflow tools={selected.tags} />
        ) : (
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
        )}
      </article>

      <aside className="ai-workflow-rail" aria-label="Other AI at Work case studies">
        {otherStories.map((story) => (
          <WorkflowRailCard key={story.slug} story={story} onSelect={() => setSelectedSlug(story.slug)} />
        ))}
      </aside>
    </div>
  );
}
