import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItem from '../components/StuffItem';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import PortalButton from '../components/PortalButton';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyEatery extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="backgroundBlue">
        <Container>
          <br />
          <Header className="firstHeader" textAlign="center">My Eatery</Header>
          <Card centered>
            <Card.Content textAlign="center">
              {/* eslint-disable-next-line max-len */}
              <Image size='medium' src='https://dynamic.brandcrowd.com/asset/logo/8e2573bf-2704-43e0-9eba-3bd3f4e22293/logo?v=4'/>
            </Card.Content>
            <Card.Content>
                  Restaurant name:
            </Card.Content>
            <Card.Content>
              Type of Cuisine:
            </Card.Content>
            <Card.Content>
              Hours:
            </Card.Content>
            <Card.Content extra>
              Menu
            </Card.Content>
          </Card>
        <br />
        </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
MyEatery.propTypes = {
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
})(MyEatery);
