import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';
import { RestaurantCollection } from '../../api/restaurant/RestaurantCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyEatery extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    // eslint-disable-next-line react/prop-types
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Header>
          Feature coming soon.
        </Header>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Map.propTypes = {
  foodTrucksCollection: PropTypes.array.isRequired,
  restaurantCollection: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('FoodTrucksCollection');
  const subscription1 = Meteor.subscribe('RestaurantCollection');
  const subscription2 = Meteor.subscribe('LocationCollection');
  const subscription3 = Meteor.subscribe('HoursCollection');
  return {
    foodTrucksCollection: FoodTrucksCollection.find({}).fetch(),
    restaurantCollection: RestaurantCollection.find({}).fetch(),
    ready: subscription.ready() && subscription1.ready() && subscription2.ready() && subscription3.ready(),
  };
})(MyEatery);
