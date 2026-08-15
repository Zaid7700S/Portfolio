export type ProjectId =
  | "business-plan"
  | "rag-analyzer"
  | "ecom-store"
  | "lecture-agent"
  | "quiz-app";

export interface Project {
  title: string;
  subtitle: string;
  img: string;
  desc: string;
  tags: string[];
  features: string[];
  github: string;
  demo: string;
}

export const projectData: Record<ProjectId, Project> = {
  "business-plan": {
    title: "Business Plan Generator",
    subtitle: "Multi-Agent System",
    img: "/Venture_AI.png",
    desc: "A multi-agent system built with LangGraph that autonomously researches markets, analyzes competitors, and generates comprehensive, structured business plans. Agents communicate via state graphs to refine financial projections and marketing strategies.",
    tags: ["Python", "LangGraph", "LangChain", "Agentic AI"],
    features: [
      "State-machine driven agent orchestration using LangGraph.",
      "Market Research Agent scraping real-time web data.",
      "Financial Projection Agent generating 3-year P&L forecasts.",
      "Outputs a formatted 15-page business plan document.",
    ],
    github: "https://github.com/Zaid7700S/Venture-AI-Backend",
    demo: "https://venture-ai-frontend.vercel.app/",
  },
  "rag-analyzer": {
    title: "RAG Document Analyzer",
    subtitle: "Retrieval-Augmented Generation",
    img: "/Rag.png",
    desc: "An intelligent document analysis tool using Retrieval-Augmented Generation. Ingests PDFs, chunks them into vector embeddings, and allows users to query complex information with cited sources.",
    tags: ["Python", "LangChain", "Vector DB", "OpenAI"],
    features: [
      "PDF ingestion and semantic chunking.",
      "Vector embedding storage in a local database.",
      "Context-aware query answering with source citations.",
      "Streamlit/FastAPI interface for interactive querying.",
    ],
    github: "https://github.com/Zaid7700S/RAG-APP",
    demo: "https://rag-system-flax.vercel.app/",
  },
  "ecom-store": {
    title: "Full-Stack E-Commerce",
    subtitle: "Web Application",
    img: "/Shop_co.png",
    desc: "A complete e-commerce platform featuring user authentication, cart management, Stripe payment integration, and an admin dashboard. Built with a modern React frontend and Node.js backend.",
    tags: ["React", "Node.js", "SQL", "Stripe"],
    features: [
      "JWT-based secure user authentication.",
      "Shopping cart and checkout flow with Stripe API.",
      "Admin dashboard for inventory and order management.",
      "RESTful API backend with relational database design.",
    ],
    github: "https://github.com/Zaid7700S/store-backend",
    demo: "https://store-frontend-xi-taupe.vercel.app",
  },
    "lecture-agent": {
    title: "Lecture Assistant Agent",
    subtitle: "AI / LangGraph Workflow",
    img: "/lecture_assistant.png",
    desc: "A LangGraph-powered agentic workflow that researches a topic, extracts cited claims, and generates dynamic PowerPoint slide decks. Features a two-stage Human-in-the-Loop (HITL) review system allowing users to refine plans and verify facts before generating a fully formatted presentation using Groq's high-speed LLMs.",
    tags: ["LangGraph", "Groq", "Python", "React", "PPTX"],
    features: [
      "Dynamically scales slide count (1 slide per minute) based on user-defined lecture duration.",
      "Implements a two-stage Human-in-the-Loop (HITL) system for plan refinement and fact verification.",
      "Uses DuckDuckGo to fetch real sources and formats them into clickable hyperlinks in the final PPTX.",
      "Generates and exports beautifully formatted, downloadable PowerPoint files with modern dark-theme layouts.",
    ],
    github: "https://github.com/Zaid7700S/Lecture-Assistant-Slides-Generator-",
    demo: "https://lecture-assistant-orpin.vercel.app/",
  },
  "quiz-app": {
    title: "Interactive Quiz App",
    subtitle: "Mobile Application",
    img: "/Quiz_app.png",
    desc: "A cross-platform mobile application built in Flutter. Features timed questions, score tracking, and dynamic question loading. Designed with a clean, intuitive UI for an engaging user experience.",
    tags: ["Flutter", "Dart", "Mobile", "UI/UX"],
    features: [
      "Cross-platform (Android & iOS) single codebase.",
      "Dynamic question loading from API/local storage.",
      "Timer functionality and real-time score tracking.",
      "Clean, intuitive Material Design UI.",
    ],
    github: "https://github.com/Zaid7700S/Quiz-App",
    demo: "https://quiz-app-6e33e.web.app/",
  },
};
