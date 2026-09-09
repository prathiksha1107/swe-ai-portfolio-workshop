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

// CUSTOMIZE WITH AI: After PROFILE.md is human-approved, Skill 02 replaces only
// the placeholder content in this file. Blank optional links stay hidden.
export const profile = {
  name: "Your Name",
  initials: "YN",
  title: "Your Professional Title",
  tagline: "YOUR FOCUS · YOUR SPECIALTY · YOUR INDUSTRY",
  positioning: "Write a short sentence explaining what you build and who it helps.",
  introduction: "Add two or three sentences that introduce your engineering experience and interests.",
  location: "",
  email: "",
  contactFormEndpoint: "",
  resumeUrl: "",
  links: {
    github: "",
    linkedin: "",
  },
  about: [
    "Describe the kinds of technical problems you enjoy solving and the perspective you bring to engineering work.",
    "Add a second short paragraph about your current focus, collaboration style, or the outcomes you want to create.",
  ],
  experience: [
    {
      company: "Company or Organization",
      role: "Role Title",
      dates: "Start — End",
      summary: "Briefly explain what you worked on and the problem you helped solve.",
      impact: "Describe a verified outcome. Remove this sentence when no public outcome is available.",
      technologies: ["Technology", "Tool", "Platform"],
    },
    {
      company: "Previous Company or Organization",
      role: "Role Title",
      dates: "Start — End",
      summary: "Add another concise experience summary using only approved profile facts.",
      impact: "Describe the result without inventing numbers or confidential details.",
      technologies: ["Technology", "Tool"],
    },
  ] satisfies Experience[],
  projects: [
    {
      title: "Featured Project Title",
      summary: "Summarize the project in one clear sentence.",
      problem: "What useful problem did this project address?",
      approach: "What did you personally design, build, test, or improve?",
      impact: "What verified result or learning came from the work?",
      technologies: ["Technology", "Tool", "Platform"],
    },
    {
      title: "Second Project Title",
      summary: "Add a second approved project or remove this placeholder.",
      problem: "Explain the problem.",
      approach: "Explain your approach.",
      impact: "Explain the verified outcome.",
      technologies: ["Technology", "Tool"],
    },
  ] as Project[],
  skills: [
    { label: "Programming", items: ["Language", "Framework", "Testing"] },
    { label: "Cloud & Data", items: ["Cloud platform", "Database", "Data tool"] },
    { label: "Engineering", items: ["Architecture", "APIs", "Collaboration"] },
    { label: "Specialty", items: ["Your specialty", "Your method", "Your domain"] },
  ],
  education: [
    {
      degree: "Degree and Major",
      school: "School or University",
      date: "Graduation Date",
      detail: "Optional approved coursework, research focus, or distinction",
    },
  ],
  achievements: [] as string[],
};
