import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteContent = JSON.parse(
  await readFile(new URL("../content/site.json", import.meta.url), "utf8"),
);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio from the no-code content file", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  for (const line of siteContent.home.hero.headlineLines) {
    assert.match(html, new RegExp(line));
  }
  assert.match(html, new RegExp(siteContent.site.footerText));
  assert.match(html, new RegExp(siteContent.site.socialLinks[0].href));
  assert.match(html, new RegExp(siteContent.site.socialLinks[1].href));
  assert.ok((html.match(/\/max-lee-mark\.png/g) ?? []).length >= 2);
  assert.match(html, /<img class="hero-portrait-primary" src="\/max-lee-portrait\.jpg" alt="Max Lee"\/>/);
  assert.match(html, /<span class="hero-portrait-name" aria-hidden="true">Max Lee<\/span>/);
  assert.doesNotMatch(html, /promoted in 5 years at Docusign/);
  for (const part of siteContent.pages.about.hero.headlineParts) {
    assert.match(html, new RegExp(part.text));
  }
  assert.match(html, new RegExp(siteContent.projects[0].title));
  assert.match(html, new RegExp(siteContent.workStories[0].title));
  assert.match(html, new RegExp(siteContent.experience[0].role));
  assert.doesNotMatch(html, /Ask Max|Ask Max AI/i);
  assert.match(html, /About Me/);
  assert.match(html, /AI at Work/);
  assert.match(html, /Personal Projects/);
});

test("server-renders project detail pages from editable project content", async () => {
  const project = siteContent.projects[0];
  const response = await render(`/projects/${project.slug}`);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, new RegExp(project.title));
  assert.match(html, new RegExp(project.summary));
  assert.match(html, /Overview/);
  assert.match(html, /Why I Built It/);
  assert.match(html, /Outcomes and Learnings/);
  assert.match(html, /How This Project Changed Me/);
  assert.match(html, /Built with/);
  assert.match(html, /Try it out/);
  assert.match(html, /GitHub/);
  assert.match(html, /https:\/\/ai-gtm-learning-lab\.vercel\.app\//);
  assert.match(html, /https:\/\/github\.com\/maxleesianyi\/max-lee-OpenAI-BDR-Interviewer-Buddy/);
  for (const tag of project.tags) {
    assert.match(html, new RegExp(tag));
  }
  assert.match(html, /\/projects\/openai-bdr-interviewer-buddy\.png/);
  assert.doesNotMatch(html, /All Personal Projects/);
  assert.doesNotMatch(html, /Private beta/);
  assert.doesNotMatch(html, /daily questions/);
});

test("server-renders the Bus 15 case study without the legacy side panel", async () => {
  const project = siteContent.projects.find((item) => item.slug === "bus-15-telegram-alert");
  const response = await render(`/projects/${project.slug}`);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Overview/);
  assert.match(html, /Why I Built It/);
  assert.match(html, /Outcomes and Learnings/);
  assert.match(html, /How This Project Changed Me/);
  assert.match(html, /Codex/);
  assert.match(html, /GPT-5\.5/);
  assert.match(html, /\/projects\/bus-15-telegram-alert\.png/);
  assert.doesNotMatch(html, /<span class="eyebrow">Highlights<\/span>/);
});

test("server-renders the Do Already? case study without the legacy side panel", async () => {
  const project = siteContent.projects.find((item) => item.slug === "do-already");
  const response = await render(`/projects/${project.slug}`);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Do Already\?/);
  assert.match(html, /Overview/);
  assert.match(html, /Why I Built It/);
  assert.match(html, /Outcomes and Learnings/);
  assert.match(html, /How This Project Changed Me/);
  assert.match(html, /GPT-5\.6 Luna/);
  assert.match(html, /Happy Wife, Happy Life/);
  assert.doesNotMatch(html, /<span class="eyebrow">Highlights<\/span>/);
});

test("features the linked OpenAI Build Week credential for Do Already?", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Submitted to OpenAI Build Week/);
  assert.doesNotMatch(html, /Built for OpenAI Build Week/);
  assert.match(html, /OpenAI Build Week/);
  assert.match(html, /\/projects\/do-already\.png/);
  assert.match(html, /project-image-frame project-image-frame--do-already/);
  assert.match(
    html,
    /An accountability assistant that turns The Wife&#x27;s instructions on Telegram into actionable tasks, while keeping it playful with a reward system\./,
  );
  assert.match(html, /https:\/\/devpost\.com\/software\/placeholder-for-now-th2j86/);
});

test("server-renders the Daily AI Newsletter case study without the legacy side panel", async () => {
  const project = siteContent.projects.find((item) => item.slug === "daily-ai-newsletter");
  const response = await render(`/projects/${project.slug}`);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Overview/);
  assert.match(html, /Why I Built It/);
  assert.match(html, /Outcomes and Learnings/);
  assert.match(html, /How This Project Changed Me/);
  assert.match(html, /ChatGPT Tasks/);
  assert.match(html, /\/projects\/daily-ai-newsletter\.png/);
  assert.doesNotMatch(html, /<span class="eyebrow">Highlights<\/span>/);
  assert.doesNotMatch(html, /<li>OpenAI<\/li>/);
});

test("server-renders the about page from editable content", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);

  const html = await response.text();
  for (const part of siteContent.pages.about.hero.headlineParts) {
    assert.match(html, new RegExp(part.text));
  }
  assert.match(html, new RegExp(siteContent.pages.about.facts[0].value));
  assert.match(html, /Tools I reach for/);
});

test("keeps no-code content structurally complete", async () => {
  const slugs = new Set(siteContent.projects.map((project) => project.slug));

  assert.equal(slugs.size, siteContent.projects.length);
  assert.ok(siteContent.projects.length >= 1);
  assert.ok(siteContent.workStories.length >= 1);
  assert.ok(siteContent.experience.length >= 1);
  assert.ok(siteContent.navigation.every((item) => item.label && item.href));
  assert.ok(siteContent.navigation.some((item) => item.href === "/about"));
  assert.ok(siteContent.site.socialLinks.every((item) => item.label && item.href && item.icon));
  assert.ok(siteContent.projects.every((project) => project.title && project.summary));
  assert.ok(siteContent.projects.every((project) => project.description.length >= 1));
  assert.deepEqual(
    siteContent.projects.slice(0, 3).map((project) => project.slug),
    ["openai-bdr-interviewer-buddy", "do-already", "bus-15-telegram-alert"],
  );
  assert.equal(siteContent.projects.length, 4);
  assert.ok(!siteContent.projects.some((project) => project.slug === "crib-stock-taker"));
  assert.ok(!siteContent.projects.some((project) => project.slug === "max-lee-ai-portfolio"));
});

test("keeps the four AI-at-work categories available", () => {
  assert.deepEqual(
    siteContent.workStories.map((story) => story.title),
    [
      "Pipeline Generation",
      "Opportunity Management",
      "Leadership Alignment",
      "Operational Readiness",
    ],
  );
  assert.ok(
    siteContent.workStories
      .flatMap((story) => story.tags)
      .filter((tag) => tag.name === "Gong")
      .every((tag) => tag.scale === 1.65),
  );
});

test("renders the in-place case study explorer and placeholder pages for every AI-at-work category", async () => {
  const indexResponse = await render("/ai-at-work");
  assert.equal(indexResponse.status, 200);

  const indexHtml = await indexResponse.text();
  for (const story of siteContent.workStories) {
    assert.match(indexHtml, new RegExp(`Learn more`));
    assert.match(indexHtml, new RegExp(`Open ${story.title.replace("&", "&amp;")} case study`));

    const caseStudyResponse = await render(`/ai-at-work/${story.slug}`);
    assert.equal(caseStudyResponse.status, 200);

    const caseStudyHtml = await caseStudyResponse.text();
    assert.match(caseStudyHtml, /A fuller walkthrough is coming soon\./);
  }
});
