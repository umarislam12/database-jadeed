import { Field, FieldProps, Form, Formik, validateYupSchema } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Comment, Button, Loader } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
interface Props {
  meetingId: string;
}
export default observer(function MeetingDetailedChat({ meetingId }: Props) {
  const { commentStore } = useStore();
  useEffect(() => {
    if (meetingId) {
      commentStore.createHubConnection(meetingId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, meetingId]);
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <Formik
            onSubmit={(values, { resetForm }) =>
              commentStore.addComment(values).then(() => resetForm())
            }
            initialValues={{ body: "" }}
            validationSchema={Yup.object({
              body: Yup.string().required()
            })}
          >
            {({ isSubmitting, isValid, handleSubmit }) => (
              <Form className="ui form">
              <Field name='body'>
                {(props: FieldProps)=>(
                  <div style={{position:'relative'}}>
                    <Loader active={isSubmitting} />
                    <textarea placeholder="Enter your comment(enter to submit, shift+enter for new line)"/>
                  </div>
                )}
              </Field>
              </Form>
            )}
          </Formik>
        </Comment.Group>
      </Segment>
    </>
  );
});
