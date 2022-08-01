import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, FormField, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Product } from "../../../app/models/product";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik , Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
export default observer(function ProductForm() {
  const history = useHistory();
  const { productStore } = useStore();
  const {
    createProduct,
    updateProduct,
    loading,
    loadProduct,
    loadingInitial,
  } = productStore;
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    id: "",
    productName: "",
    productNumber: "",
    description: "",
    qtyStock: 0,
    brand: "",
    category: "",
    cost: 0,
    vandor: "",
    wholesalePrice: 0,
    retailPrice: 0,
    packed: false,
    created: "1970-01-01T00:00:01",
    modified: null
  });
const validationSchema= Yup.object({
productName:Yup.string().required('product name is required'),
productNumber:Yup.string().required('product name is required'),
description:Yup.string().required(),
qtyStock:Yup.number().required("qty is required").nullable(),
brand:Yup.string().required(),
category:Yup.string().required(),
cost:Yup.number().required(),
vandor:Yup.string().required(),
wholesalePrice:Yup.number().required(),
retailPrice:Yup.number().required(),
packed:Yup.boolean().required(),
created:Yup.string().required(),
modified: Yup.string().required(),
})
  useEffect(() => {
    if (id) loadProduct(id).then((product) => setProduct(product!));
  }, [id, loadProduct]);

  // function handleSubmit() {
  //     // product.id ? updateProduct(product): createProduct(product);
  //     if (product.id.length === 0) {
  //         let newProduct = {
  //             ...product, id: uuid()
  //         }
  //         createProduct(newProduct).then(() => { history.push(`/products/${newProduct.id}`) })
  //     }
  //     else {
  //         updateProduct(product).then(()=>{
  //             history.push(`/products/${product.id}`)
  //         })

  //     }
  // }
  // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //     const { name, value } = event.target;
  //     setProduct({ ...product, [name]: value })
  // }
  function handleFormSubmit(product: Product){

  }
  if (loadingInitial)
    return <LoadingComponent content="loading component..." />;
  return (
    <Segment clearing>
      <Header content='product details' sub color="teal" />
      <Formik
      validationSchema={validationSchema}
      enableReinitialize
        initialValues={product}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({  handleSubmit, isValid, isSubmitting,dirty }) => (
          <Form className='ui form'onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='productName' placeholder="productName" />
            {/* <FormField>
            <Field
              placeholder="productName"
              name="productName"
                         
            />
            <ErrorMessage name='productName' render={error=> <Label basic color="red" content={error} />
            }/>
            </FormField> */}
           
            <MyTextInput
              placeholder="productNumber"
              name="productNumber"
                           
            />
            <MyTextArea
              placeholder="description"
              name="description"
                     rows={3}    
            />
            <MyTextInput
              placeholder="qtyStock"
              name="qtyStock"
                      
            />
            <MyTextInput
              placeholder="brand"
              name="brand"
                   
            />
            <MySelectInput
            options={categoryOptions}
              placeholder="category"
              name="category"
                      
            />
            <MyTextInput
              placeholder="cost"
              name="cost"
                  
            />
            <MyTextInput
              placeholder="vandor"
              name="vandor"
                    
            />
            <MyTextInput
              placeholder="wholesalePrice"
              name="wholesalePrice"
             
              
            />
            <MyTextInput
              placeholder="retailPrice"
              name="retailPrice"
                         
            />
            <MyTextInput
              placeholder="packed"
              name="packed"
                    
            />
                  <Header content='modified details' sub color="teal" />

            <MyDateInput
              
             
              placeholderText="modified"
              name="modified"
                 showTimeSelect  
                 timeCaption="time"
                 dateFormat="MMMM d, yyyy h:mm aa"   
            />
            <Button
            disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="submit"
            />
            <Button
              as={Link}
              to="/products"
              floated="right"
              type="button"
              content="cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
