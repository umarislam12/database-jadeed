import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

import { useStore } from '../../../app/stores/store';


import ProductList from './ProductList';



export default observer(function ProductDashboard() {
  const{productStore}=useStore();
  
  const{loadProducts, productRegistry}=productStore;
    
  useEffect(() => {
    console.log('load products running')
  if(productRegistry.size<=1)loadProducts()
  }, [productRegistry.size,loadProducts])
  //view product in productdetail from productList component
 
 
  
  if(productStore.loadingInitial) return <LoadingComponent content='loading products'/>
  return (
    <Grid>
      <Grid.Column width='16'>
        <ProductList  
       
        />
      </Grid.Column>
      <Grid.Column width='4'>
        {/* <ProductFilter/> */}
        {/* {selectedProduct && !editMode &&
        <ProductDetails
     
        />}
        {editMode && 
        <ProductForm  
        />} */}
      </Grid.Column>
    </Grid>
  )
})