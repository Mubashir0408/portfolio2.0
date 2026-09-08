export type ProjectStatus = "completed" | "in-progress" | "maintained";

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: ProjectGalleryImage[];
  techStack: string[];
  status: ProjectStatus;
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  timeline: string;
  role: string;
  features: ProjectFeature[];
  architecture: string;
  challenges: string;
  lessonsLearned: string;
}

export interface TimelineItem {
  id: string;
  type: "education" | "experience" | "learning";
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  years: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
