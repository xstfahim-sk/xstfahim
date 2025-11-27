import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "Sui DeFi Protocol",
        description: "A decentralized exchange built on the Sui blockchain with concentrated liquidity.",
        tags: ["Move", "React", "Sui.js"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
        links: { demo: "#", github: "#" }
    },
    {
        title: "Ethical Hacking Toolkit",
        description: "A suite of tools for penetration testing and vulnerability assessment.",
        tags: ["Python", "Rust", "Security"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop",
        links: { demo: "#", github: "#" }
    },
    {
        title: "AI Prompt Engineer",
        description: "Platform for sharing and optimizing LLM prompts for developers.",
        tags: ["Next.js", "OpenAI API", "Tailwind"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
        links: { demo: "#", github: "#" }
    }
];

const Projects = () => {
    return (
        <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-12 tracking-tight">Selected Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group rounded-2xl overflow-hidden bg-secondary/30 border border-secondary hover:border-accent/50 transition-all duration-300"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground mb-6 line-clamp-2">{project.description}</p>

                                <div className="flex gap-4">
                                    <a href={project.links.demo} className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                    <a href={project.links.github} className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                                        <Github size={16} /> Source
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
