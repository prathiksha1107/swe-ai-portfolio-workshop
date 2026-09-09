export type LinkPair = { label: string; url: string };

export type Experience = {
  company: string;
  role: string;
  dates: string;
  summary: string;
  impact: string;
  technologies: string[];
};

export type Project = {
  title: string;
  summary: string;
  problem: string;
  approach: string;
  impact: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
};

// CUSTOMIZE: This is the only file participants normally need the AI to edit.
export const profile = {
  name: "Prathiksha Ravi Krishnan",
  initials: "PRK",
  title: "Senior Software & Applied AI Engineer",
  tagline: "AI Platforms · Automation · Manufacturing Systems",
  positioning: "I build practical software and AI systems that solve real operational problems at scale.",
  introduction:
    "More than seven years of experience across semiconductor manufacturing, enterprise systems, applied AI research, and entrepreneurship.",
  location: "Boise, Idaho",
  email: "prathiksha11@yahoo.com",
  contactFormEndpoint: "https://formspree.io/f/mppzlqqj",
  resumeUrl: "",
  links: {
    github: "https://github.com/prathiksha1107",
    linkedin: "https://www.linkedin.com/in/prathiksha-ravi-krishnan",
  },
  about: [
    "I design software that connects ambitious technical ideas to useful operational outcomes. My work spans cloud applications, AI-enabled systems, automation, and high-volume data workflows.",
    "At Micron, I focus on AI and Azure adoption, engineering-platform modernization, fab efficiency, and reusable infrastructure for production teams.",
  ],
  experience: [
    {
      company: "Micron Technology",
      role: "Senior Operations Improvement Engineer",
      dates: "2024—Present",
      summary: "Building and supporting production applications while advancing AI, Azure, engineering-platform modernization, and fab workflow observability.",
      impact: "Improved a critical workflow by more than 70% while processing over 10 million records; received Innovation and Idea of the Quarter recognition.",
      technologies: ["Python", "Azure AI Foundry", "SQL Server", "SSIS", "AI agents", "Tableau", "Power BI", "Angular"],
    },
    {
      company: "Iowa State University",
      role: "Graduate Research Assistant",
      dates: "Aug 2022—May 2024",
      summary: "Developed an AI-enabled application designed to simplify organic-certification navigation for farmers.",
      impact: "Contributed prompt engineering, architecture, UI/UX, full-stack implementation, Scrum planning, and development coordination.",
      technologies: ["Angular", "Python", "Flask", "Azure Functions", "MySQL"],
    },
    {
      company: "Pop It Out",
      role: "Co-Founder & Technology Lead",
      dates: "Jul 2019—Aug 2022",
      summary: "Led technology and product decisions for e-commerce, order management, UI/UX, operations, and workflow automation.",
      impact: "Built a cloud order-management platform and helped scale the business from approximately $500 to $375K within one year.",
      technologies: ["Angular", "Node.js", "Shopify", "Azure Functions", "MySQL"],
    },
    {
      company: "Infosys · Toyota Motor North America",
      role: "Senior Systems Engineer / Full-Stack Developer",
      dates: "Jul 2018—Aug 2020",
      summary: "Designed and deployed cloud-based enterprise HR applications that modernized manual workflows.",
      impact: "Reduced latency by approximately 40%, improved database-administration efficiency by approximately 20%, and helped accelerate an initiative by approximately 12 months.",
      technologies: ["Angular", "Node.js", "Azure", "AWS", "MongoDB", "REST APIs"],
    },
  ] satisfies Experience[],
  projects: [
    {
      title: "Enterprise AI Support Platform",
      summary: "Reusable AI support infrastructure with application-specific agents and skills.",
      problem: "Engineering teams need faster help when internal applications behave unexpectedly.",
      approach: "Architected specialized agents connected to application interfaces, services, and operational data.",
      impact: "Established reusable infrastructure for application support within a broader team AI ecosystem.",
      technologies: ["Azure AI Foundry", "AI agents", "Agent skills", "Operational data"],
    },
    {
      title: "High-Volume Manufacturing Workflow Optimization",
      summary: "A mission-critical manufacturing data workflow processing more than 10 million records.",
      problem: "A high-volume workflow required better performance, scalability, and maintainability.",
      approach: "Optimized SSIS workflows, stored procedures, SQL queries, loading, and indexes with Python parallel processing.",
      impact: "Improved critical job performance by more than 70%.",
      technologies: ["Python", "Parallel processing", "SSIS", "SQL Server", "T-SQL"],
    },
    {
      title: "AI-Enabled Organic Certification Application",
      summary: "A user-facing application intended to simplify certification navigation for farmers.",
      problem: "Organic farmers face a complex and costly certification process.",
      approach: "Combined prompt engineering, AI integration, architecture, UI/UX, and full-stack development.",
      impact: "Produced an AI-enabled application designed to make certification guidance easier to navigate.",
      technologies: ["Angular", "Python", "Flask", "Azure Functions", "MySQL"],
    },
  ] as Project[],
  skills: [
    { label: "Applied AI", items: ["AI agents", "Prompt engineering", "Azure AI Foundry", "MCP"] },
    { label: "Software", items: ["Python", "TypeScript", "JavaScript", "Angular", "Node.js", "C#"] },
    { label: "Cloud & Data", items: ["Azure", "AWS", "SQL Server", "MySQL", "MongoDB", "SSIS"] },
    { label: "Engineering", items: ["Architecture", "REST APIs", "Observability", "Agile", "Technical mentorship"] },
  ],
  education: [
    { degree: "Master of Science in Computer Engineering", school: "Iowa State University", date: "May 2024", detail: "Applied AI and software engineering research · Full scholarship / graduate funding" },
    { degree: "Bachelor of Engineering in Information Technology", school: "St. Joseph's College of Engineering, Anna University", date: "2018", detail: "" },
  ],
  achievements: [
    "Innovation Award · Micron Technology",
    "Idea of the Quarter Cash Award · Micron Technology",
    "Insta Awards · Infosys, 2019 and 2020",
    "Star Performer · Infosys, 2019",
  ],
};
