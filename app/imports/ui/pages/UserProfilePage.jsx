import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

/** THIS IS A COPY OF ListStuff.jsx **/

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfilePage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">MY ACCOUNT</Header>
          <Header as="h4" textAlign="center"> Idk what to put here.... but this is here if we want it </Header>
          <Image src='https://i.redd.it/7bmh29ww5kt41.jpg' size= 'large'/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfilePage.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserProfilePage);
