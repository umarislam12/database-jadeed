import { observer } from "mobx-react-lite";
import React from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  ItemGroup,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
interface Props{
    profile:Profile
}
export default observer(function ProfileHeader({profile}:Props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <ItemGroup>
            <Item>
              <Item.Image avatar size="small" src={profile.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName} />
              </Item.Content>
            </Item>
          </ItemGroup>
        </Grid.Column>
        <Grid.Column width={4}>
            <Statistic.Group width={2}>
                <Statistic label="followers" value={3} />
                <Statistic label="following" value={2} />
            </Statistic.Group>
            <Divider />
            <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                <Button  fluid color="teal" content="following" />
                </Reveal.Content>

                <Reveal.Content hidden style={{ width: "100%" }}>
                <Button
                    basic
                    fluid
                    color={true ? "red" : "green"}
                    content={true ? "unfollow" : "follow"}
                />
                </Reveal.Content>
            </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
)