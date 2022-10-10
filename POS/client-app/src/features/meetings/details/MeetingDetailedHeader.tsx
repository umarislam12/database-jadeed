import { observer } from "mobx-react-lite";
import React from "react";
import { Meeting } from "../../../app/models/meeting";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
const meetingImageStyle = {
  filter: "brightness(30%)",
};
const meetingImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "black",
};
interface Props {
  meeting: Meeting;
}

export default observer(function MeetingDetailedHeader({ meeting }: Props) {
  const {meetingStore:{updateAttendence, loading}}=useStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${meeting.attendees}.jpg`}
          fluid
          style={meetingImageStyle}
        />
        <Segment style={meetingImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={meeting.agenda}
                  style={{ color: "white" }}
                />
                <p>{format(meeting.meetingDate!, "dd MMM yyyy")}</p>
                <p>
                  Hosted by <strong><Link to={`/profles/${meeting.host && meeting.host.username}`}>{meeting.host && meeting.host.displayName}</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {meeting.isHost ? (
          <Button
            color="orange"
            floated="right"
            as={Link}
            to={`/manageMeeting/${meeting.id}`}
          >
            Manage Meeting
          </Button>
        ) : meeting.isGoing ? (
          <Button loading={loading} onClick={updateAttendence}>Cancel attendance</Button>
        ) : (
          <Button loading={loading} onClick={updateAttendence} color="teal">Join Activity</Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
