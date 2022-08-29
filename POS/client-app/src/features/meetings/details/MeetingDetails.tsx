import { observer, Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import MeetingDetailedChat from './MeetingDetailedChat';
import MeetingDetailedHeader from './MeetingDetailedHeader';
import MeetingDetailedInfo from './MeetingDetailedInfo';
import MeetingDetailedSidebar from './MeetingDetailedSidebar';


export default observer(function MeetingDetails(){
  const{meetingStore }=useStore();
  const {id}=useParams<{id:string}>();
  const{selectedMeeting:meeting,loadMeeting, loadingInitial}=meetingStore;
  useEffect(() => {
    if(id) loadMeeting(id);
  }, [id,loadMeeting])
  
  if(loadingInitial || !meeting)return <LoadingComponent />
    return(
<Grid>
  <Grid.Column width={10}>
    <MeetingDetailedHeader meeting={meeting}/>
    <MeetingDetailedInfo meeting={meeting}/>
    <MeetingDetailedChat/>
  </Grid.Column>
    <Grid.Column width={6}>
      <MeetingDetailedSidebar/>
    </Grid.Column>
</Grid>
    );
} )