import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { moment } from 'meteor/momentjs:moment';
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
    const dayOfTheWeek = moment().format('dddd').toLowerCase();
    let src = '';
    // just the location
    // the location and the rotation (for the pin)
    switch (dayOfTheWeek) {
      case 'monday':
        src = 'images/maps/snackademic-map-mon.jpg';
        break;
      case 'tuesday':
        src = 'images/maps/snackademic-map-tue.jpg';
        break;
      case 'wednesday':
        src = 'images/maps/snackademic-map-wed.jpg';
        break;
      case 'thursday':
        src = 'images/maps/snackademic-map-thu.jpg';
        break;
      case 'friday':
        src = 'images/maps/snackademic-map-fri.jpg';
        break;
      default:
        src = 'images/maps/snackademic-map-no-rotating-trucks.jpg';
        break;
    }
    return (
        <div className="backgroundBlue">
          <Container>
          <br />
          <Header className="cuisine" as="h2" textAlign="center" inverted> Restaurant & Foodtruck Map</Header>
          <Image centered src={src} rounded size='massive'/>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Restaurant</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
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

            </Table.Body>
          </Table>
          <br />
        </Container>
        </div>
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
