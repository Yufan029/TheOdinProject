import styles from './Card.module.css';
import { useState } from 'react';

export default function Card({ product, onProductCountChange }) {
    const [inputNumber, setInputNumber] = useState(0);
    
    const canLowerCount = Number(inputNumber) > 0;
    const canRaiseCount = Number(inputNumber) < 999;
    const addCartBtnEnable = Number(inputNumber) > 0 && Number(inputNumber) < 999;

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
                <button 
                    className={styles.addBtn} 
                    disabled={!addCartBtnEnable}
                    onClick={handleAddToCart}>
                        Add to Cart
                </button>
            </div>
        </div>
        
    );
}