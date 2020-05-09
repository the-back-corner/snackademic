import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Grid, Image, Button, Confirm, Feed } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { FavoritesCollection } from '../../api/favorites/favoritesCollection';
import ProfileComponent from '../components/ProfileCard';


/** THIS IS A COPY OF ListStuff.jsx * */

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfilePage extends React.Component {

  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">MY ACCOUNT</Header>
          <Grid verticalAlign="top" columns={2}>
            <Grid.Column width={6}>
              <ProfileComponent/>

            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Reviews</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label icon={'star'} />
                      <Feed.Content>
                        <Feed.Date content='Stir Fresh' />
                        <Feed.Summary>
                          This place is really good. I got the spicy ahi bowl, and was highly satisfied,
                          the food was good, and the service was also excellent as well. Recommend this place.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label icon={'star'} />
                      <Feed.Content>
                        <Feed.Date content='Bale' />
                        <Feed.Summary>
                          I ordered a ham and cheese sandwich. The bread was a bit
                          stale and my sandwich tasted different from the last time I was here.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label icon={'star'} />
                      <Feed.Content>
                        <Feed.Date content='Da Spot' />
                        <Feed.Summary>
                          Great place for big plates of healthy but DELICIOUS food!
                          Honestly, one plate can last for two meals reasonably.
                          Well-priced for the heaping dishes. Can't wait to go back again!
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Favorites</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Summary>
                          {this.props.FavoritesCollection.restaurantName}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column textAlign="center">
              <Button onClick={this.open}>Deactivate My Account</Button>
              <Confirm
                  open={this.state.open}
                  onCancel={this.close}
                  onConfirm={this.close}
              />
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfilePage.propTypes = {
  FavoritesCollection: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionFavorites = Meteor.subscribe('FavoritesCollection');
  return {
    FavoritesCollection: FavoritesCollection.find({}).fetch(),
    ready: subscriptionFavorites.ready(),
  };
})(UserProfilePage);
