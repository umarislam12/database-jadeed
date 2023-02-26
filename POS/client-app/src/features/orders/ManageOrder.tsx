import React from 'react'
import { Button, Grid, GridColumn } from 'semantic-ui-react'
import SearchBar from './SearchBar'

const ManageOrder = () => {
    return (
        <>
            <h1>Manage Order</h1>
            <Grid >
                <Grid.Row>
                    <Grid.Column floated='left' width={8}>
                        <SearchBar />
                        
                    </Grid.Column>
                    <Button  floated='left'>+</Button>
                </Grid.Row>
                <Grid.Column floated='right' width={8}>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={2}>Qty</Grid.Column>
                            <Grid.Column width={2}>Total Amount</Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2}>Order:</Grid.Column>
                            <Grid.Column width={2}>15</Grid.Column>
                            <Grid.Column width={2}>$4899</Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>

            <br />
        </>
    )
}

export default ManageOrder