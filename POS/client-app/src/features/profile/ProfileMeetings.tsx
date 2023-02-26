import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Card, Grid, Header, Tab, TabProps } from "semantic-ui-react";
import { UserMeeting } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

const panes = [
  { menuItem: "future meetings", pane: { key: "future" } },
  { menuItem: "past meetings", pane: { key: "past" } },
  { menuItem: "hosting", pane: { key: "hosting" } },
];
export default observer(function ProfileMeetings() {
  const { profileStore } = useStore();
  const { loadProfileMeetings, loadingMeetings, profile, userMeetings } = profileStore;
  useEffect(() => {
    loadProfileMeetings(profile!.username);
    // return ()=>clearSelectedMeeting();
  }, [profile, loadProfileMeetings]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadProfileMeetings(profile!.username, panes[data.activeIndex as
   number].pane.key);
    };
    
  return (
    <Tab.Pane loading={loadingMeetings}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Meetings"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userMeetings.map((meeting: UserMeeting) => (
              <Card
                as={Link}
                to={`/meetings/${meeting.id}`}
                key={meeting.id}
              >
                <Image
                  src={`/assets/categoryImages/$
   {meeting.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{meeting.agenda}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(meeting.meetingDate), "do LLL")}</div>
                    <div>{format(new Date(meeting.meetingDate), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
