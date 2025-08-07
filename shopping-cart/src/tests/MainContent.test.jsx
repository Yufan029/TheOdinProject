import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MainContent from "../components/MainContent";
import { products } from "./products";

describe("Main Content", () => {
    it("cart page, no item in the shopping cart", () => {
        render(<MainContent products={products} currentPage="cart" />);
        expect(screen.getByRole("heading").textContent).toMatch("No item in the shopping cart...");
    });

    it("home page, no heading", () => {
        render(<MainContent products={products} currentPage="home" />);
        expect(screen.queryByRole("heading")).toBeNull();
    });
});