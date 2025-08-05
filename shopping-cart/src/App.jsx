import { useState, useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const products = await fetch('https://fakestoreapi.com/products')
                                    .then(res => res.json())
                                    .then(json => json);

      console.log(products);
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchProducts();
    }

    return () => {
      ignore = true;
    }    
  }, []);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Header />
          <MainContent products={products}/>
        </>
      )}
    </>
  )
}

export default App
