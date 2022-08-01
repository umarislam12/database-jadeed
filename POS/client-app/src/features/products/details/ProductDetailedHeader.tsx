import React from 'react'
import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
const productImageStyle = {
  filter: 'brightness(30%)'
};
const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};
interface Props {
  product: Product
}
export default observer(function ProductDetailedHeader({product}:Props) {
  return (
    <Segment.Group>
    <Segment basic attached='top' style={{padding: '0'}}>
        <Image src={`/assets/categoryImages/${product.category}.jpg`} fluid style={productImageStyle}/>
        <Segment style={activityImageTextStyle} basic>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Header
                            size='huge'
                            content={product.productName}
                            style={{color: 'white'}}
                        />
                        <p>{format(product.modified!, 'dd MMM yyyy')}</p>
                        <p>
                            Hosted by <strong>Bob</strong>
                        </p>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </Segment>
    <Segment clearing attached='bottom'>
        <Button color='teal'>Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color='orange' floated='right' as={Link} to={`/manage/${product.id}`}>
            Manage Product
        </Button>
    </Segment>
</Segment.Group>
  )
})
