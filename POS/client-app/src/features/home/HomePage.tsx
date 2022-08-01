import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment,Image, Button } from 'semantic-ui-react'

export default function HomePage() {
  return (
    <Segment inverted vertical textAlign='center' className='masthead' >
<Container text >
<Header as='h1' inverted textAlign='center'>
  <Image size='massive' src='/assets/logo.png' alt="log" style={{marginBottom:12, marginTop:12}}/>
  POS
</Header>
<Header as='h2' inverted content="welcome to POS"/>
<Button as={Link} to="/products" size='huge' inverted>Take me to products</Button>

</Container>
    </Segment>
  )
}
