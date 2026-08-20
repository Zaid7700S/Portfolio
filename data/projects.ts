export type ProjectId =
  | "business-plan"
  | "rag-analyzer"
  | "ecom-store"
  | "lecture-agent"
  | "boardroom-ai"
  | "quiz-app";

export interface Project {
  // --- Existing fields (used by cards + modal, already filled in) ---
  title: string;
  subtitle: string;
  img: string;
  desc: string;
  tags: string[];
  features: string[];
  github: string;
  demo: string;

  // --- New fields for the full case-study page (/projects/[slug]) ---
  // All optional — the page renders gracefully with just the fields above
  // until you fill these in. See PROJECT_WRITING_GUIDE.md for what to write.
  year?: string;
  problem?: string;
  approach?: string[];
  challenges?: string;
  outcome?: string;
  gallery?: string[];
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
    // year: "2026",
    // problem: "",
    // approach: [],
    // challenges: "",
    // outcome: "",
    // gallery: [],
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
    desc: "A LangGraph-powered agentic workflow that researches a topic, extracts cited claims, and generates dynamic PowerPoint slide decks. Features a two-stage Human-in-the-Loop (HITL) review system allowing users to refine plans and verify facts before generating a fully formatted, downloadable presentation using Groq's high-speed LLMs.",
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
  "boardroom-ai": {
  title: "Boardroom AI",
  subtitle: "Multi-Agent Executive Debate System",
  img: "/Boardroom_AI.png", // TODO: swap in your actual screenshot filename
  desc: "An autonomous strategic planning app where four AI executives — CEO, CFO, CTO, and CMO — debate a business problem in real time, then converge on a structured action plan with a generated timeline chart. Built with AutoGen for the multi-agent debate and LangGraph for plan synthesis, running on Groq for low-latency inference.",
  tags: ["React", "FastAPI", "AutoGen", "LangGraph", "Groq", "Supabase"],
  features: [
    "Four-agent executive debate (CEO/CFO/CTO/CMO) streamed live via Server-Sent Events.",
    "LangGraph pipeline that compresses the debate into a 4-step action plan and a timeline chart.",
    "Bring-your-own-key Groq auth, with keys encrypted at rest via Supabase Vault for signed-in users.",
    "Guest mode with zero persistence, alongside full session history for authenticated users.",
  ],
  github: "https://github.com/Zaid7700S/Boardroom-AI-Backend/", // TODO: paste your repo URL
  demo: "https://boardroom-ai-frontend.vercel.app/",
  year: "2026",
  problem:
    "Strategic decisions usually get one perspective at a time. I wanted to see whether a debate among specialized AI agents — each with a distinct incentive, like a CFO who's skeptical of spend or a CTO who flags technical risk — would surface a more useful plan than a single model answering cold.",
  approach: [
    "Used AutoGen's RoundRobinGroupChat to run four agents with distinct system prompts through a bounded debate, streaming each turn to the frontend as it's generated rather than waiting for the full exchange.",
    "Fed the completed debate into a LangGraph pipeline: one node extracts a 4-step action plan, a second turns it into structured timeline data.",
    "Deliberately kept the LLM out of the code-execution path for chart generation — it returns JSON (step + duration), and a fixed function renders the chart, rather than the model generating and running its own Python.",
    "Moved API key storage from browser-only state to Supabase Vault via SECURITY DEFINER RPCs, so signed-in users' Groq keys are encrypted at rest instead of sitting in plaintext user metadata.",
    "Added a client-side wake-up ping against a health endpoint to smooth over cold starts on the free-tier backend host, so users see 'server is starting' instead of a silent stall.",
  ],
  challenges:
    "The two hardest problems weren't the agents — they were the plumbing. First, an early version had the chart-generation LLM write and execute its own Python, which is a real remote-code-execution surface once you think about what a crafted prompt could get the model to emit; redesigning it to only ever return structured data (never code) closed that off entirely. Second, once the chart images started being sent inline as base64 over Server-Sent Events, a naive client-side parser that only handled one network chunk at a time silently dropped the final event whenever that payload landed on a chunk boundary — the app would just hang with no error. Rebuilding the parser to buffer across reads, rather than assume each chunk lines up with an SSE event, fixed it for good.",
  outcome:
    "A working end-to-end app: real-time multi-agent debate, an auto-generated action plan and chart, and persistent history for logged-in users, with the API key never leaving encrypted storage. The debugging process itself — chasing a schema mismatch, a CORS misconfiguration, and a chunk-boundary parsing bug — ended up being as instructive as the AI-agent design, and shaped how carefully I now think about failure modes in streaming architectures.",
  gallery: ["/Boardroom_Ai_2.png","/Boardroom_Ai_3.png"], // TODO: add screenshot paths once you have them
},
};