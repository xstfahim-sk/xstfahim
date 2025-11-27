/*
Uncommon Portfolio — Single-file React component
- Tailwind CSS required (JIT preferred)
- Install dependencies: framer-motion, lucide-react, recharts (optional), shadcn/ui (optional)

npm install framer-motion lucide-react recharts

Usage: place this file in a React app (create-react-app / Next.js). Import and render <UncommonPortfolio />.
This file is intentionally self-contained and focuses on advanced UI patterns:
- Dynamic SVG morphing hero
- Procedural particle canvas (lightweight)
- Interactive 3D project cards
- Theme toggle (dark/light) with CSS variables
- Config-driven sections for easy customization
- Accessibility considerations (keyboard focus, aria labels)

Customize: change the `config` object below to populate your content, color tokens, and animations.
*/

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Download, Github, Mail } from "lucide-react";

// ---------- CONFIG ----------
const config = {
    name: "Fahim Dev",
    role: "Full-stack Creative Engineer",
    tagline: "I build delightful products where code and art collide.",
    accent: "#6EE7B7",
    socials: [
        { label: "GitHub", icon: <Github size={18} />, href: "https://github.com/" },
        { label: "Email", icon: <Mail size={18} />, href: "mailto:you@example.com" },
    ],
    projects: [
        {
            id: "nebula-studio",
            title: "Nebula Studio",
            description: "Realtime audio-reactive visuals — shaders + web-audio + wasm.",
            tags: ["WebGL", "Audio", "Shaders"],
            url: "#",
        },
        {
            id: "sui-pump",
            title: "SUI Price Tracker",
            description: "Ultra-fast scanner with fuzzy heuristics and alert engine.",
            tags: ["Sui", "Realtime", "UX"],
            url: "#",
        },
        {
            id: "meme-ai",
            title: "MemeAI",
            description: "Automated meme pipeline with multi-platform distribution.",
            tags: ["Bot", "MLOps", "Social"],
            url: "#",
        },
    ],
};

// ---------- UTIL ----------
const cx = (...classes) => classes.filter(Boolean).join(" ");

// ---------- Particle Canvas (lightweight) ----------
function ParticleCanvas({ accent }) {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w = (canvas.width = canvas.clientWidth);
        let h = (canvas.height = canvas.clientHeight);
        const particles = new Array(55).fill(0).map(() => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 0.5 + Math.random() * 2.5,
            vx: -0.2 + Math.random() * 0.4,
            vy: -0.2 + Math.random() * 0.4,
            life: Math.random() * 300,
        }));

        let raf = null;
        function resize() {
            w = canvas.width = canvas.clientWidth;
            h = canvas.height = canvas.clientHeight;
        }
        window.addEventListener("resize", resize);

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 1;
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;
                if (p.life < 0) {
                    p.x = Math.random() * w;
                    p.y = Math.random() * h;
                    p.life = Math.random() * 300 + 100;
                }
                ctx.beginPath();
                ctx.globalAlpha = 0.18;
                ctx.fillStyle = accent;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            raf = requestAnimationFrame(draw);
        }
        draw();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, [accent]);

    return (
        <canvas
            ref={ref}
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ mixBlendMode: "screen" }}
            aria-hidden
        />
    );
}

// ---------- Morphing Blob (SVG path animation) ----------
function MorphBlob({ color = "#6EE7B7" }) {
    const paths = [
        "M421.5,298Q380,346,333.5,375Q287,404,233.5,397.5Q180,391,147,345Q114,299,108,240Q102,181,141,149Q180,117,232.5,99Q285,81,334.5,106Q384,131,421,171.5Q458,212,421.5,298Z",
        "M421.5,298Q404,384,332,423Q260,462,202.5,430Q145,398,109,349Q73,300,111.5,247Q150,194,201,154Q252,114,318,112Q384,110,415.5,173Q447,236,421.5,298Z",
        "M423.5,300Q394,360,344,393Q294,426,234,424Q174,422,131.5,379Q89,336,93,279Q97,222,141.5,181Q186,140,241,118Q296,96,342.5,127Q389,158,423.5,210Q458,262,423.5,300Z",
    ];
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((s) => (s + 1) % paths.length), 3500);
        return () => clearInterval(t);
    }, []);
    return (
        <svg viewBox="0 0 512 512" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ d: paths[i], pathLength: 1 }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                d={paths[0]}
                fill={color}
                opacity={0.12}
            />
        </svg>
    );
}

// ---------- 3D Project Card ----------
function ProjectCard({ project, accent }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        function onMove(e) {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `rotateY(${dx / 30}deg) rotateX(${-dy / 30}deg) translateZ(0)`;
        }
        function onLeave() {
            el.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <a
            href={project.url}
            className="transform-gpu perspective-1000"
            aria-label={`Open ${project.title}`}
        >
            <div
                ref={ref}
                className="bg-gradient-to-br from-white/6 to-black/6 dark:from-black/30 dark:to-white/2 border border-white/6 dark:border-white/6 rounded-2xl p-6 max-w-sm shadow-2xl backdrop-blur-lg transition-transform ease-out duration-200"
                style={{
                    boxShadow: `0 10px 40px rgba(0,0,0,0.45), 0 2px 8px ${accent}22`,
                }}
            >
                <div className="h-32 rounded-lg mb-4 bg-gradient-to-tr" style={{ background: `linear-gradient(135deg, ${accent}, #7dd3fc)` }} />
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/6">{t}</span>
                    ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs">View</span>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/6"
                    >
                        <Download size={14} />
                        Demo
                    </motion.button>
                </div>
            </div>
        </a>
    );
}

// ---------- Main Component ----------
export default function UncommonPortfolio() {
    const [theme, setTheme] = useState(() => (typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    return (
        <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-black dark:to-slate-900 transition-colors duration-500">
            {/* Particle canvas */}
            <ParticleCanvas accent={config.accent} />

            <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background: `linear-gradient(135deg, ${config.accent}, #60a5fa)` }}>
                        {config.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                        <div className="text-sm font-medium">{config.name}</div>
                        <div className="text-xs text-muted-foreground">{config.role}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {config.socials.map(s => (
                        <a key={s.label} href={s.href} className="text-sm px-3 py-2 rounded-md bg-white/4" aria-label={s.label}>
                            <span className="sr-only">{s.label}</span>
                            {s.icon}
                        </a>
                    ))}
                    <button
                        onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-md bg-white/4"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </div>
            </header>

            <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="col-span-7">
                    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
                        {config.name}
                        <span className="block text-xl font-semibold mt-3 text-muted-foreground">{config.tagline}</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 text-base text-muted-foreground max-w-prose">
                        I design & build production-grade systems and small delightful interactions — from high-performance indexers to playful micro-interactions. This portfolio is a playground for motion, data, and surprising UI.
                    </motion.p>

                    <div className="mt-8 flex gap-4">
                        <motion.a whileHover={{ y: -3 }} className="inline-flex items-center px-5 py-3 rounded-lg font-semibold shadow-lg" style={{ background: `linear-gradient(90deg, ${config.accent}, #60a5fa)` }} href="#projects">See projects</motion.a>
                        <a className="inline-flex items-center px-5 py-3 rounded-lg bg-white/6" href="#contact">Contact</a>
                    </div>

                    <div className="mt-8 text-xs text-muted-foreground">Pro tip: hover any project card to wake its 3D motion. Try it on desktop.</div>
                </div>

                <div className="col-span-5 relative">
                    <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/6 backdrop-blur">
                        <div className="absolute inset-0 -z-10 opacity-100">
                            <MorphBlob color={config.accent} />
                        </div>
                        <div className="p-6 h-full flex flex-col justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground">Selected work</div>
                                <div className="mt-4 grid grid-cols-1 gap-4">
                                    {config.projects.slice(0, 2).map(p => (
                                        <div key={p.id} className="rounded-xl p-4 bg-gradient-to-tr from-white/5 to-white/2 border border-white/4">
                                            <div className="font-semibold">{p.title}</div>
                                            <div className="text-xs mt-2 text-muted-foreground">{p.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-right text-xs text-muted-foreground">Animated Blob • Lightweight particles • 3D cards</div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold">Projects</h2>
                <p className="text-muted-foreground mt-2">Work that blends creative systems and engineering.</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {config.projects.map(p => (
                        <ProjectCard key={p.id} project={p} accent={config.accent} />
                    ))}
                </div>
            </section>

            <section id="features" className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold">Features & Customizations</h2>
                <ul className="mt-4 grid sm:grid-cols-2 gap-4">
                    <li className="p-4 rounded-xl bg-white/4">Procedural particle background (canvas)</li>
                    <li className="p-4 rounded-xl bg-white/4">SVG morphing hero for organic motion</li>
                    <li className="p-4 rounded-xl bg-white/4">Interactive 3D project cards using mouse parallax</li>
                    <li className="p-4 rounded-xl bg-white/4">Theme toggle with prefers-color-scheme support</li>
                    <li className="p-4 rounded-xl bg-white/4">Accessible markup (aria, sr-only)</li>
                    <li className="p-4 rounded-xl bg-white/4">Config-driven content for fast updates</li>
                </ul>
            </section>

            <footer id="contact" className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-lg font-bold">Let's build something unusual</h3>
                        <p className="mt-2 text-muted-foreground">I love projects that are playful, fast, and slightly weird. Send a short brief and I'll respond with a technical sketch.</p>
                        <div className="mt-4 flex gap-3">
                            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/6" href="mailto:you@example.com"><Mail size={16} /> Email</a>
                            <a className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/6" href="#resume">Resume</a>
                        </div>
                    </div>

                    <div>
                        <form className="grid grid-cols-1 gap-3">
                            <label className="sr-only">Name</label>
                            <input className="px-4 py-3 rounded-md bg-transparent border border-white/6" placeholder="Your name" />
                            <label className="sr-only">Email</label>
                            <input className="px-4 py-3 rounded-md bg-transparent border border-white/6" placeholder="Email" />
                            <label className="sr-only">Message</label>
                            <textarea className="px-4 py-3 rounded-md bg-transparent border border-white/6" placeholder="Short brief" rows={4} />
                            <button className="px-4 py-3 rounded-md" style={{ background: `linear-gradient(90deg, ${config.accent}, #60a5fa)` }}>Send</button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {config.name}. Made with code + caffeine.</div>
            </footer>

            {/* Micro styles for muted colors when Tailwind's config missing */}

        </main>
    );
}
