export const profile = {
  name: "Suraj Mishra",
  headline: "Software Engineer building scalable, high-performance systems and products.",
  subheadline:
    "C++, Java, Python, TypeScript • Data Structures & Algorithms • Distributed & Web Systems • Clean, production-ready engineering",
  location: "Boston, MA",
  email: "surajmishragemini@gmail.com",
  photo: "/me.jpg",
  links: {
    github: "https://github.com/sm5689",
    linkedin: "https://www.linkedin.com/in/suraj-mishra-a610b620a",
    resume: "/resume.pdf",
  },
};

// export const featuredRepoNames = [
//   "Web-Dev-CS5610-Project",
//   "web103-listicle",
//   "roommate-peacekeeper-web",
//   "CS5610-Web-Development",
//   "ECOM-VISION",
//   "Movie-recommendation-system",
//   "Chess_Using_Sockets",
//   "AI_MIni_Project",
//   "Real-time-Drowsiness-Detector",
//   "Hospital-Mangement-SYSTEM",
//   "F.L.A.P",
// ];

export const featuredProjects = [
  {
    repo: "Web-Dev-CS5610-Project",
    title: "Kanbas Learning Management System",
    blurb: "Designed and built a full-stack learning management system inspired by Canvas Instructure, featuring course management, assignments, quizzes, and role-based access using React, Redux, Node.js, and MongoDB.", // optional: leave "" to auto-fetch from About/README
  },
  {
    repo: "roommate-peacekeeper-web",
    title: "Roommate Peacekeeper",
    blurb: "Developed a collaborative web application to help roommates track shared tasks, expenses, and responsibilities, focusing on state management, clean UI workflows, and real-time updates.",
  },
  {
    repo: "ECOM-VISION",
    title: "ECOM-VISION Admin Dashboard",
    blurb: "Built an analytics-driven admin dashboard for e-commerce operations, implementing interactive data visualizations, optimized Redux state management, and performance-focused React components.",
  },
  {
    repo: "Movie-recommendation-system",
    title: "Movie Recommendation System",
    blurb: "Implemented a recommendation system that suggests movies based on user preferences and similarity metrics, applying data preprocessing, algorithmic ranking, and backend integration.",
  },
  {
    repo: "Chess_Using_Sockets",
    title: "Multiplayer Chess using Sockets",
    blurb: "Engineered a real-time multiplayer chess application using socket-based communication, supporting concurrent gameplay, move validation, and low-latency client–server interactions.",
  },
  {
    repo: "Real-time-Drowsiness-Detector",
    title: "Real-Time Drowsiness Detector",
    blurb: "Developed a computer-vision system to detect driver drowsiness in real time using facial landmark detection and machine learning techniques, prioritizing accuracy and low-latency inference.",
  },
  {
    repo: "Hospital-Mangement-SYSTEM",
    title: "Hospital Management System",
    blurb: "Created a hospital management system to handle patient records, appointments, and staff workflows, emphasizing modular backend design, database consistency, and role-based operations.",
  },
  {
    repo: "F.L.A.P",
    title: "Fantasy League Analyzer & Predictor",
    blurb: "Built a fantasy league analyzer and predictor that processes historical player and match data to evaluate performance trends and generate predictive insights, combining data analysis, algorithmic modeling, and backend integration.",
  },
  {
    repo: "web103-listicle",
    title: "Listicle Web App",
    blurb: "Developed a dynamic list-based web application enabling users to create, edit, and manage content, with emphasis on component reusability, clean state handling, and responsive design.",
  },
  {
    repo: "AI_MIni_Project",
    title: "AI Mini Project",
    blurb: "Explored applied machine learning concepts by building a focused AI prototype, integrating data preprocessing, model experimentation, and evaluation in a compact end-to-end pipeline.",
  },
];

export const experience = [
  {
    company: "IpserLab LLC",
    role: "Software Engineering Intern",
    period: "Jan 2025 – Jun 2025",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQGwNqgzEwN2qQ/company-logo_200_200/company-logo_200_200/0/1631322453007?e=2147483647&v=beta&t=36qV_WG_7bTRDS82TbKOf1EjYn7HWVZasn7MuLGIDvM",
    bullets: [
      "Developed a full-stack quiz creation and lead analytics platform using React, Java, and PostgreSQL, supporting 50+ beta users across multiple organizations",
      "Improved backend performance by 30% (800ms → 560ms) through JDBC connection pooling and SQL query optimization, handling 200+ daily API requests",
      "Implemented real-time leaderboards and analytics dashboards to visualize quiz performance, engagement trends, and difficulty metrics",
      "Optimized 12+ SQL queries and restructured database schema, reducing execution time by 25% under concurrent user load",
      "Collaborated with UI/UX designers to enhance accessibility and responsiveness, achieving Lighthouse performance scores above 95",
    ],
  },
  {
  company: "Northeastern University",
  role: "Graduate Teaching Assistant (Head TA), Web Development (CS5610)",
  period: "May 2025 – Dec 2025",
  logo: "https://brand.northeastern.edu/wp-content/uploads/2025/01/seal-wordmark-blk.svg",
  bullets: [
    "Led instruction and mentoring for 150+ graduate students in full-stack web development using React, Node.js, Express, MongoDB, HTML, CSS, and JavaScript",
    "Increased student engagement by 30% through structured tutorials, workshops, and hands-on labs aligned with industry practices",
    "Conducted detailed code reviews for 200+ assignments and projects, improving average student performance and code quality",
    "Managed course communication channels and collaborated closely with faculty, reducing unresolved student queries by 40%",
  ],
},
{
  company: "Northeastern University",
  role: "Graduate Teaching Assistant, Web Development (CS5610)",
  period: "Jun 2024 – Dec 2024",
  logo: "https://brand.northeastern.edu/wp-content/uploads/2025/01/seal-wordmark-blk.svg",
  bullets: [
    "Mentored students in React, Node.js, APIs, and debugging through office hours and structured guidance",
    "Reviewed assignments and projects with feedback focused on maintainability, correctness, and clean architecture",
    "Helped students improve project structure, state management, and API integration patterns",
  ],
},
  {
    company: "HighRadius",
    role: "Software / Data Intern",
    period: "Feb 2022 – May 2022",
    logo: "https://media.zenfs.com/en/business-wire.com/a71eb02f7d15154ab98ef3a2622dbb55",
    bullets: [
      "Analyzed sales and marketing data for secure video conferencing solutions using SQL, Power BI, and Tableau to uncover customer behavior trends",
      "Built interactive dashboards visualizing tradeshow attendee data, enabling identification of high-intent prospects from 100+ leads",
      "Supported data-driven outreach strategies by segmenting datasets and delivering actionable insights to business stakeholders",
      "Strengthened analytical and data visualization skills while collaborating in a remote, cross-functional team environment",
    ],
  },
  {
    company: "Internship Studio",
    role: "Web Development Intern",
    period: "Jan 2022 – Mar 2022",
    logo: "https://cit.internshipstudio.com/assets/img/logo.png",
    bullets: [
      "Built and deployed a responsive full-stack e-commerce platform using HTML, CSS, JavaScript, React, Node.js, Express, and MySQL",
      "Developed 15+ reusable UI components and backend integrations, improving user engagement by approximately 30%",
      "Optimized frontend assets and caching strategies, reducing page load time from 2.8s to 2.5s and improving Core Web Vitals",
      "Gained hands-on experience in database-driven web development and production-style application maintenance",
    ],
  },
  {
    company: "Schaeffler India",
    role: "IT Intern",
    period: "Dec 2021 – Jan 2022",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6cBYHZ0wDOpbRR1vK-0mzs_YEsI_IKxGteA&s",
    bullets: [
      "Gained exposure to enterprise IT infrastructure, including server management and internal networking systems",
      "Observed how IT operations support multiple business domains to ensure reliability and efficiency in a corporate environment",
      "Developed foundational understanding of enterprise-scale systems and cross-team IT collaboration",
    ],
  },
];

export const education = [
  {
    school: "Northeastern University",
    degree: "Master’s degree in Computer Science",
    location: "Boston, MA",
    period: "Sep 2023 – Dec 2025",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/NU_RGB_seal_R.png",
    details: [
      "Relevant Coursework: Web Development, Program Design Paradigm, Natural Language Processing",
    ],
  },
  {
    school: "SRM Institute of Science and Technology",
    degree: "Bachelor’s degree in Computer Science",
    location: "India",
    period: "Jul 2019 – Jun 2023",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/SRM_Institute_of_Science_and_Technology_Logo.svg/1200px-SRM_Institute_of_Science_and_Technology_Logo.svg.png",
    details: [
      "Relevant Coursework: Data Structures and Algorithms, Artificial Intelligence, Object-Oriented Programming, DBMS",
    ],
  },
];

export const skills = {
  Languages: ["Java", "C++", "Python", "JavaScript", "TypeScript", "SQL", "C#"],
  "Web Technologies": [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "HTML",
    "CSS",
    "Redux",
    "REST APIs",
    "GraphQL",
  ],
  "Databases & Cloud": [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "AWS",
    "Docker",
    "CI/CD",
  ],
  "Core Competencies": [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "System Design",
    "Performance Optimization",
    "Multithreading",
    "Agile Methodologies",
    "Git & Version Control",
  ],
};