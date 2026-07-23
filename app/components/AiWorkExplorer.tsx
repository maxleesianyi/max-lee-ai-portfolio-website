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
        <span className="ai-workflow-card-label">Learn more</span>
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

type Transformation = {
  before: Array<{ title: string; copy: string }>;
  inputs: Array<{ tool: string; copy: string }>;
  output: { tool: string; copy: string };
  afterStages?: Array<{ title: string; tools: string[]; copy: string }>;
  beforeLayout?: "leadership-branch";
  afterLeadership?: {
    accountContext: { tools: string[]; copy: string };
    briefingPrep: { tools: string[]; copy: string };
  };
};

const transformations: Record<string, Transformation> = {
  "ai-research-at-docusign": {
    before: [
      { title: "Account tiering", copy: "Piece together CRM data, product usage, and internal customer stories to decide where to focus." },
      { title: "Account research", copy: "Go through company news, reports and LinkedIn research." },
      { title: "Stakeholder mapping", copy: "Search LinkedIn and ZoomInfo manually to identify the right people across each account." },
      { title: "Outreach planning", copy: "Write every outreach sequence from scratch, manually personalise it based on prospect profile." },
    ],
    inputs: [
      { tool: "Slackbot", copy: "Analyses the book of business to understand purchased SKUs, product usage, growth opportunities, existing footprint, and whitespace." },
      { tool: "Glean", copy: "Surfaces relevant industry use cases, customer success stories, and ICPs." },
      { tool: "Gemini", copy: "Signal detection for organizational changes, financial events, performance indicators, and stakeholder identification." },
    ],
    output: { tool: "Gemini", copy: "Creates persona-tailored outreach sequences across email, LinkedIn, and cold calling." },
  },
  "ai-product-launch-selling": {
    before: [
      { title: "Meeting Prep", copy: "Pull together discovery notes, customer conversations, product context, and account history." },
      { title: "Customer Meeting", copy: "Manually take down meeting notes and outstanding questions." },
      { title: "Meeting Followup", copy: "Tidy up meeting notes and format next steps." },
      { title: "Updating CRM", copy: "Copy and paste meeting notes, then update MEDDPICC." },
    ],
    afterStages: [
      { title: "Meeting Prep", tools: ["Gong", "Slackbot"], copy: "Surfaces the deal context and internal updates needed to prepare." },
      { title: "Customer Meeting", tools: ["Gong"], copy: "Captures meeting notes and outstanding questions." },
      { title: "Meeting Followup", tools: ["Gong", "Glean", "Gemini"], copy: "Drafts next steps, checks open questions, and prepares the follow-up email." },
      { title: "Updating CRM", tools: ["Gong"], copy: "Automatically updates MEDDPICC and Deal Stage in Salesforce." },
    ],
    inputs: [
      { tool: "Gong", copy: "Summarises customer conversations, decision criteria, commitments, and deal risks." },
      { tool: "Glean", copy: "Surfaces internal product guidance, sales assets, and comparable customer stories." },
      { tool: "Gemini", copy: "Turns discovery into a structured opportunity strategy and clear next steps." },
    ],
    output: { tool: "Gemini", copy: "Creates a focused deal narrative and mutual action plan for the right stakeholders." },
  },
  "leadership-alignment": {
    before: [
      { title: "Account Context", copy: "Collect updates from CRM and cross functional teammates." },
      { title: "Briefing Prep", copy: "Turn fragmented account updates into a concise point of view for senior leaders." },
      { title: "Internal Alignment", copy: "Coordinate action owners and brief leadership team." },
      { title: "External Alignment", copy: "Align customer Champion on narrative, priorities and next steps." },
      { title: "Executive Meeting", copy: "Bring the aligned context into a clear executive conversation." },
    ],
    beforeLayout: "leadership-branch",
    afterLeadership: {
      accountContext: { tools: ["Gong", "Slackbot"], copy: "Automatically retrieves account information from CRM and cross-functional team meetings." },
      briefingPrep: { tools: ["Gemini"], copy: "Instantly structures account information into a standardised template for executive leadership." },
    },
    inputs: [
      { tool: "Gong", copy: "Surfaces customer language, decision criteria, objections, and moments that matter." },
      { tool: "Gemini", copy: "Synthesises deal context into a clear, executive-level business narrative." },
      { tool: "Slackbot", copy: "Keeps internal stakeholders aligned on actions, owners, and key changes." },
    ],
    output: { tool: "Gemini", copy: "Creates concise, decision-ready executive briefings for complex opportunities." },
  },
  "internal-intelligence-compliance": {
    before: [
      { title: "Policy lookup", copy: "Search across approved sources to understand the right guidance and boundaries for each workflow." },
      { title: "Context gathering", copy: "Manually bring together current documentation, internal expertise, and account context." },
      { title: "Compliance checks", copy: "Review access boundaries and data-governance requirements before sharing an output." },
    ],
    inputs: [
      { tool: "Glean", copy: "Retrieves approved internal knowledge, policies, and relevant documentation." },
      { tool: "Gemini", copy: "Synthesises the approved context into practical, role-specific guidance." },
      { tool: "Glean", copy: "Keeps answers grounded in the latest accessible internal sources." },
    ],
    output: { tool: "Gemini", copy: "Creates useful, governed briefs while keeping access and data boundaries explicit." },
  },
};

function LeadershipBeforeFlow({ items }: { items: Transformation["before"] }) {
  const [accountContext, briefingPrep, internalAlignment, externalAlignment, executiveMeeting] = items;

  return (
    <div className="leadership-before-flow">
      <article className="pipeline-before-card leadership-before-card leadership-before-card--context">
        <h3>{accountContext.title}</h3>
        <p>{accountContext.copy}</p>
      </article>
      <article className="pipeline-before-card leadership-before-card leadership-before-card--briefing">
        <h3>{briefingPrep.title}</h3>
        <p>{briefingPrep.copy}</p>
      </article>
      <div className="leadership-before-branch" aria-label="Parallel internal and external alignment">
        <article className="pipeline-before-card leadership-before-card leadership-branch-card leadership-branch-card--internal">
          <h3>{internalAlignment.title}</h3>
          <p>{internalAlignment.copy}</p>
        </article>
        <article className="pipeline-before-card leadership-before-card leadership-branch-card leadership-branch-card--external">
          <h3>{externalAlignment.title}</h3>
          <p>{externalAlignment.copy}</p>
        </article>
      </div>
      <article className="pipeline-before-card leadership-before-card leadership-before-card--meeting">
        <h3>{executiveMeeting.title}</h3>
        <p>{executiveMeeting.copy}</p>
      </article>
    </div>
  );
}

function LeadershipAfterFlow({
  items,
  automation,
  findTool,
}: {
  items: Transformation["before"];
  automation: NonNullable<Transformation["afterLeadership"]>;
  findTool: (name: string) => ToolTag | undefined;
}) {
  const [accountContext, briefingPrep, internalAlignment, externalAlignment, executiveMeeting] = items;

  const icons = (names: string[]) => (
    <ul className="pipeline-stage-tools" aria-label="AI tools used">
      {names.map((name) => {
        const item = findTool(name);
        return item ? (
          <li key={name} title={item.name}>
            <img src={item.logo} alt="" aria-hidden="true" style={item.scale ? { transform: `scale(${item.scale})` } : undefined} />
            <span>{item.name}</span>
          </li>
        ) : null;
      })}
    </ul>
  );

  return (
    <div className="leadership-before-flow leadership-after-flow--branch">
      <article className="pipeline-before-card pipeline-after-stage leadership-before-card leadership-before-card--context leadership-after-card leadership-after-card--automated">
        <h3>{accountContext.title}</h3>
        {icons(automation.accountContext.tools)}
        <p>{automation.accountContext.copy}</p>
      </article>
      <article className="pipeline-before-card pipeline-after-stage leadership-before-card leadership-before-card--briefing leadership-after-card leadership-after-card--automated">
        <h3>{briefingPrep.title}</h3>
        {icons(automation.briefingPrep.tools)}
        <p>{automation.briefingPrep.copy}</p>
      </article>
      <div className="leadership-before-branch" aria-label="Parallel internal and external alignment">
        <article className="pipeline-before-card leadership-before-card leadership-branch-card leadership-branch-card--internal leadership-after-card">
          <h3>{internalAlignment.title}</h3>
          <p>{internalAlignment.copy}</p>
        </article>
        <article className="pipeline-before-card leadership-before-card leadership-branch-card leadership-branch-card--external leadership-after-card">
          <h3>{externalAlignment.title}</h3>
          <p>{externalAlignment.copy}</p>
        </article>
      </div>
      <article className="pipeline-before-card leadership-before-card leadership-before-card--meeting leadership-after-card">
        <h3>{executiveMeeting.title}</h3>
        <p>{executiveMeeting.copy}</p>
      </article>
    </div>
  );
}

function WorkflowTransformation({ story }: { story: WorkStory }) {
  const transformation = transformations[story.slug];
  const tools = story.tags;
  const tool = (name: string) => tools.find((item) => item.name === name);

  return (
    <div
      className={`pipeline-workflow${story.slug === "ai-research-at-docusign" ? " pipeline-workflow--pipeline-generation" : ""}${story.slug === "ai-product-launch-selling" ? " pipeline-workflow--opportunity-management" : ""}`}
    >
      <section className="pipeline-phase pipeline-phase--before">
        <div className="pipeline-phase-heading">
          <span>Before AI</span>
        </div>
        {transformation.beforeLayout === "leadership-branch" ? (
          <LeadershipBeforeFlow items={transformation.before} />
        ) : (
          <div className="pipeline-before-flow">
            {transformation.before.map((item) => (
              <article className="pipeline-before-card" key={item.title}>
                <h3>{item.title}</h3>
                {item.copy ? <p>{item.copy}</p> : null}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="pipeline-phase pipeline-phase--after">
        <div className="pipeline-phase-heading">
          <span>After AI</span>
        </div>
        {transformation.afterLeadership ? (
          <LeadershipAfterFlow items={transformation.before} automation={transformation.afterLeadership} findTool={tool} />
        ) : transformation.afterStages ? (
          <div className="pipeline-stage-flow">
            {transformation.afterStages.map((stage) => (
              <article className="pipeline-after-stage" key={stage.title}>
                <h3>{stage.title}</h3>
                <ul className="pipeline-stage-tools" aria-label={`Tools used for ${stage.title}`}>
                  {stage.tools.map((name) => {
                    const stageTool = tool(name);
                    return stageTool ? (
                      <li key={name} title={stageTool.name}>
                        <img src={stageTool.logo} alt="" aria-hidden="true" style={stageTool.scale ? { transform: `scale(${stageTool.scale})` } : undefined} />
                        <span>{stageTool.name}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
                <p>{stage.copy}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="pipeline-after-flow">
            <div className="pipeline-tool-stack">
              {transformation.inputs.map((input, index) => (
                <PipelineToolCard key={`${input.tool}-${index}`} tag={tool(input.tool)}>{input.copy}</PipelineToolCard>
              ))}
            </div>
            <article className="pipeline-after-output" aria-label={transformation.output.tool}>
              <div>
                {tool(transformation.output.tool) ? <img src={tool(transformation.output.tool)?.logo} alt="" aria-hidden="true" /> : null}
              </div>
              <p>{transformation.output.copy}</p>
            </article>
          </div>
        )}
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
        {selected.summary ? <p className="ai-workflow-detail-lede">{selected.summary}</p> : null}
        <ToolTags tags={selected.tags} />

        <div className="ai-workflow-metrics">
          {selected.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        <WorkflowTransformation story={selected} />
      </article>

      <aside className="ai-workflow-rail" aria-label="Other AI at Work case studies">
        {otherStories.map((story) => (
          <WorkflowRailCard key={story.slug} story={story} onSelect={() => setSelectedSlug(story.slug)} />
        ))}
      </aside>
    </div>
  );
}
