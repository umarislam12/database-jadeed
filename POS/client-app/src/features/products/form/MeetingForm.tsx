import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik , Form} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { MeetingFormValues } from "../../../app/models/meeting";
export default observer(function MeetingForm() {
  const history = useHistory();
  const { meetingStore } = useStore();
  const {
    createMeeting,
    updateMeeting,
    loading,
    loadMeeting,
    loadingInitial,
  } = meetingStore;
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<MeetingFormValues>(new MeetingFormValues());
const validationSchema= Yup.object({
agenda:Yup.string().required('agenda is required'),

meetingDate: Yup.string().required('meeting date is required'),
})
  useEffect(() => {
    if (id) loadMeeting(id).then((meeting) => setMeeting(new MeetingFormValues(meeting)));
  }, [id, loadMeeting]);

 
  function handleFormSubmit(meeting: MeetingFormValues){
    if(!meeting.id){
      let newMeeting={
        ...meeting, id: uuid()
      };
      createMeeting(newMeeting).then(()=>history.push(`/meetings/${newMeeting.id}`))
    }else{
      updateMeeting(meeting).then(()=>history.push(`/meetings/${meeting.id}`))
    }
  }
  if (loadingInitial)
    return <LoadingComponent content="loading component..." />;
  return (
    <Segment clearing>
      <Header content='Meeting details' sub color="teal" />
      <Formik
      validationSchema={validationSchema}
      enableReinitialize
        initialValues={meeting}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({  handleSubmit, isValid, isSubmitting,dirty }) => (
          <Form className='ui form'onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='agenda' placeholder="agenda" />
          
            <MyDateInput
               placeholderText="meetingDate"
              name="meetingDate"
                 showTimeSelect  
                 timeCaption="time"
                 dateFormat="MMMM d, yyyy h:mm aa"   
            />
            <Button
            disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="submit"
            />
            <Button
              as={Link}
              to="/meetings"
              floated="right"
              type="button"
              content="cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
