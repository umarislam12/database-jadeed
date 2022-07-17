import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function ProductFilter() {
  return (
    <>
   <Menu size='large' style={{width: '100%' , marginTop:25}} vertical>
    <Header attached icon='filter' color='teal' content='filters'/>
    <Menu.Item content='all products'/>
    <Menu.Item content='products below 1000 quantity'/>
    <Menu.Item content='products with 0 quantity'/>

   </Menu>
   <Header/>
   <Calendar />
   </>

  )
}
