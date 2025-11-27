import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Zap, Database } from 'lucide-react';

const skills = [
    {
        icon: <Code size={32} />,
        title: "Software Engineering",
        description: "Building robust and scalable applications for web and blockchain."
    },
    {
        icon: <Database size={32} />,
        title: "Web3 & DeFi",
        description: "Deep knowledge of Sui ecosystem and decentralized finance protocols."
    },
    {
        icon: <Shield size={32} />,
        title: "Ethical Hacking",
        description: "Ensuring security and integrity of applications through rigorous testing."
    },
    {
        icon: <Zap size={32} />,
        title: "Vibe Coding",
        description: "Crafting intuitive and powerful user experiences with prompt engineering."
    }
];

const About = () => {
    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-12 tracking-tight">What I Do</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
                        >
                            <div className="mb-4 text-accent">{skill.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                            <p className="text-muted-foreground">{skill.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default About;
