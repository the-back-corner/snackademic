
import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { moment } from 'meteor/momentjs:moment';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantLocationItem extends React.Component {
  render() {
    // const dayOfTheWeek = moment().format('dddd').toLowerCase();
    const dayOfTheWeek = moment().format('dddd').toLowerCase();
    // console.log(this.props.restaurantLocation);
    // console.log(this.props.restaurantLocation[dayOfTheWeek]);
    return (
        <Table.Row>
          <Table.Cell>{this.props.restaurant.name}</Table.Cell>
          <Table.Cell> {this.props.restaurantLocation[dayOfTheWeek]}</Table.Cell>
          <Table.Cell>{this.props.restaurantHours[dayOfTheWeek]}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantLocationItem.propTypes = {
  restaurant: PropTypes.object.isRequired,
  restaurantLocation: PropTypes.object.isRequired,
  restaurantHours: PropTypes.object.isRequired,
};


/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantLocationItem);
