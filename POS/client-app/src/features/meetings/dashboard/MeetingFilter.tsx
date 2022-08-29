import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function MeetingFilter() {
  return (
    <>
   <Menu size='large' style={{width: '100%' , marginTop:25}} vertical>
    <Header attached icon='filter' color='teal' content='filters'/>
    <Menu.Item content='all meetings'/>
    <Menu.Item content='meetings before 2023 quantity'/>
    <Menu.Item content='meetings with 0 attendees'/>

   </Menu>
   <Header/>
   <Calendar />
   </>

  )
}
