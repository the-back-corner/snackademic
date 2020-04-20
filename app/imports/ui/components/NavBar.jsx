import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { RestaurantCollection } from '../../api/restaurant/RestaurantCollection';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const restaurantCollection = RestaurantCollection.find().fetch();
    const foodTrucksCollection = FoodTrucksCollection.find().fetch();
    // restaurantCollection.map((restaurant) => console.log(restaurant.name));
    // foodTrucksCollection.map((foodTruck) => console.log(foodTruck.name));
    const menuStyle = { marginBottom: '5px' };
    return (
        // <Menu pointing secondary borderless inverted className="topmenu">
        <Menu inverted borderless className="topmenu">
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header className="headertext" inverted as='h1'>SNACKADEMIC</Header>
          </Menu.Item>
          <Menu.Item position="right" as={NavLink} activeClassName="" exact to="/map">
            <Header className="headertext" inverted as='h3'>LOCATIONS</Header>
          </Menu.Item>
          <Menu.Item>
            <Dropdown text="FOODTRUCKS" as="h3">
              <Dropdown.Menu>
                {foodTrucksCollection.map((foodTruck) => (
                    <Dropdown.Item key={foodTruck._id} text={foodTruck.name}
                                   as={NavLink} activeClassName="" exact to={`/foodtruck/${foodTruck._id}`}/>))
                }
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item>
            <Dropdown text="RESTAURANTS" as="h3">
              <Dropdown.Menu>
                {restaurantCollection.map((restaurant) => (
                    <Dropdown.Item key={restaurant._id} text={restaurant.name}/>))
                }
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header className="headertext" inverted as='h3'>MENUS</Header>
          </Menu.Item>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header className="headertext" inverted as='h3'>HOURS</Header>
          </Menu.Item>
          { /*  {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
           <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>]
            ) : ''} */ }
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item>
            {this.props.currentUser === '' ? (
                <Dropdown text="SIGN IN" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="SIGN IN" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="REGISTER" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="ACCOUNT" as={NavLink} exact to="/userprofile"/>
                    <Dropdown.Item icon="sign out" text="SIGN OUT" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>

    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const subscription = Meteor.subscribe('RestaurantCollection');
const subscription1 = Meteor.subscribe('FoodTrucksCollection');
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  ready: subscription.ready() && subscription1.ready(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
