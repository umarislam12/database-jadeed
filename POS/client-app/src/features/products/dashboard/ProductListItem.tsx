import { format } from 'date-fns';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Product } from '../../../app/models/product';
import { useStore } from '../../../app/stores/store';
interface Props {
    product: Product
}
export default function productListItem({ product }: Props) {
    const { productStore } = useStore();
    const { deleteProduct, loading } = productStore;
    const [target, setTarget] = useState('');
    function handleProductDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteProduct(id);
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'>
                            <Item.Content>
                                <Item.Header as={Link} to={`/products/${product.id}`}>
                                    {product.productName}

                                </Item.Header>
                                <Item.Description>
                                    {product.description}
                                </Item.Description>
                            </Item.Content>
                        </Item.Image>
                    </Item>
                </Item.Group>


            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />
                    {format(product.modified!, 'dd MMM yyyy h:mm')}
                </span>
            </Segment>
            <Segment secondary>{product.cost}</Segment>
            <Segment>
                <span>{product.productNumber}</span>
                <span> {product.qtyStock}</span>
            </Segment>
            <Segment clearing>
                <Button as={Link} to={`/products/${product.id}`} color='teal' floated='right' content='view' />
            </Segment>
        </Segment.Group>
    )
}
