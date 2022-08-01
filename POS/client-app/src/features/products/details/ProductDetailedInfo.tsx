import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Product } from '../../../app/models/product';


interface Props {
    product: Product
}


export default observer(function ProductDetailedInfo({product}:Props) {
  return (
    <Segment.Group>
    <Segment attached='top'>
        <Grid>
            <Grid.Column width={1}>
                <Icon size='large' color='teal' name='info'/>
            </Grid.Column>
            <Grid.Column width={15}>
                <p>{product.description}</p>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
                <Icon name='calendar' size='large' color='teal'/>
            </Grid.Column>
            <Grid.Column width={15}>
    <span>
      {format(product.modified!, 'dd MMM yyyy h:mm:aa')}
    </span>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
                <Icon name='marker' size='large' color='teal'/>
            </Grid.Column>
            <Grid.Column width={11}>
                <span>{product.qtyStock}, {product.cost}</span>
            </Grid.Column>
        </Grid>
    </Segment>
</Segment.Group>
  )
}
)