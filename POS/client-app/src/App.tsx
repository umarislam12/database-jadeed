import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
function App() {
  const [products, setProducts]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/products').then(response=>{
    console.log(response);  
    setProducts(response.data);
    })
  }, [])
  return (
    <div >
      
        <Header as='h2' icon='plug' content="Jadeed"/>
       <List>
         {products.map((product:any)=>(
           <List.Item key={product.id}>
             {product.productName}
           </List.Item>
         ))}
       </List>
      
    </div>
  );
}

export default App;
