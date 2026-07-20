# Max Lee AI Sales Portfolio

Personal portfolio website for Max Lee Sian Yi, an Account Executive in Singapore using AI to sharpen enterprise sales workflows and build practical tools after hours.

This repository currently contains the Sites-generated source for the portfolio. The site content is designed to be editable from one no-code content file.

## What This Portfolio Showcases

- AI-at-work stories tied to sales outcomes
- Practical AI and workflow projects
- Docusign sales experience and commercial milestones
- A recruiter- and buyer-friendly narrative around AI GTM fluency

## Featured Content

### AI at Work

- AI-assisted account research using Gemini and Glean
- Selling new AI product lines before mature playbooks existed
- Building with Codex to turn product ideas into working apps

### Projects

- OpenAI BDR Interviewer Buddy
- Do Already?

## Editing Content

Most portfolio text lives in:

```text
content/site.json
```

Edit this file to update:

- Homepage hero copy
- Proof points and metrics
- AI at Work stories
- Project case studies
- Experience entries
- Footer text and email address

See [content/README.md](content/README.md) for non-technical editing guidance.

## Local Development

```bash
pnpm install
pnpm dev
```

## Validation

```bash
pnpm test
```

The test suite checks that the site renders from the editable content file and that project detail pages work.

## Deployment

This project is configured for OpenAI Sites via:

```text
.openai/hosting.json
```

The Sites-generated files can be published through Sites first, then mirrored to GitHub for portfolio history and release tracking.

## Release Notes

See [RELEASE_NOTES.md](RELEASE_NOTES.md).
