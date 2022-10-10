import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ProductFormValues } from "../../../app/models/product";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
  const [product, setProduct] = useState<ProductFormValues>(
    new ProductFormValues()
  );
  const validationSchema = Yup.object({
    productName: Yup.string().required("product name is required"),
    productNumber: Yup.string().required("product name is required"),
    description: Yup.string().required('required'),
    qtyStock: Yup.number()
      .required("qty is required"),
    brand: Yup.string().required('required'),
    category: Yup.string().required('required'),
    cost: Yup.number().required('required'),
    vandor: Yup.string().required('required'),
    wholesalePrice: Yup.number().required('required'),
    retailPrice: Yup.number().required('required'),
    packed: Yup.boolean().required('required'),
    created: Yup.string().required('required'),
    modified: Yup.string().required('required'),
  });
  useEffect(() => {
    if (id)
      loadProduct(id).then((product) =>
        setProduct(new ProductFormValues(product))
      );
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
  function handleFormSubmit(product: ProductFormValues) {
    if (!product.id) {
      let newProduct = {
        ...product,
        id: uuid(),
      };
      createProduct(newProduct).then(() =>
        history.push(`/products/${newProduct.id}`)
      );
    } else {
      updateProduct(product).then(() =>
        history.push(`/products/${product.id}`)
      );
    }
  }

  if (loadingInitial)
    return <LoadingComponent content="loading component..." />;
  return (
    <Segment clearing>
      <Header content="product details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={product}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="productName" placeholder="productName" />
            {/* <FormField>
            <Field
              placeholder="productName"
              name="productName"
                         
            />
            <ErrorMessage name='productName' render={error=> <Label basic color="red" content={error} />
            }/>
            </FormField> */}

            <MyTextInput placeholder="productNumber" name="productNumber" />
            <MyTextArea placeholder="description" name="description" rows={3} />
            <MyTextInput placeholder="qtyStock" name="qtyStock" />
            <MyTextInput placeholder="brand" name="brand" />
            <MySelectInput
              options={categoryOptions}
              placeholder="category"
              name="category"
            />
            <MyTextInput placeholder="cost" name="cost" />
            <MyTextInput placeholder="vandor" name="vandor" />
            <MyTextInput placeholder="wholesalePrice" name="wholesalePrice" />
            <MyTextInput placeholder="retailPrice" name="retailPrice" />
            <MyTextInput placeholder="packed" name="packed" />
            <Header content="modified details" sub color="teal" />

            <MyDateInput
              placeholderText="modified"
              name="modified"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
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
