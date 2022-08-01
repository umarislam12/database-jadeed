import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:10}}/>
                    POS
                </Menu.Item>
                <Menu.Item as={NavLink} to='/products' name="Product" />
                <Menu.Item as={NavLink} to='/errors' name='Errors'>Errors</Menu.Item>
                <Menu.Item >
                    <Button positive content='create product' as={NavLink} to='/createProduct'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}