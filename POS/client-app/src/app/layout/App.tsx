import React, { useEffect } from "react";

import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductForm from "../../features/products/form/ProductForm";
import ProductDetails from "../../features/products/details/ProductDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import MeetingDashboard from "../../features/meetings/dashboard/MeetingDashboard";
import MeetingDetails from "../../features/meetings/details/MeetingDetails";
import ProfilePage from "../../features/profile/ProfilePage";
import MeetingForm from "../../features/products/form/MeetingForm";



function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="loading app.." />;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route path="/" exact component={HomePage} />
      <NavBar />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Container style={{ marginTop: "7em" }}>
              {/* <h1>{productStore.}</h1> */}
              {/* <Button content="add exclamation" positive onClick={productStore.setTitle} /> */}
              <Switch>
                <Route path="/products" exact component={ProductDashboard} />
                <Route path="/meetings" exact component={MeetingDashboard} />
               
                <Route path="/meetings/:id" component={MeetingDetails} />
                <Route path="/products/:id" component={ProductDetails} />
                <Route
                exact
                  key={location.key}
                  path={["/createProduct", "/manage/:id"]}
                  component={ProductForm}
                />
                 <Route
                 exact
                  key={location.key}
                  path={["/createMeeting", "/manageMeeting/:id"]}
                  component={MeetingForm}
                />
                <Route path="/profiles/:username" component={ProfilePage} />
                <Route path="/errors" component={TestErrors} />
                <Route path="/server-error" component={ServerError} />
                <Route path="/login" component={LoginForm} />
                


               
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
