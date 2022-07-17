import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Product } from '../../../app/models/product';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

export default observer(function ProductForm() {
    const history = useHistory();
    const { productStore } = useStore();
    const { createProduct, updateProduct, loading,
        loadProduct, loadingInitial } = productStore;
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState({
        id: '',
        productName: '',
        productNumber: '',
        description: '',
        qtyStock: 0,
        brand: '',
        category: '',
        cost: 0,
        vandor: '',
        wholesalePrice: 0,
        retailPrice: 0,
        packed: false,
        created: "1970-01-01T00:00:01",
        modified: "1970-01-01T00:00:01"

    });

    useEffect(() => {
        if (id) loadProduct(id).then(product => setProduct(product!))
    }, [id, loadProduct])

    function handleSubmit() {
        // product.id ? updateProduct(product): createProduct(product);
        if (product.id.length === 0) {
            let newProduct = {
                ...product, id: uuid()
            }
            createProduct(newProduct).then(() => { history.push(`/products/${newProduct.id}`) })
        }
        else {
            updateProduct(product).then(()=>{
                history.push(`/products/${product.id}`)
            })


        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value })
    }
    if (loadingInitial) return <LoadingComponent content='loading component...' />
    return (
        <Segment clearing >
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='productName' name="productName" value={product.productName} onChange={handleInputChange} />
                <Form.Input placeholder='productNumber' name="productNumber" value={product.productNumber} onChange={handleInputChange} />
                <Form.TextArea placeholder='description' name="description" value={product.description} onChange={handleInputChange} />
                <Form.Input placeholder='qtyStock' name="qtyStock" value={product.qtyStock} onChange={handleInputChange} />
                <Form.Input placeholder='brand' name="brand" value={product.brand} onChange={handleInputChange} />
                <Form.Input placeholder='category' name="category" value={product.category} onChange={handleInputChange} />
                <Form.Input placeholder='cost' name="cost" value={product.cost} onChange={handleInputChange} />
                <Form.Input placeholder='vandor' name="vandor" value={product.vandor} onChange={handleInputChange} />
                <Form.Input placeholder='wholesalePrice' name="wholesalePrice" value={product.wholesalePrice} onChange={handleInputChange} />
                <Form.Input placeholder='retailPrice' name="retailPrice" value={product.retailPrice} onChange={handleInputChange} />
                <Form.Input placeholder='packed' name="packed" value={product.packed} onChange={handleInputChange} />
                <Form.Input label="modified" type='date' placeholder='modified' name="modified" value={product.modified} onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='submit' />
                <Button as={Link} to='/products' floated='right' type='button' content='cancel' />
            </Form>
        </Segment>

    )
})