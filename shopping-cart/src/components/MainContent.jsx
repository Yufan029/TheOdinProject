export default function MainContent({ products }) {
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    <img style={{width: 200}} src={product.image}/>
                </li>
            ))}
        </ul>
    );
}