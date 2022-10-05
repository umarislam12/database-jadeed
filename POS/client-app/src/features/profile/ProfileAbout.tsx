import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Button, Form, Grid, Header, Input, Label, Tab } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import userStore from "../../app/stores/userStore";
interface Props {
  profile: Profile;
}
export default function ProfileAbout({ profile }: Props) {
    const{profileStore}=useStore();
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Formik
            initialValues={{ DisplayName: "",Bio:"" , error: null }}
            onSubmit={(values, {setErrors}) =>
             profileStore.changeAboutSection(values).catch(
                error=>setErrors({error:"failed to update about section"})
             )
            }
          >
            {({ handleSubmit, isSubmitting, errors }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <Header
                  as="h1"
                  content="change profile"
                  color="teal"
                  textAlign="center"
                />
                <MyTextInput name="DisplayName" placeholder="display name" />
                <MyTextArea rows={10} name="Bio" placeholder="Bio here" />
                <ErrorMessage name='error' render={()=><Label style={{marginBottom:10}} basic color='red' content={errors.error}/>}/>
                <Button loading={isSubmitting} positive  content='Okay' type='submit' fluid/>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
