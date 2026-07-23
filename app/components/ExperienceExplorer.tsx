"use client";

import { CSSProperties, KeyboardEvent, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type ExperienceKey = "life" | "professional";

export type ExperienceExplorerContent = {
  life: {
    label: string;
    items: Array<{
      title: string;
      imageUrl?: string;
      details: string[];
    }>;
  };
  professional: {
    label: string;
    nodeflair: TimelineEntry[];
    docusign: TimelineEntry[];
  };
};

type Props = {
  content: ExperienceExplorerContent;
  nested?: boolean;
};

type TimelineEntry = {
  role: string;
  titleLines?: string[];
  period?: string;
};

const tabs: ExperienceKey[] = ["life", "professional"];

function lifeTransitionName(title: string) {
  return `life-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function CompanyTimeline({
  company,
  entries,
}: {
  company: "nodeflair" | "docusign";
  entries: TimelineEntry[];
}) {
  const isDocusign = company === "docusign";
  const companyName = isDocusign ? "Docusign" : "NodeFlair";

  return (
    <section className={`timeline-company timeline-company--${company}`} aria-label={`${companyName} experience`}>
      <div className="timeline-company-logo">
        <img
          src={isDocusign ? "/docusign-logo.png" : "/nodeflair-logo.png"}
          alt={`${companyName} logo`}
        />
      </div>
      <div className="company-timeline-track">
        {entries.map((entry) => (
          <article className="timeline-role-card" key={entry.role}>
            <h3>
              {entry.titleLines?.map((line) => <span key={line}>{line}</span>) ?? entry.role}
            </h3>
            {entry.period ? <p>{entry.period}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExperienceExplorer({ content, nested = false }: Props) {
  const [active, setActive] = useState<ExperienceKey>("professional");
  const [activeLifeTitle, setActiveLifeTitle] = useState<string | null>(null);
  const activeLifeItem = content.life.items.find((item) => item.title === activeLifeTitle);

  function updateLifeSelection(title: string | null) {
    const viewTransitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (viewTransitionDocument.startViewTransition) {
      viewTransitionDocument.startViewTransition(() => {
        flushSync(() => setActiveLifeTitle(title));
      });
      return;
    }

    setActiveLifeTitle(title);
  }

  useEffect(() => {
    if (!activeLifeTitle) return;

    function resetLifeExperience() {
      updateLifeSelection(null);
    }

    document.addEventListener("click", resetLifeExperience);
    return () => document.removeEventListener("click", resetLifeExperience);
  }, [activeLifeTitle]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, tab: ExperienceKey) {
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
      document.getElementById(`experience-tab-${nextTab}`)?.focus();
    }
  }

  return (
    <section
      className={`experience-explorer${nested ? " experience-explorer--nested" : " section-pad"}`}
      aria-label="Max Lee's experience"
    >
      <div className="experience-tabs" role="tablist" aria-label="Experience sections">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`experience-tab-${tab}`}
            className="experience-tab"
            type="button"
            role="tab"
            aria-selected={active === tab}
            aria-controls={`experience-panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => setActive(tab)}
            onKeyDown={(event) => handleTabKeyDown(event, tab)}
          >
            {content[tab].label}
          </button>
        ))}
      </div>

      <div
        key={active}
        id={`experience-panel-${active}`}
        className="experience-panel"
        role="tabpanel"
        aria-labelledby={`experience-tab-${active}`}
        tabIndex={0}
      >
        {active === "life" ? (
          <div className="life-experience">
            <div className={`life-experience-list${activeLifeItem ? " life-experience-list--condensed" : ""}`}>
              {content.life.items.filter((item) => item.title !== activeLifeTitle).map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="life-experience-tile"
                  onClick={(event) => {
                    event.stopPropagation();
                    updateLifeSelection(item.title);
                  }}
                >
                  <div
                    className={`life-experience-photo${item.imageUrl ? " life-experience-photo--image" : ""}`}
                    aria-hidden="true"
                    style={{ "--life-transition-name": lifeTransitionName(item.title) } as CSSProperties}
                  >
                    {item.imageUrl ? <img src={item.imageUrl} alt="" /> : null}
                  </div>
                  <h3>{item.title}</h3>
                </button>
              ))}
            </div>
            {activeLifeItem ? (
              <article className="life-experience-detail">
                <div
                  className={`life-experience-photo life-experience-detail-photo${activeLifeItem.imageUrl ? " life-experience-photo--image" : ""}`}
                  style={{ "--life-transition-name": lifeTransitionName(activeLifeItem.title) } as CSSProperties}
                >
                  {activeLifeItem.imageUrl ? <img src={activeLifeItem.imageUrl} alt={`${activeLifeItem.title} photo`} /> : null}
                </div>
                <div>
                  <h3>{activeLifeItem.title}</h3>
                  <ul>
                    {activeLifeItem.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>
              </article>
            ) : null}
          </div>
        ) : (
          <div className="professional-timeline" aria-label="Professional timeline">
            <CompanyTimeline company="nodeflair" entries={content.professional.nodeflair} />
            <CompanyTimeline company="docusign" entries={content.professional.docusign} />
          </div>
        )}
      </div>
    </section>
  );
}
