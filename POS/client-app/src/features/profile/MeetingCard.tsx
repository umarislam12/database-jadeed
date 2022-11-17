import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import MeetingListItemPlaceholder from '../meetings/dashboard/MeetingListItemPlaceholder'

export default observer(function MeetingCard() {
  const {profileStore}=useStore();
  const {userMeetings, loadProfileMeetings, loadingMeetings}=profileStore;
  const {username, predicate}=useParams<{username:string, predicate:string}>();
  

  return (
    
    loadingMeetings ? (
      <>
      <MeetingListItemPlaceholder />
      <MeetingListItemPlaceholder />
      </>
    ):
    <>    { userMeetings.map((meeting:any)=>(
      <Card as={Link} to={`/meetings/${meeting.id}`} key={meeting.id}>
      <CardHeader>{meeting.agenda}</CardHeader>
      <CardContent>{meeting.meetingDate}</CardContent>
    </Card>
    ))}
   
    
    
      
<h1>hmm</h1>
    
</>
   
   
  )  
})
