import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header({ products }) {
    const cartCount = products.reduce((sum, product) => sum + Number(product.count), 0);
    const unit = cartCount > 1 ? "items" : "item";

    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>Shopping Cart</h1>
            <div className="right">
                <ul className={styles.nav}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link 
                            to="cart" 
                            state={products}>
                                Cart
                        </Link>
                        <label className={styles.cartCount}>{cartCount} {unit}</label>
                    </li>
                </ul>
            </div>
        </div>
    );
}