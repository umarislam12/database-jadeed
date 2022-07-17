import { observer, Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ProductDetaildedSidebar from './ProductDetaildedSidebar';
import ProductDetailedChat from './ProductDetailedChat';
import ProductDetailedHeader from './ProductDetailedHeader';
import ProductDetailedInfo from './ProductDetailedInfo';

export default observer(function ProductDetails(){
  const{productStore }=useStore();
  const {id}=useParams<{id:string}>();
  const{selectedProduct:product,loadProduct, loadingInitial}=productStore;
  useEffect(() => {
    if(id) loadProduct(id);
  }, [id,loadProduct])
  
  if(loadingInitial || !product)return <LoadingComponent />
    return(
<Grid>
  <Grid.Column width={10}>
    <ProductDetailedHeader product={product}/>
    <ProductDetailedInfo product={product}/>
    <ProductDetailedChat/>
  </Grid.Column>
    <Grid.Column width={6}>
      <ProductDetaildedSidebar/>
    </Grid.Column>
</Grid>
    );
} )