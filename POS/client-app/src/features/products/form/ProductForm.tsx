import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import { useStore } from '../../../app/stores/store';

export default observer(function ProductForm() {
    const {productStore}= useStore();
    const {selectedProduct, closeForm, createProduct, updateProduct,loading}=productStore;
    const initialState = selectedProduct || {
        id:'',
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
        created:"1970-01-01T00:00:01",
        modified:"1970-01-01T00:00:01"

    }
    const [product, setProduct] = useState(initialState);

    function handleSubmit() {
product.id ? updateProduct(product): createProduct(product);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setProduct({...product, [name]:value})
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
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
                <Button onClick={closeForm} floated='right' type='button' content='cancel' />
            </Form>
        </Segment>

    )
})