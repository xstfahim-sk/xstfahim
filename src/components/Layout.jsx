import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white">
            <Header />
            <main className="pt-16">
                {children}
            </main>
            <footer className="py-8 text-center text-muted-foreground text-sm border-t border-secondary mt-20">
                <p>&copy; {new Date().getFullYear()} Fahim Rahmand. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
