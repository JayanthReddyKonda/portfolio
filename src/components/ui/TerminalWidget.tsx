"use client";

/**
 * @file TerminalWidget.tsx
 * @description Interactive Developer CLI Diagnostics Terminal for Jayanth Reddy Konda.
 * Features:
 * - Live command parser supporting `projects`, `skills`, `education`, `experience`, `certifications`, `contact`, `help`, `clear`.
 * - Command history navigation with Up/Down arrow keys.
 * - Auto-scrolling output buffer with formatted real-world technical data.
 */

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Sparkles, CornerDownLeft } from "lucide-react";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

const INITIAL_LOGS: CommandLog[] = [
  {
    id: "init",
    command: "jayanth --info",
    output: (
      <div className="space-y-1 text-xs text-muted">
        <p className="text-foreground font-semibold">
          Jayanth Reddy Konda // AI &amp; ML Engineer • VNR VJIET (CGPA: 9.1)
        </p>
        <p className="text-muted/80">
          Specialization: FastAPI • Qdrant RAG • LangChain LCEL • Real-Time WebSockets • Biometric Vision
        </p>
        <p className="text-emerald-400">
          Type <span className="text-white font-mono font-bold underline">help</span> to list diagnostic commands.
        </p>
      </div>
    ),
  },
];

export function TerminalWidget() {
  const [logs, setLogs] = useState<CommandLog[]>(INITIAL_LOGS);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const logId = Math.random().toString(36).substring(2, 9);
    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
            <div>
              <span className="font-bold text-emerald-400">projects</span> - View 4 real production systems
            </div>
            <div>
              <span className="font-bold text-emerald-400">skills</span> - Full languages &amp; AI framework stack
            </div>
            <div>
              <span className="font-bold text-emerald-400">education</span> - VNR VJIET (CGPA 9.1) &amp; schools
            </div>
            <div>
              <span className="font-bold text-emerald-400">experience</span> - IBM SkillsBuild AI/ML Trainee
            </div>
            <div>
              <span className="font-bold text-emerald-400">certifications</span> - Stanford University ML Spec
            </div>
            <div>
              <span className="font-bold text-emerald-400">contact</span> - Email, phone, GitHub &amp; LinkedIn
            </div>
            <div>
              <span className="font-bold text-emerald-400">clear</span> - Reset terminal screen
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-3 text-xs text-muted">
            <div>
              <p className="text-foreground font-semibold">1. AI Corporate Credit Intelligence Platform (FastAPI, React 19, Qdrant)</p>
              <p>5-service Docker stack, pdfplumber parsing, GST mismatch anomaly detection, CAM report synthesis with Gemini 2.0 Flash embeddings.</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">2. Real-Time Financial Market Intelligence (FastAPI, WebSockets, PostgreSQL)</p>
              <p>Rolling Z-score anomaly detection across 50+ NSE/BSE tickers, 1,000+ concurrent WebSocket connections with sub-200ms latency.</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">3. AI Patient Recovery Monitoring System (FastAPI, React, Redis, Socket.IO)</p>
              <p>Real-time doctor-patient messaging, Redis caching reducing latency by 40%, WhatsApp Business SOS escalation workflows.</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">4. Multi-Factor Face Authentication + Secure Notes (Flask, DeepFace, RetinaFace)</p>
              <p>Biometric facial verification, AES-256 encrypted facial embeddings in PostgreSQL, supporting 1,000 concurrent sessions.</p>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1.5 text-xs text-muted">
            <p className="text-foreground font-medium">Jayanth&apos;s Technical Stack:</p>
            <p>• <span className="text-white">Languages:</span> Python, Java, C++, SQL, JavaScript, TypeScript</p>
            <p>• <span className="text-white">Backend &amp; APIs:</span> FastAPI, Flask, Express.js, REST APIs, WebSockets, JWT, Microservices</p>
            <p>• <span className="text-white">Databases:</span> PostgreSQL, Qdrant (Vector DB), Redis, MySQL, MongoDB</p>
            <p>• <span className="text-white">Machine Learning &amp; AI:</span> LangChain (LCEL), Gemini 2.0 Flash, DeepFace, RetinaFace, TensorFlow, Scikit-Learn</p>
            <p>• <span className="text-white">Infrastructure &amp; Tools:</span> Docker, Docker Compose, Linux, Postman, Git, n8n, GitHub Actions</p>
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-2 text-xs text-muted">
            <div>
              <p className="text-foreground font-semibold">VNR Vignana Jyothi Institute of Engineering &amp; Technology (2024–Present)</p>
              <p>B.Tech in Computer Science and Engineering (AI &amp; ML) — <span className="text-emerald-400 font-bold">CGPA: 9.1 / 10.0</span></p>
            </div>
            <div>
              <p className="text-foreground font-semibold">Narayana Junior College (2022–2024)</p>
              <p>Intermediate (Class XII) — 93%</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">Gitanjali (EM) High School (2021–2022)</p>
              <p>Matriculation (Class X) — 97.2%</p>
            </div>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-xs text-muted">
            <div>
              <p className="text-foreground font-semibold">AI &amp; ML Virtual Trainee — IBM SkillsBuild (Sep 2025 – Oct 2025)</p>
              <p>Designed an AI-powered study assistant using LLM APIs, modular Python services, prompt orchestration, and knowledge retrieval pipelines.</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">Technical Volunteer — Krithomedh AI/ML Club</p>
              <p>Organized AI Week &apos;26, authored Kaggle ML Challenge, and organized Vibe Coding Hackathon for 500+ participants.</p>
            </div>
          </div>
        );
        break;

      case "certifications":
        output = (
          <div className="text-xs text-muted space-y-1">
            <p className="text-foreground font-semibold">Machine Learning Specialization</p>
            <p>Stanford University &amp; DeepLearning.AI (Andrew Ng via Coursera)</p>
            <p>Supervised ML, Neural Networks, Decision Trees, and Unsupervised Recommender Systems.</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs text-muted space-y-1.5">
            <p>• <span className="text-white">Email:</span> <a href="mailto:kondajayanthreddy@gmail.com" className="text-emerald-400 underline">kondajayanthreddy@gmail.com</a></p>
            <p>• <span className="text-white">Phone:</span> <a href="tel:+917036086060" className="text-foreground">+91 7036086060</a></p>
            <p>• <span className="text-white">GitHub:</span> <a href="https://github.com/JayanthReddyKonda" target="_blank" rel="noreferrer" className="text-foreground underline">github.com/JayanthReddyKonda</a></p>
            <p>• <span className="text-white">LinkedIn:</span> <a href="https://www.linkedin.com/in/jayanthreddykonda/" target="_blank" rel="noreferrer" className="text-foreground underline">linkedin.com/in/jayanthreddykonda</a></p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-xs text-red-400">
            command not found: {trimmed}. Type <span className="text-white underline">help</span> for command list.
          </p>
        );
    }

    setLogs((prev) => [...prev, { id: logId, command: cmdStr, output }]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInput(history[history.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-[#070707]/90 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono"
    >
      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-muted/80">jayanth@engine-room:~</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-faint">
          <Sparkles className="size-3.5 text-emerald-400" />
          <span>Interactive CLI • Type &apos;help&apos;</span>
        </div>
      </div>

      {/* Terminal log output */}
      <div
        ref={terminalBodyRef}
        className="flex-1 p-6 space-y-4 max-h-[420px] overflow-y-auto font-mono text-xs"
      >
        {logs.map((log) => (
          <div key={log.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-foreground/90">
              <span className="text-emerald-400 font-bold">➜</span>
              <span className="text-muted/60">~</span>
              <span className="text-foreground">{log.command}</span>
            </div>
            <div className="pl-4">{log.output}</div>
          </div>
        ))}

        {/* Active prompt input */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">➜</span>
          <span className="text-muted/60">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'projects', 'skills', 'education', 'contact'..."
            aria-label="Interactive terminal prompt"
            className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted/40 font-mono sm:text-xs"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => handleCommand(input)}
            aria-label="Execute command"
            className="text-faint hover:text-foreground transition-colors"
          >
            <CornerDownLeft className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TerminalWidget;
