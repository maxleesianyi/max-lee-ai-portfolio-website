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
  assert.match(html, new RegExp(project.highlights[0]));
  assert.match(html, /All Personal Projects/);
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
});

test("keeps the four AI-at-work categories available", () => {
  assert.deepEqual(
    siteContent.workStories.map((story) => story.title),
    [
      "Pipeline Generation",
      "Opportunity Management",
      "Leadership Alignment",
      "Internal Intelligence & Compliance",
    ],
  );
});

test("renders a case study CTA and placeholder page for every AI-at-work category", async () => {
  const indexResponse = await render("/ai-at-work");
  assert.equal(indexResponse.status, 200);

  const indexHtml = await indexResponse.text();
  for (const story of siteContent.workStories) {
    assert.match(indexHtml, new RegExp(`Case Study`));
    assert.match(indexHtml, new RegExp(`/ai-at-work/${story.slug}`));

    const caseStudyResponse = await render(`/ai-at-work/${story.slug}`);
    assert.equal(caseStudyResponse.status, 200);

    const caseStudyHtml = await caseStudyResponse.text();
    assert.match(caseStudyHtml, /Placeholder case study/);
    assert.match(caseStudyHtml, /A fuller walkthrough is coming soon\./);
  }
});
