import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('loading page', () => {
    it('loading is true, show loading page', () => {
        render(<App />) 
        expect(screen.getByRole("heading").textContent).toMatch("Grabbing the products for you...(✿◡‿◡)");
    });
});