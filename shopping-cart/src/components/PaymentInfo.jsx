import styles from './PaymentInfo.module.css';

export default function PaymentInfo({ products }) {
    return (
        <div className={styles.payment}>
            <label data-testid="items">
                Total Items: {products.reduce((sum, product) => sum + product.count, 0)}
            </label>
            <label data-testid="price">
                Total Price: ${products.reduce((sum, product) => sum + (product.count * product.price), 0)}
            </label>
        </div>
    );
}