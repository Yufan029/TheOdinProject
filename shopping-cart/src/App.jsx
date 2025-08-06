import { useState, useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import MainContent from './components/MainContent';
import Loading from './components/Loading';



function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const results = await fetch('https://fakestoreapi.com/products')
                                    .then(res => res.json())
                                    .then(json => json);
      
      const products = results.map(result => {
        return {
          ...result,
          count: 0,
          selected: false,
        }
      });

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

  function handleProductCountChange(id, count) {
    console.log('id' + id);
    const newProducts = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          count: count,
        }
      } else {
        return product;
      }
    });
    console.log(newProducts);
    setProducts(newProducts);
  }

  return (
    <div className="mainPage">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header products={products} />
          <MainContent products={products} onProductCountChange={handleProductCountChange} />
        </>
      )}
    </div>
  )
}

export default App
