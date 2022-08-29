import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import MeetingFilter from './MeetingFilter'
import MeetingList from './MeetingList'

export default observer(function MeetingDashboard() {
  const{meetingStore}=useStore();
  
  const{loadMeetings, meetingRegistry}=meetingStore;
    
  useEffect(() => {
  if(meetingRegistry.size<=1)loadMeetings()
  }, [meetingRegistry.size,loadMeetings])
  //view product in productdetail from productList component
 
 
  
  if(meetingStore.loadingInitial) return <LoadingComponent content='loading meetings'/>
  return (
    <Grid>
      <Grid.Column width='10'>
       
        <MeetingList
     
        />
      </Grid.Column>
      <Grid.Column width='6'>
        <MeetingFilter/>
      
      </Grid.Column>
    </Grid>
  )
})
