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
  assert.match(html, new RegExp(siteContent.home.hero.headline));
  assert.match(html, new RegExp(siteContent.projects[0].title));
  assert.match(html, new RegExp(siteContent.workStories[0].title));
  assert.match(html, new RegExp(siteContent.experience[0].role));
  assert.doesNotMatch(html, /Ask Max|Ask Max AI/i);
});

test("server-renders project detail pages from editable project content", async () => {
  const project = siteContent.projects[0];
  const response = await render(`/projects/${project.slug}`);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, new RegExp(project.title));
  assert.match(html, new RegExp(project.summary));
  assert.match(html, new RegExp(project.highlights[0]));
  assert.match(html, /All projects/);
});

test("keeps no-code content structurally complete", async () => {
  const slugs = new Set(siteContent.projects.map((project) => project.slug));

  assert.equal(slugs.size, siteContent.projects.length);
  assert.ok(siteContent.projects.length >= 1);
  assert.ok(siteContent.workStories.length >= 1);
  assert.ok(siteContent.experience.length >= 1);
  assert.ok(siteContent.navigation.every((item) => item.label && item.href));
  assert.ok(siteContent.projects.every((project) => project.title && project.summary));
  assert.ok(siteContent.projects.every((project) => project.description.length >= 1));
});
