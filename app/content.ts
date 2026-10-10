// All site copy lives here. Components read from this file only, so updating
// the portfolio never requires touching layout code.

export const site = {
  url: "https://suraj-world.vercel.app",
  repo: "https://github.com/sm5689/suraj-portfolio",
};

export const profile = {
  name: "Suraj Mishra",
  firstName: "Suraj",
  role: "Software Engineer",
  location: "Boston, MA",
  email: "surajmishragemini@gmail.com",
  photo: "/me.jpg",
  availability: "Open to full-time SWE roles",
  headline: "Software engineer building AI products",
  headlineTrail: "and the systems beneath them.",
  intro:
    "I'm Suraj, a full-stack engineer who most recently shipped RAG and GenAI features across two production SaaS products at Threadwire. I hold an MS in Computer Science from Northeastern and care about measurable performance, honest evaluation, and code that holds up in production.",
  description:
    "Suraj Mishra is a full-stack software engineer in Boston building AI-powered products: RAG systems, LLM pipelines, and real-time data platforms with React, Next.js, Node.js, Python, and PostgreSQL.",
  github: "sm5689",
  links: {
    github: "https://github.com/sm5689",
    linkedin: "https://www.linkedin.com/in/suraj-mishra-a610b620a",
    resume: "/Suraj_Mishra_Resume.pdf",
  },
};

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "80%", label: "faster GenAI slide generation at Threadwire" },
  { value: "200", label: "automated tests behind NarrativeRadar" },
  { value: "3.85", label: "GPA, M.S. Computer Science at Northeastern" },
  { value: "30%", label: "lower API latency at IpserLab" },
];

export type CaseStudy = {
  slug: string;
  title: string;
  kind: "Personal project" | "Professional work";
  org?: string;
  period: string;
  summary: string;
  highlights: string[];
  metrics: Stat[];
  stack: string[];
  pipeline: string[];
  /** GitHub repo name under profile.github, if the code is public. */
  repo?: string;
  live?: string;
  note?: string;
  image?: { src: string; alt: string; width: number; height: number };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "narrative-radar",
    title: "NarrativeRadar",
    kind: "Personal project",
    period: "2026",
    summary:
      "Tracks a stock watchlist across Bluesky, Reddit and Hacker News, clusters the chatter into narratives with citations back to the source posts, and raises live alerts when volume turns abnormal or many accounts start posting the same message.",
    highlights: [
      "Volume detector scores each ticker against its own trailing distribution: the current hour is excluded from its baseline, and flat baselines fall back to Poisson noise.",
      "Coordination detector fingerprints posts with 64-bit SimHash over word trigrams and requires many distinct authors. Thresholds are calibrated against a labelled fixture.",
      "Idempotent ingestion: Postgres unique constraints replace cursor state and in-memory cooldowns, so restarts and double runs never re-fire alerts.",
      "Live dashboard over Server-Sent Events, plus a replay mode that streams a stored 12-hour GME spike through the real pipeline.",
    ],
    metrics: [
      { value: "200", label: "unit + integration tests" },
      { value: "z = 7.83", label: "on the coordinated hour" },
      { value: "1 cmd", label: "docker compose up, no keys" },
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "React", "TypeScript", "Recharts", "SSE", "Docker"],
    pipeline: ["Bluesky · Reddit · HN", "Dedupe + SimHash", "Hourly rollups", "z-score + coordination", "SSE → React dashboard"],
    repo: "NarrativeRadar",
    image: {
      src: "https://raw.githubusercontent.com/sm5689/NarrativeRadar/main/docs/dashboard.png",
      alt: "NarrativeRadar dashboard showing a volume chart with a detected spike, live alerts, and clustered narratives",
      width: 3200,
      height: 1880,
    },
  },
  {
    slug: "threadwire",
    title: "AI manufacturing intelligence platform",
    kind: "Professional work",
    org: "Threadwire",
    period: "Aug 2025 – Sep 2026",
    summary:
      "A cloud-native SaaS platform that gives manufacturers end-to-end traceability across PLM, ERP and MES workflows, with a RAG assistant that answers natural-language questions over distributed operational data.",
    highlights: [
      "Configured and deployed a RAG pipeline with LangChain, OpenAI embeddings and Pinecone for natural-language queries across sales orders, work orders, inventory and risk records.",
      "Implemented a multi-tenant architecture with customer data isolation, JWT / OAuth 2.0 and scope-based API authorization.",
      "Used MongoDB Change Streams for fault-tolerant, real-time sync, and built a D3.js digital-thread graph tracing products, BOMs, work orders and blockers.",
      "Maintained production on AWS EC2 with PM2, monitoring API analytics across SAP, Oracle and Salesforce integrations.",
    ],
    metrics: [
      { value: "3", label: "systems unified: PLM, ERP, MES" },
      { value: "Multi-tenant", label: "isolated per customer" },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "LangChain", "OpenAI", "Pinecone", "D3.js", "AWS EC2"],
    pipeline: ["PLM · ERP · MES", "MongoDB Change Streams", "OpenAI embeddings", "Pinecone vector search", "LangChain RAG → chat"],
    note: "Proprietary. Code is private.",
  },
  {
    slug: "athenabot-slidemaker",
    title: "AthenaBot Slidemaker",
    kind: "Professional work",
    org: "Threadwire",
    period: "Aug 2025 – Sep 2026",
    summary:
      "A GenAI presentation tool built on Next.js and GPT-4 that turns a company brief into an investor-ready deck (market analysis, financial projections, competitive positioning) and exports a pixel-perfect PDF.",
    highlights: [
      "Cut generation time from 4+ minutes to 50 seconds by generating slides concurrently with Promise.all() instead of sequentially.",
      "Added retry logic and rate-limit handling so parallel GPT-4 calls stay fault-tolerant under load.",
      "Built a Puppeteer export pipeline that captures exact slide replicas, including embedded Recharts visualizations.",
      "Persisted decks in MongoDB with Google OAuth and JWT sessions.",
    ],
    metrics: [
      { value: "80%", label: "faster (4+ min → 50 s)" },
      { value: "10+", label: "AI-generated slide types" },
    ],
    stack: ["Next.js", "TypeScript", "OpenAI GPT-4", "Puppeteer", "Recharts", "MongoDB", "AWS"],
    pipeline: ["Company brief", "GPT-4 × 10+ slides, in parallel", "Retry + rate-limit handling", "Puppeteer render", "PDF export"],
    note: "Proprietary. Code is private.",
  },
  {
    slug: "bedtime-story-machine",
    title: "Bedtime Story Machine",
    kind: "Personal project",
    period: "2026",
    summary:
      "A multi-agent storyteller for ages 5–10 that plans, writes, grades and revises its own chapters, then quizzes the child between chapters and rewrites the rest of the story around their answers.",
    highlights: [
      "A crew of specialised agents: safety gate, router, arc planner, storyteller, LLM judge with a rubric, reviser and quizmaster.",
      "Deterministic validators measure reading level and repetition locally, so the cheap checks never cost an API call.",
      "An eval harness batch-measures pass rate and per-dimension quality; every run writes a full JSON audit trail.",
      "An offline mock mode runs the entire pipeline with no API key, so the control flow is testable.",
    ],
    metrics: [
      { value: "1.1–1.7¢", label: "measured cost per story" },
      { value: "Judge → revise", label: "rubric-scored self-correction" },
    ],
    stack: ["Python", "OpenAI API", "Multi-agent", "LLM-as-judge", "Evals"],
    pipeline: ["Safety gate", "Router + arc planner", "Storyteller", "Validators + LLM judge", "Reviser", "Quiz → adapt next chapter"],
    repo: "bedtime-story-machine",
  },
];

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  year?: string;
  /** GitHub repo name under profile.github. Omit for projects without public code. */
  repo?: string;
  live?: string;
  note?: string;
};

// Ordered by how strongly each project represents current work.
export const projects: Project[] = [
  {
    title: "Unofficial Guide",
    summary:
      "RAG Q&A over Northeastern professor reviews. Paragraph-first chunking, local MiniLM embeddings in ChromaDB, and citations attached from chunk metadata rather than left to the LLM.",
    tags: ["Python", "RAG", "ChromaDB", "Embeddings", "Gradio"],
    year: "2026",
    repo: "unofficial-guide",
  },
  {
    title: "Arcade Cabinet Portfolio",
    summary:
      "A retro arcade résumé with a hand-written 3D engine, a merged GitHub + LeetCode heatmap, and an in-browser RAG assistant. Zero dependencies, no build step.",
    tags: ["JavaScript", "Canvas", "3D", "TF-IDF"],
    year: "2026",
    repo: "gamified_portfolio",
  },
  {
    title: "Kanbas LMS",
    summary:
      "A Canvas-inspired learning platform with 40+ reusable React components, Redux state and a GPT-4-powered assistant. Code splitting and lazy loading cut initial load from 3.2 s to 2.7 s; MongoDB models courses, assignments and enrollment.",
    tags: ["React", "Redux", "Node.js", "MongoDB", "GPT-4"],
    year: "2024",
    repo: "CS5610-Web-Development",
  },
  {
    title: "Roommate Peacekeeper",
    summary:
      "A household management app with real-time chore tracking, expense splitting and an algorithmic fairness score. Live sync runs on Supabase Postgres subscriptions; a race condition in auth routing was debugged down to zero session failures. 95+ Lighthouse.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    year: "2026",
    repo: "roommate-peacekeeper-web",
  },
  {
    title: "Image Processing Studio",
    summary:
      "A Photoshop-inspired C++ image editor with 7 algorithms on an MVC architecture, built with 7 design patterns (Command, Strategy, Visitor…) and 90% test coverage in Google Test. Multithreading cut processing from 500 ms to 400 ms per image.",
    tags: ["C++", "Design patterns", "Multithreading", "Google Test"],
    year: "2024",
    note: "Course project · code on request",
  },
  {
    title: "ECOM-VISION",
    summary:
      "A MERN admin dashboard for e-commerce analytics: sales, inventory and customer insights with Nivo charts, Redux Toolkit, and MongoDB aggregation pipelines that made data processing 30% faster.",
    tags: ["React", "Redux Toolkit", "Material UI", "Node.js", "MongoDB"],
    year: "2024",
    repo: "ECOM-VISION",
  },
  {
    title: "Movie Recommendation System",
    summary:
      "Popularity, content-based and user-based collaborative-filtering engines behind a watchlist and tracker UI.",
    tags: ["JavaScript", "Recommender systems", "Collaborative filtering"],
    year: "Undergrad",
    repo: "Movie-recommendation-system-",
  },
  {
    title: "Multiplayer Chess over Sockets",
    summary:
      "Real-time multiplayer chess over sockets, with concurrent games, move validation and low-latency client–server sync.",
    tags: ["Python", "Sockets", "Networking"],
    year: "Undergrad",
    repo: "Chess_Using_Sockets",
  },
  {
    title: "Real-Time Drowsiness Detector",
    summary:
      "A computer-vision system that flags driver drowsiness in real time from facial landmarks, tuned for low-latency inference.",
    tags: ["Python", "Computer vision", "ML"],
    year: "Undergrad",
    repo: "Real-time-Drowsiness-Detector",
  },
  {
    title: "Hospital Management System",
    summary:
      "Patient records, appointments and staff workflows with role-based operations and a consistent relational data model.",
    tags: ["Web", "Databases", "RBAC"],
    year: "Undergrad",
    repo: "Hospital-Mangement-SYSTEM",
  },
  {
    title: "Fantasy League Analyzer & Predictor",
    summary:
      "Processes historical player and match data to surface performance trends and generate predictions for fantasy-league picks.",
    tags: ["Data analysis", "Predictive modeling"],
    year: "Undergrad",
    repo: "F.L.A.P",
  },
];

export type Role = { title: string; period: string; bullets: string[] };

export type Job = {
  company: string;
  location?: string;
  logo?: string;
  roles: Role[];
  stack?: string[];
};

const neuSeal = "https://upload.wikimedia.org/wikipedia/commons/b/bb/NU_RGB_seal_R.png";

export const experience: Job[] = [
  {
    company: "Threadwire",
    location: "Boston, MA",
    roles: [
      {
        title: "Software Engineer",
        period: "Aug 2025 – Sep 2026",
        bullets: [
          "Led full-stack engineering across two production SaaS products: a cloud-native AI manufacturing intelligence platform for PLM, ERP and MES workflows, and AthenaBot Slidemaker, a GenAI presentation tool built on Next.js and GPT-4.",
          "Cut AthenaBot Slidemaker's generation time by 80% (4+ min → 50 s) with parallel GPT-4 calls via Promise.all(), plus retry logic and rate-limit handling.",
          "Configured and deployed a RAG pipeline with LangChain, Pinecone and OpenAI embeddings for natural-language queries across sales orders, work orders, inventory and risk records.",
          "Implemented a multi-tenant SaaS architecture with customer data isolation, JWT / OAuth 2.0 and scope-based API authorization, with MongoDB Change Streams for real-time sync.",
          "Built an interactive D3.js digital-thread graph tracing products, BOMs, work orders and blockers across the production lifecycle.",
          "Maintained production on AWS EC2 with PM2, troubleshooting issues and monitoring API analytics across SAP, Oracle and Salesforce integrations.",
        ],
      },
    ],
    stack: ["React", "Next.js", "Node.js", "MongoDB", "LangChain", "Pinecone", "GPT-4", "D3.js", "AWS"],
  },
  {
    company: "Northeastern University",
    location: "Boston, MA",
    logo: neuSeal,
    roles: [
      {
        title: "Head Teaching Assistant, Web Development (CS5610)",
        period: "May 2025 – Dec 2025",
        bullets: [
          "Led instruction and mentoring for 150+ graduate students in full-stack development with React, Node.js, Express and MongoDB.",
          "Increased student engagement by 30% through structured tutorials, workshops and hands-on labs.",
          "Reviewed 200+ assignments and projects, improving code quality and average performance.",
          "Ran course communication with faculty, cutting unresolved student queries by 40%.",
        ],
      },
      {
        title: "Graduate Teaching Assistant, Web Development (CS5610)",
        period: "Jun 2024 – Dec 2024",
        bullets: [
          "Mentored 60+ students in full-stack development (React, Node.js, Express, MongoDB) through tutorials and workshops.",
          "Reviewed 200+ assignments for debugging practice and maintainability, raising average scores by 15% across 10 weekly office hours.",
          "Managed the course forum (200+ posts per semester), reducing unanswered queries by 40%.",
          "Evaluated projects across the full SDLC with feedback on code quality, design patterns and architecture.",
        ],
      },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    company: "IpserLab",
    location: "Boston, MA",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQGwNqgzEwN2qQ/company-logo_200_200/company-logo_200_200/0/1631322453007?e=2147483647&v=beta&t=36qV_WG_7bTRDS82TbKOf1EjYn7HWVZasn7MuLGIDvM",
    roles: [
      {
        title: "Software Engineer Intern",
        period: "Jan 2025 – Jun 2025",
        bullets: [
          "Developed and deployed a quiz creation platform (React, Java, PostgreSQL) with customizable, multimedia assessments, serving 50+ active users across 3 educational institutions.",
          "Cut API response times by 30% (800 ms → 560 ms) across 200+ daily requests with JDBC connection pooling and query optimization, profiling slow endpoints to remove redundant round-trips.",
          "Restructured the database schema and tuned 12 SQL queries, reducing execution time by 25% across 50+ concurrent sessions.",
          "Built real-time leaderboards and analytics dashboards with Chart.js.",
          "Reached a 95+ Lighthouse score with WCAG-aligned accessibility and cross-platform compatibility.",
        ],
      },
    ],
    stack: ["React", "Java", "PostgreSQL", "Chart.js"],
  },
];

export const earlierExperience: Job[] = [
  {
    company: "HighRadius",
    logo: "https://media.zenfs.com/en/business-wire.com/a71eb02f7d15154ab98ef3a2622dbb55",
    roles: [
      {
        title: "Software / Data Intern",
        period: "Feb 2022 – May 2022",
        bullets: [
          "Analyzed sales and marketing data with SQL, Power BI and Tableau to uncover customer behavior trends.",
          "Built dashboards on tradeshow attendee data that identified high-intent prospects from 100+ leads.",
        ],
      },
    ],
  },
  {
    company: "Internship Studio",
    location: "Remote",
    logo: "https://cit.internshipstudio.com/assets/img/logo.png",
    roles: [
      {
        title: "Web Development Intern",
        period: "Jan 2022 – Mar 2022",
        bullets: [
          "Built and deployed a responsive full-stack e-commerce platform with React, Node.js, Express and MySQL.",
          "Developed 15+ reusable UI components and optimized assets and caching to improve Core Web Vitals.",
        ],
      },
    ],
  },
  {
    company: "Schaeffler India",
    location: "India",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6cBYHZ0wDOpbRR1vK-0mzs_YEsI_IKxGteA&s",
    roles: [
      {
        title: "IT Intern",
        period: "Dec 2021 – Jan 2022",
        bullets: ["Worked with enterprise IT infrastructure, including server management and internal networking systems."],
      },
    ],
  },
];

export type School = {
  school: string;
  degree: string;
  location: string;
  period: string;
  logo?: string;
  gpa?: string;
  coursework: string;
};

export const education: School[] = [
  {
    school: "Northeastern University",
    degree: "M.S. Computer Science",
    location: "Boston, MA",
    period: "Sep 2023 – Dec 2025",
    logo: neuSeal,
    gpa: "3.85 / 4.00",
    coursework: "Web Development, Program Design Paradigms, Natural Language Processing",
  },
  {
    school: "SRM Institute of Science and Technology",
    degree: "B.Tech. Computer Science",
    location: "India",
    period: "Jul 2019 – Jun 2023",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/SRM_Institute_of_Science_and_Technology_Logo.svg",
    gpa: "9.03 / 10.00",
    coursework: "Data Structures & Algorithms, Artificial Intelligence, OOP, DBMS",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI & LLM",
    items: ["RAG", "LangChain", "GPT-4 API", "Pinecone", "ChromaDB", "Vector databases", "Multi-agent pipelines", "LLM evals"],
  },
  {
    group: "Backend & data",
    items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "Supabase", "NoSQL", "REST APIs", "SSE"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "D3.js", "Recharts"],
  },
  {
    group: "Cloud & tooling",
    items: ["AWS", "Docker", "CI/CD", "Vercel", "Git", "Claude Code", "GitHub Copilot"],
  },
  {
    group: "Languages",
    items: ["Java", "Python", "C++", "C#", "JavaScript", "TypeScript", "SQL"],
  },
  {
    group: "Foundations",
    items: ["Data structures & algorithms", "System design", "Distributed systems", "Microservices", "OOP & design patterns", "Agile"],
  },
];

export const navItems = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
