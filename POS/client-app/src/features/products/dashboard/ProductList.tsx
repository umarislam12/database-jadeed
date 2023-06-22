import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Button, Grid, Header, Item, Segment, Table } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';
import ProductListItem from './ProductListItem';
import { Link } from 'react-router-dom';
import ProductSearch from './ProductSearch';

export default observer(function ProductList() {
    const { productStore } = useStore();
    const { groupedProducts, ProductsByDate } = productStore
    useEffect(() => {

    })
    return (
        <>
    <Grid >
                <Grid.Row>
                    <Grid.Column floated='left' width={8}>
                        <ProductSearch />
                        
                    </Grid.Column>
                    <Button  floated='left'>+</Button>
                </Grid.Row>
                </Grid>
            <Table celled inverted selectable>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>product Name</Table.HeaderCell>
                        <Table.HeaderCell>product Number</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Qty</Table.HeaderCell>
                        <Table.HeaderCell>Brand</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Cost</Table.HeaderCell>
                        <Table.HeaderCell>Vendor</Table.HeaderCell>
                        <Table.HeaderCell>Wholesale</Table.HeaderCell>
                        <Table.HeaderCell>Retail</Table.HeaderCell>
                        <Table.HeaderCell>Packing Status</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        {/* <Table.HeaderCell>Modified</Table.HeaderCell> */}
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {ProductsByDate.map((product) =>
                    (
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.productName}</Table.Cell>
                            <Table.Cell>{product.productNumber}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.description}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.qtyStock}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.brand}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.category}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.cost}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.vandor}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.wholesalePrice}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.retailPrice}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.packed}</Table.Cell>
                            <Table.Cell textAlign='right'>{product.created}</Table.Cell>
                            {/* <Table.Cell textAlign='right'>{product.modified}</Table.Cell> */}
                            <Table.Cell textAlign='right'><Button as={Link} to={`/products/${product.id}`} color='teal' floated='right' content='view' /></Table.Cell>
                        </Table.Row>
                    ))
                    }
                </Table.Body>

            </Table>

            {groupedProducts.map(([group, products]) => (
                <Fragment key={group}>
                    <Header sub color='yellow'>
                        {group}
                    </Header>



                    {products.map(product => (<>

                        <ProductListItem product={product} key={product.id} />
                    </>
                    ))}


                </Fragment>
            ))}

        </>
    )
})