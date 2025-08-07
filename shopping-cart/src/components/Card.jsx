import styles from './Card.module.css';
import { useState } from 'react';

export default function Card({ product, onProductCountChange, currentPage, onRemoveFromCart }) {
    const [inputNumber, setInputNumber] = useState(0);
    
    const canLowerCount = Number(inputNumber) > 0;
    const canRaiseCount = Number(inputNumber) < 999;
    const addCartBtnEnable = Number(inputNumber) > 0 && Number(inputNumber) < 999;
    const showRemoveBtn = currentPage === "cart";

    function handleAddToCart() {
        onProductCountChange(product.id, Number(inputNumber));
    }
    
    return (
        <div key={product.id} className={styles.card}>
            <img style={{width: 200}} src={product.image}/>
            <div className={styles.info}>
                <p className={styles.title}>{product.title}</p>
                <p className={styles.price}>${product.price}</p>
                <p className={styles.description}>{product.description}</p>
                <label>
                    Qty:
                    <button 
                        className={styles.minusBtn} 
                        onClick={() => setInputNumber(Number(inputNumber) - 1)} 
                        disabled={!canLowerCount}>
                            -
                    </button>
                    <input 
                        data-testid="testid-input"
                        className={styles.qty}
                        type='text' 
                        maxLength='3' 
                        value={inputNumber} 
                        onChange={(e) => setInputNumber(e.target.value)}/>
                    <button 
                        className={styles.plusBtn} 
                        onClick={() => setInputNumber(Number(inputNumber) + 1)}
                        disabled={!canRaiseCount}>
                            +
                    </button>
                </label>
                <div className={styles.addOrRemoveBtns}>
                    <button 
                        data-testid="testid-add"
                        className={styles.addBtn} 
                        disabled={!addCartBtnEnable}
                        onClick={handleAddToCart}>
                            Add to Cart
                    </button>
                    <button
                        className={styles.removeBtn}
                        hidden={!showRemoveBtn}
                        onClick={() => onRemoveFromCart(product.id)}>
                            Remove from Cart
                    </button>
                </div>
            </div>
        </div>
    );
}