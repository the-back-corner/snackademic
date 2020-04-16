import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LocationCollection } from '../../api/location/LocationCollection';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantLocationItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.restaurant.name}</Table.Cell>
          <Table.Cell> test
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantLocationItem.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantLocationItem);
