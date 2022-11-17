import { profile } from 'console'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Tab } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import ProfileAbout from './ProfileAbout'
import ProfileFollowings from './ProfileFollowings'
import ProfileMeetings from './ProfileMeetings'
import ProfilePhotos from './ProfilePhotos'
interface Props{
  profile: Profile;
}
export default observer(function ProfileContent( {profile}:Props) {
  const{profileStore}=useStore();
    const panes=[
        {menuItem:'About', render:()=><ProfileAbout profile={profile}/>},
        {menuItem:'Photos', render:()=><ProfilePhotos profile={profile}/>},
        {menuItem:'Events', render:()=><ProfileMeetings />},
        {menuItem:'Followers', render:()=><ProfileFollowings />},
        {menuItem:'Following', render:()=><ProfileFollowings />}
    ]
  return (
    <Tab panes={panes} menu={{fluid:true,vertical:true }} menuPosition='right' onTabChange={(e,data)=>profileStore.setActiveTab(data.activeIndex)}/>
  )
}
)