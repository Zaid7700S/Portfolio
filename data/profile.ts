// Central place for the info the chatbot should know about you.
// Update this file (and data/projects.ts for projects) and the chatbot
// stays current automatically — no need to touch its prompt directly.

export const profile = {
  name: "Zaid Arshad",
  legalName: "Muhammad Zaid",
  location: "Lahore, Pakistan",
  tagline: "Software Engineering student building Agentic AI systems and full-stack applications.",
  education: {
    school: "Superior University, Lahore",
    degree: "BS Computer Science",
    status: "4th semester, ongoing",
    cgpa: "3.90/4.00",
  },
  experience: [
    {
      title: "Software Engineering Intern",
      org: "Glosix Systems, Lahore",
      dates: "June 2026 – August 2026",
      summary:
        "Three-month internship focused on Agentic AI and full-stack development. Worked hands-on with LangChain and LangGraph, contributed to multi-agent systems and RAG pipelines, and shipped full-stack application features.",
    },
  ],
  skills: {
    "AI / Agentic Systems": [
      "LangChain",
      "LangGraph",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases",
      "Prompt Engineering",
      "Multi-Agent Orchestration",
      "OpenAI API",
      "Groq API",
    ],
    Languages: ["Python", "C++", "JavaScript", "TypeScript", "Dart", "SQL"],
    Frontend: ["React.js", "HTML5", "CSS3", "Flutter"],
    Backend: ["Node.js", "Express.js", "ASP.NET Core Web API", "ASP.NET Core SignalR"],
    "Databases & Cloud": ["SQL", "NoSQL", "Vector Databases", "Cloudflare R2", "Stripe API"],
  },
  contact: {
    email: "zaid3055540@gmail.com",
    github: "https://github.com/Zaid7700S",
    linkedin: "https://www.linkedin.com/in/zaid-arshad-8337423bb/",
    portfolio: "https://zaidarshad.me",
  },
  status:
    "Open to internships, part-time roles, and collaborations on Agentic AI workflows.",
};