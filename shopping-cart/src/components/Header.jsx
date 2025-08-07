import styles from './Header.module.css';

export default function Header({ products, setCurrentPage }) {
    const cartCount = products.reduce((sum, product) => sum + Number(product.count), 0);
    const unit = cartCount > 1 ? "items" : "item";

    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>Shopping Cart</h1>
            <div className="right">
                <ul className={styles.nav}>
                    <li>
                        <button className={styles.homeBtn} onClick={() => setCurrentPage("home")}>Home</button>
                    </li>
                    <li>
                        <button className={styles.cartBtn} onClick={() => setCurrentPage("cart")}>Cart</button>
                        <label className={styles.cartCount}>{cartCount} {unit}</label>
                    </li>
                </ul>
            </div>
        </div>
    );
}