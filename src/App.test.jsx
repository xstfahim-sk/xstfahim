import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
    it('renders the hero section with correct text', () => {
        render(<App />);
        expect(screen.getByText(/HELLO, I'M FAHIM/i)).toBeInTheDocument();
        expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    });

    it('renders the navigation links', () => {
        render(<App />);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/About/i)).toBeInTheDocument();
        // "Work" appears in nav and hero button ("View Work"), so we use getAllByText
        expect(screen.getAllByText(/Work/i).length).toBeGreaterThan(0);
        // "Contact" appears in nav and hero button ("Contact Me")
        expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0);
    });
});
