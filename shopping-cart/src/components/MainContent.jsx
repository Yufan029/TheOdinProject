import Card from './Card.jsx';
import PaymentInfo from './PaymentInfo.jsx';
import styles from './MainContent.module.css';

export default function MainContent({ products, onProductCountChange, currentPage, onRemoveFromCart }) {
    const hasSelectedItems = products.filter(product => product.count > 0).length > 0;

    return (
        <div>
            {currentPage === "home" || hasSelectedItems ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <Card 
                                product={product} 
                                onProductCountChange={onProductCountChange} 
                                currentPage={currentPage}
                                onRemoveFromCart={onRemoveFromCart} />
                        </li>
                    ))}
                </ul>
            ) : (
                <h2>No item in the shopping cart...</h2>
            )}
            {currentPage === "cart" && (
                <div className={styles.paymentinfo}>
                    <hr />
                    <PaymentInfo products={products} />
                </div>
            )}
        </div>
    );
}