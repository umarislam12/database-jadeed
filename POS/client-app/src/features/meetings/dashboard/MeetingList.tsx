import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import MeetingListItem from "./MeetingListItem";

export default observer(function MeetingList() {
  const { meetingStore } = useStore();
  const { groupedMeetings } = meetingStore;
  return (
    <>
      <h1> meeting list</h1>
      {groupedMeetings.map(([group, meetings]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {meetings.map((meeting) => (
            <MeetingListItem meeting={meeting} key={meeting.id} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
