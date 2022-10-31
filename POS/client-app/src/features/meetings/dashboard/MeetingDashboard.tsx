import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Button, Grid, Loader } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { PagingParams } from '../../../app/models/pagination'
import { useStore } from '../../../app/stores/store'
import MeetingFilter from './MeetingFilter'
import MeetingList from './MeetingList'
import MeetingListItemPlaceholder from './MeetingListItemPlaceholder'

export default observer(function MeetingDashboard() {
  const{meetingStore}=useStore();
  
  const{loadMeetings, meetingRegistry, setPagingParams,pagination}=meetingStore;
    
  const[loadingNext, setLoadingNext]=useState(false);

    function handleGetNext(){
      setLoadingNext(true);
      setPagingParams(new PagingParams(pagination!.currentPage +1));
      //when we update pagingparams in above line our axios computed property get upated and thats waht is gona 
      //get passed to loadmeetings
      loadMeetings().then(()=>setLoadingNext(false))
    }

  useEffect(() => {
  if(meetingRegistry.size<=1)loadMeetings()
  }, [meetingRegistry.size,loadMeetings])
  //view product in productdetail from productList component
 
 
  
  // if(meetingStore.loadingInitial && !loadingNext) return <LoadingComponent content='loading meetings'/>

  return (
    <Grid>
      <Grid.Column width='10'>
        {meetingStore.loadingInitial && !loadingNext ? (
          <>
          <MeetingListItemPlaceholder />
          <MeetingListItemPlaceholder />
          </>
        ):
        <InfiniteScroll pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
        initialLoad={false}
        >
 
         <MeetingList/>
 
 
        </InfiniteScroll>
        }
      
     
        {/* <Button floated='right'
        content='more..'
        positive
        onClick={handleGetNext}
        loading={loadingNext}
        disabled={pagination ? pagination.totalPages ===  pagination.currentPage : true}
        /> */}
      </Grid.Column>
      <Grid.Column width='6'>
        <MeetingFilter/>
      
      </Grid.Column>
      <Grid.Column width={10}>
<Loader active={loadingNext}/>
      </Grid.Column>
    </Grid>
  )
})
