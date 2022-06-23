import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'

export default function NavBar() {
    const {productStore}=useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:10}}/>
                    POS
                </Menu.Item>
                <Menu.Item name="Product" />
                <Menu.Item>
                    <Button positive content='create product' onClick={()=>productStore.openForm()}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}