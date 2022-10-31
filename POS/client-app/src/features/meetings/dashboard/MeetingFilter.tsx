import { observer } from 'mobx-react-lite';
import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer(function MeetingFilter() {
  const{meetingStore:{predicate, setPredicate}}=useStore();
  return (
    <>
   <Menu size='large' style={{width: '100%' , marginTop:25}} vertical>
    <Header attached icon='filter' color='teal' content='filters'/>
    <Menu.Item 
    content='all meetings'
    active={predicate.has('all')}
    onClick={()=>setPredicate('all','true')}
    />
    <Menu.Item content='I am going'
    
    active={predicate.has('isGoing')}
    onClick={()=>setPredicate('isGoing','true')}
    />
    <Menu.Item content='I am hosting'
     active={predicate.has('isHost')}
     onClick={()=>setPredicate('isHost','true')}
    />

   </Menu>
   <Header/>
   <Calendar
   onChange={(date :any)=>setPredicate('startDate',date as Date)}
   value={predicate.get('startDate') || new Date()}
   />
   </>

  )
}
)