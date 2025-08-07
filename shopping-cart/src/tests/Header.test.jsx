import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { products } from './products';

describe("Header component", () => {
    it("Home button clicked once", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Header products={products} setCurrentPage={handleClick}/>);

        const homeBtn = screen.getByRole("button", { name: "Home" });
        const cartBtn = screen.getByRole("button", { name: "Cart" });
        await user.click(homeBtn);
        await user.click(cartBtn);

        expect(handleClick).toHaveBeenCalledTimes(2);
    });
});
