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
    year: "2026",
    problem:
      "Generic 'AI business plan' tools tend to produce plausible-sounding numbers that aren't tied to anywhere real — a rent estimate that's really just a language model's prior, not what a space actually costs in that neighborhood. I wanted a planner that grounds its financials in live local data and is honest when its own budget assumptions turn out to be wrong.",
    approach: [
      "Built a LangGraph state machine with a sequential spine (parse location → build a 3-tier blueprint → pick a tier against budget) that fans out into five research agents running concurrently — market pricing, competitors, rent, permits, payroll — then fans back in before compiling the plan.",
      "Gave each research agent a grounded web-search tool via Groq's native browser_search on gpt-oss-20b for live, cited lookups, with an automatic fallback to DuckDuckGo (and a cooldown once a rate limit is hit) so one flaky search doesn't take down the whole run.",
      "Added a budget-gate node that re-checks the researched total (equipment + legal fees) against the user's actual budget after real numbers come in, rather than trusting the LLM's pre-research capex guess — if it's still over budget, the graph downgrades a tier and loops back through research automatically.",
      "Pulled real nearby competitors from OpenStreetMap's Overpass API, trying multiple public mirrors in sequence since the main instance drops connections under load.",
      "Replaced a fixed-timer progress bar with a real one: a streaming endpoint emits a Server-Sent Event the moment each LangGraph node actually finishes, so the UI reflects genuine agent progress — including a visible 'downgrading tier' state when the budget-gate loop fires — instead of a countdown that had no relationship to what the backend was doing.",
    ],
    challenges:
      "The financial logic was the trickiest part to get right: an early version locked in feasibility using the blueprint agent's rough capex guess, made before any research had run, which meant a plan could be labeled 'feasible' off a number nobody had actually verified. Recomputing feasibility twice — once as a fast pre-research gate, once for real after the researched equipment and legal costs were in — and looping back to a cheaper tier when the real numbers didn't fit was what made the budget math trustworthy. Streaming was its own problem: with a single blocking endpoint, the frontend had no way to know which agent was actually running, so the progress UI was pure guesswork. Switching to LangGraph's `astream(stream_mode='updates')` over Server-Sent Events fixed that, but it meant designing the UI around genuine parallelism — five research agents finish in whatever order their searches happen to resolve, not neatly one after another, so the progress display had to represent that as a group rather than a fake sequence.",
    outcome:
      "A planner that researches instead of guesses: real competitor names from OSM, live rent and material pricing pulled via search, and a feasibility verdict that's checked against actual researched costs rather than an LLM's opening estimate. The progress UI now shows exactly what the agent graph is doing in real time, and a health-check ping smooths over cold starts on the free-tier host so a slow first load reads as 'waking up' instead of a silent hang.",
    gallery: ["/Venture_AI_1.png","/Venture_AI_2.png","/Venture_AI_3.png","/Venture_AI_4.png"],
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
    
    // --- New fields for the full case-study page ---
    year: "2026",
    problem:
      "Standard RAG tutorials work fine for simple text snippets but fall apart in real-world scenarios. I needed a system that could handle large, complex PDFs without crashing the server, losing markdown table structures, or hitting strict API rate limits during the embedding and retrieval process.",
    approach: [
      "Built a dual-engine FastAPI ingestion pipeline: a 'Fast Mode' for standard text extraction and a 'Deep Scan' layout-aware mode using PyMuPDF4LLM to perfectly preserve tables and hierarchical formatting.",
      "Implemented a global chunk buffer that batches vector chunks in memory, reducing network calls to Hugging Face and Supabase from 30+ per document to just a few, completely bypassing strict free-tier API rate limits.",
      "Used Supabase and pgvector for hybrid search, ensuring only high-confidence context reaches Groq's high-speed gpt-oss models.",
      "Added a segmented control UI in React to allow dynamic search scoping, letting users seamlessly switch between querying a single active session or their entire global knowledge base.",
      "Integrated a lightweight health-check endpoint to keep the free-tier Render backend awake via external pings, eliminating 60-second cold start delays for end users."
    ],
    challenges:
      "Network bottlenecks and vector database query limits were the biggest hurdles. Initially, the backend made a network request for every single PDF page, causing massive slowdowns and rate-limit errors; I solved this by engineering a 20-chunk global memory buffer to batch uploads invisibly. Later, files stopped appearing in the knowledge base UI because the Supabase fetch query was hitting a hidden 1,000-row limit on vector chunks. I had to restructure the database schema to include a dedicated summaries table and rewrite the endpoint with a 15,000-row limit and exact JSONB metadata filtering to ensure reliable document retrieval.",
    outcome:
      "A highly optimized, production-ready RAG workspace that handles complex document layouts without memory spikes. The React UI features real-time token streaming, explicit markdown formatting for bold text and tables, and mandatory API key modal flows, resulting in a smooth, professional user experience that stays robust within free-tier infrastructure constraints.",
    gallery: ["/Rag.png","/Rag_1.png", "/Rag_2.png", "/Rag_3.png"], 
  },
  "ecom-store": {
    title: "Full-Stack E-Commerce",
    subtitle: "Web Application",
    img: "/Shop_co.png",
    desc: "A complete e-commerce platform featuring user authentication, cart management, and a live admin support dashboard. Built with a highly polished React frontend and a robust ASP.NET Core Web API backend.",
    tags: ["React", "Tailwind CSS", "C#", ".NET Core", "SignalR", "Cloudflare R2", "SQL"],
    features: [
      "Responsive React UI with role-based routing and custom SVG components.",
      "JWT-based secure user authentication with refresh token rotation.",
      "Live dual-interface support desk powered by SignalR WebSockets.",
      "Scalable cloud media storage via Cloudflare R2 integration.",
      "Admin dashboard for inventory and customer management."
    ],
    github: "https://github.com/Zaid7700S/store-backend",
    demo: "https://store-frontend-xi-taupe.vercel.app",
    
    // --- New fields for the full case-study page ---
    year: "2026",
    problem:
      "I wanted to build an application that went beyond standard CRUD operations to tackle real-world architecture challenges—like secure authentication, real-time dual-interface chat, and cloud media storage—while maintaining a seamless, blazing-fast single-page user experience.",
    approach: [
      "Built a decoupled architecture using React for a dynamic single-page frontend and ASP.NET Core Web API for a strictly typed backend.",
      "Designed a responsive, component-driven frontend using Tailwind CSS, React Router for nested role-based layouts (Admin vs. Customer), and the Context API for global authentication state.",
      "Integrated SignalR WebSockets for real-time communication to engineer a synchronized live chat system, utilizing Optimistic UI updates to instantly render messages before the server round-trip completes.",
      "Implemented a secure JWT authentication flow with refresh token rotation and BCrypt password hashing, strictly managing CORS policies across Vercel and Render deployments.",
      "Configured Cloudflare R2 for secure, scalable profile picture storage, actively handling broken links or forbidden access with automated fallback UI avatars."
    ],
    challenges:
      "Connecting the React frontend to the .NET SignalR hub introduced notorious 'phantom bugs.' React's Strict Mode caused duplicate event listeners, resulting in echoed messages. I also faced a serialization mismatch where the live SignalR broadcasts defaulted to PascalCase, causing the React frontend (expecting camelCase) to drop live messages. On the UI side, managing React's component lifecycles caused visual glitches, such as a split-second flash of authenticated UI during token validation and incorrect scroll preservation between routes. Finally, aggressive browser autofill extensions caused 'ghost submits' on auth forms, requiring custom frontend validation shields.",
    outcome:
      "A fully deployed, production-ready e-commerce platform that smoothly handles real-time WebSocket communication, secure file uploads, and robust authentication. The frontend feels native and highly polished, leveraging custom scroll-to-top routing utilities, strict initialization states, and graceful error handling to deliver a seamless user experience.",
    gallery: ["/Shop_co_1.png", "/Shop_co_2.png", "/Shop_co_3.png","/Shop_co_4.png"], 
  },
  "lecture-agent": {
    title: "Podium AI",
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
    title: "QuizMaster",
    subtitle: "AI-Powered Cross-Platform Study Ecosystem",
    img: "/Quiz_app.png", // Keep your existing image or update to the new dashboard shot
    desc: "A comprehensive study management system built with Flutter and Firebase. It features AI-powered data parsing to transform unstructured notes into structured quizzes, an integrated AI tutor for explanations, advanced question slicing, and professional PDF exports.",
    tags: ["Flutter", "Dart", "Firebase", "Firestore", "AI", "Cross-Platform"],
    features: [
      "AI-powered parsing to automatically generate structured MCQs from messy, unstructured lecture notes.",
      "Built-in AI 'Explain' feature providing real-time concept breakdowns inside the quiz.",
      "Advanced question slicing by topic, difficulty, and performance history.",
      "Generates and exports beautifully formatted PDF study guides and mistake reports.",
      "Cross-platform syncing between mobile and web via Firestore.",
    ],
    github: "https://github.com/Zaid7700S/Quiz-App",
    demo: "https://quiz-app-6e33e.web.app/",
    year: "2025",
    problem:
      "I’ve always struggled to find a tool that actually fit my study style for MCQ-based exams. I wanted something that didn't just passively store questions but actively helped me learn—highlighting my 'weak' areas, explaining concepts in real-time, and syncing perfectly whether I was commuting on my phone or sitting at my desk. After coming up empty-handed while prepping for my own computer science finals, I decided that if the right tool didn't exist, I would just build it myself.",
    approach: [
      "Built a unified cross-platform codebase in Flutter, deploying it natively to mobile devices while also compiling a fully responsive web application.",
      "Integrated Firestore for real-time state synchronization, allowing users to start a session on their phone and instantly pick up where they left off on their laptop.",
      "Implemented an AI parsing pipeline that ingests messy, unstructured text or PDFs and strictly formats the output into structured JSON that the app can instantly render as playable MCQs.",
      "Designed a dynamic analytics engine that tracks user performance history and automatically routes incorrectly answered items into a dedicated 'Weak Questions' bank for targeted mastery.",
      "Utilized background processing isolates in Dart to handle complex file parsing and heavy PDF generation tasks without blocking the main UI thread, ensuring smooth animations and responsiveness."
    ],
    challenges:
      "The transition from a mobile-first design to a seamless web experience introduced significant challenges around state synchronization, browser caching, and responsive routing. Furthermore, handling messy data through the AI parser required careful prompt engineering; the model frequently tried to return conversational text instead of the strict JSON format the app required to function. Finally, ensuring the UI remained perfectly smooth while parsing heavy documents or compiling professional PDF reports meant I had to restructure how the app managed its state, offloading that heavy computation to background isolates.",
    outcome:
      "A complete, intelligent study ecosystem that goes far beyond traditional flashcards. It actively identifies knowledge gaps, explains complex topics on the fly, and generates professional offline materials. Building it served as a deep dive into cross-platform state management, responsive UI design, and practical AI integration—and it ultimately became my primary study tool for finals.",
    gallery: ["/quiz_app_1.png", "/quiz_app_2.png", "/quiz_app_3.png","/quiz_app_4.png"], // TODO: add screenshot paths
  },
  "boardroom-ai": {
  title: "Boardroom AI",
  subtitle: "Multi-Agent Executive Debate System",
  img: "/Boardroom_Ai.png", // TODO: swap in your actual screenshot filename
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