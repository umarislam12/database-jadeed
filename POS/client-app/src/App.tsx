import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
function App() {
  const [products, setProducts]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/products').then(response=>{
    console.log(response);  
    setProducts(response.data);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <ul>
         {products.map((product:any)=>(
           <li key={product.id}>
             {product.productName}
           </li>
         ))}
       </ul>
      </header>
    </div>
  );
}

export default App;
