import Card from './Card.jsx';

export default function MainContent({ products, onProductCountChange }) {
    return (
        <div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Card product={product} onProductCountChange={onProductCountChange} />
                    </li>
                ))}
            </ul>
        </div>
    );
}