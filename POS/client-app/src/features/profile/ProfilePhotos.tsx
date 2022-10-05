import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";

import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
interface Props {
  profile: Profile;
}
export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: { isCurrentUser,uploadPhoto,uploading,loading,setMainPhoto,deletePhoto },
  } = useStore();
  const [addPhotoMode, setAddPhotMode] = useState(false);
  const[target, setTarget]=useState('');
 
  function handlePhotoUpload(photo:Blob){
uploadPhoto(photo).then(()=>setAddPhotMode(false))
  }
  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }
  function handleDeletePhoto(photo:Photo, e:SyntheticEvent<HTMLButtonElement>){
setTarget(e.currentTarget.name);
deletePhoto(photo);
  }
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
           <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos!.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} alt="no photos" />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button basic color="green" content='main' name={'main' + photo.id} disabled={photo.isMain} 
                      onClick={(e)=>handleSetMainPhoto(photo,e)} 
                      loading={target==='main'+ photo.id && loading}/>

                      <Button basic color="red" icon="trash" loading={target ===photo.id && loading} onClick={e=>handleDeletePhoto(photo,e)} 
                      name={photo.id} disabled={photo.isMain}/>
                    </Button.Group>   
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
