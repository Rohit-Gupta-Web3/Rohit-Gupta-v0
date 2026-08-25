"use client";

import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { withBasePath } from "@/lib/site";
import { trackCta, trackOutbound, trackSectionView } from "@/lib/analytics";

type Theme = "dark" | "light";

const profile = {
  name: "Rohit Gupta",
  initials: "RG",
  roleLine: [
    "AI Product Manager",
    "Technical Product Manager",
    "AI Program Manager",
    "AI Transformation Lead",
    "Emerging Technology Lead",
  ],
  tagline:
    "AI Product & Technical Program leader driving AI transformation across product and program delivery — from agentic AI and voice AI to Web3 and blockchain.",
  location: "Noida, Uttar Pradesh, India",
  email: "gupta.rohitg.rohit900@gmail.com",
  bookingUrl: "https://outlook.office.com/book/RohitGupta@csharp.com/",
  resumeUrl: withBasePath("/Rohit-Gupta-Resume-2026.pdf"),
  x: "https://x.com/RohitGuptaWeb3",
  linkedin: "https://www.linkedin.com/in/rohit-gupta-ai/",
  github: "https://github.com/Rohit-Gupta-Web3",
  available: "Available for select consulting engagements",
};

const stats = [
  { value: "2x", label: "C# Corner MVP", sub: "member since 2019" },
  { value: "314", label: "articles published", sub: "C# Corner" },
  { value: "6", label: "eBooks published", sub: "C# Corner" },
  { value: "2019", label: "member since", sub: "Noida, India" },
];

const pillars = [
  {
    code: "01",
    title: "AI-Native Delivery",
    body: "From voice AI and agentic platforms to LLM cost optimization — I build products where intelligence is the core, not a bolt-on, shipping AI-native with Claude and OpenAI Codex.",
    tags: ["Agentic AI", "Voice AI", "LLM Ops", "Claude · Codex"],
  },
  {
    code: "02",
    title: "Blockchain Engineering",
    body: "Smart-contract systems on EVM, Polygon, and Algorand — secure, auditable, and built for real-world compliance.",
    tags: ["Solidity", "EVM", "Algorand", "Polygon"],
  },
  {
    code: "03",
    title: "Technical Leadership",
    body: "I set architecture, enforce coding standards, run Agile delivery, and mentor engineers into high-performing teams.",
    tags: [".NET 6", "Django", "Azure", "Agile"],
  },
];

const featured = [
  {
    id: "dialtone",
    name: "DialTone",
    category: "Voice AI",
    role: "Product & Tech Lead",
    detail:
      "Multi-tenant AI outbound calling platform for the US market — configurable campaigns, AI voice scripts, compliance rules, telephony, CRM destinations, real-time AI voice conversations, and auditable post-call data.",
    outcomes: [
      { k: "Market", v: "US" },
      { k: "Core", v: "Real-time voice" },
      { k: "Model", v: "Multi-tenant" },
    ],
    tags: ["Voice AI", "Telephony", "Agentic"],
    link: null,
  },
  {
    id: "sharp-ai-agents",
    name: "Sharp AI Agents",
    category: "Agentic AI",
    role: "Product & Tech Lead",
    detail:
      "No-code AI agent platform for creating and deploying agents across web and communication channels, with multi-model support, monitoring, analytics, and integrations.",
    outcomes: [
      { k: "Build", v: "No-code" },
      { k: "Models", v: "Multi-model" },
      { k: "Surface", v: "Web + comms" },
    ],
    tags: ["AI Agents", "No-code", "Platform"],
    link: null,
  },
  {
    id: "llm-cost",
    name: "LLM Cost Optimizer",
    category: "AI FinOps",
    role: "Creator",
    detail:
      "LLM optimization platform covering token-cost estimation, model comparison, prompt optimization, and context engineering — surfacing spend, flagging waste, and recommending routing without hurting quality.",
    outcomes: [
      { k: "Domain", v: "AI FinOps" },
      { k: "Output", v: "Routing" },
      { k: "Stage", v: "Live" },
    ],
    tags: ["LLM Ops", "FinOps", "Analytics"],
    link: "https://llmcostoptimizer.com/",
  },
  {
    id: "sdr-engine",
    name: "SDR / Growth Opportunity Engine",
    category: "Sales Intelligence",
    role: "Product & Tech Lead",
    detail:
      "AI sales-intelligence workflow that researches companies, cross-checks public evidence, builds business profiles, and surfaces qualified outreach opportunities.",
    outcomes: [
      { k: "Focus", v: "Prospecting" },
      { k: "Signal", v: "Public evidence" },
      { k: "Pattern", v: "Agentic" },
    ],
    tags: ["Sales Intel", "Agentic", "Research"],
    link: null,
  },
];

const aiProjects = [
  {
    name: "Nexus",
    client: "B2B Contact Data",
    role: "Product & Tech Lead",
    tags: ["Data", "Enrichment"],
    glyph: "NX",
    link: null,
  },
  {
    name: "HackIndia Learn",
    client: "Gamified Learning",
    role: "Product & Tech Lead",
    tags: ["EdTech", "Web3"],
    glyph: "HL",
    link: null,
  },
  {
    name: "TimeLog",
    client: "Engineering Worklog",
    role: "Product & Tech Lead",
    tags: ["SaaS", "Delivery"],
    glyph: "TL",
    link: null,
  },
  {
    name: "Sharp Economy Analytics",
    client: "Sharp Economy",
    role: "Product & Tech Lead",
    tags: ["Analytics", "Dashboards"],
    glyph: "SA",
    link: null,
  },
];

const web3Projects = [
  {
    name: "Sharp Token",
    client: "Sharp Innovation Foundation",
    role: "Project Manager",
    tags: ["Blockchain", "Polygon"],
    glyph: "ST",
    link: null,
  },
  {
    name: "Sharp Rewards App",
    client: "Sharp Innovation Foundation",
    role: "Product Owner",
    tags: ["Blockchain", "Polygon"],
    glyph: "SR",
    link: null,
  },
  {
    name: "MAPay Credentialing",
    client: "MPayz LLC",
    role: "Technical Lead · DBA",
    tags: ["Algorand", "Healthcare"],
    glyph: "MA",
    link: null,
  },
  {
    name: "MPayz Wallet",
    client: "MPayz LLC",
    role: "Technical Lead",
    tags: ["Django", "Algorand"],
    glyph: "MP",
    link: null,
  },
];

const experience = [
  {
    role: "Tech Lead — Web3",
    org: "Thinkverse Labs",
    period: "Jan 2026 — Present",
    current: true,
    points: [
      "Lead technical design and delivery across Web3 and AI-oriented initiatives",
      "Build and rapidly iterate AI-native apps with Claude and OpenAI Codex",
      "Coordinate engineering across app, API, data, AI, automation, and infra",
      "Drive product and program delivery through iterative execution",
    ],
  },
  {
    role: "Technical Lead",
    org: "MCN Solutions",
    period: "Apr 2022 — Dec 2025",
    points: [
      "Architected and led blockchain + IoT product development",
      "Managed cross-functional teams across Django, .NET 6, Blazor",
      "Enforced coding & testing standards; shipped Agile-driven releases",
      "Mentored engineers and ran R&D initiatives",
    ],
  },
  {
    role: "Technical Trainer",
    org: "MCN Solutions",
    period: "Jul 2019 — Mar 2022",
    points: [
      "Delivered training in JS, Python, C++, SQL, Django",
      "Built hands-on modules and interactive sessions",
      "Trained teams on full-stack & Web3 tools (Polygon, Base)",
    ],
  },
  {
    role: "Technical Writer",
    org: "C# Corner",
    period: "Jul 2019 — Jun 2025",
    points: [
      "Authored 314 articles and 6 eBooks on AI, Python, Web3",
      "Covered ML, OpenVINO, IoT, and Windows 11",
      "Reached thousands of developers worldwide",
    ],
  },
  {
    role: "Program Director",
    org: "C# Corner",
    period: "Dec 2020 — Jun 2022",
    points: [
      "Managed the C# Corner MVP program",
      "Enhanced member engagement and program benefits",
      "Built support and feedback loops",
    ],
  },
];

const skills = [
  {
    group: "AI & Development",
    items: [
      "Claude",
      "OpenAI Codex",
      "LLMs",
      "AI Agents",
      "Prompt Engineering",
      "Context Engineering",
      "Machine Learning",
      "Python",
    ],
  },
  {
    group: "Product & Delivery",
    items: [
      "Product Management",
      "Program Management",
      "Technical Program Mgmt",
      "AI Transformation",
      "Agile",
      "JIRA",
      "ClickUp",
      "Stakeholder Mgmt",
    ],
  },
  {
    group: "Engineering & Web3",
    items: [
      "C# / .NET 6",
      "Solidity",
      "EVM",
      "Polygon",
      "Algorand",
      "Base",
      "Azure",
      "PostgreSQL",
    ],
  },
];

const writing = {
  blurb:
    "I publish what I build — 314 technical articles, 6 eBooks, and years of AI/Web3 writing on C# Corner.",
  topics: [
    "AI & Machine Learning",
    "OpenVINO & Edge AI",
    "Python",
    "Web3 & Smart Contracts",
    "IoT",
    "Windows 11",
  ],
  highlights: [
    {
      title: "Authored 314 articles & 6 eBooks",
      meta: "C# Corner · 2019–2025",
      kind: "Writing",
    },
    { title: "C# Corner MVP", meta: "2x recognition", kind: "Recognition" },
    {
      title: "Intel Edge AI for IoT Nanodegree",
      meta: "Udacity · 2020",
      kind: "Credential",
    },
    {
      title: "Web3 Lead at Sharp Economy",
      meta: "Community + product leadership",
      kind: "Role",
    },
  ],
};

const education = [
  {
    degree: "M.Sc. Informatics",
    school: "Institute of Informatics & Communication, DU",
    period: "2016–2019",
  },
  {
    degree: "Intel Edge AI for IoT Nanodegree",
    school: "Udacity",
    period: "2020",
  },
  {
    degree: "B.Sc. Electronics",
    school: "Sri Aurobindo College",
    period: "2012–2015",
  },
];

const navLinks = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Writing", "#writing"],
  ["Contact", "#contact"],
] as const;

const icons = {
  arrowUpRight: "M7 17 17 7M7 7h10v10",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  x: "M4 4l16 16M20 4 4 20",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  linkedin:
    "M4.5 9.5H8V20H4.5zM6.25 4a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM11 9.5h3.3v1.5h.05c.46-.85 1.6-1.75 3.3-1.75 3.5 0 4.15 2.2 4.15 5.1V20H21.5v-4.9c0-1.2-.02-2.7-1.7-2.7s-1.95 1.3-1.95 2.6V20H14.5z",
  github:
    "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.83.1-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z",
  external:
    "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  sparkle:
    "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5",
  award:
    "M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM8.5 12.5 7 21l5-2.5L17 21l-1.5-8.5",
  brain:
    "M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 6 17a3 3 0 0 0 3 3M9 3a2.5 2.5 0 0 1 3 2.4v13.2A2.5 2.5 0 0 1 9 21M15 3a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 18 17a3 3 0 0 1-3 3M15 3a2.5 2.5 0 0 0-3 2.4",
  link: "M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
} as const;

function Icon({
  name,
  size = 18,
  stroke = 1.6,
  fill = false,
  className,
}: {
  name: keyof typeof icons;
  size?: number;
  stroke?: number;
  fill?: boolean;
  className?: string;
}) {
  const d = icons[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const remaining = () =>
      document.querySelectorAll<HTMLElement>(".rg-reveal:not(.in)");
    const items = remaining();
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    let ioFired = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ioFired = true;
            (entry.target as HTMLElement).classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    items.forEach((el) => io.observe(el));

    const fallback = window.setTimeout(() => {
      if (!ioFired) remaining().forEach((el) => el.classList.add("in"));
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}

function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
} & HTMLAttributes<HTMLElement>) {
  const Tag = as;
  return (
    <Tag
      className={`rg-reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const match = /^(\d+)(\D*)$/.exec(value);
  const isNumeric = Boolean(match);
  const [shown, setShown] = useState(() => (isNumeric ? "0" : value));

  useEffect(() => {
    const match = /^(\d+)(\D*)$/.exec(value);
    if (!match) {
      return;
    }

    const target = Number(match[1]);
    const suffix = match[2] || "";
    const el = ref.current;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const duration = 1100;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - progress, 3);
              setShown(`${Math.round(target * eased)}${suffix}`);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 },
    );

    if (el) io.observe(el);
    return () => io.disconnect();
  }, [isNumeric, value]);

  return <span ref={ref}>{shown}</span>;
}

function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [phase, setPhase] = useState<"type" | "hold" | "delete">("hold");

  useEffect(() => {
    const full = roles[index];
    let timeout: number | undefined;

    if (phase === "hold") {
      timeout = window.setTimeout(() => setPhase("delete"), 2200);
    } else if (phase === "type") {
      if (text.length < full.length) {
        timeout = window.setTimeout(
          () => setText(full.slice(0, text.length + 1)),
          55,
        );
      } else {
        timeout = window.setTimeout(() => setPhase("hold"), 1500);
      }
    } else if (text.length > 0) {
      timeout = window.setTimeout(
        () => setText(full.slice(0, text.length - 1)),
        28,
      );
    } else {
      timeout = window.setTimeout(() => {
        setPhase("type");
        setIndex((current) => (current + 1) % roles.length);
      }, 0);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [index, phase, roles, text]);

  return (
    <div className="rg-role-rotator">
      <span style={{ color: "var(--rg-text-3)" }}>{">"}</span>
      <span className="rg-grad-text">{text}</span>
      <span className="cursor" />
    </div>
  );
}

function BackgroundCanvas({
  accentA,
  accentB,
  intensity = 1,
}: {
  accentA: string;
  accentB: string;
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hot: boolean;
    }> = [];
    let edges: Array<{ a: number; b: number }> = [];
    const pulses: Array<{ a: number; b: number; t: number; speed: number }> =
      [];
    let mouse = { x: -9999, y: -9999 };

    const hexToRgb = (hex: string) => {
      const h = hex.replace("#", "");
      const full =
        h.length === 3
          ? h
              .split("")
              .map((c) => c + c)
              .join("")
          : h;
      const value = Number.parseInt(full, 16);
      return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
    };

    const targetCount = () => {
      const area = width * height;
      const base = Math.min(90, Math.max(28, Math.round(area / 26000)));
      return Math.round(base * (0.5 + intensity * 0.6));
    };

    const build = () => {
      const count = targetCount();
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
        hot: Math.random() < 0.18,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const spawnPulse = () => {
      if (!edges.length) return;
      const edge = edges[(Math.random() * edges.length) | 0];
      pulses.push({
        a: edge.a,
        b: edge.b,
        t: 0,
        speed: 0.012 + Math.random() * 0.02,
      });
    };

    const link = 132;

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const [ar, ag, ab] = hexToRgb(accentA);
      const [br, bg, bb] = hexToRgb(accentB);

      const speed = reduced ? 0 : 0.4 + intensity * 0.9;
      for (const node of nodes) {
        node.x += node.vx * speed;
        node.y += node.vy * speed;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const force = ((16000 - d2) / 16000) * 0.6;
          const dist = Math.sqrt(d2) || 1;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }
      }

      edges = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < link) {
            const opacity = (1 - dist / link) * 0.5;
            ctx.strokeStyle = `rgba(${ar},${ag},${ab},${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            edges.push({ a: i, b: j });
          }
        }
      }

      for (const node of nodes) {
        if (node.hot) {
          ctx.fillStyle = `rgba(${br},${bg},${bb},0.95)`;
          ctx.shadowColor = `rgba(${br},${bg},${bb},0.9)`;
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `rgba(${ar},${ag},${ab},0.7)`;
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const pulse = pulses[i];
        const a = nodes[pulse.a];
        const b = nodes[pulse.b];
        if (!a || !b) {
          pulses.splice(i, 1);
          continue;
        }
        pulse.t += pulse.speed * (reduced ? 0 : 1);
        if (pulse.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        ctx.fillStyle = `rgba(${br},${bg},${bb},1)`;
        ctx.shadowColor = `rgba(${br},${bg},${bb},1)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (
        !reduced &&
        Math.random() < 0.02 * (0.5 + intensity) &&
        pulses.length < 8 + intensity * 6
      ) {
        spawnPulse();
      }

      if (!reduced) {
        raf = window.requestAnimationFrame(step);
      }
    };

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    if (reduced) {
      step();
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      };
    }

    step();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [accentA, accentB, intensity]);

  return <canvas id="rg-bg-canvas" ref={canvasRef} />;
}

function useSectionView() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id], header[id]"),
    );
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !seen.has(id)) {
            seen.add(id);
            // The hero element's id is "top"; report it as "hero".
            trackSectionView(id === "top" ? "hero" : id);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="rg-eyebrow">{children}</span>;
}

function AppLink({
  href,
  children,
  className = "",
  cta,
  ctaLocation,
  onClick,
  ...props
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** GA4 cta_click name, e.g. "book_calendar". Fires trackCta on click. */
  cta?: string;
  /** Where the CTA lives, e.g. "hero" | "nav" | "contact". */
  ctaLocation?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) return;

    const isExternal = /^https?:\/\//.test(href);
    const shouldDeferNavigation = Boolean(cta || isExternal || props.download);

    if (cta) trackCta(cta, ctaLocation ?? "unknown");
    else if (isExternal) trackOutbound(href);

    if (!shouldDeferNavigation || typeof window === "undefined") return;

    event.preventDefault();
    window.setTimeout(() => {
      if (props.download) {
        const anchor = document.createElement("a");
        anchor.href = href;
        if (typeof props.download === "string") {
          anchor.download = props.download;
        } else {
          anchor.download = "";
        }
        anchor.rel = props.rel?.toString() ?? "noopener noreferrer";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        return;
      }

      if (props.target === "_blank") {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.href = href;
    }, 150);
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

type Project = {
  name: string;
  client: string;
  role: string;
  tags: string[];
  glyph: string;
  link: string | null;
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () => trackCta("project_visit", project.name),
      }
    : {};

  return (
    <Reveal delay={(index % 4) * 60}>
      <Wrapper className="rg-card rg-card-glow rg-proj" {...wrapperProps}>
        <div className="top">
          <span className="pglyph">{project.glyph}</span>
          <span className="arrow">
            <Icon name={project.link ? "arrowUpRight" : "link"} size={18} />
          </span>
        </div>
        <h4>{project.name}</h4>
        <span className="client">
          {project.client} - {project.role}
        </span>
        <div className="ptags">
          {project.tags.map((tag) => (
            <span className="rg-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </Wrapper>
    </Reveal>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [scrolled, setScrolled] = useState(false);

  useReveal();
  useSectionView();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  const navButtons = useMemo(
    () =>
      navLinks.map(([label, href]) => (
        <AppLink
          key={href}
          href={href}
          className="rg-nav-link"
          cta={`nav_${label.toLowerCase()}`}
          ctaLocation="nav"
        >
          {label}
        </AppLink>
      )),
    [],
  );

  return (
    <div className="rg-shell">
      <BackgroundCanvas accentA="#3b82f6" accentB="#22d3ee" intensity={1} />
      <div className="rg-bg-grid" />

      <div className="rg-app">
        <nav className={`rg-nav ${scrolled ? "scrolled" : ""}`}>
          <div className="rg-nav-inner">
            <AppLink href="#top" className="rg-logo">
              <span className="rg-logo-mark">RG</span>
              <span>{profile.name}</span>
            </AppLink>

            <div className="rg-nav-links">{navButtons}</div>

            <div className="rg-nav-cta">
              <button
                type="button"
                className="rg-soc"
                onClick={toggleTheme}
                title="Toggle theme"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
                  </svg>
                ) : (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                  </svg>
                )}
              </button>
              <AppLink
                href={profile.bookingUrl}
                className="rg-btn rg-btn-primary rg-btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                cta="book_calendar"
                ctaLocation="nav"
              >
                Book team calendar <Icon name="arrowUpRight" size={15} />
              </AppLink>
            </div>
          </div>
        </nav>

        <main>
          <header className="rg-section rg-hero" id="top">
            <div className="rg-wrap">
              <div className="rg-hero-grid">
                <div>
                  <Reveal className="rg-hero-status">
                    <span className="rg-pill">
                      <span className="rg-dot live" />
                      {profile.available}
                    </span>
                  </Reveal>
                  <Reveal as="h1" delay={60}>
                    <span className="line">{profile.name}</span>
                  </Reveal>
                  <Reveal delay={130}>
                    <RoleRotator roles={profile.roleLine} />
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="rg-hero-lead">{profile.tagline}</p>
                  </Reveal>
                  <Reveal delay={270} className="rg-hero-cta">
                    <AppLink
                      href={profile.bookingUrl}
                      className="rg-btn rg-btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      cta="book_calendar"
                      ctaLocation="hero"
                    >
                      Book team calendar <Icon name="arrowUpRight" size={16} />
                    </AppLink>
                    <AppLink
                      href="#work"
                      className="rg-btn rg-btn-ghost"
                      cta="view_work"
                      ctaLocation="hero"
                    >
                      View selected work
                    </AppLink>
                    <AppLink
                      href={profile.resumeUrl}
                      className="rg-btn rg-btn-ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      cta="download_resume"
                      ctaLocation="hero"
                    >
                      Download résumé <Icon name="doc" size={16} />
                    </AppLink>
                  </Reveal>
                  <Reveal delay={340} className="rg-hero-meta">
                    <div className="m">
                      <span className="v">
                        <CountUp value="7+" />
                      </span>
                      <span className="l">yrs delivery leadership</span>
                    </div>
                    <div className="m">
                      <span className="v">
                        <CountUp value="12" />
                      </span>
                      <span className="l">products shipped</span>
                    </div>
                    <div className="m">
                      <span className="v">
                        <CountUp value="314" />
                      </span>
                      <span className="l">articles published</span>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={180} className="rg-hero-portrait">
                  <div className="rg-portrait-deco" />
                  <div className="rg-portrait-frame">
                      <Image
                      src={withBasePath("/rohit.png")}
                      alt="Rohit Gupta"
                      className="rg-portrait-image"
                      fill
                      priority
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 380px"
                    />
                    <div className="rg-portrait-badge">
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span className="rg-dot" />
                        noida · ind
                      </span>
                      <span style={{ color: "var(--rg-accent-2)" }}>
                        UTC+5:30
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="rg-scroll-hint">
              <span>scroll</span>
              <span className="bar" />
            </div>
          </header>

          <div className="rg-marquee">
            <div className="rg-marquee-track">
              {[
                ...[
                  "Claude",
                  "OpenAI Codex",
                  "AI Agents",
                  "Voice AI",
                  "Python",
                  "Solidity",
                  "Azure",
                  ".NET 6",
                  "Django",
                  "EVM",
                  "Algorand",
                  "Polygon",
                  "Base",
                  "Solana",
                  "Smart Contracts",
                  "LLM Ops",
                  "Agile",
                ],
                ...[
                  "Claude",
                  "OpenAI Codex",
                  "AI Agents",
                  "Voice AI",
                  "Python",
                  "Solidity",
                  "Azure",
                  ".NET 6",
                  "Django",
                  "EVM",
                  "Algorand",
                  "Polygon",
                  "Base",
                  "Solana",
                  "Smart Contracts",
                  "LLM Ops",
                  "Agile",
                ],
              ].map((item, index) => (
                <span className="rg-marquee-item" key={`${item}-${index}`}>
                  <span>{"//"}</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <section className="rg-section" id="about">
            <div className="rg-wrap">
              <div className="rg-about-grid">
                <div>
                  <Reveal>
                    <SectionLabel>01 - Who I am</SectionLabel>
                  </Reveal>
                  <Reveal delay={60}>
                    <h2 className="rg-section-title">
                      I build at the intersection of intelligence and trust.
                    </h2>
                  </Reveal>
                </div>

                <Reveal delay={120} className="rg-about-body">
                  <p>
                    I&apos;m an <strong>AI Product &amp; Technical Program</strong>{" "}
                    leader focused on <strong>AI transformation</strong> and{" "}
                    <strong>emerging technology</strong> — turning agentic AI,
                    voice AI, and LLM systems into shipped products, and aligning
                    delivery across product, program, and engineering.
                  </p>
                  <p>
                    I&apos;m also an <strong>Intel® AI Edge Scholar</strong> and{" "}
                    <strong>2× C# Corner MVP</strong> with deep{" "}
                    <strong>Web3 &amp; blockchain</strong> experience across{" "}
                    <strong>Stratis</strong>, <strong>Algorand</strong>,{" "}
                    <strong>Near</strong>, and <strong>Polygon</strong>, and I
                    write about AI, Web3, and software delivery for the C# Corner
                    community.
                  </p>
                  <div className="rg-edu-list">
                    {education.map((item) => (
                      <div className="rg-edu" key={item.degree}>
                        <div>
                          <div className="d">{item.degree}</div>
                          <div className="s">{item.school}</div>
                        </div>
                        <div className="p">{item.period}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div className="rg-pillars">
                {pillars.map((pillar, index) => (
                  <Reveal
                    key={pillar.code}
                    delay={index * 90}
                    className="rg-card rg-card-glow rg-pillar"
                  >
                    <span className="code">{pillar.code} / 03</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                    <div className="tags">
                      {pillar.tags.map((tag) => (
                        <span className="rg-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="rg-section" style={{ paddingTop: 0 }}>
            <div className="rg-wrap">
              <Reveal className="rg-stats">
                {stats.map((stat) => (
                  <div className="rg-stat" key={stat.label}>
                    <span className="v">
                      <CountUp value={stat.value} />
                    </span>
                    <span className="l">{stat.label}</span>
                    <span className="s">{stat.sub}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="rg-section" id="work">
            <div className="rg-wrap">
              <div className="rg-work-head">
                <div>
                  <Reveal>
                    <SectionLabel>02 - Selected work</SectionLabel>
                  </Reveal>
                  <Reveal delay={60}>
                    <h2 className="rg-section-title">
                      Products I&apos;ve shipped, end to end.
                    </h2>
                  </Reveal>
                </div>
                <Reveal delay={120}>
                  <p className="rg-section-lead" style={{ marginTop: 0 }}>
                    From AI-native tools to blockchain platforms in regulated
                    industries - a selection of what I&apos;ve architected and
                    led.
                  </p>
                </Reveal>
              </div>

              <div className="rg-featured">
                {featured.map((item, index) => (
                  <Reveal
                    key={item.id}
                    delay={index * 60}
                    className="rg-card rg-card-glow rg-case"
                  >
                    <div className="rg-case-body">
                      <div className="rg-case-meta">
                        <span>{item.category}</span>
                        <span>
                          Role · <b>{item.role}</b>
                        </span>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="desc">{item.detail}</p>
                      <div className="rg-case-outcomes">
                        {item.outcomes.map((outcome) => (
                          <div className="o" key={outcome.k}>
                            <span className="ov">{outcome.v}</span>
                            <span className="ok">{outcome.k}</span>
                          </div>
                        ))}
                      </div>
                      <div className="rg-case-foot">
                        <div className="rg-case-tags">
                          {item.tags.map((tag) => (
                            <span className="rg-tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        {item.link ? (
                          <AppLink
                            href={item.link}
                            className="rg-case-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            cta="project_visit"
                            ctaLocation={item.id}
                          >
                            Visit project <Icon name="arrowUpRight" size={14} />
                          </AppLink>
                        ) : (
                          <AppLink
                            href={profile.bookingUrl}
                            className="rg-case-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            cta="walkthrough_request"
                            ctaLocation={item.id}
                          >
                            Walkthrough on request{" "}
                            <Icon name="arrowUpRight" size={14} />
                          </AppLink>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal className="rg-eyebrow" style={{ marginTop: 80 }}>
                AI &amp; product portfolio
              </Reveal>
              <div className="rg-pgrid">
                {aiProjects.map((project, index) => (
                  <ProjectCard key={project.name} project={project} index={index} />
                ))}
              </div>

              <Reveal className="rg-eyebrow" style={{ marginTop: 56 }}>
                Selected Web3 projects
              </Reveal>
              <div className="rg-pgrid">
                {web3Projects.map((project, index) => (
                  <ProjectCard key={project.name} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>

          <section className="rg-section" id="experience">
            <div className="rg-wrap">
              <Reveal>
                <SectionLabel>03 - Trajectory</SectionLabel>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="rg-section-title">
                  A decade of leading, building, and teaching.
                </h2>
              </Reveal>

              <div className="rg-exp-grid">
                <div className="rg-exp-aside">
                  <Reveal>
                    <div className="rg-card rg-pillar" style={{ padding: 28 }}>
                      <span
                        className="code"
                        style={{
                          color: "var(--rg-accent-2)",
                          fontFamily: "var(--rg-mono)",
                          fontSize: 13,
                        }}
                      >
                        {"// expertise"}
                      </span>
                      <div className="rg-skillset" style={{ marginTop: 8 }}>
                        {skills.map((group) => (
                          <div className="rg-skillgroup" key={group.group}>
                            <div className="sg-title">{group.group}</div>
                            <div className="rg-skill-tags">
                              {group.items.map((name) => (
                                <span className="rg-tag" key={name}>
                                  {name}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div className="rg-timeline">
                  {experience.map((item, index) => (
                    <Reveal
                      delay={index * 70}
                      key={`${item.role}-${item.org}`}
                      className={`rg-tl-item ${item.current ? "current" : ""}`}
                    >
                      <div className="rg-tl-period">
                        {item.period}
                        {item.current ? " - now" : ""}
                      </div>
                      <div className="rg-tl-role">{item.role}</div>
                      <div className="rg-tl-org">{item.org}</div>
                      <ul className="rg-tl-points">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rg-section" id="writing">
            <div className="rg-wrap">
              <div className="rg-writing-grid">
                <div>
                  <Reveal>
                    <SectionLabel>04 - Thought leadership</SectionLabel>
                  </Reveal>
                  <Reveal delay={60}>
                    <h2 className="rg-section-title">I teach what I build.</h2>
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="rg-section-lead">{writing.blurb}</p>
                  </Reveal>
                  <Reveal delay={180} className="rg-topic-cloud">
                    {writing.topics.map((topic) => (
                      <span className="rg-pill" key={topic}>
                        {topic}
                      </span>
                    ))}
                  </Reveal>
                </div>

                <Reveal delay={120} className="rg-highlights">
                  {writing.highlights.map((item) => (
                    <div className="rg-hl" key={item.title}>
                      <div className="hl-l">
                        <span className="hl-title">{item.title}</span>
                        <span className="hl-meta">{item.meta}</span>
                      </div>
                      <span className="hl-kind">{item.kind}</span>
                    </div>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>

          <section className="rg-section rg-contact" id="contact">
            <div className="rg-wrap">
              <Reveal className="rg-contact-card">
                <div>
                  <SectionLabel>05 - Let&apos;s build</SectionLabel>
                  <h2 style={{ marginTop: 18 }}>
                    Have an AI or blockchain
                    <br />
                    problem worth solving?
                  </h2>
                  <p className="sub">
                    I take on select consulting engagements — architecture,
                    AI-native product delivery, and technical leadership. Tell
                    me what you&apos;re building.
                  </p>
                  <div className="rg-contact-points">
                    {[
                      {
                        ico: "mail" as const,
                        k: "Email",
                        v: profile.email,
                        href: `mailto:${profile.email}`,
                      },
                      {
                        ico: "pin" as const,
                        k: "Location",
                        v: profile.location,
                        href: null,
                      },
                    ].map((item) => {
                      const inner = (
                        <>
                          <span className="ico">
                            <Icon name={item.ico} size={17} />
                          </span>
                          <span className="ct">
                            <span className="k">{item.k}</span>
                            <span className="v">{item.v}</span>
                          </span>
                        </>
                      );
                      return item.href ? (
                        <a
                          className="rg-cp"
                          key={item.k}
                          href={item.href}
                          onClick={() => trackCta("email", "contact")}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="rg-cp" key={item.k}>
                          {inner}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rg-booking-panel">
                  <span className="rg-eyebrow">Schedule a conversation</span>
                  <h3>Use the team calendar for meetings.</h3>
                  <p>
                    For consulting, partnerships, or serious collaboration
                    requests, book directly with my team. There is no phone
                    intake or contact form on this site.
                  </p>
                  <div className="rg-booking-actions">
                    <AppLink
                      href={profile.bookingUrl}
                      className="rg-btn rg-btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      cta="book_calendar"
                      ctaLocation="contact"
                    >
                      Book team calendar <Icon name="arrowUpRight" size={16} />
                    </AppLink>
                    <AppLink
                      href={`mailto:${profile.email}`}
                      className="rg-btn rg-btn-ghost"
                      cta="email"
                      ctaLocation="contact"
                    >
                      Email instead <Icon name="mail" size={16} />
                    </AppLink>
                    <AppLink
                      href={profile.resumeUrl}
                      className="rg-btn rg-btn-ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      cta="download_resume"
                      ctaLocation="contact"
                    >
                      Download résumé <Icon name="doc" size={16} />
                    </AppLink>
                  </div>
                  <p className="rg-booking-note">
                    Replies are routed through email and the team booking page.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="rg-footer">
          <div className="rg-wrap rg-footer-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                className="rg-logo-mark"
                style={{ width: 30, height: 30, fontSize: 13 }}
              >
                RG
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>
                  {profile.name}
                </div>
                <div className="copy">
                  AI Product & Technology Leader
                </div>
              </div>
            </div>
            <div className="copy">
              © 2026 - built for the next decade of AI.
            </div>
            <div className="rg-footer-soc">
              {[
                { ico: "x" as const, href: profile.x, fill: false },
                {
                  ico: "linkedin" as const,
                  href: profile.linkedin,
                  fill: true,
                },
                { ico: "github" as const, href: profile.github, fill: true },
              ].map((item) => (
                <a
                  key={item.ico}
                  className="rg-soc"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ico}
                  onClick={() => trackOutbound(item.href, item.ico)}
                >
                  <Icon name={item.ico} size={18} fill={item.fill} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

