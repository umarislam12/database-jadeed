import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function  ProductList() {
    const{productStore}=useStore();
    const{deleteProduct,loading,ProductsByDate}=productStore;
    const [target, setTarget]=useState('');
    function handleProductDelete(e:SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteProduct(id);
    }
   
    return (
        <Fragment>
            <Item.Group divided>
                
                {ProductsByDate.map(product => (
                    <Item key={product.id}>
                        <Item.Content>
                            <Item.Header as='a'>{product.productName}</Item.Header>
                            <Item.Meta>{product.modified}</Item.Meta>
                            <Item.Description>
                                <div>{product.productNumber}</div>
                                <div>Quantity {product.qtyStock}
                                <div>Cost ${product.cost}</div><div>Retail price ${product.retailPrice}</div></div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' onClick={()=>productStore.selectProduct(product.id)} content='view' color='blue' />
                                <Button 
                                name={product.id}
                                loading={loading && target===product.id} 

                                floated='right'  
                                onClick={(e)=>handleProductDelete(e, product.id)} 
                                content='delete' color='red' />
                                <Label basic content={product.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Fragment>
    )
})