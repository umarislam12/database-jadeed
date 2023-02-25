import React from 'react'
import { Label, Table } from 'semantic-ui-react'

const OrderTable = () => {
  return (
    <div>
<Table celled>
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Order Id</Table.HeaderCell>
            <Table.HeaderCell>Order Data</Table.HeaderCell>
            <Table.HeaderCell>Product Id</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Customer Id</Table.HeaderCell>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Qty</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        <Table.Row>
            <Table.Cell><Label ribbon>First</Label></Table.Cell>
            <Table.Cell>second</Table.Cell>
        </Table.Row>
    </Table.Body>
</Table>

    </div>
  )
}

export default OrderTable