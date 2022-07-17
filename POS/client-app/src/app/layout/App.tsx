import React  from 'react';


import {Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductForm from '../../features/products/form/ProductForm';
import ProductDetails from '../../features/products/details/ProductDetails';
function App() {
 const location=useLocation()
  return (
    < >
<Route path='/' exact component={HomePage}/>
      <NavBar />
      <Route path={'/(.+)'} render={()=>(
        <>
         <Container style={{ marginTop: '7em' }}>
        {/* <h1>{productStore.}</h1> */}
        {/* <Button content="add exclamation" positive onClick={productStore.setTitle} /> */}
      
      <Route path='/products' exact component={ProductDashboard}/>
      <Route path='/products/:id' component={ProductDetails}/>
      <Route key={location.key} path={['/createProduct', '/manage/:id']} component={ProductForm}/>
      </Container>
        </>
      )}/>
     
    </>
  );
}

export default observer(App);
