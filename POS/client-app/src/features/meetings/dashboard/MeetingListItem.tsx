import format from 'date-fns/format'
import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { Meeting } from '../../../app/models/meeting'
import { useStore } from '../../../app/stores/store'

import MeetingListItemAttendee from './MeetingListItemAttendee'
interface Props{
meeting: Meeting
}

export default observer(function MeetingListItem({meeting}:Props) {
    const {meetingStore}=useStore();
const { deleteMeeting, loading } = meetingStore;
const [target, setTarget] = useState('');
function handleMeetingDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteMeeting(id);
}
  return (
    <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny'  src='/assets/user.png'>
                            <Item.Content>
                                <Item.Header as={Link} to={`/meetings/${meeting.id}`}>
                                  
                                    {meeting.agenda}
                                </Item.Header>
                                <Item.Description>
                                    hosted by bob
                                </Item.Description>
                            </Item.Content>
                        </Item.Image>
                    </Item>
                </Item.Group>


            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />
                    {format(meeting.meetingDate!, 'dd MMM yyyy h:mm')}
                    {/* <Icon name='marker' />
                    {meeting.meetingDate} */}
                </span>
            </Segment>
            <Segment secondary>
                <MeetingListItemAttendee attendees={meeting.attendees!}/>
                </Segment>
            {/* <Segment>
                <span>{product.productNumber}</span>
                <span> {product.qtyStock}</span>
            </Segment> */}
            <Segment clearing>
                <span>{meeting.agenda}</span>
                <Button as={Link} to={`/meetings/${meeting.id}`} color='teal' floated='right' content='view' />
            </Segment>
        </Segment.Group>
  )
}
)