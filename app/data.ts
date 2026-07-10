import siteContent from "../content/site.json";

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  kicker: string;
  status: string;
  summary: string;
  description: string[];
  tags: string[];
  metrics: Metric[];
  highlights: string[];
  role: string;
  next?: string;
  accent: string;
};

export type WorkStory = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  summary: string;
  details: string[];
  tags: string[];
  metrics: Metric[];
  highlights: string[];
  accent: string;
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
