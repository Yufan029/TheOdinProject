import { useLocation } from 'react-router-dom';

export default function Cart() {
    const location = useLocation();
    const products = location.state || {};
    console.log(location);
    console.log(products);
    return (
        <>
            <div>haa</div>
        </>
    );
}