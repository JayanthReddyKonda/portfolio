"use client";

/**
 * @file TerminalWidget.tsx
 * @description Masterpiece Interactive CLI Terminal for Jayanth Reddy Konda in Emerald Sophistication theme.
 * 
 * Features:
 * - Real system commands: help, projects, skills, education, experience, certifications, contact, clear.
 * - History buffer with Up/Down arrow navigation.
 * - Custom event listener for instant command dispatch from quick action buttons.
 * - Zero external icon dependencies, pure SVG.
 */

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import type { CommandLog } from "@/types/terminal";

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function EnterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}

const INITIAL_LOGS: CommandLog[] = [
  {
    id: "init",
    command: "jayanth --info",
    output: (
      <div className="space-y-1 text-xs text-[#f4f1eb]/80">
        <p className="text-[#f4f1eb] font-semibold">
          Jayanth Reddy Konda // AI &amp; ML Engineer • VNR VJIET (CGPA: 9.1)
        </p>
        <p className="text-[#f4f1eb]/70">
          Specialization: FastAPI • Qdrant RAG • LangChain LCEL • Real-Time WebSockets • Biometric Vision
        </p>
        <p className="text-[#7ba05b]">
          Type <span className="text-[#f4f1eb] font-mono font-bold underline">help</span> to list diagnostic commands.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1 text-[#f4f1eb]/80">
            <div>
              <span className="font-bold text-[#7ba05b]">projects</span> - View 4 real production systems
            </div>
            <div>
              <span className="font-bold text-[#7ba05b]">skills</span> - Full languages &amp; AI framework stack
            </div>
            <div>
              <span className="font-bold text-[#7ba05b]">education</span> - VNR VJIET (CGPA 9.1) &amp; schools
            </div>
            <div>
              <span className="font-bold text-[#7ba05b]">experience</span> - IBM SkillsBuild AI/ML Trainee
            </div>
            <div>
              <span className="font-bold text-[#7ba05b]">certifications</span> - Stanford University ML Spec
            </div>
            <div>
              <span className="font-bold text-[#7ba05b]">contact</span> - Email, phone, GitHub &amp; LinkedIn
            </div>
            <div>
              <span className="font-bold text-[#7ba05b]">clear</span> - Reset terminal screen
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-3 text-xs text-[#f4f1eb]/80">
            <div>
              <p className="text-[#f4f1eb] font-semibold">1. AI Corporate Credit Intelligence Platform (FastAPI, React 19, Qdrant)</p>
              <p>5-service Docker stack, pdfplumber parsing, GST mismatch anomaly detection, CAM report synthesis with Gemini 2.0 Flash embeddings.</p>
            </div>
            <div>
              <p className="text-[#f4f1eb] font-semibold">2. Real-Time Market Anomaly Detection Engine (FastAPI, WebSockets, Kafka, Redis)</p>
              <p>Sub-50ms isolation forest anomaly scoring pipeline, multi-tenant SSE telemetry &amp; dynamic latency thresholding.</p>
            </div>
            <div>
              <p className="text-[#f4f1eb] font-semibold">3. Neural Post-Operative Patient Monitoring System (PyTorch, MediaPipe, OpenCV)</p>
              <p>Multi-camera vital recovery telemetry, 30fps pose/movement tracking, automated critical nurse station alerts.</p>
            </div>
            <div>
              <p className="text-[#f4f1eb] font-semibold">4. Biometric Face Recognition &amp; Spoofing Defense (PyTorch, InsightFace, FastAPI)</p>
              <p>512D ArcFace embeddings, Blink + Texture liveness detection, AES-256 encrypted vector storage &amp; instant match.</p>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1.5 text-xs text-[#f4f1eb]/80">
            <p><span className="text-[#f4f1eb] font-semibold">AI &amp; Deep Learning:</span> PyTorch, MediaPipe, OpenCV, Scikit-learn, InsightFace, TorchScript, TensorRT</p>
            <p><span className="text-[#f4f1eb] font-semibold">RAG &amp; LLM Orchestration:</span> LangChain (LCEL), LlamaIndex, Qdrant Vector DB, Gemini 2.0 Flash, FAISS, Sentence Transformers</p>
            <p><span className="text-[#f4f1eb] font-semibold">Distributed Backend:</span> FastAPI (AsyncIO), Python 3.12, WebSockets, Celery, Redis Cache, PostgreSQL, REST APIs</p>
            <p><span className="text-[#f4f1eb] font-semibold">Frontend &amp; 3D Graphics:</span> Next.js 16 (App Router), React 19, TypeScript, Three.js / WebGL, GSAP, Tailwind CSS</p>
            <p><span className="text-[#f4f1eb] font-semibold">DevOps &amp; Cloud:</span> Docker, Docker Compose, Kubernetes, Git, GitHub Actions, Linux (Ubuntu/Debian)</p>
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-2 text-xs text-[#f4f1eb]/80">
            <div>
              <p className="text-[#f4f1eb] font-semibold">B.Tech in Artificial Intelligence &amp; Data Science</p>
              <p>VNR Vignana Jyothi Institute of Engineering &amp; Technology (VNR VJIET), Hyderabad</p>
              <p className="text-[#7ba05b]">CGPA: 9.10 / 10.0 • Batch 2022 – 2026</p>
            </div>
            <div>
              <p className="text-[#f4f1eb] font-semibold">Senior Secondary (Class XII - MPC)</p>
              <p>Narayana Junior College, Hyderabad • 95.8%</p>
            </div>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-xs text-[#f4f1eb]/80">
            <div>
              <p className="text-[#f4f1eb] font-semibold">AI / Machine Learning Engineering Trainee</p>
              <p className="text-[#7ba05b]">IBM SkillsBuild • June 2024 – July 2024</p>
              <p className="mt-1">Architected mental health anomaly detection models utilizing ensemble classifiers, achieving 92.4% validation F1 score. Deployed automated inference pipeline.</p>
            </div>
          </div>
        );
        break;

      case "certifications":
        output = (
          <div className="space-y-1.5 text-xs text-[#f4f1eb]/80">
            <p>• <span className="text-[#f4f1eb] font-semibold">Machine Learning Specialization</span> - Stanford University &amp; DeepLearning.AI</p>
            <p>• <span className="text-[#f4f1eb] font-semibold">Deep Learning Specialization</span> - DeepLearning.AI</p>
            <p>• <span className="text-[#f4f1eb] font-semibold">Postman API Fundamentals Student Expert</span> - Postman</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs text-[#f4f1eb]/80">
            <p>Email: <a href="mailto:kondajayanthreddy@gmail.com" className="text-[#7ba05b] underline">kondajayanthreddy@gmail.com</a></p>
            <p>Phone: <a href="tel:+917036086060" className="text-[#7ba05b] underline">+91 7036086060</a></p>
            <p>Location: Hyderabad, Telangana, India</p>
            <p>GitHub: <a href="https://github.com/JayanthReddyKonda" target="_blank" rel="noreferrer" className="text-[#7ba05b] underline">github.com/JayanthReddyKonda</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/jayanthreddykonda/" target="_blank" rel="noreferrer" className="text-[#7ba05b] underline">linkedin.com/in/jayanthreddykonda</a></p>
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs text-red-400">
            command not found: &apos;{trimmed}&apos;. Type <span className="text-[#f4f1eb] underline cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent("jrk:run-terminal-command", { detail: { command: "help" } }))}>help</span> to view available commands.
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
      className={`group relative flex flex-col rounded-3xl border border-white/10 bg-[#2d5a4a]/30 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono ${className}`}
    >
      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-[#7ba05b]/80" />
          <span className="ml-2 text-xs text-[#f4f1eb]/70">jayanth@emerald-system:~</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#f4f1eb]/50">
          <SparklesIcon className="size-3.5 text-[#7ba05b]" />
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
            <div className="flex items-center gap-2 text-[#f4f1eb]/90">
              <span className="text-[#7ba05b] font-bold">➜</span>
              <span className="text-[#f4f1eb]/50">~</span>
              <span className="text-[#f4f1eb]">{log.command}</span>
            </div>
            <div className="pl-4">{log.output}</div>
          </div>
        ))}

        {/* Active prompt input */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[#7ba05b] font-bold">➜</span>
          <span className="text-[#f4f1eb]/50">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'projects', 'skills', 'education', 'contact'..."
            aria-label="Interactive terminal prompt"
            className="flex-1 bg-transparent text-base text-[#f4f1eb] outline-none placeholder:text-[#f4f1eb]/40 font-mono sm:text-xs"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => handleCommand(input)}
            aria-label="Execute command"
            className="text-[#f4f1eb]/50 hover:text-[#f4f1eb] transition-colors p-1 cursor-pointer"
          >
            <EnterIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TerminalWidget;
