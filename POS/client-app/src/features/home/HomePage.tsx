import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
// import UserStore from "../../app/stores/userStore";
const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
        name: "figures",
        
        }
      ]
    },
    {

      name:"public"
    },
    {
      name:"package.json"
    }
],

}
type TEntry={
  name:string;
  children?:TEntry[];
}
function Dumb({name, children}:TEntry) {
  return(
    <div> 
   
    {name}
    {}
 
  </div>
  )
}
export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted vertical textAlign="center" className="masthead">
      <Container text>
        <Header as="h1" inverted textAlign="center">
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="log"
            style={{ marginBottom: 12, marginTop: 12 }}
          />
          POS
        </Header>
        {files.children.map((child)=>{<Dumb {...child}/>})}
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="welcome to POS" />
            <Button as={Link} to="/products" size="huge" inverted>
              Go to products
            </Button>
          </>
        ) : (
          <>
          <Button onClick={()=>modalStore.openModal(<LoginForm/>)} size="huge" inverted>
            login
          </Button>
           <Button onClick={()=>modalStore.openModal(<RegisterForm/>)} size="huge" inverted>
          Register
         </Button>
          
          </>
        )}
      </Container>
    </Segment>
  );
});
