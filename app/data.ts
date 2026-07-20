import siteContent from "../content/site.json";

export type Metric = {
  value: string;
  label: string;
};

export type ToolTag = {
  name: string;
  logo: string;
  scale?: number;
};

export type CaseStudyBlock = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  afterItems?: string[];
};

export type CaseStudySection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  process?: string[];
  blocks?: CaseStudyBlock[];
};

export type Project = {
  slug: string;
  title: string;
  titleLines?: string[];
  year: string;
  kicker: string;
  kickerEmphasis?: string;
  kickerUrl?: string;
  status: string;
  summary: string;
  galleryDescription: string;
  imageUrl?: string;
  description: string[];
  tags: string[];
  metrics: Metric[];
  highlights: string[];
  role: string;
  next?: string;
  accent: string;
  externalLabel?: string;
  externalUrl?: string;
  githubLabel?: string;
  githubUrl?: string;
  caseStudySections?: CaseStudySection[];
};

export type WorkStory = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  summary: string;
  galleryDescription: string;
  details: string[];
  tags: ToolTag[];
  metrics: Metric[];
  highlights: string[];
  accent: string;
  caseStudySections?: CaseStudySection[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const content = siteContent;
export const site = siteContent.site;
export const navigation = siteContent.navigation;
export const home = siteContent.home;
export const pages = siteContent.pages;
export const resumeFacts = siteContent.resumeFacts;
export const projects = siteContent.projects as unknown as Project[];
export const workStories = siteContent.workStories as unknown as WorkStory[];
export const experience = siteContent.experience as unknown as Experience[];
