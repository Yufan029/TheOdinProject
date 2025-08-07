import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import { products } from './products';
import userEvent from '@testing-library/user-event';

describe("Card test", () => {
    it("current page is cart, remove button is shown", () => {
        render(<Card product={products[0]} currentPage="cart" />);
        expect(screen.queryByRole("button", { name: "Remove from Cart"}).textContent).toMatch("Remove from Cart");
    });

    it("current page is home, remove button is hidden", () => {
        render(<Card product={products[0]} currentPage="home" />);
        expect(screen.queryByRole("button", { name: "Remove from Cart"})).toBeNull();
    });

    it("Input value is 0 by default, Add to cart button disabled", async () => {
        const user = userEvent.setup();
        const handleCountChange = vi.fn();

        render(<Card 
                    product={products[0]} 
                    currentPage="home"
                    onProductCountChange={handleCountChange} />);

        const addToCart = screen.getByTestId("testid-add");
        await user.click(addToCart);

        expect(handleCountChange).toHaveBeenCalledTimes(0);
    });

    it("Input number equals 1, Add to cart button clicked, handler being called once", async () => {
        const user = userEvent.setup();
        const handleCountChange = vi.fn();

        render(
            <Card 
                product={products[0]}
                currentPage="home"
                onProductCountChange={handleCountChange}
            />
        );

        const input = screen.getByTestId("testid-input");
        await user.clear(input);
        await user.type(input, "1");

        const addToCart = screen.getByRole("button", { name: "Add to Cart" });
        await user.click(addToCart);

        expect(handleCountChange).toBeCalledTimes(1);
        expect(handleCountChange).toHaveBeenCalledWith(products[0].id, 1);
    });

    it("Plus button clicked, input number equals 1", async () => {
        const user = userEvent.setup();

        render(
            <Card
                product={products[0]}
                currentPage="home"
            />
        );

        const plusBtn = screen.getByRole("button", { name: "+" });
        await user.click(plusBtn);

        expect(screen.getByTestId("testid-input").value).toBe("1");
    });
});