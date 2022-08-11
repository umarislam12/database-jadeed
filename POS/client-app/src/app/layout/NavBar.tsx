import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown, DropdownMenu } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const{userStore:{user,logout}}=useStore();
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
                <Menu.Item position='right'> 
                <Image src={user && user.image || '/assets/user.png'} avatar spaced='right'/></Menu.Item>
                <Dropdown pointing='top left' text={ user! && user.displayName}>
                    <DropdownMenu>
                    
                    <Dropdown.Item  as={Link} to={`/profile/${user && user.username}`} text='my profile' icon='user'/>
                    <Dropdown.Item  onClick={logout} text='Logout' icon='power'/>

                    </DropdownMenu>
                </Dropdown>
            </Container>
        </Menu>
    )
})