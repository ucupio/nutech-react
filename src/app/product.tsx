import { useEffect, useState } from 'react';

export default function Products() {
  const [product, setProduct] = useState({});
  const getProducts = async () => {
    fetch(
      'https://shark-app-y5u3o.ondigitalocean.app/api/products',
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/JSON',
        },
      }
      // 'https://jsonplaceholder.typicode.com/users'
    )
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((result) => {
        setProduct(result);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log(product);
  }, [product]);
  return <div>Oke</div>;
}
