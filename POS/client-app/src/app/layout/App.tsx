import React, { useContext, useEffect, useState } from 'react';


import axios from 'axios';
import {  Container, Header, List } from 'semantic-ui-react';
import { Product } from '../models/product';
import NavBar from './NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
function App() {
  const {productStore}=useStore()
    
  useEffect(() => {
  productStore.loadProducts()
  }, [productStore])
  //view product in productdetail from productList component
 
 
  
  if(productStore.loadingInitial) return <LoadingComponent content='App loading..'/>
  return (
    < >

      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        {/* <h1>{productStore.}</h1> */}
        {/* <Button content="add exclamation" positive onClick={productStore.setTitle} /> */}
        <ProductDashboard
          />
      </Container>
    </>
  );
}

export default observer(App);
