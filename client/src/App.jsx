import React from 'react';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_PRODUCTS = gql`
  query GetProductsList {
    getProducts {
      _id
      name
      desc
      image
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <h2>Loading Products...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Products List</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {data?.getProducts?.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '200px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;