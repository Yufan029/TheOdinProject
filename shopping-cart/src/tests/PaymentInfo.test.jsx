import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { products } from './products.js';
import PaymentInfo from '../components/PaymentInfo';

describe("Payment test", () => {
    it("No item selected, total item equal 0, total price equal 0", () => {
        render(<PaymentInfo products={products}/>);

        expect(screen.getByTestId("items").textContent).toEqual("Total Items: 0");
        expect(screen.getByTestId("price").textContent).toMatch("Total Price: $0");
    });

    it("Select first product, total item equal 1, total price equal 109.95", () => {
        const newProduct = products.map(product => {
            if (product.id === 1) {
                return {
                    ...product,
                    count: 1,
                }
            } else {
                return product;
            }
        });

        render(<PaymentInfo products={newProduct} />);
        
        expect(screen.getByTestId("items").textContent).toEqual("Total Items: 1");
        expect(screen.getByTestId("price").textContent).toMatch("Total Price: $109.95");
    });

        it("Select first product twice, total item equal 2, total price equal 109.95 * 2 = 219.9", () => {
        const newProduct = products.map(product => {
            if (product.id === 1) {
                return {
                    ...product,
                    count: 2,
                }
            } else {
                return product;
            }
        });

        render(<PaymentInfo products={newProduct} />);
        
        expect(screen.getByTestId("items").textContent).toEqual("Total Items: 2");
        expect(screen.getByTestId("price").textContent).toMatch("Total Price: $219.9");
    });

    it("Select first and second product, total item equal 2, total price equal 109.95 + 22.3 = 132.25", () => {
        const newProduct = products.map(product => {
            if (product.id === 1 || product.id == 2) {
                return {
                    ...product,
                    count: 1,
                }
            } else {
                return product;
            }
        });

        render(<PaymentInfo products={newProduct} />);
        
        expect(screen.getByTestId("items").textContent).toEqual("Total Items: 2");
        expect(screen.getByTestId("price").textContent).toMatch("Total Price: $132.25");
    });
});