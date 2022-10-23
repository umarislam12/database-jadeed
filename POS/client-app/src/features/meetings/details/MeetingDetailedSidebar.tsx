import React from "react";
import { Link } from "react-router-dom";
import { Item, Label, List, Segment, Image } from "semantic-ui-react";
import { Meeting } from "../../../app/models/meeting";


interface Props {
  meeting: Meeting
}

export default function MeetingDetailedSidebar({meeting:{ attendees, host} }: Props) {
 if(!attendees) return null;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? "person" : "people"} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
         
   
          {attendees.map(attendee => (
             
            <Item style={{ position: "relative" }} key={attendee.username}>
              {host ? attendee.username===host.username &&
              <Label
                style={{ position: "absolute" }}
                color="orange"
                ribbon="right"
              >
               Host
              
              </Label>:""}
              <Image size="tiny" src={attendee.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`profiles/${attendee.username}`}>
                    {attendee.username} 
                  </Link>
                </Item.Header>
                {attendee.following &&
                <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
              }
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
}
