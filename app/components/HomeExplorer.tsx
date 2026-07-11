"use client";

import Link from "next/link";
import { KeyboardEvent, useState } from "react";
import type { Project, WorkStory } from "../data";

type ExplorerKey = "about" | "aiAtWork" | "projects";

type HeadlinePart = {
  text: string;
  color?: string;
};

type ExplorerCopy = {
  label: string;
  linkLabel: string;
  title?: {
    prefix: string;
    accent: string;
    suffix: string;
  };
};

type About = {
  hero: {
    headline: string;
    body: string;
    headlineParts?: HeadlinePart[];
  };
  paragraphs: string[];
};

type Props = {
  about: About;
  aiAtWork: {
    hero: {
      headline: string;
      body: string;
    };
  };
  personalProjects: {
    hero: {
      headline: string;
      body: string;
    };
  };
  explorer: Record<ExplorerKey, ExplorerCopy>;
  workStories: WorkStory[];
  projects: Project[];
};

const tabs: ExplorerKey[] = ["aiAtWork", "projects", "about"];

function ExplorerHeading({
  title,
  fallback,
  parts,
}: {
  title?: ExplorerCopy["title"];
  fallback: string;
  parts?: HeadlinePart[];
}) {
  if (parts && parts.length > 0) {
    return (
      <h2>
        {parts.map((part, index) =>
          part.color ? (
            <span key={`${part.text}-${index}`} style={{ color: part.color }}>
              {part.text}
            </span>
          ) : (
            part.text
          ),
        )}
      </h2>
    );
  }

  if (!title) {
    return <h2>{fallback}</h2>;
  }

  return (
    <h2>
      {title.prefix}
      <span>{title.accent}</span>
      {title.suffix}
    </h2>
  );
}

export function HomeExplorer({
  about,
  aiAtWork,
  personalProjects,
  explorer,
  workStories,
  projects,
}: Props) {
  const [active, setActive] = useState<ExplorerKey>("about");

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, tab: ExplorerKey) {
    const currentIndex = tabs.indexOf(tab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== currentIndex || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      setActive(nextTab);
      document.getElementById(`explorer-tab-${nextTab}`)?.focus();
    }
  }

  return (
    <section className="home-explorer section-pad" aria-label="Explore Max Lee's work">
      <div className="explorer-tabs" role="tablist" aria-label="Portfolio sections">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`explorer-tab-${tab}`}
            className="explorer-tab"
            type="button"
            role="tab"
            aria-selected={active === tab}
            aria-controls={`explorer-panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => setActive(tab)}
            onKeyDown={(event) => handleTabKeyDown(event, tab)}
          >
            {explorer[tab].label}
          </button>
        ))}
      </div>

      <div
        key={active}
        id={`explorer-panel-${active}`}
        className="explorer-panel"
        role="tabpanel"
        aria-labelledby={`explorer-tab-${active}`}
        tabIndex={0}
      >
        {active === "about" ? (
          <div className="explorer-about">
            <div className="explorer-copy">
              <ExplorerHeading
                title={explorer.about.title}
                fallback={about.hero.headline}
                parts={about.hero.headlineParts}
              />
              <p className="explorer-intro">{about.hero.body}</p>
              <p className="explorer-detail">{about.paragraphs[0]}</p>
              <Link className="text-link" href="/about">
                {explorer.about.linkLabel}
              </Link>
            </div>
          </div>
        ) : null}

        {active === "aiAtWork" ? (
          <div className="explorer-copy">
            <ExplorerHeading title={explorer.aiAtWork.title} fallback={aiAtWork.hero.headline} />
            <p className="explorer-intro">{aiAtWork.hero.body}</p>
            <div className="explorer-list">
              {workStories.slice(0, 2).map((story, index) => (
                <article key={story.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{story.title}</h3>
                    <p>{story.summary}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link className="text-link" href="/ai-at-work">
              {explorer.aiAtWork.linkLabel}
            </Link>
          </div>
        ) : null}

        {active === "projects" ? (
          <div className="explorer-copy">
            <ExplorerHeading
              title={explorer.projects.title}
              fallback={personalProjects.hero.headline}
            />
            <p className="explorer-intro">{personalProjects.hero.body}</p>
            <div className="explorer-list">
              {projects.slice(0, 2).map((project, index) => (
                <article key={project.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link className="text-link" href="/projects">
              {explorer.projects.linkLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
