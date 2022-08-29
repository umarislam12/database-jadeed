import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Meeting } from '../../../app/models/meeting';



interface Props {
    meeting: Meeting
}


export default observer(function MeetingDetailedInfo({meeting}:Props) {
  return (
    <Segment.Group>
    <Segment attached='top'>
        <Grid>
            <Grid.Column width={1}>
                <Icon size='large' color='teal' name='info'/>
            </Grid.Column>
            <Grid.Column width={15}>
                <p>{meeting.agenda}</p>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
                <Icon name='calendar' size='large' color='teal'/>
            </Grid.Column>
            <Grid.Column width={15}>
    <span>
      {format(meeting.meetingDate!, 'dd MMM yyyy h:mm:aa')}
    </span>
            </Grid.Column>
        </Grid>
    </Segment>
    <Segment attached>
        <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
                <Icon name='marker' size='large' color='teal'/>
            </Grid.Column>
            <Grid.Column width={11}>
                <span> {meeting.agenda}</span>
            </Grid.Column>
        </Grid>
    </Segment>
</Segment.Group>
  )
}
)