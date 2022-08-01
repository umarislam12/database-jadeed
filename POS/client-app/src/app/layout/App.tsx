import React  from 'react';


import {Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductForm from '../../features/products/form/ProductForm';
import ProductDetails from '../../features/products/details/ProductDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {
 const location=useLocation()
  return (
    < >
    <ToastContainer position='bottom-right' hideProgressBar/>
<Route path='/' exact component={HomePage}/>
      <NavBar />
      <Route path={'/(.+)'} render={()=>(
        <>
         <Container style={{ marginTop: '7em' }}>
        {/* <h1>{productStore.}</h1> */}
        {/* <Button content="add exclamation" positive onClick={productStore.setTitle} /> */}
      <Switch>
      <Route path='/products' exact component={ProductDashboard}/>
      <Route path='/products/:id' component={ProductDetails}/>
      <Route key={location.key} path={['/createProduct', '/manage/:id']} component={ProductForm}/>
      <Route path='/errors' component={TestErrors}/>
      <Route path='/server-error' component={ServerError}/>
      <Route component={NotFound} />
      </Switch>
      </Container>
        </>
      )}/>
     
    </>
  );
}

export default observer(App);
