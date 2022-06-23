import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function ProductDetails(){
  const{productStore,  }=useStore();
  const{selectedProduct:product, openForm,cancelSelectedProduct}=productStore;
  if(!product)return <LoadingComponent />
    return(
<Card fluid>
    <Image src={`/assets/categoryImages/${product.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{product.productName}</Card.Header>
      <Card.Meta>
        <span >{product.cost}</span>
      </Card.Meta>
      <Card.Description>
       {product.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button.Group width='2'>
        <Button onClick={()=> openForm(product.id)} basic color='blue' content='Edit'/>
        <Button basic color='grey' onClick={cancelSelectedProduct} content='Cancel'/>
    </Button.Group>
    </Card.Content>
  </Card>
    );
} 