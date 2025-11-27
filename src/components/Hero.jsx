import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-accent font-medium mb-4 tracking-wide">HELLO, I'M FAHIM</h2>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                        Software <br className="hidden sm:block" />
                        <span className="text-muted-foreground">Engineer.</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                        I build things for the <span className="text-foreground font-semibold">Sui Ecosystem</span> and <span className="text-foreground font-semibold">Web3 DeFi</span>.
                        Specialized in ethical hacking, prompt engineering, and <span className="italic text-accent">vibe coding</span>.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#work"
                            className="group inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-300"
                        >
                            View Work
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 border border-secondary px-8 py-4 rounded-full font-medium hover:bg-secondary transition-all duration-300"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="/hero-image.png"
                            alt="Fahim Rahmand"
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="absolute -inset-4 bg-accent/20 blur-3xl -z-10 rounded-full opacity-50"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
