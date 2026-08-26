"use client";

/**
 * @file TerminalWidget.tsx
 * @description Interactive Developer CLI Diagnostics Terminal for Jayanth Reddy Konda.
 * Features:
 * - Live command parser supporting `projects`, `skills`, `education`, `experience`, `certifications`, `contact`, `help`, `clear`.
 * - Command history navigation with Up/Down arrow keys.
 * - Direct execution via internal state and external global event `jrk:run-terminal-command`.
 * - Auto-scrolling output buffer with formatted real-world technical data.
 */

import React, { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
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
        <p className="text-[#00ADB5]">
          Type <span className="text-white font-mono font-bold underline">help</span> to list diagnostic commands.
        </p>
      </div>
    ),
  },
];

export interface TerminalWidgetProps {
  className?: string;
}

export function TerminalWidget({ className = "" }: TerminalWidgetProps) {
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

  const handleCommand = useCallback((cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setLogs([]);
      setInput("");
      setHistoryIndex(-1);
      inputRef.current?.focus();
      return;
    }

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput("");

    const logId = Math.random().toString(36).substring(2, 9);
    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
            <div>
              <span className="font-bold text-[#00ADB5]">projects</span> - View 4 real production systems
            </div>
            <div>
              <span className="font-bold text-[#00ADB5]">skills</span> - Full languages &amp; AI framework stack
            </div>
            <div>
              <span className="font-bold text-[#00ADB5]">education</span> - VNR VJIET (CGPA 9.1) &amp; schools
            </div>
            <div>
              <span className="font-bold text-[#00ADB5]">experience</span> - IBM SkillsBuild AI/ML Trainee
            </div>
            <div>
              <span className="font-bold text-[#00ADB5]">certifications</span> - Stanford University ML Spec
            </div>
            <div>
              <span className="font-bold text-[#00ADB5]">contact</span> - Email, phone, GitHub &amp; LinkedIn
            </div>
            <div>
              <span className="font-bold text-[#00ADB5]">clear</span> - Reset terminal screen
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
              <p className="text-foreground font-semibold">2. Real-Time Market Anomaly Detection Engine (FastAPI, WebSockets, Kafka, Redis)</p>
              <p>Sub-50ms isolation forest anomaly scoring pipeline, multi-tenant SSE telemetry &amp; dynamic latency thresholding.</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">3. Neural Post-Operative Patient Monitoring System (PyTorch, MediaPipe, OpenCV)</p>
              <p>Multi-camera vital recovery telemetry, 30fps pose/movement tracking, automated critical nurse station alerts.</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">4. Biometric Face Recognition &amp; Spoofing Defense (PyTorch, InsightFace, FastAPI)</p>
              <p>ArcFace 512-dim embeddings, active liveness challenge-response verification, 99.4% authentication accuracy.</p>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs text-muted">
            <p><span className="text-foreground font-semibold">AI &amp; Deep Learning:</span> PyTorch, MediaPipe, OpenCV, Scikit-learn, InsightFace, TorchScript, TensorRT</p>
            <p><span className="text-foreground font-semibold">RAG &amp; LLM Orchestration:</span> LangChain (LCEL), LlamaIndex, Qdrant Vector DB, Gemini 2.0 Flash, FAISS, Sentence Transformers</p>
            <p><span className="text-foreground font-semibold">Distributed Backend:</span> FastAPI (AsyncIO), Python 3.12, WebSockets, Celery, Redis Cache, PostgreSQL, REST APIs</p>
            <p><span className="text-foreground font-semibold">Frontend &amp; 3D Graphics:</span> Next.js 16 (App Router), React 19, TypeScript, Three.js / WebGL, GSAP, Tailwind CSS</p>
            <p><span className="text-foreground font-semibold">DevOps &amp; Cloud:</span> Docker, Docker Compose, Kubernetes, Git, GitHub Actions, Linux (Ubuntu/Debian)</p>
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-2 text-xs text-muted">
            <div>
              <p className="text-foreground font-semibold">B.Tech in Artificial Intelligence &amp; Data Science</p>
              <p>VNR Vignana Jyothi Institute of Engineering &amp; Technology (VNR VJIET), Hyderabad</p>
              <p className="text-[#00ADB5]">CGPA: 9.10 / 10.0 • Batch 2022 – 2026</p>
            </div>
            <div>
              <p className="text-foreground font-semibold">Senior Secondary (Class XII - MPC)</p>
              <p>Narayana Junior College, Hyderabad • 95.8%</p>
            </div>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-xs text-muted">
            <div>
              <p className="text-foreground font-semibold">AI / Machine Learning Engineering Trainee</p>
              <p className="text-[#00ADB5]">IBM SkillsBuild • June 2024 – July 2024</p>
              <p className="mt-1">Architected mental health anomaly detection models utilizing ensemble classifiers, achieving 92.4% validation F1 score. Deployed automated inference pipeline.</p>
            </div>
          </div>
        );
        break;

      case "certifications":
        output = (
          <div className="space-y-1.5 text-xs text-muted">
            <p>• <span className="text-foreground font-semibold">Machine Learning Specialization</span> - Stanford University &amp; DeepLearning.AI</p>
            <p>• <span className="text-foreground font-semibold">Deep Learning Specialization</span> - DeepLearning.AI</p>
            <p>• <span className="text-foreground font-semibold">Postman API Fundamentals Student Expert</span> - Postman</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs text-muted">
            <p>Email: <a href="mailto:kondajayanthreddy@gmail.com" className="text-[#00ADB5] underline">kondajayanthreddy@gmail.com</a></p>
            <p>Phone: <a href="tel:+917036086060" className="text-[#00ADB5] underline">+91 7036086060</a></p>
            <p>Location: Hyderabad, Telangana, India</p>
            <p>GitHub: <a href="https://github.com/JayanthReddyKonda" target="_blank" rel="noreferrer" className="text-[#00ADB5] underline">github.com/JayanthReddyKonda</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/jayanthreddykonda/" target="_blank" rel="noreferrer" className="text-[#00ADB5] underline">linkedin.com/in/jayanthreddykonda</a></p>
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs text-red-400">
            command not found: &apos;{trimmed}&apos;. Type <span className="text-white underline cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent("jrk:run-terminal-command", { detail: { command: "help" } }))}>help</span> to view available commands.
          </div>
        );
        break;
    }

    setLogs((prev) => [...prev, { id: logId, command: trimmed, output }]);
    inputRef.current?.focus();
  }, []);

  // Listen for external command execution events
  useEffect(() => {
    const onExternalCommand = (e: Event) => {
      const customEvent = e as CustomEvent<{ command: string }>;
      if (customEvent.detail?.command) {
        handleCommand(customEvent.detail.command);
      }
    };

    window.addEventListener("jrk:run-terminal-command", onExternalCommand);
    return () => {
      window.removeEventListener("jrk:run-terminal-command", onExternalCommand);
    };
  }, [handleCommand]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
      className={`group relative flex flex-col rounded-3xl border border-white/10 bg-[#1c2129]/90 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono ${className}`}
    >
      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-[#00ADB5]/80" />
          <span className="ml-2 text-xs text-muted/80">jayanth@engine-room:~</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-faint">
          <Sparkles className="size-3.5 text-[#00ADB5]" />
          <span>Interactive CLI • Type &apos;help&apos;</span>
        </div>
      </div>

      {/* Terminal log output */}
      <div
        ref={terminalBodyRef}
        className="flex-1 p-6 space-y-4 max-h-[420px] overflow-y-auto font-mono text-xs select-text"
      >
        {logs.map((log) => (
          <div key={log.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-foreground/90">
              <span className="text-[#00ADB5] font-bold">➜</span>
              <span className="text-muted/60">~</span>
              <span className="text-foreground">{log.command}</span>
            </div>
            <div className="pl-4">{log.output}</div>
          </div>
        ))}

        {/* Active prompt input */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[#00ADB5] font-bold">➜</span>
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
            className="text-faint hover:text-foreground transition-colors p-1 cursor-pointer"
          >
            <CornerDownLeft className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TerminalWidget;
