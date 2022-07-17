import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';
import ProductListItem from './ProductListItem';

export default observer(function ProductList() {
    const { productStore } = useStore();
    const { groupedProducts } = productStore

    return (
        <>
            {groupedProducts.map(([group, products]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    
                            {products.map(product => (
                                <ProductListItem product={product} key={product.id} />
))}
                   
                    
                </Fragment>
            ))}

        </>
    )
})