"use client";

import { KeyboardEvent, useState } from "react";
import type { Experience } from "../data";

type ExperienceKey = "life" | "professional";

type HeadlinePart = {
  text: string;
  color?: string;
};

type Props = {
  content: {
    life: {
      label: string;
      headline: string;
      headlineParts?: HeadlinePart[];
      body: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    professional: {
      label: string;
    };
  };
  experience: Experience[];
};

const tabs: ExperienceKey[] = ["life", "professional"];

export function ExperienceExplorer({ content, experience }: Props) {
  const [active, setActive] = useState<ExperienceKey>("professional");

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
    <section className="experience-explorer section-pad" aria-label="Max Lee's experience">
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
            <h2>
              {content.life.headlineParts?.map((part, index) =>
                part.color ? (
                  <span key={`${part.text}-${index}`} style={{ color: part.color }}>
                    {part.text}
                  </span>
                ) : (
                  part.text
                ),
              ) ?? content.life.headline}
            </h2>
            <p>{content.life.body}</p>
            <div className="life-experience-list">
              {content.life.items.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`}>
                <div>
                  <h3>{item.role}</h3>
                  <p>
                    {item.company} - {item.period}
                  </p>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
