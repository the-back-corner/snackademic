import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';
import { RestaurantCollection } from '../../api/restaurant/RestaurantCollection';
import { LocationCollection } from '../../api/location/LocationCollection';
import { HoursCollection } from '../../api/hours/HoursCollection';
import RestaurantLocationItem from '../components/RestaurantLocationItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Map extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
     const src = 'images/maps/snackademic-map-no-rotating-trucks.jpg';
    return (
        <Container>
          <Header as="h2" textAlign="center">Map</Header>
          <div>
          <Image src={src} rounded size='massive'/>
              {this.props.foodTrucksCollection.map((foodTruck) => {
                const restaurantLocation = LocationCollection.find({ restaurantName: foodTruck.name }).fetch()[0];
                const restaurantHours = HoursCollection.find({ restaurantName: foodTruck.name }).fetch()[0];
                // console.log(restaurantHours);
                return (
                <RestaurantLocationItem
                  key={foodTruck._id}
                  restaurant={foodTruck}
                  restaurantLocation={restaurantLocation}
                  restaurantHours={restaurantHours}
                />);
                })
              }
              {this.props.restaurantCollection.map((restaurant) => {
                const restaurantLocation = LocationCollection.find({ restaurantName: restaurant.name }).fetch()[0];
                const restaurantHours = HoursCollection.find({ restaurantName: restaurant.name }).fetch()[0];
                // console.log(restaurantHours);
                return (
                    <RestaurantLocationItem
                        key={restaurant._id}
                        restaurant={restaurant}
                        restaurantLocation={restaurantLocation}
                        restaurantHours={restaurantHours}
                    />);
                })
              }
          </div>
        </Container>
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
})(Map);
