import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-secondary/30 rounded-3xl p-8 md:p-16 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Interested in building something amazing on Sui or need a secure Web3 solution?
                    Let's connect.
                </p>

                <div className="flex justify-center gap-6">
                    <a href="#" className="p-4 rounded-full bg-background hover:text-accent transition-colors shadow-sm">
                        <Github size={24} />
                    </a>
                    <a href="#" className="p-4 rounded-full bg-background hover:text-accent transition-colors shadow-sm">
                        <Twitter size={24} />
                    </a>
                    <a href="#" className="p-4 rounded-full bg-background hover:text-accent transition-colors shadow-sm">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:hello@example.com" className="p-4 rounded-full bg-background hover:text-accent transition-colors shadow-sm">
                        <Mail size={24} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
