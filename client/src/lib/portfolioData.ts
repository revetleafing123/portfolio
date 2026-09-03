// Split Signal reminder: keep project evidence specific, editorial, and structured around real product outcomes.

export type Project = {
  slug: string;
  number: string;
  eyebrow: string;
  name: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  impact: string;
  stack: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  accent: string;
  highlights: string[];
  architecture: string[];
};

export const projects: Project[] = [
  {
    slug: "nurturley",
    number: "01",
    eyebrow: "FEATURED SYSTEM / SAAS",
    name: "Nurturley",
    title: "The operating layer for teams that have outgrown spreadsheets.",
    summary: "A multi-module SaaS business suite spanning CRM, HR, invoicing, and accounts.",
    description:
      "Nurturely brings customer, people, and finance workflows into one role-aware workspace. I designed the system around modular domains, bulk operations, and the kind of data density an operations team actually needs.",
    role: "Product architecture, backend systems, frontend delivery",
    impact: "50k+ record scale",
    stack: ["Django", "DRF", "React", "PostgreSQL", "Redis", "Celery"],
    image: "/manus-storage/nurturely-project-visual_e8342221.png",
    imageAlt: "Abstracted Nurturely SaaS dashboard with CRM, HR, and invoice panels",
    liveUrl: "https://rishebsuite.netlify.app",
    frontendUrl: "https://github.com/rishebss/suite-frontend",
    backendUrl: "https://github.com/rishebss/suite-backend",
    accent: "cobalt",
    highlights: [
      "Role-based access control across CRM, HR, invoicing, and accounts.",
      "Modular menu and organization assignment patterns for extensible product areas.",
      "Production debugging that included N+1 query optimization and database deployment fixes.",
    ],
    architecture: [
      "React frontend with reusable route-level modules and a shared product navigation system.",
      "Django/DRF backend split into domain applications for authentication, CRM, HR, contacts, calendar, and invoices.",
      "Configurable invoice schemas and templates that allow new business domains without rewriting the core API.",
    ],
  },
  {
    slug: "sneaket",
    number: "02",
    eyebrow: "FEATURED SYSTEM / AI COMMERCE",
    name: "Sneket Store",
    title: "A shopping assistant that understands the next move.",
    summary: "An AI-powered sneaker commerce platform with conversational cart actions and gated checkout.",
    description:
      "Sneaket explores what happens when product discovery, cart management, and an LLM tool-calling agent share the same interface. The result is a storefront that feels expressive on the surface while keeping the action path explicit and controlled.",
    role: "AI product architecture, full-stack implementation",
    impact: "Tool-calling commerce flow",
    stack: ["React", "Django", "LLM tools", "Cloudflare Workers", "React Query"],
    image: "/manus-storage/sneaket-project-visual_7f1ebe17.png",
    imageAlt: "Editorial sneaker commerce visual with subtle assistant interface layers",
    liveUrl: "https://sneaket.vercel.app",
    frontendUrl: "https://github.com/rishebss/sneaket_frontend",
    backendUrl: "https://github.com/rishebss/sneaket_backend",
    accent: "coral",
    highlights: [
      "Conversational assistant that can search products and manage cart actions through tools.",
      "Gated checkout confirmation keeps a high-impact action visible and user-controlled.",
      "Cloudflare Worker proxy layer separates the browser from model-facing credentials and requests.",
    ],
    architecture: [
      "React frontend with server-state handling for product and commerce interactions.",
      "Django services organized around products, orders, users, wallet, and AI modules.",
      "LLM orchestration layer with explicit function boundaries rather than opaque free-form automation.",
    ],
  },
  {
    slug: "fifac",
    number: "03",
    eyebrow: "CLIENT PLATFORM / OPERATIONS",
    name: "FIFAC Studio Admin",
    title: "The calm behind a busy studio.",
    summary: "A studio administration platform for leads, students, attendance, and payments.",
    description:
      "FIFAC turns the operational side of a dance studio into a single working surface. The project combines a React/Express authenticated dashboard with a Django payment service, backed by Firebase for the shared data layer.",
    role: "Client project, dashboard and integration delivery",
    impact: "Multi-service client platform",
    stack: ["React", "Express.js", "Django", "Firebase", "Payments"],
    image: "/manus-storage/fifac-project-visual_73de9f1f.png",
    imageAlt: "Abstracted dance studio operations dashboard with attendance and payment panels",
    liveUrl: "https://fdsadmin.netlify.app",
    accent: "amber",
    highlights: [
      "Lead management and student tracking in an authenticated dashboard.",
      "Attendance workflows designed for day-to-day studio operations.",
      "Payment gateway operations isolated behind a Python/Django service.",
    ],
    architecture: [
      "React and Express.js application for authenticated operational workflows.",
      "Django service for secure payment gateway operations.",
      "Firebase-backed data model shared across the client platform services.",
    ],
  },
];

export const experience = [
  {
    period: "JAN 2026 — JUL 2026",
    role: "AI Full stack Developer",
    company: "Bheemverse Innovations",
    detail:
      "Built WhatsApp RAG agents, an AI voice calling system with tool-calling, live monitoring, and CRM pipelines powered by Redis and Celery.",
  },
  {
    period: "NOV 2024 — DEC 2025",
    role: "Web Developer / IT",
    company: "LifePlannerStudies & Opportunities",
    detail:
      "Delivered and maintained Django, DRF, and React applications end to end, with containerized development through Docker",
  },
  {
    period: "MAR 2024 — OCT 2024",
    role: "Web Developer",
    company: "Explore Wings",
    detail:
      "Contributed across Python/Django, JavaScript, Supabase (BAAS) projects, supporting both frontend and backend feature work.",
  },
  {
    period: "OCT 2023 — JAN 2024",
    role: "Python Full Stack Intern",
    company: "Inmakes Infotech",
    detail:
      "Built foundations in Django, MVT Architecture, and React frontend development to full-stack project and works.",
  },
];

export const skillGroups = [
  { label: "Build", items: ["Python", "JavaScript", "Django", "DRF", "React", "Node.js"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"] },
  { label: "Ship", items: ["AWS", "Docker", "Vercel", "Cloudflare", "Firebase", "Supabase"] },
  { label: "Think", items: ["RAG pipelines", "LLM tool-calling", "Vector stores", "Celery", "n8n", "Zapier"] },
];

export const supportingWork = [
  {
    name: "Task Manager",
    type: "Web + mobile product",
    detail: "Shared API experience across React, Node, Firebase, Expo, and TypeScript.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    link: "https://github.com/rishebss/taskmanager-mobile",
  },
  {
    name: "Field Service",
    type: "Operations backend",
    detail: "Service requests, field workers, tasks, ratings, auth, and security middleware.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    link: "https://github.com/rishebss/factory_management",
  },
  {
    name: "Applied ML",
    type: "Spam email detector",
    detail: "A Django prototype combining a dataset, model workflow, and user-facing detection flow.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    link: "https://github.com/rishebss/spam_email_detector",
  },
];
