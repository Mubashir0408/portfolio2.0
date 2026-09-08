/**
 * ============================================================================
 *  SITE CONFIG — edit this file to make the portfolio yours.
 * ============================================================================
 *
 *  This is the ONLY file you should need to touch to update:
 *    - your name, title, bio, location, contact info
 *    - your social links (GitHub, LinkedIn, email)
 *    - your skills, timeline, and stats
 *    - your projects (title, description, tech stack, links, images)
 *    - your blog posts
 *
 *  Everything else in the codebase (components, pages) reads from here —
 *  you don't need to touch any .tsx files to update your content.
 *
 *  Images referenced below live in /public/images. Replace those image
 *  files with your own photos/screenshots (keep the same filenames, or
 *  update the paths here to match new filenames).
 * ============================================================================
 */

import type {
  BlogPost,
  Project,
  SkillCategory,
  TimelineItem,
} from "@/types/project";

/* ----------------------------------------------------------------------- */
/*  1. PERSONAL INFO                                                        */
/*     Shown in the hero, navbar, footer, SEO tags, and resume page.        */
/* ----------------------------------------------------------------------- */
export const PERSONAL_INFO = {
  name: "Mubashir Ijaz",
  title: "Full Stack Developer",
  subtitle:
    "Building modern, scalable web applications with React, Next.js, TypeScript and modern backend technologies.",
  description:
    "Portfolio of Mubashir Ijaz, a Full Stack Developer based in Lahore, Pakistan, specializing in React, Next.js, TypeScript, and Node.js.",
  location: "Lahore, Pakistan",
  currently: "Computer Science Student",
  status: "Open to Internship and Freelance Opportunities",

  // Contact
  email: "mubashirejazkhan@gmail.com",

  // TODO: replace with your real GitHub / LinkedIn usernames (used to build
  // full profile URLs everywhere on the site — navbar, footer, contact page).
  githubUsername: "Mubashir0408",
  linkedinUsername: "mubashir-ijaz-2b03a9319",

  // TODO: replace with your real production domain once deployed (used for
  // SEO metadata, Open Graph tags, and sitemap.xml generation).
  url: "https://mubashirijaz.dev",

  // Open Graph / social share preview image. Put your own image at this
  // path in /public/images (recommended size: 1200x630 or 1200x900).
  ogImage: "/images/hero.png",

  // SEO keywords for the <meta name="keywords"> tag.
  keywords: [
    "Mubashir Ijaz",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer Pakistan",
    "Software Engineer",
  ],
};

/* ----------------------------------------------------------------------- */
/*  2. HERO — animated typing roles under your name                        */
/* ----------------------------------------------------------------------- */
export const TYPING_ROLES = [
  "Full Stack Developer",
  "Backend Developer",
  "React Developer",
];

/* ----------------------------------------------------------------------- */
/*  3. TECH STACK STRIP — the scrolling badge marquee                       */
/*     Must match a key in TECH_ICON_MAP (components/tech-stack.tsx) to     */
/*     show an icon; unknown names fall back to a generic icon.            */
/* ----------------------------------------------------------------------- */
export const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Prisma",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Git",
  "GitHub",
  "Tailwind CSS",
];

/* ----------------------------------------------------------------------- */
/*  4. STATS — the animated counters section                                */
/* ----------------------------------------------------------------------- */
export const STATS = [
  { label: "Years of Experience", value: 2, suffix: "+" },
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Technologies Mastered", value: 12, suffix: "+" },
  { label: "Lines of Code", value: 50, suffix: "K+" },
];

/* ----------------------------------------------------------------------- */
/*  5. TIMELINE — education, experience, and learning milestones            */
/*     type: "education" | "experience" | "learning"                       */
/* ----------------------------------------------------------------------- */
export const TIMELINE: TimelineItem[] = [
  {
    id: "t1",
    type: "education",
    title: "BS Computer Science",
    organization: "University of the Punjab",
    period: "2023 — Present",
    description:
      "Focused on data structures, algorithms, databases, and full stack web development. Actively involved in coding communities and hackathons.",
  },
  {
    id: "t2",
    type: "learning",
    title: "Full Stack Web Development",
    organization: "Self-Taught / Online Courses",
    period: "2022 — 2023",
    description:
      "Learned modern JavaScript, React, Node.js, and database design through structured courses, documentation, and hands-on projects.",
  },
  {
    id: "t3",
    type: "experience",
    title: "Freelance Web Developer",
    organization: "Self-Employed",
    period: "2023 — Present",
    description:
      "Building full stack web applications for clients using React, Next.js, and Node.js, with a focus on performance and clean architecture.",
  },
  {
    id: "t4",
    type: "learning",
    title: "Advanced TypeScript & System Design",
    organization: "Continuous Learning",
    period: "2024 — Present",
    description:
      "Deepening expertise in TypeScript, scalable backend architecture, cloud infrastructure, and DevOps practices.",
  },
];

/* ----------------------------------------------------------------------- */
/*  6. SKILLS — grouped by category, shown with a progress bar              */
/*     icon must match a key in SKILL_ICON_MAP (components/skills.tsx)     */
/*     level: 0-100 (progress bar %), years: years of experience           */
/* ----------------------------------------------------------------------- */
export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "react", level: 92, years: 2 },
      { name: "Next.js", icon: "nextjs", level: 90, years: 2 },
      { name: "TypeScript", icon: "typescript", level: 88, years: 2 },
      { name: "Tailwind CSS", icon: "tailwind", level: 95, years: 2 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "nodejs", level: 87, years: 2 },
      { name: "Express", icon: "express", level: 85, years: 2 },
      { name: "REST APIs", icon: "api", level: 90, years: 2 },
      { name: "GraphQL", icon: "graphql", level: 70, years: 1 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", level: 85, years: 2 },
      { name: "MongoDB", icon: "mongodb", level: 82, years: 2 },
      { name: "Prisma", icon: "prisma", level: 88, years: 2 },
      { name: "Redis", icon: "redis", level: 65, years: 1 },
    ],
  },
  {
    category: "Cloud",
    skills: [
      { name: "Vercel", icon: "vercel", level: 90, years: 2 },
      { name: "AWS", icon: "aws", level: 60, years: 1 },
      { name: "Cloudflare", icon: "cloudflare", level: 65, years: 1 },
      { name: "Supabase", icon: "supabase", level: 80, years: 1 },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", icon: "docker", level: 75, years: 1 },
      { name: "CI/CD", icon: "cicd", level: 70, years: 1 },
      { name: "GitHub Actions", icon: "githubactions", level: 72, years: 1 },
      { name: "Nginx", icon: "nginx", level: 60, years: 1 },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: "git", level: 92, years: 2 },
      { name: "Figma", icon: "figma", level: 78, years: 2 },
      { name: "Postman", icon: "postman", level: 88, years: 2 },
      { name: "VS Code", icon: "vscode", level: 95, years: 2 },
    ],
  },
];

/* ----------------------------------------------------------------------- */
/*  7. PROJECTS — shown on the homepage (featured) and /projects            */
/*     slug: used in the URL /projects/<slug>, must be unique & URL-safe    */
/*     image / gallery: paths into /public/images — replace with your own  */
/*     screenshots. status: "completed" | "in-progress" | "maintained"     */
/* ----------------------------------------------------------------------- */
export const PROJECTS: Project[] = [
  {
    slug: "restaurant-management",
    title: "Restaurant Management System",
    description:
      "A full-featured restaurant management platform with order tracking, table reservations, and real-time kitchen dashboards.",
    longDescription:
      "A comprehensive restaurant management system built to streamline operations for multi-location restaurants. Includes order management, table reservations, real-time kitchen display, inventory tracking, and detailed analytics dashboards for owners and staff.",
    image: "/images/project1.png",
    gallery: [
      { src: "/images/project1.png", alt: "Dashboard overview" },
      { src: "/images/project1-alt.png", alt: "Order management screen" },
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/mubashirijaz/restaurant-management",
    liveUrl: "https://restaurant-demo.mubashirijaz.dev",
    timeline: "Jan 2024 — Mar 2024",
    role: "Full Stack Developer",
    features: [
      { title: "Real-time Order Tracking", description: "Live order status updates across kitchen and front-of-house using WebSockets." },
      { title: "Table Reservation System", description: "Interactive floor plan with drag-and-drop table assignment." },
      { title: "Analytics Dashboard", description: "Revenue, order volume, and peak-hour insights with charts." },
    ],
    architecture:
      "Built with a Next.js App Router frontend and a Node.js/Express backend, using PostgreSQL with Prisma ORM for data persistence. Real-time updates are powered by WebSockets, deployed on Vercel with a managed Postgres instance.",
    challenges:
      "Synchronizing real-time order state across multiple concurrent kitchen displays without race conditions required careful event-driven design and optimistic UI updates.",
    lessonsLearned:
      "Gained deep experience in designing normalized relational schemas and handling real-time concurrency at scale.",
  },
  {
    slug: "ecommerce-store",
    title: "E-commerce Store",
    description:
      "A modern e-commerce storefront with product catalog, cart, secure checkout, and an admin dashboard.",
    longDescription:
      "A production-grade e-commerce platform featuring a dynamic product catalog, persistent shopping cart, Stripe-powered checkout, order history, and an admin panel for managing inventory and orders.",
    image: "/images/project2.png",
    gallery: [
      { src: "/images/project2.png", alt: "Storefront homepage" },
      { src: "/images/project2-alt.png", alt: "Product detail page" },
    ],
    techStack: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/mubashirijaz/ecommerce-store",
    liveUrl: "https://shop-demo.mubashirijaz.dev",
    timeline: "Aug 2023 — Nov 2023",
    role: "Full Stack Developer",
    features: [
      { title: "Secure Checkout", description: "Stripe integration with support for cards, wallets, and receipts." },
      { title: "Product Filtering", description: "Faceted search and filtering with server-side pagination." },
      { title: "Admin Dashboard", description: "Inventory, order, and customer management for store owners." },
    ],
    architecture:
      "A Next.js frontend with server actions communicates with a Node.js/Express API layer backed by MongoDB. Payments are processed through Stripe with webhook-driven order fulfillment.",
    challenges:
      "Handling Stripe webhook idempotency and keeping inventory counts accurate under concurrent checkouts was the trickiest part of the build.",
    lessonsLearned:
      "Learned how to design idempotent payment flows and build resilient webhook handlers for financial data.",
  },
  {
    slug: "ai-chat-app",
    title: "AI Chat Application",
    description:
      "A real-time AI-powered chat application with streaming responses, conversation history, and multi-model support.",
    longDescription:
      "An AI chat application supporting streaming token-by-token responses, persistent conversation history, and the ability to switch between multiple LLM providers, built with a focus on responsiveness and clean UX.",
    image: "/images/project3.png",
    gallery: [
      { src: "/images/project3.png", alt: "Chat interface" },
      { src: "/images/project3-alt.png", alt: "Conversation history sidebar" },
    ],
    techStack: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    status: "maintained",
    featured: true,
    githubUrl: "https://github.com/mubashirijaz/ai-chat-app",
    liveUrl: "https://chat-demo.mubashirijaz.dev",
    timeline: "Feb 2024 — Present",
    role: "Full Stack Developer",
    features: [
      { title: "Streaming Responses", description: "Token-by-token streaming UI using the Vercel AI SDK." },
      { title: "Conversation History", description: "Persistent, searchable chat history stored per user." },
      { title: "Multi-Model Support", description: "Seamless switching between different LLM providers." },
    ],
    architecture:
      "Uses Next.js Route Handlers to stream responses from LLM providers directly to the client via Server-Sent Events, with conversation state persisted in PostgreSQL.",
    challenges:
      "Managing backpressure and cancellation for streaming responses while keeping the UI perfectly in sync required a custom streaming state machine.",
    lessonsLearned:
      "Built strong intuition for streaming architectures and designing responsive, low-latency AI interfaces.",
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description:
      "A personal finance tracker with budgeting tools, category breakdowns, and visual spending analytics.",
    longDescription:
      "A personal finance application that helps users track expenses, set monthly budgets, and visualize spending patterns across categories with interactive charts.",
    image: "/images/project4.png",
    gallery: [{ src: "/images/project4.png", alt: "Expense dashboard" }],
    techStack: ["React", "Node.js", "Express", "PostgreSQL"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/mubashirijaz/expense-tracker",
    liveUrl: "https://expenses-demo.mubashirijaz.dev",
    timeline: "May 2023 — Jul 2023",
    role: "Full Stack Developer",
    features: [
      { title: "Budget Planning", description: "Monthly budget goals with progress tracking per category." },
      { title: "Spending Analytics", description: "Interactive charts for trends and category breakdowns." },
    ],
    architecture:
      "A React SPA communicates with an Express REST API backed by PostgreSQL, with JWT-based authentication.",
    challenges:
      "Designing a flexible category system that supported custom user-defined categories without complicating queries.",
    lessonsLearned:
      "Improved skills in relational data modeling and building data visualization from scratch.",
  },
  {
    slug: "portfolio",
    title: "Developer Portfolio",
    description:
      "A premium, animated personal portfolio built with Next.js, TypeScript, and Framer Motion.",
    longDescription:
      "This very portfolio — a production-grade personal site featuring glassmorphism design, scroll-based animations, and a fully accessible, responsive layout.",
    image: "/images/project5.png",
    gallery: [{ src: "/images/project5.png", alt: "Portfolio homepage" }],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "maintained",
    featured: false,
    githubUrl: "https://github.com/mubashirijaz/portfolio",
    liveUrl: "https://mubashirijaz.dev",
    timeline: "2025 — Present",
    role: "Designer & Developer",
    features: [
      { title: "Award-Level Design", description: "Glassmorphism, gradient borders, and glow effects." },
      { title: "Smooth Animations", description: "Scroll reveals and micro-interactions powered by Framer Motion." },
    ],
    architecture:
      "Built entirely with the Next.js App Router, static generation for content pages, and Tailwind CSS v4 for styling.",
    challenges:
      "Balancing rich animation with strict performance budgets and a 95+ Lighthouse score.",
    lessonsLearned:
      "Refined an eye for premium, restrained motion design and accessible dark-mode-first UI.",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    description:
      "A collaborative task and project management tool with kanban boards, deadlines, and team workspaces.",
    longDescription:
      "A collaborative productivity tool featuring drag-and-drop kanban boards, task assignments, deadline reminders, and shared team workspaces.",
    image: "/images/project6.png",
    gallery: [{ src: "/images/project6.png", alt: "Kanban board view" }],
    techStack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    status: "in-progress",
    featured: false,
    githubUrl: "https://github.com/mubashirijaz/task-manager",
    timeline: "Jun 2025 — Present",
    role: "Full Stack Developer",
    features: [
      { title: "Kanban Boards", description: "Drag-and-drop task columns with real-time sync across teammates." },
      { title: "Team Workspaces", description: "Shared workspaces with role-based permissions." },
    ],
    architecture:
      "Next.js frontend with a MongoDB-backed API layer, using optimistic UI updates for drag-and-drop interactions.",
    challenges:
      "Implementing conflict-free drag-and-drop reordering across multiple simultaneous users.",
    lessonsLearned:
      "Learned to apply CRDT-inspired ordering strategies for collaborative list reordering.",
  },
];

/* ----------------------------------------------------------------------- */
/*  8. BLOG POSTS                                                           */
/* ----------------------------------------------------------------------- */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-scalable-nextjs-apps",
    title: "Building Scalable Next.js Applications in 2026",
    excerpt:
      "A practical guide to structuring large Next.js App Router projects for long-term maintainability and performance.",
    content:
      "Full article content goes here. This post covers folder structure, data fetching patterns, caching strategies, and performance budgets for large-scale Next.js applications.",
    coverImage: "/images/project1.png",
    category: "Next.js",
    tags: ["Next.js", "Architecture", "Performance"],
    publishedAt: "2026-05-12",
    readingTime: 8,
    featured: true,
  },
  {
    slug: "typescript-patterns-that-scale",
    title: "TypeScript Patterns That Actually Scale",
    excerpt:
      "The TypeScript patterns I reach for in every production codebase — from discriminated unions to branded types.",
    content: "Full article content goes here.",
    coverImage: "/images/project2.png",
    category: "TypeScript",
    tags: ["TypeScript", "Best Practices"],
    publishedAt: "2026-03-02",
    readingTime: 6,
    featured: false,
  },
  {
    slug: "designing-rest-apis-with-prisma",
    title: "Designing Clean REST APIs with Prisma and PostgreSQL",
    excerpt:
      "Lessons learned from designing normalized schemas and predictable REST APIs using Prisma ORM.",
    content: "Full article content goes here.",
    coverImage: "/images/project3.png",
    category: "Backend",
    tags: ["Prisma", "PostgreSQL", "API Design"],
    publishedAt: "2025-12-18",
    readingTime: 7,
    featured: false,
  },
  {
    slug: "framer-motion-micro-interactions",
    title: "Crafting Premium Micro-Interactions with Framer Motion",
    excerpt:
      "How to design restrained, purposeful animations that feel premium instead of distracting.",
    content: "Full article content goes here.",
    coverImage: "/images/project4.png",
    category: "Design",
    tags: ["Framer Motion", "Animation", "UI/UX"],
    publishedAt: "2025-10-09",
    readingTime: 5,
    featured: false,
  },
];

export const BLOG_CATEGORIES = ["All", "Next.js", "TypeScript", "Backend", "Design"];

/* ----------------------------------------------------------------------- */
/*  Derived values — built automatically from PERSONAL_INFO above.          */
/*  You shouldn't need to edit anything below this line.                   */
/* ----------------------------------------------------------------------- */
export const SITE_CONFIG = {
  ...PERSONAL_INFO,
};

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: `https://github.com/${PERSONAL_INFO.githubUsername}`,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: `https://linkedin.com/in/${PERSONAL_INFO.linkedinUsername}`,
    icon: "linkedin",
  },
  { label: "Email", href: `mailto:${PERSONAL_INFO.email}`, icon: "mail" },
] as const;
